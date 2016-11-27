#version 150

#define SAMPLES 5

#define DEPTH_SENSITIVITY 1.0

uniform sampler2D ssaoBuffer;
uniform sampler2D normalBuffer;
uniform sampler2D linearDepthBuffer;

uniform vec2 offset;

in vec2 texCoords;

out vec3 fragColor;


float weights[5] = float[5](
	70.0, 56.0, 28.0, 8.0, 1.0
);

vec3 unpackNormal(vec2 packedNormal){
    vec4 nn = vec4(packedNormal * 2.0, 0.0, 0.0) + vec4(-1.0, -1.0 ,1.0 ,-1.0);
    float l = dot(nn.xyz,-nn.xyw);
    nn.z = l;
    nn.xy *= sqrt(l);
    return nn.xyz * 2.0 + vec3(0.0, 0.0, -1.0);
}


void main(){
	
	float ssao = texture(ssaoBuffer, texCoords).r * weights[0];
	float totalWeight = weights[0];
	
	vec3 centerNormal = unpackNormal(texture(normalBuffer, texCoords).rg).xyz;
	float centerDepth = texture(linearDepthBuffer, texCoords).r;
	
	for(int i = 1; i < SAMPLES; i++){
		vec2 sampleOffset = offset * float(i);
		
		vec2 sampleCoords = texCoords + sampleOffset;
		
		float depth = texture(linearDepthBuffer, sampleCoords).r;
		vec3 normal = unpackNormal(texture(normalBuffer, sampleCoords).rg).xyz;
		
		float weight = max(0.0, dot(centerNormal, normal) - abs(depth - centerDepth) * DEPTH_SENSITIVITY) * weights[i];
		//float weight = max(0.0, 1.0 - abs(depth - centerDepth) * DEPTH_SENSITIVITY) * weights[i];
		ssao += texture(ssaoBuffer, sampleCoords).r * weight;
		totalWeight += weight;
		
		
		
		sampleCoords = texCoords - sampleOffset;
		
		depth = texture(linearDepthBuffer, sampleCoords).r;
		normal = unpackNormal(texture(normalBuffer, sampleCoords).rg).xyz;
		
		weight = max(0.0, max(0.0, dot(centerNormal, normal)*0.8 + 0.2) - abs(depth - centerDepth) * DEPTH_SENSITIVITY) * weights[i];
		//weight = max(0.0, 1.0 - abs(depth - centerDepth) * DEPTH_SENSITIVITY) * weights[i];
		ssao += texture(ssaoBuffer, sampleCoords).r * weight;
		totalWeight += weight;
	}
	
	fragColor = vec3(ssao / totalWeight);
}