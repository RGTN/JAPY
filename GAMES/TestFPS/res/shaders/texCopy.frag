#version 150

uniform sampler2D sampler;

in vec2 texCoords;

out vec4 fragColor;


float rand(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float dither(){
	return (-0.5 + rand(texCoords)) * (1.0 / 255.0); //Noise dithering
}

void main(){
	//gl_FragColor = vec4(texture(sampler, gl_TexCoord[0].st).rgb, 0.0);
	//fragColor = vec3(texCoords, 0);
	fragColor = vec4(texture(sampler, texCoords).rgb + dither(), 0.1);
}