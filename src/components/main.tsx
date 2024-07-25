"use client";

import React, { Fragment, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderCircle } from 'lucide-react';

export default function Main() {
  const [method, setMethod] = useState<string>("get");
  const [targetUrl, setTargetUrl] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>();

  const checkServer = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(targetUrl, {
        method,
      });
      setStatusCode(res.status);

      const jsonResponse = await res.text();
      setResponse(jsonResponse.slice(0, 300));
    } catch (error) {
      setStatusCode(0);
      setResponse(String(error));
    }

    setIsLoading(false);
  };

  return (
    <div className='pt-24 max-w-lg flex flex-col text-sm w-full'>
      <div className='flex flex-col justify-center items-center gap-2 mb-5'>
        <div className='flex flex-col sm:flex-row gap-1 w-full'>
          <Select onValueChange={setMethod} defaultValue={method}>
            <SelectTrigger className="w-full sm:w-[130px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="get">
                <span className='text-emerald-500 font-bold'>GET</span>
              </SelectItem>
              <SelectItem value="post">
                <span className='text-orange-500 font-bold'>POST</span>
              </SelectItem>
            </SelectContent>
          </Select>

          <Input
            defaultValue={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            type="text"
            placeholder="https://"
            className='flex-grow'
          />
        </div>

        <Button onClick={checkServer}>
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Check Server
        </Button>
      </div>

      <div className="grid grid-cols-[auto,1fr] auto-rows-auto gap-2">
        <p className='text-right'>Status Code:</p>
        <p>{statusCode.toString()}</p>

        {
          response && (
            <Fragment>
              <p className='text-right'>Message:</p>
              <p>{response}</p>
            </Fragment>
          )
        }
      </div>
    </div>
  );
}