export class Shader {
  public vertex: string;
  public fragment: string;

  constructor() {
    this.vertex = this.createVertex();
    this.fragment = this.createFragment();
  }

  createVertex() {
    return /*glsl*/ `
          varying float x;
          varying float y;
          varying float z;
          varying float radius;
          varying float freq;
          varying vec3 vUv;
          uniform float u_time;
          uniform float u_amplitude;
          uniform float[512] u_data_arr;
          uniform int u_plane_height;
          uniform int u_plane_width;
          uniform int u_fft_size;
          uniform float u_rotation;
          float PI = 3.1415926535897932384626433832795;
  
        vec3 rotateAxis(vec3 p, vec3 axis, float angle) {
          return mix(dot(axis, p)*axis, p, cos(angle)) + cross(axis,p)*sin(angle);
        }
  
  
          void main() {
          vUv = position;
          vUv = rotateAxis(position, vec3(0, 0, 0), u_rotation);
          radius = sqrt(pow(vUv.x, 2.0) + pow(vUv.y, 2.0));
          vec2 newCoords = vec2(radius * sin(u_rotation), radius * cos(u_rotation));
  
          float lowerFreq = (float(u_fft_size) * 0.5) * 0.2;
          
          vec2 floatWH = vec2(float(u_plane_width) / 2.0, float(u_plane_height) / 2.0);
          float radiusAsPercent = abs(radius) / floatWH.y;
          float percentOfFreq = round(lowerFreq * radiusAsPercent);
          freq = (u_data_arr[int(percentOfFreq)]) * 0.0175;
            
          // y = position.y - freq;
          x = vUv.x - freq;
          z = vUv.z - freq;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(x, position.y, z, 1.0);
          }
      `;
  }

  createFragment() {
    return /*glsl*/ `
      // varying float radius;
      varying float x;
      varying float y;
      varying float z;
      varying float xAsPercent;
      varying float yAsPercent;
      varying vec3 vUv;
      // varying float freq;
      uniform float[512] u_data_arr;
      uniform float u_resolution_height;
      uniform float u_resolution_width;
      uniform float u_delta;
      uniform int u_plane_height;
      uniform int u_plane_width;
      uniform int u_fft_size;
      uniform float u_red;
      uniform float u_green;
      uniform float u_blue;
  
      
      void main() {
        float radius = sqrt(pow(vUv.x, 2.0) + pow(vUv.y, 2.0));
  
        float lowerFreq = (float(u_fft_size) * 0.5) * 0.2;
        
        vec2 floatWH = vec2(float(u_plane_width) / 2.0, float(u_plane_height) / 2.0);
        float radiusAsPercent = abs(radius) / floatWH.y;
        float percentOfFreq = round(lowerFreq * radiusAsPercent);
        float freq = 100.0 / (u_data_arr[int(percentOfFreq)]);
        float blueIntensity = (u_data_arr[int(percentOfFreq)] / 255.0) / 3.0;
  
        gl_FragColor = vec4(u_red, u_green, u_blue, freq * 1.015);
      }
  `;
  }
}
