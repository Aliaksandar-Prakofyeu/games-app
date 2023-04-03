import { NextApiRequest } from "next";
import { Server } from "socket.io";

let currentPlayers: string[] = [];

export default async function SocketHandler(req: NextApiRequest, res: any) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    allowEIO3: true,
  });

  io.on("connection", (socket) => {
    socket.on("join_tic_room", (obj) => {
      console.log("Joined room");

      socket.join(obj.roomId);

      const count = io.sockets.adapter.rooms.get(obj.roomId)?.size!;

      const isUserWonPreviousGame = obj?.preWinner === obj.username;

      const preWinnerAsX = isUserWonPreviousGame ? "X" : "O";
      const newGameFirstPlayerAsX = count <= 1 ? "X" : "O";

      const isPreviousPlayer = obj.currentPlayers.includes(obj.username);

      const newGame = count > 2 ? "LIVE" : count === 2 ? "START" : "WAIT";
      const previousGame = isPreviousPlayer ? "START" : "LIVE";

      const newObject = {
        ...obj,
        playerSymbol: obj.isGameReset ? preWinnerAsX : newGameFirstPlayerAsX,
        gameStatus: obj.isGameReset ? previousGame : newGame,
      };

      if (currentPlayers.length <= 2) {
        currentPlayers.push(obj.username);
      }

      io.to(socket.id).emit("start_tic", newObject);

      if (count <= 2 && !obj.isGameReset) {
        io.in(obj.roomId).emit("waiting_lobby", newObject);
      }
    });

    socket.on("send_message_tic", (obj) => {
      io.in(obj.roomId).emit("receive_message_tic", obj);
    });

    socket.on("winner_tic", (obj) => {
      const result = {
        result: obj,
        currentPlayers,
      };

      io.in(obj.roomId).emit("announce_winner", result);
    });

    socket.on("leave_room", (obj) => {
      const count = io.sockets.adapter.rooms.get(obj.roomId)?.size!;

      if (count === 2) {
        io.socketsLeave(obj.roomId);
      } else {
        socket.leave(obj.roomId);
      }

      io.to(socket.id).emit("reset_tile", obj);
    });
  });

  res.socket.server.io = io;

  console.log("Setting up socket");
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
