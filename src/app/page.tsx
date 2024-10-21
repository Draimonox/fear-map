"use client";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import OpenAI from "openai";

function Page() {
  // Access the OpenAI API key from environment variables
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [city, setCity] = useState<string | null>(null);

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
    const apiKey = "6ccc0e9185a44014bd7d15c6920215b9"; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const city =
          data.results[0].components.city ||
          data.results[0].components.town ||
          data.results[0].components.village;
        setCity(city);
        console.log(`City: ${city}`);
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
  };

  function incrementOne() {
    let value = 0;
    value += 1;
    console.log(value);
    return value;
  }

  return (
    <>
      <Button onClick={incrementOne}>Click me</Button>
    </>
  );
}

export default Page;
