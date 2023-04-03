import React, {useState} from 'react';
import Head from "next/head";
import useSWRImmutable from "swr/immutable";
import {fetchWithParams, getFetcher} from "@/lib/fetchers/fetchers";
import useSWR from "swr";

function Images() {

    return (
        <>
            <Head>
                <title>Cats images</title>
            </Head>


        </>
    );
}

export default Images;