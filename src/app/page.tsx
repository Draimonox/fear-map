"use client";
import { useEffect, useState } from "react";
import { Button, Card, Center, Loader, ScrollArea, Text } from "@mantine/core";
import OpenAI from "openai";

function Page() {
  const [city, setCity] = useState<string | null>(null);
  const [story, setStory] = useState<string | null>(null);
  // Access the OpenAI API key from environment variables
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []); // Empty dependency array to run only once on mount

  function success(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    getCityFromCoordinates(latitude, longitude);
  }

  async function getCityFromCoordinates(latitude: number, longitude: number) {
    const apiKeyOpenCage = process.env.NEXT_PUBLIC_CAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKeyOpenCage}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const city = data.results[0].components.city;
        setCity(city);
        // console.log(`City: ${city}`);
        await chatgpt(city);
      } else {
        console.error("No results found.");
      }
    } catch (err) {
      console.error("Error fetching city:", err);
    }
  }

  function error() {
    console.error("Unable to retrieve your location.");
  }

  const chatgpt = async (city: string) => {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Write a scary story that occurred in ${city}.`,
        },
      ],
    });
    console.log(completion.choices[0].message.content);
    const story = completion.choices[0].message.content;
    setStory(story);
    return story;
  };
  return (
    <>
      <Center>
        <Text size="xl" fw={700} style={{ padding: "20px" }}>
          Real scary story from {city}
        </Text>
      </Center>
      <ScrollArea
        h="80vh"
        w="90vw"
        style={{
          margin: "auto",
          // marginTop: "vh",
          borderColor: "gray",
          borderWidth: "2px",
          borderStyle: "solid",
          borderRadius: "15px",
          boxShadow: "10px 10px 5px black",
          padding: "30px",
        }}
      >
        <h1 style={{ height: "100%", lineHeight: "2" }}>
          {story || (
            <Center h="50vh" style={{ backgroundColor: "yellow" }}>
              <Loader type="bars" />
            </Center>
          )}
        </h1>
      </ScrollArea>
    </>
  );
}

export default Page;
