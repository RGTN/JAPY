#version 150

#define DEPTH_SENSITIVITY 20

uniform sampler2D gBuffer1;
uniform sampler2D linearDepthBuffer;
uniform sampler2D downsampledNormalBuffer;
uniform sampler2D downsampledLinearDepthBuffer;

uniform vec2 ppResolution;


in vec2 texCoords;

out vec4 fragColor;

vec3 unpackNormal(vec2 packedNormal){
    vec4 nn = vec4(packedNormal * 2.0, 0.0, 0.0) + vec4(-1.0, -1.0 ,1.0 ,-1.0);
    float l = dot(nn.xyz,-nn.xyw);
    nn.z = l;
    nn.xy *= sqrt(l);
    return nn.xyz * 2.0 + vec3(0.0, 0.0, -1.0);
}

void main(){
	
	vec3 normal = unpackNormal(texture(gBuffer1, texCoords).rg);
	float centerLinearDepth = texture(linearDepthBuffer, texCoords).r;
	
	vec2 upscaleTexCoords = texCoords * ppResolution - 0.5;
	
	ivec4 roundedTexCoords = ivec4(floor(upscaleTexCoords), floor(upscaleTexCoords+1));
	
	vec4 sampleDots = clamp(vec4(
			dot(normal, unpackNormal(texelFetch(downsampledNormalBuffer, roundedTexCoords.xy, 0).rg)),
			dot(normal, unpackNormal(texelFetch(downsampledNormalBuffer, roundedTexCoords.xw, 0).rg)),
			dot(normal, unpackNormal(texelFetch(downsampledNormalBuffer, roundedTexCoords.zy, 0).rg)),
			dot(normal, unpackNormal(texelFetch(downsampledNormalBuffer, roundedTexCoords.zw, 0).rg))
	), 0.00000001, 1); //Clamp to slightly above 0 since the dot product is zero for the sky.
	
	vec4 sampleDepths = vec4(
			texelFetch(downsampledLinearDepthBuffer, roundedTexCoords.xy, 0).r,
			texelFetch(downsampledLinearDepthBuffer, roundedTexCoords.xw, 0).r,
			texelFetch(downsampledLinearDepthBuffer, roundedTexCoords.zy, 0).r,
			texelFetch(downsampledLinearDepthBuffer, roundedTexCoords.zw, 0).r	
	);
	
	vec4 scores = clamp(sampleDots - abs(sampleDepths - centerLinearDepth) / centerLinearDepth * DEPTH_SENSITIVITY, 0.0, 1.0);
	if(scores == vec4(0.0)){
		scores = vec4(1.0);
	}
	
	vec2 blend = upscaleTexCoords - roundedTexCoords.xy;
	
	scores.xy *= 1.0 - blend.x;
	scores.zw *= blend.x;
	scores.xz *= 1.0 - blend.y;
	scores.yw *= blend.y;
	
	if(scores == vec4(0.0)){
		scores = vec4(1.0);
	}
	
	scores = scores / dot(scores, vec4(1.0));
	
	fragColor = scores;
}