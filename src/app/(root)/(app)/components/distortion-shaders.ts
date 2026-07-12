/**
 * Audio-reactive image-distortion shaders.
 *
 * Ported from the Codrops demo "Audio Based Image Distortion" by neundex
 * (https://github.com/neundex/AudioBasedImageDistortion). Codrops resources are
 * free for personal and commercial use; credit retained here.
 *
 * The original uses p5.js + p5.sound (FFT) with one shared vertex shader and
 * per-demo fragment shaders. Here the GLSL is reproduced verbatim and driven by
 * a lightweight custom WebGL + Web Audio engine (see AudioDistortionBackground).
 */

export const BASE_VERT = /* glsl */ `
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;

  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = positionVec4;
}
`

const D1 = /* glsl */ `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec2 vTexCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_tResolution;
uniform sampler2D u_texture;
uniform float u_bass;
uniform float u_tremble;
uniform float u_mid;

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

void main() {
  vec2 ratio = vec2(
    min((u_resolution.x / u_resolution.y) / (u_tResolution.x / u_tResolution.y), 1.0),
    min((u_resolution.y / u_resolution.x) / (u_tResolution.y / u_tResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vTexCoord.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vTexCoord.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  uv.y = 1.0 - uv.y;

  uv -= vec2(0.5);
  uv = scale(vec2(0.91)) * uv;
  uv += vec2(0.5);

  float wave_x = sin(uv.x * u_bass + u_time) * u_mid;
  float wave_y = sin(uv.y * u_bass / 2.0) * u_mid;
  vec2 d = vec2(wave_x, wave_y);

  vec4 image = texture2D(u_texture, uv + d);

  gl_FragColor = image;
}
`

const D2 = /* glsl */ `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D d_map;
uniform sampler2D img;
uniform float u_bass;
uniform float u_mid;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 texRes;
uniform float u_lowmid;

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

void main() {

  vec2 ratio = vec2(
    min((u_resolution.x / u_resolution.y) / (texRes.x / texRes.y), 1.0),
    min((u_resolution.y / u_resolution.x) / (texRes.y / texRes.x), 1.0)
  );

  vec2 uv = vec2(
    vTexCoord.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vTexCoord.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  uv.y = 1.0 - uv.y;

  vec2 uvt = uv;

  vec2 translate = vec2(cos(u_mid),sin(u_mid));
  uvt += translate * 0.5;

  vec4 t = texture2D(d_map, uvt);

  float d = dot(t.rgb, vec3(u_time));
  float disp = d * u_bass;
  float disp_2 = d * u_mid;

  uv -= vec2(0.5);
  uv = scale(2.0 - vec2(sin(disp)+1.0)) * uv;
  uv += vec2(0.5);

  vec2 mir = uv;
  vec4 f = texture2D(img, mir);

  // output the image
  gl_FragColor = f;
}
`

const D3 = /* glsl */ `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_bass;
uniform float u_time;
uniform float u_mid;
uniform vec2 u_tResolution;

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

void main() {

  vec2 ratio = vec2(
    min((u_resolution.x / u_resolution.y) / (u_tResolution.x / u_tResolution.y), 1.0),
    min((u_resolution.y / u_resolution.x) / (u_tResolution.y / u_tResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vTexCoord.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vTexCoord.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  uv = 1.0 - uv;

  uv -= vec2(0.5);
  uv = scale(vec2(0.91)) * uv;
  uv += vec2(0.5);

  float wave = sin(((uv.x * 2.0) - 1.0) * u_bass) * u_mid;
  vec2 d = vec2(wave, 0.001);


  vec4 red = texture2D(u_texture, uv - d);
  vec4 green = texture2D(u_texture, uv + d);
  vec4 blue = texture2D(u_texture, uv - d);

  vec4 color = vec4(red.r, green.g, blue.b, 1.0);

  gl_FragColor = color;
}
`

const D4 = /* glsl */ `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D d_map;
uniform sampler2D img;
uniform float u_bass;
uniform float u_mid;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_tResolution;

void main() {

  vec2 ratio = vec2(
    min((u_resolution.x / u_resolution.y) / (u_tResolution.x / u_tResolution.y), 1.0),
    min((u_resolution.y / u_resolution.x) / (u_tResolution.y / u_tResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vTexCoord.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vTexCoord.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  uv.y = 1.0 - uv.y;

  vec4 texture = texture2D(d_map, uv);

  float d = dot(texture.rgb, vec3(u_time));
  float disp = d * u_bass;
  float disp_2 = d * u_mid;

  uv.y += disp;

  vec4 image = texture2D(img, uv);

  gl_FragColor = image;
}
`

const D5 = /* glsl */ `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec2 vTexCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform float u_bass;
uniform float u_tremble;
uniform float u_mid;
uniform vec2 u_tResolution;

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

void main() {
  vec2 ratio = vec2(
    min((u_resolution.x / u_resolution.y) / (u_tResolution.x / u_tResolution.y), 1.0),
    min((u_resolution.y / u_resolution.x) / (u_tResolution.y / u_tResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vTexCoord.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vTexCoord.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  uv.y = 1.0 - uv.y;

  uv -= vec2(0.5);
  uv = scale(vec2(0.88)) * uv;
  uv += vec2(0.5);

  float wave = sin(uv.x * u_bass + u_time) * u_mid;

  vec2 d = vec2(wave * 1.9, wave / 1.5);
  vec4 image = texture2D(u_texture, uv + d);

  gl_FragColor = image;
}
`

const D6 = /* glsl */ `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform float u_time;
uniform vec2 u_tResolution;
uniform float u_bass;
uniform float u_tremble;
uniform float u_mid;

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

void main() {
  vec2 ratio = vec2(
    min((u_resolution.x / u_resolution.y) / (u_tResolution.x / u_tResolution.y), 1.0),
    min((u_resolution.y / u_resolution.x) / (u_tResolution.y / u_tResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vTexCoord.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vTexCoord.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  uv.y = 1.0 - uv.y;

  uv -= vec2(0.5);
  uv = scale(vec2(0.92)) * uv;
  uv += vec2(0.5);

  float wave   = sin(uv.y * u_bass + u_time) * u_mid;
  vec2 d = vec2(wave);
  vec4 image   = texture2D(u_texture, uv + d);

  gl_FragColor = image;
}
`

const D8 = /* glsl */ `
#ifdef GL_ES
  precision mediump float;
#endif

varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform float u_time;
uniform vec2 u_tResolution;
uniform float u_bass;
uniform float u_tremble;
uniform float u_mid;

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

void main() {
  vec2 ratio = vec2(
    min((u_resolution.x / u_resolution.y) / (u_tResolution.x / u_tResolution.y), 1.0),
    min((u_resolution.y / u_resolution.x) / (u_tResolution.y / u_tResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vTexCoord.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vTexCoord.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  uv.y = 1.0 - uv.y;

  uv -= vec2(0.5);
  uv = scale(vec2(0.91)) * uv;
  uv += vec2(0.5);

  float wave   = sin(uv.y * u_bass + u_time) * u_mid;
  vec2 d = vec2(wave);
  vec4 image   = texture2D(u_texture, uv + d);

  gl_FragColor = image;
}
`

export type FragmentKey = 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd8'

export const FRAGMENTS: Record<FragmentKey, string> = {
  d1: D1,
  d2: D2,
  d3: D3,
  d4: D4,
  d5: D5,
  d6: D6,
  d8: D8,
}

/**
 * Frequency bands from p5.sound FFT.getEnergy, in Hz. Averaged 0-255.
 */
export type Band = 'bass' | 'lowMid' | 'mid' | 'highMid' | 'treble'

export const BAND_RANGES: Record<Band, [number, number]> = {
  bass: [20, 140],
  lowMid: [140, 400],
  mid: [400, 2600],
  highMid: [2600, 5200],
  treble: [5200, 14000],
}

/**
 * A linear map of a band's 0-255 energy to a shader value: [inMin, inMax, outMin, outMax].
 * Matches p5 map() (no clamping).
 */
export interface BandMap {
  band: Band
  in: [number, number]
  out: [number, number]
}

export interface EffectConfig {
  /** Human label / demo number (1-8). */
  id: number
  /** Fragment shader used (demo7 reuses d3). */
  frag: FragmentKey
  /** Audio track under /media/audio. */
  audio: string
  /** Uses two textures: `img` (main) + `d_map` (displacement). Otherwise `u_texture`. */
  twoTextures: boolean
  /** u_time = frameCount / timeDivisor when set. */
  timeDivisor?: number
  /** u_time = constant when set (overrides divisor). */
  timeConstant?: number
  /** Mapping for u_bass. */
  bass: BandMap
  /** Mapping for u_mid. */
  mid: BandMap
  /** Optional mapping for u_lowmid (demo2 only). */
  lowmid?: BandMap
}

/**
 * The 8 effects in cycle order, ported faithfully from demo1..demo8.js.
 * (treble was computed but never used by any fragment shader, so it is omitted.)
 */
export const EFFECTS: EffectConfig[] = [
  {
    id: 1,
    frag: 'd1',
    audio: '/media/audio/demo1.mp3',
    twoTextures: false,
    timeDivisor: 20,
    bass: { band: 'bass', in: [0, 255], out: [10, 15] },
    mid: { band: 'mid', in: [0, 255], out: [0, 0.1] },
  },
  {
    id: 2,
    frag: 'd2',
    audio: '/media/audio/demo2.mp3',
    twoTextures: true,
    timeConstant: 1.0,
    bass: { band: 'bass', in: [0, 255], out: [0, 0.04] },
    mid: { band: 'highMid', in: [0, 30], out: [0, 0.8] },
    lowmid: { band: 'mid', in: [0, 60], out: [0, 0.4] },
  },
  {
    id: 3,
    frag: 'd3',
    audio: '/media/audio/demo3.mp3',
    twoTextures: false,
    timeDivisor: 20,
    bass: { band: 'bass', in: [0, 255], out: [0, 15] },
    mid: { band: 'mid', in: [0, 255], out: [0, 0.2] },
  },
  {
    id: 4,
    frag: 'd4',
    audio: '/media/audio/demo4.mp3',
    twoTextures: true,
    timeConstant: 2.0,
    bass: { band: 'bass', in: [0, 255], out: [0, 0.02] },
    mid: { band: 'mid', in: [0, 70], out: [0, 10.001] },
  },
  {
    id: 5,
    frag: 'd5',
    audio: '/media/audio/demo5.mp3',
    twoTextures: false,
    timeDivisor: 8,
    bass: { band: 'bass', in: [0, 150], out: [0, 13] },
    mid: { band: 'mid', in: [0, 255], out: [0, 0.1] },
  },
  {
    id: 6,
    frag: 'd6',
    audio: '/media/audio/demo6.mp3',
    twoTextures: false,
    timeDivisor: 20,
    bass: { band: 'bass', in: [0, 255], out: [10, 15] },
    mid: { band: 'mid', in: [0, 255], out: [0, 0.1] },
  },
  {
    id: 7,
    frag: 'd3',
    audio: '/media/audio/demo7.mp3',
    twoTextures: false,
    timeDivisor: 20,
    bass: { band: 'bass', in: [0, 255], out: [0, 2] },
    mid: { band: 'mid', in: [0, 255], out: [0, 0.05] },
  },
  {
    id: 8,
    frag: 'd8',
    audio: '/media/audio/demo8.mp3',
    twoTextures: false,
    timeDivisor: 20,
    bass: { band: 'bass', in: [0, 255], out: [5, 10] },
    mid: { band: 'mid', in: [0, 255], out: [0, 0.1] },
  },
]

/** p5-style linear remap without clamping. */
export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}
