"use client";


import Image from "next/image";
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { freakBob, testGemini } from "@/app/gemini-app"

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}


declare const gtag: Function;

export default function Home() {
  const [response, setResponse] = useState<string>('');


  async function getBob(formData: FormData) {
    const input = formData.get('input')?.toString() ?? '';
    // Push the event to the data layer
//  window.dataLayer = window.dataLayer || [];
//  window.dataLayer.push({
//    event: "ai_generate_text",
//    inputText: input,
//  });


    gtag('event', 'user_ai_text', {
      'input_text': input,
    });
    const answer = await freakBob(input);
    setResponse(answer);

  }



  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 space-y-6">


      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex flex-col items-center space-y-4">

            <CardTitle className="text-2xl font-bold text-center">Ask Freak Bob Anything</CardTitle>
            <Avatar className="w-24 h-24">
              <AvatarImage src="/images/freak-bob.webp" alt="Freakbob" />
              <AvatarFallback>FB</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="text-center">

          <form action={getBob} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Ask Freak bob how he feels 😊</Label>
              <Input type="text" id="input" name="input" placeholder="Enter something..." className="w-full" />
            </div>
            <Button type="submit" className="w-full">Generate</Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <h3 className="font-semibold mb-2">Freakbob's Response:</h3>
            <pre className="bg-gray-100 p-3 rounded-md text-sm whitespace-pre-wrap break-words min-h-[60px]">

              {response || 'Freakbob\'s response will appear here.'}
            </pre>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
