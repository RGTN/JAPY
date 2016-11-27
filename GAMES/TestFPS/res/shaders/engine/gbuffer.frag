#version 330

uniform sampler2D sampler_diffuse;
uniform sampler2D sampler_normal;

uniform float uSpecularity;
uniform float uGlossiness;
uniform vec3 uEmissive;

in vec3 vNormal;
in vec3 vViewSpacePos;
in vec2 vTexCoords;
in vec4 vColor;

void write(vec3 diffuse, vec3 normal, float specular, float glossiness, vec3 emissive);
vec3 normalmap(vec3 normalSample, vec3 vNormal, vec3 vViewSpacePos, vec2 vTexCoords );

void main(){
	// Correct linear color for SRGB
	vec4 srgbColor = pow( vColor, vec4( 2.2 ) );


	// Grab texture samples
	vec4 diffuseSample = texture( sampler_diffuse, vTexCoords ) * srgbColor;
	vec4 normalSample  = texture( sampler_normal,  vTexCoords );


	// Discard transparent pixels
	if(diffuseSample.a < 0.5){
		discard;
	}


	// Specularity and gloss are stored in alpha component of normal map
	float specValue = normalSample.b;
	float glosValue = normalSample.a;
	
	// Calculate lighting values
	float specularity = uSpecularity * specValue;
	float glossiness  = uGlossiness * glosValue;


	// Calculate normal
	vec3 normal = normalmap( normalSample.rgb, vNormal, vViewSpacePos, vTexCoords );


	// Correct rimlighting
	float R = diffuseSample.r;
	float G = diffuseSample.g;
	float B = diffuseSample.b;
	float brightness = (R+R+G+G+G+B)/6 + 0.7;
	float power = 12.0;
	float strength = 0.3;
	float dotp = dot(normalize(vViewSpacePos.xyz), normalize(normal) ) + 1.0;
   	vec3 rimLight = vec3( pow( dotp, power ) );
	rimLight *= (brightness * strength);
	rimLight *= clamp( specularity, 0.0, 1.0 );
	rimLight = clamp(rimLight, vec3(0.0), vec3(1.0));


	// Output final color
	write( diffuseSample.xyz, normal, specularity, glossiness, uEmissive + rimLight );
}