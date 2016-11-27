

//#define NORMAL_SENSITIVITY 2.0
#define DEPTH_SENSITIVITY 20

uniform sampler2D gBuffer0;
uniform sampler2D depthBuffer;

uniform sampler2D upsampleScoreBuffer;
uniform sampler2D transparencyBuffer;
uniform sampler2D ssaoBuffer;

uniform samplerCube skyBox;



uniform mat4 inverseViewMatrix, inverseProjectionMatrix;
uniform vec3 cameraPosition;

uniform vec2 ppResolution;

uniform vec3 ambientColor;

uniform mat3 skyBoxRotation;
uniform vec3 skyBoxColor;

uniform float viewDistance;





in vec2 texCoords;

out vec4 fragColor;


vec3 unpackNormal(vec2 packedNormal){
    vec4 nn = vec4(packedNormal * 2.0, 0.0, 0.0) + vec4(-1.0, -1.0 ,1.0 ,-1.0);
    float l = dot(nn.xyz,-nn.xyw);
    nn.z = l;
    nn.xy *= sqrt(l);
    return nn.xyz * 2.0 + vec3(0.0, 0.0, -1.0);
}

float rand(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float upsampleSSAO(vec4 scores){

	vec2 upscaleTexCoords = texCoords * ppResolution - 0.5;

	ivec4 roundedTexCoords = ivec4(floor(upscaleTexCoords), floor(upscaleTexCoords+1));

	if(SSAO){
		return dot(scores, vec4(
				texelFetch(ssaoBuffer, roundedTexCoords.xy, 0).r,
				texelFetch(ssaoBuffer, roundedTexCoords.xw, 0).r,
				texelFetch(ssaoBuffer, roundedTexCoords.zy, 0).r,
				texelFetch(ssaoBuffer, roundedTexCoords.zw, 0).r
		));
	}else{
		return 1.0;
	}
}

vec4 cheapInverseToneMap(vec4 color) {
	return clamp( -4.0*color / ((color * 0.99) - 1), -20.0, 14.0 );
}

void main(){

	vec4 diffuseGlow = texture(gBuffer0, texCoords);

	vec3 diffuseColor = diffuseGlow.rgb;
	float glow = diffuseGlow.a;

	float rawDepth = texture(depthBuffer, texCoords).r;

	vec4 clipPos = vec4(vec3(texCoords, rawDepth) * 2.0 - 1.0, 1.0);
	vec4 eyeSpace = inverseProjectionMatrix * clipPos;
	eyeSpace.xyzw *= 1.0 / eyeSpace.w;
	vec4 worldSpace = inverseViewMatrix * eyeSpace;
	vec3 worldVector = worldSpace.xyz - cameraPosition;


	float ssao = upsampleSSAO(texture(upsampleScoreBuffer, texCoords));
	vec4 transparencyColor = texture(transparencyBuffer, texCoords);



	// Calculate fog
	float fogStrength = clamp(sqrt(dot(worldVector, worldVector))/viewDistance * 3.0 - 2.0, 0.0, 1.0);
	fogStrength *= fogStrength;
	vec3 fogColor = texture(skyBox, skyBoxRotation * worldVector).rgb * skyBoxColor;
	fogColor = cheapInverseToneMap( vec4( fogColor, 1.0 ) ).rgb;

	// Fix the alpha component
	float alpha = (1.0 - fogStrength) * (1.0 - transparencyColor.a);

	// Calculate color
	vec3 color = (ambientColor + glow) * diffuseColor;
	color = mix(color, fogColor, fogStrength); //Mix in skybox
	color *= ssao;

	// Mix in transparency buffer
	vec4 transparency = cheapInverseToneMap( transparencyColor );
	color *= (1.0 - transparencyColor.a);
	color += transparency.rgb;

	// Clamp
	//color = clamp(color, 0.0, 1.0);

	//color = vec3( ssao );
	fragColor = vec4(color, alpha);
}