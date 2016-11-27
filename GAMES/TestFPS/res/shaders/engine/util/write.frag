#version 150


out vec4 gBuffer0;
out vec4 gBuffer1;
out vec4 gBuffer2;


vec2 packNormal(vec3 normal){
	vec2 enc = normalize(normal.xy + vec2(0.0, 0.00000000000000001)) * (sqrt(-normal.z*0.5+0.5));
    return enc*0.5+0.5;
}

void write(vec3 diffuse, vec3 normal, float specular, float glossiness, vec3 emissive) {

	gBuffer0 = vec4(diffuse, 0.0);
	
	gBuffer1 = vec4(packNormal(normal), glossiness, specular);
	
	gBuffer2 = vec4(emissive, 0.0);
	
}