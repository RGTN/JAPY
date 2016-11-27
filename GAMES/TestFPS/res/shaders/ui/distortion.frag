#version 150

uniform sampler2D color;

uniform float distortion;

in vec2 texCoords;

out vec4 fragColor;

void main(){
    
    vec2 pos = texCoords * 2 - 1;
    
    //vec2 distortedTexCoords = vec2(pos.x / ((1.0-distortion) + distortion*pos.y*pos.y), pos.y / ((1.0-distortion) + distortion*pos.x*pos.x)) * 0.5 + 0.5;
    
    vec2 distortedTexCoords = pos / ((1.0) + distortion*pos.yx*pos.yx) * 0.5 + 0.5;
    
    //float lines = max(0.0, abs(fract(distortedTexCoords.t * 200)*2.0 - 1.0) - 0.5) * 0.5;
	
	fragColor = texture(color, distortedTexCoords);
}