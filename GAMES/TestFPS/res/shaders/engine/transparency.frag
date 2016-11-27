#version 150

uniform sampler2D sampler_diffuse;
uniform vec3 uEmissive;

in vec3 vNormal;
in vec2 vTexCoords;
in vec4 vColor;

out vec4 gBuffer0;
out vec4 gBuffer2;

void main(){
	vec3 normal = normalize(vNormal);
	
	vec4 textureSample = texture(sampler_diffuse, vTexCoords);
	if(textureSample.a <= 0){
		discard;
	}
	
	gBuffer0 = textureSample * vColor;
	gBuffer2 = vec4(uEmissive, 0.0);
}