
//version 150 added by program together with FILTER_RADIUS

uniform sampler2DShadow shadowMap;

uniform vec2 shadowMapSize;

#define SAMPLES 16
const vec2 offsets[SAMPLES] = vec2[SAMPLES](
	(vec2(0.044821292,  0.110167414) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.1380541,    0.4925164  ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.1711376,    0.60476863 ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.0026801229, 0.8000565  ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.4459834,    0.14888838 ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.29496264,   0.38575724 ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.4706212,    0.6823994  ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.33042485,   0.8249533  ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.57578623,   0.1047747  ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.67860055,   0.25636286 ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.6422993,    0.5212651  ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.69669557,   0.9629153  ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.9217044,    0.1944445  ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.8729959,    0.4054296  ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.76195055,   0.6761958  ) * 2 - 1) * FILTER_RADIUS,
	(vec2(0.97839516,   0.90347415 ) * 2 - 1) * FILTER_RADIUS
);


float rand(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float shadow(vec2 coords, float d){

	float angle = rand(coords) * 360;
    vec2 rot = vec2(cos(angle), sin(angle));
    
    float passed = 0;
    for(int i = 0; i < SAMPLES; i++){
    	passed += texture(shadowMap, vec3(coords + reflect(offsets[i], rot), d));
    }
    for(int i = 0; i < SAMPLES; i++){
    	passed += texture(shadowMap, vec3(coords - reflect(offsets[i], rot), d));
    }
	return passed * (0.5 / SAMPLES);
}