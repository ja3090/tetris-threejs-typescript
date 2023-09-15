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
          float radius = sqrt(pow(vUv.x, 2.0) + pow(vUv.y, 2.0));
          
          vec2 floatWH = vec2(float(u_block_size) / 2.0, float(u_block_size) / 2.0);
          vec2 asPercent = vec2(vUv.x / floatWH.x, vUv.y / floatWH.y);
          float col = cos(asPercent.x + asPercent.y);
          
          vec3 colours = vec3(abs(cos(u_red + col)), abs(cos(u_green + col)), abs(cos(u_blue + col)));
  
          gl_FragColor = vec4(colours, 0.2);
        }
    `;
  }
}
