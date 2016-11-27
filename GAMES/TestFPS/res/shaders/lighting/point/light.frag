#version 150

uniform sampler2D gBuffer0;
uniform sampler2D gBuffer1;
uniform sampler2D depthBuffer;

uniform vec2 screenSize;
uniform mat4 inverseProjectionMatrix;

uniform vec3 lightEyePosition;
uniform vec3 lightColor;
uniform float lightIntensity;

//uniform int shader;
//uniform float fresnel;

out vec3 light;

vec3 unpackNormal(vec2 packedNormal){
    vec4 nn = vec4(packedNormal * 2.0, 0.0, 0.0) + vec4(-1.0, -1.0 ,1.0 ,-1.0);
    float l = dot(nn.xyz,-nn.xyw);
    nn.z = l;
    nn.xy *= sqrt(l);
    return nn.xyz * 2.0 + vec3(0.0, 0.0, -1.0);
}

float shadowPoint(vec3 eyeSpace);

void main(){

	vec2 texCoords = gl_FragCoord.xy * screenSize;
	vec4 clipPos = vec4(vec3(texCoords, texture(depthBuffer, texCoords).r) * 2.0 - 1.0, 1.0);
	vec4 eyeSpace = inverseProjectionMatrix * clipPos;
	eyeSpace.xyz /= eyeSpace.w;
	
	vec4 gBuffer1Data = texture(gBuffer1, texCoords);
	vec3 N = unpackNormal(gBuffer1Data.xy);
	

	vec3 dPos = lightEyePosition - eyeSpace.xyz;
	
	vec3 L = normalize(dPos);
	float diffuse = max(dot(N, L), 0.0);
	
	vec3 color = vec3(0.0);
	if(diffuse > 0.0){
		vec3 diffuseColor = texture(gBuffer0, texCoords).rgb;
		vec3 V = normalize(0 - eyeSpace.xyz);
		
		vec3 H = normalize(L + V);
		
		float specular = pow(max(0.0, dot(N, H)), abs(gBuffer1Data.z)) * gBuffer1Data.w;
		
		specular = (specular + (1-specular)*pow(1-dot(V, H), 5));
	
		float distSqrd = dot(dPos, dPos);
		float distance = sqrt(distSqrd);
		float falloff = max(1.0 - distance / (lightIntensity), 0.0) / distance;
		
		color = lightColor * (diffuseColor + specular) * (diffuse * falloff*lightIntensity * shadowPoint(eyeSpace.xyz));
	}
	light = color;
	
	//light = vec3(N);
	//light = vec3(diffuse);
	//gl_FragColor = vec4(debug(eyeSpace.xyz), 1.0);
	//gl_FragColor = vec4(vec3(0.1 * shadow(eyeSpace.xyz)), 1.0);
	//light = vec3(0.5) * shadowPoint(eyeSpace.xyz);
}