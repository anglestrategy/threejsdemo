#version 300 es

// Three.js r185 - Node System


// extensions


// precision

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler3D;
precision highp samplerCube;
precision highp sampler2DArray;

precision highp usampler2D;
precision highp usampler3D;
precision highp usamplerCube;
precision highp usampler2DArray;

precision highp isampler2D;
precision highp isampler3D;
precision highp isamplerCube;
precision highp isampler2DArray;

precision highp sampler2DShadow;
precision highp sampler2DArrayShadow;
precision highp samplerCubeShadow;


// structs

layout( location = 0 ) out vec4 fragColor;



// uniforms

layout( std140 ) uniform render {
	mat4 cameraProjectionMatrix;
	mat4 cameraViewMatrix;
	vec3 nodeUniform11;
	vec3 nodeUniform16;
	vec3 nodeUniform17;
	vec3 nodeUniform15;
	vec3 nodeUniform9;
	vec3 nodeUniform10;
};

layout( std140 ) uniform object {
	mat3 nodeUniform1;
	mat4 nodeUniform3;
	float nodeUniform4;
	float nodeUniform5;
	float nodeUniform6;
	vec3 nodeUniform7;
	float nodeUniform8;
	uint nodeUniform13;
	uint nodeUniform14;
	uint nodeUniform18;
	uint nodeUniform19;
};
uniform sampler2D nodeUniform12;

// varyings
in vec3 v_positionWorld;
in vec3 v_normalViewGeometry;
in vec3 v_positionViewDirection;
in float nodeVarying7;
in vec4 nodeVarying8;


// vars
vec4 DiffuseColor;
vec3 nodeVar0;
float nodeVar1;
vec3 normalViewGeometry;
vec3 NORMAL_normalView;
vec3 normalView;
vec3 normalWorld;
vec3 nodeVar2;
vec2 nodeVar3;
float nodeVar4;
float nodeVar5;
float nodeVar6;
float nodeVar7;
float nodeVar8;
float nodeVar9;
float nodeVar10;
float nodeVar11;
float nodeVar12;
vec2 nodeVar13;
vec3 nodeVar14;
float nodeVar15;
vec2 nodeVar16;
float nodeVar17;
float nodeVar18;
vec2 nodeVar19;
vec2 nodeVar20;
vec3 nodeVar21;
vec2 nodeVar22;
vec3 nodeVar23;
vec2 nodeVar24;
vec3 nodeVar25;
vec2 nodeVar26;
vec3 nodeVar27;
vec2 nodeVar28;
vec2 nodeVar29;
vec3 nodeVar30;
vec2 nodeVar31;
vec3 nodeVar32;
vec2 nodeVar33;
vec3 nodeVar34;
vec2 nodeVar35;
vec3 nodeVar36;
vec2 nodeVar37;
vec2 nodeVar38;
vec3 nodeVar39;
vec2 nodeVar40;
vec3 nodeVar41;
vec2 nodeVar42;
vec3 nodeVar43;
vec2 nodeVar44;
vec3 nodeVar45;
vec2 nodeVar46;
vec2 nodeVar47;
vec3 nodeVar48;
vec2 nodeVar49;
vec3 nodeVar50;
vec2 nodeVar51;
vec3 nodeVar52;
vec2 nodeVar53;
vec3 nodeVar54;
vec3 nodeVar55;
vec2 nodeVar56;
vec2 nodeVar57;
float nodeVar58;
float nodeVar59;
vec2 nodeVar60;
vec2 nodeVar61;
vec3 nodeVar62;
vec2 nodeVar63;
vec3 nodeVar64;
vec2 nodeVar65;
vec3 nodeVar66;
vec2 nodeVar67;
vec3 nodeVar68;
vec2 nodeVar69;
vec2 nodeVar70;
vec3 nodeVar71;
vec2 nodeVar72;
vec3 nodeVar73;
vec2 nodeVar74;
vec3 nodeVar75;
vec2 nodeVar76;
vec3 nodeVar77;
vec2 nodeVar78;
vec2 nodeVar79;
vec3 nodeVar80;
vec2 nodeVar81;
vec3 nodeVar82;
vec2 nodeVar83;
vec3 nodeVar84;
vec2 nodeVar85;
vec3 nodeVar86;
vec2 nodeVar87;
vec2 nodeVar88;
vec3 nodeVar89;
vec2 nodeVar90;
vec3 nodeVar91;
vec2 nodeVar92;
vec3 nodeVar93;
vec2 nodeVar94;
vec3 nodeVar95;
vec2 nodeVar96;
float nodeVar97;
float nodeVar98;
vec2 nodeVar99;
vec2 nodeVar100;
vec3 nodeVar101;
vec2 nodeVar102;
vec3 nodeVar103;
vec2 nodeVar104;
vec3 nodeVar105;
vec2 nodeVar106;
vec3 nodeVar107;
vec2 nodeVar108;
vec2 nodeVar109;
vec3 nodeVar110;
vec2 nodeVar111;
vec3 nodeVar112;
vec2 nodeVar113;
vec3 nodeVar114;
vec2 nodeVar115;
vec3 nodeVar116;
vec2 nodeVar117;
vec2 nodeVar118;
vec3 nodeVar119;
vec2 nodeVar120;
vec3 nodeVar121;
vec2 nodeVar122;
vec3 nodeVar123;
vec2 nodeVar124;
vec3 nodeVar125;
vec2 nodeVar126;
vec2 nodeVar127;
vec3 nodeVar128;
vec2 nodeVar129;
vec3 nodeVar130;
vec2 nodeVar131;
vec3 nodeVar132;
vec2 nodeVar133;
vec3 nodeVar134;
vec2 nodeVar135;
float nodeVar136;
float nodeVar137;
vec2 nodeVar138;
vec2 nodeVar139;
vec3 nodeVar140;
vec2 nodeVar141;
vec3 nodeVar142;
vec2 nodeVar143;
vec3 nodeVar144;
vec2 nodeVar145;
vec3 nodeVar146;
vec2 nodeVar147;
vec2 nodeVar148;
vec3 nodeVar149;
vec2 nodeVar150;
vec3 nodeVar151;
vec2 nodeVar152;
vec3 nodeVar153;
vec2 nodeVar154;
vec3 nodeVar155;
vec2 nodeVar156;
vec2 nodeVar157;
vec3 nodeVar158;
vec2 nodeVar159;
vec3 nodeVar160;
vec2 nodeVar161;
vec3 nodeVar162;
vec2 nodeVar163;
vec3 nodeVar164;
vec2 nodeVar165;
vec2 nodeVar166;
vec3 nodeVar167;
vec2 nodeVar168;
vec3 nodeVar169;
vec2 nodeVar170;
vec3 nodeVar171;
vec2 nodeVar172;
vec3 nodeVar173;
float nodeVar174;
vec3 nodeVar175;
vec2 nodeVar176;
float nodeVar177;
float nodeVar178;
float nodeVar179;
float nodeVar180;
float nodeVar181;
float nodeVar182;
vec2 nodeVar183;
vec3 nodeVar184;
float nodeVar185;
vec2 nodeVar186;
float nodeVar187;
float nodeVar188;
vec2 nodeVar189;
vec2 nodeVar190;
vec3 nodeVar191;
vec2 nodeVar192;
vec3 nodeVar193;
vec2 nodeVar194;
vec3 nodeVar195;
vec2 nodeVar196;
vec3 nodeVar197;
vec2 nodeVar198;
vec2 nodeVar199;
vec3 nodeVar200;
vec2 nodeVar201;
vec3 nodeVar202;
vec2 nodeVar203;
vec3 nodeVar204;
vec2 nodeVar205;
vec3 nodeVar206;
vec2 nodeVar207;
vec2 nodeVar208;
vec3 nodeVar209;
vec2 nodeVar210;
vec3 nodeVar211;
vec2 nodeVar212;
vec3 nodeVar213;
vec2 nodeVar214;
vec3 nodeVar215;
vec2 nodeVar216;
vec2 nodeVar217;
vec3 nodeVar218;
vec2 nodeVar219;
vec3 nodeVar220;
vec2 nodeVar221;
vec3 nodeVar222;
vec2 nodeVar223;
vec3 nodeVar224;
vec3 nodeVar225;
vec2 nodeVar226;
float nodeVar227;
float nodeVar228;
float nodeVar229;
vec2 nodeVar230;
float nodeVar231;
float nodeVar232;
vec2 nodeVar233;
vec2 nodeVar234;
vec3 nodeVar235;
vec2 nodeVar236;
vec3 nodeVar237;
vec2 nodeVar238;
vec3 nodeVar239;
vec2 nodeVar240;
vec3 nodeVar241;
vec2 nodeVar242;
vec2 nodeVar243;
vec3 nodeVar244;
vec2 nodeVar245;
vec3 nodeVar246;
vec2 nodeVar247;
vec3 nodeVar248;
vec2 nodeVar249;
vec3 nodeVar250;
vec2 nodeVar251;
vec2 nodeVar252;
vec3 nodeVar253;
vec2 nodeVar254;
vec3 nodeVar255;
vec2 nodeVar256;
vec3 nodeVar257;
vec2 nodeVar258;
vec3 nodeVar259;
vec2 nodeVar260;
vec2 nodeVar261;
vec3 nodeVar262;
vec2 nodeVar263;
vec3 nodeVar264;
vec2 nodeVar265;
vec3 nodeVar266;
vec2 nodeVar267;
vec3 nodeVar268;
float nodeVar269;
float nodeVar270;
vec3 nodeVar271;
vec2 nodeVar272;
float nodeVar273;
float nodeVar274;
float nodeVar275;
float nodeVar276;
float nodeVar277;
float nodeVar278;
float nodeVar279;
vec2 nodeVar280;
float nodeVar281;
float nodeVar282;
vec2 nodeVar283;
vec2 nodeVar284;
vec3 nodeVar285;
vec2 nodeVar286;
vec3 nodeVar287;
vec2 nodeVar288;
vec3 nodeVar289;
vec2 nodeVar290;
vec3 nodeVar291;
vec2 nodeVar292;
vec2 nodeVar293;
vec3 nodeVar294;
vec2 nodeVar295;
vec3 nodeVar296;
vec2 nodeVar297;
vec3 nodeVar298;
vec2 nodeVar299;
vec3 nodeVar300;
vec2 nodeVar301;
vec2 nodeVar302;
vec3 nodeVar303;
vec2 nodeVar304;
vec3 nodeVar305;
vec2 nodeVar306;
vec3 nodeVar307;
vec2 nodeVar308;
vec3 nodeVar309;
vec2 nodeVar310;
vec2 nodeVar311;
vec3 nodeVar312;
vec2 nodeVar313;
vec3 nodeVar314;
vec2 nodeVar315;
vec3 nodeVar316;
vec2 nodeVar317;
vec3 nodeVar318;
float nodeVar319;
vec2 nodeVar320;
vec3 nodeVar321;
float nodeVar322;
vec2 nodeVar323;
float nodeVar324;
float nodeVar325;
vec2 nodeVar326;
vec2 nodeVar327;
vec3 nodeVar328;
vec2 nodeVar329;
vec3 nodeVar330;
vec2 nodeVar331;
vec3 nodeVar332;
vec2 nodeVar333;
vec3 nodeVar334;
vec2 nodeVar335;
vec2 nodeVar336;
vec3 nodeVar337;
vec2 nodeVar338;
vec3 nodeVar339;
vec2 nodeVar340;
vec3 nodeVar341;
vec2 nodeVar342;
vec3 nodeVar343;
vec2 nodeVar344;
vec2 nodeVar345;
vec3 nodeVar346;
vec2 nodeVar347;
vec3 nodeVar348;
vec2 nodeVar349;
vec3 nodeVar350;
vec2 nodeVar351;
vec3 nodeVar352;
vec2 nodeVar353;
vec2 nodeVar354;
vec3 nodeVar355;
vec2 nodeVar356;
vec3 nodeVar357;
vec2 nodeVar358;
vec3 nodeVar359;
vec2 nodeVar360;
vec3 nodeVar361;
float nodeVar362;
vec3 nodeVar363;
vec2 nodeVar364;
vec2 nodeVar365;
float nodeVar366;
float nodeVar367;
vec2 nodeVar368;
vec2 nodeVar369;
vec3 nodeVar370;
vec2 nodeVar371;
vec3 nodeVar372;
vec2 nodeVar373;
vec3 nodeVar374;
vec2 nodeVar375;
vec3 nodeVar376;
vec2 nodeVar377;
vec2 nodeVar378;
vec3 nodeVar379;
vec2 nodeVar380;
vec3 nodeVar381;
vec2 nodeVar382;
vec3 nodeVar383;
vec2 nodeVar384;
vec3 nodeVar385;
vec2 nodeVar386;
vec2 nodeVar387;
vec3 nodeVar388;
vec2 nodeVar389;
vec3 nodeVar390;
vec2 nodeVar391;
vec3 nodeVar392;
vec2 nodeVar393;
vec3 nodeVar394;
vec2 nodeVar395;
vec2 nodeVar396;
vec3 nodeVar397;
vec2 nodeVar398;
vec3 nodeVar399;
vec2 nodeVar400;
vec3 nodeVar401;
vec2 nodeVar402;
vec3 nodeVar403;
vec2 nodeVar404;
float nodeVar405;
float nodeVar406;
vec2 nodeVar407;
vec2 nodeVar408;
vec3 nodeVar409;
vec2 nodeVar410;
vec3 nodeVar411;
vec2 nodeVar412;
vec3 nodeVar413;
vec2 nodeVar414;
vec3 nodeVar415;
vec2 nodeVar416;
vec2 nodeVar417;
vec3 nodeVar418;
vec2 nodeVar419;
vec3 nodeVar420;
vec2 nodeVar421;
vec3 nodeVar422;
vec2 nodeVar423;
vec3 nodeVar424;
vec2 nodeVar425;
vec2 nodeVar426;
vec3 nodeVar427;
vec2 nodeVar428;
vec3 nodeVar429;
vec2 nodeVar430;
vec3 nodeVar431;
vec2 nodeVar432;
vec3 nodeVar433;
vec2 nodeVar434;
vec2 nodeVar435;
vec3 nodeVar436;
vec2 nodeVar437;
vec3 nodeVar438;
vec2 nodeVar439;
vec3 nodeVar440;
vec2 nodeVar441;
vec3 nodeVar442;
float nodeVar443;
vec3 nodeVar444;
vec2 nodeVar445;
vec2 nodeVar446;
float nodeVar447;
float nodeVar448;
vec2 nodeVar449;
vec2 nodeVar450;
vec3 nodeVar451;
vec2 nodeVar452;
vec3 nodeVar453;
vec2 nodeVar454;
vec3 nodeVar455;
vec2 nodeVar456;
vec3 nodeVar457;
vec2 nodeVar458;
vec2 nodeVar459;
vec3 nodeVar460;
vec2 nodeVar461;
vec3 nodeVar462;
vec2 nodeVar463;
vec3 nodeVar464;
vec2 nodeVar465;
vec3 nodeVar466;
vec2 nodeVar467;
vec2 nodeVar468;
vec3 nodeVar469;
vec2 nodeVar470;
vec3 nodeVar471;
vec2 nodeVar472;
vec3 nodeVar473;
vec2 nodeVar474;
vec3 nodeVar475;
vec2 nodeVar476;
vec2 nodeVar477;
vec3 nodeVar478;
vec2 nodeVar479;
vec3 nodeVar480;
vec2 nodeVar481;
vec3 nodeVar482;
vec2 nodeVar483;
vec3 nodeVar484;
float nodeVar485;
vec3 nodeVar486;
vec2 nodeVar487;
vec2 nodeVar488;
float nodeVar489;
float nodeVar490;
vec2 nodeVar491;
vec2 nodeVar492;
vec3 nodeVar493;
vec2 nodeVar494;
vec3 nodeVar495;
vec2 nodeVar496;
vec3 nodeVar497;
vec2 nodeVar498;
vec3 nodeVar499;
vec2 nodeVar500;
vec2 nodeVar501;
vec3 nodeVar502;
vec2 nodeVar503;
vec3 nodeVar504;
vec2 nodeVar505;
vec3 nodeVar506;
vec2 nodeVar507;
vec3 nodeVar508;
vec2 nodeVar509;
vec2 nodeVar510;
vec3 nodeVar511;
vec2 nodeVar512;
vec3 nodeVar513;
vec2 nodeVar514;
vec3 nodeVar515;
vec2 nodeVar516;
vec3 nodeVar517;
vec2 nodeVar518;
float nodeVar519;
float nodeVar520;
vec2 nodeVar521;
vec2 nodeVar522;
vec3 nodeVar523;
vec2 nodeVar524;
vec3 nodeVar525;
vec2 nodeVar526;
vec3 nodeVar527;
vec2 nodeVar528;
vec3 nodeVar529;
vec2 nodeVar530;
vec2 nodeVar531;
vec3 nodeVar532;
vec2 nodeVar533;
vec3 nodeVar534;
vec2 nodeVar535;
vec3 nodeVar536;
vec2 nodeVar537;
vec3 nodeVar538;
vec2 nodeVar539;
vec2 nodeVar540;
vec3 nodeVar541;
vec2 nodeVar542;
vec3 nodeVar543;
vec2 nodeVar544;
vec3 nodeVar545;
vec2 nodeVar546;
vec3 nodeVar547;
vec2 nodeVar548;
vec2 nodeVar549;
vec2 nodeVar550;
vec2 nodeVar551;
float nodeVar552;
float nodeVar553;
vec2 nodeVar554;
vec2 nodeVar555;
vec3 nodeVar556;
vec2 nodeVar557;
vec3 nodeVar558;
float nodeVar559;
vec2 nodeVar560;
vec3 nodeVar561;
vec2 nodeVar562;
vec3 nodeVar563;
float nodeVar564;
vec2 nodeVar565;
vec3 nodeVar566;
vec2 nodeVar567;
vec3 nodeVar568;
float nodeVar569;
vec2 nodeVar570;
vec3 nodeVar571;
vec2 nodeVar572;
vec3 nodeVar573;
float nodeVar574;
vec2 nodeVar575;
vec3 nodeVar576;
vec2 nodeVar577;
vec3 nodeVar578;
float nodeVar579;
vec2 nodeVar580;
vec3 nodeVar581;
vec2 nodeVar582;
vec3 nodeVar583;
float nodeVar584;
vec2 nodeVar585;
vec3 nodeVar586;
vec2 nodeVar587;
vec3 nodeVar588;
float nodeVar589;
vec2 nodeVar590;
vec3 nodeVar591;
vec2 nodeVar592;
vec3 nodeVar593;
float nodeVar594;
vec2 nodeVar595;
vec3 nodeVar596;
vec2 nodeVar597;
vec3 nodeVar598;
float nodeVar599;
float nodeVar600;
vec2 nodeVar601;
vec3 nodeVar602;
float nodeVar603;
vec2 nodeVar604;
float nodeVar605;
float nodeVar606;
vec2 nodeVar607;
vec2 nodeVar608;
vec3 nodeVar609;
vec2 nodeVar610;
vec3 nodeVar611;
vec2 nodeVar612;
vec3 nodeVar613;
vec2 nodeVar614;
vec3 nodeVar615;
vec2 nodeVar616;
vec2 nodeVar617;
vec3 nodeVar618;
vec2 nodeVar619;
vec3 nodeVar620;
vec2 nodeVar621;
vec3 nodeVar622;
vec2 nodeVar623;
vec3 nodeVar624;
vec2 nodeVar625;
vec2 nodeVar626;
vec3 nodeVar627;
vec2 nodeVar628;
vec3 nodeVar629;
vec2 nodeVar630;
vec3 nodeVar631;
vec2 nodeVar632;
vec3 nodeVar633;
vec2 nodeVar634;
vec2 nodeVar635;
vec3 nodeVar636;
vec2 nodeVar637;
vec3 nodeVar638;
vec2 nodeVar639;
vec3 nodeVar640;
vec2 nodeVar641;
vec3 nodeVar642;
vec3 nodeVar643;
vec2 nodeVar644;
vec2 nodeVar645;
float nodeVar646;
float nodeVar647;
vec2 nodeVar648;
vec2 nodeVar649;
vec3 nodeVar650;
vec2 nodeVar651;
vec3 nodeVar652;
vec2 nodeVar653;
vec3 nodeVar654;
vec2 nodeVar655;
vec3 nodeVar656;
vec2 nodeVar657;
vec2 nodeVar658;
vec3 nodeVar659;
vec2 nodeVar660;
vec3 nodeVar661;
vec2 nodeVar662;
vec3 nodeVar663;
vec2 nodeVar664;
vec3 nodeVar665;
vec2 nodeVar666;
vec2 nodeVar667;
vec3 nodeVar668;
vec2 nodeVar669;
vec3 nodeVar670;
vec2 nodeVar671;
vec3 nodeVar672;
vec2 nodeVar673;
vec3 nodeVar674;
vec2 nodeVar675;
vec2 nodeVar676;
vec3 nodeVar677;
vec2 nodeVar678;
vec3 nodeVar679;
vec2 nodeVar680;
vec3 nodeVar681;
vec2 nodeVar682;
vec3 nodeVar683;
vec2 nodeVar684;
float nodeVar685;
float nodeVar686;
vec2 nodeVar687;
vec2 nodeVar688;
vec3 nodeVar689;
vec2 nodeVar690;
vec3 nodeVar691;
vec2 nodeVar692;
vec3 nodeVar693;
vec2 nodeVar694;
vec3 nodeVar695;
vec2 nodeVar696;
vec2 nodeVar697;
vec3 nodeVar698;
vec2 nodeVar699;
vec3 nodeVar700;
vec2 nodeVar701;
vec3 nodeVar702;
vec2 nodeVar703;
vec3 nodeVar704;
vec2 nodeVar705;
vec2 nodeVar706;
vec3 nodeVar707;
vec2 nodeVar708;
vec3 nodeVar709;
vec2 nodeVar710;
vec3 nodeVar711;
vec2 nodeVar712;
vec3 nodeVar713;
vec2 nodeVar714;
vec2 nodeVar715;
vec3 nodeVar716;
vec2 nodeVar717;
vec3 nodeVar718;
vec2 nodeVar719;
vec3 nodeVar720;
vec2 nodeVar721;
vec3 nodeVar722;
float nodeVar723;
vec3 nodeVar724;
vec2 nodeVar725;
vec2 nodeVar726;
float nodeVar727;
float nodeVar728;
vec2 nodeVar729;
vec2 nodeVar730;
vec3 nodeVar731;
vec2 nodeVar732;
vec3 nodeVar733;
vec2 nodeVar734;
vec3 nodeVar735;
vec2 nodeVar736;
vec3 nodeVar737;
vec2 nodeVar738;
vec2 nodeVar739;
vec3 nodeVar740;
vec2 nodeVar741;
vec3 nodeVar742;
vec2 nodeVar743;
vec3 nodeVar744;
vec2 nodeVar745;
vec3 nodeVar746;
vec2 nodeVar747;
vec2 nodeVar748;
vec3 nodeVar749;
vec2 nodeVar750;
vec3 nodeVar751;
vec2 nodeVar752;
vec3 nodeVar753;
vec2 nodeVar754;
vec3 nodeVar755;
vec2 nodeVar756;
vec2 nodeVar757;
vec3 nodeVar758;
vec2 nodeVar759;
vec3 nodeVar760;
vec2 nodeVar761;
vec3 nodeVar762;
vec2 nodeVar763;
vec3 nodeVar764;
vec2 nodeVar765;
float nodeVar766;
float nodeVar767;
vec2 nodeVar768;
vec2 nodeVar769;
vec3 nodeVar770;
vec2 nodeVar771;
vec3 nodeVar772;
vec2 nodeVar773;
vec3 nodeVar774;
vec2 nodeVar775;
vec3 nodeVar776;
vec2 nodeVar777;
vec2 nodeVar778;
vec3 nodeVar779;
vec2 nodeVar780;
vec3 nodeVar781;
vec2 nodeVar782;
vec3 nodeVar783;
vec2 nodeVar784;
vec3 nodeVar785;
vec2 nodeVar786;
vec2 nodeVar787;
vec3 nodeVar788;
vec2 nodeVar789;
vec3 nodeVar790;
vec2 nodeVar791;
vec3 nodeVar792;
vec2 nodeVar793;
vec3 nodeVar794;
vec2 nodeVar795;
vec2 nodeVar796;
vec3 nodeVar797;
vec2 nodeVar798;
vec3 nodeVar799;
vec2 nodeVar800;
vec3 nodeVar801;
vec2 nodeVar802;
vec3 nodeVar803;
float nodeVar804;
vec3 nodeVar805;
vec2 nodeVar806;
vec2 nodeVar807;
float nodeVar808;
float nodeVar809;
vec2 nodeVar810;
vec2 nodeVar811;
vec3 nodeVar812;
vec2 nodeVar813;
vec3 nodeVar814;
vec2 nodeVar815;
vec3 nodeVar816;
vec2 nodeVar817;
vec3 nodeVar818;
vec2 nodeVar819;
vec2 nodeVar820;
vec3 nodeVar821;
vec2 nodeVar822;
vec3 nodeVar823;
vec2 nodeVar824;
vec3 nodeVar825;
vec2 nodeVar826;
vec3 nodeVar827;
vec2 nodeVar828;
vec2 nodeVar829;
vec3 nodeVar830;
vec2 nodeVar831;
vec3 nodeVar832;
vec2 nodeVar833;
vec3 nodeVar834;
vec2 nodeVar835;
vec3 nodeVar836;
vec2 nodeVar837;
vec2 nodeVar838;
vec3 nodeVar839;
vec2 nodeVar840;
vec3 nodeVar841;
vec2 nodeVar842;
vec3 nodeVar843;
vec2 nodeVar844;
vec3 nodeVar845;
vec2 nodeVar846;
float nodeVar847;
float nodeVar848;
vec2 nodeVar849;
vec2 nodeVar850;
vec3 nodeVar851;
vec2 nodeVar852;
vec3 nodeVar853;
vec2 nodeVar854;
vec3 nodeVar855;
vec2 nodeVar856;
vec3 nodeVar857;
vec2 nodeVar858;
vec2 nodeVar859;
vec3 nodeVar860;
vec2 nodeVar861;
vec3 nodeVar862;
vec2 nodeVar863;
vec3 nodeVar864;
vec2 nodeVar865;
vec3 nodeVar866;
vec2 nodeVar867;
vec2 nodeVar868;
vec3 nodeVar869;
vec2 nodeVar870;
vec3 nodeVar871;
vec2 nodeVar872;
vec3 nodeVar873;
vec2 nodeVar874;
vec3 nodeVar875;
vec2 nodeVar876;
vec2 nodeVar877;
vec3 nodeVar878;
vec2 nodeVar879;
vec3 nodeVar880;
vec2 nodeVar881;
vec3 nodeVar882;
vec2 nodeVar883;
vec3 nodeVar884;
float nodeVar885;
vec3 nodeVar886;
vec2 nodeVar887;
vec2 nodeVar888;
float nodeVar889;
float nodeVar890;
vec2 nodeVar891;
vec2 nodeVar892;
vec3 nodeVar893;
vec2 nodeVar894;
vec3 nodeVar895;
vec2 nodeVar896;
vec3 nodeVar897;
vec2 nodeVar898;
vec3 nodeVar899;
vec2 nodeVar900;
vec2 nodeVar901;
vec3 nodeVar902;
vec2 nodeVar903;
vec3 nodeVar904;
vec2 nodeVar905;
vec3 nodeVar906;
vec2 nodeVar907;
vec3 nodeVar908;
vec2 nodeVar909;
vec2 nodeVar910;
vec3 nodeVar911;
vec2 nodeVar912;
vec3 nodeVar913;
vec2 nodeVar914;
vec3 nodeVar915;
vec2 nodeVar916;
vec3 nodeVar917;
vec2 nodeVar918;
vec2 nodeVar919;
vec3 nodeVar920;
vec2 nodeVar921;
vec3 nodeVar922;
vec2 nodeVar923;
vec3 nodeVar924;
vec2 nodeVar925;
vec3 nodeVar926;
float nodeVar927;
vec3 nodeVar928;
vec4 nodeVar929;
vec4 nodeVar930;
float Metalness;
float Roughness;
vec3 nodeVar931;
vec3 SpecularColor;
vec3 SpecularColorBlended;
float SpecularF90;
vec3 DiffuseContribution;
vec3 EmissiveColor;
vec4 Output;
vec3 nodeVar932;
vec4 nodeVar933;
vec4 nodeVar934;
vec3 nodeVar935;
vec3 nodeVar936;
float nodeVar937;
vec3 nodeVar938;
vec3 nodeVar939;
vec3 directDiffuse;
vec3 nodeVar940;
vec3 nodeVar941;
vec3 nodeVar942;
vec3 directSpecular;
vec3 positionViewDirection;
vec3 nodeVar943;
float nodeVar944;
float nodeVar945;
float nodeVar946;
vec2 nodeVar947;
vec2 nodeVar948;
bool nodeVar949;
vec2 nodeVar950;
vec4 nodeVar951;
vec2 nodeVar952;
vec2 nodeVar953;
bool nodeVar954;
vec2 nodeVar955;
vec4 nodeVar956;
vec3 nodeVar957;
float nodeVar958;
float nodeVar959;
vec3 nodeVar960;
vec3 nodeVar961;
vec3 nodeVar962;
vec3 irradiance;
float nodeVar963;
float nodeVar964;
float nodeVar965;
vec3 nodeVar966;
vec3 nodeVar967;
vec3 nodeVar968;
vec3 nodeVar969;
vec3 nodeVar970;
vec3 indirectDiffuse;
vec3 nodeVar971;
vec3 singleScatteringDielectric;
vec3 multiScatteringDielectric;
vec3 singleScatteringMetallic;
vec3 multiScatteringMetallic;
float nodeVar972;
vec2 nodeVar973;
vec2 nodeVar974;
bool nodeVar975;
vec2 nodeVar976;
vec4 nodeVar977;
vec3 nodeVar978;
float nodeVar979;
vec3 nodeVar980;
vec3 nodeVar981;
vec3 nodeVar982;
vec3 nodeVar983;
vec3 nodeVar984;
vec3 nodeVar985;
vec3 nodeVar986;
float nodeVar987;
float nodeVar988;
float nodeVar989;
vec3 nodeVar990;
vec3 nodeVar991;
vec3 nodeVar992;
vec3 nodeVar993;
vec3 nodeVar994;
vec3 nodeVar995;
float nodeVar996;
vec2 nodeVar997;
vec2 nodeVar998;
bool nodeVar999;
vec2 nodeVar1000;
vec4 nodeVar1001;
vec3 nodeVar1002;
float nodeVar1003;
vec3 nodeVar1004;
vec3 nodeVar1005;
vec3 nodeVar1006;
vec3 nodeVar1007;
vec3 nodeVar1008;
vec3 nodeVar1009;
vec3 nodeVar1010;
float nodeVar1011;
float nodeVar1012;
float nodeVar1013;
vec3 nodeVar1014;
vec3 nodeVar1015;
vec3 nodeVar1016;
vec3 nodeVar1017;
vec3 nodeVar1018;
vec3 nodeVar1019;
vec3 radiance;
vec3 nodeVar1020;
vec3 nodeVar1021;
vec3 nodeVar1022;
vec3 iblIrradiance;
vec3 nodeVar1023;
vec3 nodeVar1024;
vec3 nodeVar1025;
vec3 nodeVar1026;
vec3 nodeVar1027;
vec3 nodeVar1028;
vec3 nodeVar1029;
vec3 nodeVar1030;
vec3 nodeVar1031;
vec3 nodeVar1032;
vec3 indirectSpecular;
vec3 nodeVar1033;
vec3 nodeVar1034;
float ambientOcclusion;
vec3 nodeVar1035;
float nodeVar1036;
float nodeVar1037;
float nodeVar1038;
float nodeVar1039;
float nodeVar1040;
float nodeVar1041;
float nodeVar1042;
float nodeVar1043;
float nodeVar1044;
float nodeVar1045;
float nodeVar1046;
vec3 nodeVar1047;
vec3 totalDiffuse;
vec3 nodeVar1048;
vec3 totalSpecular;
vec3 nodeVar1049;
vec3 outgoingLight;
vec3 nodeVar1050;
vec4 nodeVar1051;

// codes
float V_GGX_SmithCorrelated ( float alpha, float dotNL, float dotNV ) {

	float nodeVar0;

	nodeVar0 = ( alpha * alpha );

	return ( 0.5 / max( ( ( dotNL * sqrt( ( nodeVar0 + ( ( 1.0 - nodeVar0 ) * ( dotNV * dotNV ) ) ) ) ) + ( dotNV * sqrt( ( nodeVar0 + ( ( 1.0 - nodeVar0 ) * ( dotNL * dotNL ) ) ) ) ) ), 0.000001 ) );

}

float D_GGX ( float alpha, float dotNH ) {

	float nodeVar0;
	float nodeVar1;

	nodeVar0 = ( alpha * alpha );
	nodeVar1 = ( 1.0 - ( ( dotNH * dotNH ) * ( 1.0 - nodeVar0 ) ) );

	return ( ( nodeVar0 / ( nodeVar1 * nodeVar1 ) ) * 0.3183098861837907 );

}



void main() {

	// flow
	// code

	nodeVar0 = vec3( 0.0, 1.0, 0.5 );
	nodeVar1 = floor( nodeVarying7 );

	if ( ( nodeVar1 < 0.5 ) ) {

		normalViewGeometry = normalize( v_normalViewGeometry );
		NORMAL_normalView = normalViewGeometry;
		normalView = NORMAL_normalView;
		normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
		nodeVar2 = abs( normalWorld );
		nodeVar3 = vec2( 0.0, 0.0 );

		if ( ( nodeVar2.y > max( nodeVar2.x, nodeVar2.z ) ) ) {

			nodeVar3 = v_positionWorld.xz;
			

		} else {


			if ( ( nodeVar2.x > nodeVar2.z ) ) {

				nodeVar3 = vec2( v_positionWorld.z, v_positionWorld.y );
				

			} else {

				nodeVar3 = vec2( v_positionWorld.x, v_positionWorld.y );
				

			}

			

		}

		nodeVar4 = floor( ( nodeVar3.y / 0.225 ) );
		nodeVar5 = fract( ( ( nodeVar4 * 7.13 ) * 0.1031 ) );
		nodeVar5 = ( nodeVar5 * ( nodeVar5 + 33.33 ) );
		nodeVar5 = ( nodeVar5 * ( nodeVar5 + nodeVar5 ) );
		nodeVar6 = ( fract( nodeVar5 ) * 0.9 );
		nodeVar7 = fract( ( ( ( nodeVar4 * 3.7 ) + 11.0 ) * 0.1031 ) );
		nodeVar7 = ( nodeVar7 * ( nodeVar7 + 33.33 ) );
		nodeVar7 = ( nodeVar7 * ( nodeVar7 + nodeVar7 ) );
		nodeVar8 = ( 0.42 + ( fract( nodeVar7 ) * 0.42 ) );
		nodeVar9 = fract( ( ( nodeVar3.x + nodeVar6 ) / nodeVar8 ) );
		nodeVar10 = fract( ( nodeVar3.y / 0.225 ) );
		nodeVar11 = min( ( min( nodeVar9, ( 1.0 - nodeVar9 ) ) * nodeVar8 ), ( min( nodeVar10, ( 1.0 - nodeVar10 ) ) * 0.225 ) );
		nodeVar12 = smoothstep( 0.0, 0.016, nodeVar11 );
		nodeVar13 = ( vec2( floor( ( ( nodeVar3.x + nodeVar6 ) / nodeVar8 ) ), nodeVar4 ) * vec2( 1.37 ) );
		nodeVar14 = fract( ( vec3( nodeVar13.x, nodeVar13.y, nodeVar13.x ) * vec3( 0.1031 ) ) );
		nodeVar14 = ( nodeVar14 + vec3( dot( nodeVar14, ( nodeVar14.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar15 = fract( ( ( nodeVar14.x + nodeVar14.y ) * nodeVar14.z ) );
		nodeVar16 = ( ( nodeVar3 * vec2( 22.0 ) ) + vec2( ( nodeVar15 * 30.0 ) ) );
		nodeVar17 = 0.0;
		nodeVar18 = 0.5;
		nodeVar19 = floor( nodeVar16 );
		nodeVar20 = fract( nodeVar16 );
		nodeVar20 = ( ( nodeVar20 * nodeVar20 ) * ( vec2( 3.0 ) - ( nodeVar20 * vec2( 2.0 ) ) ) );
		nodeVar21 = fract( ( vec3( nodeVar19.x, nodeVar19.y, nodeVar19.x ) * vec3( 0.1031 ) ) );
		nodeVar21 = ( nodeVar21 + vec3( dot( nodeVar21, ( nodeVar21.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar22 = ( nodeVar19 + vec2( 1.0, 0.0 ) );
		nodeVar23 = fract( ( vec3( nodeVar22.x, nodeVar22.y, nodeVar22.x ) * vec3( 0.1031 ) ) );
		nodeVar23 = ( nodeVar23 + vec3( dot( nodeVar23, ( nodeVar23.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar24 = ( nodeVar19 + vec2( 0.0, 1.0 ) );
		nodeVar25 = fract( ( vec3( nodeVar24.x, nodeVar24.y, nodeVar24.x ) * vec3( 0.1031 ) ) );
		nodeVar25 = ( nodeVar25 + vec3( dot( nodeVar25, ( nodeVar25.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar26 = ( nodeVar19 + vec2( 1.0, 1.0 ) );
		nodeVar27 = fract( ( vec3( nodeVar26.x, nodeVar26.y, nodeVar26.x ) * vec3( 0.1031 ) ) );
		nodeVar27 = ( nodeVar27 + vec3( dot( nodeVar27, ( nodeVar27.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar17 = ( nodeVar17 + ( nodeVar18 * mix( mix( fract( ( ( nodeVar21.x + nodeVar21.y ) * nodeVar21.z ) ), fract( ( ( nodeVar23.x + nodeVar23.y ) * nodeVar23.z ) ), nodeVar20.x ), mix( fract( ( ( nodeVar25.x + nodeVar25.y ) * nodeVar25.z ) ), fract( ( ( nodeVar27.x + nodeVar27.y ) * nodeVar27.z ) ), nodeVar20.x ), nodeVar20.y ) ) );
		nodeVar16 = ( nodeVar16 * vec2( 2.03 ) );
		nodeVar18 = ( nodeVar18 * 0.52 );
		nodeVar28 = floor( nodeVar16 );
		nodeVar29 = fract( nodeVar16 );
		nodeVar29 = ( ( nodeVar29 * nodeVar29 ) * ( vec2( 3.0 ) - ( nodeVar29 * vec2( 2.0 ) ) ) );
		nodeVar30 = fract( ( vec3( nodeVar28.x, nodeVar28.y, nodeVar28.x ) * vec3( 0.1031 ) ) );
		nodeVar30 = ( nodeVar30 + vec3( dot( nodeVar30, ( nodeVar30.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar31 = ( nodeVar28 + vec2( 1.0, 0.0 ) );
		nodeVar32 = fract( ( vec3( nodeVar31.x, nodeVar31.y, nodeVar31.x ) * vec3( 0.1031 ) ) );
		nodeVar32 = ( nodeVar32 + vec3( dot( nodeVar32, ( nodeVar32.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar33 = ( nodeVar28 + vec2( 0.0, 1.0 ) );
		nodeVar34 = fract( ( vec3( nodeVar33.x, nodeVar33.y, nodeVar33.x ) * vec3( 0.1031 ) ) );
		nodeVar34 = ( nodeVar34 + vec3( dot( nodeVar34, ( nodeVar34.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar35 = ( nodeVar28 + vec2( 1.0, 1.0 ) );
		nodeVar36 = fract( ( vec3( nodeVar35.x, nodeVar35.y, nodeVar35.x ) * vec3( 0.1031 ) ) );
		nodeVar36 = ( nodeVar36 + vec3( dot( nodeVar36, ( nodeVar36.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar17 = ( nodeVar17 + ( nodeVar18 * mix( mix( fract( ( ( nodeVar30.x + nodeVar30.y ) * nodeVar30.z ) ), fract( ( ( nodeVar32.x + nodeVar32.y ) * nodeVar32.z ) ), nodeVar29.x ), mix( fract( ( ( nodeVar34.x + nodeVar34.y ) * nodeVar34.z ) ), fract( ( ( nodeVar36.x + nodeVar36.y ) * nodeVar36.z ) ), nodeVar29.x ), nodeVar29.y ) ) );
		nodeVar16 = ( nodeVar16 * vec2( 2.03 ) );
		nodeVar18 = ( nodeVar18 * 0.52 );
		nodeVar37 = floor( nodeVar16 );
		nodeVar38 = fract( nodeVar16 );
		nodeVar38 = ( ( nodeVar38 * nodeVar38 ) * ( vec2( 3.0 ) - ( nodeVar38 * vec2( 2.0 ) ) ) );
		nodeVar39 = fract( ( vec3( nodeVar37.x, nodeVar37.y, nodeVar37.x ) * vec3( 0.1031 ) ) );
		nodeVar39 = ( nodeVar39 + vec3( dot( nodeVar39, ( nodeVar39.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar40 = ( nodeVar37 + vec2( 1.0, 0.0 ) );
		nodeVar41 = fract( ( vec3( nodeVar40.x, nodeVar40.y, nodeVar40.x ) * vec3( 0.1031 ) ) );
		nodeVar41 = ( nodeVar41 + vec3( dot( nodeVar41, ( nodeVar41.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar42 = ( nodeVar37 + vec2( 0.0, 1.0 ) );
		nodeVar43 = fract( ( vec3( nodeVar42.x, nodeVar42.y, nodeVar42.x ) * vec3( 0.1031 ) ) );
		nodeVar43 = ( nodeVar43 + vec3( dot( nodeVar43, ( nodeVar43.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar44 = ( nodeVar37 + vec2( 1.0, 1.0 ) );
		nodeVar45 = fract( ( vec3( nodeVar44.x, nodeVar44.y, nodeVar44.x ) * vec3( 0.1031 ) ) );
		nodeVar45 = ( nodeVar45 + vec3( dot( nodeVar45, ( nodeVar45.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar17 = ( nodeVar17 + ( nodeVar18 * mix( mix( fract( ( ( nodeVar39.x + nodeVar39.y ) * nodeVar39.z ) ), fract( ( ( nodeVar41.x + nodeVar41.y ) * nodeVar41.z ) ), nodeVar38.x ), mix( fract( ( ( nodeVar43.x + nodeVar43.y ) * nodeVar43.z ) ), fract( ( ( nodeVar45.x + nodeVar45.y ) * nodeVar45.z ) ), nodeVar38.x ), nodeVar38.y ) ) );
		nodeVar16 = ( nodeVar16 * vec2( 2.03 ) );
		nodeVar18 = ( nodeVar18 * 0.52 );
		nodeVar46 = floor( nodeVar16 );
		nodeVar47 = fract( nodeVar16 );
		nodeVar47 = ( ( nodeVar47 * nodeVar47 ) * ( vec2( 3.0 ) - ( nodeVar47 * vec2( 2.0 ) ) ) );
		nodeVar48 = fract( ( vec3( nodeVar46.x, nodeVar46.y, nodeVar46.x ) * vec3( 0.1031 ) ) );
		nodeVar48 = ( nodeVar48 + vec3( dot( nodeVar48, ( nodeVar48.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar49 = ( nodeVar46 + vec2( 1.0, 0.0 ) );
		nodeVar50 = fract( ( vec3( nodeVar49.x, nodeVar49.y, nodeVar49.x ) * vec3( 0.1031 ) ) );
		nodeVar50 = ( nodeVar50 + vec3( dot( nodeVar50, ( nodeVar50.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar51 = ( nodeVar46 + vec2( 0.0, 1.0 ) );
		nodeVar52 = fract( ( vec3( nodeVar51.x, nodeVar51.y, nodeVar51.x ) * vec3( 0.1031 ) ) );
		nodeVar52 = ( nodeVar52 + vec3( dot( nodeVar52, ( nodeVar52.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar53 = ( nodeVar46 + vec2( 1.0, 1.0 ) );
		nodeVar54 = fract( ( vec3( nodeVar53.x, nodeVar53.y, nodeVar53.x ) * vec3( 0.1031 ) ) );
		nodeVar54 = ( nodeVar54 + vec3( dot( nodeVar54, ( nodeVar54.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar17 = ( nodeVar17 + ( nodeVar18 * mix( mix( fract( ( ( nodeVar48.x + nodeVar48.y ) * nodeVar48.z ) ), fract( ( ( nodeVar50.x + nodeVar50.y ) * nodeVar50.z ) ), nodeVar47.x ), mix( fract( ( ( nodeVar52.x + nodeVar52.y ) * nodeVar52.z ) ), fract( ( ( nodeVar54.x + nodeVar54.y ) * nodeVar54.z ) ), nodeVar47.x ), nodeVar47.y ) ) );
		nodeVar16 = ( nodeVar16 * vec2( 2.03 ) );
		nodeVar18 = ( nodeVar18 * 0.52 );
		nodeVar0 = vec3( ( ( ( nodeVar12 * ( 0.55 + ( nodeVar15 * 0.45 ) ) ) * 0.55 ) + ( ( ( 0.55 + ( nodeVar17 * 0.45 ) ) * 0.3 ) * nodeVar12 ) ), nodeVar12, nodeVar15 );
		

	} else {


		if ( ( nodeVar1 < 1.5 ) ) {

			normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
			nodeVar55 = abs( normalWorld );
			nodeVar56 = vec2( 0.0, 0.0 );

			if ( ( nodeVar55.y > max( nodeVar55.x, nodeVar55.z ) ) ) {

				nodeVar56 = v_positionWorld.xz;
				

			} else {


				if ( ( nodeVar55.x > nodeVar55.z ) ) {

					nodeVar56 = vec2( v_positionWorld.z, v_positionWorld.y );
					

				} else {

					nodeVar56 = vec2( v_positionWorld.x, v_positionWorld.y );
					

				}

				

			}

			nodeVar57 = ( nodeVar56 * vec2( 3.2 ) );
			nodeVar58 = 0.0;
			nodeVar59 = 0.5;
			nodeVar60 = floor( nodeVar57 );
			nodeVar61 = fract( nodeVar57 );
			nodeVar61 = ( ( nodeVar61 * nodeVar61 ) * ( vec2( 3.0 ) - ( nodeVar61 * vec2( 2.0 ) ) ) );
			nodeVar62 = fract( ( vec3( nodeVar60.x, nodeVar60.y, nodeVar60.x ) * vec3( 0.1031 ) ) );
			nodeVar62 = ( nodeVar62 + vec3( dot( nodeVar62, ( nodeVar62.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar63 = ( nodeVar60 + vec2( 1.0, 0.0 ) );
			nodeVar64 = fract( ( vec3( nodeVar63.x, nodeVar63.y, nodeVar63.x ) * vec3( 0.1031 ) ) );
			nodeVar64 = ( nodeVar64 + vec3( dot( nodeVar64, ( nodeVar64.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar65 = ( nodeVar60 + vec2( 0.0, 1.0 ) );
			nodeVar66 = fract( ( vec3( nodeVar65.x, nodeVar65.y, nodeVar65.x ) * vec3( 0.1031 ) ) );
			nodeVar66 = ( nodeVar66 + vec3( dot( nodeVar66, ( nodeVar66.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar67 = ( nodeVar60 + vec2( 1.0, 1.0 ) );
			nodeVar68 = fract( ( vec3( nodeVar67.x, nodeVar67.y, nodeVar67.x ) * vec3( 0.1031 ) ) );
			nodeVar68 = ( nodeVar68 + vec3( dot( nodeVar68, ( nodeVar68.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar58 = ( nodeVar58 + ( nodeVar59 * mix( mix( fract( ( ( nodeVar62.x + nodeVar62.y ) * nodeVar62.z ) ), fract( ( ( nodeVar64.x + nodeVar64.y ) * nodeVar64.z ) ), nodeVar61.x ), mix( fract( ( ( nodeVar66.x + nodeVar66.y ) * nodeVar66.z ) ), fract( ( ( nodeVar68.x + nodeVar68.y ) * nodeVar68.z ) ), nodeVar61.x ), nodeVar61.y ) ) );
			nodeVar57 = ( nodeVar57 * vec2( 2.03 ) );
			nodeVar59 = ( nodeVar59 * 0.52 );
			nodeVar69 = floor( nodeVar57 );
			nodeVar70 = fract( nodeVar57 );
			nodeVar70 = ( ( nodeVar70 * nodeVar70 ) * ( vec2( 3.0 ) - ( nodeVar70 * vec2( 2.0 ) ) ) );
			nodeVar71 = fract( ( vec3( nodeVar69.x, nodeVar69.y, nodeVar69.x ) * vec3( 0.1031 ) ) );
			nodeVar71 = ( nodeVar71 + vec3( dot( nodeVar71, ( nodeVar71.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar72 = ( nodeVar69 + vec2( 1.0, 0.0 ) );
			nodeVar73 = fract( ( vec3( nodeVar72.x, nodeVar72.y, nodeVar72.x ) * vec3( 0.1031 ) ) );
			nodeVar73 = ( nodeVar73 + vec3( dot( nodeVar73, ( nodeVar73.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar74 = ( nodeVar69 + vec2( 0.0, 1.0 ) );
			nodeVar75 = fract( ( vec3( nodeVar74.x, nodeVar74.y, nodeVar74.x ) * vec3( 0.1031 ) ) );
			nodeVar75 = ( nodeVar75 + vec3( dot( nodeVar75, ( nodeVar75.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar76 = ( nodeVar69 + vec2( 1.0, 1.0 ) );
			nodeVar77 = fract( ( vec3( nodeVar76.x, nodeVar76.y, nodeVar76.x ) * vec3( 0.1031 ) ) );
			nodeVar77 = ( nodeVar77 + vec3( dot( nodeVar77, ( nodeVar77.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar58 = ( nodeVar58 + ( nodeVar59 * mix( mix( fract( ( ( nodeVar71.x + nodeVar71.y ) * nodeVar71.z ) ), fract( ( ( nodeVar73.x + nodeVar73.y ) * nodeVar73.z ) ), nodeVar70.x ), mix( fract( ( ( nodeVar75.x + nodeVar75.y ) * nodeVar75.z ) ), fract( ( ( nodeVar77.x + nodeVar77.y ) * nodeVar77.z ) ), nodeVar70.x ), nodeVar70.y ) ) );
			nodeVar57 = ( nodeVar57 * vec2( 2.03 ) );
			nodeVar59 = ( nodeVar59 * 0.52 );
			nodeVar78 = floor( nodeVar57 );
			nodeVar79 = fract( nodeVar57 );
			nodeVar79 = ( ( nodeVar79 * nodeVar79 ) * ( vec2( 3.0 ) - ( nodeVar79 * vec2( 2.0 ) ) ) );
			nodeVar80 = fract( ( vec3( nodeVar78.x, nodeVar78.y, nodeVar78.x ) * vec3( 0.1031 ) ) );
			nodeVar80 = ( nodeVar80 + vec3( dot( nodeVar80, ( nodeVar80.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar81 = ( nodeVar78 + vec2( 1.0, 0.0 ) );
			nodeVar82 = fract( ( vec3( nodeVar81.x, nodeVar81.y, nodeVar81.x ) * vec3( 0.1031 ) ) );
			nodeVar82 = ( nodeVar82 + vec3( dot( nodeVar82, ( nodeVar82.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar83 = ( nodeVar78 + vec2( 0.0, 1.0 ) );
			nodeVar84 = fract( ( vec3( nodeVar83.x, nodeVar83.y, nodeVar83.x ) * vec3( 0.1031 ) ) );
			nodeVar84 = ( nodeVar84 + vec3( dot( nodeVar84, ( nodeVar84.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar85 = ( nodeVar78 + vec2( 1.0, 1.0 ) );
			nodeVar86 = fract( ( vec3( nodeVar85.x, nodeVar85.y, nodeVar85.x ) * vec3( 0.1031 ) ) );
			nodeVar86 = ( nodeVar86 + vec3( dot( nodeVar86, ( nodeVar86.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar58 = ( nodeVar58 + ( nodeVar59 * mix( mix( fract( ( ( nodeVar80.x + nodeVar80.y ) * nodeVar80.z ) ), fract( ( ( nodeVar82.x + nodeVar82.y ) * nodeVar82.z ) ), nodeVar79.x ), mix( fract( ( ( nodeVar84.x + nodeVar84.y ) * nodeVar84.z ) ), fract( ( ( nodeVar86.x + nodeVar86.y ) * nodeVar86.z ) ), nodeVar79.x ), nodeVar79.y ) ) );
			nodeVar57 = ( nodeVar57 * vec2( 2.03 ) );
			nodeVar59 = ( nodeVar59 * 0.52 );
			nodeVar87 = floor( nodeVar57 );
			nodeVar88 = fract( nodeVar57 );
			nodeVar88 = ( ( nodeVar88 * nodeVar88 ) * ( vec2( 3.0 ) - ( nodeVar88 * vec2( 2.0 ) ) ) );
			nodeVar89 = fract( ( vec3( nodeVar87.x, nodeVar87.y, nodeVar87.x ) * vec3( 0.1031 ) ) );
			nodeVar89 = ( nodeVar89 + vec3( dot( nodeVar89, ( nodeVar89.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar90 = ( nodeVar87 + vec2( 1.0, 0.0 ) );
			nodeVar91 = fract( ( vec3( nodeVar90.x, nodeVar90.y, nodeVar90.x ) * vec3( 0.1031 ) ) );
			nodeVar91 = ( nodeVar91 + vec3( dot( nodeVar91, ( nodeVar91.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar92 = ( nodeVar87 + vec2( 0.0, 1.0 ) );
			nodeVar93 = fract( ( vec3( nodeVar92.x, nodeVar92.y, nodeVar92.x ) * vec3( 0.1031 ) ) );
			nodeVar93 = ( nodeVar93 + vec3( dot( nodeVar93, ( nodeVar93.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar94 = ( nodeVar87 + vec2( 1.0, 1.0 ) );
			nodeVar95 = fract( ( vec3( nodeVar94.x, nodeVar94.y, nodeVar94.x ) * vec3( 0.1031 ) ) );
			nodeVar95 = ( nodeVar95 + vec3( dot( nodeVar95, ( nodeVar95.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar58 = ( nodeVar58 + ( nodeVar59 * mix( mix( fract( ( ( nodeVar89.x + nodeVar89.y ) * nodeVar89.z ) ), fract( ( ( nodeVar91.x + nodeVar91.y ) * nodeVar91.z ) ), nodeVar88.x ), mix( fract( ( ( nodeVar93.x + nodeVar93.y ) * nodeVar93.z ) ), fract( ( ( nodeVar95.x + nodeVar95.y ) * nodeVar95.z ) ), nodeVar88.x ), nodeVar88.y ) ) );
			nodeVar57 = ( nodeVar57 * vec2( 2.03 ) );
			nodeVar59 = ( nodeVar59 * 0.52 );
			nodeVar96 = ( nodeVar56 * vec2( 14.0 ) );
			nodeVar97 = 0.0;
			nodeVar98 = 0.5;
			nodeVar99 = floor( nodeVar96 );
			nodeVar100 = fract( nodeVar96 );
			nodeVar100 = ( ( nodeVar100 * nodeVar100 ) * ( vec2( 3.0 ) - ( nodeVar100 * vec2( 2.0 ) ) ) );
			nodeVar101 = fract( ( vec3( nodeVar99.x, nodeVar99.y, nodeVar99.x ) * vec3( 0.1031 ) ) );
			nodeVar101 = ( nodeVar101 + vec3( dot( nodeVar101, ( nodeVar101.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar102 = ( nodeVar99 + vec2( 1.0, 0.0 ) );
			nodeVar103 = fract( ( vec3( nodeVar102.x, nodeVar102.y, nodeVar102.x ) * vec3( 0.1031 ) ) );
			nodeVar103 = ( nodeVar103 + vec3( dot( nodeVar103, ( nodeVar103.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar104 = ( nodeVar99 + vec2( 0.0, 1.0 ) );
			nodeVar105 = fract( ( vec3( nodeVar104.x, nodeVar104.y, nodeVar104.x ) * vec3( 0.1031 ) ) );
			nodeVar105 = ( nodeVar105 + vec3( dot( nodeVar105, ( nodeVar105.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar106 = ( nodeVar99 + vec2( 1.0, 1.0 ) );
			nodeVar107 = fract( ( vec3( nodeVar106.x, nodeVar106.y, nodeVar106.x ) * vec3( 0.1031 ) ) );
			nodeVar107 = ( nodeVar107 + vec3( dot( nodeVar107, ( nodeVar107.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar97 = ( nodeVar97 + ( nodeVar98 * mix( mix( fract( ( ( nodeVar101.x + nodeVar101.y ) * nodeVar101.z ) ), fract( ( ( nodeVar103.x + nodeVar103.y ) * nodeVar103.z ) ), nodeVar100.x ), mix( fract( ( ( nodeVar105.x + nodeVar105.y ) * nodeVar105.z ) ), fract( ( ( nodeVar107.x + nodeVar107.y ) * nodeVar107.z ) ), nodeVar100.x ), nodeVar100.y ) ) );
			nodeVar96 = ( nodeVar96 * vec2( 2.03 ) );
			nodeVar98 = ( nodeVar98 * 0.52 );
			nodeVar108 = floor( nodeVar96 );
			nodeVar109 = fract( nodeVar96 );
			nodeVar109 = ( ( nodeVar109 * nodeVar109 ) * ( vec2( 3.0 ) - ( nodeVar109 * vec2( 2.0 ) ) ) );
			nodeVar110 = fract( ( vec3( nodeVar108.x, nodeVar108.y, nodeVar108.x ) * vec3( 0.1031 ) ) );
			nodeVar110 = ( nodeVar110 + vec3( dot( nodeVar110, ( nodeVar110.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar111 = ( nodeVar108 + vec2( 1.0, 0.0 ) );
			nodeVar112 = fract( ( vec3( nodeVar111.x, nodeVar111.y, nodeVar111.x ) * vec3( 0.1031 ) ) );
			nodeVar112 = ( nodeVar112 + vec3( dot( nodeVar112, ( nodeVar112.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar113 = ( nodeVar108 + vec2( 0.0, 1.0 ) );
			nodeVar114 = fract( ( vec3( nodeVar113.x, nodeVar113.y, nodeVar113.x ) * vec3( 0.1031 ) ) );
			nodeVar114 = ( nodeVar114 + vec3( dot( nodeVar114, ( nodeVar114.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar115 = ( nodeVar108 + vec2( 1.0, 1.0 ) );
			nodeVar116 = fract( ( vec3( nodeVar115.x, nodeVar115.y, nodeVar115.x ) * vec3( 0.1031 ) ) );
			nodeVar116 = ( nodeVar116 + vec3( dot( nodeVar116, ( nodeVar116.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar97 = ( nodeVar97 + ( nodeVar98 * mix( mix( fract( ( ( nodeVar110.x + nodeVar110.y ) * nodeVar110.z ) ), fract( ( ( nodeVar112.x + nodeVar112.y ) * nodeVar112.z ) ), nodeVar109.x ), mix( fract( ( ( nodeVar114.x + nodeVar114.y ) * nodeVar114.z ) ), fract( ( ( nodeVar116.x + nodeVar116.y ) * nodeVar116.z ) ), nodeVar109.x ), nodeVar109.y ) ) );
			nodeVar96 = ( nodeVar96 * vec2( 2.03 ) );
			nodeVar98 = ( nodeVar98 * 0.52 );
			nodeVar117 = floor( nodeVar96 );
			nodeVar118 = fract( nodeVar96 );
			nodeVar118 = ( ( nodeVar118 * nodeVar118 ) * ( vec2( 3.0 ) - ( nodeVar118 * vec2( 2.0 ) ) ) );
			nodeVar119 = fract( ( vec3( nodeVar117.x, nodeVar117.y, nodeVar117.x ) * vec3( 0.1031 ) ) );
			nodeVar119 = ( nodeVar119 + vec3( dot( nodeVar119, ( nodeVar119.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar120 = ( nodeVar117 + vec2( 1.0, 0.0 ) );
			nodeVar121 = fract( ( vec3( nodeVar120.x, nodeVar120.y, nodeVar120.x ) * vec3( 0.1031 ) ) );
			nodeVar121 = ( nodeVar121 + vec3( dot( nodeVar121, ( nodeVar121.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar122 = ( nodeVar117 + vec2( 0.0, 1.0 ) );
			nodeVar123 = fract( ( vec3( nodeVar122.x, nodeVar122.y, nodeVar122.x ) * vec3( 0.1031 ) ) );
			nodeVar123 = ( nodeVar123 + vec3( dot( nodeVar123, ( nodeVar123.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar124 = ( nodeVar117 + vec2( 1.0, 1.0 ) );
			nodeVar125 = fract( ( vec3( nodeVar124.x, nodeVar124.y, nodeVar124.x ) * vec3( 0.1031 ) ) );
			nodeVar125 = ( nodeVar125 + vec3( dot( nodeVar125, ( nodeVar125.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar97 = ( nodeVar97 + ( nodeVar98 * mix( mix( fract( ( ( nodeVar119.x + nodeVar119.y ) * nodeVar119.z ) ), fract( ( ( nodeVar121.x + nodeVar121.y ) * nodeVar121.z ) ), nodeVar118.x ), mix( fract( ( ( nodeVar123.x + nodeVar123.y ) * nodeVar123.z ) ), fract( ( ( nodeVar125.x + nodeVar125.y ) * nodeVar125.z ) ), nodeVar118.x ), nodeVar118.y ) ) );
			nodeVar96 = ( nodeVar96 * vec2( 2.03 ) );
			nodeVar98 = ( nodeVar98 * 0.52 );
			nodeVar126 = floor( nodeVar96 );
			nodeVar127 = fract( nodeVar96 );
			nodeVar127 = ( ( nodeVar127 * nodeVar127 ) * ( vec2( 3.0 ) - ( nodeVar127 * vec2( 2.0 ) ) ) );
			nodeVar128 = fract( ( vec3( nodeVar126.x, nodeVar126.y, nodeVar126.x ) * vec3( 0.1031 ) ) );
			nodeVar128 = ( nodeVar128 + vec3( dot( nodeVar128, ( nodeVar128.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar129 = ( nodeVar126 + vec2( 1.0, 0.0 ) );
			nodeVar130 = fract( ( vec3( nodeVar129.x, nodeVar129.y, nodeVar129.x ) * vec3( 0.1031 ) ) );
			nodeVar130 = ( nodeVar130 + vec3( dot( nodeVar130, ( nodeVar130.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar131 = ( nodeVar126 + vec2( 0.0, 1.0 ) );
			nodeVar132 = fract( ( vec3( nodeVar131.x, nodeVar131.y, nodeVar131.x ) * vec3( 0.1031 ) ) );
			nodeVar132 = ( nodeVar132 + vec3( dot( nodeVar132, ( nodeVar132.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar133 = ( nodeVar126 + vec2( 1.0, 1.0 ) );
			nodeVar134 = fract( ( vec3( nodeVar133.x, nodeVar133.y, nodeVar133.x ) * vec3( 0.1031 ) ) );
			nodeVar134 = ( nodeVar134 + vec3( dot( nodeVar134, ( nodeVar134.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar97 = ( nodeVar97 + ( nodeVar98 * mix( mix( fract( ( ( nodeVar128.x + nodeVar128.y ) * nodeVar128.z ) ), fract( ( ( nodeVar130.x + nodeVar130.y ) * nodeVar130.z ) ), nodeVar127.x ), mix( fract( ( ( nodeVar132.x + nodeVar132.y ) * nodeVar132.z ) ), fract( ( ( nodeVar134.x + nodeVar134.y ) * nodeVar134.z ) ), nodeVar127.x ), nodeVar127.y ) ) );
			nodeVar96 = ( nodeVar96 * vec2( 2.03 ) );
			nodeVar98 = ( nodeVar98 * 0.52 );
			nodeVar135 = ( nodeVar56 * vec2( 46.0 ) );
			nodeVar136 = 0.0;
			nodeVar137 = 0.5;
			nodeVar138 = floor( nodeVar135 );
			nodeVar139 = fract( nodeVar135 );
			nodeVar139 = ( ( nodeVar139 * nodeVar139 ) * ( vec2( 3.0 ) - ( nodeVar139 * vec2( 2.0 ) ) ) );
			nodeVar140 = fract( ( vec3( nodeVar138.x, nodeVar138.y, nodeVar138.x ) * vec3( 0.1031 ) ) );
			nodeVar140 = ( nodeVar140 + vec3( dot( nodeVar140, ( nodeVar140.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar141 = ( nodeVar138 + vec2( 1.0, 0.0 ) );
			nodeVar142 = fract( ( vec3( nodeVar141.x, nodeVar141.y, nodeVar141.x ) * vec3( 0.1031 ) ) );
			nodeVar142 = ( nodeVar142 + vec3( dot( nodeVar142, ( nodeVar142.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar143 = ( nodeVar138 + vec2( 0.0, 1.0 ) );
			nodeVar144 = fract( ( vec3( nodeVar143.x, nodeVar143.y, nodeVar143.x ) * vec3( 0.1031 ) ) );
			nodeVar144 = ( nodeVar144 + vec3( dot( nodeVar144, ( nodeVar144.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar145 = ( nodeVar138 + vec2( 1.0, 1.0 ) );
			nodeVar146 = fract( ( vec3( nodeVar145.x, nodeVar145.y, nodeVar145.x ) * vec3( 0.1031 ) ) );
			nodeVar146 = ( nodeVar146 + vec3( dot( nodeVar146, ( nodeVar146.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar136 = ( nodeVar136 + ( nodeVar137 * mix( mix( fract( ( ( nodeVar140.x + nodeVar140.y ) * nodeVar140.z ) ), fract( ( ( nodeVar142.x + nodeVar142.y ) * nodeVar142.z ) ), nodeVar139.x ), mix( fract( ( ( nodeVar144.x + nodeVar144.y ) * nodeVar144.z ) ), fract( ( ( nodeVar146.x + nodeVar146.y ) * nodeVar146.z ) ), nodeVar139.x ), nodeVar139.y ) ) );
			nodeVar135 = ( nodeVar135 * vec2( 2.03 ) );
			nodeVar137 = ( nodeVar137 * 0.52 );
			nodeVar147 = floor( nodeVar135 );
			nodeVar148 = fract( nodeVar135 );
			nodeVar148 = ( ( nodeVar148 * nodeVar148 ) * ( vec2( 3.0 ) - ( nodeVar148 * vec2( 2.0 ) ) ) );
			nodeVar149 = fract( ( vec3( nodeVar147.x, nodeVar147.y, nodeVar147.x ) * vec3( 0.1031 ) ) );
			nodeVar149 = ( nodeVar149 + vec3( dot( nodeVar149, ( nodeVar149.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar150 = ( nodeVar147 + vec2( 1.0, 0.0 ) );
			nodeVar151 = fract( ( vec3( nodeVar150.x, nodeVar150.y, nodeVar150.x ) * vec3( 0.1031 ) ) );
			nodeVar151 = ( nodeVar151 + vec3( dot( nodeVar151, ( nodeVar151.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar152 = ( nodeVar147 + vec2( 0.0, 1.0 ) );
			nodeVar153 = fract( ( vec3( nodeVar152.x, nodeVar152.y, nodeVar152.x ) * vec3( 0.1031 ) ) );
			nodeVar153 = ( nodeVar153 + vec3( dot( nodeVar153, ( nodeVar153.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar154 = ( nodeVar147 + vec2( 1.0, 1.0 ) );
			nodeVar155 = fract( ( vec3( nodeVar154.x, nodeVar154.y, nodeVar154.x ) * vec3( 0.1031 ) ) );
			nodeVar155 = ( nodeVar155 + vec3( dot( nodeVar155, ( nodeVar155.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar136 = ( nodeVar136 + ( nodeVar137 * mix( mix( fract( ( ( nodeVar149.x + nodeVar149.y ) * nodeVar149.z ) ), fract( ( ( nodeVar151.x + nodeVar151.y ) * nodeVar151.z ) ), nodeVar148.x ), mix( fract( ( ( nodeVar153.x + nodeVar153.y ) * nodeVar153.z ) ), fract( ( ( nodeVar155.x + nodeVar155.y ) * nodeVar155.z ) ), nodeVar148.x ), nodeVar148.y ) ) );
			nodeVar135 = ( nodeVar135 * vec2( 2.03 ) );
			nodeVar137 = ( nodeVar137 * 0.52 );
			nodeVar156 = floor( nodeVar135 );
			nodeVar157 = fract( nodeVar135 );
			nodeVar157 = ( ( nodeVar157 * nodeVar157 ) * ( vec2( 3.0 ) - ( nodeVar157 * vec2( 2.0 ) ) ) );
			nodeVar158 = fract( ( vec3( nodeVar156.x, nodeVar156.y, nodeVar156.x ) * vec3( 0.1031 ) ) );
			nodeVar158 = ( nodeVar158 + vec3( dot( nodeVar158, ( nodeVar158.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar159 = ( nodeVar156 + vec2( 1.0, 0.0 ) );
			nodeVar160 = fract( ( vec3( nodeVar159.x, nodeVar159.y, nodeVar159.x ) * vec3( 0.1031 ) ) );
			nodeVar160 = ( nodeVar160 + vec3( dot( nodeVar160, ( nodeVar160.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar161 = ( nodeVar156 + vec2( 0.0, 1.0 ) );
			nodeVar162 = fract( ( vec3( nodeVar161.x, nodeVar161.y, nodeVar161.x ) * vec3( 0.1031 ) ) );
			nodeVar162 = ( nodeVar162 + vec3( dot( nodeVar162, ( nodeVar162.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar163 = ( nodeVar156 + vec2( 1.0, 1.0 ) );
			nodeVar164 = fract( ( vec3( nodeVar163.x, nodeVar163.y, nodeVar163.x ) * vec3( 0.1031 ) ) );
			nodeVar164 = ( nodeVar164 + vec3( dot( nodeVar164, ( nodeVar164.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar136 = ( nodeVar136 + ( nodeVar137 * mix( mix( fract( ( ( nodeVar158.x + nodeVar158.y ) * nodeVar158.z ) ), fract( ( ( nodeVar160.x + nodeVar160.y ) * nodeVar160.z ) ), nodeVar157.x ), mix( fract( ( ( nodeVar162.x + nodeVar162.y ) * nodeVar162.z ) ), fract( ( ( nodeVar164.x + nodeVar164.y ) * nodeVar164.z ) ), nodeVar157.x ), nodeVar157.y ) ) );
			nodeVar135 = ( nodeVar135 * vec2( 2.03 ) );
			nodeVar137 = ( nodeVar137 * 0.52 );
			nodeVar165 = floor( nodeVar135 );
			nodeVar166 = fract( nodeVar135 );
			nodeVar166 = ( ( nodeVar166 * nodeVar166 ) * ( vec2( 3.0 ) - ( nodeVar166 * vec2( 2.0 ) ) ) );
			nodeVar167 = fract( ( vec3( nodeVar165.x, nodeVar165.y, nodeVar165.x ) * vec3( 0.1031 ) ) );
			nodeVar167 = ( nodeVar167 + vec3( dot( nodeVar167, ( nodeVar167.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar168 = ( nodeVar165 + vec2( 1.0, 0.0 ) );
			nodeVar169 = fract( ( vec3( nodeVar168.x, nodeVar168.y, nodeVar168.x ) * vec3( 0.1031 ) ) );
			nodeVar169 = ( nodeVar169 + vec3( dot( nodeVar169, ( nodeVar169.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar170 = ( nodeVar165 + vec2( 0.0, 1.0 ) );
			nodeVar171 = fract( ( vec3( nodeVar170.x, nodeVar170.y, nodeVar170.x ) * vec3( 0.1031 ) ) );
			nodeVar171 = ( nodeVar171 + vec3( dot( nodeVar171, ( nodeVar171.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar172 = ( nodeVar165 + vec2( 1.0, 1.0 ) );
			nodeVar173 = fract( ( vec3( nodeVar172.x, nodeVar172.y, nodeVar172.x ) * vec3( 0.1031 ) ) );
			nodeVar173 = ( nodeVar173 + vec3( dot( nodeVar173, ( nodeVar173.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar136 = ( nodeVar136 + ( nodeVar137 * mix( mix( fract( ( ( nodeVar167.x + nodeVar167.y ) * nodeVar167.z ) ), fract( ( ( nodeVar169.x + nodeVar169.y ) * nodeVar169.z ) ), nodeVar166.x ), mix( fract( ( ( nodeVar171.x + nodeVar171.y ) * nodeVar171.z ) ), fract( ( ( nodeVar173.x + nodeVar173.y ) * nodeVar173.z ) ), nodeVar166.x ), nodeVar166.y ) ) );
			nodeVar135 = ( nodeVar135 * vec2( 2.03 ) );
			nodeVar137 = ( nodeVar137 * 0.52 );
			nodeVar174 = ( ( ( nodeVar58 * 0.55 ) + ( nodeVar97 * 0.3 ) ) + ( nodeVar136 * 0.15 ) );
			nodeVar0 = vec3( nodeVar174, ( 0.55 + ( nodeVar174 * 0.45 ) ), nodeVar174 );
			

		} else {


			if ( ( nodeVar1 < 2.5 ) ) {

				normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
				nodeVar175 = abs( normalWorld );
				nodeVar176 = vec2( 0.0, 0.0 );

				if ( ( nodeVar175.y > max( nodeVar175.x, nodeVar175.z ) ) ) {

					nodeVar176 = v_positionWorld.xz;
					

				} else {


					if ( ( nodeVar175.x > nodeVar175.z ) ) {

						nodeVar176 = vec2( v_positionWorld.z, v_positionWorld.y );
						

					} else {

						nodeVar176 = vec2( v_positionWorld.x, v_positionWorld.y );
						

					}

					

				}

				nodeVar177 = floor( ( nodeVar176.y / 0.082 ) );
				nodeVar178 = ( ( mod( nodeVar177, 2.0 ) * 0.5 ) * 0.235 );
				nodeVar179 = fract( ( ( nodeVar176.x + nodeVar178 ) / 0.235 ) );
				nodeVar180 = fract( ( nodeVar176.y / 0.082 ) );
				nodeVar181 = min( ( min( nodeVar179, ( 1.0 - nodeVar179 ) ) * 0.235 ), ( min( nodeVar180, ( 1.0 - nodeVar180 ) ) * 0.082 ) );
				nodeVar182 = smoothstep( 0.0, 0.011, nodeVar181 );
				nodeVar183 = ( vec2( floor( ( ( nodeVar176.x + nodeVar178 ) / 0.235 ) ), nodeVar177 ) * vec2( 1.91 ) );
				nodeVar184 = fract( ( vec3( nodeVar183.x, nodeVar183.y, nodeVar183.x ) * vec3( 0.1031 ) ) );
				nodeVar184 = ( nodeVar184 + vec3( dot( nodeVar184, ( nodeVar184.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar185 = fract( ( ( nodeVar184.x + nodeVar184.y ) * nodeVar184.z ) );
				nodeVar186 = ( nodeVar176 * vec2( 40.0 ) );
				nodeVar187 = 0.0;
				nodeVar188 = 0.5;
				nodeVar189 = floor( nodeVar186 );
				nodeVar190 = fract( nodeVar186 );
				nodeVar190 = ( ( nodeVar190 * nodeVar190 ) * ( vec2( 3.0 ) - ( nodeVar190 * vec2( 2.0 ) ) ) );
				nodeVar191 = fract( ( vec3( nodeVar189.x, nodeVar189.y, nodeVar189.x ) * vec3( 0.1031 ) ) );
				nodeVar191 = ( nodeVar191 + vec3( dot( nodeVar191, ( nodeVar191.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar192 = ( nodeVar189 + vec2( 1.0, 0.0 ) );
				nodeVar193 = fract( ( vec3( nodeVar192.x, nodeVar192.y, nodeVar192.x ) * vec3( 0.1031 ) ) );
				nodeVar193 = ( nodeVar193 + vec3( dot( nodeVar193, ( nodeVar193.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar194 = ( nodeVar189 + vec2( 0.0, 1.0 ) );
				nodeVar195 = fract( ( vec3( nodeVar194.x, nodeVar194.y, nodeVar194.x ) * vec3( 0.1031 ) ) );
				nodeVar195 = ( nodeVar195 + vec3( dot( nodeVar195, ( nodeVar195.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar196 = ( nodeVar189 + vec2( 1.0, 1.0 ) );
				nodeVar197 = fract( ( vec3( nodeVar196.x, nodeVar196.y, nodeVar196.x ) * vec3( 0.1031 ) ) );
				nodeVar197 = ( nodeVar197 + vec3( dot( nodeVar197, ( nodeVar197.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar187 = ( nodeVar187 + ( nodeVar188 * mix( mix( fract( ( ( nodeVar191.x + nodeVar191.y ) * nodeVar191.z ) ), fract( ( ( nodeVar193.x + nodeVar193.y ) * nodeVar193.z ) ), nodeVar190.x ), mix( fract( ( ( nodeVar195.x + nodeVar195.y ) * nodeVar195.z ) ), fract( ( ( nodeVar197.x + nodeVar197.y ) * nodeVar197.z ) ), nodeVar190.x ), nodeVar190.y ) ) );
				nodeVar186 = ( nodeVar186 * vec2( 2.03 ) );
				nodeVar188 = ( nodeVar188 * 0.52 );
				nodeVar198 = floor( nodeVar186 );
				nodeVar199 = fract( nodeVar186 );
				nodeVar199 = ( ( nodeVar199 * nodeVar199 ) * ( vec2( 3.0 ) - ( nodeVar199 * vec2( 2.0 ) ) ) );
				nodeVar200 = fract( ( vec3( nodeVar198.x, nodeVar198.y, nodeVar198.x ) * vec3( 0.1031 ) ) );
				nodeVar200 = ( nodeVar200 + vec3( dot( nodeVar200, ( nodeVar200.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar201 = ( nodeVar198 + vec2( 1.0, 0.0 ) );
				nodeVar202 = fract( ( vec3( nodeVar201.x, nodeVar201.y, nodeVar201.x ) * vec3( 0.1031 ) ) );
				nodeVar202 = ( nodeVar202 + vec3( dot( nodeVar202, ( nodeVar202.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar203 = ( nodeVar198 + vec2( 0.0, 1.0 ) );
				nodeVar204 = fract( ( vec3( nodeVar203.x, nodeVar203.y, nodeVar203.x ) * vec3( 0.1031 ) ) );
				nodeVar204 = ( nodeVar204 + vec3( dot( nodeVar204, ( nodeVar204.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar205 = ( nodeVar198 + vec2( 1.0, 1.0 ) );
				nodeVar206 = fract( ( vec3( nodeVar205.x, nodeVar205.y, nodeVar205.x ) * vec3( 0.1031 ) ) );
				nodeVar206 = ( nodeVar206 + vec3( dot( nodeVar206, ( nodeVar206.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar187 = ( nodeVar187 + ( nodeVar188 * mix( mix( fract( ( ( nodeVar200.x + nodeVar200.y ) * nodeVar200.z ) ), fract( ( ( nodeVar202.x + nodeVar202.y ) * nodeVar202.z ) ), nodeVar199.x ), mix( fract( ( ( nodeVar204.x + nodeVar204.y ) * nodeVar204.z ) ), fract( ( ( nodeVar206.x + nodeVar206.y ) * nodeVar206.z ) ), nodeVar199.x ), nodeVar199.y ) ) );
				nodeVar186 = ( nodeVar186 * vec2( 2.03 ) );
				nodeVar188 = ( nodeVar188 * 0.52 );
				nodeVar207 = floor( nodeVar186 );
				nodeVar208 = fract( nodeVar186 );
				nodeVar208 = ( ( nodeVar208 * nodeVar208 ) * ( vec2( 3.0 ) - ( nodeVar208 * vec2( 2.0 ) ) ) );
				nodeVar209 = fract( ( vec3( nodeVar207.x, nodeVar207.y, nodeVar207.x ) * vec3( 0.1031 ) ) );
				nodeVar209 = ( nodeVar209 + vec3( dot( nodeVar209, ( nodeVar209.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar210 = ( nodeVar207 + vec2( 1.0, 0.0 ) );
				nodeVar211 = fract( ( vec3( nodeVar210.x, nodeVar210.y, nodeVar210.x ) * vec3( 0.1031 ) ) );
				nodeVar211 = ( nodeVar211 + vec3( dot( nodeVar211, ( nodeVar211.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar212 = ( nodeVar207 + vec2( 0.0, 1.0 ) );
				nodeVar213 = fract( ( vec3( nodeVar212.x, nodeVar212.y, nodeVar212.x ) * vec3( 0.1031 ) ) );
				nodeVar213 = ( nodeVar213 + vec3( dot( nodeVar213, ( nodeVar213.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar214 = ( nodeVar207 + vec2( 1.0, 1.0 ) );
				nodeVar215 = fract( ( vec3( nodeVar214.x, nodeVar214.y, nodeVar214.x ) * vec3( 0.1031 ) ) );
				nodeVar215 = ( nodeVar215 + vec3( dot( nodeVar215, ( nodeVar215.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar187 = ( nodeVar187 + ( nodeVar188 * mix( mix( fract( ( ( nodeVar209.x + nodeVar209.y ) * nodeVar209.z ) ), fract( ( ( nodeVar211.x + nodeVar211.y ) * nodeVar211.z ) ), nodeVar208.x ), mix( fract( ( ( nodeVar213.x + nodeVar213.y ) * nodeVar213.z ) ), fract( ( ( nodeVar215.x + nodeVar215.y ) * nodeVar215.z ) ), nodeVar208.x ), nodeVar208.y ) ) );
				nodeVar186 = ( nodeVar186 * vec2( 2.03 ) );
				nodeVar188 = ( nodeVar188 * 0.52 );
				nodeVar216 = floor( nodeVar186 );
				nodeVar217 = fract( nodeVar186 );
				nodeVar217 = ( ( nodeVar217 * nodeVar217 ) * ( vec2( 3.0 ) - ( nodeVar217 * vec2( 2.0 ) ) ) );
				nodeVar218 = fract( ( vec3( nodeVar216.x, nodeVar216.y, nodeVar216.x ) * vec3( 0.1031 ) ) );
				nodeVar218 = ( nodeVar218 + vec3( dot( nodeVar218, ( nodeVar218.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar219 = ( nodeVar216 + vec2( 1.0, 0.0 ) );
				nodeVar220 = fract( ( vec3( nodeVar219.x, nodeVar219.y, nodeVar219.x ) * vec3( 0.1031 ) ) );
				nodeVar220 = ( nodeVar220 + vec3( dot( nodeVar220, ( nodeVar220.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar221 = ( nodeVar216 + vec2( 0.0, 1.0 ) );
				nodeVar222 = fract( ( vec3( nodeVar221.x, nodeVar221.y, nodeVar221.x ) * vec3( 0.1031 ) ) );
				nodeVar222 = ( nodeVar222 + vec3( dot( nodeVar222, ( nodeVar222.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar223 = ( nodeVar216 + vec2( 1.0, 1.0 ) );
				nodeVar224 = fract( ( vec3( nodeVar223.x, nodeVar223.y, nodeVar223.x ) * vec3( 0.1031 ) ) );
				nodeVar224 = ( nodeVar224 + vec3( dot( nodeVar224, ( nodeVar224.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar187 = ( nodeVar187 + ( nodeVar188 * mix( mix( fract( ( ( nodeVar218.x + nodeVar218.y ) * nodeVar218.z ) ), fract( ( ( nodeVar220.x + nodeVar220.y ) * nodeVar220.z ) ), nodeVar217.x ), mix( fract( ( ( nodeVar222.x + nodeVar222.y ) * nodeVar222.z ) ), fract( ( ( nodeVar224.x + nodeVar224.y ) * nodeVar224.z ) ), nodeVar217.x ), nodeVar217.y ) ) );
				nodeVar186 = ( nodeVar186 * vec2( 2.03 ) );
				nodeVar188 = ( nodeVar188 * 0.52 );
				nodeVar0 = vec3( ( ( ( nodeVar182 * ( 0.62 + ( nodeVar185 * 0.38 ) ) ) * 0.72 ) + ( ( nodeVar187 * 0.16 ) * nodeVar182 ) ), nodeVar182, nodeVar185 );
				

			} else {


				if ( ( nodeVar1 < 3.5 ) ) {

					normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
					nodeVar225 = abs( normalWorld );
					nodeVar226 = vec2( 0.0, 0.0 );

					if ( ( nodeVar225.y > max( nodeVar225.x, nodeVar225.z ) ) ) {

						nodeVar226 = v_positionWorld.xz;
						

					} else {


						if ( ( nodeVar225.x > nodeVar225.z ) ) {

							nodeVar226 = vec2( v_positionWorld.z, v_positionWorld.y );
							

						} else {

							nodeVar226 = vec2( v_positionWorld.x, v_positionWorld.y );
							

						}

						

					}

					nodeVar227 = floor( ( nodeVar226.y * 5.2 ) );
					nodeVar228 = fract( ( nodeVar226.y * 5.2 ) );
					nodeVar229 = smoothstep( 0.0, 0.06, min( nodeVar228, ( 1.0 - nodeVar228 ) ) );
					nodeVar230 = vec2( ( nodeVar226.x * 2.2 ), ( nodeVar226.y * 60.0 ) );
					nodeVar231 = 0.0;
					nodeVar232 = 0.5;
					nodeVar233 = floor( nodeVar230 );
					nodeVar234 = fract( nodeVar230 );
					nodeVar234 = ( ( nodeVar234 * nodeVar234 ) * ( vec2( 3.0 ) - ( nodeVar234 * vec2( 2.0 ) ) ) );
					nodeVar235 = fract( ( vec3( nodeVar233.x, nodeVar233.y, nodeVar233.x ) * vec3( 0.1031 ) ) );
					nodeVar235 = ( nodeVar235 + vec3( dot( nodeVar235, ( nodeVar235.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar236 = ( nodeVar233 + vec2( 1.0, 0.0 ) );
					nodeVar237 = fract( ( vec3( nodeVar236.x, nodeVar236.y, nodeVar236.x ) * vec3( 0.1031 ) ) );
					nodeVar237 = ( nodeVar237 + vec3( dot( nodeVar237, ( nodeVar237.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar238 = ( nodeVar233 + vec2( 0.0, 1.0 ) );
					nodeVar239 = fract( ( vec3( nodeVar238.x, nodeVar238.y, nodeVar238.x ) * vec3( 0.1031 ) ) );
					nodeVar239 = ( nodeVar239 + vec3( dot( nodeVar239, ( nodeVar239.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar240 = ( nodeVar233 + vec2( 1.0, 1.0 ) );
					nodeVar241 = fract( ( vec3( nodeVar240.x, nodeVar240.y, nodeVar240.x ) * vec3( 0.1031 ) ) );
					nodeVar241 = ( nodeVar241 + vec3( dot( nodeVar241, ( nodeVar241.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar231 = ( nodeVar231 + ( nodeVar232 * mix( mix( fract( ( ( nodeVar235.x + nodeVar235.y ) * nodeVar235.z ) ), fract( ( ( nodeVar237.x + nodeVar237.y ) * nodeVar237.z ) ), nodeVar234.x ), mix( fract( ( ( nodeVar239.x + nodeVar239.y ) * nodeVar239.z ) ), fract( ( ( nodeVar241.x + nodeVar241.y ) * nodeVar241.z ) ), nodeVar234.x ), nodeVar234.y ) ) );
					nodeVar230 = ( nodeVar230 * vec2( 2.03 ) );
					nodeVar232 = ( nodeVar232 * 0.52 );
					nodeVar242 = floor( nodeVar230 );
					nodeVar243 = fract( nodeVar230 );
					nodeVar243 = ( ( nodeVar243 * nodeVar243 ) * ( vec2( 3.0 ) - ( nodeVar243 * vec2( 2.0 ) ) ) );
					nodeVar244 = fract( ( vec3( nodeVar242.x, nodeVar242.y, nodeVar242.x ) * vec3( 0.1031 ) ) );
					nodeVar244 = ( nodeVar244 + vec3( dot( nodeVar244, ( nodeVar244.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar245 = ( nodeVar242 + vec2( 1.0, 0.0 ) );
					nodeVar246 = fract( ( vec3( nodeVar245.x, nodeVar245.y, nodeVar245.x ) * vec3( 0.1031 ) ) );
					nodeVar246 = ( nodeVar246 + vec3( dot( nodeVar246, ( nodeVar246.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar247 = ( nodeVar242 + vec2( 0.0, 1.0 ) );
					nodeVar248 = fract( ( vec3( nodeVar247.x, nodeVar247.y, nodeVar247.x ) * vec3( 0.1031 ) ) );
					nodeVar248 = ( nodeVar248 + vec3( dot( nodeVar248, ( nodeVar248.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar249 = ( nodeVar242 + vec2( 1.0, 1.0 ) );
					nodeVar250 = fract( ( vec3( nodeVar249.x, nodeVar249.y, nodeVar249.x ) * vec3( 0.1031 ) ) );
					nodeVar250 = ( nodeVar250 + vec3( dot( nodeVar250, ( nodeVar250.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar231 = ( nodeVar231 + ( nodeVar232 * mix( mix( fract( ( ( nodeVar244.x + nodeVar244.y ) * nodeVar244.z ) ), fract( ( ( nodeVar246.x + nodeVar246.y ) * nodeVar246.z ) ), nodeVar243.x ), mix( fract( ( ( nodeVar248.x + nodeVar248.y ) * nodeVar248.z ) ), fract( ( ( nodeVar250.x + nodeVar250.y ) * nodeVar250.z ) ), nodeVar243.x ), nodeVar243.y ) ) );
					nodeVar230 = ( nodeVar230 * vec2( 2.03 ) );
					nodeVar232 = ( nodeVar232 * 0.52 );
					nodeVar251 = floor( nodeVar230 );
					nodeVar252 = fract( nodeVar230 );
					nodeVar252 = ( ( nodeVar252 * nodeVar252 ) * ( vec2( 3.0 ) - ( nodeVar252 * vec2( 2.0 ) ) ) );
					nodeVar253 = fract( ( vec3( nodeVar251.x, nodeVar251.y, nodeVar251.x ) * vec3( 0.1031 ) ) );
					nodeVar253 = ( nodeVar253 + vec3( dot( nodeVar253, ( nodeVar253.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar254 = ( nodeVar251 + vec2( 1.0, 0.0 ) );
					nodeVar255 = fract( ( vec3( nodeVar254.x, nodeVar254.y, nodeVar254.x ) * vec3( 0.1031 ) ) );
					nodeVar255 = ( nodeVar255 + vec3( dot( nodeVar255, ( nodeVar255.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar256 = ( nodeVar251 + vec2( 0.0, 1.0 ) );
					nodeVar257 = fract( ( vec3( nodeVar256.x, nodeVar256.y, nodeVar256.x ) * vec3( 0.1031 ) ) );
					nodeVar257 = ( nodeVar257 + vec3( dot( nodeVar257, ( nodeVar257.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar258 = ( nodeVar251 + vec2( 1.0, 1.0 ) );
					nodeVar259 = fract( ( vec3( nodeVar258.x, nodeVar258.y, nodeVar258.x ) * vec3( 0.1031 ) ) );
					nodeVar259 = ( nodeVar259 + vec3( dot( nodeVar259, ( nodeVar259.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar231 = ( nodeVar231 + ( nodeVar232 * mix( mix( fract( ( ( nodeVar253.x + nodeVar253.y ) * nodeVar253.z ) ), fract( ( ( nodeVar255.x + nodeVar255.y ) * nodeVar255.z ) ), nodeVar252.x ), mix( fract( ( ( nodeVar257.x + nodeVar257.y ) * nodeVar257.z ) ), fract( ( ( nodeVar259.x + nodeVar259.y ) * nodeVar259.z ) ), nodeVar252.x ), nodeVar252.y ) ) );
					nodeVar230 = ( nodeVar230 * vec2( 2.03 ) );
					nodeVar232 = ( nodeVar232 * 0.52 );
					nodeVar260 = floor( nodeVar230 );
					nodeVar261 = fract( nodeVar230 );
					nodeVar261 = ( ( nodeVar261 * nodeVar261 ) * ( vec2( 3.0 ) - ( nodeVar261 * vec2( 2.0 ) ) ) );
					nodeVar262 = fract( ( vec3( nodeVar260.x, nodeVar260.y, nodeVar260.x ) * vec3( 0.1031 ) ) );
					nodeVar262 = ( nodeVar262 + vec3( dot( nodeVar262, ( nodeVar262.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar263 = ( nodeVar260 + vec2( 1.0, 0.0 ) );
					nodeVar264 = fract( ( vec3( nodeVar263.x, nodeVar263.y, nodeVar263.x ) * vec3( 0.1031 ) ) );
					nodeVar264 = ( nodeVar264 + vec3( dot( nodeVar264, ( nodeVar264.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar265 = ( nodeVar260 + vec2( 0.0, 1.0 ) );
					nodeVar266 = fract( ( vec3( nodeVar265.x, nodeVar265.y, nodeVar265.x ) * vec3( 0.1031 ) ) );
					nodeVar266 = ( nodeVar266 + vec3( dot( nodeVar266, ( nodeVar266.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar267 = ( nodeVar260 + vec2( 1.0, 1.0 ) );
					nodeVar268 = fract( ( vec3( nodeVar267.x, nodeVar267.y, nodeVar267.x ) * vec3( 0.1031 ) ) );
					nodeVar268 = ( nodeVar268 + vec3( dot( nodeVar268, ( nodeVar268.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar231 = ( nodeVar231 + ( nodeVar232 * mix( mix( fract( ( ( nodeVar262.x + nodeVar262.y ) * nodeVar262.z ) ), fract( ( ( nodeVar264.x + nodeVar264.y ) * nodeVar264.z ) ), nodeVar261.x ), mix( fract( ( ( nodeVar266.x + nodeVar266.y ) * nodeVar266.z ) ), fract( ( ( nodeVar268.x + nodeVar268.y ) * nodeVar268.z ) ), nodeVar261.x ), nodeVar261.y ) ) );
					nodeVar230 = ( nodeVar230 * vec2( 2.03 ) );
					nodeVar232 = ( nodeVar232 * 0.52 );
					nodeVar269 = nodeVar231;
					nodeVar270 = fract( ( ( nodeVar227 * 5.1 ) * 0.1031 ) );
					nodeVar270 = ( nodeVar270 * ( nodeVar270 + 33.33 ) );
					nodeVar270 = ( nodeVar270 * ( nodeVar270 + nodeVar270 ) );
					nodeVar0 = vec3( ( ( ( nodeVar229 * ( 0.6 + ( nodeVar269 * 0.4 ) ) ) * 0.5 ) + ( ( fract( nodeVar270 ) * 0.12 ) * nodeVar229 ) ), nodeVar229, nodeVar269 );
					

				} else {


					if ( ( nodeVar1 < 4.5 ) ) {

						normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
						nodeVar271 = abs( normalWorld );
						nodeVar272 = vec2( 0.0, 0.0 );

						if ( ( nodeVar271.y > max( nodeVar271.x, nodeVar271.z ) ) ) {

							nodeVar272 = v_positionWorld.xz;
							

						} else {


							if ( ( nodeVar271.x > nodeVar271.z ) ) {

								nodeVar272 = vec2( v_positionWorld.z, v_positionWorld.y );
								

							} else {

								nodeVar272 = vec2( v_positionWorld.x, v_positionWorld.y );
								

							}

							

						}

						nodeVar273 = floor( ( nodeVar272.y / 0.45 ) );
						nodeVar274 = fract( ( ( nodeVar273 * 4.7 ) * 0.1031 ) );
						nodeVar274 = ( nodeVar274 * ( nodeVar274 + 33.33 ) );
						nodeVar274 = ( nodeVar274 * ( nodeVar274 + nodeVar274 ) );
						nodeVar275 = ( ( ( mod( nodeVar273, 2.0 ) * 0.5 ) * 0.9 ) + ( fract( nodeVar274 ) * 0.18 ) );
						nodeVar276 = fract( ( ( nodeVar272.x + nodeVar275 ) / 0.9 ) );
						nodeVar277 = fract( ( nodeVar272.y / 0.45 ) );
						nodeVar278 = min( ( min( nodeVar276, ( 1.0 - nodeVar276 ) ) * 0.9 ), ( min( nodeVar277, ( 1.0 - nodeVar277 ) ) * 0.45 ) );
						nodeVar279 = smoothstep( 0.0, 0.006, nodeVar278 );
						nodeVar280 = vec2( ( nodeVar272.x * 2.2 ), ( nodeVar272.y * 16.0 ) );
						nodeVar281 = 0.0;
						nodeVar282 = 0.5;
						nodeVar283 = floor( nodeVar280 );
						nodeVar284 = fract( nodeVar280 );
						nodeVar284 = ( ( nodeVar284 * nodeVar284 ) * ( vec2( 3.0 ) - ( nodeVar284 * vec2( 2.0 ) ) ) );
						nodeVar285 = fract( ( vec3( nodeVar283.x, nodeVar283.y, nodeVar283.x ) * vec3( 0.1031 ) ) );
						nodeVar285 = ( nodeVar285 + vec3( dot( nodeVar285, ( nodeVar285.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar286 = ( nodeVar283 + vec2( 1.0, 0.0 ) );
						nodeVar287 = fract( ( vec3( nodeVar286.x, nodeVar286.y, nodeVar286.x ) * vec3( 0.1031 ) ) );
						nodeVar287 = ( nodeVar287 + vec3( dot( nodeVar287, ( nodeVar287.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar288 = ( nodeVar283 + vec2( 0.0, 1.0 ) );
						nodeVar289 = fract( ( vec3( nodeVar288.x, nodeVar288.y, nodeVar288.x ) * vec3( 0.1031 ) ) );
						nodeVar289 = ( nodeVar289 + vec3( dot( nodeVar289, ( nodeVar289.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar290 = ( nodeVar283 + vec2( 1.0, 1.0 ) );
						nodeVar291 = fract( ( vec3( nodeVar290.x, nodeVar290.y, nodeVar290.x ) * vec3( 0.1031 ) ) );
						nodeVar291 = ( nodeVar291 + vec3( dot( nodeVar291, ( nodeVar291.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar281 = ( nodeVar281 + ( nodeVar282 * mix( mix( fract( ( ( nodeVar285.x + nodeVar285.y ) * nodeVar285.z ) ), fract( ( ( nodeVar287.x + nodeVar287.y ) * nodeVar287.z ) ), nodeVar284.x ), mix( fract( ( ( nodeVar289.x + nodeVar289.y ) * nodeVar289.z ) ), fract( ( ( nodeVar291.x + nodeVar291.y ) * nodeVar291.z ) ), nodeVar284.x ), nodeVar284.y ) ) );
						nodeVar280 = ( nodeVar280 * vec2( 2.03 ) );
						nodeVar282 = ( nodeVar282 * 0.52 );
						nodeVar292 = floor( nodeVar280 );
						nodeVar293 = fract( nodeVar280 );
						nodeVar293 = ( ( nodeVar293 * nodeVar293 ) * ( vec2( 3.0 ) - ( nodeVar293 * vec2( 2.0 ) ) ) );
						nodeVar294 = fract( ( vec3( nodeVar292.x, nodeVar292.y, nodeVar292.x ) * vec3( 0.1031 ) ) );
						nodeVar294 = ( nodeVar294 + vec3( dot( nodeVar294, ( nodeVar294.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar295 = ( nodeVar292 + vec2( 1.0, 0.0 ) );
						nodeVar296 = fract( ( vec3( nodeVar295.x, nodeVar295.y, nodeVar295.x ) * vec3( 0.1031 ) ) );
						nodeVar296 = ( nodeVar296 + vec3( dot( nodeVar296, ( nodeVar296.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar297 = ( nodeVar292 + vec2( 0.0, 1.0 ) );
						nodeVar298 = fract( ( vec3( nodeVar297.x, nodeVar297.y, nodeVar297.x ) * vec3( 0.1031 ) ) );
						nodeVar298 = ( nodeVar298 + vec3( dot( nodeVar298, ( nodeVar298.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar299 = ( nodeVar292 + vec2( 1.0, 1.0 ) );
						nodeVar300 = fract( ( vec3( nodeVar299.x, nodeVar299.y, nodeVar299.x ) * vec3( 0.1031 ) ) );
						nodeVar300 = ( nodeVar300 + vec3( dot( nodeVar300, ( nodeVar300.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar281 = ( nodeVar281 + ( nodeVar282 * mix( mix( fract( ( ( nodeVar294.x + nodeVar294.y ) * nodeVar294.z ) ), fract( ( ( nodeVar296.x + nodeVar296.y ) * nodeVar296.z ) ), nodeVar293.x ), mix( fract( ( ( nodeVar298.x + nodeVar298.y ) * nodeVar298.z ) ), fract( ( ( nodeVar300.x + nodeVar300.y ) * nodeVar300.z ) ), nodeVar293.x ), nodeVar293.y ) ) );
						nodeVar280 = ( nodeVar280 * vec2( 2.03 ) );
						nodeVar282 = ( nodeVar282 * 0.52 );
						nodeVar301 = floor( nodeVar280 );
						nodeVar302 = fract( nodeVar280 );
						nodeVar302 = ( ( nodeVar302 * nodeVar302 ) * ( vec2( 3.0 ) - ( nodeVar302 * vec2( 2.0 ) ) ) );
						nodeVar303 = fract( ( vec3( nodeVar301.x, nodeVar301.y, nodeVar301.x ) * vec3( 0.1031 ) ) );
						nodeVar303 = ( nodeVar303 + vec3( dot( nodeVar303, ( nodeVar303.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar304 = ( nodeVar301 + vec2( 1.0, 0.0 ) );
						nodeVar305 = fract( ( vec3( nodeVar304.x, nodeVar304.y, nodeVar304.x ) * vec3( 0.1031 ) ) );
						nodeVar305 = ( nodeVar305 + vec3( dot( nodeVar305, ( nodeVar305.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar306 = ( nodeVar301 + vec2( 0.0, 1.0 ) );
						nodeVar307 = fract( ( vec3( nodeVar306.x, nodeVar306.y, nodeVar306.x ) * vec3( 0.1031 ) ) );
						nodeVar307 = ( nodeVar307 + vec3( dot( nodeVar307, ( nodeVar307.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar308 = ( nodeVar301 + vec2( 1.0, 1.0 ) );
						nodeVar309 = fract( ( vec3( nodeVar308.x, nodeVar308.y, nodeVar308.x ) * vec3( 0.1031 ) ) );
						nodeVar309 = ( nodeVar309 + vec3( dot( nodeVar309, ( nodeVar309.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar281 = ( nodeVar281 + ( nodeVar282 * mix( mix( fract( ( ( nodeVar303.x + nodeVar303.y ) * nodeVar303.z ) ), fract( ( ( nodeVar305.x + nodeVar305.y ) * nodeVar305.z ) ), nodeVar302.x ), mix( fract( ( ( nodeVar307.x + nodeVar307.y ) * nodeVar307.z ) ), fract( ( ( nodeVar309.x + nodeVar309.y ) * nodeVar309.z ) ), nodeVar302.x ), nodeVar302.y ) ) );
						nodeVar280 = ( nodeVar280 * vec2( 2.03 ) );
						nodeVar282 = ( nodeVar282 * 0.52 );
						nodeVar310 = floor( nodeVar280 );
						nodeVar311 = fract( nodeVar280 );
						nodeVar311 = ( ( nodeVar311 * nodeVar311 ) * ( vec2( 3.0 ) - ( nodeVar311 * vec2( 2.0 ) ) ) );
						nodeVar312 = fract( ( vec3( nodeVar310.x, nodeVar310.y, nodeVar310.x ) * vec3( 0.1031 ) ) );
						nodeVar312 = ( nodeVar312 + vec3( dot( nodeVar312, ( nodeVar312.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar313 = ( nodeVar310 + vec2( 1.0, 0.0 ) );
						nodeVar314 = fract( ( vec3( nodeVar313.x, nodeVar313.y, nodeVar313.x ) * vec3( 0.1031 ) ) );
						nodeVar314 = ( nodeVar314 + vec3( dot( nodeVar314, ( nodeVar314.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar315 = ( nodeVar310 + vec2( 0.0, 1.0 ) );
						nodeVar316 = fract( ( vec3( nodeVar315.x, nodeVar315.y, nodeVar315.x ) * vec3( 0.1031 ) ) );
						nodeVar316 = ( nodeVar316 + vec3( dot( nodeVar316, ( nodeVar316.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar317 = ( nodeVar310 + vec2( 1.0, 1.0 ) );
						nodeVar318 = fract( ( vec3( nodeVar317.x, nodeVar317.y, nodeVar317.x ) * vec3( 0.1031 ) ) );
						nodeVar318 = ( nodeVar318 + vec3( dot( nodeVar318, ( nodeVar318.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar281 = ( nodeVar281 + ( nodeVar282 * mix( mix( fract( ( ( nodeVar312.x + nodeVar312.y ) * nodeVar312.z ) ), fract( ( ( nodeVar314.x + nodeVar314.y ) * nodeVar314.z ) ), nodeVar311.x ), mix( fract( ( ( nodeVar316.x + nodeVar316.y ) * nodeVar316.z ) ), fract( ( ( nodeVar318.x + nodeVar318.y ) * nodeVar318.z ) ), nodeVar311.x ), nodeVar311.y ) ) );
						nodeVar280 = ( nodeVar280 * vec2( 2.03 ) );
						nodeVar282 = ( nodeVar282 * 0.52 );
						nodeVar319 = nodeVar281;
						nodeVar320 = ( vec2( floor( ( ( nodeVar272.x + nodeVar275 ) / 0.9 ) ), nodeVar273 ) * vec2( 1.61 ) );
						nodeVar321 = fract( ( vec3( nodeVar320.x, nodeVar320.y, nodeVar320.x ) * vec3( 0.1031 ) ) );
						nodeVar321 = ( nodeVar321 + vec3( dot( nodeVar321, ( nodeVar321.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar322 = fract( ( ( nodeVar321.x + nodeVar321.y ) * nodeVar321.z ) );
						nodeVar323 = ( nodeVar272 * vec2( 26.0 ) );
						nodeVar324 = 0.0;
						nodeVar325 = 0.5;
						nodeVar326 = floor( nodeVar323 );
						nodeVar327 = fract( nodeVar323 );
						nodeVar327 = ( ( nodeVar327 * nodeVar327 ) * ( vec2( 3.0 ) - ( nodeVar327 * vec2( 2.0 ) ) ) );
						nodeVar328 = fract( ( vec3( nodeVar326.x, nodeVar326.y, nodeVar326.x ) * vec3( 0.1031 ) ) );
						nodeVar328 = ( nodeVar328 + vec3( dot( nodeVar328, ( nodeVar328.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar329 = ( nodeVar326 + vec2( 1.0, 0.0 ) );
						nodeVar330 = fract( ( vec3( nodeVar329.x, nodeVar329.y, nodeVar329.x ) * vec3( 0.1031 ) ) );
						nodeVar330 = ( nodeVar330 + vec3( dot( nodeVar330, ( nodeVar330.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar331 = ( nodeVar326 + vec2( 0.0, 1.0 ) );
						nodeVar332 = fract( ( vec3( nodeVar331.x, nodeVar331.y, nodeVar331.x ) * vec3( 0.1031 ) ) );
						nodeVar332 = ( nodeVar332 + vec3( dot( nodeVar332, ( nodeVar332.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar333 = ( nodeVar326 + vec2( 1.0, 1.0 ) );
						nodeVar334 = fract( ( vec3( nodeVar333.x, nodeVar333.y, nodeVar333.x ) * vec3( 0.1031 ) ) );
						nodeVar334 = ( nodeVar334 + vec3( dot( nodeVar334, ( nodeVar334.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar324 = ( nodeVar324 + ( nodeVar325 * mix( mix( fract( ( ( nodeVar328.x + nodeVar328.y ) * nodeVar328.z ) ), fract( ( ( nodeVar330.x + nodeVar330.y ) * nodeVar330.z ) ), nodeVar327.x ), mix( fract( ( ( nodeVar332.x + nodeVar332.y ) * nodeVar332.z ) ), fract( ( ( nodeVar334.x + nodeVar334.y ) * nodeVar334.z ) ), nodeVar327.x ), nodeVar327.y ) ) );
						nodeVar323 = ( nodeVar323 * vec2( 2.03 ) );
						nodeVar325 = ( nodeVar325 * 0.52 );
						nodeVar335 = floor( nodeVar323 );
						nodeVar336 = fract( nodeVar323 );
						nodeVar336 = ( ( nodeVar336 * nodeVar336 ) * ( vec2( 3.0 ) - ( nodeVar336 * vec2( 2.0 ) ) ) );
						nodeVar337 = fract( ( vec3( nodeVar335.x, nodeVar335.y, nodeVar335.x ) * vec3( 0.1031 ) ) );
						nodeVar337 = ( nodeVar337 + vec3( dot( nodeVar337, ( nodeVar337.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar338 = ( nodeVar335 + vec2( 1.0, 0.0 ) );
						nodeVar339 = fract( ( vec3( nodeVar338.x, nodeVar338.y, nodeVar338.x ) * vec3( 0.1031 ) ) );
						nodeVar339 = ( nodeVar339 + vec3( dot( nodeVar339, ( nodeVar339.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar340 = ( nodeVar335 + vec2( 0.0, 1.0 ) );
						nodeVar341 = fract( ( vec3( nodeVar340.x, nodeVar340.y, nodeVar340.x ) * vec3( 0.1031 ) ) );
						nodeVar341 = ( nodeVar341 + vec3( dot( nodeVar341, ( nodeVar341.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar342 = ( nodeVar335 + vec2( 1.0, 1.0 ) );
						nodeVar343 = fract( ( vec3( nodeVar342.x, nodeVar342.y, nodeVar342.x ) * vec3( 0.1031 ) ) );
						nodeVar343 = ( nodeVar343 + vec3( dot( nodeVar343, ( nodeVar343.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar324 = ( nodeVar324 + ( nodeVar325 * mix( mix( fract( ( ( nodeVar337.x + nodeVar337.y ) * nodeVar337.z ) ), fract( ( ( nodeVar339.x + nodeVar339.y ) * nodeVar339.z ) ), nodeVar336.x ), mix( fract( ( ( nodeVar341.x + nodeVar341.y ) * nodeVar341.z ) ), fract( ( ( nodeVar343.x + nodeVar343.y ) * nodeVar343.z ) ), nodeVar336.x ), nodeVar336.y ) ) );
						nodeVar323 = ( nodeVar323 * vec2( 2.03 ) );
						nodeVar325 = ( nodeVar325 * 0.52 );
						nodeVar344 = floor( nodeVar323 );
						nodeVar345 = fract( nodeVar323 );
						nodeVar345 = ( ( nodeVar345 * nodeVar345 ) * ( vec2( 3.0 ) - ( nodeVar345 * vec2( 2.0 ) ) ) );
						nodeVar346 = fract( ( vec3( nodeVar344.x, nodeVar344.y, nodeVar344.x ) * vec3( 0.1031 ) ) );
						nodeVar346 = ( nodeVar346 + vec3( dot( nodeVar346, ( nodeVar346.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar347 = ( nodeVar344 + vec2( 1.0, 0.0 ) );
						nodeVar348 = fract( ( vec3( nodeVar347.x, nodeVar347.y, nodeVar347.x ) * vec3( 0.1031 ) ) );
						nodeVar348 = ( nodeVar348 + vec3( dot( nodeVar348, ( nodeVar348.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar349 = ( nodeVar344 + vec2( 0.0, 1.0 ) );
						nodeVar350 = fract( ( vec3( nodeVar349.x, nodeVar349.y, nodeVar349.x ) * vec3( 0.1031 ) ) );
						nodeVar350 = ( nodeVar350 + vec3( dot( nodeVar350, ( nodeVar350.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar351 = ( nodeVar344 + vec2( 1.0, 1.0 ) );
						nodeVar352 = fract( ( vec3( nodeVar351.x, nodeVar351.y, nodeVar351.x ) * vec3( 0.1031 ) ) );
						nodeVar352 = ( nodeVar352 + vec3( dot( nodeVar352, ( nodeVar352.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar324 = ( nodeVar324 + ( nodeVar325 * mix( mix( fract( ( ( nodeVar346.x + nodeVar346.y ) * nodeVar346.z ) ), fract( ( ( nodeVar348.x + nodeVar348.y ) * nodeVar348.z ) ), nodeVar345.x ), mix( fract( ( ( nodeVar350.x + nodeVar350.y ) * nodeVar350.z ) ), fract( ( ( nodeVar352.x + nodeVar352.y ) * nodeVar352.z ) ), nodeVar345.x ), nodeVar345.y ) ) );
						nodeVar323 = ( nodeVar323 * vec2( 2.03 ) );
						nodeVar325 = ( nodeVar325 * 0.52 );
						nodeVar353 = floor( nodeVar323 );
						nodeVar354 = fract( nodeVar323 );
						nodeVar354 = ( ( nodeVar354 * nodeVar354 ) * ( vec2( 3.0 ) - ( nodeVar354 * vec2( 2.0 ) ) ) );
						nodeVar355 = fract( ( vec3( nodeVar353.x, nodeVar353.y, nodeVar353.x ) * vec3( 0.1031 ) ) );
						nodeVar355 = ( nodeVar355 + vec3( dot( nodeVar355, ( nodeVar355.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar356 = ( nodeVar353 + vec2( 1.0, 0.0 ) );
						nodeVar357 = fract( ( vec3( nodeVar356.x, nodeVar356.y, nodeVar356.x ) * vec3( 0.1031 ) ) );
						nodeVar357 = ( nodeVar357 + vec3( dot( nodeVar357, ( nodeVar357.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar358 = ( nodeVar353 + vec2( 0.0, 1.0 ) );
						nodeVar359 = fract( ( vec3( nodeVar358.x, nodeVar358.y, nodeVar358.x ) * vec3( 0.1031 ) ) );
						nodeVar359 = ( nodeVar359 + vec3( dot( nodeVar359, ( nodeVar359.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar360 = ( nodeVar353 + vec2( 1.0, 1.0 ) );
						nodeVar361 = fract( ( vec3( nodeVar360.x, nodeVar360.y, nodeVar360.x ) * vec3( 0.1031 ) ) );
						nodeVar361 = ( nodeVar361 + vec3( dot( nodeVar361, ( nodeVar361.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar324 = ( nodeVar324 + ( nodeVar325 * mix( mix( fract( ( ( nodeVar355.x + nodeVar355.y ) * nodeVar355.z ) ), fract( ( ( nodeVar357.x + nodeVar357.y ) * nodeVar357.z ) ), nodeVar354.x ), mix( fract( ( ( nodeVar359.x + nodeVar359.y ) * nodeVar359.z ) ), fract( ( ( nodeVar361.x + nodeVar361.y ) * nodeVar361.z ) ), nodeVar354.x ), nodeVar354.y ) ) );
						nodeVar323 = ( nodeVar323 * vec2( 2.03 ) );
						nodeVar325 = ( nodeVar325 * 0.52 );
						nodeVar362 = smoothstep( 0.62, 0.92, nodeVar324 );
						nodeVar0 = vec3( ( ( ( nodeVar279 * ( 0.62 + ( nodeVar322 * 0.38 ) ) ) * 0.4 ) - ( nodeVar362 * 0.22 ) ), ( nodeVar279 * ( 1.0 - ( nodeVar362 * 0.7 ) ) ), ( ( nodeVar319 * 0.35 ) + ( nodeVar322 * 0.65 ) ) );
						

					} else {


						if ( ( nodeVar1 < 5.5 ) ) {

							normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
							nodeVar363 = abs( normalWorld );
							nodeVar364 = vec2( 0.0, 0.0 );

							if ( ( nodeVar363.y > max( nodeVar363.x, nodeVar363.z ) ) ) {

								nodeVar364 = v_positionWorld.xz;
								

							} else {


								if ( ( nodeVar363.x > nodeVar363.z ) ) {

									nodeVar364 = vec2( v_positionWorld.z, v_positionWorld.y );
									

								} else {

									nodeVar364 = vec2( v_positionWorld.x, v_positionWorld.y );
									

								}

								

							}

							nodeVar365 = ( nodeVar364 * vec2( 4.2 ) );
							nodeVar366 = 0.0;
							nodeVar367 = 0.5;
							nodeVar368 = floor( nodeVar365 );
							nodeVar369 = fract( nodeVar365 );
							nodeVar369 = ( ( nodeVar369 * nodeVar369 ) * ( vec2( 3.0 ) - ( nodeVar369 * vec2( 2.0 ) ) ) );
							nodeVar370 = fract( ( vec3( nodeVar368.x, nodeVar368.y, nodeVar368.x ) * vec3( 0.1031 ) ) );
							nodeVar370 = ( nodeVar370 + vec3( dot( nodeVar370, ( nodeVar370.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar371 = ( nodeVar368 + vec2( 1.0, 0.0 ) );
							nodeVar372 = fract( ( vec3( nodeVar371.x, nodeVar371.y, nodeVar371.x ) * vec3( 0.1031 ) ) );
							nodeVar372 = ( nodeVar372 + vec3( dot( nodeVar372, ( nodeVar372.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar373 = ( nodeVar368 + vec2( 0.0, 1.0 ) );
							nodeVar374 = fract( ( vec3( nodeVar373.x, nodeVar373.y, nodeVar373.x ) * vec3( 0.1031 ) ) );
							nodeVar374 = ( nodeVar374 + vec3( dot( nodeVar374, ( nodeVar374.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar375 = ( nodeVar368 + vec2( 1.0, 1.0 ) );
							nodeVar376 = fract( ( vec3( nodeVar375.x, nodeVar375.y, nodeVar375.x ) * vec3( 0.1031 ) ) );
							nodeVar376 = ( nodeVar376 + vec3( dot( nodeVar376, ( nodeVar376.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar366 = ( nodeVar366 + ( nodeVar367 * mix( mix( fract( ( ( nodeVar370.x + nodeVar370.y ) * nodeVar370.z ) ), fract( ( ( nodeVar372.x + nodeVar372.y ) * nodeVar372.z ) ), nodeVar369.x ), mix( fract( ( ( nodeVar374.x + nodeVar374.y ) * nodeVar374.z ) ), fract( ( ( nodeVar376.x + nodeVar376.y ) * nodeVar376.z ) ), nodeVar369.x ), nodeVar369.y ) ) );
							nodeVar365 = ( nodeVar365 * vec2( 2.03 ) );
							nodeVar367 = ( nodeVar367 * 0.52 );
							nodeVar377 = floor( nodeVar365 );
							nodeVar378 = fract( nodeVar365 );
							nodeVar378 = ( ( nodeVar378 * nodeVar378 ) * ( vec2( 3.0 ) - ( nodeVar378 * vec2( 2.0 ) ) ) );
							nodeVar379 = fract( ( vec3( nodeVar377.x, nodeVar377.y, nodeVar377.x ) * vec3( 0.1031 ) ) );
							nodeVar379 = ( nodeVar379 + vec3( dot( nodeVar379, ( nodeVar379.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar380 = ( nodeVar377 + vec2( 1.0, 0.0 ) );
							nodeVar381 = fract( ( vec3( nodeVar380.x, nodeVar380.y, nodeVar380.x ) * vec3( 0.1031 ) ) );
							nodeVar381 = ( nodeVar381 + vec3( dot( nodeVar381, ( nodeVar381.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar382 = ( nodeVar377 + vec2( 0.0, 1.0 ) );
							nodeVar383 = fract( ( vec3( nodeVar382.x, nodeVar382.y, nodeVar382.x ) * vec3( 0.1031 ) ) );
							nodeVar383 = ( nodeVar383 + vec3( dot( nodeVar383, ( nodeVar383.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar384 = ( nodeVar377 + vec2( 1.0, 1.0 ) );
							nodeVar385 = fract( ( vec3( nodeVar384.x, nodeVar384.y, nodeVar384.x ) * vec3( 0.1031 ) ) );
							nodeVar385 = ( nodeVar385 + vec3( dot( nodeVar385, ( nodeVar385.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar366 = ( nodeVar366 + ( nodeVar367 * mix( mix( fract( ( ( nodeVar379.x + nodeVar379.y ) * nodeVar379.z ) ), fract( ( ( nodeVar381.x + nodeVar381.y ) * nodeVar381.z ) ), nodeVar378.x ), mix( fract( ( ( nodeVar383.x + nodeVar383.y ) * nodeVar383.z ) ), fract( ( ( nodeVar385.x + nodeVar385.y ) * nodeVar385.z ) ), nodeVar378.x ), nodeVar378.y ) ) );
							nodeVar365 = ( nodeVar365 * vec2( 2.03 ) );
							nodeVar367 = ( nodeVar367 * 0.52 );
							nodeVar386 = floor( nodeVar365 );
							nodeVar387 = fract( nodeVar365 );
							nodeVar387 = ( ( nodeVar387 * nodeVar387 ) * ( vec2( 3.0 ) - ( nodeVar387 * vec2( 2.0 ) ) ) );
							nodeVar388 = fract( ( vec3( nodeVar386.x, nodeVar386.y, nodeVar386.x ) * vec3( 0.1031 ) ) );
							nodeVar388 = ( nodeVar388 + vec3( dot( nodeVar388, ( nodeVar388.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar389 = ( nodeVar386 + vec2( 1.0, 0.0 ) );
							nodeVar390 = fract( ( vec3( nodeVar389.x, nodeVar389.y, nodeVar389.x ) * vec3( 0.1031 ) ) );
							nodeVar390 = ( nodeVar390 + vec3( dot( nodeVar390, ( nodeVar390.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar391 = ( nodeVar386 + vec2( 0.0, 1.0 ) );
							nodeVar392 = fract( ( vec3( nodeVar391.x, nodeVar391.y, nodeVar391.x ) * vec3( 0.1031 ) ) );
							nodeVar392 = ( nodeVar392 + vec3( dot( nodeVar392, ( nodeVar392.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar393 = ( nodeVar386 + vec2( 1.0, 1.0 ) );
							nodeVar394 = fract( ( vec3( nodeVar393.x, nodeVar393.y, nodeVar393.x ) * vec3( 0.1031 ) ) );
							nodeVar394 = ( nodeVar394 + vec3( dot( nodeVar394, ( nodeVar394.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar366 = ( nodeVar366 + ( nodeVar367 * mix( mix( fract( ( ( nodeVar388.x + nodeVar388.y ) * nodeVar388.z ) ), fract( ( ( nodeVar390.x + nodeVar390.y ) * nodeVar390.z ) ), nodeVar387.x ), mix( fract( ( ( nodeVar392.x + nodeVar392.y ) * nodeVar392.z ) ), fract( ( ( nodeVar394.x + nodeVar394.y ) * nodeVar394.z ) ), nodeVar387.x ), nodeVar387.y ) ) );
							nodeVar365 = ( nodeVar365 * vec2( 2.03 ) );
							nodeVar367 = ( nodeVar367 * 0.52 );
							nodeVar395 = floor( nodeVar365 );
							nodeVar396 = fract( nodeVar365 );
							nodeVar396 = ( ( nodeVar396 * nodeVar396 ) * ( vec2( 3.0 ) - ( nodeVar396 * vec2( 2.0 ) ) ) );
							nodeVar397 = fract( ( vec3( nodeVar395.x, nodeVar395.y, nodeVar395.x ) * vec3( 0.1031 ) ) );
							nodeVar397 = ( nodeVar397 + vec3( dot( nodeVar397, ( nodeVar397.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar398 = ( nodeVar395 + vec2( 1.0, 0.0 ) );
							nodeVar399 = fract( ( vec3( nodeVar398.x, nodeVar398.y, nodeVar398.x ) * vec3( 0.1031 ) ) );
							nodeVar399 = ( nodeVar399 + vec3( dot( nodeVar399, ( nodeVar399.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar400 = ( nodeVar395 + vec2( 0.0, 1.0 ) );
							nodeVar401 = fract( ( vec3( nodeVar400.x, nodeVar400.y, nodeVar400.x ) * vec3( 0.1031 ) ) );
							nodeVar401 = ( nodeVar401 + vec3( dot( nodeVar401, ( nodeVar401.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar402 = ( nodeVar395 + vec2( 1.0, 1.0 ) );
							nodeVar403 = fract( ( vec3( nodeVar402.x, nodeVar402.y, nodeVar402.x ) * vec3( 0.1031 ) ) );
							nodeVar403 = ( nodeVar403 + vec3( dot( nodeVar403, ( nodeVar403.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar366 = ( nodeVar366 + ( nodeVar367 * mix( mix( fract( ( ( nodeVar397.x + nodeVar397.y ) * nodeVar397.z ) ), fract( ( ( nodeVar399.x + nodeVar399.y ) * nodeVar399.z ) ), nodeVar396.x ), mix( fract( ( ( nodeVar401.x + nodeVar401.y ) * nodeVar401.z ) ), fract( ( ( nodeVar403.x + nodeVar403.y ) * nodeVar403.z ) ), nodeVar396.x ), nodeVar396.y ) ) );
							nodeVar365 = ( nodeVar365 * vec2( 2.03 ) );
							nodeVar367 = ( nodeVar367 * 0.52 );
							nodeVar404 = ( nodeVar364 * vec2( 19.0 ) );
							nodeVar405 = 0.0;
							nodeVar406 = 0.5;
							nodeVar407 = floor( nodeVar404 );
							nodeVar408 = fract( nodeVar404 );
							nodeVar408 = ( ( nodeVar408 * nodeVar408 ) * ( vec2( 3.0 ) - ( nodeVar408 * vec2( 2.0 ) ) ) );
							nodeVar409 = fract( ( vec3( nodeVar407.x, nodeVar407.y, nodeVar407.x ) * vec3( 0.1031 ) ) );
							nodeVar409 = ( nodeVar409 + vec3( dot( nodeVar409, ( nodeVar409.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar410 = ( nodeVar407 + vec2( 1.0, 0.0 ) );
							nodeVar411 = fract( ( vec3( nodeVar410.x, nodeVar410.y, nodeVar410.x ) * vec3( 0.1031 ) ) );
							nodeVar411 = ( nodeVar411 + vec3( dot( nodeVar411, ( nodeVar411.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar412 = ( nodeVar407 + vec2( 0.0, 1.0 ) );
							nodeVar413 = fract( ( vec3( nodeVar412.x, nodeVar412.y, nodeVar412.x ) * vec3( 0.1031 ) ) );
							nodeVar413 = ( nodeVar413 + vec3( dot( nodeVar413, ( nodeVar413.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar414 = ( nodeVar407 + vec2( 1.0, 1.0 ) );
							nodeVar415 = fract( ( vec3( nodeVar414.x, nodeVar414.y, nodeVar414.x ) * vec3( 0.1031 ) ) );
							nodeVar415 = ( nodeVar415 + vec3( dot( nodeVar415, ( nodeVar415.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar405 = ( nodeVar405 + ( nodeVar406 * mix( mix( fract( ( ( nodeVar409.x + nodeVar409.y ) * nodeVar409.z ) ), fract( ( ( nodeVar411.x + nodeVar411.y ) * nodeVar411.z ) ), nodeVar408.x ), mix( fract( ( ( nodeVar413.x + nodeVar413.y ) * nodeVar413.z ) ), fract( ( ( nodeVar415.x + nodeVar415.y ) * nodeVar415.z ) ), nodeVar408.x ), nodeVar408.y ) ) );
							nodeVar404 = ( nodeVar404 * vec2( 2.03 ) );
							nodeVar406 = ( nodeVar406 * 0.52 );
							nodeVar416 = floor( nodeVar404 );
							nodeVar417 = fract( nodeVar404 );
							nodeVar417 = ( ( nodeVar417 * nodeVar417 ) * ( vec2( 3.0 ) - ( nodeVar417 * vec2( 2.0 ) ) ) );
							nodeVar418 = fract( ( vec3( nodeVar416.x, nodeVar416.y, nodeVar416.x ) * vec3( 0.1031 ) ) );
							nodeVar418 = ( nodeVar418 + vec3( dot( nodeVar418, ( nodeVar418.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar419 = ( nodeVar416 + vec2( 1.0, 0.0 ) );
							nodeVar420 = fract( ( vec3( nodeVar419.x, nodeVar419.y, nodeVar419.x ) * vec3( 0.1031 ) ) );
							nodeVar420 = ( nodeVar420 + vec3( dot( nodeVar420, ( nodeVar420.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar421 = ( nodeVar416 + vec2( 0.0, 1.0 ) );
							nodeVar422 = fract( ( vec3( nodeVar421.x, nodeVar421.y, nodeVar421.x ) * vec3( 0.1031 ) ) );
							nodeVar422 = ( nodeVar422 + vec3( dot( nodeVar422, ( nodeVar422.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar423 = ( nodeVar416 + vec2( 1.0, 1.0 ) );
							nodeVar424 = fract( ( vec3( nodeVar423.x, nodeVar423.y, nodeVar423.x ) * vec3( 0.1031 ) ) );
							nodeVar424 = ( nodeVar424 + vec3( dot( nodeVar424, ( nodeVar424.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar405 = ( nodeVar405 + ( nodeVar406 * mix( mix( fract( ( ( nodeVar418.x + nodeVar418.y ) * nodeVar418.z ) ), fract( ( ( nodeVar420.x + nodeVar420.y ) * nodeVar420.z ) ), nodeVar417.x ), mix( fract( ( ( nodeVar422.x + nodeVar422.y ) * nodeVar422.z ) ), fract( ( ( nodeVar424.x + nodeVar424.y ) * nodeVar424.z ) ), nodeVar417.x ), nodeVar417.y ) ) );
							nodeVar404 = ( nodeVar404 * vec2( 2.03 ) );
							nodeVar406 = ( nodeVar406 * 0.52 );
							nodeVar425 = floor( nodeVar404 );
							nodeVar426 = fract( nodeVar404 );
							nodeVar426 = ( ( nodeVar426 * nodeVar426 ) * ( vec2( 3.0 ) - ( nodeVar426 * vec2( 2.0 ) ) ) );
							nodeVar427 = fract( ( vec3( nodeVar425.x, nodeVar425.y, nodeVar425.x ) * vec3( 0.1031 ) ) );
							nodeVar427 = ( nodeVar427 + vec3( dot( nodeVar427, ( nodeVar427.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar428 = ( nodeVar425 + vec2( 1.0, 0.0 ) );
							nodeVar429 = fract( ( vec3( nodeVar428.x, nodeVar428.y, nodeVar428.x ) * vec3( 0.1031 ) ) );
							nodeVar429 = ( nodeVar429 + vec3( dot( nodeVar429, ( nodeVar429.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar430 = ( nodeVar425 + vec2( 0.0, 1.0 ) );
							nodeVar431 = fract( ( vec3( nodeVar430.x, nodeVar430.y, nodeVar430.x ) * vec3( 0.1031 ) ) );
							nodeVar431 = ( nodeVar431 + vec3( dot( nodeVar431, ( nodeVar431.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar432 = ( nodeVar425 + vec2( 1.0, 1.0 ) );
							nodeVar433 = fract( ( vec3( nodeVar432.x, nodeVar432.y, nodeVar432.x ) * vec3( 0.1031 ) ) );
							nodeVar433 = ( nodeVar433 + vec3( dot( nodeVar433, ( nodeVar433.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar405 = ( nodeVar405 + ( nodeVar406 * mix( mix( fract( ( ( nodeVar427.x + nodeVar427.y ) * nodeVar427.z ) ), fract( ( ( nodeVar429.x + nodeVar429.y ) * nodeVar429.z ) ), nodeVar426.x ), mix( fract( ( ( nodeVar431.x + nodeVar431.y ) * nodeVar431.z ) ), fract( ( ( nodeVar433.x + nodeVar433.y ) * nodeVar433.z ) ), nodeVar426.x ), nodeVar426.y ) ) );
							nodeVar404 = ( nodeVar404 * vec2( 2.03 ) );
							nodeVar406 = ( nodeVar406 * 0.52 );
							nodeVar434 = floor( nodeVar404 );
							nodeVar435 = fract( nodeVar404 );
							nodeVar435 = ( ( nodeVar435 * nodeVar435 ) * ( vec2( 3.0 ) - ( nodeVar435 * vec2( 2.0 ) ) ) );
							nodeVar436 = fract( ( vec3( nodeVar434.x, nodeVar434.y, nodeVar434.x ) * vec3( 0.1031 ) ) );
							nodeVar436 = ( nodeVar436 + vec3( dot( nodeVar436, ( nodeVar436.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar437 = ( nodeVar434 + vec2( 1.0, 0.0 ) );
							nodeVar438 = fract( ( vec3( nodeVar437.x, nodeVar437.y, nodeVar437.x ) * vec3( 0.1031 ) ) );
							nodeVar438 = ( nodeVar438 + vec3( dot( nodeVar438, ( nodeVar438.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar439 = ( nodeVar434 + vec2( 0.0, 1.0 ) );
							nodeVar440 = fract( ( vec3( nodeVar439.x, nodeVar439.y, nodeVar439.x ) * vec3( 0.1031 ) ) );
							nodeVar440 = ( nodeVar440 + vec3( dot( nodeVar440, ( nodeVar440.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar441 = ( nodeVar434 + vec2( 1.0, 1.0 ) );
							nodeVar442 = fract( ( vec3( nodeVar441.x, nodeVar441.y, nodeVar441.x ) * vec3( 0.1031 ) ) );
							nodeVar442 = ( nodeVar442 + vec3( dot( nodeVar442, ( nodeVar442.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar405 = ( nodeVar405 + ( nodeVar406 * mix( mix( fract( ( ( nodeVar436.x + nodeVar436.y ) * nodeVar436.z ) ), fract( ( ( nodeVar438.x + nodeVar438.y ) * nodeVar438.z ) ), nodeVar435.x ), mix( fract( ( ( nodeVar440.x + nodeVar440.y ) * nodeVar440.z ) ), fract( ( ( nodeVar442.x + nodeVar442.y ) * nodeVar442.z ) ), nodeVar435.x ), nodeVar435.y ) ) );
							nodeVar404 = ( nodeVar404 * vec2( 2.03 ) );
							nodeVar406 = ( nodeVar406 * 0.52 );
							nodeVar443 = ( ( nodeVar366 * 0.6 ) + ( nodeVar405 * 0.4 ) );
							nodeVar0 = vec3( ( nodeVar443 * 0.6 ), ( 0.7 + ( nodeVar443 * 0.3 ) ), nodeVar443 );
							

						} else {


							if ( ( nodeVar1 < 6.5 ) ) {

								normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
								nodeVar444 = abs( normalWorld );
								nodeVar445 = vec2( 0.0, 0.0 );

								if ( ( nodeVar444.y > max( nodeVar444.x, nodeVar444.z ) ) ) {

									nodeVar445 = v_positionWorld.xz;
									

								} else {


									if ( ( nodeVar444.x > nodeVar444.z ) ) {

										nodeVar445 = vec2( v_positionWorld.z, v_positionWorld.y );
										

									} else {

										nodeVar445 = vec2( v_positionWorld.x, v_positionWorld.y );
										

									}

									

								}

								nodeVar446 = vec2( ( nodeVar445.x * 90.0 ), ( nodeVar445.y * 4.0 ) );
								nodeVar447 = 0.0;
								nodeVar448 = 0.5;
								nodeVar449 = floor( nodeVar446 );
								nodeVar450 = fract( nodeVar446 );
								nodeVar450 = ( ( nodeVar450 * nodeVar450 ) * ( vec2( 3.0 ) - ( nodeVar450 * vec2( 2.0 ) ) ) );
								nodeVar451 = fract( ( vec3( nodeVar449.x, nodeVar449.y, nodeVar449.x ) * vec3( 0.1031 ) ) );
								nodeVar451 = ( nodeVar451 + vec3( dot( nodeVar451, ( nodeVar451.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar452 = ( nodeVar449 + vec2( 1.0, 0.0 ) );
								nodeVar453 = fract( ( vec3( nodeVar452.x, nodeVar452.y, nodeVar452.x ) * vec3( 0.1031 ) ) );
								nodeVar453 = ( nodeVar453 + vec3( dot( nodeVar453, ( nodeVar453.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar454 = ( nodeVar449 + vec2( 0.0, 1.0 ) );
								nodeVar455 = fract( ( vec3( nodeVar454.x, nodeVar454.y, nodeVar454.x ) * vec3( 0.1031 ) ) );
								nodeVar455 = ( nodeVar455 + vec3( dot( nodeVar455, ( nodeVar455.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar456 = ( nodeVar449 + vec2( 1.0, 1.0 ) );
								nodeVar457 = fract( ( vec3( nodeVar456.x, nodeVar456.y, nodeVar456.x ) * vec3( 0.1031 ) ) );
								nodeVar457 = ( nodeVar457 + vec3( dot( nodeVar457, ( nodeVar457.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar447 = ( nodeVar447 + ( nodeVar448 * mix( mix( fract( ( ( nodeVar451.x + nodeVar451.y ) * nodeVar451.z ) ), fract( ( ( nodeVar453.x + nodeVar453.y ) * nodeVar453.z ) ), nodeVar450.x ), mix( fract( ( ( nodeVar455.x + nodeVar455.y ) * nodeVar455.z ) ), fract( ( ( nodeVar457.x + nodeVar457.y ) * nodeVar457.z ) ), nodeVar450.x ), nodeVar450.y ) ) );
								nodeVar446 = ( nodeVar446 * vec2( 2.03 ) );
								nodeVar448 = ( nodeVar448 * 0.52 );
								nodeVar458 = floor( nodeVar446 );
								nodeVar459 = fract( nodeVar446 );
								nodeVar459 = ( ( nodeVar459 * nodeVar459 ) * ( vec2( 3.0 ) - ( nodeVar459 * vec2( 2.0 ) ) ) );
								nodeVar460 = fract( ( vec3( nodeVar458.x, nodeVar458.y, nodeVar458.x ) * vec3( 0.1031 ) ) );
								nodeVar460 = ( nodeVar460 + vec3( dot( nodeVar460, ( nodeVar460.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar461 = ( nodeVar458 + vec2( 1.0, 0.0 ) );
								nodeVar462 = fract( ( vec3( nodeVar461.x, nodeVar461.y, nodeVar461.x ) * vec3( 0.1031 ) ) );
								nodeVar462 = ( nodeVar462 + vec3( dot( nodeVar462, ( nodeVar462.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar463 = ( nodeVar458 + vec2( 0.0, 1.0 ) );
								nodeVar464 = fract( ( vec3( nodeVar463.x, nodeVar463.y, nodeVar463.x ) * vec3( 0.1031 ) ) );
								nodeVar464 = ( nodeVar464 + vec3( dot( nodeVar464, ( nodeVar464.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar465 = ( nodeVar458 + vec2( 1.0, 1.0 ) );
								nodeVar466 = fract( ( vec3( nodeVar465.x, nodeVar465.y, nodeVar465.x ) * vec3( 0.1031 ) ) );
								nodeVar466 = ( nodeVar466 + vec3( dot( nodeVar466, ( nodeVar466.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar447 = ( nodeVar447 + ( nodeVar448 * mix( mix( fract( ( ( nodeVar460.x + nodeVar460.y ) * nodeVar460.z ) ), fract( ( ( nodeVar462.x + nodeVar462.y ) * nodeVar462.z ) ), nodeVar459.x ), mix( fract( ( ( nodeVar464.x + nodeVar464.y ) * nodeVar464.z ) ), fract( ( ( nodeVar466.x + nodeVar466.y ) * nodeVar466.z ) ), nodeVar459.x ), nodeVar459.y ) ) );
								nodeVar446 = ( nodeVar446 * vec2( 2.03 ) );
								nodeVar448 = ( nodeVar448 * 0.52 );
								nodeVar467 = floor( nodeVar446 );
								nodeVar468 = fract( nodeVar446 );
								nodeVar468 = ( ( nodeVar468 * nodeVar468 ) * ( vec2( 3.0 ) - ( nodeVar468 * vec2( 2.0 ) ) ) );
								nodeVar469 = fract( ( vec3( nodeVar467.x, nodeVar467.y, nodeVar467.x ) * vec3( 0.1031 ) ) );
								nodeVar469 = ( nodeVar469 + vec3( dot( nodeVar469, ( nodeVar469.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar470 = ( nodeVar467 + vec2( 1.0, 0.0 ) );
								nodeVar471 = fract( ( vec3( nodeVar470.x, nodeVar470.y, nodeVar470.x ) * vec3( 0.1031 ) ) );
								nodeVar471 = ( nodeVar471 + vec3( dot( nodeVar471, ( nodeVar471.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar472 = ( nodeVar467 + vec2( 0.0, 1.0 ) );
								nodeVar473 = fract( ( vec3( nodeVar472.x, nodeVar472.y, nodeVar472.x ) * vec3( 0.1031 ) ) );
								nodeVar473 = ( nodeVar473 + vec3( dot( nodeVar473, ( nodeVar473.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar474 = ( nodeVar467 + vec2( 1.0, 1.0 ) );
								nodeVar475 = fract( ( vec3( nodeVar474.x, nodeVar474.y, nodeVar474.x ) * vec3( 0.1031 ) ) );
								nodeVar475 = ( nodeVar475 + vec3( dot( nodeVar475, ( nodeVar475.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar447 = ( nodeVar447 + ( nodeVar448 * mix( mix( fract( ( ( nodeVar469.x + nodeVar469.y ) * nodeVar469.z ) ), fract( ( ( nodeVar471.x + nodeVar471.y ) * nodeVar471.z ) ), nodeVar468.x ), mix( fract( ( ( nodeVar473.x + nodeVar473.y ) * nodeVar473.z ) ), fract( ( ( nodeVar475.x + nodeVar475.y ) * nodeVar475.z ) ), nodeVar468.x ), nodeVar468.y ) ) );
								nodeVar446 = ( nodeVar446 * vec2( 2.03 ) );
								nodeVar448 = ( nodeVar448 * 0.52 );
								nodeVar476 = floor( nodeVar446 );
								nodeVar477 = fract( nodeVar446 );
								nodeVar477 = ( ( nodeVar477 * nodeVar477 ) * ( vec2( 3.0 ) - ( nodeVar477 * vec2( 2.0 ) ) ) );
								nodeVar478 = fract( ( vec3( nodeVar476.x, nodeVar476.y, nodeVar476.x ) * vec3( 0.1031 ) ) );
								nodeVar478 = ( nodeVar478 + vec3( dot( nodeVar478, ( nodeVar478.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar479 = ( nodeVar476 + vec2( 1.0, 0.0 ) );
								nodeVar480 = fract( ( vec3( nodeVar479.x, nodeVar479.y, nodeVar479.x ) * vec3( 0.1031 ) ) );
								nodeVar480 = ( nodeVar480 + vec3( dot( nodeVar480, ( nodeVar480.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar481 = ( nodeVar476 + vec2( 0.0, 1.0 ) );
								nodeVar482 = fract( ( vec3( nodeVar481.x, nodeVar481.y, nodeVar481.x ) * vec3( 0.1031 ) ) );
								nodeVar482 = ( nodeVar482 + vec3( dot( nodeVar482, ( nodeVar482.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar483 = ( nodeVar476 + vec2( 1.0, 1.0 ) );
								nodeVar484 = fract( ( vec3( nodeVar483.x, nodeVar483.y, nodeVar483.x ) * vec3( 0.1031 ) ) );
								nodeVar484 = ( nodeVar484 + vec3( dot( nodeVar484, ( nodeVar484.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar447 = ( nodeVar447 + ( nodeVar448 * mix( mix( fract( ( ( nodeVar478.x + nodeVar478.y ) * nodeVar478.z ) ), fract( ( ( nodeVar480.x + nodeVar480.y ) * nodeVar480.z ) ), nodeVar477.x ), mix( fract( ( ( nodeVar482.x + nodeVar482.y ) * nodeVar482.z ) ), fract( ( ( nodeVar484.x + nodeVar484.y ) * nodeVar484.z ) ), nodeVar477.x ), nodeVar477.y ) ) );
								nodeVar446 = ( nodeVar446 * vec2( 2.03 ) );
								nodeVar448 = ( nodeVar448 * 0.52 );
								nodeVar485 = nodeVar447;
								nodeVar0 = vec3( ( nodeVar485 * 0.25 ), 1.0, nodeVar485 );
								

							} else {


								if ( ( nodeVar1 < 7.5 ) ) {

									normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
									nodeVar486 = abs( normalWorld );
									nodeVar487 = vec2( 0.0, 0.0 );

									if ( ( nodeVar486.y > max( nodeVar486.x, nodeVar486.z ) ) ) {

										nodeVar487 = v_positionWorld.xz;
										

									} else {


										if ( ( nodeVar486.x > nodeVar486.z ) ) {

											nodeVar487 = vec2( v_positionWorld.z, v_positionWorld.y );
											

										} else {

											nodeVar487 = vec2( v_positionWorld.x, v_positionWorld.y );
											

										}

										

									}

									nodeVar488 = ( nodeVar487 * vec2( 0.28 ) );
									nodeVar489 = 0.0;
									nodeVar490 = 0.5;
									nodeVar491 = floor( nodeVar488 );
									nodeVar492 = fract( nodeVar488 );
									nodeVar492 = ( ( nodeVar492 * nodeVar492 ) * ( vec2( 3.0 ) - ( nodeVar492 * vec2( 2.0 ) ) ) );
									nodeVar493 = fract( ( vec3( nodeVar491.x, nodeVar491.y, nodeVar491.x ) * vec3( 0.1031 ) ) );
									nodeVar493 = ( nodeVar493 + vec3( dot( nodeVar493, ( nodeVar493.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar494 = ( nodeVar491 + vec2( 1.0, 0.0 ) );
									nodeVar495 = fract( ( vec3( nodeVar494.x, nodeVar494.y, nodeVar494.x ) * vec3( 0.1031 ) ) );
									nodeVar495 = ( nodeVar495 + vec3( dot( nodeVar495, ( nodeVar495.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar496 = ( nodeVar491 + vec2( 0.0, 1.0 ) );
									nodeVar497 = fract( ( vec3( nodeVar496.x, nodeVar496.y, nodeVar496.x ) * vec3( 0.1031 ) ) );
									nodeVar497 = ( nodeVar497 + vec3( dot( nodeVar497, ( nodeVar497.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar498 = ( nodeVar491 + vec2( 1.0, 1.0 ) );
									nodeVar499 = fract( ( vec3( nodeVar498.x, nodeVar498.y, nodeVar498.x ) * vec3( 0.1031 ) ) );
									nodeVar499 = ( nodeVar499 + vec3( dot( nodeVar499, ( nodeVar499.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar489 = ( nodeVar489 + ( nodeVar490 * mix( mix( fract( ( ( nodeVar493.x + nodeVar493.y ) * nodeVar493.z ) ), fract( ( ( nodeVar495.x + nodeVar495.y ) * nodeVar495.z ) ), nodeVar492.x ), mix( fract( ( ( nodeVar497.x + nodeVar497.y ) * nodeVar497.z ) ), fract( ( ( nodeVar499.x + nodeVar499.y ) * nodeVar499.z ) ), nodeVar492.x ), nodeVar492.y ) ) );
									nodeVar488 = ( nodeVar488 * vec2( 2.11 ) );
									nodeVar490 = ( nodeVar490 * 0.5 );
									nodeVar500 = floor( nodeVar488 );
									nodeVar501 = fract( nodeVar488 );
									nodeVar501 = ( ( nodeVar501 * nodeVar501 ) * ( vec2( 3.0 ) - ( nodeVar501 * vec2( 2.0 ) ) ) );
									nodeVar502 = fract( ( vec3( nodeVar500.x, nodeVar500.y, nodeVar500.x ) * vec3( 0.1031 ) ) );
									nodeVar502 = ( nodeVar502 + vec3( dot( nodeVar502, ( nodeVar502.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar503 = ( nodeVar500 + vec2( 1.0, 0.0 ) );
									nodeVar504 = fract( ( vec3( nodeVar503.x, nodeVar503.y, nodeVar503.x ) * vec3( 0.1031 ) ) );
									nodeVar504 = ( nodeVar504 + vec3( dot( nodeVar504, ( nodeVar504.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar505 = ( nodeVar500 + vec2( 0.0, 1.0 ) );
									nodeVar506 = fract( ( vec3( nodeVar505.x, nodeVar505.y, nodeVar505.x ) * vec3( 0.1031 ) ) );
									nodeVar506 = ( nodeVar506 + vec3( dot( nodeVar506, ( nodeVar506.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar507 = ( nodeVar500 + vec2( 1.0, 1.0 ) );
									nodeVar508 = fract( ( vec3( nodeVar507.x, nodeVar507.y, nodeVar507.x ) * vec3( 0.1031 ) ) );
									nodeVar508 = ( nodeVar508 + vec3( dot( nodeVar508, ( nodeVar508.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar489 = ( nodeVar489 + ( nodeVar490 * mix( mix( fract( ( ( nodeVar502.x + nodeVar502.y ) * nodeVar502.z ) ), fract( ( ( nodeVar504.x + nodeVar504.y ) * nodeVar504.z ) ), nodeVar501.x ), mix( fract( ( ( nodeVar506.x + nodeVar506.y ) * nodeVar506.z ) ), fract( ( ( nodeVar508.x + nodeVar508.y ) * nodeVar508.z ) ), nodeVar501.x ), nodeVar501.y ) ) );
									nodeVar488 = ( nodeVar488 * vec2( 2.11 ) );
									nodeVar490 = ( nodeVar490 * 0.5 );
									nodeVar509 = floor( nodeVar488 );
									nodeVar510 = fract( nodeVar488 );
									nodeVar510 = ( ( nodeVar510 * nodeVar510 ) * ( vec2( 3.0 ) - ( nodeVar510 * vec2( 2.0 ) ) ) );
									nodeVar511 = fract( ( vec3( nodeVar509.x, nodeVar509.y, nodeVar509.x ) * vec3( 0.1031 ) ) );
									nodeVar511 = ( nodeVar511 + vec3( dot( nodeVar511, ( nodeVar511.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar512 = ( nodeVar509 + vec2( 1.0, 0.0 ) );
									nodeVar513 = fract( ( vec3( nodeVar512.x, nodeVar512.y, nodeVar512.x ) * vec3( 0.1031 ) ) );
									nodeVar513 = ( nodeVar513 + vec3( dot( nodeVar513, ( nodeVar513.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar514 = ( nodeVar509 + vec2( 0.0, 1.0 ) );
									nodeVar515 = fract( ( vec3( nodeVar514.x, nodeVar514.y, nodeVar514.x ) * vec3( 0.1031 ) ) );
									nodeVar515 = ( nodeVar515 + vec3( dot( nodeVar515, ( nodeVar515.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar516 = ( nodeVar509 + vec2( 1.0, 1.0 ) );
									nodeVar517 = fract( ( vec3( nodeVar516.x, nodeVar516.y, nodeVar516.x ) * vec3( 0.1031 ) ) );
									nodeVar517 = ( nodeVar517 + vec3( dot( nodeVar517, ( nodeVar517.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar489 = ( nodeVar489 + ( nodeVar490 * mix( mix( fract( ( ( nodeVar511.x + nodeVar511.y ) * nodeVar511.z ) ), fract( ( ( nodeVar513.x + nodeVar513.y ) * nodeVar513.z ) ), nodeVar510.x ), mix( fract( ( ( nodeVar515.x + nodeVar515.y ) * nodeVar515.z ) ), fract( ( ( nodeVar517.x + nodeVar517.y ) * nodeVar517.z ) ), nodeVar510.x ), nodeVar510.y ) ) );
									nodeVar488 = ( nodeVar488 * vec2( 2.11 ) );
									nodeVar490 = ( nodeVar490 * 0.5 );
									nodeVar518 = ( ( nodeVar487 * vec2( 0.28 ) ) + vec2( 19.0 ) );
									nodeVar519 = 0.0;
									nodeVar520 = 0.5;
									nodeVar521 = floor( nodeVar518 );
									nodeVar522 = fract( nodeVar518 );
									nodeVar522 = ( ( nodeVar522 * nodeVar522 ) * ( vec2( 3.0 ) - ( nodeVar522 * vec2( 2.0 ) ) ) );
									nodeVar523 = fract( ( vec3( nodeVar521.x, nodeVar521.y, nodeVar521.x ) * vec3( 0.1031 ) ) );
									nodeVar523 = ( nodeVar523 + vec3( dot( nodeVar523, ( nodeVar523.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar524 = ( nodeVar521 + vec2( 1.0, 0.0 ) );
									nodeVar525 = fract( ( vec3( nodeVar524.x, nodeVar524.y, nodeVar524.x ) * vec3( 0.1031 ) ) );
									nodeVar525 = ( nodeVar525 + vec3( dot( nodeVar525, ( nodeVar525.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar526 = ( nodeVar521 + vec2( 0.0, 1.0 ) );
									nodeVar527 = fract( ( vec3( nodeVar526.x, nodeVar526.y, nodeVar526.x ) * vec3( 0.1031 ) ) );
									nodeVar527 = ( nodeVar527 + vec3( dot( nodeVar527, ( nodeVar527.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar528 = ( nodeVar521 + vec2( 1.0, 1.0 ) );
									nodeVar529 = fract( ( vec3( nodeVar528.x, nodeVar528.y, nodeVar528.x ) * vec3( 0.1031 ) ) );
									nodeVar529 = ( nodeVar529 + vec3( dot( nodeVar529, ( nodeVar529.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar519 = ( nodeVar519 + ( nodeVar520 * mix( mix( fract( ( ( nodeVar523.x + nodeVar523.y ) * nodeVar523.z ) ), fract( ( ( nodeVar525.x + nodeVar525.y ) * nodeVar525.z ) ), nodeVar522.x ), mix( fract( ( ( nodeVar527.x + nodeVar527.y ) * nodeVar527.z ) ), fract( ( ( nodeVar529.x + nodeVar529.y ) * nodeVar529.z ) ), nodeVar522.x ), nodeVar522.y ) ) );
									nodeVar518 = ( nodeVar518 * vec2( 2.11 ) );
									nodeVar520 = ( nodeVar520 * 0.5 );
									nodeVar530 = floor( nodeVar518 );
									nodeVar531 = fract( nodeVar518 );
									nodeVar531 = ( ( nodeVar531 * nodeVar531 ) * ( vec2( 3.0 ) - ( nodeVar531 * vec2( 2.0 ) ) ) );
									nodeVar532 = fract( ( vec3( nodeVar530.x, nodeVar530.y, nodeVar530.x ) * vec3( 0.1031 ) ) );
									nodeVar532 = ( nodeVar532 + vec3( dot( nodeVar532, ( nodeVar532.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar533 = ( nodeVar530 + vec2( 1.0, 0.0 ) );
									nodeVar534 = fract( ( vec3( nodeVar533.x, nodeVar533.y, nodeVar533.x ) * vec3( 0.1031 ) ) );
									nodeVar534 = ( nodeVar534 + vec3( dot( nodeVar534, ( nodeVar534.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar535 = ( nodeVar530 + vec2( 0.0, 1.0 ) );
									nodeVar536 = fract( ( vec3( nodeVar535.x, nodeVar535.y, nodeVar535.x ) * vec3( 0.1031 ) ) );
									nodeVar536 = ( nodeVar536 + vec3( dot( nodeVar536, ( nodeVar536.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar537 = ( nodeVar530 + vec2( 1.0, 1.0 ) );
									nodeVar538 = fract( ( vec3( nodeVar537.x, nodeVar537.y, nodeVar537.x ) * vec3( 0.1031 ) ) );
									nodeVar538 = ( nodeVar538 + vec3( dot( nodeVar538, ( nodeVar538.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar519 = ( nodeVar519 + ( nodeVar520 * mix( mix( fract( ( ( nodeVar532.x + nodeVar532.y ) * nodeVar532.z ) ), fract( ( ( nodeVar534.x + nodeVar534.y ) * nodeVar534.z ) ), nodeVar531.x ), mix( fract( ( ( nodeVar536.x + nodeVar536.y ) * nodeVar536.z ) ), fract( ( ( nodeVar538.x + nodeVar538.y ) * nodeVar538.z ) ), nodeVar531.x ), nodeVar531.y ) ) );
									nodeVar518 = ( nodeVar518 * vec2( 2.11 ) );
									nodeVar520 = ( nodeVar520 * 0.5 );
									nodeVar539 = floor( nodeVar518 );
									nodeVar540 = fract( nodeVar518 );
									nodeVar540 = ( ( nodeVar540 * nodeVar540 ) * ( vec2( 3.0 ) - ( nodeVar540 * vec2( 2.0 ) ) ) );
									nodeVar541 = fract( ( vec3( nodeVar539.x, nodeVar539.y, nodeVar539.x ) * vec3( 0.1031 ) ) );
									nodeVar541 = ( nodeVar541 + vec3( dot( nodeVar541, ( nodeVar541.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar542 = ( nodeVar539 + vec2( 1.0, 0.0 ) );
									nodeVar543 = fract( ( vec3( nodeVar542.x, nodeVar542.y, nodeVar542.x ) * vec3( 0.1031 ) ) );
									nodeVar543 = ( nodeVar543 + vec3( dot( nodeVar543, ( nodeVar543.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar544 = ( nodeVar539 + vec2( 0.0, 1.0 ) );
									nodeVar545 = fract( ( vec3( nodeVar544.x, nodeVar544.y, nodeVar544.x ) * vec3( 0.1031 ) ) );
									nodeVar545 = ( nodeVar545 + vec3( dot( nodeVar545, ( nodeVar545.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar546 = ( nodeVar539 + vec2( 1.0, 1.0 ) );
									nodeVar547 = fract( ( vec3( nodeVar546.x, nodeVar546.y, nodeVar546.x ) * vec3( 0.1031 ) ) );
									nodeVar547 = ( nodeVar547 + vec3( dot( nodeVar547, ( nodeVar547.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar519 = ( nodeVar519 + ( nodeVar520 * mix( mix( fract( ( ( nodeVar541.x + nodeVar541.y ) * nodeVar541.z ) ), fract( ( ( nodeVar543.x + nodeVar543.y ) * nodeVar543.z ) ), nodeVar540.x ), mix( fract( ( ( nodeVar545.x + nodeVar545.y ) * nodeVar545.z ) ), fract( ( ( nodeVar547.x + nodeVar547.y ) * nodeVar547.z ) ), nodeVar540.x ), nodeVar540.y ) ) );
									nodeVar518 = ( nodeVar518 * vec2( 2.11 ) );
									nodeVar520 = ( nodeVar520 * 0.5 );
									nodeVar548 = ( vec2( nodeVar489, nodeVar519 ) - vec2( 0.5 ) );
									nodeVar549 = ( ( nodeVar487 * vec2( 4.05 ) ) + ( nodeVar548 * vec2( 0.85 ) ) );
									nodeVar550 = floor( nodeVar549 );
									nodeVar551 = fract( nodeVar549 );
									nodeVar552 = 9.0;
									nodeVar553 = 9.0;
									nodeVar554 = vec2( 0.0, 0.0 );
									nodeVar555 = ( nodeVar550 + vec2( -1.0, -1.0 ) );
									nodeVar556 = fract( ( vec3( nodeVar555.x, nodeVar555.y, nodeVar555.x ) * vec3( 0.1031 ) ) );
									nodeVar556 = ( nodeVar556 + vec3( dot( nodeVar556, ( nodeVar556.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar557 = ( ( nodeVar550 + vec2( -1.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar558 = fract( ( vec3( nodeVar557.x, nodeVar557.y, nodeVar557.x ) * vec3( 0.1031 ) ) );
									nodeVar558 = ( nodeVar558 + vec3( dot( nodeVar558, ( nodeVar558.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar559 = length( ( ( vec2( -1.0, -1.0 ) + vec2( fract( ( ( nodeVar556.x + nodeVar556.y ) * nodeVar556.z ) ), fract( ( ( nodeVar558.x + nodeVar558.y ) * nodeVar558.z ) ) ) ) - nodeVar551 ) );

									if ( ( nodeVar559 < nodeVar552 ) ) {

										nodeVar553 = nodeVar552;
										nodeVar552 = nodeVar559;
										nodeVar554 = ( nodeVar550 + vec2( -1.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar559 < nodeVar553 ) ) {

											nodeVar553 = nodeVar559;
											

										}

										

									}

									nodeVar560 = ( nodeVar550 + vec2( 0.0, -1.0 ) );
									nodeVar561 = fract( ( vec3( nodeVar560.x, nodeVar560.y, nodeVar560.x ) * vec3( 0.1031 ) ) );
									nodeVar561 = ( nodeVar561 + vec3( dot( nodeVar561, ( nodeVar561.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar562 = ( ( nodeVar550 + vec2( 0.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar563 = fract( ( vec3( nodeVar562.x, nodeVar562.y, nodeVar562.x ) * vec3( 0.1031 ) ) );
									nodeVar563 = ( nodeVar563 + vec3( dot( nodeVar563, ( nodeVar563.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar564 = length( ( ( vec2( 0.0, -1.0 ) + vec2( fract( ( ( nodeVar561.x + nodeVar561.y ) * nodeVar561.z ) ), fract( ( ( nodeVar563.x + nodeVar563.y ) * nodeVar563.z ) ) ) ) - nodeVar551 ) );

									if ( ( nodeVar564 < nodeVar552 ) ) {

										nodeVar553 = nodeVar552;
										nodeVar552 = nodeVar564;
										nodeVar554 = ( nodeVar550 + vec2( 0.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar564 < nodeVar553 ) ) {

											nodeVar553 = nodeVar564;
											

										}

										

									}

									nodeVar565 = ( nodeVar550 + vec2( 1.0, -1.0 ) );
									nodeVar566 = fract( ( vec3( nodeVar565.x, nodeVar565.y, nodeVar565.x ) * vec3( 0.1031 ) ) );
									nodeVar566 = ( nodeVar566 + vec3( dot( nodeVar566, ( nodeVar566.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar567 = ( ( nodeVar550 + vec2( 1.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar568 = fract( ( vec3( nodeVar567.x, nodeVar567.y, nodeVar567.x ) * vec3( 0.1031 ) ) );
									nodeVar568 = ( nodeVar568 + vec3( dot( nodeVar568, ( nodeVar568.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar569 = length( ( ( vec2( 1.0, -1.0 ) + vec2( fract( ( ( nodeVar566.x + nodeVar566.y ) * nodeVar566.z ) ), fract( ( ( nodeVar568.x + nodeVar568.y ) * nodeVar568.z ) ) ) ) - nodeVar551 ) );

									if ( ( nodeVar569 < nodeVar552 ) ) {

										nodeVar553 = nodeVar552;
										nodeVar552 = nodeVar569;
										nodeVar554 = ( nodeVar550 + vec2( 1.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar569 < nodeVar553 ) ) {

											nodeVar553 = nodeVar569;
											

										}

										

									}

									nodeVar570 = ( nodeVar550 + vec2( -1.0, 0.0 ) );
									nodeVar571 = fract( ( vec3( nodeVar570.x, nodeVar570.y, nodeVar570.x ) * vec3( 0.1031 ) ) );
									nodeVar571 = ( nodeVar571 + vec3( dot( nodeVar571, ( nodeVar571.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar572 = ( ( nodeVar550 + vec2( -1.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar573 = fract( ( vec3( nodeVar572.x, nodeVar572.y, nodeVar572.x ) * vec3( 0.1031 ) ) );
									nodeVar573 = ( nodeVar573 + vec3( dot( nodeVar573, ( nodeVar573.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar574 = length( ( ( vec2( -1.0, 0.0 ) + vec2( fract( ( ( nodeVar571.x + nodeVar571.y ) * nodeVar571.z ) ), fract( ( ( nodeVar573.x + nodeVar573.y ) * nodeVar573.z ) ) ) ) - nodeVar551 ) );

									if ( ( nodeVar574 < nodeVar552 ) ) {

										nodeVar553 = nodeVar552;
										nodeVar552 = nodeVar574;
										nodeVar554 = ( nodeVar550 + vec2( -1.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar574 < nodeVar553 ) ) {

											nodeVar553 = nodeVar574;
											

										}

										

									}

									nodeVar575 = ( nodeVar550 + vec2( 0.0, 0.0 ) );
									nodeVar576 = fract( ( vec3( nodeVar575.x, nodeVar575.y, nodeVar575.x ) * vec3( 0.1031 ) ) );
									nodeVar576 = ( nodeVar576 + vec3( dot( nodeVar576, ( nodeVar576.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar577 = ( ( nodeVar550 + vec2( 0.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar578 = fract( ( vec3( nodeVar577.x, nodeVar577.y, nodeVar577.x ) * vec3( 0.1031 ) ) );
									nodeVar578 = ( nodeVar578 + vec3( dot( nodeVar578, ( nodeVar578.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar579 = length( ( ( vec2( 0.0, 0.0 ) + vec2( fract( ( ( nodeVar576.x + nodeVar576.y ) * nodeVar576.z ) ), fract( ( ( nodeVar578.x + nodeVar578.y ) * nodeVar578.z ) ) ) ) - nodeVar551 ) );

									if ( ( nodeVar579 < nodeVar552 ) ) {

										nodeVar553 = nodeVar552;
										nodeVar552 = nodeVar579;
										nodeVar554 = ( nodeVar550 + vec2( 0.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar579 < nodeVar553 ) ) {

											nodeVar553 = nodeVar579;
											

										}

										

									}

									nodeVar580 = ( nodeVar550 + vec2( 1.0, 0.0 ) );
									nodeVar581 = fract( ( vec3( nodeVar580.x, nodeVar580.y, nodeVar580.x ) * vec3( 0.1031 ) ) );
									nodeVar581 = ( nodeVar581 + vec3( dot( nodeVar581, ( nodeVar581.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar582 = ( ( nodeVar550 + vec2( 1.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar583 = fract( ( vec3( nodeVar582.x, nodeVar582.y, nodeVar582.x ) * vec3( 0.1031 ) ) );
									nodeVar583 = ( nodeVar583 + vec3( dot( nodeVar583, ( nodeVar583.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar584 = length( ( ( vec2( 1.0, 0.0 ) + vec2( fract( ( ( nodeVar581.x + nodeVar581.y ) * nodeVar581.z ) ), fract( ( ( nodeVar583.x + nodeVar583.y ) * nodeVar583.z ) ) ) ) - nodeVar551 ) );

									if ( ( nodeVar584 < nodeVar552 ) ) {

										nodeVar553 = nodeVar552;
										nodeVar552 = nodeVar584;
										nodeVar554 = ( nodeVar550 + vec2( 1.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar584 < nodeVar553 ) ) {

											nodeVar553 = nodeVar584;
											

										}

										

									}

									nodeVar585 = ( nodeVar550 + vec2( -1.0, 1.0 ) );
									nodeVar586 = fract( ( vec3( nodeVar585.x, nodeVar585.y, nodeVar585.x ) * vec3( 0.1031 ) ) );
									nodeVar586 = ( nodeVar586 + vec3( dot( nodeVar586, ( nodeVar586.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar587 = ( ( nodeVar550 + vec2( -1.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar588 = fract( ( vec3( nodeVar587.x, nodeVar587.y, nodeVar587.x ) * vec3( 0.1031 ) ) );
									nodeVar588 = ( nodeVar588 + vec3( dot( nodeVar588, ( nodeVar588.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar589 = length( ( ( vec2( -1.0, 1.0 ) + vec2( fract( ( ( nodeVar586.x + nodeVar586.y ) * nodeVar586.z ) ), fract( ( ( nodeVar588.x + nodeVar588.y ) * nodeVar588.z ) ) ) ) - nodeVar551 ) );

									if ( ( nodeVar589 < nodeVar552 ) ) {

										nodeVar553 = nodeVar552;
										nodeVar552 = nodeVar589;
										nodeVar554 = ( nodeVar550 + vec2( -1.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar589 < nodeVar553 ) ) {

											nodeVar553 = nodeVar589;
											

										}

										

									}

									nodeVar590 = ( nodeVar550 + vec2( 0.0, 1.0 ) );
									nodeVar591 = fract( ( vec3( nodeVar590.x, nodeVar590.y, nodeVar590.x ) * vec3( 0.1031 ) ) );
									nodeVar591 = ( nodeVar591 + vec3( dot( nodeVar591, ( nodeVar591.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar592 = ( ( nodeVar550 + vec2( 0.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar593 = fract( ( vec3( nodeVar592.x, nodeVar592.y, nodeVar592.x ) * vec3( 0.1031 ) ) );
									nodeVar593 = ( nodeVar593 + vec3( dot( nodeVar593, ( nodeVar593.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar594 = length( ( ( vec2( 0.0, 1.0 ) + vec2( fract( ( ( nodeVar591.x + nodeVar591.y ) * nodeVar591.z ) ), fract( ( ( nodeVar593.x + nodeVar593.y ) * nodeVar593.z ) ) ) ) - nodeVar551 ) );

									if ( ( nodeVar594 < nodeVar552 ) ) {

										nodeVar553 = nodeVar552;
										nodeVar552 = nodeVar594;
										nodeVar554 = ( nodeVar550 + vec2( 0.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar594 < nodeVar553 ) ) {

											nodeVar553 = nodeVar594;
											

										}

										

									}

									nodeVar595 = ( nodeVar550 + vec2( 1.0, 1.0 ) );
									nodeVar596 = fract( ( vec3( nodeVar595.x, nodeVar595.y, nodeVar595.x ) * vec3( 0.1031 ) ) );
									nodeVar596 = ( nodeVar596 + vec3( dot( nodeVar596, ( nodeVar596.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar597 = ( ( nodeVar550 + vec2( 1.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar598 = fract( ( vec3( nodeVar597.x, nodeVar597.y, nodeVar597.x ) * vec3( 0.1031 ) ) );
									nodeVar598 = ( nodeVar598 + vec3( dot( nodeVar598, ( nodeVar598.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar599 = length( ( ( vec2( 1.0, 1.0 ) + vec2( fract( ( ( nodeVar596.x + nodeVar596.y ) * nodeVar596.z ) ), fract( ( ( nodeVar598.x + nodeVar598.y ) * nodeVar598.z ) ) ) ) - nodeVar551 ) );

									if ( ( nodeVar599 < nodeVar552 ) ) {

										nodeVar553 = nodeVar552;
										nodeVar552 = nodeVar599;
										nodeVar554 = ( nodeVar550 + vec2( 1.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar599 < nodeVar553 ) ) {

											nodeVar553 = nodeVar599;
											

										}

										

									}

									nodeVar600 = smoothstep( 0.0, 0.038, ( nodeVar553 - nodeVar552 ) );
									nodeVar601 = ( nodeVar554 * vec2( 1.13 ) );
									nodeVar602 = fract( ( vec3( nodeVar601.x, nodeVar601.y, nodeVar601.x ) * vec3( 0.1031 ) ) );
									nodeVar602 = ( nodeVar602 + vec3( dot( nodeVar602, ( nodeVar602.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar603 = fract( ( ( nodeVar602.x + nodeVar602.y ) * nodeVar602.z ) );
									nodeVar604 = ( nodeVar487 * vec2( 9.0 ) );
									nodeVar605 = 0.0;
									nodeVar606 = 0.5;
									nodeVar607 = floor( nodeVar604 );
									nodeVar608 = fract( nodeVar604 );
									nodeVar608 = ( ( nodeVar608 * nodeVar608 ) * ( vec2( 3.0 ) - ( nodeVar608 * vec2( 2.0 ) ) ) );
									nodeVar609 = fract( ( vec3( nodeVar607.x, nodeVar607.y, nodeVar607.x ) * vec3( 0.1031 ) ) );
									nodeVar609 = ( nodeVar609 + vec3( dot( nodeVar609, ( nodeVar609.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar610 = ( nodeVar607 + vec2( 1.0, 0.0 ) );
									nodeVar611 = fract( ( vec3( nodeVar610.x, nodeVar610.y, nodeVar610.x ) * vec3( 0.1031 ) ) );
									nodeVar611 = ( nodeVar611 + vec3( dot( nodeVar611, ( nodeVar611.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar612 = ( nodeVar607 + vec2( 0.0, 1.0 ) );
									nodeVar613 = fract( ( vec3( nodeVar612.x, nodeVar612.y, nodeVar612.x ) * vec3( 0.1031 ) ) );
									nodeVar613 = ( nodeVar613 + vec3( dot( nodeVar613, ( nodeVar613.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar614 = ( nodeVar607 + vec2( 1.0, 1.0 ) );
									nodeVar615 = fract( ( vec3( nodeVar614.x, nodeVar614.y, nodeVar614.x ) * vec3( 0.1031 ) ) );
									nodeVar615 = ( nodeVar615 + vec3( dot( nodeVar615, ( nodeVar615.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar605 = ( nodeVar605 + ( nodeVar606 * mix( mix( fract( ( ( nodeVar609.x + nodeVar609.y ) * nodeVar609.z ) ), fract( ( ( nodeVar611.x + nodeVar611.y ) * nodeVar611.z ) ), nodeVar608.x ), mix( fract( ( ( nodeVar613.x + nodeVar613.y ) * nodeVar613.z ) ), fract( ( ( nodeVar615.x + nodeVar615.y ) * nodeVar615.z ) ), nodeVar608.x ), nodeVar608.y ) ) );
									nodeVar604 = ( nodeVar604 * vec2( 2.03 ) );
									nodeVar606 = ( nodeVar606 * 0.52 );
									nodeVar616 = floor( nodeVar604 );
									nodeVar617 = fract( nodeVar604 );
									nodeVar617 = ( ( nodeVar617 * nodeVar617 ) * ( vec2( 3.0 ) - ( nodeVar617 * vec2( 2.0 ) ) ) );
									nodeVar618 = fract( ( vec3( nodeVar616.x, nodeVar616.y, nodeVar616.x ) * vec3( 0.1031 ) ) );
									nodeVar618 = ( nodeVar618 + vec3( dot( nodeVar618, ( nodeVar618.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar619 = ( nodeVar616 + vec2( 1.0, 0.0 ) );
									nodeVar620 = fract( ( vec3( nodeVar619.x, nodeVar619.y, nodeVar619.x ) * vec3( 0.1031 ) ) );
									nodeVar620 = ( nodeVar620 + vec3( dot( nodeVar620, ( nodeVar620.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar621 = ( nodeVar616 + vec2( 0.0, 1.0 ) );
									nodeVar622 = fract( ( vec3( nodeVar621.x, nodeVar621.y, nodeVar621.x ) * vec3( 0.1031 ) ) );
									nodeVar622 = ( nodeVar622 + vec3( dot( nodeVar622, ( nodeVar622.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar623 = ( nodeVar616 + vec2( 1.0, 1.0 ) );
									nodeVar624 = fract( ( vec3( nodeVar623.x, nodeVar623.y, nodeVar623.x ) * vec3( 0.1031 ) ) );
									nodeVar624 = ( nodeVar624 + vec3( dot( nodeVar624, ( nodeVar624.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar605 = ( nodeVar605 + ( nodeVar606 * mix( mix( fract( ( ( nodeVar618.x + nodeVar618.y ) * nodeVar618.z ) ), fract( ( ( nodeVar620.x + nodeVar620.y ) * nodeVar620.z ) ), nodeVar617.x ), mix( fract( ( ( nodeVar622.x + nodeVar622.y ) * nodeVar622.z ) ), fract( ( ( nodeVar624.x + nodeVar624.y ) * nodeVar624.z ) ), nodeVar617.x ), nodeVar617.y ) ) );
									nodeVar604 = ( nodeVar604 * vec2( 2.03 ) );
									nodeVar606 = ( nodeVar606 * 0.52 );
									nodeVar625 = floor( nodeVar604 );
									nodeVar626 = fract( nodeVar604 );
									nodeVar626 = ( ( nodeVar626 * nodeVar626 ) * ( vec2( 3.0 ) - ( nodeVar626 * vec2( 2.0 ) ) ) );
									nodeVar627 = fract( ( vec3( nodeVar625.x, nodeVar625.y, nodeVar625.x ) * vec3( 0.1031 ) ) );
									nodeVar627 = ( nodeVar627 + vec3( dot( nodeVar627, ( nodeVar627.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar628 = ( nodeVar625 + vec2( 1.0, 0.0 ) );
									nodeVar629 = fract( ( vec3( nodeVar628.x, nodeVar628.y, nodeVar628.x ) * vec3( 0.1031 ) ) );
									nodeVar629 = ( nodeVar629 + vec3( dot( nodeVar629, ( nodeVar629.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar630 = ( nodeVar625 + vec2( 0.0, 1.0 ) );
									nodeVar631 = fract( ( vec3( nodeVar630.x, nodeVar630.y, nodeVar630.x ) * vec3( 0.1031 ) ) );
									nodeVar631 = ( nodeVar631 + vec3( dot( nodeVar631, ( nodeVar631.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar632 = ( nodeVar625 + vec2( 1.0, 1.0 ) );
									nodeVar633 = fract( ( vec3( nodeVar632.x, nodeVar632.y, nodeVar632.x ) * vec3( 0.1031 ) ) );
									nodeVar633 = ( nodeVar633 + vec3( dot( nodeVar633, ( nodeVar633.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar605 = ( nodeVar605 + ( nodeVar606 * mix( mix( fract( ( ( nodeVar627.x + nodeVar627.y ) * nodeVar627.z ) ), fract( ( ( nodeVar629.x + nodeVar629.y ) * nodeVar629.z ) ), nodeVar626.x ), mix( fract( ( ( nodeVar631.x + nodeVar631.y ) * nodeVar631.z ) ), fract( ( ( nodeVar633.x + nodeVar633.y ) * nodeVar633.z ) ), nodeVar626.x ), nodeVar626.y ) ) );
									nodeVar604 = ( nodeVar604 * vec2( 2.03 ) );
									nodeVar606 = ( nodeVar606 * 0.52 );
									nodeVar634 = floor( nodeVar604 );
									nodeVar635 = fract( nodeVar604 );
									nodeVar635 = ( ( nodeVar635 * nodeVar635 ) * ( vec2( 3.0 ) - ( nodeVar635 * vec2( 2.0 ) ) ) );
									nodeVar636 = fract( ( vec3( nodeVar634.x, nodeVar634.y, nodeVar634.x ) * vec3( 0.1031 ) ) );
									nodeVar636 = ( nodeVar636 + vec3( dot( nodeVar636, ( nodeVar636.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar637 = ( nodeVar634 + vec2( 1.0, 0.0 ) );
									nodeVar638 = fract( ( vec3( nodeVar637.x, nodeVar637.y, nodeVar637.x ) * vec3( 0.1031 ) ) );
									nodeVar638 = ( nodeVar638 + vec3( dot( nodeVar638, ( nodeVar638.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar639 = ( nodeVar634 + vec2( 0.0, 1.0 ) );
									nodeVar640 = fract( ( vec3( nodeVar639.x, nodeVar639.y, nodeVar639.x ) * vec3( 0.1031 ) ) );
									nodeVar640 = ( nodeVar640 + vec3( dot( nodeVar640, ( nodeVar640.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar641 = ( nodeVar634 + vec2( 1.0, 1.0 ) );
									nodeVar642 = fract( ( vec3( nodeVar641.x, nodeVar641.y, nodeVar641.x ) * vec3( 0.1031 ) ) );
									nodeVar642 = ( nodeVar642 + vec3( dot( nodeVar642, ( nodeVar642.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar605 = ( nodeVar605 + ( nodeVar606 * mix( mix( fract( ( ( nodeVar636.x + nodeVar636.y ) * nodeVar636.z ) ), fract( ( ( nodeVar638.x + nodeVar638.y ) * nodeVar638.z ) ), nodeVar635.x ), mix( fract( ( ( nodeVar640.x + nodeVar640.y ) * nodeVar640.z ) ), fract( ( ( nodeVar642.x + nodeVar642.y ) * nodeVar642.z ) ), nodeVar635.x ), nodeVar635.y ) ) );
									nodeVar604 = ( nodeVar604 * vec2( 2.03 ) );
									nodeVar606 = ( nodeVar606 * 0.52 );
									nodeVar0 = vec3( ( ( ( nodeVar600 * ( 0.5 + ( nodeVar603 * 0.5 ) ) ) * 0.5 ) + ( ( nodeVar600 * 0.22 ) * nodeVar605 ) ), nodeVar600, nodeVar603 );
									

								} else {


									if ( ( nodeVar1 < 8.5 ) ) {

										normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
										nodeVar643 = abs( normalWorld );
										nodeVar644 = vec2( 0.0, 0.0 );

										if ( ( nodeVar643.y > max( nodeVar643.x, nodeVar643.z ) ) ) {

											nodeVar644 = v_positionWorld.xz;
											

										} else {


											if ( ( nodeVar643.x > nodeVar643.z ) ) {

												nodeVar644 = vec2( v_positionWorld.z, v_positionWorld.y );
												

											} else {

												nodeVar644 = vec2( v_positionWorld.x, v_positionWorld.y );
												

											}

											

										}

										nodeVar645 = ( nodeVar644 * vec2( 0.9 ) );
										nodeVar646 = 0.0;
										nodeVar647 = 0.5;
										nodeVar648 = floor( nodeVar645 );
										nodeVar649 = fract( nodeVar645 );
										nodeVar649 = ( ( nodeVar649 * nodeVar649 ) * ( vec2( 3.0 ) - ( nodeVar649 * vec2( 2.0 ) ) ) );
										nodeVar650 = fract( ( vec3( nodeVar648.x, nodeVar648.y, nodeVar648.x ) * vec3( 0.1031 ) ) );
										nodeVar650 = ( nodeVar650 + vec3( dot( nodeVar650, ( nodeVar650.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar651 = ( nodeVar648 + vec2( 1.0, 0.0 ) );
										nodeVar652 = fract( ( vec3( nodeVar651.x, nodeVar651.y, nodeVar651.x ) * vec3( 0.1031 ) ) );
										nodeVar652 = ( nodeVar652 + vec3( dot( nodeVar652, ( nodeVar652.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar653 = ( nodeVar648 + vec2( 0.0, 1.0 ) );
										nodeVar654 = fract( ( vec3( nodeVar653.x, nodeVar653.y, nodeVar653.x ) * vec3( 0.1031 ) ) );
										nodeVar654 = ( nodeVar654 + vec3( dot( nodeVar654, ( nodeVar654.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar655 = ( nodeVar648 + vec2( 1.0, 1.0 ) );
										nodeVar656 = fract( ( vec3( nodeVar655.x, nodeVar655.y, nodeVar655.x ) * vec3( 0.1031 ) ) );
										nodeVar656 = ( nodeVar656 + vec3( dot( nodeVar656, ( nodeVar656.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar646 = ( nodeVar646 + ( nodeVar647 * mix( mix( fract( ( ( nodeVar650.x + nodeVar650.y ) * nodeVar650.z ) ), fract( ( ( nodeVar652.x + nodeVar652.y ) * nodeVar652.z ) ), nodeVar649.x ), mix( fract( ( ( nodeVar654.x + nodeVar654.y ) * nodeVar654.z ) ), fract( ( ( nodeVar656.x + nodeVar656.y ) * nodeVar656.z ) ), nodeVar649.x ), nodeVar649.y ) ) );
										nodeVar645 = ( nodeVar645 * vec2( 2.03 ) );
										nodeVar647 = ( nodeVar647 * 0.52 );
										nodeVar657 = floor( nodeVar645 );
										nodeVar658 = fract( nodeVar645 );
										nodeVar658 = ( ( nodeVar658 * nodeVar658 ) * ( vec2( 3.0 ) - ( nodeVar658 * vec2( 2.0 ) ) ) );
										nodeVar659 = fract( ( vec3( nodeVar657.x, nodeVar657.y, nodeVar657.x ) * vec3( 0.1031 ) ) );
										nodeVar659 = ( nodeVar659 + vec3( dot( nodeVar659, ( nodeVar659.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar660 = ( nodeVar657 + vec2( 1.0, 0.0 ) );
										nodeVar661 = fract( ( vec3( nodeVar660.x, nodeVar660.y, nodeVar660.x ) * vec3( 0.1031 ) ) );
										nodeVar661 = ( nodeVar661 + vec3( dot( nodeVar661, ( nodeVar661.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar662 = ( nodeVar657 + vec2( 0.0, 1.0 ) );
										nodeVar663 = fract( ( vec3( nodeVar662.x, nodeVar662.y, nodeVar662.x ) * vec3( 0.1031 ) ) );
										nodeVar663 = ( nodeVar663 + vec3( dot( nodeVar663, ( nodeVar663.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar664 = ( nodeVar657 + vec2( 1.0, 1.0 ) );
										nodeVar665 = fract( ( vec3( nodeVar664.x, nodeVar664.y, nodeVar664.x ) * vec3( 0.1031 ) ) );
										nodeVar665 = ( nodeVar665 + vec3( dot( nodeVar665, ( nodeVar665.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar646 = ( nodeVar646 + ( nodeVar647 * mix( mix( fract( ( ( nodeVar659.x + nodeVar659.y ) * nodeVar659.z ) ), fract( ( ( nodeVar661.x + nodeVar661.y ) * nodeVar661.z ) ), nodeVar658.x ), mix( fract( ( ( nodeVar663.x + nodeVar663.y ) * nodeVar663.z ) ), fract( ( ( nodeVar665.x + nodeVar665.y ) * nodeVar665.z ) ), nodeVar658.x ), nodeVar658.y ) ) );
										nodeVar645 = ( nodeVar645 * vec2( 2.03 ) );
										nodeVar647 = ( nodeVar647 * 0.52 );
										nodeVar666 = floor( nodeVar645 );
										nodeVar667 = fract( nodeVar645 );
										nodeVar667 = ( ( nodeVar667 * nodeVar667 ) * ( vec2( 3.0 ) - ( nodeVar667 * vec2( 2.0 ) ) ) );
										nodeVar668 = fract( ( vec3( nodeVar666.x, nodeVar666.y, nodeVar666.x ) * vec3( 0.1031 ) ) );
										nodeVar668 = ( nodeVar668 + vec3( dot( nodeVar668, ( nodeVar668.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar669 = ( nodeVar666 + vec2( 1.0, 0.0 ) );
										nodeVar670 = fract( ( vec3( nodeVar669.x, nodeVar669.y, nodeVar669.x ) * vec3( 0.1031 ) ) );
										nodeVar670 = ( nodeVar670 + vec3( dot( nodeVar670, ( nodeVar670.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar671 = ( nodeVar666 + vec2( 0.0, 1.0 ) );
										nodeVar672 = fract( ( vec3( nodeVar671.x, nodeVar671.y, nodeVar671.x ) * vec3( 0.1031 ) ) );
										nodeVar672 = ( nodeVar672 + vec3( dot( nodeVar672, ( nodeVar672.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar673 = ( nodeVar666 + vec2( 1.0, 1.0 ) );
										nodeVar674 = fract( ( vec3( nodeVar673.x, nodeVar673.y, nodeVar673.x ) * vec3( 0.1031 ) ) );
										nodeVar674 = ( nodeVar674 + vec3( dot( nodeVar674, ( nodeVar674.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar646 = ( nodeVar646 + ( nodeVar647 * mix( mix( fract( ( ( nodeVar668.x + nodeVar668.y ) * nodeVar668.z ) ), fract( ( ( nodeVar670.x + nodeVar670.y ) * nodeVar670.z ) ), nodeVar667.x ), mix( fract( ( ( nodeVar672.x + nodeVar672.y ) * nodeVar672.z ) ), fract( ( ( nodeVar674.x + nodeVar674.y ) * nodeVar674.z ) ), nodeVar667.x ), nodeVar667.y ) ) );
										nodeVar645 = ( nodeVar645 * vec2( 2.03 ) );
										nodeVar647 = ( nodeVar647 * 0.52 );
										nodeVar675 = floor( nodeVar645 );
										nodeVar676 = fract( nodeVar645 );
										nodeVar676 = ( ( nodeVar676 * nodeVar676 ) * ( vec2( 3.0 ) - ( nodeVar676 * vec2( 2.0 ) ) ) );
										nodeVar677 = fract( ( vec3( nodeVar675.x, nodeVar675.y, nodeVar675.x ) * vec3( 0.1031 ) ) );
										nodeVar677 = ( nodeVar677 + vec3( dot( nodeVar677, ( nodeVar677.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar678 = ( nodeVar675 + vec2( 1.0, 0.0 ) );
										nodeVar679 = fract( ( vec3( nodeVar678.x, nodeVar678.y, nodeVar678.x ) * vec3( 0.1031 ) ) );
										nodeVar679 = ( nodeVar679 + vec3( dot( nodeVar679, ( nodeVar679.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar680 = ( nodeVar675 + vec2( 0.0, 1.0 ) );
										nodeVar681 = fract( ( vec3( nodeVar680.x, nodeVar680.y, nodeVar680.x ) * vec3( 0.1031 ) ) );
										nodeVar681 = ( nodeVar681 + vec3( dot( nodeVar681, ( nodeVar681.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar682 = ( nodeVar675 + vec2( 1.0, 1.0 ) );
										nodeVar683 = fract( ( vec3( nodeVar682.x, nodeVar682.y, nodeVar682.x ) * vec3( 0.1031 ) ) );
										nodeVar683 = ( nodeVar683 + vec3( dot( nodeVar683, ( nodeVar683.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar646 = ( nodeVar646 + ( nodeVar647 * mix( mix( fract( ( ( nodeVar677.x + nodeVar677.y ) * nodeVar677.z ) ), fract( ( ( nodeVar679.x + nodeVar679.y ) * nodeVar679.z ) ), nodeVar676.x ), mix( fract( ( ( nodeVar681.x + nodeVar681.y ) * nodeVar681.z ) ), fract( ( ( nodeVar683.x + nodeVar683.y ) * nodeVar683.z ) ), nodeVar676.x ), nodeVar676.y ) ) );
										nodeVar645 = ( nodeVar645 * vec2( 2.03 ) );
										nodeVar647 = ( nodeVar647 * 0.52 );
										nodeVar684 = ( nodeVar644 * vec2( 6.0 ) );
										nodeVar685 = 0.0;
										nodeVar686 = 0.5;
										nodeVar687 = floor( nodeVar684 );
										nodeVar688 = fract( nodeVar684 );
										nodeVar688 = ( ( nodeVar688 * nodeVar688 ) * ( vec2( 3.0 ) - ( nodeVar688 * vec2( 2.0 ) ) ) );
										nodeVar689 = fract( ( vec3( nodeVar687.x, nodeVar687.y, nodeVar687.x ) * vec3( 0.1031 ) ) );
										nodeVar689 = ( nodeVar689 + vec3( dot( nodeVar689, ( nodeVar689.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar690 = ( nodeVar687 + vec2( 1.0, 0.0 ) );
										nodeVar691 = fract( ( vec3( nodeVar690.x, nodeVar690.y, nodeVar690.x ) * vec3( 0.1031 ) ) );
										nodeVar691 = ( nodeVar691 + vec3( dot( nodeVar691, ( nodeVar691.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar692 = ( nodeVar687 + vec2( 0.0, 1.0 ) );
										nodeVar693 = fract( ( vec3( nodeVar692.x, nodeVar692.y, nodeVar692.x ) * vec3( 0.1031 ) ) );
										nodeVar693 = ( nodeVar693 + vec3( dot( nodeVar693, ( nodeVar693.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar694 = ( nodeVar687 + vec2( 1.0, 1.0 ) );
										nodeVar695 = fract( ( vec3( nodeVar694.x, nodeVar694.y, nodeVar694.x ) * vec3( 0.1031 ) ) );
										nodeVar695 = ( nodeVar695 + vec3( dot( nodeVar695, ( nodeVar695.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar685 = ( nodeVar685 + ( nodeVar686 * mix( mix( fract( ( ( nodeVar689.x + nodeVar689.y ) * nodeVar689.z ) ), fract( ( ( nodeVar691.x + nodeVar691.y ) * nodeVar691.z ) ), nodeVar688.x ), mix( fract( ( ( nodeVar693.x + nodeVar693.y ) * nodeVar693.z ) ), fract( ( ( nodeVar695.x + nodeVar695.y ) * nodeVar695.z ) ), nodeVar688.x ), nodeVar688.y ) ) );
										nodeVar684 = ( nodeVar684 * vec2( 2.03 ) );
										nodeVar686 = ( nodeVar686 * 0.52 );
										nodeVar696 = floor( nodeVar684 );
										nodeVar697 = fract( nodeVar684 );
										nodeVar697 = ( ( nodeVar697 * nodeVar697 ) * ( vec2( 3.0 ) - ( nodeVar697 * vec2( 2.0 ) ) ) );
										nodeVar698 = fract( ( vec3( nodeVar696.x, nodeVar696.y, nodeVar696.x ) * vec3( 0.1031 ) ) );
										nodeVar698 = ( nodeVar698 + vec3( dot( nodeVar698, ( nodeVar698.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar699 = ( nodeVar696 + vec2( 1.0, 0.0 ) );
										nodeVar700 = fract( ( vec3( nodeVar699.x, nodeVar699.y, nodeVar699.x ) * vec3( 0.1031 ) ) );
										nodeVar700 = ( nodeVar700 + vec3( dot( nodeVar700, ( nodeVar700.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar701 = ( nodeVar696 + vec2( 0.0, 1.0 ) );
										nodeVar702 = fract( ( vec3( nodeVar701.x, nodeVar701.y, nodeVar701.x ) * vec3( 0.1031 ) ) );
										nodeVar702 = ( nodeVar702 + vec3( dot( nodeVar702, ( nodeVar702.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar703 = ( nodeVar696 + vec2( 1.0, 1.0 ) );
										nodeVar704 = fract( ( vec3( nodeVar703.x, nodeVar703.y, nodeVar703.x ) * vec3( 0.1031 ) ) );
										nodeVar704 = ( nodeVar704 + vec3( dot( nodeVar704, ( nodeVar704.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar685 = ( nodeVar685 + ( nodeVar686 * mix( mix( fract( ( ( nodeVar698.x + nodeVar698.y ) * nodeVar698.z ) ), fract( ( ( nodeVar700.x + nodeVar700.y ) * nodeVar700.z ) ), nodeVar697.x ), mix( fract( ( ( nodeVar702.x + nodeVar702.y ) * nodeVar702.z ) ), fract( ( ( nodeVar704.x + nodeVar704.y ) * nodeVar704.z ) ), nodeVar697.x ), nodeVar697.y ) ) );
										nodeVar684 = ( nodeVar684 * vec2( 2.03 ) );
										nodeVar686 = ( nodeVar686 * 0.52 );
										nodeVar705 = floor( nodeVar684 );
										nodeVar706 = fract( nodeVar684 );
										nodeVar706 = ( ( nodeVar706 * nodeVar706 ) * ( vec2( 3.0 ) - ( nodeVar706 * vec2( 2.0 ) ) ) );
										nodeVar707 = fract( ( vec3( nodeVar705.x, nodeVar705.y, nodeVar705.x ) * vec3( 0.1031 ) ) );
										nodeVar707 = ( nodeVar707 + vec3( dot( nodeVar707, ( nodeVar707.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar708 = ( nodeVar705 + vec2( 1.0, 0.0 ) );
										nodeVar709 = fract( ( vec3( nodeVar708.x, nodeVar708.y, nodeVar708.x ) * vec3( 0.1031 ) ) );
										nodeVar709 = ( nodeVar709 + vec3( dot( nodeVar709, ( nodeVar709.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar710 = ( nodeVar705 + vec2( 0.0, 1.0 ) );
										nodeVar711 = fract( ( vec3( nodeVar710.x, nodeVar710.y, nodeVar710.x ) * vec3( 0.1031 ) ) );
										nodeVar711 = ( nodeVar711 + vec3( dot( nodeVar711, ( nodeVar711.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar712 = ( nodeVar705 + vec2( 1.0, 1.0 ) );
										nodeVar713 = fract( ( vec3( nodeVar712.x, nodeVar712.y, nodeVar712.x ) * vec3( 0.1031 ) ) );
										nodeVar713 = ( nodeVar713 + vec3( dot( nodeVar713, ( nodeVar713.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar685 = ( nodeVar685 + ( nodeVar686 * mix( mix( fract( ( ( nodeVar707.x + nodeVar707.y ) * nodeVar707.z ) ), fract( ( ( nodeVar709.x + nodeVar709.y ) * nodeVar709.z ) ), nodeVar706.x ), mix( fract( ( ( nodeVar711.x + nodeVar711.y ) * nodeVar711.z ) ), fract( ( ( nodeVar713.x + nodeVar713.y ) * nodeVar713.z ) ), nodeVar706.x ), nodeVar706.y ) ) );
										nodeVar684 = ( nodeVar684 * vec2( 2.03 ) );
										nodeVar686 = ( nodeVar686 * 0.52 );
										nodeVar714 = floor( nodeVar684 );
										nodeVar715 = fract( nodeVar684 );
										nodeVar715 = ( ( nodeVar715 * nodeVar715 ) * ( vec2( 3.0 ) - ( nodeVar715 * vec2( 2.0 ) ) ) );
										nodeVar716 = fract( ( vec3( nodeVar714.x, nodeVar714.y, nodeVar714.x ) * vec3( 0.1031 ) ) );
										nodeVar716 = ( nodeVar716 + vec3( dot( nodeVar716, ( nodeVar716.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar717 = ( nodeVar714 + vec2( 1.0, 0.0 ) );
										nodeVar718 = fract( ( vec3( nodeVar717.x, nodeVar717.y, nodeVar717.x ) * vec3( 0.1031 ) ) );
										nodeVar718 = ( nodeVar718 + vec3( dot( nodeVar718, ( nodeVar718.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar719 = ( nodeVar714 + vec2( 0.0, 1.0 ) );
										nodeVar720 = fract( ( vec3( nodeVar719.x, nodeVar719.y, nodeVar719.x ) * vec3( 0.1031 ) ) );
										nodeVar720 = ( nodeVar720 + vec3( dot( nodeVar720, ( nodeVar720.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar721 = ( nodeVar714 + vec2( 1.0, 1.0 ) );
										nodeVar722 = fract( ( vec3( nodeVar721.x, nodeVar721.y, nodeVar721.x ) * vec3( 0.1031 ) ) );
										nodeVar722 = ( nodeVar722 + vec3( dot( nodeVar722, ( nodeVar722.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar685 = ( nodeVar685 + ( nodeVar686 * mix( mix( fract( ( ( nodeVar716.x + nodeVar716.y ) * nodeVar716.z ) ), fract( ( ( nodeVar718.x + nodeVar718.y ) * nodeVar718.z ) ), nodeVar715.x ), mix( fract( ( ( nodeVar720.x + nodeVar720.y ) * nodeVar720.z ) ), fract( ( ( nodeVar722.x + nodeVar722.y ) * nodeVar722.z ) ), nodeVar715.x ), nodeVar715.y ) ) );
										nodeVar684 = ( nodeVar684 * vec2( 2.03 ) );
										nodeVar686 = ( nodeVar686 * 0.52 );
										nodeVar723 = ( ( nodeVar646 * 0.6 ) + ( nodeVar685 * 0.4 ) );
										nodeVar0 = vec3( nodeVar723, 1.0, nodeVar723 );
										

									} else {


										if ( ( nodeVar1 < 9.5 ) ) {

											normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
											nodeVar724 = abs( normalWorld );
											nodeVar725 = vec2( 0.0, 0.0 );

											if ( ( nodeVar724.y > max( nodeVar724.x, nodeVar724.z ) ) ) {

												nodeVar725 = v_positionWorld.xz;
												

											} else {


												if ( ( nodeVar724.x > nodeVar724.z ) ) {

													nodeVar725 = vec2( v_positionWorld.z, v_positionWorld.y );
													

												} else {

													nodeVar725 = vec2( v_positionWorld.x, v_positionWorld.y );
													

												}

												

											}

											nodeVar726 = ( nodeVar725 * vec2( 26.0 ) );
											nodeVar727 = 0.0;
											nodeVar728 = 0.5;
											nodeVar729 = floor( nodeVar726 );
											nodeVar730 = fract( nodeVar726 );
											nodeVar730 = ( ( nodeVar730 * nodeVar730 ) * ( vec2( 3.0 ) - ( nodeVar730 * vec2( 2.0 ) ) ) );
											nodeVar731 = fract( ( vec3( nodeVar729.x, nodeVar729.y, nodeVar729.x ) * vec3( 0.1031 ) ) );
											nodeVar731 = ( nodeVar731 + vec3( dot( nodeVar731, ( nodeVar731.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar732 = ( nodeVar729 + vec2( 1.0, 0.0 ) );
											nodeVar733 = fract( ( vec3( nodeVar732.x, nodeVar732.y, nodeVar732.x ) * vec3( 0.1031 ) ) );
											nodeVar733 = ( nodeVar733 + vec3( dot( nodeVar733, ( nodeVar733.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar734 = ( nodeVar729 + vec2( 0.0, 1.0 ) );
											nodeVar735 = fract( ( vec3( nodeVar734.x, nodeVar734.y, nodeVar734.x ) * vec3( 0.1031 ) ) );
											nodeVar735 = ( nodeVar735 + vec3( dot( nodeVar735, ( nodeVar735.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar736 = ( nodeVar729 + vec2( 1.0, 1.0 ) );
											nodeVar737 = fract( ( vec3( nodeVar736.x, nodeVar736.y, nodeVar736.x ) * vec3( 0.1031 ) ) );
											nodeVar737 = ( nodeVar737 + vec3( dot( nodeVar737, ( nodeVar737.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar727 = ( nodeVar727 + ( nodeVar728 * mix( mix( fract( ( ( nodeVar731.x + nodeVar731.y ) * nodeVar731.z ) ), fract( ( ( nodeVar733.x + nodeVar733.y ) * nodeVar733.z ) ), nodeVar730.x ), mix( fract( ( ( nodeVar735.x + nodeVar735.y ) * nodeVar735.z ) ), fract( ( ( nodeVar737.x + nodeVar737.y ) * nodeVar737.z ) ), nodeVar730.x ), nodeVar730.y ) ) );
											nodeVar726 = ( nodeVar726 * vec2( 2.03 ) );
											nodeVar728 = ( nodeVar728 * 0.52 );
											nodeVar738 = floor( nodeVar726 );
											nodeVar739 = fract( nodeVar726 );
											nodeVar739 = ( ( nodeVar739 * nodeVar739 ) * ( vec2( 3.0 ) - ( nodeVar739 * vec2( 2.0 ) ) ) );
											nodeVar740 = fract( ( vec3( nodeVar738.x, nodeVar738.y, nodeVar738.x ) * vec3( 0.1031 ) ) );
											nodeVar740 = ( nodeVar740 + vec3( dot( nodeVar740, ( nodeVar740.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar741 = ( nodeVar738 + vec2( 1.0, 0.0 ) );
											nodeVar742 = fract( ( vec3( nodeVar741.x, nodeVar741.y, nodeVar741.x ) * vec3( 0.1031 ) ) );
											nodeVar742 = ( nodeVar742 + vec3( dot( nodeVar742, ( nodeVar742.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar743 = ( nodeVar738 + vec2( 0.0, 1.0 ) );
											nodeVar744 = fract( ( vec3( nodeVar743.x, nodeVar743.y, nodeVar743.x ) * vec3( 0.1031 ) ) );
											nodeVar744 = ( nodeVar744 + vec3( dot( nodeVar744, ( nodeVar744.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar745 = ( nodeVar738 + vec2( 1.0, 1.0 ) );
											nodeVar746 = fract( ( vec3( nodeVar745.x, nodeVar745.y, nodeVar745.x ) * vec3( 0.1031 ) ) );
											nodeVar746 = ( nodeVar746 + vec3( dot( nodeVar746, ( nodeVar746.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar727 = ( nodeVar727 + ( nodeVar728 * mix( mix( fract( ( ( nodeVar740.x + nodeVar740.y ) * nodeVar740.z ) ), fract( ( ( nodeVar742.x + nodeVar742.y ) * nodeVar742.z ) ), nodeVar739.x ), mix( fract( ( ( nodeVar744.x + nodeVar744.y ) * nodeVar744.z ) ), fract( ( ( nodeVar746.x + nodeVar746.y ) * nodeVar746.z ) ), nodeVar739.x ), nodeVar739.y ) ) );
											nodeVar726 = ( nodeVar726 * vec2( 2.03 ) );
											nodeVar728 = ( nodeVar728 * 0.52 );
											nodeVar747 = floor( nodeVar726 );
											nodeVar748 = fract( nodeVar726 );
											nodeVar748 = ( ( nodeVar748 * nodeVar748 ) * ( vec2( 3.0 ) - ( nodeVar748 * vec2( 2.0 ) ) ) );
											nodeVar749 = fract( ( vec3( nodeVar747.x, nodeVar747.y, nodeVar747.x ) * vec3( 0.1031 ) ) );
											nodeVar749 = ( nodeVar749 + vec3( dot( nodeVar749, ( nodeVar749.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar750 = ( nodeVar747 + vec2( 1.0, 0.0 ) );
											nodeVar751 = fract( ( vec3( nodeVar750.x, nodeVar750.y, nodeVar750.x ) * vec3( 0.1031 ) ) );
											nodeVar751 = ( nodeVar751 + vec3( dot( nodeVar751, ( nodeVar751.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar752 = ( nodeVar747 + vec2( 0.0, 1.0 ) );
											nodeVar753 = fract( ( vec3( nodeVar752.x, nodeVar752.y, nodeVar752.x ) * vec3( 0.1031 ) ) );
											nodeVar753 = ( nodeVar753 + vec3( dot( nodeVar753, ( nodeVar753.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar754 = ( nodeVar747 + vec2( 1.0, 1.0 ) );
											nodeVar755 = fract( ( vec3( nodeVar754.x, nodeVar754.y, nodeVar754.x ) * vec3( 0.1031 ) ) );
											nodeVar755 = ( nodeVar755 + vec3( dot( nodeVar755, ( nodeVar755.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar727 = ( nodeVar727 + ( nodeVar728 * mix( mix( fract( ( ( nodeVar749.x + nodeVar749.y ) * nodeVar749.z ) ), fract( ( ( nodeVar751.x + nodeVar751.y ) * nodeVar751.z ) ), nodeVar748.x ), mix( fract( ( ( nodeVar753.x + nodeVar753.y ) * nodeVar753.z ) ), fract( ( ( nodeVar755.x + nodeVar755.y ) * nodeVar755.z ) ), nodeVar748.x ), nodeVar748.y ) ) );
											nodeVar726 = ( nodeVar726 * vec2( 2.03 ) );
											nodeVar728 = ( nodeVar728 * 0.52 );
											nodeVar756 = floor( nodeVar726 );
											nodeVar757 = fract( nodeVar726 );
											nodeVar757 = ( ( nodeVar757 * nodeVar757 ) * ( vec2( 3.0 ) - ( nodeVar757 * vec2( 2.0 ) ) ) );
											nodeVar758 = fract( ( vec3( nodeVar756.x, nodeVar756.y, nodeVar756.x ) * vec3( 0.1031 ) ) );
											nodeVar758 = ( nodeVar758 + vec3( dot( nodeVar758, ( nodeVar758.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar759 = ( nodeVar756 + vec2( 1.0, 0.0 ) );
											nodeVar760 = fract( ( vec3( nodeVar759.x, nodeVar759.y, nodeVar759.x ) * vec3( 0.1031 ) ) );
											nodeVar760 = ( nodeVar760 + vec3( dot( nodeVar760, ( nodeVar760.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar761 = ( nodeVar756 + vec2( 0.0, 1.0 ) );
											nodeVar762 = fract( ( vec3( nodeVar761.x, nodeVar761.y, nodeVar761.x ) * vec3( 0.1031 ) ) );
											nodeVar762 = ( nodeVar762 + vec3( dot( nodeVar762, ( nodeVar762.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar763 = ( nodeVar756 + vec2( 1.0, 1.0 ) );
											nodeVar764 = fract( ( vec3( nodeVar763.x, nodeVar763.y, nodeVar763.x ) * vec3( 0.1031 ) ) );
											nodeVar764 = ( nodeVar764 + vec3( dot( nodeVar764, ( nodeVar764.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar727 = ( nodeVar727 + ( nodeVar728 * mix( mix( fract( ( ( nodeVar758.x + nodeVar758.y ) * nodeVar758.z ) ), fract( ( ( nodeVar760.x + nodeVar760.y ) * nodeVar760.z ) ), nodeVar757.x ), mix( fract( ( ( nodeVar762.x + nodeVar762.y ) * nodeVar762.z ) ), fract( ( ( nodeVar764.x + nodeVar764.y ) * nodeVar764.z ) ), nodeVar757.x ), nodeVar757.y ) ) );
											nodeVar726 = ( nodeVar726 * vec2( 2.03 ) );
											nodeVar728 = ( nodeVar728 * 0.52 );
											nodeVar765 = ( nodeVar725 * vec2( 90.0 ) );
											nodeVar766 = 0.0;
											nodeVar767 = 0.5;
											nodeVar768 = floor( nodeVar765 );
											nodeVar769 = fract( nodeVar765 );
											nodeVar769 = ( ( nodeVar769 * nodeVar769 ) * ( vec2( 3.0 ) - ( nodeVar769 * vec2( 2.0 ) ) ) );
											nodeVar770 = fract( ( vec3( nodeVar768.x, nodeVar768.y, nodeVar768.x ) * vec3( 0.1031 ) ) );
											nodeVar770 = ( nodeVar770 + vec3( dot( nodeVar770, ( nodeVar770.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar771 = ( nodeVar768 + vec2( 1.0, 0.0 ) );
											nodeVar772 = fract( ( vec3( nodeVar771.x, nodeVar771.y, nodeVar771.x ) * vec3( 0.1031 ) ) );
											nodeVar772 = ( nodeVar772 + vec3( dot( nodeVar772, ( nodeVar772.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar773 = ( nodeVar768 + vec2( 0.0, 1.0 ) );
											nodeVar774 = fract( ( vec3( nodeVar773.x, nodeVar773.y, nodeVar773.x ) * vec3( 0.1031 ) ) );
											nodeVar774 = ( nodeVar774 + vec3( dot( nodeVar774, ( nodeVar774.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar775 = ( nodeVar768 + vec2( 1.0, 1.0 ) );
											nodeVar776 = fract( ( vec3( nodeVar775.x, nodeVar775.y, nodeVar775.x ) * vec3( 0.1031 ) ) );
											nodeVar776 = ( nodeVar776 + vec3( dot( nodeVar776, ( nodeVar776.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar766 = ( nodeVar766 + ( nodeVar767 * mix( mix( fract( ( ( nodeVar770.x + nodeVar770.y ) * nodeVar770.z ) ), fract( ( ( nodeVar772.x + nodeVar772.y ) * nodeVar772.z ) ), nodeVar769.x ), mix( fract( ( ( nodeVar774.x + nodeVar774.y ) * nodeVar774.z ) ), fract( ( ( nodeVar776.x + nodeVar776.y ) * nodeVar776.z ) ), nodeVar769.x ), nodeVar769.y ) ) );
											nodeVar765 = ( nodeVar765 * vec2( 2.03 ) );
											nodeVar767 = ( nodeVar767 * 0.52 );
											nodeVar777 = floor( nodeVar765 );
											nodeVar778 = fract( nodeVar765 );
											nodeVar778 = ( ( nodeVar778 * nodeVar778 ) * ( vec2( 3.0 ) - ( nodeVar778 * vec2( 2.0 ) ) ) );
											nodeVar779 = fract( ( vec3( nodeVar777.x, nodeVar777.y, nodeVar777.x ) * vec3( 0.1031 ) ) );
											nodeVar779 = ( nodeVar779 + vec3( dot( nodeVar779, ( nodeVar779.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar780 = ( nodeVar777 + vec2( 1.0, 0.0 ) );
											nodeVar781 = fract( ( vec3( nodeVar780.x, nodeVar780.y, nodeVar780.x ) * vec3( 0.1031 ) ) );
											nodeVar781 = ( nodeVar781 + vec3( dot( nodeVar781, ( nodeVar781.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar782 = ( nodeVar777 + vec2( 0.0, 1.0 ) );
											nodeVar783 = fract( ( vec3( nodeVar782.x, nodeVar782.y, nodeVar782.x ) * vec3( 0.1031 ) ) );
											nodeVar783 = ( nodeVar783 + vec3( dot( nodeVar783, ( nodeVar783.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar784 = ( nodeVar777 + vec2( 1.0, 1.0 ) );
											nodeVar785 = fract( ( vec3( nodeVar784.x, nodeVar784.y, nodeVar784.x ) * vec3( 0.1031 ) ) );
											nodeVar785 = ( nodeVar785 + vec3( dot( nodeVar785, ( nodeVar785.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar766 = ( nodeVar766 + ( nodeVar767 * mix( mix( fract( ( ( nodeVar779.x + nodeVar779.y ) * nodeVar779.z ) ), fract( ( ( nodeVar781.x + nodeVar781.y ) * nodeVar781.z ) ), nodeVar778.x ), mix( fract( ( ( nodeVar783.x + nodeVar783.y ) * nodeVar783.z ) ), fract( ( ( nodeVar785.x + nodeVar785.y ) * nodeVar785.z ) ), nodeVar778.x ), nodeVar778.y ) ) );
											nodeVar765 = ( nodeVar765 * vec2( 2.03 ) );
											nodeVar767 = ( nodeVar767 * 0.52 );
											nodeVar786 = floor( nodeVar765 );
											nodeVar787 = fract( nodeVar765 );
											nodeVar787 = ( ( nodeVar787 * nodeVar787 ) * ( vec2( 3.0 ) - ( nodeVar787 * vec2( 2.0 ) ) ) );
											nodeVar788 = fract( ( vec3( nodeVar786.x, nodeVar786.y, nodeVar786.x ) * vec3( 0.1031 ) ) );
											nodeVar788 = ( nodeVar788 + vec3( dot( nodeVar788, ( nodeVar788.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar789 = ( nodeVar786 + vec2( 1.0, 0.0 ) );
											nodeVar790 = fract( ( vec3( nodeVar789.x, nodeVar789.y, nodeVar789.x ) * vec3( 0.1031 ) ) );
											nodeVar790 = ( nodeVar790 + vec3( dot( nodeVar790, ( nodeVar790.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar791 = ( nodeVar786 + vec2( 0.0, 1.0 ) );
											nodeVar792 = fract( ( vec3( nodeVar791.x, nodeVar791.y, nodeVar791.x ) * vec3( 0.1031 ) ) );
											nodeVar792 = ( nodeVar792 + vec3( dot( nodeVar792, ( nodeVar792.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar793 = ( nodeVar786 + vec2( 1.0, 1.0 ) );
											nodeVar794 = fract( ( vec3( nodeVar793.x, nodeVar793.y, nodeVar793.x ) * vec3( 0.1031 ) ) );
											nodeVar794 = ( nodeVar794 + vec3( dot( nodeVar794, ( nodeVar794.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar766 = ( nodeVar766 + ( nodeVar767 * mix( mix( fract( ( ( nodeVar788.x + nodeVar788.y ) * nodeVar788.z ) ), fract( ( ( nodeVar790.x + nodeVar790.y ) * nodeVar790.z ) ), nodeVar787.x ), mix( fract( ( ( nodeVar792.x + nodeVar792.y ) * nodeVar792.z ) ), fract( ( ( nodeVar794.x + nodeVar794.y ) * nodeVar794.z ) ), nodeVar787.x ), nodeVar787.y ) ) );
											nodeVar765 = ( nodeVar765 * vec2( 2.03 ) );
											nodeVar767 = ( nodeVar767 * 0.52 );
											nodeVar795 = floor( nodeVar765 );
											nodeVar796 = fract( nodeVar765 );
											nodeVar796 = ( ( nodeVar796 * nodeVar796 ) * ( vec2( 3.0 ) - ( nodeVar796 * vec2( 2.0 ) ) ) );
											nodeVar797 = fract( ( vec3( nodeVar795.x, nodeVar795.y, nodeVar795.x ) * vec3( 0.1031 ) ) );
											nodeVar797 = ( nodeVar797 + vec3( dot( nodeVar797, ( nodeVar797.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar798 = ( nodeVar795 + vec2( 1.0, 0.0 ) );
											nodeVar799 = fract( ( vec3( nodeVar798.x, nodeVar798.y, nodeVar798.x ) * vec3( 0.1031 ) ) );
											nodeVar799 = ( nodeVar799 + vec3( dot( nodeVar799, ( nodeVar799.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar800 = ( nodeVar795 + vec2( 0.0, 1.0 ) );
											nodeVar801 = fract( ( vec3( nodeVar800.x, nodeVar800.y, nodeVar800.x ) * vec3( 0.1031 ) ) );
											nodeVar801 = ( nodeVar801 + vec3( dot( nodeVar801, ( nodeVar801.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar802 = ( nodeVar795 + vec2( 1.0, 1.0 ) );
											nodeVar803 = fract( ( vec3( nodeVar802.x, nodeVar802.y, nodeVar802.x ) * vec3( 0.1031 ) ) );
											nodeVar803 = ( nodeVar803 + vec3( dot( nodeVar803, ( nodeVar803.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar766 = ( nodeVar766 + ( nodeVar767 * mix( mix( fract( ( ( nodeVar797.x + nodeVar797.y ) * nodeVar797.z ) ), fract( ( ( nodeVar799.x + nodeVar799.y ) * nodeVar799.z ) ), nodeVar796.x ), mix( fract( ( ( nodeVar801.x + nodeVar801.y ) * nodeVar801.z ) ), fract( ( ( nodeVar803.x + nodeVar803.y ) * nodeVar803.z ) ), nodeVar796.x ), nodeVar796.y ) ) );
											nodeVar765 = ( nodeVar765 * vec2( 2.03 ) );
											nodeVar767 = ( nodeVar767 * 0.52 );
											nodeVar804 = ( ( nodeVar727 * 0.6 ) + ( nodeVar766 * 0.4 ) );
											nodeVar0 = vec3( ( nodeVar804 * 0.5 ), ( 0.8 + ( nodeVar804 * 0.2 ) ), nodeVar804 );
											

										} else {


											if ( ( nodeVar1 < 10.5 ) ) {

												normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
												nodeVar805 = abs( normalWorld );
												nodeVar806 = vec2( 0.0, 0.0 );

												if ( ( nodeVar805.y > max( nodeVar805.x, nodeVar805.z ) ) ) {

													nodeVar806 = v_positionWorld.xz;
													

												} else {


													if ( ( nodeVar805.x > nodeVar805.z ) ) {

														nodeVar806 = vec2( v_positionWorld.z, v_positionWorld.y );
														

													} else {

														nodeVar806 = vec2( v_positionWorld.x, v_positionWorld.y );
														

													}

													

												}

												nodeVar807 = ( nodeVar806 * vec2( 5.5 ) );
												nodeVar808 = 0.0;
												nodeVar809 = 0.5;
												nodeVar810 = floor( nodeVar807 );
												nodeVar811 = fract( nodeVar807 );
												nodeVar811 = ( ( nodeVar811 * nodeVar811 ) * ( vec2( 3.0 ) - ( nodeVar811 * vec2( 2.0 ) ) ) );
												nodeVar812 = fract( ( vec3( nodeVar810.x, nodeVar810.y, nodeVar810.x ) * vec3( 0.1031 ) ) );
												nodeVar812 = ( nodeVar812 + vec3( dot( nodeVar812, ( nodeVar812.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar813 = ( nodeVar810 + vec2( 1.0, 0.0 ) );
												nodeVar814 = fract( ( vec3( nodeVar813.x, nodeVar813.y, nodeVar813.x ) * vec3( 0.1031 ) ) );
												nodeVar814 = ( nodeVar814 + vec3( dot( nodeVar814, ( nodeVar814.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar815 = ( nodeVar810 + vec2( 0.0, 1.0 ) );
												nodeVar816 = fract( ( vec3( nodeVar815.x, nodeVar815.y, nodeVar815.x ) * vec3( 0.1031 ) ) );
												nodeVar816 = ( nodeVar816 + vec3( dot( nodeVar816, ( nodeVar816.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar817 = ( nodeVar810 + vec2( 1.0, 1.0 ) );
												nodeVar818 = fract( ( vec3( nodeVar817.x, nodeVar817.y, nodeVar817.x ) * vec3( 0.1031 ) ) );
												nodeVar818 = ( nodeVar818 + vec3( dot( nodeVar818, ( nodeVar818.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar808 = ( nodeVar808 + ( nodeVar809 * mix( mix( fract( ( ( nodeVar812.x + nodeVar812.y ) * nodeVar812.z ) ), fract( ( ( nodeVar814.x + nodeVar814.y ) * nodeVar814.z ) ), nodeVar811.x ), mix( fract( ( ( nodeVar816.x + nodeVar816.y ) * nodeVar816.z ) ), fract( ( ( nodeVar818.x + nodeVar818.y ) * nodeVar818.z ) ), nodeVar811.x ), nodeVar811.y ) ) );
												nodeVar807 = ( nodeVar807 * vec2( 2.03 ) );
												nodeVar809 = ( nodeVar809 * 0.52 );
												nodeVar819 = floor( nodeVar807 );
												nodeVar820 = fract( nodeVar807 );
												nodeVar820 = ( ( nodeVar820 * nodeVar820 ) * ( vec2( 3.0 ) - ( nodeVar820 * vec2( 2.0 ) ) ) );
												nodeVar821 = fract( ( vec3( nodeVar819.x, nodeVar819.y, nodeVar819.x ) * vec3( 0.1031 ) ) );
												nodeVar821 = ( nodeVar821 + vec3( dot( nodeVar821, ( nodeVar821.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar822 = ( nodeVar819 + vec2( 1.0, 0.0 ) );
												nodeVar823 = fract( ( vec3( nodeVar822.x, nodeVar822.y, nodeVar822.x ) * vec3( 0.1031 ) ) );
												nodeVar823 = ( nodeVar823 + vec3( dot( nodeVar823, ( nodeVar823.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar824 = ( nodeVar819 + vec2( 0.0, 1.0 ) );
												nodeVar825 = fract( ( vec3( nodeVar824.x, nodeVar824.y, nodeVar824.x ) * vec3( 0.1031 ) ) );
												nodeVar825 = ( nodeVar825 + vec3( dot( nodeVar825, ( nodeVar825.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar826 = ( nodeVar819 + vec2( 1.0, 1.0 ) );
												nodeVar827 = fract( ( vec3( nodeVar826.x, nodeVar826.y, nodeVar826.x ) * vec3( 0.1031 ) ) );
												nodeVar827 = ( nodeVar827 + vec3( dot( nodeVar827, ( nodeVar827.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar808 = ( nodeVar808 + ( nodeVar809 * mix( mix( fract( ( ( nodeVar821.x + nodeVar821.y ) * nodeVar821.z ) ), fract( ( ( nodeVar823.x + nodeVar823.y ) * nodeVar823.z ) ), nodeVar820.x ), mix( fract( ( ( nodeVar825.x + nodeVar825.y ) * nodeVar825.z ) ), fract( ( ( nodeVar827.x + nodeVar827.y ) * nodeVar827.z ) ), nodeVar820.x ), nodeVar820.y ) ) );
												nodeVar807 = ( nodeVar807 * vec2( 2.03 ) );
												nodeVar809 = ( nodeVar809 * 0.52 );
												nodeVar828 = floor( nodeVar807 );
												nodeVar829 = fract( nodeVar807 );
												nodeVar829 = ( ( nodeVar829 * nodeVar829 ) * ( vec2( 3.0 ) - ( nodeVar829 * vec2( 2.0 ) ) ) );
												nodeVar830 = fract( ( vec3( nodeVar828.x, nodeVar828.y, nodeVar828.x ) * vec3( 0.1031 ) ) );
												nodeVar830 = ( nodeVar830 + vec3( dot( nodeVar830, ( nodeVar830.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar831 = ( nodeVar828 + vec2( 1.0, 0.0 ) );
												nodeVar832 = fract( ( vec3( nodeVar831.x, nodeVar831.y, nodeVar831.x ) * vec3( 0.1031 ) ) );
												nodeVar832 = ( nodeVar832 + vec3( dot( nodeVar832, ( nodeVar832.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar833 = ( nodeVar828 + vec2( 0.0, 1.0 ) );
												nodeVar834 = fract( ( vec3( nodeVar833.x, nodeVar833.y, nodeVar833.x ) * vec3( 0.1031 ) ) );
												nodeVar834 = ( nodeVar834 + vec3( dot( nodeVar834, ( nodeVar834.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar835 = ( nodeVar828 + vec2( 1.0, 1.0 ) );
												nodeVar836 = fract( ( vec3( nodeVar835.x, nodeVar835.y, nodeVar835.x ) * vec3( 0.1031 ) ) );
												nodeVar836 = ( nodeVar836 + vec3( dot( nodeVar836, ( nodeVar836.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar808 = ( nodeVar808 + ( nodeVar809 * mix( mix( fract( ( ( nodeVar830.x + nodeVar830.y ) * nodeVar830.z ) ), fract( ( ( nodeVar832.x + nodeVar832.y ) * nodeVar832.z ) ), nodeVar829.x ), mix( fract( ( ( nodeVar834.x + nodeVar834.y ) * nodeVar834.z ) ), fract( ( ( nodeVar836.x + nodeVar836.y ) * nodeVar836.z ) ), nodeVar829.x ), nodeVar829.y ) ) );
												nodeVar807 = ( nodeVar807 * vec2( 2.03 ) );
												nodeVar809 = ( nodeVar809 * 0.52 );
												nodeVar837 = floor( nodeVar807 );
												nodeVar838 = fract( nodeVar807 );
												nodeVar838 = ( ( nodeVar838 * nodeVar838 ) * ( vec2( 3.0 ) - ( nodeVar838 * vec2( 2.0 ) ) ) );
												nodeVar839 = fract( ( vec3( nodeVar837.x, nodeVar837.y, nodeVar837.x ) * vec3( 0.1031 ) ) );
												nodeVar839 = ( nodeVar839 + vec3( dot( nodeVar839, ( nodeVar839.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar840 = ( nodeVar837 + vec2( 1.0, 0.0 ) );
												nodeVar841 = fract( ( vec3( nodeVar840.x, nodeVar840.y, nodeVar840.x ) * vec3( 0.1031 ) ) );
												nodeVar841 = ( nodeVar841 + vec3( dot( nodeVar841, ( nodeVar841.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar842 = ( nodeVar837 + vec2( 0.0, 1.0 ) );
												nodeVar843 = fract( ( vec3( nodeVar842.x, nodeVar842.y, nodeVar842.x ) * vec3( 0.1031 ) ) );
												nodeVar843 = ( nodeVar843 + vec3( dot( nodeVar843, ( nodeVar843.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar844 = ( nodeVar837 + vec2( 1.0, 1.0 ) );
												nodeVar845 = fract( ( vec3( nodeVar844.x, nodeVar844.y, nodeVar844.x ) * vec3( 0.1031 ) ) );
												nodeVar845 = ( nodeVar845 + vec3( dot( nodeVar845, ( nodeVar845.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar808 = ( nodeVar808 + ( nodeVar809 * mix( mix( fract( ( ( nodeVar839.x + nodeVar839.y ) * nodeVar839.z ) ), fract( ( ( nodeVar841.x + nodeVar841.y ) * nodeVar841.z ) ), nodeVar838.x ), mix( fract( ( ( nodeVar843.x + nodeVar843.y ) * nodeVar843.z ) ), fract( ( ( nodeVar845.x + nodeVar845.y ) * nodeVar845.z ) ), nodeVar838.x ), nodeVar838.y ) ) );
												nodeVar807 = ( nodeVar807 * vec2( 2.03 ) );
												nodeVar809 = ( nodeVar809 * 0.52 );
												nodeVar846 = ( nodeVar806 * vec2( 17.0 ) );
												nodeVar847 = 0.0;
												nodeVar848 = 0.5;
												nodeVar849 = floor( nodeVar846 );
												nodeVar850 = fract( nodeVar846 );
												nodeVar850 = ( ( nodeVar850 * nodeVar850 ) * ( vec2( 3.0 ) - ( nodeVar850 * vec2( 2.0 ) ) ) );
												nodeVar851 = fract( ( vec3( nodeVar849.x, nodeVar849.y, nodeVar849.x ) * vec3( 0.1031 ) ) );
												nodeVar851 = ( nodeVar851 + vec3( dot( nodeVar851, ( nodeVar851.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar852 = ( nodeVar849 + vec2( 1.0, 0.0 ) );
												nodeVar853 = fract( ( vec3( nodeVar852.x, nodeVar852.y, nodeVar852.x ) * vec3( 0.1031 ) ) );
												nodeVar853 = ( nodeVar853 + vec3( dot( nodeVar853, ( nodeVar853.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar854 = ( nodeVar849 + vec2( 0.0, 1.0 ) );
												nodeVar855 = fract( ( vec3( nodeVar854.x, nodeVar854.y, nodeVar854.x ) * vec3( 0.1031 ) ) );
												nodeVar855 = ( nodeVar855 + vec3( dot( nodeVar855, ( nodeVar855.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar856 = ( nodeVar849 + vec2( 1.0, 1.0 ) );
												nodeVar857 = fract( ( vec3( nodeVar856.x, nodeVar856.y, nodeVar856.x ) * vec3( 0.1031 ) ) );
												nodeVar857 = ( nodeVar857 + vec3( dot( nodeVar857, ( nodeVar857.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar847 = ( nodeVar847 + ( nodeVar848 * mix( mix( fract( ( ( nodeVar851.x + nodeVar851.y ) * nodeVar851.z ) ), fract( ( ( nodeVar853.x + nodeVar853.y ) * nodeVar853.z ) ), nodeVar850.x ), mix( fract( ( ( nodeVar855.x + nodeVar855.y ) * nodeVar855.z ) ), fract( ( ( nodeVar857.x + nodeVar857.y ) * nodeVar857.z ) ), nodeVar850.x ), nodeVar850.y ) ) );
												nodeVar846 = ( nodeVar846 * vec2( 2.03 ) );
												nodeVar848 = ( nodeVar848 * 0.52 );
												nodeVar858 = floor( nodeVar846 );
												nodeVar859 = fract( nodeVar846 );
												nodeVar859 = ( ( nodeVar859 * nodeVar859 ) * ( vec2( 3.0 ) - ( nodeVar859 * vec2( 2.0 ) ) ) );
												nodeVar860 = fract( ( vec3( nodeVar858.x, nodeVar858.y, nodeVar858.x ) * vec3( 0.1031 ) ) );
												nodeVar860 = ( nodeVar860 + vec3( dot( nodeVar860, ( nodeVar860.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar861 = ( nodeVar858 + vec2( 1.0, 0.0 ) );
												nodeVar862 = fract( ( vec3( nodeVar861.x, nodeVar861.y, nodeVar861.x ) * vec3( 0.1031 ) ) );
												nodeVar862 = ( nodeVar862 + vec3( dot( nodeVar862, ( nodeVar862.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar863 = ( nodeVar858 + vec2( 0.0, 1.0 ) );
												nodeVar864 = fract( ( vec3( nodeVar863.x, nodeVar863.y, nodeVar863.x ) * vec3( 0.1031 ) ) );
												nodeVar864 = ( nodeVar864 + vec3( dot( nodeVar864, ( nodeVar864.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar865 = ( nodeVar858 + vec2( 1.0, 1.0 ) );
												nodeVar866 = fract( ( vec3( nodeVar865.x, nodeVar865.y, nodeVar865.x ) * vec3( 0.1031 ) ) );
												nodeVar866 = ( nodeVar866 + vec3( dot( nodeVar866, ( nodeVar866.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar847 = ( nodeVar847 + ( nodeVar848 * mix( mix( fract( ( ( nodeVar860.x + nodeVar860.y ) * nodeVar860.z ) ), fract( ( ( nodeVar862.x + nodeVar862.y ) * nodeVar862.z ) ), nodeVar859.x ), mix( fract( ( ( nodeVar864.x + nodeVar864.y ) * nodeVar864.z ) ), fract( ( ( nodeVar866.x + nodeVar866.y ) * nodeVar866.z ) ), nodeVar859.x ), nodeVar859.y ) ) );
												nodeVar846 = ( nodeVar846 * vec2( 2.03 ) );
												nodeVar848 = ( nodeVar848 * 0.52 );
												nodeVar867 = floor( nodeVar846 );
												nodeVar868 = fract( nodeVar846 );
												nodeVar868 = ( ( nodeVar868 * nodeVar868 ) * ( vec2( 3.0 ) - ( nodeVar868 * vec2( 2.0 ) ) ) );
												nodeVar869 = fract( ( vec3( nodeVar867.x, nodeVar867.y, nodeVar867.x ) * vec3( 0.1031 ) ) );
												nodeVar869 = ( nodeVar869 + vec3( dot( nodeVar869, ( nodeVar869.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar870 = ( nodeVar867 + vec2( 1.0, 0.0 ) );
												nodeVar871 = fract( ( vec3( nodeVar870.x, nodeVar870.y, nodeVar870.x ) * vec3( 0.1031 ) ) );
												nodeVar871 = ( nodeVar871 + vec3( dot( nodeVar871, ( nodeVar871.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar872 = ( nodeVar867 + vec2( 0.0, 1.0 ) );
												nodeVar873 = fract( ( vec3( nodeVar872.x, nodeVar872.y, nodeVar872.x ) * vec3( 0.1031 ) ) );
												nodeVar873 = ( nodeVar873 + vec3( dot( nodeVar873, ( nodeVar873.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar874 = ( nodeVar867 + vec2( 1.0, 1.0 ) );
												nodeVar875 = fract( ( vec3( nodeVar874.x, nodeVar874.y, nodeVar874.x ) * vec3( 0.1031 ) ) );
												nodeVar875 = ( nodeVar875 + vec3( dot( nodeVar875, ( nodeVar875.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar847 = ( nodeVar847 + ( nodeVar848 * mix( mix( fract( ( ( nodeVar869.x + nodeVar869.y ) * nodeVar869.z ) ), fract( ( ( nodeVar871.x + nodeVar871.y ) * nodeVar871.z ) ), nodeVar868.x ), mix( fract( ( ( nodeVar873.x + nodeVar873.y ) * nodeVar873.z ) ), fract( ( ( nodeVar875.x + nodeVar875.y ) * nodeVar875.z ) ), nodeVar868.x ), nodeVar868.y ) ) );
												nodeVar846 = ( nodeVar846 * vec2( 2.03 ) );
												nodeVar848 = ( nodeVar848 * 0.52 );
												nodeVar876 = floor( nodeVar846 );
												nodeVar877 = fract( nodeVar846 );
												nodeVar877 = ( ( nodeVar877 * nodeVar877 ) * ( vec2( 3.0 ) - ( nodeVar877 * vec2( 2.0 ) ) ) );
												nodeVar878 = fract( ( vec3( nodeVar876.x, nodeVar876.y, nodeVar876.x ) * vec3( 0.1031 ) ) );
												nodeVar878 = ( nodeVar878 + vec3( dot( nodeVar878, ( nodeVar878.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar879 = ( nodeVar876 + vec2( 1.0, 0.0 ) );
												nodeVar880 = fract( ( vec3( nodeVar879.x, nodeVar879.y, nodeVar879.x ) * vec3( 0.1031 ) ) );
												nodeVar880 = ( nodeVar880 + vec3( dot( nodeVar880, ( nodeVar880.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar881 = ( nodeVar876 + vec2( 0.0, 1.0 ) );
												nodeVar882 = fract( ( vec3( nodeVar881.x, nodeVar881.y, nodeVar881.x ) * vec3( 0.1031 ) ) );
												nodeVar882 = ( nodeVar882 + vec3( dot( nodeVar882, ( nodeVar882.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar883 = ( nodeVar876 + vec2( 1.0, 1.0 ) );
												nodeVar884 = fract( ( vec3( nodeVar883.x, nodeVar883.y, nodeVar883.x ) * vec3( 0.1031 ) ) );
												nodeVar884 = ( nodeVar884 + vec3( dot( nodeVar884, ( nodeVar884.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar847 = ( nodeVar847 + ( nodeVar848 * mix( mix( fract( ( ( nodeVar878.x + nodeVar878.y ) * nodeVar878.z ) ), fract( ( ( nodeVar880.x + nodeVar880.y ) * nodeVar880.z ) ), nodeVar877.x ), mix( fract( ( ( nodeVar882.x + nodeVar882.y ) * nodeVar882.z ) ), fract( ( ( nodeVar884.x + nodeVar884.y ) * nodeVar884.z ) ), nodeVar877.x ), nodeVar877.y ) ) );
												nodeVar846 = ( nodeVar846 * vec2( 2.03 ) );
												nodeVar848 = ( nodeVar848 * 0.52 );
												nodeVar885 = ( ( nodeVar808 * 0.62 ) + ( nodeVar847 * 0.38 ) );
												nodeVar0 = vec3( ( ( nodeVar885 * 0.52 ) + ( ( 0.5 + ( ( sin( ( nodeVar806.x * 1300.0 ) ) * sin( ( nodeVar806.y * 1300.0 ) ) ) * 0.5 ) ) * 0.055 ) ), 1.0, ( 0.34 + ( nodeVar885 * 0.66 ) ) );
												

											} else {

												normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
												nodeVar886 = abs( normalWorld );
												nodeVar887 = vec2( 0.0, 0.0 );

												if ( ( nodeVar886.y > max( nodeVar886.x, nodeVar886.z ) ) ) {

													nodeVar887 = v_positionWorld.xz;
													

												} else {


													if ( ( nodeVar886.x > nodeVar886.z ) ) {

														nodeVar887 = vec2( v_positionWorld.z, v_positionWorld.y );
														

													} else {

														nodeVar887 = vec2( v_positionWorld.x, v_positionWorld.y );
														

													}

													

												}

												nodeVar888 = ( nodeVar887 * vec2( 4.0 ) );
												nodeVar889 = 0.0;
												nodeVar890 = 0.5;
												nodeVar891 = floor( nodeVar888 );
												nodeVar892 = fract( nodeVar888 );
												nodeVar892 = ( ( nodeVar892 * nodeVar892 ) * ( vec2( 3.0 ) - ( nodeVar892 * vec2( 2.0 ) ) ) );
												nodeVar893 = fract( ( vec3( nodeVar891.x, nodeVar891.y, nodeVar891.x ) * vec3( 0.1031 ) ) );
												nodeVar893 = ( nodeVar893 + vec3( dot( nodeVar893, ( nodeVar893.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar894 = ( nodeVar891 + vec2( 1.0, 0.0 ) );
												nodeVar895 = fract( ( vec3( nodeVar894.x, nodeVar894.y, nodeVar894.x ) * vec3( 0.1031 ) ) );
												nodeVar895 = ( nodeVar895 + vec3( dot( nodeVar895, ( nodeVar895.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar896 = ( nodeVar891 + vec2( 0.0, 1.0 ) );
												nodeVar897 = fract( ( vec3( nodeVar896.x, nodeVar896.y, nodeVar896.x ) * vec3( 0.1031 ) ) );
												nodeVar897 = ( nodeVar897 + vec3( dot( nodeVar897, ( nodeVar897.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar898 = ( nodeVar891 + vec2( 1.0, 1.0 ) );
												nodeVar899 = fract( ( vec3( nodeVar898.x, nodeVar898.y, nodeVar898.x ) * vec3( 0.1031 ) ) );
												nodeVar899 = ( nodeVar899 + vec3( dot( nodeVar899, ( nodeVar899.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar889 = ( nodeVar889 + ( nodeVar890 * mix( mix( fract( ( ( nodeVar893.x + nodeVar893.y ) * nodeVar893.z ) ), fract( ( ( nodeVar895.x + nodeVar895.y ) * nodeVar895.z ) ), nodeVar892.x ), mix( fract( ( ( nodeVar897.x + nodeVar897.y ) * nodeVar897.z ) ), fract( ( ( nodeVar899.x + nodeVar899.y ) * nodeVar899.z ) ), nodeVar892.x ), nodeVar892.y ) ) );
												nodeVar888 = ( nodeVar888 * vec2( 2.03 ) );
												nodeVar890 = ( nodeVar890 * 0.52 );
												nodeVar900 = floor( nodeVar888 );
												nodeVar901 = fract( nodeVar888 );
												nodeVar901 = ( ( nodeVar901 * nodeVar901 ) * ( vec2( 3.0 ) - ( nodeVar901 * vec2( 2.0 ) ) ) );
												nodeVar902 = fract( ( vec3( nodeVar900.x, nodeVar900.y, nodeVar900.x ) * vec3( 0.1031 ) ) );
												nodeVar902 = ( nodeVar902 + vec3( dot( nodeVar902, ( nodeVar902.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar903 = ( nodeVar900 + vec2( 1.0, 0.0 ) );
												nodeVar904 = fract( ( vec3( nodeVar903.x, nodeVar903.y, nodeVar903.x ) * vec3( 0.1031 ) ) );
												nodeVar904 = ( nodeVar904 + vec3( dot( nodeVar904, ( nodeVar904.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar905 = ( nodeVar900 + vec2( 0.0, 1.0 ) );
												nodeVar906 = fract( ( vec3( nodeVar905.x, nodeVar905.y, nodeVar905.x ) * vec3( 0.1031 ) ) );
												nodeVar906 = ( nodeVar906 + vec3( dot( nodeVar906, ( nodeVar906.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar907 = ( nodeVar900 + vec2( 1.0, 1.0 ) );
												nodeVar908 = fract( ( vec3( nodeVar907.x, nodeVar907.y, nodeVar907.x ) * vec3( 0.1031 ) ) );
												nodeVar908 = ( nodeVar908 + vec3( dot( nodeVar908, ( nodeVar908.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar889 = ( nodeVar889 + ( nodeVar890 * mix( mix( fract( ( ( nodeVar902.x + nodeVar902.y ) * nodeVar902.z ) ), fract( ( ( nodeVar904.x + nodeVar904.y ) * nodeVar904.z ) ), nodeVar901.x ), mix( fract( ( ( nodeVar906.x + nodeVar906.y ) * nodeVar906.z ) ), fract( ( ( nodeVar908.x + nodeVar908.y ) * nodeVar908.z ) ), nodeVar901.x ), nodeVar901.y ) ) );
												nodeVar888 = ( nodeVar888 * vec2( 2.03 ) );
												nodeVar890 = ( nodeVar890 * 0.52 );
												nodeVar909 = floor( nodeVar888 );
												nodeVar910 = fract( nodeVar888 );
												nodeVar910 = ( ( nodeVar910 * nodeVar910 ) * ( vec2( 3.0 ) - ( nodeVar910 * vec2( 2.0 ) ) ) );
												nodeVar911 = fract( ( vec3( nodeVar909.x, nodeVar909.y, nodeVar909.x ) * vec3( 0.1031 ) ) );
												nodeVar911 = ( nodeVar911 + vec3( dot( nodeVar911, ( nodeVar911.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar912 = ( nodeVar909 + vec2( 1.0, 0.0 ) );
												nodeVar913 = fract( ( vec3( nodeVar912.x, nodeVar912.y, nodeVar912.x ) * vec3( 0.1031 ) ) );
												nodeVar913 = ( nodeVar913 + vec3( dot( nodeVar913, ( nodeVar913.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar914 = ( nodeVar909 + vec2( 0.0, 1.0 ) );
												nodeVar915 = fract( ( vec3( nodeVar914.x, nodeVar914.y, nodeVar914.x ) * vec3( 0.1031 ) ) );
												nodeVar915 = ( nodeVar915 + vec3( dot( nodeVar915, ( nodeVar915.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar916 = ( nodeVar909 + vec2( 1.0, 1.0 ) );
												nodeVar917 = fract( ( vec3( nodeVar916.x, nodeVar916.y, nodeVar916.x ) * vec3( 0.1031 ) ) );
												nodeVar917 = ( nodeVar917 + vec3( dot( nodeVar917, ( nodeVar917.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar889 = ( nodeVar889 + ( nodeVar890 * mix( mix( fract( ( ( nodeVar911.x + nodeVar911.y ) * nodeVar911.z ) ), fract( ( ( nodeVar913.x + nodeVar913.y ) * nodeVar913.z ) ), nodeVar910.x ), mix( fract( ( ( nodeVar915.x + nodeVar915.y ) * nodeVar915.z ) ), fract( ( ( nodeVar917.x + nodeVar917.y ) * nodeVar917.z ) ), nodeVar910.x ), nodeVar910.y ) ) );
												nodeVar888 = ( nodeVar888 * vec2( 2.03 ) );
												nodeVar890 = ( nodeVar890 * 0.52 );
												nodeVar918 = floor( nodeVar888 );
												nodeVar919 = fract( nodeVar888 );
												nodeVar919 = ( ( nodeVar919 * nodeVar919 ) * ( vec2( 3.0 ) - ( nodeVar919 * vec2( 2.0 ) ) ) );
												nodeVar920 = fract( ( vec3( nodeVar918.x, nodeVar918.y, nodeVar918.x ) * vec3( 0.1031 ) ) );
												nodeVar920 = ( nodeVar920 + vec3( dot( nodeVar920, ( nodeVar920.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar921 = ( nodeVar918 + vec2( 1.0, 0.0 ) );
												nodeVar922 = fract( ( vec3( nodeVar921.x, nodeVar921.y, nodeVar921.x ) * vec3( 0.1031 ) ) );
												nodeVar922 = ( nodeVar922 + vec3( dot( nodeVar922, ( nodeVar922.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar923 = ( nodeVar918 + vec2( 0.0, 1.0 ) );
												nodeVar924 = fract( ( vec3( nodeVar923.x, nodeVar923.y, nodeVar923.x ) * vec3( 0.1031 ) ) );
												nodeVar924 = ( nodeVar924 + vec3( dot( nodeVar924, ( nodeVar924.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar925 = ( nodeVar918 + vec2( 1.0, 1.0 ) );
												nodeVar926 = fract( ( vec3( nodeVar925.x, nodeVar925.y, nodeVar925.x ) * vec3( 0.1031 ) ) );
												nodeVar926 = ( nodeVar926 + vec3( dot( nodeVar926, ( nodeVar926.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar889 = ( nodeVar889 + ( nodeVar890 * mix( mix( fract( ( ( nodeVar920.x + nodeVar920.y ) * nodeVar920.z ) ), fract( ( ( nodeVar922.x + nodeVar922.y ) * nodeVar922.z ) ), nodeVar919.x ), mix( fract( ( ( nodeVar924.x + nodeVar924.y ) * nodeVar924.z ) ), fract( ( ( nodeVar926.x + nodeVar926.y ) * nodeVar926.z ) ), nodeVar919.x ), nodeVar919.y ) ) );
												nodeVar888 = ( nodeVar888 * vec2( 2.03 ) );
												nodeVar890 = ( nodeVar890 * 0.52 );
												nodeVar927 = nodeVar889;
												nodeVar0 = vec3( nodeVar927, 1.0, nodeVar927 );
												

											}

											

										}

										

									}

									

								}

								

							}

							

						}

						

					}

					

				}

				

			}

			

		}

		

	}

	nodeVar928 = nodeVar0;
	nodeVar929 = nodeVarying8;
	nodeVar930 = ( nodeVar929 * vec4( mix( 0.62, 1.0, nodeVar928.y ) ) );
	DiffuseColor = ( ( nodeVar930 * vec4( mix( 0.9, 1.1, nodeVar928.z ) ) ) * nodeVarying8 );
	DiffuseColor.w = ( DiffuseColor.w * nodeUniform4 );
	DiffuseColor.w = 1.0;
	Metalness = nodeUniform5;
	nodeVar931 = max( abs( dFdx( normalViewGeometry ) ), abs( dFdy( normalViewGeometry ) ) );
	Roughness = min( ( max( nodeUniform6, 0.0525 ) + max( max( nodeVar931.x, nodeVar931.y ), nodeVar931.z ) ), 1.0 );
	SpecularColor = vec3( 0.04, 0.04, 0.04 );
	SpecularColorBlended = mix( vec3( 0.04, 0.04, 0.04 ), DiffuseColor.xyz, Metalness );
	SpecularF90 = 1.0;
	DiffuseContribution = ( DiffuseColor.xyz * vec3( ( 1.0 - nodeUniform5 ) ) );
	EmissiveColor = ( nodeUniform7 * vec3( nodeUniform8 ) );
	nodeVar932 = ( nodeUniform9 - nodeUniform10 );
	nodeVar933 = vec4( nodeVar932, 0.0 );
	nodeVar934 = ( cameraViewMatrix * nodeVar933 );
	nodeVar935 = normalize( nodeVar934.xyz );
	nodeVar936 = nodeVar935;
	nodeVar937 = dot( normalView, nodeVar936 );
	nodeVar938 = ( vec3( clamp( nodeVar937, 0.0, 1.0 ) ) * nodeUniform11 );
	nodeVar939 = nodeVar938;
	directDiffuse = vec3( 0.0, 0.0, 0.0 );
	nodeVar940 = ( DiffuseContribution * vec3( 0.3183098861837907 ) );
	nodeVar941 = ( nodeVar939 * nodeVar940 );
	nodeVar942 = ( directDiffuse + nodeVar941 );
	directDiffuse = nodeVar942;
	directSpecular = vec3( 0.0, 0.0, 0.0 );
	positionViewDirection = normalize( v_positionViewDirection );
	nodeVar943 = normalize( ( nodeVar936 + positionViewDirection ) );
	nodeVar944 = clamp( dot( positionViewDirection, nodeVar943 ), 0.0, 1.0 );
	nodeVar945 = exp2( ( ( ( nodeVar944 * -5.55473 ) - 6.98316 ) * nodeVar944 ) );
	nodeVar946 = ( Roughness * Roughness );
	nodeVar947 = vec2( Roughness, clamp( dot( normalView, positionViewDirection ), 0.0, 1.0 ) );
	nodeVar949 = bool( nodeUniform13 );

	if ( nodeVar949 ) {

		nodeVar950 = nodeVar947;
		nodeVar948 = vec2( nodeVar950.x, 1.0 - nodeVar950.y );

	} else {

		nodeVar948 = nodeVar947;

	}

	nodeVar951 = texture( nodeUniform12, nodeVar948 );
	nodeVar952 = vec2( Roughness, clamp( dot( normalView, nodeVar936 ), 0.0, 1.0 ) );
	nodeVar954 = bool( nodeUniform14 );

	if ( nodeVar954 ) {

		nodeVar955 = nodeVar952;
		nodeVar953 = vec2( nodeVar955.x, 1.0 - nodeVar955.y );

	} else {

		nodeVar953 = nodeVar952;

	}

	nodeVar956 = texture( nodeUniform12, nodeVar953 );
	nodeVar957 = ( SpecularColorBlended + ( ( vec3( 1.0 ) - SpecularColorBlended ) * vec3( 0.047619 ) ) );
	nodeVar958 = ( 1.0 - ( nodeVar951.xy.x + nodeVar951.xy.y ) );
	nodeVar959 = ( 1.0 - ( nodeVar956.xy.x + nodeVar956.xy.y ) );
	nodeVar960 = ( ( ( ( ( SpecularColorBlended * vec3( ( 1.0 - nodeVar945 ) ) ) + vec3( ( 1.0 * nodeVar945 ) ) ) * vec3( V_GGX_SmithCorrelated( nodeVar946, clamp( dot( normalView, nodeVar936 ), 0.0, 1.0 ), clamp( dot( normalView, positionViewDirection ), 0.0, 1.0 ) ) ) ) * vec3( D_GGX( nodeVar946, clamp( dot( normalView, nodeVar943 ), 0.0, 1.0 ) ) ) ) + ( ( ( ( ( ( SpecularColorBlended * vec3( nodeVar951.xy.x ) ) + vec3( ( 1.0 * nodeVar951.xy.y ) ) ) * ( ( SpecularColorBlended * vec3( nodeVar956.xy.x ) ) + vec3( ( 1.0 * nodeVar956.xy.y ) ) ) ) * nodeVar957 ) / ( ( vec3( 1.0 ) - ( ( vec3( ( nodeVar958 * nodeVar959 ) ) * nodeVar957 ) * nodeVar957 ) ) + vec3( 0.000001 ) ) ) * vec3( ( nodeVar958 * nodeVar959 ) ) ) );
	nodeVar961 = ( nodeVar939 * nodeVar960 );
	nodeVar962 = ( directSpecular + nodeVar961 );
	directSpecular = nodeVar962;
	irradiance = vec3( 0.0, 0.0, 0.0 );
	nodeVar963 = dot( normalWorld, normalize( nodeUniform17 ) );
	nodeVar964 = ( nodeVar963 * 0.5 );
	nodeVar965 = ( nodeVar964 + 0.5 );
	nodeVar966 = mix( nodeUniform15, nodeUniform16, nodeVar965 );
	nodeVar967 = ( irradiance + nodeVar966 );
	irradiance = nodeVar967;
	nodeVar968 = ( DiffuseContribution * vec3( 0.3183098861837907 ) );
	nodeVar969 = ( irradiance * nodeVar968 );
	nodeVar970 = nodeVar969;
	indirectDiffuse = vec3( 0.0, 0.0, 0.0 );
	nodeVar971 = ( indirectDiffuse + nodeVar970 );
	indirectDiffuse = nodeVar971;
	singleScatteringDielectric = vec3( 0.0, 0.0, 0.0 );
	multiScatteringDielectric = vec3( 0.0, 0.0, 0.0 );
	singleScatteringMetallic = vec3( 0.0, 0.0, 0.0 );
	multiScatteringMetallic = vec3( 0.0, 0.0, 0.0 );
	nodeVar972 = dot( normalView, positionViewDirection );
	nodeVar973 = vec2( Roughness, clamp( nodeVar972, 0.0, 1.0 ) );
	nodeVar975 = bool( nodeUniform18 );

	if ( nodeVar975 ) {

		nodeVar976 = nodeVar973;
		nodeVar974 = vec2( nodeVar976.x, 1.0 - nodeVar976.y );

	} else {

		nodeVar974 = nodeVar973;

	}

	nodeVar977 = texture( nodeUniform12, nodeVar974 );
	nodeVar978 = ( SpecularColor * vec3( nodeVar977.xy.x ) );
	nodeVar979 = ( SpecularF90 * nodeVar977.xy.y );
	nodeVar980 = ( nodeVar978 + vec3( nodeVar979 ) );
	nodeVar981 = ( singleScatteringDielectric + nodeVar980 );
	singleScatteringDielectric = nodeVar981;
	nodeVar982 = ( vec3( 1.0 ) - SpecularColor );
	nodeVar983 = nodeVar982;
	nodeVar984 = ( nodeVar983 * vec3( 0.047619 ) );
	nodeVar985 = ( SpecularColor + nodeVar984 );
	nodeVar986 = ( nodeVar980 * nodeVar985 );
	nodeVar987 = ( nodeVar977.xy.x + nodeVar977.xy.y );
	nodeVar988 = ( 1.0 - nodeVar987 );
	nodeVar989 = nodeVar988;
	nodeVar990 = ( vec3( nodeVar989 ) * nodeVar985 );
	nodeVar991 = ( vec3( 1.0 ) - nodeVar990 );
	nodeVar992 = nodeVar991;
	nodeVar993 = ( nodeVar986 / nodeVar992 );
	nodeVar994 = ( nodeVar993 * vec3( nodeVar989 ) );
	nodeVar995 = ( multiScatteringDielectric + nodeVar994 );
	multiScatteringDielectric = nodeVar995;
	nodeVar996 = dot( normalView, positionViewDirection );
	nodeVar997 = vec2( Roughness, clamp( nodeVar996, 0.0, 1.0 ) );
	nodeVar999 = bool( nodeUniform19 );

	if ( nodeVar999 ) {

		nodeVar1000 = nodeVar997;
		nodeVar998 = vec2( nodeVar1000.x, 1.0 - nodeVar1000.y );

	} else {

		nodeVar998 = nodeVar997;

	}

	nodeVar1001 = texture( nodeUniform12, nodeVar998 );
	nodeVar1002 = ( DiffuseColor.xyz * vec3( nodeVar1001.xy.x ) );
	nodeVar1003 = ( SpecularF90 * nodeVar1001.xy.y );
	nodeVar1004 = ( nodeVar1002 + vec3( nodeVar1003 ) );
	nodeVar1005 = ( singleScatteringMetallic + nodeVar1004 );
	singleScatteringMetallic = nodeVar1005;
	nodeVar1006 = ( vec3( 1.0 ) - DiffuseColor.xyz );
	nodeVar1007 = nodeVar1006;
	nodeVar1008 = ( nodeVar1007 * vec3( 0.047619 ) );
	nodeVar1009 = ( DiffuseColor.xyz + nodeVar1008 );
	nodeVar1010 = ( nodeVar1004 * nodeVar1009 );
	nodeVar1011 = ( nodeVar1001.xy.x + nodeVar1001.xy.y );
	nodeVar1012 = ( 1.0 - nodeVar1011 );
	nodeVar1013 = nodeVar1012;
	nodeVar1014 = ( vec3( nodeVar1013 ) * nodeVar1009 );
	nodeVar1015 = ( vec3( 1.0 ) - nodeVar1014 );
	nodeVar1016 = nodeVar1015;
	nodeVar1017 = ( nodeVar1010 / nodeVar1016 );
	nodeVar1018 = ( nodeVar1017 * vec3( nodeVar1013 ) );
	nodeVar1019 = ( multiScatteringMetallic + nodeVar1018 );
	multiScatteringMetallic = nodeVar1019;
	radiance = vec3( 0.0, 0.0, 0.0 );
	nodeVar1020 = mix( singleScatteringDielectric, singleScatteringMetallic, Metalness );
	nodeVar1021 = ( radiance * nodeVar1020 );
	nodeVar1022 = mix( multiScatteringDielectric, multiScatteringMetallic, Metalness );
	iblIrradiance = vec3( 0.0, 0.0, 0.0 );
	nodeVar1023 = ( iblIrradiance * vec3( 0.3183098861837907 ) );
	nodeVar1024 = ( nodeVar1022 * nodeVar1023 );
	nodeVar1025 = ( nodeVar1021 + nodeVar1024 );
	nodeVar1026 = nodeVar1025;
	nodeVar1027 = ( singleScatteringDielectric + multiScatteringDielectric );
	nodeVar1028 = ( vec3( 1.0 ) - nodeVar1027 );
	nodeVar1029 = nodeVar1028;
	nodeVar1030 = ( DiffuseContribution * nodeVar1029 );
	nodeVar1031 = ( nodeVar1030 * nodeVar1023 );
	nodeVar1032 = nodeVar1031;
	indirectSpecular = vec3( 0.0, 0.0, 0.0 );
	nodeVar1033 = ( indirectSpecular + nodeVar1026 );
	indirectSpecular = nodeVar1033;
	nodeVar1034 = ( indirectDiffuse + nodeVar1032 );
	indirectDiffuse = nodeVar1034;
	ambientOcclusion = 1.0;
	nodeVar1035 = ( indirectDiffuse * vec3( ambientOcclusion ) );
	indirectDiffuse = nodeVar1035;
	nodeVar1036 = dot( normalView, positionViewDirection );
	nodeVar1037 = ( clamp( nodeVar1036, 0.0, 1.0 ) + ambientOcclusion );
	nodeVar1038 = ( Roughness * -16.0 );
	nodeVar1039 = ( 1.0 - nodeVar1038 );
	nodeVar1040 = nodeVar1039;
	nodeVar1041 = ( - nodeVar1040 );
	nodeVar1042 = exp2( nodeVar1041 );
	nodeVar1043 = pow( nodeVar1037, nodeVar1042 );
	nodeVar1044 = ( 1.0 - nodeVar1043 );
	nodeVar1045 = nodeVar1044;
	nodeVar1046 = ( ambientOcclusion - nodeVar1045 );
	nodeVar1047 = ( indirectSpecular * vec3( clamp( nodeVar1046, 0.0, 1.0 ) ) );
	indirectSpecular = nodeVar1047;
	nodeVar1048 = ( directDiffuse + indirectDiffuse );
	totalDiffuse = nodeVar1048;
	nodeVar1049 = ( directSpecular + indirectSpecular );
	totalSpecular = nodeVar1049;
	nodeVar1050 = ( totalDiffuse + totalSpecular );
	outgoingLight = nodeVar1050;
	nodeVar1051 = max( vec4( ( outgoingLight + EmissiveColor ), DiffuseColor.w ), 0.0 );
	Output = nodeVar1051;

	// result
	fragColor = nodeVar1051;

}
