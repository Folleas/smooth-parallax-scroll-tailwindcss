'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'
import { useTransform, useScroll, motion } from 'framer-motion';

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
]

export default function Home() {

  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect(() => {
    const lenis = new Lenis()

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])
  return (
    <main className={'bg-gradient-to-b from-[rgba(117,33,255,1)] z-20 from-0% via-[rgba(79,22,158,0.7)] via-80% to-[rgba(62,17,124,1)] to-100%'}>
      <div className='h-[100vh] text-black flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Scroll down to check the paralax</h1>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.scrollTo({top:window.innerHeight, behavior: 'smooth'})}>Scroll Down</button>
      </div>
      <Gallery images={images} />
      <div className='h-[100vh] text-black flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Scroll up to check the paralax</h1>
      </div>
    </main>
  )
}


const Column = ({ images, y, yOffset }: any) => {
  return (

    <motion.div
      className={`relative h-full w-1/4 min-w-[250px] flex flex-col ` + yOffset}
      style={{ y }}
    >
      {
        images.map((src: any, i: number) => {
          return (
            <div key={i} className="h-full w-full relative rounded-[1vw] overflow-hidden">
              <Image
                src={`/images/${src}`}
                alt='image'
                layout='fill'
                objectFit='cover'
              />
            </div>
          )
        })
      }
    </motion.div>
  )
}
const Gallery = ({ images }) => {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  const ys = [y, y2, y3, y4];
  useEffect(() => {
    const lenis = new Lenis()

    const raf = (time: any) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  const positions: string[] = ['top-[-45%]', 'top-[-95%]', 'top-[-45%]', 'top-[-75%]'];

  // Split the images array into chunks of 3
  const columns: any[][] = [];
  for (let i = 0; i < images.length; i += 3) {
    columns.push(images.slice(i, i + 3));
  }

  return (
    <div ref={gallery} className="h-[175vh] w-full relative gap-[2vw] p-[2vw] flex box-border overflow-hidden shadow-lg bg-[rgba(235,229,33,1)]">
      {columns.map((columnImages, index) => (
        <Column
          key={index}
          images={columnImages}
          y={ys[index]}
          yOffset={positions[index]}
          className={`relative h-full w-1/4 min-w-[250px] flex flex-col gap-[2vw]`}
        />
      ))}
    </div>
  );
};