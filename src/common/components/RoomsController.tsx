import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Layout } from "../layout/Layout";
import { uuid } from "@utils/uuid";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

type Props = {
  setIsAdmin?: (isAdmin: boolean) => void;
};

export const RoomsController: React.FC<Props> = ({ setIsAdmin }) => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const _username = localStorage.getItem("username");

    if (_username) {
      setUsername(_username);
    }
  }, []);

  return (
    <Layout title="Create | Join" className="flex-1 justify-center">
      <div className="w-full flex flex-wrap justify-center gap-5">
        <Card  maxW={{ base: "full", sm: "xs" }}
               bg="purple.100"
               className="duration-200 hover:shadow-xl !shadow-gray-600">
          <CardBody className="flex flex-col justify-between ">
            <Image
              w={280}
              h={280}
              margin="auto"
              borderRadius="lg"
              src="/assets/games/create.png"
              alt="Create room"
            />

            <Stack mt={{ base: "5", md: "10" }} spacing="3">
              <Heading size="lg">Create a room</Heading>

              <Text py="2">
                Start a new game. Create a room and share the
                ID or link with your opponent.
              </Text>

              <Popover>
                <PopoverTrigger>
                  <Button className="!bg-blue-500 text-white font-medium tracking-wide">
                    Create
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader fontWeight="bold" color="black">
                    Enter a Username
                  </PopoverHeader>
                  <PopoverBody>
                    <Flex gap={2}>
                      <Input
                        className="!w-full !border !border-gray-500 text-black"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          localStorage.setItem("username", e.target.value);
                        }}
                        onKeyUp={() => {
                          router.replace(`?id=${roomId}`);
                        }}
                      />

                      <Link
                        onClick={() => setIsAdmin?.(true)}
                        href={`?id=${uuid(6)}`}
                        className="text-center bg-blue-500 p-2 px-4 rounded-md text-white font-medium tracking-wide"
                      >
                        Create
                      </Link>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Stack>
          </CardBody>
        </Card>

        <Card  maxW={{ base: "full", sm: "xs" }}
               bg="purple.100"
               className="duration-200 hover:shadow-xl !shadow-gray-600">
          <CardBody className="flex flex-col justify-between">
            <Image
              w={280}
              h={280}
              margin="auto"
              borderRadius="lg"
              src="/assets/games/join.png"
              alt="Join room"
            />

            <Stack mt={{ base: "5", md: "10" }} spacing="3">
              <Heading size="lg">Join a room</Heading>

              <Text py="2">
                Join a game with your friends. Enter the room ID and start the
                game.
              </Text>

              <Popover>
                <PopoverTrigger>
                  <Button className="!bg-blue-500 text-white font-medium tracking-wide">
                    Join
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader fontWeight="bold" color="black">
                    Enter your Room ID
                  </PopoverHeader>
                  <PopoverBody>
                    <Flex gap={2}>
                      <Input
                        className="!w-full !border !border-gray-500 text-black"
                        placeholder="uDA1A0"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            router.replace(`?id=${roomId}`);
                          }
                        }}
                      />

                      <Link
                        href={`?id=${roomId}`}
                        className="text-center bg-blue-500 p-2 px-4 rounded-md text-white font-medium tracking-wide"
                      >
                        Join
                      </Link>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Stack>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};
