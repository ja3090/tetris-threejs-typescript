export class Shader {
  public fragment: string;
  public vertex: string;

  constructor() {
    this.fragment = this.createFragment();
    this.vertex = this.createVertex();
  }

  createVertex() {
    return /*glsl*/ `  
    varying vec3 vUv;
          void main() {
            vUv = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(vUv.x, vUv.y, vUv.z, 1.0);
          }
      `;
  }

  createFragment() {
    return /*glsl*/ `
        varying float x;
        varying float y;
        varying float z;
        varying float xAsPercent;
        varying float yAsPercent;
        varying vec3 vUv;
        uniform float[512] u_data_arr;
        uniform float u_resolution_height;
        uniform float u_resolution_width;
        uniform float u_delta;
        uniform int u_block_size;
        uniform int u_fft_size;
        uniform float u_red;
        uniform float u_green;
        uniform float u_blue;
    
        
        void main() {
          // float radius = sqrt(pow(abs(vUv.x), 2.0) + pow(abs(vUv.y), 2.0));

          // float radiusAsPercent = radius / float(u_block_size);

          // float radiusAsFreq = u_data_arr[int(float(u_fft_size) * radiusAsPercent)] / 255.0;

          // vec3 absCoords = vec3(abs(vUv.x), abs(vUv.y), abs(vUv.z));

          // vec3 percentOfShape = vec3(absCoords.x / (float(u_block_size) / 2.0), absCoords.y / (float(u_block_size)/2.0), absCoords.z / (float(u_block_size)/2.0));
          // vec3 percentOfFftRange = vec3(float(u_fft_size) * percentOfShape.x, float(u_fft_size) * percentOfShape.y, float(u_fft_size) * percentOfShape.z);
          // float lowerFreq = (float(u_fft_size) * 0.5) * 0.2;

          // vec3 freqRange = vec3(u_data_arr[int(percentOfFftRange.x)] / 255.0, u_data_arr[int(percentOfFftRange.y)] / 255.0, u_data_arr[int(percentOfFftRange.z)]/ 255.0);
          // float freq = cos(freqRange.x + freqRange.y);
    
          // gl_FragColor = vec4(u_red, u_green, u_blue, radiusAsFreq + 0.6);

          float radius = sqrt(pow(vUv.x, 2.0) + pow(vUv.y, 2.0));
    
          float lowerFreq = (float(u_fft_size) * 0.5);
          
          vec2 floatWH = vec2(float(u_block_size) / 2.0, float(u_block_size) / 2.0);
          float radiusAsPercent = abs(radius) / floatWH.y;
          float percentOfFreq = round(lowerFreq * radiusAsPercent);
          float freq = 150.0 / (u_data_arr[int(percentOfFreq)]);
          float blueIntensity = (u_data_arr[int(percentOfFreq)] / 255.0) / 3.0;
    
          gl_FragColor = vec4(u_red, u_green, u_blue, freq * 1.015);
        }
    `;
  }
}
