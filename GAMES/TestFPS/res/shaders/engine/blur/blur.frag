#version 150

uniform sampler2D sampler_diffuse;
uniform float uTexWidth;
uniform float uTexHeight;

in vec2 vTexCoords;
in vec4 vColor;

out vec4 out_Color;

void main() {
	int uBlurSize = 8;
	vec2 texelSize = 1.0 / vec2(uTexWidth, uTexHeight);
	
	vec4 result = vec4(0.0);
	vec2 hlim = vec2(float(-uBlurSize) * 0.5 + 0.5);
	for (int i = 0; i < uBlurSize; ++i) {
    	for (int j = 0; j < uBlurSize; ++j) {
        	vec2 offset = (hlim + vec2(float(i), float(j))) * texelSize;
        	result += texture(sampler_diffuse, vTexCoords + offset);
		}
	}
 
 	vec4 blur = result / float(uBlurSize * uBlurSize);
	out_Color = blur * vColor;
}