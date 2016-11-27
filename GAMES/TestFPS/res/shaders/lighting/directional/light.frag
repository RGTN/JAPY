#version 150

uniform sampler2D gBuffer0;
uniform sampler2D gBuffer1;
uniform sampler2D depthBuffer;

uniform mat4 inverseProjectionMatrix;

uniform vec3 lightDirection;
uniform vec3 lightColor;

in vec2 texCoords;

out vec3 light;

float shadowDirectional(vec3 eyeSpace);

vec3 unpackNormal(vec2 packedNormal){
    vec4 nn = vec4(packedNormal * 2.0, 0.0, 0.0) + vec4(-1.0, -1.0, 1.0, -1.0);
    float l = dot(nn.xyz,-nn.xyw);
    nn.z = l;
    nn.xy *= sqrt(l);
    return nn.xyz * 2.0 + vec3(0.0, 0.0, -1.0);
}

void main(){
	
	vec4 gBuffer1Data = texture(gBuffer1, texCoords);
	vec3 N = unpackNormal(gBuffer1Data.xy);
	
	
	vec3 L = lightDirection;
	float diffuse = max(dot(N, L), 0.0);
	
	vec3 color = vec3(0.0);
	if(diffuse > 0.0){
		vec3 diffuseColor = texture(gBuffer0, texCoords).rgb;
		
		vec4 clipPos = vec4(vec3(texCoords, texture(depthBuffer, texCoords).r) * 2.0 - 1.0, 1.0);
		vec4 eyeSpace = inverseProjectionMatrix * clipPos;
		eyeSpace.xyz /= eyeSpace.w;
		vec3 V = normalize(-eyeSpace.xyz);
		
		vec3 H = normalize(L + V);
		
		float specular = pow(max(0.0, dot(N, H)), abs(gBuffer1Data.z)) * gBuffer1Data.w;
		
		specular = (specular + (1-specular)*pow(1-dot(V, H), 5));
		
		color = lightColor * (diffuseColor + specular) * (diffuse * shadowDirectional(eyeSpace.xyz));
	}
	light = color;
}