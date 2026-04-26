"use client";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_t; uniform vec3 u_a; uniform vec3 u_b; uniform vec3 u_c;
float n(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float sn(vec2 p){vec2 i=floor(p),f=fract(p);
  float a=n(i),b=n(i+vec2(1,0)),c=n(i+vec2(0,1)),d=n(i+vec2(1,1));
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_res)/u_res.y;
  float t=u_t*.06;
  float v=sn(uv*1.4+vec2(t,t*.7))*.6 + sn(uv*3.0-vec2(t*.5,-t))*.3;
  vec3 col=mix(u_a,u_b,smoothstep(.1,.9,v));
  col=mix(col,u_c,smoothstep(.6,1.,sn(uv*2.+t)));
  col += (n(gl_FragCoord.xy + u_t)-.5)*0.025;
  gl_FragColor=vec4(col,1.);
}`;

function readVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const expanded =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(expanded, 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function HeroMesh() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const c = ref.current;
    const ctx = c.getContext("webgl", { antialias: false, alpha: false });
    if (!ctx) return;
    const gl = ctx;

    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    const pr = gl.createProgram();
    if (!vs || !fs || !pr) return;
    gl.shaderSource(vs, VERT);
    gl.compileShader(vs);
    gl.shaderSource(fs, FRAG);
    gl.compileShader(fs);
    gl.attachShader(pr, vs);
    gl.attachShader(pr, fs);
    gl.linkProgram(pr);
    gl.useProgram(pr);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const pLoc = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(pLoc);
    gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(pr, "u_res");
    const uT = gl.getUniformLocation(pr, "u_t");
    const uA = gl.getUniformLocation(pr, "u_a");
    const uB = gl.getUniformLocation(pr, "u_b");
    const uC = gl.getUniformLocation(pr, "u_c");

    function setColors() {
      const bg = readVar("--color-bg", "#f4efe6");
      const accent = readVar("--color-accent", "#e5462a");
      const sunken = readVar("--color-bg-sunken", "#ebe3d3");
      gl.uniform3fv(uA, hexToRgb(bg));
      gl.uniform3fv(uB, hexToRgb(sunken));
      gl.uniform3fv(uC, hexToRgb(accent));
    }
    setColors();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      gl.viewport(0, 0, c.width, c.height);
      gl.uniform2f(uRes, c.width, c.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const mo = new MutationObserver(setColors);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let raf = 0;
    const start = performance.now();
    const tick = () => {
      gl.uniform1f(uT, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 30%, color-mix(in oklab, var(--color-accent) 18%, transparent), transparent 60%), linear-gradient(180deg, var(--color-bg), var(--color-bg-sunken))",
        }}
      />
    );
  }
  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full" />;
}
