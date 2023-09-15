export class NormalShader {
  public vertex: string;
  public fragment: string;

  constructor() {
    this.vertex = this.createVertex();
    this.fragment = this.createFragment();
  }

  createVertex() {
    return /*glsl*/ `
    varying vec3 vUv;
    uniform float u_red;
    uniform float u_green;
    uniform float u_blue;
          void main() {
            vUv = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(vUv.x, vUv.y, vUv.z, 1.0);
          }
    `;
  }

  createFragment() {
    return /*glsl */ `
    varying vec3 vUv;
          uniform float u_red;
          uniform float u_green;
          uniform float u_blue;
          uniform float u_plane_height;
          uniform float u_plane_width;
          
          void main() {
            float radius = sqrt(pow(vUv.x, 2.0) + pow(vUv.y, 2.0));
            
            vec2 floatWH = vec2(float(u_plane_width) / 2.0, float(u_plane_height) / 2.0);
            vec2 asPercent = vec2(vUv.x / floatWH.x, vUv.y / floatWH.y);
            float col = cos(asPercent.x + asPercent.y);
            vec3 colours = vec3(abs(cos(u_red + col)), abs(cos(u_green + col)), abs(cos(u_blue + col)));
    
      
            gl_FragColor = vec4(colours, 0.8);
          }
    `;
  }
}
