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
	vec3 cameraPosition;
	vec3 nodeUniform12;
	vec3 nodeUniform17;
	vec3 nodeUniform18;
	vec3 nodeUniform16;
	vec3 nodeUniform10;
	vec3 nodeUniform11;
};

layout( std140 ) uniform object {
	mat4 nodeUniform0;
	mat3 nodeUniform4;
	float nodeUniform5;
	float nodeUniform6;
	float nodeUniform7;
	vec3 nodeUniform8;
	float nodeUniform9;
	uint nodeUniform14;
	uint nodeUniform15;
	uint nodeUniform19;
	uint nodeUniform20;
};
uniform sampler2D nodeUniform13;

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
float nodeVar2;
vec3 nodeVar3;
vec3 normalViewGeometry;
vec3 NORMAL_normalView;
vec3 NORMAL_normalWorld;
vec3 NORMAL_nodeVar4;
vec3 nodeVar5;
vec2 nodeVar6;
vec2 NORMAL_nodeVar7;
float nodeVar8;
float nodeVar9;
vec3 nodeVar10;
float nodeVar11;
float nodeVar12;
float nodeVar13;
float nodeVar14;
float nodeVar15;
float nodeVar16;
float nodeVar17;
float nodeVar18;
float nodeVar19;
vec2 nodeVar20;
vec3 nodeVar21;
float nodeVar22;
vec2 nodeVar23;
float nodeVar24;
float nodeVar25;
vec2 nodeVar26;
vec2 nodeVar27;
vec3 nodeVar28;
vec2 nodeVar29;
vec3 nodeVar30;
vec2 nodeVar31;
vec3 nodeVar32;
vec2 nodeVar33;
vec3 nodeVar34;
vec2 nodeVar35;
vec2 nodeVar36;
vec3 nodeVar37;
vec2 nodeVar38;
vec3 nodeVar39;
vec2 nodeVar40;
vec3 nodeVar41;
vec2 nodeVar42;
vec3 nodeVar43;
vec2 nodeVar44;
vec2 nodeVar45;
vec3 nodeVar46;
vec2 nodeVar47;
vec3 nodeVar48;
vec2 nodeVar49;
vec3 nodeVar50;
vec2 nodeVar51;
vec3 nodeVar52;
vec2 nodeVar53;
vec2 nodeVar54;
vec3 nodeVar55;
vec2 nodeVar56;
vec3 nodeVar57;
vec2 nodeVar58;
vec3 nodeVar59;
vec2 nodeVar60;
vec3 nodeVar61;
vec2 nodeVar62;
float nodeVar63;
float nodeVar64;
vec2 nodeVar65;
vec2 nodeVar66;
vec3 nodeVar67;
vec2 nodeVar68;
vec3 nodeVar69;
vec2 nodeVar70;
vec3 nodeVar71;
vec2 nodeVar72;
vec3 nodeVar73;
vec2 nodeVar74;
vec2 nodeVar75;
vec3 nodeVar76;
vec2 nodeVar77;
vec3 nodeVar78;
vec2 nodeVar79;
vec3 nodeVar80;
vec2 nodeVar81;
vec3 nodeVar82;
vec2 nodeVar83;
vec2 nodeVar84;
vec3 nodeVar85;
vec2 nodeVar86;
vec3 nodeVar87;
vec2 nodeVar88;
vec3 nodeVar89;
vec2 nodeVar90;
vec3 nodeVar91;
vec2 nodeVar92;
vec2 nodeVar93;
vec3 nodeVar94;
vec2 nodeVar95;
vec3 nodeVar96;
vec2 nodeVar97;
vec3 nodeVar98;
vec2 nodeVar99;
vec3 nodeVar100;
vec2 nodeVar101;
float nodeVar102;
float nodeVar103;
vec2 nodeVar104;
vec2 nodeVar105;
vec3 nodeVar106;
vec2 nodeVar107;
vec3 nodeVar108;
vec2 nodeVar109;
vec3 nodeVar110;
vec2 nodeVar111;
vec3 nodeVar112;
vec2 nodeVar113;
vec2 nodeVar114;
vec3 nodeVar115;
vec2 nodeVar116;
vec3 nodeVar117;
vec2 nodeVar118;
vec3 nodeVar119;
vec2 nodeVar120;
vec3 nodeVar121;
vec2 nodeVar122;
vec2 nodeVar123;
vec3 nodeVar124;
vec2 nodeVar125;
vec3 nodeVar126;
vec2 nodeVar127;
vec3 nodeVar128;
vec2 nodeVar129;
vec3 nodeVar130;
vec2 nodeVar131;
vec2 nodeVar132;
vec3 nodeVar133;
vec2 nodeVar134;
vec3 nodeVar135;
vec2 nodeVar136;
vec3 nodeVar137;
vec2 nodeVar138;
vec3 nodeVar139;
vec2 nodeVar140;
float nodeVar141;
float nodeVar142;
vec2 nodeVar143;
vec2 nodeVar144;
vec3 nodeVar145;
vec2 nodeVar146;
vec3 nodeVar147;
vec2 nodeVar148;
vec3 nodeVar149;
vec2 nodeVar150;
vec3 nodeVar151;
vec2 nodeVar152;
vec2 nodeVar153;
vec3 nodeVar154;
vec2 nodeVar155;
vec3 nodeVar156;
vec2 nodeVar157;
vec3 nodeVar158;
vec2 nodeVar159;
vec3 nodeVar160;
vec2 nodeVar161;
vec2 nodeVar162;
vec3 nodeVar163;
vec2 nodeVar164;
vec3 nodeVar165;
vec2 nodeVar166;
vec3 nodeVar167;
vec2 nodeVar168;
vec3 nodeVar169;
vec2 nodeVar170;
vec2 nodeVar171;
vec3 nodeVar172;
vec2 nodeVar173;
vec3 nodeVar174;
vec2 nodeVar175;
vec3 nodeVar176;
vec2 nodeVar177;
vec3 nodeVar178;
float nodeVar179;
float nodeVar180;
float nodeVar181;
float nodeVar182;
float nodeVar183;
float nodeVar184;
float nodeVar185;
vec2 nodeVar186;
vec3 nodeVar187;
float nodeVar188;
vec2 nodeVar189;
float nodeVar190;
float nodeVar191;
vec2 nodeVar192;
vec2 nodeVar193;
vec3 nodeVar194;
vec2 nodeVar195;
vec3 nodeVar196;
vec2 nodeVar197;
vec3 nodeVar198;
vec2 nodeVar199;
vec3 nodeVar200;
vec2 nodeVar201;
vec2 nodeVar202;
vec3 nodeVar203;
vec2 nodeVar204;
vec3 nodeVar205;
vec2 nodeVar206;
vec3 nodeVar207;
vec2 nodeVar208;
vec3 nodeVar209;
vec2 nodeVar210;
vec2 nodeVar211;
vec3 nodeVar212;
vec2 nodeVar213;
vec3 nodeVar214;
vec2 nodeVar215;
vec3 nodeVar216;
vec2 nodeVar217;
vec3 nodeVar218;
vec2 nodeVar219;
vec2 nodeVar220;
vec3 nodeVar221;
vec2 nodeVar222;
vec3 nodeVar223;
vec2 nodeVar224;
vec3 nodeVar225;
vec2 nodeVar226;
vec3 nodeVar227;
float nodeVar228;
float nodeVar229;
float nodeVar230;
vec2 nodeVar231;
float nodeVar232;
float nodeVar233;
vec2 nodeVar234;
vec2 nodeVar235;
vec3 nodeVar236;
vec2 nodeVar237;
vec3 nodeVar238;
vec2 nodeVar239;
vec3 nodeVar240;
vec2 nodeVar241;
vec3 nodeVar242;
vec2 nodeVar243;
vec2 nodeVar244;
vec3 nodeVar245;
vec2 nodeVar246;
vec3 nodeVar247;
vec2 nodeVar248;
vec3 nodeVar249;
vec2 nodeVar250;
vec3 nodeVar251;
vec2 nodeVar252;
vec2 nodeVar253;
vec3 nodeVar254;
vec2 nodeVar255;
vec3 nodeVar256;
vec2 nodeVar257;
vec3 nodeVar258;
vec2 nodeVar259;
vec3 nodeVar260;
vec2 nodeVar261;
vec2 nodeVar262;
vec3 nodeVar263;
vec2 nodeVar264;
vec3 nodeVar265;
vec2 nodeVar266;
vec3 nodeVar267;
vec2 nodeVar268;
vec3 nodeVar269;
float nodeVar270;
float nodeVar271;
float nodeVar272;
float nodeVar273;
float nodeVar274;
float nodeVar275;
float nodeVar276;
float nodeVar277;
float nodeVar278;
vec2 nodeVar279;
float nodeVar280;
float nodeVar281;
vec2 nodeVar282;
vec2 nodeVar283;
vec3 nodeVar284;
vec2 nodeVar285;
vec3 nodeVar286;
vec2 nodeVar287;
vec3 nodeVar288;
vec2 nodeVar289;
vec3 nodeVar290;
vec2 nodeVar291;
vec2 nodeVar292;
vec3 nodeVar293;
vec2 nodeVar294;
vec3 nodeVar295;
vec2 nodeVar296;
vec3 nodeVar297;
vec2 nodeVar298;
vec3 nodeVar299;
vec2 nodeVar300;
vec2 nodeVar301;
vec3 nodeVar302;
vec2 nodeVar303;
vec3 nodeVar304;
vec2 nodeVar305;
vec3 nodeVar306;
vec2 nodeVar307;
vec3 nodeVar308;
vec2 nodeVar309;
vec2 nodeVar310;
vec3 nodeVar311;
vec2 nodeVar312;
vec3 nodeVar313;
vec2 nodeVar314;
vec3 nodeVar315;
vec2 nodeVar316;
vec3 nodeVar317;
float nodeVar318;
vec2 nodeVar319;
vec3 nodeVar320;
float nodeVar321;
vec2 nodeVar322;
float nodeVar323;
float nodeVar324;
vec2 nodeVar325;
vec2 nodeVar326;
vec3 nodeVar327;
vec2 nodeVar328;
vec3 nodeVar329;
vec2 nodeVar330;
vec3 nodeVar331;
vec2 nodeVar332;
vec3 nodeVar333;
vec2 nodeVar334;
vec2 nodeVar335;
vec3 nodeVar336;
vec2 nodeVar337;
vec3 nodeVar338;
vec2 nodeVar339;
vec3 nodeVar340;
vec2 nodeVar341;
vec3 nodeVar342;
vec2 nodeVar343;
vec2 nodeVar344;
vec3 nodeVar345;
vec2 nodeVar346;
vec3 nodeVar347;
vec2 nodeVar348;
vec3 nodeVar349;
vec2 nodeVar350;
vec3 nodeVar351;
vec2 nodeVar352;
vec2 nodeVar353;
vec3 nodeVar354;
vec2 nodeVar355;
vec3 nodeVar356;
vec2 nodeVar357;
vec3 nodeVar358;
vec2 nodeVar359;
vec3 nodeVar360;
float nodeVar361;
vec2 nodeVar362;
float nodeVar363;
float nodeVar364;
vec2 nodeVar365;
vec2 nodeVar366;
vec3 nodeVar367;
vec2 nodeVar368;
vec3 nodeVar369;
vec2 nodeVar370;
vec3 nodeVar371;
vec2 nodeVar372;
vec3 nodeVar373;
vec2 nodeVar374;
vec2 nodeVar375;
vec3 nodeVar376;
vec2 nodeVar377;
vec3 nodeVar378;
vec2 nodeVar379;
vec3 nodeVar380;
vec2 nodeVar381;
vec3 nodeVar382;
vec2 nodeVar383;
vec2 nodeVar384;
vec3 nodeVar385;
vec2 nodeVar386;
vec3 nodeVar387;
vec2 nodeVar388;
vec3 nodeVar389;
vec2 nodeVar390;
vec3 nodeVar391;
vec2 nodeVar392;
vec2 nodeVar393;
vec3 nodeVar394;
vec2 nodeVar395;
vec3 nodeVar396;
vec2 nodeVar397;
vec3 nodeVar398;
vec2 nodeVar399;
vec3 nodeVar400;
vec2 nodeVar401;
float nodeVar402;
float nodeVar403;
vec2 nodeVar404;
vec2 nodeVar405;
vec3 nodeVar406;
vec2 nodeVar407;
vec3 nodeVar408;
vec2 nodeVar409;
vec3 nodeVar410;
vec2 nodeVar411;
vec3 nodeVar412;
vec2 nodeVar413;
vec2 nodeVar414;
vec3 nodeVar415;
vec2 nodeVar416;
vec3 nodeVar417;
vec2 nodeVar418;
vec3 nodeVar419;
vec2 nodeVar420;
vec3 nodeVar421;
vec2 nodeVar422;
vec2 nodeVar423;
vec3 nodeVar424;
vec2 nodeVar425;
vec3 nodeVar426;
vec2 nodeVar427;
vec3 nodeVar428;
vec2 nodeVar429;
vec3 nodeVar430;
vec2 nodeVar431;
vec2 nodeVar432;
vec3 nodeVar433;
vec2 nodeVar434;
vec3 nodeVar435;
vec2 nodeVar436;
vec3 nodeVar437;
vec2 nodeVar438;
vec3 nodeVar439;
float nodeVar440;
vec2 nodeVar441;
float nodeVar442;
float nodeVar443;
vec2 nodeVar444;
vec2 nodeVar445;
vec3 nodeVar446;
vec2 nodeVar447;
vec3 nodeVar448;
vec2 nodeVar449;
vec3 nodeVar450;
vec2 nodeVar451;
vec3 nodeVar452;
vec2 nodeVar453;
vec2 nodeVar454;
vec3 nodeVar455;
vec2 nodeVar456;
vec3 nodeVar457;
vec2 nodeVar458;
vec3 nodeVar459;
vec2 nodeVar460;
vec3 nodeVar461;
vec2 nodeVar462;
vec2 nodeVar463;
vec3 nodeVar464;
vec2 nodeVar465;
vec3 nodeVar466;
vec2 nodeVar467;
vec3 nodeVar468;
vec2 nodeVar469;
vec3 nodeVar470;
vec2 nodeVar471;
vec2 nodeVar472;
vec3 nodeVar473;
vec2 nodeVar474;
vec3 nodeVar475;
vec2 nodeVar476;
vec3 nodeVar477;
vec2 nodeVar478;
vec3 nodeVar479;
float nodeVar480;
vec2 nodeVar481;
float nodeVar482;
float nodeVar483;
vec2 nodeVar484;
vec2 nodeVar485;
vec3 nodeVar486;
vec2 nodeVar487;
vec3 nodeVar488;
vec2 nodeVar489;
vec3 nodeVar490;
vec2 nodeVar491;
vec3 nodeVar492;
vec2 nodeVar493;
vec2 nodeVar494;
vec3 nodeVar495;
vec2 nodeVar496;
vec3 nodeVar497;
vec2 nodeVar498;
vec3 nodeVar499;
vec2 nodeVar500;
vec3 nodeVar501;
vec2 nodeVar502;
vec2 nodeVar503;
vec3 nodeVar504;
vec2 nodeVar505;
vec3 nodeVar506;
vec2 nodeVar507;
vec3 nodeVar508;
vec2 nodeVar509;
vec3 nodeVar510;
vec2 nodeVar511;
float nodeVar512;
float nodeVar513;
vec2 nodeVar514;
vec2 nodeVar515;
vec3 nodeVar516;
vec2 nodeVar517;
vec3 nodeVar518;
vec2 nodeVar519;
vec3 nodeVar520;
vec2 nodeVar521;
vec3 nodeVar522;
vec2 nodeVar523;
vec2 nodeVar524;
vec3 nodeVar525;
vec2 nodeVar526;
vec3 nodeVar527;
vec2 nodeVar528;
vec3 nodeVar529;
vec2 nodeVar530;
vec3 nodeVar531;
vec2 nodeVar532;
vec2 nodeVar533;
vec3 nodeVar534;
vec2 nodeVar535;
vec3 nodeVar536;
vec2 nodeVar537;
vec3 nodeVar538;
vec2 nodeVar539;
vec3 nodeVar540;
vec2 nodeVar541;
vec2 nodeVar542;
vec2 nodeVar543;
vec2 nodeVar544;
float nodeVar545;
float nodeVar546;
vec2 nodeVar547;
vec2 nodeVar548;
vec3 nodeVar549;
vec2 nodeVar550;
vec3 nodeVar551;
float nodeVar552;
vec2 nodeVar553;
vec3 nodeVar554;
vec2 nodeVar555;
vec3 nodeVar556;
float nodeVar557;
vec2 nodeVar558;
vec3 nodeVar559;
vec2 nodeVar560;
vec3 nodeVar561;
float nodeVar562;
vec2 nodeVar563;
vec3 nodeVar564;
vec2 nodeVar565;
vec3 nodeVar566;
float nodeVar567;
vec2 nodeVar568;
vec3 nodeVar569;
vec2 nodeVar570;
vec3 nodeVar571;
float nodeVar572;
vec2 nodeVar573;
vec3 nodeVar574;
vec2 nodeVar575;
vec3 nodeVar576;
float nodeVar577;
vec2 nodeVar578;
vec3 nodeVar579;
vec2 nodeVar580;
vec3 nodeVar581;
float nodeVar582;
vec2 nodeVar583;
vec3 nodeVar584;
vec2 nodeVar585;
vec3 nodeVar586;
float nodeVar587;
vec2 nodeVar588;
vec3 nodeVar589;
vec2 nodeVar590;
vec3 nodeVar591;
float nodeVar592;
float nodeVar593;
vec2 nodeVar594;
vec3 nodeVar595;
float nodeVar596;
vec2 nodeVar597;
float nodeVar598;
float nodeVar599;
vec2 nodeVar600;
vec2 nodeVar601;
vec3 nodeVar602;
vec2 nodeVar603;
vec3 nodeVar604;
vec2 nodeVar605;
vec3 nodeVar606;
vec2 nodeVar607;
vec3 nodeVar608;
vec2 nodeVar609;
vec2 nodeVar610;
vec3 nodeVar611;
vec2 nodeVar612;
vec3 nodeVar613;
vec2 nodeVar614;
vec3 nodeVar615;
vec2 nodeVar616;
vec3 nodeVar617;
vec2 nodeVar618;
vec2 nodeVar619;
vec3 nodeVar620;
vec2 nodeVar621;
vec3 nodeVar622;
vec2 nodeVar623;
vec3 nodeVar624;
vec2 nodeVar625;
vec3 nodeVar626;
vec2 nodeVar627;
vec2 nodeVar628;
vec3 nodeVar629;
vec2 nodeVar630;
vec3 nodeVar631;
vec2 nodeVar632;
vec3 nodeVar633;
vec2 nodeVar634;
vec3 nodeVar635;
vec2 nodeVar636;
float nodeVar637;
float nodeVar638;
vec2 nodeVar639;
vec2 nodeVar640;
vec3 nodeVar641;
vec2 nodeVar642;
vec3 nodeVar643;
vec2 nodeVar644;
vec3 nodeVar645;
vec2 nodeVar646;
vec3 nodeVar647;
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
float nodeVar676;
float nodeVar677;
vec2 nodeVar678;
vec2 nodeVar679;
vec3 nodeVar680;
vec2 nodeVar681;
vec3 nodeVar682;
vec2 nodeVar683;
vec3 nodeVar684;
vec2 nodeVar685;
vec3 nodeVar686;
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
float nodeVar714;
vec2 nodeVar715;
float nodeVar716;
float nodeVar717;
vec2 nodeVar718;
vec2 nodeVar719;
vec3 nodeVar720;
vec2 nodeVar721;
vec3 nodeVar722;
vec2 nodeVar723;
vec3 nodeVar724;
vec2 nodeVar725;
vec3 nodeVar726;
vec2 nodeVar727;
vec2 nodeVar728;
vec3 nodeVar729;
vec2 nodeVar730;
vec3 nodeVar731;
vec2 nodeVar732;
vec3 nodeVar733;
vec2 nodeVar734;
vec3 nodeVar735;
vec2 nodeVar736;
vec2 nodeVar737;
vec3 nodeVar738;
vec2 nodeVar739;
vec3 nodeVar740;
vec2 nodeVar741;
vec3 nodeVar742;
vec2 nodeVar743;
vec3 nodeVar744;
vec2 nodeVar745;
vec2 nodeVar746;
vec3 nodeVar747;
vec2 nodeVar748;
vec3 nodeVar749;
vec2 nodeVar750;
vec3 nodeVar751;
vec2 nodeVar752;
vec3 nodeVar753;
vec2 nodeVar754;
float nodeVar755;
float nodeVar756;
vec2 nodeVar757;
vec2 nodeVar758;
vec3 nodeVar759;
vec2 nodeVar760;
vec3 nodeVar761;
vec2 nodeVar762;
vec3 nodeVar763;
vec2 nodeVar764;
vec3 nodeVar765;
vec2 nodeVar766;
vec2 nodeVar767;
vec3 nodeVar768;
vec2 nodeVar769;
vec3 nodeVar770;
vec2 nodeVar771;
vec3 nodeVar772;
vec2 nodeVar773;
vec3 nodeVar774;
vec2 nodeVar775;
vec2 nodeVar776;
vec3 nodeVar777;
vec2 nodeVar778;
vec3 nodeVar779;
vec2 nodeVar780;
vec3 nodeVar781;
vec2 nodeVar782;
vec3 nodeVar783;
vec2 nodeVar784;
vec2 nodeVar785;
vec3 nodeVar786;
vec2 nodeVar787;
vec3 nodeVar788;
vec2 nodeVar789;
vec3 nodeVar790;
vec2 nodeVar791;
vec3 nodeVar792;
float nodeVar793;
vec2 nodeVar794;
float nodeVar795;
float nodeVar796;
vec2 nodeVar797;
vec2 nodeVar798;
vec3 nodeVar799;
vec2 nodeVar800;
vec3 nodeVar801;
vec2 nodeVar802;
vec3 nodeVar803;
vec2 nodeVar804;
vec3 nodeVar805;
vec2 nodeVar806;
vec2 nodeVar807;
vec3 nodeVar808;
vec2 nodeVar809;
vec3 nodeVar810;
vec2 nodeVar811;
vec3 nodeVar812;
vec2 nodeVar813;
vec3 nodeVar814;
vec2 nodeVar815;
vec2 nodeVar816;
vec3 nodeVar817;
vec2 nodeVar818;
vec3 nodeVar819;
vec2 nodeVar820;
vec3 nodeVar821;
vec2 nodeVar822;
vec3 nodeVar823;
vec2 nodeVar824;
vec2 nodeVar825;
vec3 nodeVar826;
vec2 nodeVar827;
vec3 nodeVar828;
vec2 nodeVar829;
vec3 nodeVar830;
vec2 nodeVar831;
vec3 nodeVar832;
vec2 nodeVar833;
float nodeVar834;
float nodeVar835;
vec2 nodeVar836;
vec2 nodeVar837;
vec3 nodeVar838;
vec2 nodeVar839;
vec3 nodeVar840;
vec2 nodeVar841;
vec3 nodeVar842;
vec2 nodeVar843;
vec3 nodeVar844;
vec2 nodeVar845;
vec2 nodeVar846;
vec3 nodeVar847;
vec2 nodeVar848;
vec3 nodeVar849;
vec2 nodeVar850;
vec3 nodeVar851;
vec2 nodeVar852;
vec3 nodeVar853;
vec2 nodeVar854;
vec2 nodeVar855;
vec3 nodeVar856;
vec2 nodeVar857;
vec3 nodeVar858;
vec2 nodeVar859;
vec3 nodeVar860;
vec2 nodeVar861;
vec3 nodeVar862;
vec2 nodeVar863;
vec2 nodeVar864;
vec3 nodeVar865;
vec2 nodeVar866;
vec3 nodeVar867;
vec2 nodeVar868;
vec3 nodeVar869;
vec2 nodeVar870;
vec3 nodeVar871;
float nodeVar872;
vec2 nodeVar873;
float nodeVar874;
float nodeVar875;
vec2 nodeVar876;
vec2 nodeVar877;
vec3 nodeVar878;
vec2 nodeVar879;
vec3 nodeVar880;
vec2 nodeVar881;
vec3 nodeVar882;
vec2 nodeVar883;
vec3 nodeVar884;
vec2 nodeVar885;
vec2 nodeVar886;
vec3 nodeVar887;
vec2 nodeVar888;
vec3 nodeVar889;
vec2 nodeVar890;
vec3 nodeVar891;
vec2 nodeVar892;
vec3 nodeVar893;
vec2 nodeVar894;
vec2 nodeVar895;
vec3 nodeVar896;
vec2 nodeVar897;
vec3 nodeVar898;
vec2 nodeVar899;
vec3 nodeVar900;
vec2 nodeVar901;
vec3 nodeVar902;
vec2 nodeVar903;
vec2 nodeVar904;
vec3 nodeVar905;
vec2 nodeVar906;
vec3 nodeVar907;
vec2 nodeVar908;
vec3 nodeVar909;
vec2 nodeVar910;
vec3 nodeVar911;
float nodeVar912;
vec3 NORMAL_nodeVar913;
vec2 nodeVar914;
float nodeVar915;
vec3 nodeVar916;
float nodeVar917;
float nodeVar918;
float nodeVar919;
float nodeVar920;
float nodeVar921;
float nodeVar922;
float nodeVar923;
float nodeVar924;
float nodeVar925;
vec2 nodeVar926;
vec3 nodeVar927;
float nodeVar928;
vec2 nodeVar929;
float nodeVar930;
float nodeVar931;
vec2 nodeVar932;
vec2 nodeVar933;
vec3 nodeVar934;
vec2 nodeVar935;
vec3 nodeVar936;
vec2 nodeVar937;
vec3 nodeVar938;
vec2 nodeVar939;
vec3 nodeVar940;
vec2 nodeVar941;
vec2 nodeVar942;
vec3 nodeVar943;
vec2 nodeVar944;
vec3 nodeVar945;
vec2 nodeVar946;
vec3 nodeVar947;
vec2 nodeVar948;
vec3 nodeVar949;
vec2 nodeVar950;
vec2 nodeVar951;
vec3 nodeVar952;
vec2 nodeVar953;
vec3 nodeVar954;
vec2 nodeVar955;
vec3 nodeVar956;
vec2 nodeVar957;
vec3 nodeVar958;
vec2 nodeVar959;
vec2 nodeVar960;
vec3 nodeVar961;
vec2 nodeVar962;
vec3 nodeVar963;
vec2 nodeVar964;
vec3 nodeVar965;
vec2 nodeVar966;
vec3 nodeVar967;
vec2 nodeVar968;
float nodeVar969;
float nodeVar970;
vec2 nodeVar971;
vec2 nodeVar972;
vec3 nodeVar973;
vec2 nodeVar974;
vec3 nodeVar975;
vec2 nodeVar976;
vec3 nodeVar977;
vec2 nodeVar978;
vec3 nodeVar979;
vec2 nodeVar980;
vec2 nodeVar981;
vec3 nodeVar982;
vec2 nodeVar983;
vec3 nodeVar984;
vec2 nodeVar985;
vec3 nodeVar986;
vec2 nodeVar987;
vec3 nodeVar988;
vec2 nodeVar989;
vec2 nodeVar990;
vec3 nodeVar991;
vec2 nodeVar992;
vec3 nodeVar993;
vec2 nodeVar994;
vec3 nodeVar995;
vec2 nodeVar996;
vec3 nodeVar997;
vec2 nodeVar998;
vec2 nodeVar999;
vec3 nodeVar1000;
vec2 nodeVar1001;
vec3 nodeVar1002;
vec2 nodeVar1003;
vec3 nodeVar1004;
vec2 nodeVar1005;
vec3 nodeVar1006;
vec2 nodeVar1007;
float nodeVar1008;
float nodeVar1009;
vec2 nodeVar1010;
vec2 nodeVar1011;
vec3 nodeVar1012;
vec2 nodeVar1013;
vec3 nodeVar1014;
vec2 nodeVar1015;
vec3 nodeVar1016;
vec2 nodeVar1017;
vec3 nodeVar1018;
vec2 nodeVar1019;
vec2 nodeVar1020;
vec3 nodeVar1021;
vec2 nodeVar1022;
vec3 nodeVar1023;
vec2 nodeVar1024;
vec3 nodeVar1025;
vec2 nodeVar1026;
vec3 nodeVar1027;
vec2 nodeVar1028;
vec2 nodeVar1029;
vec3 nodeVar1030;
vec2 nodeVar1031;
vec3 nodeVar1032;
vec2 nodeVar1033;
vec3 nodeVar1034;
vec2 nodeVar1035;
vec3 nodeVar1036;
vec2 nodeVar1037;
vec2 nodeVar1038;
vec3 nodeVar1039;
vec2 nodeVar1040;
vec3 nodeVar1041;
vec2 nodeVar1042;
vec3 nodeVar1043;
vec2 nodeVar1044;
vec3 nodeVar1045;
vec2 nodeVar1046;
float nodeVar1047;
float nodeVar1048;
vec2 nodeVar1049;
vec2 nodeVar1050;
vec3 nodeVar1051;
vec2 nodeVar1052;
vec3 nodeVar1053;
vec2 nodeVar1054;
vec3 nodeVar1055;
vec2 nodeVar1056;
vec3 nodeVar1057;
vec2 nodeVar1058;
vec2 nodeVar1059;
vec3 nodeVar1060;
vec2 nodeVar1061;
vec3 nodeVar1062;
vec2 nodeVar1063;
vec3 nodeVar1064;
vec2 nodeVar1065;
vec3 nodeVar1066;
vec2 nodeVar1067;
vec2 nodeVar1068;
vec3 nodeVar1069;
vec2 nodeVar1070;
vec3 nodeVar1071;
vec2 nodeVar1072;
vec3 nodeVar1073;
vec2 nodeVar1074;
vec3 nodeVar1075;
vec2 nodeVar1076;
vec2 nodeVar1077;
vec3 nodeVar1078;
vec2 nodeVar1079;
vec3 nodeVar1080;
vec2 nodeVar1081;
vec3 nodeVar1082;
vec2 nodeVar1083;
vec3 nodeVar1084;
float nodeVar1085;
float nodeVar1086;
float nodeVar1087;
float nodeVar1088;
float nodeVar1089;
float nodeVar1090;
float nodeVar1091;
vec2 nodeVar1092;
vec3 nodeVar1093;
float nodeVar1094;
vec2 nodeVar1095;
float nodeVar1096;
float nodeVar1097;
vec2 nodeVar1098;
vec2 nodeVar1099;
vec3 nodeVar1100;
vec2 nodeVar1101;
vec3 nodeVar1102;
vec2 nodeVar1103;
vec3 nodeVar1104;
vec2 nodeVar1105;
vec3 nodeVar1106;
vec2 nodeVar1107;
vec2 nodeVar1108;
vec3 nodeVar1109;
vec2 nodeVar1110;
vec3 nodeVar1111;
vec2 nodeVar1112;
vec3 nodeVar1113;
vec2 nodeVar1114;
vec3 nodeVar1115;
vec2 nodeVar1116;
vec2 nodeVar1117;
vec3 nodeVar1118;
vec2 nodeVar1119;
vec3 nodeVar1120;
vec2 nodeVar1121;
vec3 nodeVar1122;
vec2 nodeVar1123;
vec3 nodeVar1124;
vec2 nodeVar1125;
vec2 nodeVar1126;
vec3 nodeVar1127;
vec2 nodeVar1128;
vec3 nodeVar1129;
vec2 nodeVar1130;
vec3 nodeVar1131;
vec2 nodeVar1132;
vec3 nodeVar1133;
float nodeVar1134;
float nodeVar1135;
float nodeVar1136;
vec2 nodeVar1137;
float nodeVar1138;
float nodeVar1139;
vec2 nodeVar1140;
vec2 nodeVar1141;
vec3 nodeVar1142;
vec2 nodeVar1143;
vec3 nodeVar1144;
vec2 nodeVar1145;
vec3 nodeVar1146;
vec2 nodeVar1147;
vec3 nodeVar1148;
vec2 nodeVar1149;
vec2 nodeVar1150;
vec3 nodeVar1151;
vec2 nodeVar1152;
vec3 nodeVar1153;
vec2 nodeVar1154;
vec3 nodeVar1155;
vec2 nodeVar1156;
vec3 nodeVar1157;
vec2 nodeVar1158;
vec2 nodeVar1159;
vec3 nodeVar1160;
vec2 nodeVar1161;
vec3 nodeVar1162;
vec2 nodeVar1163;
vec3 nodeVar1164;
vec2 nodeVar1165;
vec3 nodeVar1166;
vec2 nodeVar1167;
vec2 nodeVar1168;
vec3 nodeVar1169;
vec2 nodeVar1170;
vec3 nodeVar1171;
vec2 nodeVar1172;
vec3 nodeVar1173;
vec2 nodeVar1174;
vec3 nodeVar1175;
float nodeVar1176;
float nodeVar1177;
float nodeVar1178;
float nodeVar1179;
float nodeVar1180;
float nodeVar1181;
float nodeVar1182;
float nodeVar1183;
float nodeVar1184;
vec2 nodeVar1185;
float nodeVar1186;
float nodeVar1187;
vec2 nodeVar1188;
vec2 nodeVar1189;
vec3 nodeVar1190;
vec2 nodeVar1191;
vec3 nodeVar1192;
vec2 nodeVar1193;
vec3 nodeVar1194;
vec2 nodeVar1195;
vec3 nodeVar1196;
vec2 nodeVar1197;
vec2 nodeVar1198;
vec3 nodeVar1199;
vec2 nodeVar1200;
vec3 nodeVar1201;
vec2 nodeVar1202;
vec3 nodeVar1203;
vec2 nodeVar1204;
vec3 nodeVar1205;
vec2 nodeVar1206;
vec2 nodeVar1207;
vec3 nodeVar1208;
vec2 nodeVar1209;
vec3 nodeVar1210;
vec2 nodeVar1211;
vec3 nodeVar1212;
vec2 nodeVar1213;
vec3 nodeVar1214;
vec2 nodeVar1215;
vec2 nodeVar1216;
vec3 nodeVar1217;
vec2 nodeVar1218;
vec3 nodeVar1219;
vec2 nodeVar1220;
vec3 nodeVar1221;
vec2 nodeVar1222;
vec3 nodeVar1223;
float nodeVar1224;
vec2 nodeVar1225;
vec3 nodeVar1226;
float nodeVar1227;
vec2 nodeVar1228;
float nodeVar1229;
float nodeVar1230;
vec2 nodeVar1231;
vec2 nodeVar1232;
vec3 nodeVar1233;
vec2 nodeVar1234;
vec3 nodeVar1235;
vec2 nodeVar1236;
vec3 nodeVar1237;
vec2 nodeVar1238;
vec3 nodeVar1239;
vec2 nodeVar1240;
vec2 nodeVar1241;
vec3 nodeVar1242;
vec2 nodeVar1243;
vec3 nodeVar1244;
vec2 nodeVar1245;
vec3 nodeVar1246;
vec2 nodeVar1247;
vec3 nodeVar1248;
vec2 nodeVar1249;
vec2 nodeVar1250;
vec3 nodeVar1251;
vec2 nodeVar1252;
vec3 nodeVar1253;
vec2 nodeVar1254;
vec3 nodeVar1255;
vec2 nodeVar1256;
vec3 nodeVar1257;
vec2 nodeVar1258;
vec2 nodeVar1259;
vec3 nodeVar1260;
vec2 nodeVar1261;
vec3 nodeVar1262;
vec2 nodeVar1263;
vec3 nodeVar1264;
vec2 nodeVar1265;
vec3 nodeVar1266;
float nodeVar1267;
vec2 nodeVar1268;
float nodeVar1269;
float nodeVar1270;
vec2 nodeVar1271;
vec2 nodeVar1272;
vec3 nodeVar1273;
vec2 nodeVar1274;
vec3 nodeVar1275;
vec2 nodeVar1276;
vec3 nodeVar1277;
vec2 nodeVar1278;
vec3 nodeVar1279;
vec2 nodeVar1280;
vec2 nodeVar1281;
vec3 nodeVar1282;
vec2 nodeVar1283;
vec3 nodeVar1284;
vec2 nodeVar1285;
vec3 nodeVar1286;
vec2 nodeVar1287;
vec3 nodeVar1288;
vec2 nodeVar1289;
vec2 nodeVar1290;
vec3 nodeVar1291;
vec2 nodeVar1292;
vec3 nodeVar1293;
vec2 nodeVar1294;
vec3 nodeVar1295;
vec2 nodeVar1296;
vec3 nodeVar1297;
vec2 nodeVar1298;
vec2 nodeVar1299;
vec3 nodeVar1300;
vec2 nodeVar1301;
vec3 nodeVar1302;
vec2 nodeVar1303;
vec3 nodeVar1304;
vec2 nodeVar1305;
vec3 nodeVar1306;
vec2 nodeVar1307;
float nodeVar1308;
float nodeVar1309;
vec2 nodeVar1310;
vec2 nodeVar1311;
vec3 nodeVar1312;
vec2 nodeVar1313;
vec3 nodeVar1314;
vec2 nodeVar1315;
vec3 nodeVar1316;
vec2 nodeVar1317;
vec3 nodeVar1318;
vec2 nodeVar1319;
vec2 nodeVar1320;
vec3 nodeVar1321;
vec2 nodeVar1322;
vec3 nodeVar1323;
vec2 nodeVar1324;
vec3 nodeVar1325;
vec2 nodeVar1326;
vec3 nodeVar1327;
vec2 nodeVar1328;
vec2 nodeVar1329;
vec3 nodeVar1330;
vec2 nodeVar1331;
vec3 nodeVar1332;
vec2 nodeVar1333;
vec3 nodeVar1334;
vec2 nodeVar1335;
vec3 nodeVar1336;
vec2 nodeVar1337;
vec2 nodeVar1338;
vec3 nodeVar1339;
vec2 nodeVar1340;
vec3 nodeVar1341;
vec2 nodeVar1342;
vec3 nodeVar1343;
vec2 nodeVar1344;
vec3 nodeVar1345;
float nodeVar1346;
vec2 nodeVar1347;
float nodeVar1348;
float nodeVar1349;
vec2 nodeVar1350;
vec2 nodeVar1351;
vec3 nodeVar1352;
vec2 nodeVar1353;
vec3 nodeVar1354;
vec2 nodeVar1355;
vec3 nodeVar1356;
vec2 nodeVar1357;
vec3 nodeVar1358;
vec2 nodeVar1359;
vec2 nodeVar1360;
vec3 nodeVar1361;
vec2 nodeVar1362;
vec3 nodeVar1363;
vec2 nodeVar1364;
vec3 nodeVar1365;
vec2 nodeVar1366;
vec3 nodeVar1367;
vec2 nodeVar1368;
vec2 nodeVar1369;
vec3 nodeVar1370;
vec2 nodeVar1371;
vec3 nodeVar1372;
vec2 nodeVar1373;
vec3 nodeVar1374;
vec2 nodeVar1375;
vec3 nodeVar1376;
vec2 nodeVar1377;
vec2 nodeVar1378;
vec3 nodeVar1379;
vec2 nodeVar1380;
vec3 nodeVar1381;
vec2 nodeVar1382;
vec3 nodeVar1383;
vec2 nodeVar1384;
vec3 nodeVar1385;
float nodeVar1386;
vec2 nodeVar1387;
float nodeVar1388;
float nodeVar1389;
vec2 nodeVar1390;
vec2 nodeVar1391;
vec3 nodeVar1392;
vec2 nodeVar1393;
vec3 nodeVar1394;
vec2 nodeVar1395;
vec3 nodeVar1396;
vec2 nodeVar1397;
vec3 nodeVar1398;
vec2 nodeVar1399;
vec2 nodeVar1400;
vec3 nodeVar1401;
vec2 nodeVar1402;
vec3 nodeVar1403;
vec2 nodeVar1404;
vec3 nodeVar1405;
vec2 nodeVar1406;
vec3 nodeVar1407;
vec2 nodeVar1408;
vec2 nodeVar1409;
vec3 nodeVar1410;
vec2 nodeVar1411;
vec3 nodeVar1412;
vec2 nodeVar1413;
vec3 nodeVar1414;
vec2 nodeVar1415;
vec3 nodeVar1416;
vec2 nodeVar1417;
float nodeVar1418;
float nodeVar1419;
vec2 nodeVar1420;
vec2 nodeVar1421;
vec3 nodeVar1422;
vec2 nodeVar1423;
vec3 nodeVar1424;
vec2 nodeVar1425;
vec3 nodeVar1426;
vec2 nodeVar1427;
vec3 nodeVar1428;
vec2 nodeVar1429;
vec2 nodeVar1430;
vec3 nodeVar1431;
vec2 nodeVar1432;
vec3 nodeVar1433;
vec2 nodeVar1434;
vec3 nodeVar1435;
vec2 nodeVar1436;
vec3 nodeVar1437;
vec2 nodeVar1438;
vec2 nodeVar1439;
vec3 nodeVar1440;
vec2 nodeVar1441;
vec3 nodeVar1442;
vec2 nodeVar1443;
vec3 nodeVar1444;
vec2 nodeVar1445;
vec3 nodeVar1446;
vec2 nodeVar1447;
vec2 nodeVar1448;
vec2 nodeVar1449;
vec2 nodeVar1450;
float nodeVar1451;
float nodeVar1452;
vec2 nodeVar1453;
vec2 nodeVar1454;
vec3 nodeVar1455;
vec2 nodeVar1456;
vec3 nodeVar1457;
float nodeVar1458;
vec2 nodeVar1459;
vec3 nodeVar1460;
vec2 nodeVar1461;
vec3 nodeVar1462;
float nodeVar1463;
vec2 nodeVar1464;
vec3 nodeVar1465;
vec2 nodeVar1466;
vec3 nodeVar1467;
float nodeVar1468;
vec2 nodeVar1469;
vec3 nodeVar1470;
vec2 nodeVar1471;
vec3 nodeVar1472;
float nodeVar1473;
vec2 nodeVar1474;
vec3 nodeVar1475;
vec2 nodeVar1476;
vec3 nodeVar1477;
float nodeVar1478;
vec2 nodeVar1479;
vec3 nodeVar1480;
vec2 nodeVar1481;
vec3 nodeVar1482;
float nodeVar1483;
vec2 nodeVar1484;
vec3 nodeVar1485;
vec2 nodeVar1486;
vec3 nodeVar1487;
float nodeVar1488;
vec2 nodeVar1489;
vec3 nodeVar1490;
vec2 nodeVar1491;
vec3 nodeVar1492;
float nodeVar1493;
vec2 nodeVar1494;
vec3 nodeVar1495;
vec2 nodeVar1496;
vec3 nodeVar1497;
float nodeVar1498;
float nodeVar1499;
vec2 nodeVar1500;
vec3 nodeVar1501;
float nodeVar1502;
vec2 nodeVar1503;
float nodeVar1504;
float nodeVar1505;
vec2 nodeVar1506;
vec2 nodeVar1507;
vec3 nodeVar1508;
vec2 nodeVar1509;
vec3 nodeVar1510;
vec2 nodeVar1511;
vec3 nodeVar1512;
vec2 nodeVar1513;
vec3 nodeVar1514;
vec2 nodeVar1515;
vec2 nodeVar1516;
vec3 nodeVar1517;
vec2 nodeVar1518;
vec3 nodeVar1519;
vec2 nodeVar1520;
vec3 nodeVar1521;
vec2 nodeVar1522;
vec3 nodeVar1523;
vec2 nodeVar1524;
vec2 nodeVar1525;
vec3 nodeVar1526;
vec2 nodeVar1527;
vec3 nodeVar1528;
vec2 nodeVar1529;
vec3 nodeVar1530;
vec2 nodeVar1531;
vec3 nodeVar1532;
vec2 nodeVar1533;
vec2 nodeVar1534;
vec3 nodeVar1535;
vec2 nodeVar1536;
vec3 nodeVar1537;
vec2 nodeVar1538;
vec3 nodeVar1539;
vec2 nodeVar1540;
vec3 nodeVar1541;
vec2 nodeVar1542;
float nodeVar1543;
float nodeVar1544;
vec2 nodeVar1545;
vec2 nodeVar1546;
vec3 nodeVar1547;
vec2 nodeVar1548;
vec3 nodeVar1549;
vec2 nodeVar1550;
vec3 nodeVar1551;
vec2 nodeVar1552;
vec3 nodeVar1553;
vec2 nodeVar1554;
vec2 nodeVar1555;
vec3 nodeVar1556;
vec2 nodeVar1557;
vec3 nodeVar1558;
vec2 nodeVar1559;
vec3 nodeVar1560;
vec2 nodeVar1561;
vec3 nodeVar1562;
vec2 nodeVar1563;
vec2 nodeVar1564;
vec3 nodeVar1565;
vec2 nodeVar1566;
vec3 nodeVar1567;
vec2 nodeVar1568;
vec3 nodeVar1569;
vec2 nodeVar1570;
vec3 nodeVar1571;
vec2 nodeVar1572;
vec2 nodeVar1573;
vec3 nodeVar1574;
vec2 nodeVar1575;
vec3 nodeVar1576;
vec2 nodeVar1577;
vec3 nodeVar1578;
vec2 nodeVar1579;
vec3 nodeVar1580;
vec2 nodeVar1581;
float nodeVar1582;
float nodeVar1583;
vec2 nodeVar1584;
vec2 nodeVar1585;
vec3 nodeVar1586;
vec2 nodeVar1587;
vec3 nodeVar1588;
vec2 nodeVar1589;
vec3 nodeVar1590;
vec2 nodeVar1591;
vec3 nodeVar1592;
vec2 nodeVar1593;
vec2 nodeVar1594;
vec3 nodeVar1595;
vec2 nodeVar1596;
vec3 nodeVar1597;
vec2 nodeVar1598;
vec3 nodeVar1599;
vec2 nodeVar1600;
vec3 nodeVar1601;
vec2 nodeVar1602;
vec2 nodeVar1603;
vec3 nodeVar1604;
vec2 nodeVar1605;
vec3 nodeVar1606;
vec2 nodeVar1607;
vec3 nodeVar1608;
vec2 nodeVar1609;
vec3 nodeVar1610;
vec2 nodeVar1611;
vec2 nodeVar1612;
vec3 nodeVar1613;
vec2 nodeVar1614;
vec3 nodeVar1615;
vec2 nodeVar1616;
vec3 nodeVar1617;
vec2 nodeVar1618;
vec3 nodeVar1619;
float nodeVar1620;
vec2 nodeVar1621;
float nodeVar1622;
float nodeVar1623;
vec2 nodeVar1624;
vec2 nodeVar1625;
vec3 nodeVar1626;
vec2 nodeVar1627;
vec3 nodeVar1628;
vec2 nodeVar1629;
vec3 nodeVar1630;
vec2 nodeVar1631;
vec3 nodeVar1632;
vec2 nodeVar1633;
vec2 nodeVar1634;
vec3 nodeVar1635;
vec2 nodeVar1636;
vec3 nodeVar1637;
vec2 nodeVar1638;
vec3 nodeVar1639;
vec2 nodeVar1640;
vec3 nodeVar1641;
vec2 nodeVar1642;
vec2 nodeVar1643;
vec3 nodeVar1644;
vec2 nodeVar1645;
vec3 nodeVar1646;
vec2 nodeVar1647;
vec3 nodeVar1648;
vec2 nodeVar1649;
vec3 nodeVar1650;
vec2 nodeVar1651;
vec2 nodeVar1652;
vec3 nodeVar1653;
vec2 nodeVar1654;
vec3 nodeVar1655;
vec2 nodeVar1656;
vec3 nodeVar1657;
vec2 nodeVar1658;
vec3 nodeVar1659;
vec2 nodeVar1660;
float nodeVar1661;
float nodeVar1662;
vec2 nodeVar1663;
vec2 nodeVar1664;
vec3 nodeVar1665;
vec2 nodeVar1666;
vec3 nodeVar1667;
vec2 nodeVar1668;
vec3 nodeVar1669;
vec2 nodeVar1670;
vec3 nodeVar1671;
vec2 nodeVar1672;
vec2 nodeVar1673;
vec3 nodeVar1674;
vec2 nodeVar1675;
vec3 nodeVar1676;
vec2 nodeVar1677;
vec3 nodeVar1678;
vec2 nodeVar1679;
vec3 nodeVar1680;
vec2 nodeVar1681;
vec2 nodeVar1682;
vec3 nodeVar1683;
vec2 nodeVar1684;
vec3 nodeVar1685;
vec2 nodeVar1686;
vec3 nodeVar1687;
vec2 nodeVar1688;
vec3 nodeVar1689;
vec2 nodeVar1690;
vec2 nodeVar1691;
vec3 nodeVar1692;
vec2 nodeVar1693;
vec3 nodeVar1694;
vec2 nodeVar1695;
vec3 nodeVar1696;
vec2 nodeVar1697;
vec3 nodeVar1698;
float nodeVar1699;
vec2 nodeVar1700;
float nodeVar1701;
float nodeVar1702;
vec2 nodeVar1703;
vec2 nodeVar1704;
vec3 nodeVar1705;
vec2 nodeVar1706;
vec3 nodeVar1707;
vec2 nodeVar1708;
vec3 nodeVar1709;
vec2 nodeVar1710;
vec3 nodeVar1711;
vec2 nodeVar1712;
vec2 nodeVar1713;
vec3 nodeVar1714;
vec2 nodeVar1715;
vec3 nodeVar1716;
vec2 nodeVar1717;
vec3 nodeVar1718;
vec2 nodeVar1719;
vec3 nodeVar1720;
vec2 nodeVar1721;
vec2 nodeVar1722;
vec3 nodeVar1723;
vec2 nodeVar1724;
vec3 nodeVar1725;
vec2 nodeVar1726;
vec3 nodeVar1727;
vec2 nodeVar1728;
vec3 nodeVar1729;
vec2 nodeVar1730;
vec2 nodeVar1731;
vec3 nodeVar1732;
vec2 nodeVar1733;
vec3 nodeVar1734;
vec2 nodeVar1735;
vec3 nodeVar1736;
vec2 nodeVar1737;
vec3 nodeVar1738;
vec2 nodeVar1739;
float nodeVar1740;
float nodeVar1741;
vec2 nodeVar1742;
vec2 nodeVar1743;
vec3 nodeVar1744;
vec2 nodeVar1745;
vec3 nodeVar1746;
vec2 nodeVar1747;
vec3 nodeVar1748;
vec2 nodeVar1749;
vec3 nodeVar1750;
vec2 nodeVar1751;
vec2 nodeVar1752;
vec3 nodeVar1753;
vec2 nodeVar1754;
vec3 nodeVar1755;
vec2 nodeVar1756;
vec3 nodeVar1757;
vec2 nodeVar1758;
vec3 nodeVar1759;
vec2 nodeVar1760;
vec2 nodeVar1761;
vec3 nodeVar1762;
vec2 nodeVar1763;
vec3 nodeVar1764;
vec2 nodeVar1765;
vec3 nodeVar1766;
vec2 nodeVar1767;
vec3 nodeVar1768;
vec2 nodeVar1769;
vec2 nodeVar1770;
vec3 nodeVar1771;
vec2 nodeVar1772;
vec3 nodeVar1773;
vec2 nodeVar1774;
vec3 nodeVar1775;
vec2 nodeVar1776;
vec3 nodeVar1777;
float nodeVar1778;
vec2 nodeVar1779;
float nodeVar1780;
float nodeVar1781;
vec2 nodeVar1782;
vec2 nodeVar1783;
vec3 nodeVar1784;
vec2 nodeVar1785;
vec3 nodeVar1786;
vec2 nodeVar1787;
vec3 nodeVar1788;
vec2 nodeVar1789;
vec3 nodeVar1790;
vec2 nodeVar1791;
vec2 nodeVar1792;
vec3 nodeVar1793;
vec2 nodeVar1794;
vec3 nodeVar1795;
vec2 nodeVar1796;
vec3 nodeVar1797;
vec2 nodeVar1798;
vec3 nodeVar1799;
vec2 nodeVar1800;
vec2 nodeVar1801;
vec3 nodeVar1802;
vec2 nodeVar1803;
vec3 nodeVar1804;
vec2 nodeVar1805;
vec3 nodeVar1806;
vec2 nodeVar1807;
vec3 nodeVar1808;
vec2 nodeVar1809;
vec2 nodeVar1810;
vec3 nodeVar1811;
vec2 nodeVar1812;
vec3 nodeVar1813;
vec2 nodeVar1814;
vec3 nodeVar1815;
vec2 nodeVar1816;
vec3 nodeVar1817;
float nodeVar1818;
vec3 nodeVar1819;
vec2 nodeVar1820;
float nodeVar1821;
vec3 nodeVar1822;
float nodeVar1823;
float nodeVar1824;
float nodeVar1825;
float nodeVar1826;
float nodeVar1827;
float nodeVar1828;
float nodeVar1829;
float nodeVar1830;
float nodeVar1831;
vec2 nodeVar1832;
vec3 nodeVar1833;
float nodeVar1834;
vec2 nodeVar1835;
float nodeVar1836;
float nodeVar1837;
vec2 nodeVar1838;
vec2 nodeVar1839;
vec3 nodeVar1840;
vec2 nodeVar1841;
vec3 nodeVar1842;
vec2 nodeVar1843;
vec3 nodeVar1844;
vec2 nodeVar1845;
vec3 nodeVar1846;
vec2 nodeVar1847;
vec2 nodeVar1848;
vec3 nodeVar1849;
vec2 nodeVar1850;
vec3 nodeVar1851;
vec2 nodeVar1852;
vec3 nodeVar1853;
vec2 nodeVar1854;
vec3 nodeVar1855;
vec2 nodeVar1856;
vec2 nodeVar1857;
vec3 nodeVar1858;
vec2 nodeVar1859;
vec3 nodeVar1860;
vec2 nodeVar1861;
vec3 nodeVar1862;
vec2 nodeVar1863;
vec3 nodeVar1864;
vec2 nodeVar1865;
vec2 nodeVar1866;
vec3 nodeVar1867;
vec2 nodeVar1868;
vec3 nodeVar1869;
vec2 nodeVar1870;
vec3 nodeVar1871;
vec2 nodeVar1872;
vec3 nodeVar1873;
vec2 nodeVar1874;
float nodeVar1875;
float nodeVar1876;
vec2 nodeVar1877;
vec2 nodeVar1878;
vec3 nodeVar1879;
vec2 nodeVar1880;
vec3 nodeVar1881;
vec2 nodeVar1882;
vec3 nodeVar1883;
vec2 nodeVar1884;
vec3 nodeVar1885;
vec2 nodeVar1886;
vec2 nodeVar1887;
vec3 nodeVar1888;
vec2 nodeVar1889;
vec3 nodeVar1890;
vec2 nodeVar1891;
vec3 nodeVar1892;
vec2 nodeVar1893;
vec3 nodeVar1894;
vec2 nodeVar1895;
vec2 nodeVar1896;
vec3 nodeVar1897;
vec2 nodeVar1898;
vec3 nodeVar1899;
vec2 nodeVar1900;
vec3 nodeVar1901;
vec2 nodeVar1902;
vec3 nodeVar1903;
vec2 nodeVar1904;
vec2 nodeVar1905;
vec3 nodeVar1906;
vec2 nodeVar1907;
vec3 nodeVar1908;
vec2 nodeVar1909;
vec3 nodeVar1910;
vec2 nodeVar1911;
vec3 nodeVar1912;
vec2 nodeVar1913;
float nodeVar1914;
float nodeVar1915;
vec2 nodeVar1916;
vec2 nodeVar1917;
vec3 nodeVar1918;
vec2 nodeVar1919;
vec3 nodeVar1920;
vec2 nodeVar1921;
vec3 nodeVar1922;
vec2 nodeVar1923;
vec3 nodeVar1924;
vec2 nodeVar1925;
vec2 nodeVar1926;
vec3 nodeVar1927;
vec2 nodeVar1928;
vec3 nodeVar1929;
vec2 nodeVar1930;
vec3 nodeVar1931;
vec2 nodeVar1932;
vec3 nodeVar1933;
vec2 nodeVar1934;
vec2 nodeVar1935;
vec3 nodeVar1936;
vec2 nodeVar1937;
vec3 nodeVar1938;
vec2 nodeVar1939;
vec3 nodeVar1940;
vec2 nodeVar1941;
vec3 nodeVar1942;
vec2 nodeVar1943;
vec2 nodeVar1944;
vec3 nodeVar1945;
vec2 nodeVar1946;
vec3 nodeVar1947;
vec2 nodeVar1948;
vec3 nodeVar1949;
vec2 nodeVar1950;
vec3 nodeVar1951;
vec2 nodeVar1952;
float nodeVar1953;
float nodeVar1954;
vec2 nodeVar1955;
vec2 nodeVar1956;
vec3 nodeVar1957;
vec2 nodeVar1958;
vec3 nodeVar1959;
vec2 nodeVar1960;
vec3 nodeVar1961;
vec2 nodeVar1962;
vec3 nodeVar1963;
vec2 nodeVar1964;
vec2 nodeVar1965;
vec3 nodeVar1966;
vec2 nodeVar1967;
vec3 nodeVar1968;
vec2 nodeVar1969;
vec3 nodeVar1970;
vec2 nodeVar1971;
vec3 nodeVar1972;
vec2 nodeVar1973;
vec2 nodeVar1974;
vec3 nodeVar1975;
vec2 nodeVar1976;
vec3 nodeVar1977;
vec2 nodeVar1978;
vec3 nodeVar1979;
vec2 nodeVar1980;
vec3 nodeVar1981;
vec2 nodeVar1982;
vec2 nodeVar1983;
vec3 nodeVar1984;
vec2 nodeVar1985;
vec3 nodeVar1986;
vec2 nodeVar1987;
vec3 nodeVar1988;
vec2 nodeVar1989;
vec3 nodeVar1990;
float nodeVar1991;
float nodeVar1992;
float nodeVar1993;
float nodeVar1994;
float nodeVar1995;
float nodeVar1996;
float nodeVar1997;
vec2 nodeVar1998;
vec3 nodeVar1999;
float nodeVar2000;
vec2 nodeVar2001;
float nodeVar2002;
float nodeVar2003;
vec2 nodeVar2004;
vec2 nodeVar2005;
vec3 nodeVar2006;
vec2 nodeVar2007;
vec3 nodeVar2008;
vec2 nodeVar2009;
vec3 nodeVar2010;
vec2 nodeVar2011;
vec3 nodeVar2012;
vec2 nodeVar2013;
vec2 nodeVar2014;
vec3 nodeVar2015;
vec2 nodeVar2016;
vec3 nodeVar2017;
vec2 nodeVar2018;
vec3 nodeVar2019;
vec2 nodeVar2020;
vec3 nodeVar2021;
vec2 nodeVar2022;
vec2 nodeVar2023;
vec3 nodeVar2024;
vec2 nodeVar2025;
vec3 nodeVar2026;
vec2 nodeVar2027;
vec3 nodeVar2028;
vec2 nodeVar2029;
vec3 nodeVar2030;
vec2 nodeVar2031;
vec2 nodeVar2032;
vec3 nodeVar2033;
vec2 nodeVar2034;
vec3 nodeVar2035;
vec2 nodeVar2036;
vec3 nodeVar2037;
vec2 nodeVar2038;
vec3 nodeVar2039;
float nodeVar2040;
float nodeVar2041;
float nodeVar2042;
vec2 nodeVar2043;
float nodeVar2044;
float nodeVar2045;
vec2 nodeVar2046;
vec2 nodeVar2047;
vec3 nodeVar2048;
vec2 nodeVar2049;
vec3 nodeVar2050;
vec2 nodeVar2051;
vec3 nodeVar2052;
vec2 nodeVar2053;
vec3 nodeVar2054;
vec2 nodeVar2055;
vec2 nodeVar2056;
vec3 nodeVar2057;
vec2 nodeVar2058;
vec3 nodeVar2059;
vec2 nodeVar2060;
vec3 nodeVar2061;
vec2 nodeVar2062;
vec3 nodeVar2063;
vec2 nodeVar2064;
vec2 nodeVar2065;
vec3 nodeVar2066;
vec2 nodeVar2067;
vec3 nodeVar2068;
vec2 nodeVar2069;
vec3 nodeVar2070;
vec2 nodeVar2071;
vec3 nodeVar2072;
vec2 nodeVar2073;
vec2 nodeVar2074;
vec3 nodeVar2075;
vec2 nodeVar2076;
vec3 nodeVar2077;
vec2 nodeVar2078;
vec3 nodeVar2079;
vec2 nodeVar2080;
vec3 nodeVar2081;
float nodeVar2082;
float nodeVar2083;
float nodeVar2084;
float nodeVar2085;
float nodeVar2086;
float nodeVar2087;
float nodeVar2088;
float nodeVar2089;
float nodeVar2090;
vec2 nodeVar2091;
float nodeVar2092;
float nodeVar2093;
vec2 nodeVar2094;
vec2 nodeVar2095;
vec3 nodeVar2096;
vec2 nodeVar2097;
vec3 nodeVar2098;
vec2 nodeVar2099;
vec3 nodeVar2100;
vec2 nodeVar2101;
vec3 nodeVar2102;
vec2 nodeVar2103;
vec2 nodeVar2104;
vec3 nodeVar2105;
vec2 nodeVar2106;
vec3 nodeVar2107;
vec2 nodeVar2108;
vec3 nodeVar2109;
vec2 nodeVar2110;
vec3 nodeVar2111;
vec2 nodeVar2112;
vec2 nodeVar2113;
vec3 nodeVar2114;
vec2 nodeVar2115;
vec3 nodeVar2116;
vec2 nodeVar2117;
vec3 nodeVar2118;
vec2 nodeVar2119;
vec3 nodeVar2120;
vec2 nodeVar2121;
vec2 nodeVar2122;
vec3 nodeVar2123;
vec2 nodeVar2124;
vec3 nodeVar2125;
vec2 nodeVar2126;
vec3 nodeVar2127;
vec2 nodeVar2128;
vec3 nodeVar2129;
float nodeVar2130;
vec2 nodeVar2131;
vec3 nodeVar2132;
float nodeVar2133;
vec2 nodeVar2134;
float nodeVar2135;
float nodeVar2136;
vec2 nodeVar2137;
vec2 nodeVar2138;
vec3 nodeVar2139;
vec2 nodeVar2140;
vec3 nodeVar2141;
vec2 nodeVar2142;
vec3 nodeVar2143;
vec2 nodeVar2144;
vec3 nodeVar2145;
vec2 nodeVar2146;
vec2 nodeVar2147;
vec3 nodeVar2148;
vec2 nodeVar2149;
vec3 nodeVar2150;
vec2 nodeVar2151;
vec3 nodeVar2152;
vec2 nodeVar2153;
vec3 nodeVar2154;
vec2 nodeVar2155;
vec2 nodeVar2156;
vec3 nodeVar2157;
vec2 nodeVar2158;
vec3 nodeVar2159;
vec2 nodeVar2160;
vec3 nodeVar2161;
vec2 nodeVar2162;
vec3 nodeVar2163;
vec2 nodeVar2164;
vec2 nodeVar2165;
vec3 nodeVar2166;
vec2 nodeVar2167;
vec3 nodeVar2168;
vec2 nodeVar2169;
vec3 nodeVar2170;
vec2 nodeVar2171;
vec3 nodeVar2172;
float nodeVar2173;
vec2 nodeVar2174;
float nodeVar2175;
float nodeVar2176;
vec2 nodeVar2177;
vec2 nodeVar2178;
vec3 nodeVar2179;
vec2 nodeVar2180;
vec3 nodeVar2181;
vec2 nodeVar2182;
vec3 nodeVar2183;
vec2 nodeVar2184;
vec3 nodeVar2185;
vec2 nodeVar2186;
vec2 nodeVar2187;
vec3 nodeVar2188;
vec2 nodeVar2189;
vec3 nodeVar2190;
vec2 nodeVar2191;
vec3 nodeVar2192;
vec2 nodeVar2193;
vec3 nodeVar2194;
vec2 nodeVar2195;
vec2 nodeVar2196;
vec3 nodeVar2197;
vec2 nodeVar2198;
vec3 nodeVar2199;
vec2 nodeVar2200;
vec3 nodeVar2201;
vec2 nodeVar2202;
vec3 nodeVar2203;
vec2 nodeVar2204;
vec2 nodeVar2205;
vec3 nodeVar2206;
vec2 nodeVar2207;
vec3 nodeVar2208;
vec2 nodeVar2209;
vec3 nodeVar2210;
vec2 nodeVar2211;
vec3 nodeVar2212;
vec2 nodeVar2213;
float nodeVar2214;
float nodeVar2215;
vec2 nodeVar2216;
vec2 nodeVar2217;
vec3 nodeVar2218;
vec2 nodeVar2219;
vec3 nodeVar2220;
vec2 nodeVar2221;
vec3 nodeVar2222;
vec2 nodeVar2223;
vec3 nodeVar2224;
vec2 nodeVar2225;
vec2 nodeVar2226;
vec3 nodeVar2227;
vec2 nodeVar2228;
vec3 nodeVar2229;
vec2 nodeVar2230;
vec3 nodeVar2231;
vec2 nodeVar2232;
vec3 nodeVar2233;
vec2 nodeVar2234;
vec2 nodeVar2235;
vec3 nodeVar2236;
vec2 nodeVar2237;
vec3 nodeVar2238;
vec2 nodeVar2239;
vec3 nodeVar2240;
vec2 nodeVar2241;
vec3 nodeVar2242;
vec2 nodeVar2243;
vec2 nodeVar2244;
vec3 nodeVar2245;
vec2 nodeVar2246;
vec3 nodeVar2247;
vec2 nodeVar2248;
vec3 nodeVar2249;
vec2 nodeVar2250;
vec3 nodeVar2251;
float nodeVar2252;
vec2 nodeVar2253;
float nodeVar2254;
float nodeVar2255;
vec2 nodeVar2256;
vec2 nodeVar2257;
vec3 nodeVar2258;
vec2 nodeVar2259;
vec3 nodeVar2260;
vec2 nodeVar2261;
vec3 nodeVar2262;
vec2 nodeVar2263;
vec3 nodeVar2264;
vec2 nodeVar2265;
vec2 nodeVar2266;
vec3 nodeVar2267;
vec2 nodeVar2268;
vec3 nodeVar2269;
vec2 nodeVar2270;
vec3 nodeVar2271;
vec2 nodeVar2272;
vec3 nodeVar2273;
vec2 nodeVar2274;
vec2 nodeVar2275;
vec3 nodeVar2276;
vec2 nodeVar2277;
vec3 nodeVar2278;
vec2 nodeVar2279;
vec3 nodeVar2280;
vec2 nodeVar2281;
vec3 nodeVar2282;
vec2 nodeVar2283;
vec2 nodeVar2284;
vec3 nodeVar2285;
vec2 nodeVar2286;
vec3 nodeVar2287;
vec2 nodeVar2288;
vec3 nodeVar2289;
vec2 nodeVar2290;
vec3 nodeVar2291;
float nodeVar2292;
vec2 nodeVar2293;
float nodeVar2294;
float nodeVar2295;
vec2 nodeVar2296;
vec2 nodeVar2297;
vec3 nodeVar2298;
vec2 nodeVar2299;
vec3 nodeVar2300;
vec2 nodeVar2301;
vec3 nodeVar2302;
vec2 nodeVar2303;
vec3 nodeVar2304;
vec2 nodeVar2305;
vec2 nodeVar2306;
vec3 nodeVar2307;
vec2 nodeVar2308;
vec3 nodeVar2309;
vec2 nodeVar2310;
vec3 nodeVar2311;
vec2 nodeVar2312;
vec3 nodeVar2313;
vec2 nodeVar2314;
vec2 nodeVar2315;
vec3 nodeVar2316;
vec2 nodeVar2317;
vec3 nodeVar2318;
vec2 nodeVar2319;
vec3 nodeVar2320;
vec2 nodeVar2321;
vec3 nodeVar2322;
vec2 nodeVar2323;
float nodeVar2324;
float nodeVar2325;
vec2 nodeVar2326;
vec2 nodeVar2327;
vec3 nodeVar2328;
vec2 nodeVar2329;
vec3 nodeVar2330;
vec2 nodeVar2331;
vec3 nodeVar2332;
vec2 nodeVar2333;
vec3 nodeVar2334;
vec2 nodeVar2335;
vec2 nodeVar2336;
vec3 nodeVar2337;
vec2 nodeVar2338;
vec3 nodeVar2339;
vec2 nodeVar2340;
vec3 nodeVar2341;
vec2 nodeVar2342;
vec3 nodeVar2343;
vec2 nodeVar2344;
vec2 nodeVar2345;
vec3 nodeVar2346;
vec2 nodeVar2347;
vec3 nodeVar2348;
vec2 nodeVar2349;
vec3 nodeVar2350;
vec2 nodeVar2351;
vec3 nodeVar2352;
vec2 nodeVar2353;
vec2 nodeVar2354;
vec2 nodeVar2355;
vec2 nodeVar2356;
float nodeVar2357;
float nodeVar2358;
vec2 nodeVar2359;
vec2 nodeVar2360;
vec3 nodeVar2361;
vec2 nodeVar2362;
vec3 nodeVar2363;
float nodeVar2364;
vec2 nodeVar2365;
vec3 nodeVar2366;
vec2 nodeVar2367;
vec3 nodeVar2368;
float nodeVar2369;
vec2 nodeVar2370;
vec3 nodeVar2371;
vec2 nodeVar2372;
vec3 nodeVar2373;
float nodeVar2374;
vec2 nodeVar2375;
vec3 nodeVar2376;
vec2 nodeVar2377;
vec3 nodeVar2378;
float nodeVar2379;
vec2 nodeVar2380;
vec3 nodeVar2381;
vec2 nodeVar2382;
vec3 nodeVar2383;
float nodeVar2384;
vec2 nodeVar2385;
vec3 nodeVar2386;
vec2 nodeVar2387;
vec3 nodeVar2388;
float nodeVar2389;
vec2 nodeVar2390;
vec3 nodeVar2391;
vec2 nodeVar2392;
vec3 nodeVar2393;
float nodeVar2394;
vec2 nodeVar2395;
vec3 nodeVar2396;
vec2 nodeVar2397;
vec3 nodeVar2398;
float nodeVar2399;
vec2 nodeVar2400;
vec3 nodeVar2401;
vec2 nodeVar2402;
vec3 nodeVar2403;
float nodeVar2404;
float nodeVar2405;
vec2 nodeVar2406;
vec3 nodeVar2407;
float nodeVar2408;
vec2 nodeVar2409;
float nodeVar2410;
float nodeVar2411;
vec2 nodeVar2412;
vec2 nodeVar2413;
vec3 nodeVar2414;
vec2 nodeVar2415;
vec3 nodeVar2416;
vec2 nodeVar2417;
vec3 nodeVar2418;
vec2 nodeVar2419;
vec3 nodeVar2420;
vec2 nodeVar2421;
vec2 nodeVar2422;
vec3 nodeVar2423;
vec2 nodeVar2424;
vec3 nodeVar2425;
vec2 nodeVar2426;
vec3 nodeVar2427;
vec2 nodeVar2428;
vec3 nodeVar2429;
vec2 nodeVar2430;
vec2 nodeVar2431;
vec3 nodeVar2432;
vec2 nodeVar2433;
vec3 nodeVar2434;
vec2 nodeVar2435;
vec3 nodeVar2436;
vec2 nodeVar2437;
vec3 nodeVar2438;
vec2 nodeVar2439;
vec2 nodeVar2440;
vec3 nodeVar2441;
vec2 nodeVar2442;
vec3 nodeVar2443;
vec2 nodeVar2444;
vec3 nodeVar2445;
vec2 nodeVar2446;
vec3 nodeVar2447;
vec2 nodeVar2448;
float nodeVar2449;
float nodeVar2450;
vec2 nodeVar2451;
vec2 nodeVar2452;
vec3 nodeVar2453;
vec2 nodeVar2454;
vec3 nodeVar2455;
vec2 nodeVar2456;
vec3 nodeVar2457;
vec2 nodeVar2458;
vec3 nodeVar2459;
vec2 nodeVar2460;
vec2 nodeVar2461;
vec3 nodeVar2462;
vec2 nodeVar2463;
vec3 nodeVar2464;
vec2 nodeVar2465;
vec3 nodeVar2466;
vec2 nodeVar2467;
vec3 nodeVar2468;
vec2 nodeVar2469;
vec2 nodeVar2470;
vec3 nodeVar2471;
vec2 nodeVar2472;
vec3 nodeVar2473;
vec2 nodeVar2474;
vec3 nodeVar2475;
vec2 nodeVar2476;
vec3 nodeVar2477;
vec2 nodeVar2478;
vec2 nodeVar2479;
vec3 nodeVar2480;
vec2 nodeVar2481;
vec3 nodeVar2482;
vec2 nodeVar2483;
vec3 nodeVar2484;
vec2 nodeVar2485;
vec3 nodeVar2486;
vec2 nodeVar2487;
float nodeVar2488;
float nodeVar2489;
vec2 nodeVar2490;
vec2 nodeVar2491;
vec3 nodeVar2492;
vec2 nodeVar2493;
vec3 nodeVar2494;
vec2 nodeVar2495;
vec3 nodeVar2496;
vec2 nodeVar2497;
vec3 nodeVar2498;
vec2 nodeVar2499;
vec2 nodeVar2500;
vec3 nodeVar2501;
vec2 nodeVar2502;
vec3 nodeVar2503;
vec2 nodeVar2504;
vec3 nodeVar2505;
vec2 nodeVar2506;
vec3 nodeVar2507;
vec2 nodeVar2508;
vec2 nodeVar2509;
vec3 nodeVar2510;
vec2 nodeVar2511;
vec3 nodeVar2512;
vec2 nodeVar2513;
vec3 nodeVar2514;
vec2 nodeVar2515;
vec3 nodeVar2516;
vec2 nodeVar2517;
vec2 nodeVar2518;
vec3 nodeVar2519;
vec2 nodeVar2520;
vec3 nodeVar2521;
vec2 nodeVar2522;
vec3 nodeVar2523;
vec2 nodeVar2524;
vec3 nodeVar2525;
float nodeVar2526;
vec2 nodeVar2527;
float nodeVar2528;
float nodeVar2529;
vec2 nodeVar2530;
vec2 nodeVar2531;
vec3 nodeVar2532;
vec2 nodeVar2533;
vec3 nodeVar2534;
vec2 nodeVar2535;
vec3 nodeVar2536;
vec2 nodeVar2537;
vec3 nodeVar2538;
vec2 nodeVar2539;
vec2 nodeVar2540;
vec3 nodeVar2541;
vec2 nodeVar2542;
vec3 nodeVar2543;
vec2 nodeVar2544;
vec3 nodeVar2545;
vec2 nodeVar2546;
vec3 nodeVar2547;
vec2 nodeVar2548;
vec2 nodeVar2549;
vec3 nodeVar2550;
vec2 nodeVar2551;
vec3 nodeVar2552;
vec2 nodeVar2553;
vec3 nodeVar2554;
vec2 nodeVar2555;
vec3 nodeVar2556;
vec2 nodeVar2557;
vec2 nodeVar2558;
vec3 nodeVar2559;
vec2 nodeVar2560;
vec3 nodeVar2561;
vec2 nodeVar2562;
vec3 nodeVar2563;
vec2 nodeVar2564;
vec3 nodeVar2565;
vec2 nodeVar2566;
float nodeVar2567;
float nodeVar2568;
vec2 nodeVar2569;
vec2 nodeVar2570;
vec3 nodeVar2571;
vec2 nodeVar2572;
vec3 nodeVar2573;
vec2 nodeVar2574;
vec3 nodeVar2575;
vec2 nodeVar2576;
vec3 nodeVar2577;
vec2 nodeVar2578;
vec2 nodeVar2579;
vec3 nodeVar2580;
vec2 nodeVar2581;
vec3 nodeVar2582;
vec2 nodeVar2583;
vec3 nodeVar2584;
vec2 nodeVar2585;
vec3 nodeVar2586;
vec2 nodeVar2587;
vec2 nodeVar2588;
vec3 nodeVar2589;
vec2 nodeVar2590;
vec3 nodeVar2591;
vec2 nodeVar2592;
vec3 nodeVar2593;
vec2 nodeVar2594;
vec3 nodeVar2595;
vec2 nodeVar2596;
vec2 nodeVar2597;
vec3 nodeVar2598;
vec2 nodeVar2599;
vec3 nodeVar2600;
vec2 nodeVar2601;
vec3 nodeVar2602;
vec2 nodeVar2603;
vec3 nodeVar2604;
float nodeVar2605;
vec2 nodeVar2606;
float nodeVar2607;
float nodeVar2608;
vec2 nodeVar2609;
vec2 nodeVar2610;
vec3 nodeVar2611;
vec2 nodeVar2612;
vec3 nodeVar2613;
vec2 nodeVar2614;
vec3 nodeVar2615;
vec2 nodeVar2616;
vec3 nodeVar2617;
vec2 nodeVar2618;
vec2 nodeVar2619;
vec3 nodeVar2620;
vec2 nodeVar2621;
vec3 nodeVar2622;
vec2 nodeVar2623;
vec3 nodeVar2624;
vec2 nodeVar2625;
vec3 nodeVar2626;
vec2 nodeVar2627;
vec2 nodeVar2628;
vec3 nodeVar2629;
vec2 nodeVar2630;
vec3 nodeVar2631;
vec2 nodeVar2632;
vec3 nodeVar2633;
vec2 nodeVar2634;
vec3 nodeVar2635;
vec2 nodeVar2636;
vec2 nodeVar2637;
vec3 nodeVar2638;
vec2 nodeVar2639;
vec3 nodeVar2640;
vec2 nodeVar2641;
vec3 nodeVar2642;
vec2 nodeVar2643;
vec3 nodeVar2644;
vec2 nodeVar2645;
float nodeVar2646;
float nodeVar2647;
vec2 nodeVar2648;
vec2 nodeVar2649;
vec3 nodeVar2650;
vec2 nodeVar2651;
vec3 nodeVar2652;
vec2 nodeVar2653;
vec3 nodeVar2654;
vec2 nodeVar2655;
vec3 nodeVar2656;
vec2 nodeVar2657;
vec2 nodeVar2658;
vec3 nodeVar2659;
vec2 nodeVar2660;
vec3 nodeVar2661;
vec2 nodeVar2662;
vec3 nodeVar2663;
vec2 nodeVar2664;
vec3 nodeVar2665;
vec2 nodeVar2666;
vec2 nodeVar2667;
vec3 nodeVar2668;
vec2 nodeVar2669;
vec3 nodeVar2670;
vec2 nodeVar2671;
vec3 nodeVar2672;
vec2 nodeVar2673;
vec3 nodeVar2674;
vec2 nodeVar2675;
vec2 nodeVar2676;
vec3 nodeVar2677;
vec2 nodeVar2678;
vec3 nodeVar2679;
vec2 nodeVar2680;
vec3 nodeVar2681;
vec2 nodeVar2682;
vec3 nodeVar2683;
float nodeVar2684;
vec2 nodeVar2685;
float nodeVar2686;
float nodeVar2687;
vec2 nodeVar2688;
vec2 nodeVar2689;
vec3 nodeVar2690;
vec2 nodeVar2691;
vec3 nodeVar2692;
vec2 nodeVar2693;
vec3 nodeVar2694;
vec2 nodeVar2695;
vec3 nodeVar2696;
vec2 nodeVar2697;
vec2 nodeVar2698;
vec3 nodeVar2699;
vec2 nodeVar2700;
vec3 nodeVar2701;
vec2 nodeVar2702;
vec3 nodeVar2703;
vec2 nodeVar2704;
vec3 nodeVar2705;
vec2 nodeVar2706;
vec2 nodeVar2707;
vec3 nodeVar2708;
vec2 nodeVar2709;
vec3 nodeVar2710;
vec2 nodeVar2711;
vec3 nodeVar2712;
vec2 nodeVar2713;
vec3 nodeVar2714;
vec2 nodeVar2715;
vec2 nodeVar2716;
vec3 nodeVar2717;
vec2 nodeVar2718;
vec3 nodeVar2719;
vec2 nodeVar2720;
vec3 nodeVar2721;
vec2 nodeVar2722;
vec3 nodeVar2723;
float nodeVar2724;
vec3 nodeVar2725;
float nodeVar2726;
float nodeVar2727;
vec3 nodeVar2728;
vec3 NORMAL_nodeVar2729;
vec3 nodeVar2730;
vec3 nodeVar2731;
vec3 nodeVar2732;
vec3 nodeVar2733;
vec3 nodeVar2734;
vec3 nodeVar2735;
vec3 normalView;
vec3 normalWorld;
vec3 nodeVar2736;
vec3 nodeVar2737;
vec2 nodeVar2738;
vec2 nodeVar2739;
float nodeVar2740;
vec3 nodeVar2741;
float nodeVar2742;
float nodeVar2743;
float nodeVar2744;
float nodeVar2745;
float nodeVar2746;
float nodeVar2747;
float nodeVar2748;
float nodeVar2749;
float nodeVar2750;
vec2 nodeVar2751;
vec3 nodeVar2752;
float nodeVar2753;
vec2 nodeVar2754;
float nodeVar2755;
float nodeVar2756;
vec2 nodeVar2757;
vec2 nodeVar2758;
vec3 nodeVar2759;
vec2 nodeVar2760;
vec3 nodeVar2761;
vec2 nodeVar2762;
vec3 nodeVar2763;
vec2 nodeVar2764;
vec3 nodeVar2765;
vec2 nodeVar2766;
vec2 nodeVar2767;
vec3 nodeVar2768;
vec2 nodeVar2769;
vec3 nodeVar2770;
vec2 nodeVar2771;
vec3 nodeVar2772;
vec2 nodeVar2773;
vec3 nodeVar2774;
vec2 nodeVar2775;
vec2 nodeVar2776;
vec3 nodeVar2777;
vec2 nodeVar2778;
vec3 nodeVar2779;
vec2 nodeVar2780;
vec3 nodeVar2781;
vec2 nodeVar2782;
vec3 nodeVar2783;
vec2 nodeVar2784;
vec2 nodeVar2785;
vec3 nodeVar2786;
vec2 nodeVar2787;
vec3 nodeVar2788;
vec2 nodeVar2789;
vec3 nodeVar2790;
vec2 nodeVar2791;
vec3 nodeVar2792;
vec2 nodeVar2793;
float nodeVar2794;
float nodeVar2795;
vec2 nodeVar2796;
vec2 nodeVar2797;
vec3 nodeVar2798;
vec2 nodeVar2799;
vec3 nodeVar2800;
vec2 nodeVar2801;
vec3 nodeVar2802;
vec2 nodeVar2803;
vec3 nodeVar2804;
vec2 nodeVar2805;
vec2 nodeVar2806;
vec3 nodeVar2807;
vec2 nodeVar2808;
vec3 nodeVar2809;
vec2 nodeVar2810;
vec3 nodeVar2811;
vec2 nodeVar2812;
vec3 nodeVar2813;
vec2 nodeVar2814;
vec2 nodeVar2815;
vec3 nodeVar2816;
vec2 nodeVar2817;
vec3 nodeVar2818;
vec2 nodeVar2819;
vec3 nodeVar2820;
vec2 nodeVar2821;
vec3 nodeVar2822;
vec2 nodeVar2823;
vec2 nodeVar2824;
vec3 nodeVar2825;
vec2 nodeVar2826;
vec3 nodeVar2827;
vec2 nodeVar2828;
vec3 nodeVar2829;
vec2 nodeVar2830;
vec3 nodeVar2831;
vec2 nodeVar2832;
float nodeVar2833;
float nodeVar2834;
vec2 nodeVar2835;
vec2 nodeVar2836;
vec3 nodeVar2837;
vec2 nodeVar2838;
vec3 nodeVar2839;
vec2 nodeVar2840;
vec3 nodeVar2841;
vec2 nodeVar2842;
vec3 nodeVar2843;
vec2 nodeVar2844;
vec2 nodeVar2845;
vec3 nodeVar2846;
vec2 nodeVar2847;
vec3 nodeVar2848;
vec2 nodeVar2849;
vec3 nodeVar2850;
vec2 nodeVar2851;
vec3 nodeVar2852;
vec2 nodeVar2853;
vec2 nodeVar2854;
vec3 nodeVar2855;
vec2 nodeVar2856;
vec3 nodeVar2857;
vec2 nodeVar2858;
vec3 nodeVar2859;
vec2 nodeVar2860;
vec3 nodeVar2861;
vec2 nodeVar2862;
vec2 nodeVar2863;
vec3 nodeVar2864;
vec2 nodeVar2865;
vec3 nodeVar2866;
vec2 nodeVar2867;
vec3 nodeVar2868;
vec2 nodeVar2869;
vec3 nodeVar2870;
vec2 nodeVar2871;
float nodeVar2872;
float nodeVar2873;
vec2 nodeVar2874;
vec2 nodeVar2875;
vec3 nodeVar2876;
vec2 nodeVar2877;
vec3 nodeVar2878;
vec2 nodeVar2879;
vec3 nodeVar2880;
vec2 nodeVar2881;
vec3 nodeVar2882;
vec2 nodeVar2883;
vec2 nodeVar2884;
vec3 nodeVar2885;
vec2 nodeVar2886;
vec3 nodeVar2887;
vec2 nodeVar2888;
vec3 nodeVar2889;
vec2 nodeVar2890;
vec3 nodeVar2891;
vec2 nodeVar2892;
vec2 nodeVar2893;
vec3 nodeVar2894;
vec2 nodeVar2895;
vec3 nodeVar2896;
vec2 nodeVar2897;
vec3 nodeVar2898;
vec2 nodeVar2899;
vec3 nodeVar2900;
vec2 nodeVar2901;
vec2 nodeVar2902;
vec3 nodeVar2903;
vec2 nodeVar2904;
vec3 nodeVar2905;
vec2 nodeVar2906;
vec3 nodeVar2907;
vec2 nodeVar2908;
vec3 nodeVar2909;
float nodeVar2910;
float nodeVar2911;
float nodeVar2912;
float nodeVar2913;
float nodeVar2914;
float nodeVar2915;
float nodeVar2916;
vec2 nodeVar2917;
vec3 nodeVar2918;
float nodeVar2919;
vec2 nodeVar2920;
float nodeVar2921;
float nodeVar2922;
vec2 nodeVar2923;
vec2 nodeVar2924;
vec3 nodeVar2925;
vec2 nodeVar2926;
vec3 nodeVar2927;
vec2 nodeVar2928;
vec3 nodeVar2929;
vec2 nodeVar2930;
vec3 nodeVar2931;
vec2 nodeVar2932;
vec2 nodeVar2933;
vec3 nodeVar2934;
vec2 nodeVar2935;
vec3 nodeVar2936;
vec2 nodeVar2937;
vec3 nodeVar2938;
vec2 nodeVar2939;
vec3 nodeVar2940;
vec2 nodeVar2941;
vec2 nodeVar2942;
vec3 nodeVar2943;
vec2 nodeVar2944;
vec3 nodeVar2945;
vec2 nodeVar2946;
vec3 nodeVar2947;
vec2 nodeVar2948;
vec3 nodeVar2949;
vec2 nodeVar2950;
vec2 nodeVar2951;
vec3 nodeVar2952;
vec2 nodeVar2953;
vec3 nodeVar2954;
vec2 nodeVar2955;
vec3 nodeVar2956;
vec2 nodeVar2957;
vec3 nodeVar2958;
float nodeVar2959;
float nodeVar2960;
float nodeVar2961;
vec2 nodeVar2962;
float nodeVar2963;
float nodeVar2964;
vec2 nodeVar2965;
vec2 nodeVar2966;
vec3 nodeVar2967;
vec2 nodeVar2968;
vec3 nodeVar2969;
vec2 nodeVar2970;
vec3 nodeVar2971;
vec2 nodeVar2972;
vec3 nodeVar2973;
vec2 nodeVar2974;
vec2 nodeVar2975;
vec3 nodeVar2976;
vec2 nodeVar2977;
vec3 nodeVar2978;
vec2 nodeVar2979;
vec3 nodeVar2980;
vec2 nodeVar2981;
vec3 nodeVar2982;
vec2 nodeVar2983;
vec2 nodeVar2984;
vec3 nodeVar2985;
vec2 nodeVar2986;
vec3 nodeVar2987;
vec2 nodeVar2988;
vec3 nodeVar2989;
vec2 nodeVar2990;
vec3 nodeVar2991;
vec2 nodeVar2992;
vec2 nodeVar2993;
vec3 nodeVar2994;
vec2 nodeVar2995;
vec3 nodeVar2996;
vec2 nodeVar2997;
vec3 nodeVar2998;
vec2 nodeVar2999;
vec3 nodeVar3000;
float nodeVar3001;
float nodeVar3002;
float nodeVar3003;
float nodeVar3004;
float nodeVar3005;
float nodeVar3006;
float nodeVar3007;
float nodeVar3008;
float nodeVar3009;
vec2 nodeVar3010;
float nodeVar3011;
float nodeVar3012;
vec2 nodeVar3013;
vec2 nodeVar3014;
vec3 nodeVar3015;
vec2 nodeVar3016;
vec3 nodeVar3017;
vec2 nodeVar3018;
vec3 nodeVar3019;
vec2 nodeVar3020;
vec3 nodeVar3021;
vec2 nodeVar3022;
vec2 nodeVar3023;
vec3 nodeVar3024;
vec2 nodeVar3025;
vec3 nodeVar3026;
vec2 nodeVar3027;
vec3 nodeVar3028;
vec2 nodeVar3029;
vec3 nodeVar3030;
vec2 nodeVar3031;
vec2 nodeVar3032;
vec3 nodeVar3033;
vec2 nodeVar3034;
vec3 nodeVar3035;
vec2 nodeVar3036;
vec3 nodeVar3037;
vec2 nodeVar3038;
vec3 nodeVar3039;
vec2 nodeVar3040;
vec2 nodeVar3041;
vec3 nodeVar3042;
vec2 nodeVar3043;
vec3 nodeVar3044;
vec2 nodeVar3045;
vec3 nodeVar3046;
vec2 nodeVar3047;
vec3 nodeVar3048;
float nodeVar3049;
vec2 nodeVar3050;
vec3 nodeVar3051;
float nodeVar3052;
vec2 nodeVar3053;
float nodeVar3054;
float nodeVar3055;
vec2 nodeVar3056;
vec2 nodeVar3057;
vec3 nodeVar3058;
vec2 nodeVar3059;
vec3 nodeVar3060;
vec2 nodeVar3061;
vec3 nodeVar3062;
vec2 nodeVar3063;
vec3 nodeVar3064;
vec2 nodeVar3065;
vec2 nodeVar3066;
vec3 nodeVar3067;
vec2 nodeVar3068;
vec3 nodeVar3069;
vec2 nodeVar3070;
vec3 nodeVar3071;
vec2 nodeVar3072;
vec3 nodeVar3073;
vec2 nodeVar3074;
vec2 nodeVar3075;
vec3 nodeVar3076;
vec2 nodeVar3077;
vec3 nodeVar3078;
vec2 nodeVar3079;
vec3 nodeVar3080;
vec2 nodeVar3081;
vec3 nodeVar3082;
vec2 nodeVar3083;
vec2 nodeVar3084;
vec3 nodeVar3085;
vec2 nodeVar3086;
vec3 nodeVar3087;
vec2 nodeVar3088;
vec3 nodeVar3089;
vec2 nodeVar3090;
vec3 nodeVar3091;
float nodeVar3092;
vec2 nodeVar3093;
float nodeVar3094;
float nodeVar3095;
vec2 nodeVar3096;
vec2 nodeVar3097;
vec3 nodeVar3098;
vec2 nodeVar3099;
vec3 nodeVar3100;
vec2 nodeVar3101;
vec3 nodeVar3102;
vec2 nodeVar3103;
vec3 nodeVar3104;
vec2 nodeVar3105;
vec2 nodeVar3106;
vec3 nodeVar3107;
vec2 nodeVar3108;
vec3 nodeVar3109;
vec2 nodeVar3110;
vec3 nodeVar3111;
vec2 nodeVar3112;
vec3 nodeVar3113;
vec2 nodeVar3114;
vec2 nodeVar3115;
vec3 nodeVar3116;
vec2 nodeVar3117;
vec3 nodeVar3118;
vec2 nodeVar3119;
vec3 nodeVar3120;
vec2 nodeVar3121;
vec3 nodeVar3122;
vec2 nodeVar3123;
vec2 nodeVar3124;
vec3 nodeVar3125;
vec2 nodeVar3126;
vec3 nodeVar3127;
vec2 nodeVar3128;
vec3 nodeVar3129;
vec2 nodeVar3130;
vec3 nodeVar3131;
vec2 nodeVar3132;
float nodeVar3133;
float nodeVar3134;
vec2 nodeVar3135;
vec2 nodeVar3136;
vec3 nodeVar3137;
vec2 nodeVar3138;
vec3 nodeVar3139;
vec2 nodeVar3140;
vec3 nodeVar3141;
vec2 nodeVar3142;
vec3 nodeVar3143;
vec2 nodeVar3144;
vec2 nodeVar3145;
vec3 nodeVar3146;
vec2 nodeVar3147;
vec3 nodeVar3148;
vec2 nodeVar3149;
vec3 nodeVar3150;
vec2 nodeVar3151;
vec3 nodeVar3152;
vec2 nodeVar3153;
vec2 nodeVar3154;
vec3 nodeVar3155;
vec2 nodeVar3156;
vec3 nodeVar3157;
vec2 nodeVar3158;
vec3 nodeVar3159;
vec2 nodeVar3160;
vec3 nodeVar3161;
vec2 nodeVar3162;
vec2 nodeVar3163;
vec3 nodeVar3164;
vec2 nodeVar3165;
vec3 nodeVar3166;
vec2 nodeVar3167;
vec3 nodeVar3168;
vec2 nodeVar3169;
vec3 nodeVar3170;
float nodeVar3171;
vec2 nodeVar3172;
float nodeVar3173;
float nodeVar3174;
vec2 nodeVar3175;
vec2 nodeVar3176;
vec3 nodeVar3177;
vec2 nodeVar3178;
vec3 nodeVar3179;
vec2 nodeVar3180;
vec3 nodeVar3181;
vec2 nodeVar3182;
vec3 nodeVar3183;
vec2 nodeVar3184;
vec2 nodeVar3185;
vec3 nodeVar3186;
vec2 nodeVar3187;
vec3 nodeVar3188;
vec2 nodeVar3189;
vec3 nodeVar3190;
vec2 nodeVar3191;
vec3 nodeVar3192;
vec2 nodeVar3193;
vec2 nodeVar3194;
vec3 nodeVar3195;
vec2 nodeVar3196;
vec3 nodeVar3197;
vec2 nodeVar3198;
vec3 nodeVar3199;
vec2 nodeVar3200;
vec3 nodeVar3201;
vec2 nodeVar3202;
vec2 nodeVar3203;
vec3 nodeVar3204;
vec2 nodeVar3205;
vec3 nodeVar3206;
vec2 nodeVar3207;
vec3 nodeVar3208;
vec2 nodeVar3209;
vec3 nodeVar3210;
float nodeVar3211;
vec2 nodeVar3212;
float nodeVar3213;
float nodeVar3214;
vec2 nodeVar3215;
vec2 nodeVar3216;
vec3 nodeVar3217;
vec2 nodeVar3218;
vec3 nodeVar3219;
vec2 nodeVar3220;
vec3 nodeVar3221;
vec2 nodeVar3222;
vec3 nodeVar3223;
vec2 nodeVar3224;
vec2 nodeVar3225;
vec3 nodeVar3226;
vec2 nodeVar3227;
vec3 nodeVar3228;
vec2 nodeVar3229;
vec3 nodeVar3230;
vec2 nodeVar3231;
vec3 nodeVar3232;
vec2 nodeVar3233;
vec2 nodeVar3234;
vec3 nodeVar3235;
vec2 nodeVar3236;
vec3 nodeVar3237;
vec2 nodeVar3238;
vec3 nodeVar3239;
vec2 nodeVar3240;
vec3 nodeVar3241;
vec2 nodeVar3242;
float nodeVar3243;
float nodeVar3244;
vec2 nodeVar3245;
vec2 nodeVar3246;
vec3 nodeVar3247;
vec2 nodeVar3248;
vec3 nodeVar3249;
vec2 nodeVar3250;
vec3 nodeVar3251;
vec2 nodeVar3252;
vec3 nodeVar3253;
vec2 nodeVar3254;
vec2 nodeVar3255;
vec3 nodeVar3256;
vec2 nodeVar3257;
vec3 nodeVar3258;
vec2 nodeVar3259;
vec3 nodeVar3260;
vec2 nodeVar3261;
vec3 nodeVar3262;
vec2 nodeVar3263;
vec2 nodeVar3264;
vec3 nodeVar3265;
vec2 nodeVar3266;
vec3 nodeVar3267;
vec2 nodeVar3268;
vec3 nodeVar3269;
vec2 nodeVar3270;
vec3 nodeVar3271;
vec2 nodeVar3272;
vec2 nodeVar3273;
vec2 nodeVar3274;
vec2 nodeVar3275;
float nodeVar3276;
float nodeVar3277;
vec2 nodeVar3278;
vec2 nodeVar3279;
vec3 nodeVar3280;
vec2 nodeVar3281;
vec3 nodeVar3282;
float nodeVar3283;
vec2 nodeVar3284;
vec3 nodeVar3285;
vec2 nodeVar3286;
vec3 nodeVar3287;
float nodeVar3288;
vec2 nodeVar3289;
vec3 nodeVar3290;
vec2 nodeVar3291;
vec3 nodeVar3292;
float nodeVar3293;
vec2 nodeVar3294;
vec3 nodeVar3295;
vec2 nodeVar3296;
vec3 nodeVar3297;
float nodeVar3298;
vec2 nodeVar3299;
vec3 nodeVar3300;
vec2 nodeVar3301;
vec3 nodeVar3302;
float nodeVar3303;
vec2 nodeVar3304;
vec3 nodeVar3305;
vec2 nodeVar3306;
vec3 nodeVar3307;
float nodeVar3308;
vec2 nodeVar3309;
vec3 nodeVar3310;
vec2 nodeVar3311;
vec3 nodeVar3312;
float nodeVar3313;
vec2 nodeVar3314;
vec3 nodeVar3315;
vec2 nodeVar3316;
vec3 nodeVar3317;
float nodeVar3318;
vec2 nodeVar3319;
vec3 nodeVar3320;
vec2 nodeVar3321;
vec3 nodeVar3322;
float nodeVar3323;
float nodeVar3324;
vec2 nodeVar3325;
vec3 nodeVar3326;
float nodeVar3327;
vec2 nodeVar3328;
float nodeVar3329;
float nodeVar3330;
vec2 nodeVar3331;
vec2 nodeVar3332;
vec3 nodeVar3333;
vec2 nodeVar3334;
vec3 nodeVar3335;
vec2 nodeVar3336;
vec3 nodeVar3337;
vec2 nodeVar3338;
vec3 nodeVar3339;
vec2 nodeVar3340;
vec2 nodeVar3341;
vec3 nodeVar3342;
vec2 nodeVar3343;
vec3 nodeVar3344;
vec2 nodeVar3345;
vec3 nodeVar3346;
vec2 nodeVar3347;
vec3 nodeVar3348;
vec2 nodeVar3349;
vec2 nodeVar3350;
vec3 nodeVar3351;
vec2 nodeVar3352;
vec3 nodeVar3353;
vec2 nodeVar3354;
vec3 nodeVar3355;
vec2 nodeVar3356;
vec3 nodeVar3357;
vec2 nodeVar3358;
vec2 nodeVar3359;
vec3 nodeVar3360;
vec2 nodeVar3361;
vec3 nodeVar3362;
vec2 nodeVar3363;
vec3 nodeVar3364;
vec2 nodeVar3365;
vec3 nodeVar3366;
vec2 nodeVar3367;
float nodeVar3368;
float nodeVar3369;
vec2 nodeVar3370;
vec2 nodeVar3371;
vec3 nodeVar3372;
vec2 nodeVar3373;
vec3 nodeVar3374;
vec2 nodeVar3375;
vec3 nodeVar3376;
vec2 nodeVar3377;
vec3 nodeVar3378;
vec2 nodeVar3379;
vec2 nodeVar3380;
vec3 nodeVar3381;
vec2 nodeVar3382;
vec3 nodeVar3383;
vec2 nodeVar3384;
vec3 nodeVar3385;
vec2 nodeVar3386;
vec3 nodeVar3387;
vec2 nodeVar3388;
vec2 nodeVar3389;
vec3 nodeVar3390;
vec2 nodeVar3391;
vec3 nodeVar3392;
vec2 nodeVar3393;
vec3 nodeVar3394;
vec2 nodeVar3395;
vec3 nodeVar3396;
vec2 nodeVar3397;
vec2 nodeVar3398;
vec3 nodeVar3399;
vec2 nodeVar3400;
vec3 nodeVar3401;
vec2 nodeVar3402;
vec3 nodeVar3403;
vec2 nodeVar3404;
vec3 nodeVar3405;
vec2 nodeVar3406;
float nodeVar3407;
float nodeVar3408;
vec2 nodeVar3409;
vec2 nodeVar3410;
vec3 nodeVar3411;
vec2 nodeVar3412;
vec3 nodeVar3413;
vec2 nodeVar3414;
vec3 nodeVar3415;
vec2 nodeVar3416;
vec3 nodeVar3417;
vec2 nodeVar3418;
vec2 nodeVar3419;
vec3 nodeVar3420;
vec2 nodeVar3421;
vec3 nodeVar3422;
vec2 nodeVar3423;
vec3 nodeVar3424;
vec2 nodeVar3425;
vec3 nodeVar3426;
vec2 nodeVar3427;
vec2 nodeVar3428;
vec3 nodeVar3429;
vec2 nodeVar3430;
vec3 nodeVar3431;
vec2 nodeVar3432;
vec3 nodeVar3433;
vec2 nodeVar3434;
vec3 nodeVar3435;
vec2 nodeVar3436;
vec2 nodeVar3437;
vec3 nodeVar3438;
vec2 nodeVar3439;
vec3 nodeVar3440;
vec2 nodeVar3441;
vec3 nodeVar3442;
vec2 nodeVar3443;
vec3 nodeVar3444;
float nodeVar3445;
vec2 nodeVar3446;
float nodeVar3447;
float nodeVar3448;
vec2 nodeVar3449;
vec2 nodeVar3450;
vec3 nodeVar3451;
vec2 nodeVar3452;
vec3 nodeVar3453;
vec2 nodeVar3454;
vec3 nodeVar3455;
vec2 nodeVar3456;
vec3 nodeVar3457;
vec2 nodeVar3458;
vec2 nodeVar3459;
vec3 nodeVar3460;
vec2 nodeVar3461;
vec3 nodeVar3462;
vec2 nodeVar3463;
vec3 nodeVar3464;
vec2 nodeVar3465;
vec3 nodeVar3466;
vec2 nodeVar3467;
vec2 nodeVar3468;
vec3 nodeVar3469;
vec2 nodeVar3470;
vec3 nodeVar3471;
vec2 nodeVar3472;
vec3 nodeVar3473;
vec2 nodeVar3474;
vec3 nodeVar3475;
vec2 nodeVar3476;
vec2 nodeVar3477;
vec3 nodeVar3478;
vec2 nodeVar3479;
vec3 nodeVar3480;
vec2 nodeVar3481;
vec3 nodeVar3482;
vec2 nodeVar3483;
vec3 nodeVar3484;
vec2 nodeVar3485;
float nodeVar3486;
float nodeVar3487;
vec2 nodeVar3488;
vec2 nodeVar3489;
vec3 nodeVar3490;
vec2 nodeVar3491;
vec3 nodeVar3492;
vec2 nodeVar3493;
vec3 nodeVar3494;
vec2 nodeVar3495;
vec3 nodeVar3496;
vec2 nodeVar3497;
vec2 nodeVar3498;
vec3 nodeVar3499;
vec2 nodeVar3500;
vec3 nodeVar3501;
vec2 nodeVar3502;
vec3 nodeVar3503;
vec2 nodeVar3504;
vec3 nodeVar3505;
vec2 nodeVar3506;
vec2 nodeVar3507;
vec3 nodeVar3508;
vec2 nodeVar3509;
vec3 nodeVar3510;
vec2 nodeVar3511;
vec3 nodeVar3512;
vec2 nodeVar3513;
vec3 nodeVar3514;
vec2 nodeVar3515;
vec2 nodeVar3516;
vec3 nodeVar3517;
vec2 nodeVar3518;
vec3 nodeVar3519;
vec2 nodeVar3520;
vec3 nodeVar3521;
vec2 nodeVar3522;
vec3 nodeVar3523;
float nodeVar3524;
vec2 nodeVar3525;
float nodeVar3526;
float nodeVar3527;
vec2 nodeVar3528;
vec2 nodeVar3529;
vec3 nodeVar3530;
vec2 nodeVar3531;
vec3 nodeVar3532;
vec2 nodeVar3533;
vec3 nodeVar3534;
vec2 nodeVar3535;
vec3 nodeVar3536;
vec2 nodeVar3537;
vec2 nodeVar3538;
vec3 nodeVar3539;
vec2 nodeVar3540;
vec3 nodeVar3541;
vec2 nodeVar3542;
vec3 nodeVar3543;
vec2 nodeVar3544;
vec3 nodeVar3545;
vec2 nodeVar3546;
vec2 nodeVar3547;
vec3 nodeVar3548;
vec2 nodeVar3549;
vec3 nodeVar3550;
vec2 nodeVar3551;
vec3 nodeVar3552;
vec2 nodeVar3553;
vec3 nodeVar3554;
vec2 nodeVar3555;
vec2 nodeVar3556;
vec3 nodeVar3557;
vec2 nodeVar3558;
vec3 nodeVar3559;
vec2 nodeVar3560;
vec3 nodeVar3561;
vec2 nodeVar3562;
vec3 nodeVar3563;
vec2 nodeVar3564;
float nodeVar3565;
float nodeVar3566;
vec2 nodeVar3567;
vec2 nodeVar3568;
vec3 nodeVar3569;
vec2 nodeVar3570;
vec3 nodeVar3571;
vec2 nodeVar3572;
vec3 nodeVar3573;
vec2 nodeVar3574;
vec3 nodeVar3575;
vec2 nodeVar3576;
vec2 nodeVar3577;
vec3 nodeVar3578;
vec2 nodeVar3579;
vec3 nodeVar3580;
vec2 nodeVar3581;
vec3 nodeVar3582;
vec2 nodeVar3583;
vec3 nodeVar3584;
vec2 nodeVar3585;
vec2 nodeVar3586;
vec3 nodeVar3587;
vec2 nodeVar3588;
vec3 nodeVar3589;
vec2 nodeVar3590;
vec3 nodeVar3591;
vec2 nodeVar3592;
vec3 nodeVar3593;
vec2 nodeVar3594;
vec2 nodeVar3595;
vec3 nodeVar3596;
vec2 nodeVar3597;
vec3 nodeVar3598;
vec2 nodeVar3599;
vec3 nodeVar3600;
vec2 nodeVar3601;
vec3 nodeVar3602;
float nodeVar3603;
vec2 nodeVar3604;
float nodeVar3605;
float nodeVar3606;
vec2 nodeVar3607;
vec2 nodeVar3608;
vec3 nodeVar3609;
vec2 nodeVar3610;
vec3 nodeVar3611;
vec2 nodeVar3612;
vec3 nodeVar3613;
vec2 nodeVar3614;
vec3 nodeVar3615;
vec2 nodeVar3616;
vec2 nodeVar3617;
vec3 nodeVar3618;
vec2 nodeVar3619;
vec3 nodeVar3620;
vec2 nodeVar3621;
vec3 nodeVar3622;
vec2 nodeVar3623;
vec3 nodeVar3624;
vec2 nodeVar3625;
vec2 nodeVar3626;
vec3 nodeVar3627;
vec2 nodeVar3628;
vec3 nodeVar3629;
vec2 nodeVar3630;
vec3 nodeVar3631;
vec2 nodeVar3632;
vec3 nodeVar3633;
vec2 nodeVar3634;
vec2 nodeVar3635;
vec3 nodeVar3636;
vec2 nodeVar3637;
vec3 nodeVar3638;
vec2 nodeVar3639;
vec3 nodeVar3640;
vec2 nodeVar3641;
vec3 nodeVar3642;
float nodeVar3643;
vec3 nodeVar3644;
vec4 nodeVar3645;
vec4 nodeVar3646;
vec2 nodeVar3647;
float Metalness;
float Roughness;
vec3 nodeVar3648;
vec3 nodeVar3649;
vec3 nodeVar3650;
vec2 nodeVar3651;
vec2 nodeVar3652;
float nodeVar3653;
vec3 nodeVar3654;
float nodeVar3655;
float nodeVar3656;
float nodeVar3657;
float nodeVar3658;
float nodeVar3659;
float nodeVar3660;
float nodeVar3661;
float nodeVar3662;
float nodeVar3663;
vec2 nodeVar3664;
vec3 nodeVar3665;
float nodeVar3666;
vec2 nodeVar3667;
float nodeVar3668;
float nodeVar3669;
vec2 nodeVar3670;
vec2 nodeVar3671;
vec3 nodeVar3672;
vec2 nodeVar3673;
vec3 nodeVar3674;
vec2 nodeVar3675;
vec3 nodeVar3676;
vec2 nodeVar3677;
vec3 nodeVar3678;
vec2 nodeVar3679;
vec2 nodeVar3680;
vec3 nodeVar3681;
vec2 nodeVar3682;
vec3 nodeVar3683;
vec2 nodeVar3684;
vec3 nodeVar3685;
vec2 nodeVar3686;
vec3 nodeVar3687;
vec2 nodeVar3688;
vec2 nodeVar3689;
vec3 nodeVar3690;
vec2 nodeVar3691;
vec3 nodeVar3692;
vec2 nodeVar3693;
vec3 nodeVar3694;
vec2 nodeVar3695;
vec3 nodeVar3696;
vec2 nodeVar3697;
vec2 nodeVar3698;
vec3 nodeVar3699;
vec2 nodeVar3700;
vec3 nodeVar3701;
vec2 nodeVar3702;
vec3 nodeVar3703;
vec2 nodeVar3704;
vec3 nodeVar3705;
vec2 nodeVar3706;
float nodeVar3707;
float nodeVar3708;
vec2 nodeVar3709;
vec2 nodeVar3710;
vec3 nodeVar3711;
vec2 nodeVar3712;
vec3 nodeVar3713;
vec2 nodeVar3714;
vec3 nodeVar3715;
vec2 nodeVar3716;
vec3 nodeVar3717;
vec2 nodeVar3718;
vec2 nodeVar3719;
vec3 nodeVar3720;
vec2 nodeVar3721;
vec3 nodeVar3722;
vec2 nodeVar3723;
vec3 nodeVar3724;
vec2 nodeVar3725;
vec3 nodeVar3726;
vec2 nodeVar3727;
vec2 nodeVar3728;
vec3 nodeVar3729;
vec2 nodeVar3730;
vec3 nodeVar3731;
vec2 nodeVar3732;
vec3 nodeVar3733;
vec2 nodeVar3734;
vec3 nodeVar3735;
vec2 nodeVar3736;
vec2 nodeVar3737;
vec3 nodeVar3738;
vec2 nodeVar3739;
vec3 nodeVar3740;
vec2 nodeVar3741;
vec3 nodeVar3742;
vec2 nodeVar3743;
vec3 nodeVar3744;
vec2 nodeVar3745;
float nodeVar3746;
float nodeVar3747;
vec2 nodeVar3748;
vec2 nodeVar3749;
vec3 nodeVar3750;
vec2 nodeVar3751;
vec3 nodeVar3752;
vec2 nodeVar3753;
vec3 nodeVar3754;
vec2 nodeVar3755;
vec3 nodeVar3756;
vec2 nodeVar3757;
vec2 nodeVar3758;
vec3 nodeVar3759;
vec2 nodeVar3760;
vec3 nodeVar3761;
vec2 nodeVar3762;
vec3 nodeVar3763;
vec2 nodeVar3764;
vec3 nodeVar3765;
vec2 nodeVar3766;
vec2 nodeVar3767;
vec3 nodeVar3768;
vec2 nodeVar3769;
vec3 nodeVar3770;
vec2 nodeVar3771;
vec3 nodeVar3772;
vec2 nodeVar3773;
vec3 nodeVar3774;
vec2 nodeVar3775;
vec2 nodeVar3776;
vec3 nodeVar3777;
vec2 nodeVar3778;
vec3 nodeVar3779;
vec2 nodeVar3780;
vec3 nodeVar3781;
vec2 nodeVar3782;
vec3 nodeVar3783;
vec2 nodeVar3784;
float nodeVar3785;
float nodeVar3786;
vec2 nodeVar3787;
vec2 nodeVar3788;
vec3 nodeVar3789;
vec2 nodeVar3790;
vec3 nodeVar3791;
vec2 nodeVar3792;
vec3 nodeVar3793;
vec2 nodeVar3794;
vec3 nodeVar3795;
vec2 nodeVar3796;
vec2 nodeVar3797;
vec3 nodeVar3798;
vec2 nodeVar3799;
vec3 nodeVar3800;
vec2 nodeVar3801;
vec3 nodeVar3802;
vec2 nodeVar3803;
vec3 nodeVar3804;
vec2 nodeVar3805;
vec2 nodeVar3806;
vec3 nodeVar3807;
vec2 nodeVar3808;
vec3 nodeVar3809;
vec2 nodeVar3810;
vec3 nodeVar3811;
vec2 nodeVar3812;
vec3 nodeVar3813;
vec2 nodeVar3814;
vec2 nodeVar3815;
vec3 nodeVar3816;
vec2 nodeVar3817;
vec3 nodeVar3818;
vec2 nodeVar3819;
vec3 nodeVar3820;
vec2 nodeVar3821;
vec3 nodeVar3822;
float nodeVar3823;
float nodeVar3824;
float nodeVar3825;
float nodeVar3826;
float nodeVar3827;
float nodeVar3828;
float nodeVar3829;
vec2 nodeVar3830;
vec3 nodeVar3831;
float nodeVar3832;
vec2 nodeVar3833;
float nodeVar3834;
float nodeVar3835;
vec2 nodeVar3836;
vec2 nodeVar3837;
vec3 nodeVar3838;
vec2 nodeVar3839;
vec3 nodeVar3840;
vec2 nodeVar3841;
vec3 nodeVar3842;
vec2 nodeVar3843;
vec3 nodeVar3844;
vec2 nodeVar3845;
vec2 nodeVar3846;
vec3 nodeVar3847;
vec2 nodeVar3848;
vec3 nodeVar3849;
vec2 nodeVar3850;
vec3 nodeVar3851;
vec2 nodeVar3852;
vec3 nodeVar3853;
vec2 nodeVar3854;
vec2 nodeVar3855;
vec3 nodeVar3856;
vec2 nodeVar3857;
vec3 nodeVar3858;
vec2 nodeVar3859;
vec3 nodeVar3860;
vec2 nodeVar3861;
vec3 nodeVar3862;
vec2 nodeVar3863;
vec2 nodeVar3864;
vec3 nodeVar3865;
vec2 nodeVar3866;
vec3 nodeVar3867;
vec2 nodeVar3868;
vec3 nodeVar3869;
vec2 nodeVar3870;
vec3 nodeVar3871;
float nodeVar3872;
float nodeVar3873;
float nodeVar3874;
vec2 nodeVar3875;
float nodeVar3876;
float nodeVar3877;
vec2 nodeVar3878;
vec2 nodeVar3879;
vec3 nodeVar3880;
vec2 nodeVar3881;
vec3 nodeVar3882;
vec2 nodeVar3883;
vec3 nodeVar3884;
vec2 nodeVar3885;
vec3 nodeVar3886;
vec2 nodeVar3887;
vec2 nodeVar3888;
vec3 nodeVar3889;
vec2 nodeVar3890;
vec3 nodeVar3891;
vec2 nodeVar3892;
vec3 nodeVar3893;
vec2 nodeVar3894;
vec3 nodeVar3895;
vec2 nodeVar3896;
vec2 nodeVar3897;
vec3 nodeVar3898;
vec2 nodeVar3899;
vec3 nodeVar3900;
vec2 nodeVar3901;
vec3 nodeVar3902;
vec2 nodeVar3903;
vec3 nodeVar3904;
vec2 nodeVar3905;
vec2 nodeVar3906;
vec3 nodeVar3907;
vec2 nodeVar3908;
vec3 nodeVar3909;
vec2 nodeVar3910;
vec3 nodeVar3911;
vec2 nodeVar3912;
vec3 nodeVar3913;
float nodeVar3914;
float nodeVar3915;
float nodeVar3916;
float nodeVar3917;
float nodeVar3918;
float nodeVar3919;
float nodeVar3920;
float nodeVar3921;
float nodeVar3922;
vec2 nodeVar3923;
float nodeVar3924;
float nodeVar3925;
vec2 nodeVar3926;
vec2 nodeVar3927;
vec3 nodeVar3928;
vec2 nodeVar3929;
vec3 nodeVar3930;
vec2 nodeVar3931;
vec3 nodeVar3932;
vec2 nodeVar3933;
vec3 nodeVar3934;
vec2 nodeVar3935;
vec2 nodeVar3936;
vec3 nodeVar3937;
vec2 nodeVar3938;
vec3 nodeVar3939;
vec2 nodeVar3940;
vec3 nodeVar3941;
vec2 nodeVar3942;
vec3 nodeVar3943;
vec2 nodeVar3944;
vec2 nodeVar3945;
vec3 nodeVar3946;
vec2 nodeVar3947;
vec3 nodeVar3948;
vec2 nodeVar3949;
vec3 nodeVar3950;
vec2 nodeVar3951;
vec3 nodeVar3952;
vec2 nodeVar3953;
vec2 nodeVar3954;
vec3 nodeVar3955;
vec2 nodeVar3956;
vec3 nodeVar3957;
vec2 nodeVar3958;
vec3 nodeVar3959;
vec2 nodeVar3960;
vec3 nodeVar3961;
float nodeVar3962;
vec2 nodeVar3963;
vec3 nodeVar3964;
float nodeVar3965;
vec2 nodeVar3966;
float nodeVar3967;
float nodeVar3968;
vec2 nodeVar3969;
vec2 nodeVar3970;
vec3 nodeVar3971;
vec2 nodeVar3972;
vec3 nodeVar3973;
vec2 nodeVar3974;
vec3 nodeVar3975;
vec2 nodeVar3976;
vec3 nodeVar3977;
vec2 nodeVar3978;
vec2 nodeVar3979;
vec3 nodeVar3980;
vec2 nodeVar3981;
vec3 nodeVar3982;
vec2 nodeVar3983;
vec3 nodeVar3984;
vec2 nodeVar3985;
vec3 nodeVar3986;
vec2 nodeVar3987;
vec2 nodeVar3988;
vec3 nodeVar3989;
vec2 nodeVar3990;
vec3 nodeVar3991;
vec2 nodeVar3992;
vec3 nodeVar3993;
vec2 nodeVar3994;
vec3 nodeVar3995;
vec2 nodeVar3996;
vec2 nodeVar3997;
vec3 nodeVar3998;
vec2 nodeVar3999;
vec3 nodeVar4000;
vec2 nodeVar4001;
vec3 nodeVar4002;
vec2 nodeVar4003;
vec3 nodeVar4004;
float nodeVar4005;
vec2 nodeVar4006;
float nodeVar4007;
float nodeVar4008;
vec2 nodeVar4009;
vec2 nodeVar4010;
vec3 nodeVar4011;
vec2 nodeVar4012;
vec3 nodeVar4013;
vec2 nodeVar4014;
vec3 nodeVar4015;
vec2 nodeVar4016;
vec3 nodeVar4017;
vec2 nodeVar4018;
vec2 nodeVar4019;
vec3 nodeVar4020;
vec2 nodeVar4021;
vec3 nodeVar4022;
vec2 nodeVar4023;
vec3 nodeVar4024;
vec2 nodeVar4025;
vec3 nodeVar4026;
vec2 nodeVar4027;
vec2 nodeVar4028;
vec3 nodeVar4029;
vec2 nodeVar4030;
vec3 nodeVar4031;
vec2 nodeVar4032;
vec3 nodeVar4033;
vec2 nodeVar4034;
vec3 nodeVar4035;
vec2 nodeVar4036;
vec2 nodeVar4037;
vec3 nodeVar4038;
vec2 nodeVar4039;
vec3 nodeVar4040;
vec2 nodeVar4041;
vec3 nodeVar4042;
vec2 nodeVar4043;
vec3 nodeVar4044;
vec2 nodeVar4045;
float nodeVar4046;
float nodeVar4047;
vec2 nodeVar4048;
vec2 nodeVar4049;
vec3 nodeVar4050;
vec2 nodeVar4051;
vec3 nodeVar4052;
vec2 nodeVar4053;
vec3 nodeVar4054;
vec2 nodeVar4055;
vec3 nodeVar4056;
vec2 nodeVar4057;
vec2 nodeVar4058;
vec3 nodeVar4059;
vec2 nodeVar4060;
vec3 nodeVar4061;
vec2 nodeVar4062;
vec3 nodeVar4063;
vec2 nodeVar4064;
vec3 nodeVar4065;
vec2 nodeVar4066;
vec2 nodeVar4067;
vec3 nodeVar4068;
vec2 nodeVar4069;
vec3 nodeVar4070;
vec2 nodeVar4071;
vec3 nodeVar4072;
vec2 nodeVar4073;
vec3 nodeVar4074;
vec2 nodeVar4075;
vec2 nodeVar4076;
vec3 nodeVar4077;
vec2 nodeVar4078;
vec3 nodeVar4079;
vec2 nodeVar4080;
vec3 nodeVar4081;
vec2 nodeVar4082;
vec3 nodeVar4083;
float nodeVar4084;
vec2 nodeVar4085;
float nodeVar4086;
float nodeVar4087;
vec2 nodeVar4088;
vec2 nodeVar4089;
vec3 nodeVar4090;
vec2 nodeVar4091;
vec3 nodeVar4092;
vec2 nodeVar4093;
vec3 nodeVar4094;
vec2 nodeVar4095;
vec3 nodeVar4096;
vec2 nodeVar4097;
vec2 nodeVar4098;
vec3 nodeVar4099;
vec2 nodeVar4100;
vec3 nodeVar4101;
vec2 nodeVar4102;
vec3 nodeVar4103;
vec2 nodeVar4104;
vec3 nodeVar4105;
vec2 nodeVar4106;
vec2 nodeVar4107;
vec3 nodeVar4108;
vec2 nodeVar4109;
vec3 nodeVar4110;
vec2 nodeVar4111;
vec3 nodeVar4112;
vec2 nodeVar4113;
vec3 nodeVar4114;
vec2 nodeVar4115;
vec2 nodeVar4116;
vec3 nodeVar4117;
vec2 nodeVar4118;
vec3 nodeVar4119;
vec2 nodeVar4120;
vec3 nodeVar4121;
vec2 nodeVar4122;
vec3 nodeVar4123;
float nodeVar4124;
vec2 nodeVar4125;
float nodeVar4126;
float nodeVar4127;
vec2 nodeVar4128;
vec2 nodeVar4129;
vec3 nodeVar4130;
vec2 nodeVar4131;
vec3 nodeVar4132;
vec2 nodeVar4133;
vec3 nodeVar4134;
vec2 nodeVar4135;
vec3 nodeVar4136;
vec2 nodeVar4137;
vec2 nodeVar4138;
vec3 nodeVar4139;
vec2 nodeVar4140;
vec3 nodeVar4141;
vec2 nodeVar4142;
vec3 nodeVar4143;
vec2 nodeVar4144;
vec3 nodeVar4145;
vec2 nodeVar4146;
vec2 nodeVar4147;
vec3 nodeVar4148;
vec2 nodeVar4149;
vec3 nodeVar4150;
vec2 nodeVar4151;
vec3 nodeVar4152;
vec2 nodeVar4153;
vec3 nodeVar4154;
vec2 nodeVar4155;
float nodeVar4156;
float nodeVar4157;
vec2 nodeVar4158;
vec2 nodeVar4159;
vec3 nodeVar4160;
vec2 nodeVar4161;
vec3 nodeVar4162;
vec2 nodeVar4163;
vec3 nodeVar4164;
vec2 nodeVar4165;
vec3 nodeVar4166;
vec2 nodeVar4167;
vec2 nodeVar4168;
vec3 nodeVar4169;
vec2 nodeVar4170;
vec3 nodeVar4171;
vec2 nodeVar4172;
vec3 nodeVar4173;
vec2 nodeVar4174;
vec3 nodeVar4175;
vec2 nodeVar4176;
vec2 nodeVar4177;
vec3 nodeVar4178;
vec2 nodeVar4179;
vec3 nodeVar4180;
vec2 nodeVar4181;
vec3 nodeVar4182;
vec2 nodeVar4183;
vec3 nodeVar4184;
vec2 nodeVar4185;
vec2 nodeVar4186;
vec2 nodeVar4187;
vec2 nodeVar4188;
float nodeVar4189;
float nodeVar4190;
vec2 nodeVar4191;
vec2 nodeVar4192;
vec3 nodeVar4193;
vec2 nodeVar4194;
vec3 nodeVar4195;
float nodeVar4196;
vec2 nodeVar4197;
vec3 nodeVar4198;
vec2 nodeVar4199;
vec3 nodeVar4200;
float nodeVar4201;
vec2 nodeVar4202;
vec3 nodeVar4203;
vec2 nodeVar4204;
vec3 nodeVar4205;
float nodeVar4206;
vec2 nodeVar4207;
vec3 nodeVar4208;
vec2 nodeVar4209;
vec3 nodeVar4210;
float nodeVar4211;
vec2 nodeVar4212;
vec3 nodeVar4213;
vec2 nodeVar4214;
vec3 nodeVar4215;
float nodeVar4216;
vec2 nodeVar4217;
vec3 nodeVar4218;
vec2 nodeVar4219;
vec3 nodeVar4220;
float nodeVar4221;
vec2 nodeVar4222;
vec3 nodeVar4223;
vec2 nodeVar4224;
vec3 nodeVar4225;
float nodeVar4226;
vec2 nodeVar4227;
vec3 nodeVar4228;
vec2 nodeVar4229;
vec3 nodeVar4230;
float nodeVar4231;
vec2 nodeVar4232;
vec3 nodeVar4233;
vec2 nodeVar4234;
vec3 nodeVar4235;
float nodeVar4236;
float nodeVar4237;
vec2 nodeVar4238;
vec3 nodeVar4239;
float nodeVar4240;
vec2 nodeVar4241;
float nodeVar4242;
float nodeVar4243;
vec2 nodeVar4244;
vec2 nodeVar4245;
vec3 nodeVar4246;
vec2 nodeVar4247;
vec3 nodeVar4248;
vec2 nodeVar4249;
vec3 nodeVar4250;
vec2 nodeVar4251;
vec3 nodeVar4252;
vec2 nodeVar4253;
vec2 nodeVar4254;
vec3 nodeVar4255;
vec2 nodeVar4256;
vec3 nodeVar4257;
vec2 nodeVar4258;
vec3 nodeVar4259;
vec2 nodeVar4260;
vec3 nodeVar4261;
vec2 nodeVar4262;
vec2 nodeVar4263;
vec3 nodeVar4264;
vec2 nodeVar4265;
vec3 nodeVar4266;
vec2 nodeVar4267;
vec3 nodeVar4268;
vec2 nodeVar4269;
vec3 nodeVar4270;
vec2 nodeVar4271;
vec2 nodeVar4272;
vec3 nodeVar4273;
vec2 nodeVar4274;
vec3 nodeVar4275;
vec2 nodeVar4276;
vec3 nodeVar4277;
vec2 nodeVar4278;
vec3 nodeVar4279;
vec2 nodeVar4280;
float nodeVar4281;
float nodeVar4282;
vec2 nodeVar4283;
vec2 nodeVar4284;
vec3 nodeVar4285;
vec2 nodeVar4286;
vec3 nodeVar4287;
vec2 nodeVar4288;
vec3 nodeVar4289;
vec2 nodeVar4290;
vec3 nodeVar4291;
vec2 nodeVar4292;
vec2 nodeVar4293;
vec3 nodeVar4294;
vec2 nodeVar4295;
vec3 nodeVar4296;
vec2 nodeVar4297;
vec3 nodeVar4298;
vec2 nodeVar4299;
vec3 nodeVar4300;
vec2 nodeVar4301;
vec2 nodeVar4302;
vec3 nodeVar4303;
vec2 nodeVar4304;
vec3 nodeVar4305;
vec2 nodeVar4306;
vec3 nodeVar4307;
vec2 nodeVar4308;
vec3 nodeVar4309;
vec2 nodeVar4310;
vec2 nodeVar4311;
vec3 nodeVar4312;
vec2 nodeVar4313;
vec3 nodeVar4314;
vec2 nodeVar4315;
vec3 nodeVar4316;
vec2 nodeVar4317;
vec3 nodeVar4318;
vec2 nodeVar4319;
float nodeVar4320;
float nodeVar4321;
vec2 nodeVar4322;
vec2 nodeVar4323;
vec3 nodeVar4324;
vec2 nodeVar4325;
vec3 nodeVar4326;
vec2 nodeVar4327;
vec3 nodeVar4328;
vec2 nodeVar4329;
vec3 nodeVar4330;
vec2 nodeVar4331;
vec2 nodeVar4332;
vec3 nodeVar4333;
vec2 nodeVar4334;
vec3 nodeVar4335;
vec2 nodeVar4336;
vec3 nodeVar4337;
vec2 nodeVar4338;
vec3 nodeVar4339;
vec2 nodeVar4340;
vec2 nodeVar4341;
vec3 nodeVar4342;
vec2 nodeVar4343;
vec3 nodeVar4344;
vec2 nodeVar4345;
vec3 nodeVar4346;
vec2 nodeVar4347;
vec3 nodeVar4348;
vec2 nodeVar4349;
vec2 nodeVar4350;
vec3 nodeVar4351;
vec2 nodeVar4352;
vec3 nodeVar4353;
vec2 nodeVar4354;
vec3 nodeVar4355;
vec2 nodeVar4356;
vec3 nodeVar4357;
float nodeVar4358;
vec2 nodeVar4359;
float nodeVar4360;
float nodeVar4361;
vec2 nodeVar4362;
vec2 nodeVar4363;
vec3 nodeVar4364;
vec2 nodeVar4365;
vec3 nodeVar4366;
vec2 nodeVar4367;
vec3 nodeVar4368;
vec2 nodeVar4369;
vec3 nodeVar4370;
vec2 nodeVar4371;
vec2 nodeVar4372;
vec3 nodeVar4373;
vec2 nodeVar4374;
vec3 nodeVar4375;
vec2 nodeVar4376;
vec3 nodeVar4377;
vec2 nodeVar4378;
vec3 nodeVar4379;
vec2 nodeVar4380;
vec2 nodeVar4381;
vec3 nodeVar4382;
vec2 nodeVar4383;
vec3 nodeVar4384;
vec2 nodeVar4385;
vec3 nodeVar4386;
vec2 nodeVar4387;
vec3 nodeVar4388;
vec2 nodeVar4389;
vec2 nodeVar4390;
vec3 nodeVar4391;
vec2 nodeVar4392;
vec3 nodeVar4393;
vec2 nodeVar4394;
vec3 nodeVar4395;
vec2 nodeVar4396;
vec3 nodeVar4397;
vec2 nodeVar4398;
float nodeVar4399;
float nodeVar4400;
vec2 nodeVar4401;
vec2 nodeVar4402;
vec3 nodeVar4403;
vec2 nodeVar4404;
vec3 nodeVar4405;
vec2 nodeVar4406;
vec3 nodeVar4407;
vec2 nodeVar4408;
vec3 nodeVar4409;
vec2 nodeVar4410;
vec2 nodeVar4411;
vec3 nodeVar4412;
vec2 nodeVar4413;
vec3 nodeVar4414;
vec2 nodeVar4415;
vec3 nodeVar4416;
vec2 nodeVar4417;
vec3 nodeVar4418;
vec2 nodeVar4419;
vec2 nodeVar4420;
vec3 nodeVar4421;
vec2 nodeVar4422;
vec3 nodeVar4423;
vec2 nodeVar4424;
vec3 nodeVar4425;
vec2 nodeVar4426;
vec3 nodeVar4427;
vec2 nodeVar4428;
vec2 nodeVar4429;
vec3 nodeVar4430;
vec2 nodeVar4431;
vec3 nodeVar4432;
vec2 nodeVar4433;
vec3 nodeVar4434;
vec2 nodeVar4435;
vec3 nodeVar4436;
float nodeVar4437;
vec2 nodeVar4438;
float nodeVar4439;
float nodeVar4440;
vec2 nodeVar4441;
vec2 nodeVar4442;
vec3 nodeVar4443;
vec2 nodeVar4444;
vec3 nodeVar4445;
vec2 nodeVar4446;
vec3 nodeVar4447;
vec2 nodeVar4448;
vec3 nodeVar4449;
vec2 nodeVar4450;
vec2 nodeVar4451;
vec3 nodeVar4452;
vec2 nodeVar4453;
vec3 nodeVar4454;
vec2 nodeVar4455;
vec3 nodeVar4456;
vec2 nodeVar4457;
vec3 nodeVar4458;
vec2 nodeVar4459;
vec2 nodeVar4460;
vec3 nodeVar4461;
vec2 nodeVar4462;
vec3 nodeVar4463;
vec2 nodeVar4464;
vec3 nodeVar4465;
vec2 nodeVar4466;
vec3 nodeVar4467;
vec2 nodeVar4468;
vec2 nodeVar4469;
vec3 nodeVar4470;
vec2 nodeVar4471;
vec3 nodeVar4472;
vec2 nodeVar4473;
vec3 nodeVar4474;
vec2 nodeVar4475;
vec3 nodeVar4476;
vec2 nodeVar4477;
float nodeVar4478;
float nodeVar4479;
vec2 nodeVar4480;
vec2 nodeVar4481;
vec3 nodeVar4482;
vec2 nodeVar4483;
vec3 nodeVar4484;
vec2 nodeVar4485;
vec3 nodeVar4486;
vec2 nodeVar4487;
vec3 nodeVar4488;
vec2 nodeVar4489;
vec2 nodeVar4490;
vec3 nodeVar4491;
vec2 nodeVar4492;
vec3 nodeVar4493;
vec2 nodeVar4494;
vec3 nodeVar4495;
vec2 nodeVar4496;
vec3 nodeVar4497;
vec2 nodeVar4498;
vec2 nodeVar4499;
vec3 nodeVar4500;
vec2 nodeVar4501;
vec3 nodeVar4502;
vec2 nodeVar4503;
vec3 nodeVar4504;
vec2 nodeVar4505;
vec3 nodeVar4506;
vec2 nodeVar4507;
vec2 nodeVar4508;
vec3 nodeVar4509;
vec2 nodeVar4510;
vec3 nodeVar4511;
vec2 nodeVar4512;
vec3 nodeVar4513;
vec2 nodeVar4514;
vec3 nodeVar4515;
float nodeVar4516;
vec2 nodeVar4517;
float nodeVar4518;
float nodeVar4519;
vec2 nodeVar4520;
vec2 nodeVar4521;
vec3 nodeVar4522;
vec2 nodeVar4523;
vec3 nodeVar4524;
vec2 nodeVar4525;
vec3 nodeVar4526;
vec2 nodeVar4527;
vec3 nodeVar4528;
vec2 nodeVar4529;
vec2 nodeVar4530;
vec3 nodeVar4531;
vec2 nodeVar4532;
vec3 nodeVar4533;
vec2 nodeVar4534;
vec3 nodeVar4535;
vec2 nodeVar4536;
vec3 nodeVar4537;
vec2 nodeVar4538;
vec2 nodeVar4539;
vec3 nodeVar4540;
vec2 nodeVar4541;
vec3 nodeVar4542;
vec2 nodeVar4543;
vec3 nodeVar4544;
vec2 nodeVar4545;
vec3 nodeVar4546;
vec2 nodeVar4547;
vec2 nodeVar4548;
vec3 nodeVar4549;
vec2 nodeVar4550;
vec3 nodeVar4551;
vec2 nodeVar4552;
vec3 nodeVar4553;
vec2 nodeVar4554;
vec3 nodeVar4555;
float nodeVar4556;
vec3 nodeVar4557;
vec3 nodeVar4558;
vec3 SpecularColor;
vec3 SpecularColorBlended;
float SpecularF90;
vec3 DiffuseContribution;
vec3 EmissiveColor;
vec4 Output;
vec3 nodeVar4559;
vec4 nodeVar4560;
vec4 nodeVar4561;
vec3 nodeVar4562;
vec3 nodeVar4563;
float nodeVar4564;
vec3 nodeVar4565;
vec3 nodeVar4566;
vec3 directDiffuse;
vec3 nodeVar4567;
vec3 nodeVar4568;
vec3 nodeVar4569;
vec3 directSpecular;
vec3 positionViewDirection;
vec3 nodeVar4570;
float nodeVar4571;
float nodeVar4572;
float nodeVar4573;
vec2 nodeVar4574;
vec2 nodeVar4575;
bool nodeVar4576;
vec2 nodeVar4577;
vec4 nodeVar4578;
vec2 nodeVar4579;
vec2 nodeVar4580;
bool nodeVar4581;
vec2 nodeVar4582;
vec4 nodeVar4583;
vec3 nodeVar4584;
float nodeVar4585;
float nodeVar4586;
vec3 nodeVar4587;
vec3 nodeVar4588;
vec3 nodeVar4589;
vec3 irradiance;
float nodeVar4590;
float nodeVar4591;
float nodeVar4592;
vec3 nodeVar4593;
vec3 nodeVar4594;
vec3 nodeVar4595;
vec3 nodeVar4596;
vec3 nodeVar4597;
vec3 indirectDiffuse;
vec3 nodeVar4598;
vec3 singleScatteringDielectric;
vec3 multiScatteringDielectric;
vec3 singleScatteringMetallic;
vec3 multiScatteringMetallic;
float nodeVar4599;
vec2 nodeVar4600;
vec2 nodeVar4601;
bool nodeVar4602;
vec2 nodeVar4603;
vec4 nodeVar4604;
vec3 nodeVar4605;
float nodeVar4606;
vec3 nodeVar4607;
vec3 nodeVar4608;
vec3 nodeVar4609;
vec3 nodeVar4610;
vec3 nodeVar4611;
vec3 nodeVar4612;
vec3 nodeVar4613;
float nodeVar4614;
float nodeVar4615;
float nodeVar4616;
vec3 nodeVar4617;
vec3 nodeVar4618;
vec3 nodeVar4619;
vec3 nodeVar4620;
vec3 nodeVar4621;
vec3 nodeVar4622;
float nodeVar4623;
vec2 nodeVar4624;
vec2 nodeVar4625;
bool nodeVar4626;
vec2 nodeVar4627;
vec4 nodeVar4628;
vec3 nodeVar4629;
float nodeVar4630;
vec3 nodeVar4631;
vec3 nodeVar4632;
vec3 nodeVar4633;
vec3 nodeVar4634;
vec3 nodeVar4635;
vec3 nodeVar4636;
vec3 nodeVar4637;
float nodeVar4638;
float nodeVar4639;
float nodeVar4640;
vec3 nodeVar4641;
vec3 nodeVar4642;
vec3 nodeVar4643;
vec3 nodeVar4644;
vec3 nodeVar4645;
vec3 nodeVar4646;
vec3 radiance;
vec3 nodeVar4647;
vec3 nodeVar4648;
vec3 nodeVar4649;
vec3 iblIrradiance;
vec3 nodeVar4650;
vec3 nodeVar4651;
vec3 nodeVar4652;
vec3 nodeVar4653;
vec3 nodeVar4654;
vec3 nodeVar4655;
vec3 nodeVar4656;
vec3 nodeVar4657;
vec3 nodeVar4658;
vec3 nodeVar4659;
vec3 indirectSpecular;
vec3 nodeVar4660;
vec3 nodeVar4661;
float ambientOcclusion;
vec3 nodeVar4662;
float nodeVar4663;
float nodeVar4664;
float nodeVar4665;
float nodeVar4666;
float nodeVar4667;
float nodeVar4668;
float nodeVar4669;
float nodeVar4670;
float nodeVar4671;
float nodeVar4672;
float nodeVar4673;
vec3 nodeVar4674;
vec3 totalDiffuse;
vec3 nodeVar4675;
vec3 totalSpecular;
vec3 nodeVar4676;
vec3 outgoingLight;
vec3 nodeVar4677;
vec4 nodeVar4678;

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

	nodeVar0 = v_positionWorld;
	nodeVar1 = length( ( v_positionWorld - cameraPosition ) );
	nodeVar2 = ( 0.006 + ( nodeVar1 * 0.00035 ) );
	nodeVar3 = v_positionWorld;
	normalViewGeometry = normalize( v_normalViewGeometry );
	NORMAL_normalView = normalViewGeometry;
	NORMAL_normalWorld = normalize( ( vec4( NORMAL_normalView, 0.0 ) * cameraViewMatrix ).xyz );
	NORMAL_nodeVar4 = NORMAL_normalWorld;
	nodeVar5 = abs( NORMAL_nodeVar4 );
	nodeVar6 = vec2( 0.0, 0.0 );

	if ( ( nodeVar5.y > max( nodeVar5.x, nodeVar5.z ) ) ) {

		nodeVar6 = nodeVar3.xz;
		

	} else {


		if ( ( nodeVar5.x > nodeVar5.z ) ) {

			nodeVar6 = vec2( nodeVar3.z, nodeVar3.y );
			

		} else {

			nodeVar6 = vec2( nodeVar3.x, nodeVar3.y );
			

		}

		

	}

	NORMAL_nodeVar7 = nodeVar6;
	nodeVar8 = floor( nodeVarying7 );
	nodeVar9 = nodeVar8;
	nodeVar10 = vec3( 0.0, 1.0, 0.5 );

	if ( ( nodeVar9 < 0.5 ) ) {

		nodeVar11 = floor( ( NORMAL_nodeVar7.y / 0.225 ) );
		nodeVar12 = fract( ( ( nodeVar11 * 7.13 ) * 0.1031 ) );
		nodeVar12 = ( nodeVar12 * ( nodeVar12 + 33.33 ) );
		nodeVar12 = ( nodeVar12 * ( nodeVar12 + nodeVar12 ) );
		nodeVar13 = ( fract( nodeVar12 ) * 0.9 );
		nodeVar14 = fract( ( ( ( nodeVar11 * 3.7 ) + 11.0 ) * 0.1031 ) );
		nodeVar14 = ( nodeVar14 * ( nodeVar14 + 33.33 ) );
		nodeVar14 = ( nodeVar14 * ( nodeVar14 + nodeVar14 ) );
		nodeVar15 = ( 0.42 + ( fract( nodeVar14 ) * 0.42 ) );
		nodeVar16 = fract( ( ( NORMAL_nodeVar7.x + nodeVar13 ) / nodeVar15 ) );
		nodeVar17 = fract( ( NORMAL_nodeVar7.y / 0.225 ) );
		nodeVar18 = min( ( min( nodeVar16, ( 1.0 - nodeVar16 ) ) * nodeVar15 ), ( min( nodeVar17, ( 1.0 - nodeVar17 ) ) * 0.225 ) );
		nodeVar19 = smoothstep( 0.0, 0.016, nodeVar18 );
		nodeVar20 = ( vec2( floor( ( ( NORMAL_nodeVar7.x + nodeVar13 ) / nodeVar15 ) ), nodeVar11 ) * vec2( 1.37 ) );
		nodeVar21 = fract( ( vec3( nodeVar20.x, nodeVar20.y, nodeVar20.x ) * vec3( 0.1031 ) ) );
		nodeVar21 = ( nodeVar21 + vec3( dot( nodeVar21, ( nodeVar21.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar22 = fract( ( ( nodeVar21.x + nodeVar21.y ) * nodeVar21.z ) );
		nodeVar23 = ( ( NORMAL_nodeVar7 * vec2( 22.0 ) ) + vec2( ( nodeVar22 * 30.0 ) ) );
		nodeVar24 = 0.0;
		nodeVar25 = 0.5;
		nodeVar26 = floor( nodeVar23 );
		nodeVar27 = fract( nodeVar23 );
		nodeVar27 = ( ( nodeVar27 * nodeVar27 ) * ( vec2( 3.0 ) - ( nodeVar27 * vec2( 2.0 ) ) ) );
		nodeVar28 = fract( ( vec3( nodeVar26.x, nodeVar26.y, nodeVar26.x ) * vec3( 0.1031 ) ) );
		nodeVar28 = ( nodeVar28 + vec3( dot( nodeVar28, ( nodeVar28.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar29 = ( nodeVar26 + vec2( 1.0, 0.0 ) );
		nodeVar30 = fract( ( vec3( nodeVar29.x, nodeVar29.y, nodeVar29.x ) * vec3( 0.1031 ) ) );
		nodeVar30 = ( nodeVar30 + vec3( dot( nodeVar30, ( nodeVar30.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar31 = ( nodeVar26 + vec2( 0.0, 1.0 ) );
		nodeVar32 = fract( ( vec3( nodeVar31.x, nodeVar31.y, nodeVar31.x ) * vec3( 0.1031 ) ) );
		nodeVar32 = ( nodeVar32 + vec3( dot( nodeVar32, ( nodeVar32.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar33 = ( nodeVar26 + vec2( 1.0, 1.0 ) );
		nodeVar34 = fract( ( vec3( nodeVar33.x, nodeVar33.y, nodeVar33.x ) * vec3( 0.1031 ) ) );
		nodeVar34 = ( nodeVar34 + vec3( dot( nodeVar34, ( nodeVar34.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar24 = ( nodeVar24 + ( nodeVar25 * mix( mix( fract( ( ( nodeVar28.x + nodeVar28.y ) * nodeVar28.z ) ), fract( ( ( nodeVar30.x + nodeVar30.y ) * nodeVar30.z ) ), nodeVar27.x ), mix( fract( ( ( nodeVar32.x + nodeVar32.y ) * nodeVar32.z ) ), fract( ( ( nodeVar34.x + nodeVar34.y ) * nodeVar34.z ) ), nodeVar27.x ), nodeVar27.y ) ) );
		nodeVar23 = ( nodeVar23 * vec2( 2.03 ) );
		nodeVar25 = ( nodeVar25 * 0.52 );
		nodeVar35 = floor( nodeVar23 );
		nodeVar36 = fract( nodeVar23 );
		nodeVar36 = ( ( nodeVar36 * nodeVar36 ) * ( vec2( 3.0 ) - ( nodeVar36 * vec2( 2.0 ) ) ) );
		nodeVar37 = fract( ( vec3( nodeVar35.x, nodeVar35.y, nodeVar35.x ) * vec3( 0.1031 ) ) );
		nodeVar37 = ( nodeVar37 + vec3( dot( nodeVar37, ( nodeVar37.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar38 = ( nodeVar35 + vec2( 1.0, 0.0 ) );
		nodeVar39 = fract( ( vec3( nodeVar38.x, nodeVar38.y, nodeVar38.x ) * vec3( 0.1031 ) ) );
		nodeVar39 = ( nodeVar39 + vec3( dot( nodeVar39, ( nodeVar39.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar40 = ( nodeVar35 + vec2( 0.0, 1.0 ) );
		nodeVar41 = fract( ( vec3( nodeVar40.x, nodeVar40.y, nodeVar40.x ) * vec3( 0.1031 ) ) );
		nodeVar41 = ( nodeVar41 + vec3( dot( nodeVar41, ( nodeVar41.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar42 = ( nodeVar35 + vec2( 1.0, 1.0 ) );
		nodeVar43 = fract( ( vec3( nodeVar42.x, nodeVar42.y, nodeVar42.x ) * vec3( 0.1031 ) ) );
		nodeVar43 = ( nodeVar43 + vec3( dot( nodeVar43, ( nodeVar43.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar24 = ( nodeVar24 + ( nodeVar25 * mix( mix( fract( ( ( nodeVar37.x + nodeVar37.y ) * nodeVar37.z ) ), fract( ( ( nodeVar39.x + nodeVar39.y ) * nodeVar39.z ) ), nodeVar36.x ), mix( fract( ( ( nodeVar41.x + nodeVar41.y ) * nodeVar41.z ) ), fract( ( ( nodeVar43.x + nodeVar43.y ) * nodeVar43.z ) ), nodeVar36.x ), nodeVar36.y ) ) );
		nodeVar23 = ( nodeVar23 * vec2( 2.03 ) );
		nodeVar25 = ( nodeVar25 * 0.52 );
		nodeVar44 = floor( nodeVar23 );
		nodeVar45 = fract( nodeVar23 );
		nodeVar45 = ( ( nodeVar45 * nodeVar45 ) * ( vec2( 3.0 ) - ( nodeVar45 * vec2( 2.0 ) ) ) );
		nodeVar46 = fract( ( vec3( nodeVar44.x, nodeVar44.y, nodeVar44.x ) * vec3( 0.1031 ) ) );
		nodeVar46 = ( nodeVar46 + vec3( dot( nodeVar46, ( nodeVar46.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar47 = ( nodeVar44 + vec2( 1.0, 0.0 ) );
		nodeVar48 = fract( ( vec3( nodeVar47.x, nodeVar47.y, nodeVar47.x ) * vec3( 0.1031 ) ) );
		nodeVar48 = ( nodeVar48 + vec3( dot( nodeVar48, ( nodeVar48.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar49 = ( nodeVar44 + vec2( 0.0, 1.0 ) );
		nodeVar50 = fract( ( vec3( nodeVar49.x, nodeVar49.y, nodeVar49.x ) * vec3( 0.1031 ) ) );
		nodeVar50 = ( nodeVar50 + vec3( dot( nodeVar50, ( nodeVar50.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar51 = ( nodeVar44 + vec2( 1.0, 1.0 ) );
		nodeVar52 = fract( ( vec3( nodeVar51.x, nodeVar51.y, nodeVar51.x ) * vec3( 0.1031 ) ) );
		nodeVar52 = ( nodeVar52 + vec3( dot( nodeVar52, ( nodeVar52.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar24 = ( nodeVar24 + ( nodeVar25 * mix( mix( fract( ( ( nodeVar46.x + nodeVar46.y ) * nodeVar46.z ) ), fract( ( ( nodeVar48.x + nodeVar48.y ) * nodeVar48.z ) ), nodeVar45.x ), mix( fract( ( ( nodeVar50.x + nodeVar50.y ) * nodeVar50.z ) ), fract( ( ( nodeVar52.x + nodeVar52.y ) * nodeVar52.z ) ), nodeVar45.x ), nodeVar45.y ) ) );
		nodeVar23 = ( nodeVar23 * vec2( 2.03 ) );
		nodeVar25 = ( nodeVar25 * 0.52 );
		nodeVar53 = floor( nodeVar23 );
		nodeVar54 = fract( nodeVar23 );
		nodeVar54 = ( ( nodeVar54 * nodeVar54 ) * ( vec2( 3.0 ) - ( nodeVar54 * vec2( 2.0 ) ) ) );
		nodeVar55 = fract( ( vec3( nodeVar53.x, nodeVar53.y, nodeVar53.x ) * vec3( 0.1031 ) ) );
		nodeVar55 = ( nodeVar55 + vec3( dot( nodeVar55, ( nodeVar55.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar56 = ( nodeVar53 + vec2( 1.0, 0.0 ) );
		nodeVar57 = fract( ( vec3( nodeVar56.x, nodeVar56.y, nodeVar56.x ) * vec3( 0.1031 ) ) );
		nodeVar57 = ( nodeVar57 + vec3( dot( nodeVar57, ( nodeVar57.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar58 = ( nodeVar53 + vec2( 0.0, 1.0 ) );
		nodeVar59 = fract( ( vec3( nodeVar58.x, nodeVar58.y, nodeVar58.x ) * vec3( 0.1031 ) ) );
		nodeVar59 = ( nodeVar59 + vec3( dot( nodeVar59, ( nodeVar59.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar60 = ( nodeVar53 + vec2( 1.0, 1.0 ) );
		nodeVar61 = fract( ( vec3( nodeVar60.x, nodeVar60.y, nodeVar60.x ) * vec3( 0.1031 ) ) );
		nodeVar61 = ( nodeVar61 + vec3( dot( nodeVar61, ( nodeVar61.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar24 = ( nodeVar24 + ( nodeVar25 * mix( mix( fract( ( ( nodeVar55.x + nodeVar55.y ) * nodeVar55.z ) ), fract( ( ( nodeVar57.x + nodeVar57.y ) * nodeVar57.z ) ), nodeVar54.x ), mix( fract( ( ( nodeVar59.x + nodeVar59.y ) * nodeVar59.z ) ), fract( ( ( nodeVar61.x + nodeVar61.y ) * nodeVar61.z ) ), nodeVar54.x ), nodeVar54.y ) ) );
		nodeVar23 = ( nodeVar23 * vec2( 2.03 ) );
		nodeVar25 = ( nodeVar25 * 0.52 );
		nodeVar10 = vec3( ( ( ( nodeVar19 * ( 0.55 + ( nodeVar22 * 0.45 ) ) ) * 0.55 ) + ( ( ( 0.55 + ( nodeVar24 * 0.45 ) ) * 0.3 ) * nodeVar19 ) ), nodeVar19, nodeVar22 );
		

	} else {


		if ( ( nodeVar9 < 1.5 ) ) {

			nodeVar62 = ( NORMAL_nodeVar7 * vec2( 3.2 ) );
			nodeVar63 = 0.0;
			nodeVar64 = 0.5;
			nodeVar65 = floor( nodeVar62 );
			nodeVar66 = fract( nodeVar62 );
			nodeVar66 = ( ( nodeVar66 * nodeVar66 ) * ( vec2( 3.0 ) - ( nodeVar66 * vec2( 2.0 ) ) ) );
			nodeVar67 = fract( ( vec3( nodeVar65.x, nodeVar65.y, nodeVar65.x ) * vec3( 0.1031 ) ) );
			nodeVar67 = ( nodeVar67 + vec3( dot( nodeVar67, ( nodeVar67.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar68 = ( nodeVar65 + vec2( 1.0, 0.0 ) );
			nodeVar69 = fract( ( vec3( nodeVar68.x, nodeVar68.y, nodeVar68.x ) * vec3( 0.1031 ) ) );
			nodeVar69 = ( nodeVar69 + vec3( dot( nodeVar69, ( nodeVar69.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar70 = ( nodeVar65 + vec2( 0.0, 1.0 ) );
			nodeVar71 = fract( ( vec3( nodeVar70.x, nodeVar70.y, nodeVar70.x ) * vec3( 0.1031 ) ) );
			nodeVar71 = ( nodeVar71 + vec3( dot( nodeVar71, ( nodeVar71.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar72 = ( nodeVar65 + vec2( 1.0, 1.0 ) );
			nodeVar73 = fract( ( vec3( nodeVar72.x, nodeVar72.y, nodeVar72.x ) * vec3( 0.1031 ) ) );
			nodeVar73 = ( nodeVar73 + vec3( dot( nodeVar73, ( nodeVar73.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar63 = ( nodeVar63 + ( nodeVar64 * mix( mix( fract( ( ( nodeVar67.x + nodeVar67.y ) * nodeVar67.z ) ), fract( ( ( nodeVar69.x + nodeVar69.y ) * nodeVar69.z ) ), nodeVar66.x ), mix( fract( ( ( nodeVar71.x + nodeVar71.y ) * nodeVar71.z ) ), fract( ( ( nodeVar73.x + nodeVar73.y ) * nodeVar73.z ) ), nodeVar66.x ), nodeVar66.y ) ) );
			nodeVar62 = ( nodeVar62 * vec2( 2.03 ) );
			nodeVar64 = ( nodeVar64 * 0.52 );
			nodeVar74 = floor( nodeVar62 );
			nodeVar75 = fract( nodeVar62 );
			nodeVar75 = ( ( nodeVar75 * nodeVar75 ) * ( vec2( 3.0 ) - ( nodeVar75 * vec2( 2.0 ) ) ) );
			nodeVar76 = fract( ( vec3( nodeVar74.x, nodeVar74.y, nodeVar74.x ) * vec3( 0.1031 ) ) );
			nodeVar76 = ( nodeVar76 + vec3( dot( nodeVar76, ( nodeVar76.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar77 = ( nodeVar74 + vec2( 1.0, 0.0 ) );
			nodeVar78 = fract( ( vec3( nodeVar77.x, nodeVar77.y, nodeVar77.x ) * vec3( 0.1031 ) ) );
			nodeVar78 = ( nodeVar78 + vec3( dot( nodeVar78, ( nodeVar78.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar79 = ( nodeVar74 + vec2( 0.0, 1.0 ) );
			nodeVar80 = fract( ( vec3( nodeVar79.x, nodeVar79.y, nodeVar79.x ) * vec3( 0.1031 ) ) );
			nodeVar80 = ( nodeVar80 + vec3( dot( nodeVar80, ( nodeVar80.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar81 = ( nodeVar74 + vec2( 1.0, 1.0 ) );
			nodeVar82 = fract( ( vec3( nodeVar81.x, nodeVar81.y, nodeVar81.x ) * vec3( 0.1031 ) ) );
			nodeVar82 = ( nodeVar82 + vec3( dot( nodeVar82, ( nodeVar82.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar63 = ( nodeVar63 + ( nodeVar64 * mix( mix( fract( ( ( nodeVar76.x + nodeVar76.y ) * nodeVar76.z ) ), fract( ( ( nodeVar78.x + nodeVar78.y ) * nodeVar78.z ) ), nodeVar75.x ), mix( fract( ( ( nodeVar80.x + nodeVar80.y ) * nodeVar80.z ) ), fract( ( ( nodeVar82.x + nodeVar82.y ) * nodeVar82.z ) ), nodeVar75.x ), nodeVar75.y ) ) );
			nodeVar62 = ( nodeVar62 * vec2( 2.03 ) );
			nodeVar64 = ( nodeVar64 * 0.52 );
			nodeVar83 = floor( nodeVar62 );
			nodeVar84 = fract( nodeVar62 );
			nodeVar84 = ( ( nodeVar84 * nodeVar84 ) * ( vec2( 3.0 ) - ( nodeVar84 * vec2( 2.0 ) ) ) );
			nodeVar85 = fract( ( vec3( nodeVar83.x, nodeVar83.y, nodeVar83.x ) * vec3( 0.1031 ) ) );
			nodeVar85 = ( nodeVar85 + vec3( dot( nodeVar85, ( nodeVar85.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar86 = ( nodeVar83 + vec2( 1.0, 0.0 ) );
			nodeVar87 = fract( ( vec3( nodeVar86.x, nodeVar86.y, nodeVar86.x ) * vec3( 0.1031 ) ) );
			nodeVar87 = ( nodeVar87 + vec3( dot( nodeVar87, ( nodeVar87.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar88 = ( nodeVar83 + vec2( 0.0, 1.0 ) );
			nodeVar89 = fract( ( vec3( nodeVar88.x, nodeVar88.y, nodeVar88.x ) * vec3( 0.1031 ) ) );
			nodeVar89 = ( nodeVar89 + vec3( dot( nodeVar89, ( nodeVar89.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar90 = ( nodeVar83 + vec2( 1.0, 1.0 ) );
			nodeVar91 = fract( ( vec3( nodeVar90.x, nodeVar90.y, nodeVar90.x ) * vec3( 0.1031 ) ) );
			nodeVar91 = ( nodeVar91 + vec3( dot( nodeVar91, ( nodeVar91.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar63 = ( nodeVar63 + ( nodeVar64 * mix( mix( fract( ( ( nodeVar85.x + nodeVar85.y ) * nodeVar85.z ) ), fract( ( ( nodeVar87.x + nodeVar87.y ) * nodeVar87.z ) ), nodeVar84.x ), mix( fract( ( ( nodeVar89.x + nodeVar89.y ) * nodeVar89.z ) ), fract( ( ( nodeVar91.x + nodeVar91.y ) * nodeVar91.z ) ), nodeVar84.x ), nodeVar84.y ) ) );
			nodeVar62 = ( nodeVar62 * vec2( 2.03 ) );
			nodeVar64 = ( nodeVar64 * 0.52 );
			nodeVar92 = floor( nodeVar62 );
			nodeVar93 = fract( nodeVar62 );
			nodeVar93 = ( ( nodeVar93 * nodeVar93 ) * ( vec2( 3.0 ) - ( nodeVar93 * vec2( 2.0 ) ) ) );
			nodeVar94 = fract( ( vec3( nodeVar92.x, nodeVar92.y, nodeVar92.x ) * vec3( 0.1031 ) ) );
			nodeVar94 = ( nodeVar94 + vec3( dot( nodeVar94, ( nodeVar94.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar95 = ( nodeVar92 + vec2( 1.0, 0.0 ) );
			nodeVar96 = fract( ( vec3( nodeVar95.x, nodeVar95.y, nodeVar95.x ) * vec3( 0.1031 ) ) );
			nodeVar96 = ( nodeVar96 + vec3( dot( nodeVar96, ( nodeVar96.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar97 = ( nodeVar92 + vec2( 0.0, 1.0 ) );
			nodeVar98 = fract( ( vec3( nodeVar97.x, nodeVar97.y, nodeVar97.x ) * vec3( 0.1031 ) ) );
			nodeVar98 = ( nodeVar98 + vec3( dot( nodeVar98, ( nodeVar98.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar99 = ( nodeVar92 + vec2( 1.0, 1.0 ) );
			nodeVar100 = fract( ( vec3( nodeVar99.x, nodeVar99.y, nodeVar99.x ) * vec3( 0.1031 ) ) );
			nodeVar100 = ( nodeVar100 + vec3( dot( nodeVar100, ( nodeVar100.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar63 = ( nodeVar63 + ( nodeVar64 * mix( mix( fract( ( ( nodeVar94.x + nodeVar94.y ) * nodeVar94.z ) ), fract( ( ( nodeVar96.x + nodeVar96.y ) * nodeVar96.z ) ), nodeVar93.x ), mix( fract( ( ( nodeVar98.x + nodeVar98.y ) * nodeVar98.z ) ), fract( ( ( nodeVar100.x + nodeVar100.y ) * nodeVar100.z ) ), nodeVar93.x ), nodeVar93.y ) ) );
			nodeVar62 = ( nodeVar62 * vec2( 2.03 ) );
			nodeVar64 = ( nodeVar64 * 0.52 );
			nodeVar101 = ( NORMAL_nodeVar7 * vec2( 14.0 ) );
			nodeVar102 = 0.0;
			nodeVar103 = 0.5;
			nodeVar104 = floor( nodeVar101 );
			nodeVar105 = fract( nodeVar101 );
			nodeVar105 = ( ( nodeVar105 * nodeVar105 ) * ( vec2( 3.0 ) - ( nodeVar105 * vec2( 2.0 ) ) ) );
			nodeVar106 = fract( ( vec3( nodeVar104.x, nodeVar104.y, nodeVar104.x ) * vec3( 0.1031 ) ) );
			nodeVar106 = ( nodeVar106 + vec3( dot( nodeVar106, ( nodeVar106.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar107 = ( nodeVar104 + vec2( 1.0, 0.0 ) );
			nodeVar108 = fract( ( vec3( nodeVar107.x, nodeVar107.y, nodeVar107.x ) * vec3( 0.1031 ) ) );
			nodeVar108 = ( nodeVar108 + vec3( dot( nodeVar108, ( nodeVar108.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar109 = ( nodeVar104 + vec2( 0.0, 1.0 ) );
			nodeVar110 = fract( ( vec3( nodeVar109.x, nodeVar109.y, nodeVar109.x ) * vec3( 0.1031 ) ) );
			nodeVar110 = ( nodeVar110 + vec3( dot( nodeVar110, ( nodeVar110.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar111 = ( nodeVar104 + vec2( 1.0, 1.0 ) );
			nodeVar112 = fract( ( vec3( nodeVar111.x, nodeVar111.y, nodeVar111.x ) * vec3( 0.1031 ) ) );
			nodeVar112 = ( nodeVar112 + vec3( dot( nodeVar112, ( nodeVar112.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar102 = ( nodeVar102 + ( nodeVar103 * mix( mix( fract( ( ( nodeVar106.x + nodeVar106.y ) * nodeVar106.z ) ), fract( ( ( nodeVar108.x + nodeVar108.y ) * nodeVar108.z ) ), nodeVar105.x ), mix( fract( ( ( nodeVar110.x + nodeVar110.y ) * nodeVar110.z ) ), fract( ( ( nodeVar112.x + nodeVar112.y ) * nodeVar112.z ) ), nodeVar105.x ), nodeVar105.y ) ) );
			nodeVar101 = ( nodeVar101 * vec2( 2.03 ) );
			nodeVar103 = ( nodeVar103 * 0.52 );
			nodeVar113 = floor( nodeVar101 );
			nodeVar114 = fract( nodeVar101 );
			nodeVar114 = ( ( nodeVar114 * nodeVar114 ) * ( vec2( 3.0 ) - ( nodeVar114 * vec2( 2.0 ) ) ) );
			nodeVar115 = fract( ( vec3( nodeVar113.x, nodeVar113.y, nodeVar113.x ) * vec3( 0.1031 ) ) );
			nodeVar115 = ( nodeVar115 + vec3( dot( nodeVar115, ( nodeVar115.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar116 = ( nodeVar113 + vec2( 1.0, 0.0 ) );
			nodeVar117 = fract( ( vec3( nodeVar116.x, nodeVar116.y, nodeVar116.x ) * vec3( 0.1031 ) ) );
			nodeVar117 = ( nodeVar117 + vec3( dot( nodeVar117, ( nodeVar117.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar118 = ( nodeVar113 + vec2( 0.0, 1.0 ) );
			nodeVar119 = fract( ( vec3( nodeVar118.x, nodeVar118.y, nodeVar118.x ) * vec3( 0.1031 ) ) );
			nodeVar119 = ( nodeVar119 + vec3( dot( nodeVar119, ( nodeVar119.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar120 = ( nodeVar113 + vec2( 1.0, 1.0 ) );
			nodeVar121 = fract( ( vec3( nodeVar120.x, nodeVar120.y, nodeVar120.x ) * vec3( 0.1031 ) ) );
			nodeVar121 = ( nodeVar121 + vec3( dot( nodeVar121, ( nodeVar121.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar102 = ( nodeVar102 + ( nodeVar103 * mix( mix( fract( ( ( nodeVar115.x + nodeVar115.y ) * nodeVar115.z ) ), fract( ( ( nodeVar117.x + nodeVar117.y ) * nodeVar117.z ) ), nodeVar114.x ), mix( fract( ( ( nodeVar119.x + nodeVar119.y ) * nodeVar119.z ) ), fract( ( ( nodeVar121.x + nodeVar121.y ) * nodeVar121.z ) ), nodeVar114.x ), nodeVar114.y ) ) );
			nodeVar101 = ( nodeVar101 * vec2( 2.03 ) );
			nodeVar103 = ( nodeVar103 * 0.52 );
			nodeVar122 = floor( nodeVar101 );
			nodeVar123 = fract( nodeVar101 );
			nodeVar123 = ( ( nodeVar123 * nodeVar123 ) * ( vec2( 3.0 ) - ( nodeVar123 * vec2( 2.0 ) ) ) );
			nodeVar124 = fract( ( vec3( nodeVar122.x, nodeVar122.y, nodeVar122.x ) * vec3( 0.1031 ) ) );
			nodeVar124 = ( nodeVar124 + vec3( dot( nodeVar124, ( nodeVar124.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar125 = ( nodeVar122 + vec2( 1.0, 0.0 ) );
			nodeVar126 = fract( ( vec3( nodeVar125.x, nodeVar125.y, nodeVar125.x ) * vec3( 0.1031 ) ) );
			nodeVar126 = ( nodeVar126 + vec3( dot( nodeVar126, ( nodeVar126.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar127 = ( nodeVar122 + vec2( 0.0, 1.0 ) );
			nodeVar128 = fract( ( vec3( nodeVar127.x, nodeVar127.y, nodeVar127.x ) * vec3( 0.1031 ) ) );
			nodeVar128 = ( nodeVar128 + vec3( dot( nodeVar128, ( nodeVar128.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar129 = ( nodeVar122 + vec2( 1.0, 1.0 ) );
			nodeVar130 = fract( ( vec3( nodeVar129.x, nodeVar129.y, nodeVar129.x ) * vec3( 0.1031 ) ) );
			nodeVar130 = ( nodeVar130 + vec3( dot( nodeVar130, ( nodeVar130.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar102 = ( nodeVar102 + ( nodeVar103 * mix( mix( fract( ( ( nodeVar124.x + nodeVar124.y ) * nodeVar124.z ) ), fract( ( ( nodeVar126.x + nodeVar126.y ) * nodeVar126.z ) ), nodeVar123.x ), mix( fract( ( ( nodeVar128.x + nodeVar128.y ) * nodeVar128.z ) ), fract( ( ( nodeVar130.x + nodeVar130.y ) * nodeVar130.z ) ), nodeVar123.x ), nodeVar123.y ) ) );
			nodeVar101 = ( nodeVar101 * vec2( 2.03 ) );
			nodeVar103 = ( nodeVar103 * 0.52 );
			nodeVar131 = floor( nodeVar101 );
			nodeVar132 = fract( nodeVar101 );
			nodeVar132 = ( ( nodeVar132 * nodeVar132 ) * ( vec2( 3.0 ) - ( nodeVar132 * vec2( 2.0 ) ) ) );
			nodeVar133 = fract( ( vec3( nodeVar131.x, nodeVar131.y, nodeVar131.x ) * vec3( 0.1031 ) ) );
			nodeVar133 = ( nodeVar133 + vec3( dot( nodeVar133, ( nodeVar133.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar134 = ( nodeVar131 + vec2( 1.0, 0.0 ) );
			nodeVar135 = fract( ( vec3( nodeVar134.x, nodeVar134.y, nodeVar134.x ) * vec3( 0.1031 ) ) );
			nodeVar135 = ( nodeVar135 + vec3( dot( nodeVar135, ( nodeVar135.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar136 = ( nodeVar131 + vec2( 0.0, 1.0 ) );
			nodeVar137 = fract( ( vec3( nodeVar136.x, nodeVar136.y, nodeVar136.x ) * vec3( 0.1031 ) ) );
			nodeVar137 = ( nodeVar137 + vec3( dot( nodeVar137, ( nodeVar137.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar138 = ( nodeVar131 + vec2( 1.0, 1.0 ) );
			nodeVar139 = fract( ( vec3( nodeVar138.x, nodeVar138.y, nodeVar138.x ) * vec3( 0.1031 ) ) );
			nodeVar139 = ( nodeVar139 + vec3( dot( nodeVar139, ( nodeVar139.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar102 = ( nodeVar102 + ( nodeVar103 * mix( mix( fract( ( ( nodeVar133.x + nodeVar133.y ) * nodeVar133.z ) ), fract( ( ( nodeVar135.x + nodeVar135.y ) * nodeVar135.z ) ), nodeVar132.x ), mix( fract( ( ( nodeVar137.x + nodeVar137.y ) * nodeVar137.z ) ), fract( ( ( nodeVar139.x + nodeVar139.y ) * nodeVar139.z ) ), nodeVar132.x ), nodeVar132.y ) ) );
			nodeVar101 = ( nodeVar101 * vec2( 2.03 ) );
			nodeVar103 = ( nodeVar103 * 0.52 );
			nodeVar140 = ( NORMAL_nodeVar7 * vec2( 46.0 ) );
			nodeVar141 = 0.0;
			nodeVar142 = 0.5;
			nodeVar143 = floor( nodeVar140 );
			nodeVar144 = fract( nodeVar140 );
			nodeVar144 = ( ( nodeVar144 * nodeVar144 ) * ( vec2( 3.0 ) - ( nodeVar144 * vec2( 2.0 ) ) ) );
			nodeVar145 = fract( ( vec3( nodeVar143.x, nodeVar143.y, nodeVar143.x ) * vec3( 0.1031 ) ) );
			nodeVar145 = ( nodeVar145 + vec3( dot( nodeVar145, ( nodeVar145.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar146 = ( nodeVar143 + vec2( 1.0, 0.0 ) );
			nodeVar147 = fract( ( vec3( nodeVar146.x, nodeVar146.y, nodeVar146.x ) * vec3( 0.1031 ) ) );
			nodeVar147 = ( nodeVar147 + vec3( dot( nodeVar147, ( nodeVar147.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar148 = ( nodeVar143 + vec2( 0.0, 1.0 ) );
			nodeVar149 = fract( ( vec3( nodeVar148.x, nodeVar148.y, nodeVar148.x ) * vec3( 0.1031 ) ) );
			nodeVar149 = ( nodeVar149 + vec3( dot( nodeVar149, ( nodeVar149.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar150 = ( nodeVar143 + vec2( 1.0, 1.0 ) );
			nodeVar151 = fract( ( vec3( nodeVar150.x, nodeVar150.y, nodeVar150.x ) * vec3( 0.1031 ) ) );
			nodeVar151 = ( nodeVar151 + vec3( dot( nodeVar151, ( nodeVar151.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar141 = ( nodeVar141 + ( nodeVar142 * mix( mix( fract( ( ( nodeVar145.x + nodeVar145.y ) * nodeVar145.z ) ), fract( ( ( nodeVar147.x + nodeVar147.y ) * nodeVar147.z ) ), nodeVar144.x ), mix( fract( ( ( nodeVar149.x + nodeVar149.y ) * nodeVar149.z ) ), fract( ( ( nodeVar151.x + nodeVar151.y ) * nodeVar151.z ) ), nodeVar144.x ), nodeVar144.y ) ) );
			nodeVar140 = ( nodeVar140 * vec2( 2.03 ) );
			nodeVar142 = ( nodeVar142 * 0.52 );
			nodeVar152 = floor( nodeVar140 );
			nodeVar153 = fract( nodeVar140 );
			nodeVar153 = ( ( nodeVar153 * nodeVar153 ) * ( vec2( 3.0 ) - ( nodeVar153 * vec2( 2.0 ) ) ) );
			nodeVar154 = fract( ( vec3( nodeVar152.x, nodeVar152.y, nodeVar152.x ) * vec3( 0.1031 ) ) );
			nodeVar154 = ( nodeVar154 + vec3( dot( nodeVar154, ( nodeVar154.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar155 = ( nodeVar152 + vec2( 1.0, 0.0 ) );
			nodeVar156 = fract( ( vec3( nodeVar155.x, nodeVar155.y, nodeVar155.x ) * vec3( 0.1031 ) ) );
			nodeVar156 = ( nodeVar156 + vec3( dot( nodeVar156, ( nodeVar156.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar157 = ( nodeVar152 + vec2( 0.0, 1.0 ) );
			nodeVar158 = fract( ( vec3( nodeVar157.x, nodeVar157.y, nodeVar157.x ) * vec3( 0.1031 ) ) );
			nodeVar158 = ( nodeVar158 + vec3( dot( nodeVar158, ( nodeVar158.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar159 = ( nodeVar152 + vec2( 1.0, 1.0 ) );
			nodeVar160 = fract( ( vec3( nodeVar159.x, nodeVar159.y, nodeVar159.x ) * vec3( 0.1031 ) ) );
			nodeVar160 = ( nodeVar160 + vec3( dot( nodeVar160, ( nodeVar160.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar141 = ( nodeVar141 + ( nodeVar142 * mix( mix( fract( ( ( nodeVar154.x + nodeVar154.y ) * nodeVar154.z ) ), fract( ( ( nodeVar156.x + nodeVar156.y ) * nodeVar156.z ) ), nodeVar153.x ), mix( fract( ( ( nodeVar158.x + nodeVar158.y ) * nodeVar158.z ) ), fract( ( ( nodeVar160.x + nodeVar160.y ) * nodeVar160.z ) ), nodeVar153.x ), nodeVar153.y ) ) );
			nodeVar140 = ( nodeVar140 * vec2( 2.03 ) );
			nodeVar142 = ( nodeVar142 * 0.52 );
			nodeVar161 = floor( nodeVar140 );
			nodeVar162 = fract( nodeVar140 );
			nodeVar162 = ( ( nodeVar162 * nodeVar162 ) * ( vec2( 3.0 ) - ( nodeVar162 * vec2( 2.0 ) ) ) );
			nodeVar163 = fract( ( vec3( nodeVar161.x, nodeVar161.y, nodeVar161.x ) * vec3( 0.1031 ) ) );
			nodeVar163 = ( nodeVar163 + vec3( dot( nodeVar163, ( nodeVar163.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar164 = ( nodeVar161 + vec2( 1.0, 0.0 ) );
			nodeVar165 = fract( ( vec3( nodeVar164.x, nodeVar164.y, nodeVar164.x ) * vec3( 0.1031 ) ) );
			nodeVar165 = ( nodeVar165 + vec3( dot( nodeVar165, ( nodeVar165.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar166 = ( nodeVar161 + vec2( 0.0, 1.0 ) );
			nodeVar167 = fract( ( vec3( nodeVar166.x, nodeVar166.y, nodeVar166.x ) * vec3( 0.1031 ) ) );
			nodeVar167 = ( nodeVar167 + vec3( dot( nodeVar167, ( nodeVar167.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar168 = ( nodeVar161 + vec2( 1.0, 1.0 ) );
			nodeVar169 = fract( ( vec3( nodeVar168.x, nodeVar168.y, nodeVar168.x ) * vec3( 0.1031 ) ) );
			nodeVar169 = ( nodeVar169 + vec3( dot( nodeVar169, ( nodeVar169.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar141 = ( nodeVar141 + ( nodeVar142 * mix( mix( fract( ( ( nodeVar163.x + nodeVar163.y ) * nodeVar163.z ) ), fract( ( ( nodeVar165.x + nodeVar165.y ) * nodeVar165.z ) ), nodeVar162.x ), mix( fract( ( ( nodeVar167.x + nodeVar167.y ) * nodeVar167.z ) ), fract( ( ( nodeVar169.x + nodeVar169.y ) * nodeVar169.z ) ), nodeVar162.x ), nodeVar162.y ) ) );
			nodeVar140 = ( nodeVar140 * vec2( 2.03 ) );
			nodeVar142 = ( nodeVar142 * 0.52 );
			nodeVar170 = floor( nodeVar140 );
			nodeVar171 = fract( nodeVar140 );
			nodeVar171 = ( ( nodeVar171 * nodeVar171 ) * ( vec2( 3.0 ) - ( nodeVar171 * vec2( 2.0 ) ) ) );
			nodeVar172 = fract( ( vec3( nodeVar170.x, nodeVar170.y, nodeVar170.x ) * vec3( 0.1031 ) ) );
			nodeVar172 = ( nodeVar172 + vec3( dot( nodeVar172, ( nodeVar172.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar173 = ( nodeVar170 + vec2( 1.0, 0.0 ) );
			nodeVar174 = fract( ( vec3( nodeVar173.x, nodeVar173.y, nodeVar173.x ) * vec3( 0.1031 ) ) );
			nodeVar174 = ( nodeVar174 + vec3( dot( nodeVar174, ( nodeVar174.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar175 = ( nodeVar170 + vec2( 0.0, 1.0 ) );
			nodeVar176 = fract( ( vec3( nodeVar175.x, nodeVar175.y, nodeVar175.x ) * vec3( 0.1031 ) ) );
			nodeVar176 = ( nodeVar176 + vec3( dot( nodeVar176, ( nodeVar176.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar177 = ( nodeVar170 + vec2( 1.0, 1.0 ) );
			nodeVar178 = fract( ( vec3( nodeVar177.x, nodeVar177.y, nodeVar177.x ) * vec3( 0.1031 ) ) );
			nodeVar178 = ( nodeVar178 + vec3( dot( nodeVar178, ( nodeVar178.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar141 = ( nodeVar141 + ( nodeVar142 * mix( mix( fract( ( ( nodeVar172.x + nodeVar172.y ) * nodeVar172.z ) ), fract( ( ( nodeVar174.x + nodeVar174.y ) * nodeVar174.z ) ), nodeVar171.x ), mix( fract( ( ( nodeVar176.x + nodeVar176.y ) * nodeVar176.z ) ), fract( ( ( nodeVar178.x + nodeVar178.y ) * nodeVar178.z ) ), nodeVar171.x ), nodeVar171.y ) ) );
			nodeVar140 = ( nodeVar140 * vec2( 2.03 ) );
			nodeVar142 = ( nodeVar142 * 0.52 );
			nodeVar179 = ( ( ( nodeVar63 * 0.55 ) + ( nodeVar102 * 0.3 ) ) + ( nodeVar141 * 0.15 ) );
			nodeVar10 = vec3( nodeVar179, ( 0.55 + ( nodeVar179 * 0.45 ) ), nodeVar179 );
			

		} else {


			if ( ( nodeVar9 < 2.5 ) ) {

				nodeVar180 = floor( ( NORMAL_nodeVar7.y / 0.082 ) );
				nodeVar181 = ( ( mod( nodeVar180, 2.0 ) * 0.5 ) * 0.235 );
				nodeVar182 = fract( ( ( NORMAL_nodeVar7.x + nodeVar181 ) / 0.235 ) );
				nodeVar183 = fract( ( NORMAL_nodeVar7.y / 0.082 ) );
				nodeVar184 = min( ( min( nodeVar182, ( 1.0 - nodeVar182 ) ) * 0.235 ), ( min( nodeVar183, ( 1.0 - nodeVar183 ) ) * 0.082 ) );
				nodeVar185 = smoothstep( 0.0, 0.011, nodeVar184 );
				nodeVar186 = ( vec2( floor( ( ( NORMAL_nodeVar7.x + nodeVar181 ) / 0.235 ) ), nodeVar180 ) * vec2( 1.91 ) );
				nodeVar187 = fract( ( vec3( nodeVar186.x, nodeVar186.y, nodeVar186.x ) * vec3( 0.1031 ) ) );
				nodeVar187 = ( nodeVar187 + vec3( dot( nodeVar187, ( nodeVar187.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar188 = fract( ( ( nodeVar187.x + nodeVar187.y ) * nodeVar187.z ) );
				nodeVar189 = ( NORMAL_nodeVar7 * vec2( 40.0 ) );
				nodeVar190 = 0.0;
				nodeVar191 = 0.5;
				nodeVar192 = floor( nodeVar189 );
				nodeVar193 = fract( nodeVar189 );
				nodeVar193 = ( ( nodeVar193 * nodeVar193 ) * ( vec2( 3.0 ) - ( nodeVar193 * vec2( 2.0 ) ) ) );
				nodeVar194 = fract( ( vec3( nodeVar192.x, nodeVar192.y, nodeVar192.x ) * vec3( 0.1031 ) ) );
				nodeVar194 = ( nodeVar194 + vec3( dot( nodeVar194, ( nodeVar194.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar195 = ( nodeVar192 + vec2( 1.0, 0.0 ) );
				nodeVar196 = fract( ( vec3( nodeVar195.x, nodeVar195.y, nodeVar195.x ) * vec3( 0.1031 ) ) );
				nodeVar196 = ( nodeVar196 + vec3( dot( nodeVar196, ( nodeVar196.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar197 = ( nodeVar192 + vec2( 0.0, 1.0 ) );
				nodeVar198 = fract( ( vec3( nodeVar197.x, nodeVar197.y, nodeVar197.x ) * vec3( 0.1031 ) ) );
				nodeVar198 = ( nodeVar198 + vec3( dot( nodeVar198, ( nodeVar198.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar199 = ( nodeVar192 + vec2( 1.0, 1.0 ) );
				nodeVar200 = fract( ( vec3( nodeVar199.x, nodeVar199.y, nodeVar199.x ) * vec3( 0.1031 ) ) );
				nodeVar200 = ( nodeVar200 + vec3( dot( nodeVar200, ( nodeVar200.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar190 = ( nodeVar190 + ( nodeVar191 * mix( mix( fract( ( ( nodeVar194.x + nodeVar194.y ) * nodeVar194.z ) ), fract( ( ( nodeVar196.x + nodeVar196.y ) * nodeVar196.z ) ), nodeVar193.x ), mix( fract( ( ( nodeVar198.x + nodeVar198.y ) * nodeVar198.z ) ), fract( ( ( nodeVar200.x + nodeVar200.y ) * nodeVar200.z ) ), nodeVar193.x ), nodeVar193.y ) ) );
				nodeVar189 = ( nodeVar189 * vec2( 2.03 ) );
				nodeVar191 = ( nodeVar191 * 0.52 );
				nodeVar201 = floor( nodeVar189 );
				nodeVar202 = fract( nodeVar189 );
				nodeVar202 = ( ( nodeVar202 * nodeVar202 ) * ( vec2( 3.0 ) - ( nodeVar202 * vec2( 2.0 ) ) ) );
				nodeVar203 = fract( ( vec3( nodeVar201.x, nodeVar201.y, nodeVar201.x ) * vec3( 0.1031 ) ) );
				nodeVar203 = ( nodeVar203 + vec3( dot( nodeVar203, ( nodeVar203.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar204 = ( nodeVar201 + vec2( 1.0, 0.0 ) );
				nodeVar205 = fract( ( vec3( nodeVar204.x, nodeVar204.y, nodeVar204.x ) * vec3( 0.1031 ) ) );
				nodeVar205 = ( nodeVar205 + vec3( dot( nodeVar205, ( nodeVar205.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar206 = ( nodeVar201 + vec2( 0.0, 1.0 ) );
				nodeVar207 = fract( ( vec3( nodeVar206.x, nodeVar206.y, nodeVar206.x ) * vec3( 0.1031 ) ) );
				nodeVar207 = ( nodeVar207 + vec3( dot( nodeVar207, ( nodeVar207.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar208 = ( nodeVar201 + vec2( 1.0, 1.0 ) );
				nodeVar209 = fract( ( vec3( nodeVar208.x, nodeVar208.y, nodeVar208.x ) * vec3( 0.1031 ) ) );
				nodeVar209 = ( nodeVar209 + vec3( dot( nodeVar209, ( nodeVar209.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar190 = ( nodeVar190 + ( nodeVar191 * mix( mix( fract( ( ( nodeVar203.x + nodeVar203.y ) * nodeVar203.z ) ), fract( ( ( nodeVar205.x + nodeVar205.y ) * nodeVar205.z ) ), nodeVar202.x ), mix( fract( ( ( nodeVar207.x + nodeVar207.y ) * nodeVar207.z ) ), fract( ( ( nodeVar209.x + nodeVar209.y ) * nodeVar209.z ) ), nodeVar202.x ), nodeVar202.y ) ) );
				nodeVar189 = ( nodeVar189 * vec2( 2.03 ) );
				nodeVar191 = ( nodeVar191 * 0.52 );
				nodeVar210 = floor( nodeVar189 );
				nodeVar211 = fract( nodeVar189 );
				nodeVar211 = ( ( nodeVar211 * nodeVar211 ) * ( vec2( 3.0 ) - ( nodeVar211 * vec2( 2.0 ) ) ) );
				nodeVar212 = fract( ( vec3( nodeVar210.x, nodeVar210.y, nodeVar210.x ) * vec3( 0.1031 ) ) );
				nodeVar212 = ( nodeVar212 + vec3( dot( nodeVar212, ( nodeVar212.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar213 = ( nodeVar210 + vec2( 1.0, 0.0 ) );
				nodeVar214 = fract( ( vec3( nodeVar213.x, nodeVar213.y, nodeVar213.x ) * vec3( 0.1031 ) ) );
				nodeVar214 = ( nodeVar214 + vec3( dot( nodeVar214, ( nodeVar214.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar215 = ( nodeVar210 + vec2( 0.0, 1.0 ) );
				nodeVar216 = fract( ( vec3( nodeVar215.x, nodeVar215.y, nodeVar215.x ) * vec3( 0.1031 ) ) );
				nodeVar216 = ( nodeVar216 + vec3( dot( nodeVar216, ( nodeVar216.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar217 = ( nodeVar210 + vec2( 1.0, 1.0 ) );
				nodeVar218 = fract( ( vec3( nodeVar217.x, nodeVar217.y, nodeVar217.x ) * vec3( 0.1031 ) ) );
				nodeVar218 = ( nodeVar218 + vec3( dot( nodeVar218, ( nodeVar218.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar190 = ( nodeVar190 + ( nodeVar191 * mix( mix( fract( ( ( nodeVar212.x + nodeVar212.y ) * nodeVar212.z ) ), fract( ( ( nodeVar214.x + nodeVar214.y ) * nodeVar214.z ) ), nodeVar211.x ), mix( fract( ( ( nodeVar216.x + nodeVar216.y ) * nodeVar216.z ) ), fract( ( ( nodeVar218.x + nodeVar218.y ) * nodeVar218.z ) ), nodeVar211.x ), nodeVar211.y ) ) );
				nodeVar189 = ( nodeVar189 * vec2( 2.03 ) );
				nodeVar191 = ( nodeVar191 * 0.52 );
				nodeVar219 = floor( nodeVar189 );
				nodeVar220 = fract( nodeVar189 );
				nodeVar220 = ( ( nodeVar220 * nodeVar220 ) * ( vec2( 3.0 ) - ( nodeVar220 * vec2( 2.0 ) ) ) );
				nodeVar221 = fract( ( vec3( nodeVar219.x, nodeVar219.y, nodeVar219.x ) * vec3( 0.1031 ) ) );
				nodeVar221 = ( nodeVar221 + vec3( dot( nodeVar221, ( nodeVar221.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar222 = ( nodeVar219 + vec2( 1.0, 0.0 ) );
				nodeVar223 = fract( ( vec3( nodeVar222.x, nodeVar222.y, nodeVar222.x ) * vec3( 0.1031 ) ) );
				nodeVar223 = ( nodeVar223 + vec3( dot( nodeVar223, ( nodeVar223.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar224 = ( nodeVar219 + vec2( 0.0, 1.0 ) );
				nodeVar225 = fract( ( vec3( nodeVar224.x, nodeVar224.y, nodeVar224.x ) * vec3( 0.1031 ) ) );
				nodeVar225 = ( nodeVar225 + vec3( dot( nodeVar225, ( nodeVar225.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar226 = ( nodeVar219 + vec2( 1.0, 1.0 ) );
				nodeVar227 = fract( ( vec3( nodeVar226.x, nodeVar226.y, nodeVar226.x ) * vec3( 0.1031 ) ) );
				nodeVar227 = ( nodeVar227 + vec3( dot( nodeVar227, ( nodeVar227.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar190 = ( nodeVar190 + ( nodeVar191 * mix( mix( fract( ( ( nodeVar221.x + nodeVar221.y ) * nodeVar221.z ) ), fract( ( ( nodeVar223.x + nodeVar223.y ) * nodeVar223.z ) ), nodeVar220.x ), mix( fract( ( ( nodeVar225.x + nodeVar225.y ) * nodeVar225.z ) ), fract( ( ( nodeVar227.x + nodeVar227.y ) * nodeVar227.z ) ), nodeVar220.x ), nodeVar220.y ) ) );
				nodeVar189 = ( nodeVar189 * vec2( 2.03 ) );
				nodeVar191 = ( nodeVar191 * 0.52 );
				nodeVar10 = vec3( ( ( ( nodeVar185 * ( 0.62 + ( nodeVar188 * 0.38 ) ) ) * 0.72 ) + ( ( nodeVar190 * 0.16 ) * nodeVar185 ) ), nodeVar185, nodeVar188 );
				

			} else {


				if ( ( nodeVar9 < 3.5 ) ) {

					nodeVar228 = floor( ( NORMAL_nodeVar7.y * 5.2 ) );
					nodeVar229 = fract( ( NORMAL_nodeVar7.y * 5.2 ) );
					nodeVar230 = smoothstep( 0.0, 0.06, min( nodeVar229, ( 1.0 - nodeVar229 ) ) );
					nodeVar231 = vec2( ( NORMAL_nodeVar7.x * 2.2 ), ( NORMAL_nodeVar7.y * 60.0 ) );
					nodeVar232 = 0.0;
					nodeVar233 = 0.5;
					nodeVar234 = floor( nodeVar231 );
					nodeVar235 = fract( nodeVar231 );
					nodeVar235 = ( ( nodeVar235 * nodeVar235 ) * ( vec2( 3.0 ) - ( nodeVar235 * vec2( 2.0 ) ) ) );
					nodeVar236 = fract( ( vec3( nodeVar234.x, nodeVar234.y, nodeVar234.x ) * vec3( 0.1031 ) ) );
					nodeVar236 = ( nodeVar236 + vec3( dot( nodeVar236, ( nodeVar236.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar237 = ( nodeVar234 + vec2( 1.0, 0.0 ) );
					nodeVar238 = fract( ( vec3( nodeVar237.x, nodeVar237.y, nodeVar237.x ) * vec3( 0.1031 ) ) );
					nodeVar238 = ( nodeVar238 + vec3( dot( nodeVar238, ( nodeVar238.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar239 = ( nodeVar234 + vec2( 0.0, 1.0 ) );
					nodeVar240 = fract( ( vec3( nodeVar239.x, nodeVar239.y, nodeVar239.x ) * vec3( 0.1031 ) ) );
					nodeVar240 = ( nodeVar240 + vec3( dot( nodeVar240, ( nodeVar240.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar241 = ( nodeVar234 + vec2( 1.0, 1.0 ) );
					nodeVar242 = fract( ( vec3( nodeVar241.x, nodeVar241.y, nodeVar241.x ) * vec3( 0.1031 ) ) );
					nodeVar242 = ( nodeVar242 + vec3( dot( nodeVar242, ( nodeVar242.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar232 = ( nodeVar232 + ( nodeVar233 * mix( mix( fract( ( ( nodeVar236.x + nodeVar236.y ) * nodeVar236.z ) ), fract( ( ( nodeVar238.x + nodeVar238.y ) * nodeVar238.z ) ), nodeVar235.x ), mix( fract( ( ( nodeVar240.x + nodeVar240.y ) * nodeVar240.z ) ), fract( ( ( nodeVar242.x + nodeVar242.y ) * nodeVar242.z ) ), nodeVar235.x ), nodeVar235.y ) ) );
					nodeVar231 = ( nodeVar231 * vec2( 2.03 ) );
					nodeVar233 = ( nodeVar233 * 0.52 );
					nodeVar243 = floor( nodeVar231 );
					nodeVar244 = fract( nodeVar231 );
					nodeVar244 = ( ( nodeVar244 * nodeVar244 ) * ( vec2( 3.0 ) - ( nodeVar244 * vec2( 2.0 ) ) ) );
					nodeVar245 = fract( ( vec3( nodeVar243.x, nodeVar243.y, nodeVar243.x ) * vec3( 0.1031 ) ) );
					nodeVar245 = ( nodeVar245 + vec3( dot( nodeVar245, ( nodeVar245.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar246 = ( nodeVar243 + vec2( 1.0, 0.0 ) );
					nodeVar247 = fract( ( vec3( nodeVar246.x, nodeVar246.y, nodeVar246.x ) * vec3( 0.1031 ) ) );
					nodeVar247 = ( nodeVar247 + vec3( dot( nodeVar247, ( nodeVar247.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar248 = ( nodeVar243 + vec2( 0.0, 1.0 ) );
					nodeVar249 = fract( ( vec3( nodeVar248.x, nodeVar248.y, nodeVar248.x ) * vec3( 0.1031 ) ) );
					nodeVar249 = ( nodeVar249 + vec3( dot( nodeVar249, ( nodeVar249.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar250 = ( nodeVar243 + vec2( 1.0, 1.0 ) );
					nodeVar251 = fract( ( vec3( nodeVar250.x, nodeVar250.y, nodeVar250.x ) * vec3( 0.1031 ) ) );
					nodeVar251 = ( nodeVar251 + vec3( dot( nodeVar251, ( nodeVar251.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar232 = ( nodeVar232 + ( nodeVar233 * mix( mix( fract( ( ( nodeVar245.x + nodeVar245.y ) * nodeVar245.z ) ), fract( ( ( nodeVar247.x + nodeVar247.y ) * nodeVar247.z ) ), nodeVar244.x ), mix( fract( ( ( nodeVar249.x + nodeVar249.y ) * nodeVar249.z ) ), fract( ( ( nodeVar251.x + nodeVar251.y ) * nodeVar251.z ) ), nodeVar244.x ), nodeVar244.y ) ) );
					nodeVar231 = ( nodeVar231 * vec2( 2.03 ) );
					nodeVar233 = ( nodeVar233 * 0.52 );
					nodeVar252 = floor( nodeVar231 );
					nodeVar253 = fract( nodeVar231 );
					nodeVar253 = ( ( nodeVar253 * nodeVar253 ) * ( vec2( 3.0 ) - ( nodeVar253 * vec2( 2.0 ) ) ) );
					nodeVar254 = fract( ( vec3( nodeVar252.x, nodeVar252.y, nodeVar252.x ) * vec3( 0.1031 ) ) );
					nodeVar254 = ( nodeVar254 + vec3( dot( nodeVar254, ( nodeVar254.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar255 = ( nodeVar252 + vec2( 1.0, 0.0 ) );
					nodeVar256 = fract( ( vec3( nodeVar255.x, nodeVar255.y, nodeVar255.x ) * vec3( 0.1031 ) ) );
					nodeVar256 = ( nodeVar256 + vec3( dot( nodeVar256, ( nodeVar256.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar257 = ( nodeVar252 + vec2( 0.0, 1.0 ) );
					nodeVar258 = fract( ( vec3( nodeVar257.x, nodeVar257.y, nodeVar257.x ) * vec3( 0.1031 ) ) );
					nodeVar258 = ( nodeVar258 + vec3( dot( nodeVar258, ( nodeVar258.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar259 = ( nodeVar252 + vec2( 1.0, 1.0 ) );
					nodeVar260 = fract( ( vec3( nodeVar259.x, nodeVar259.y, nodeVar259.x ) * vec3( 0.1031 ) ) );
					nodeVar260 = ( nodeVar260 + vec3( dot( nodeVar260, ( nodeVar260.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar232 = ( nodeVar232 + ( nodeVar233 * mix( mix( fract( ( ( nodeVar254.x + nodeVar254.y ) * nodeVar254.z ) ), fract( ( ( nodeVar256.x + nodeVar256.y ) * nodeVar256.z ) ), nodeVar253.x ), mix( fract( ( ( nodeVar258.x + nodeVar258.y ) * nodeVar258.z ) ), fract( ( ( nodeVar260.x + nodeVar260.y ) * nodeVar260.z ) ), nodeVar253.x ), nodeVar253.y ) ) );
					nodeVar231 = ( nodeVar231 * vec2( 2.03 ) );
					nodeVar233 = ( nodeVar233 * 0.52 );
					nodeVar261 = floor( nodeVar231 );
					nodeVar262 = fract( nodeVar231 );
					nodeVar262 = ( ( nodeVar262 * nodeVar262 ) * ( vec2( 3.0 ) - ( nodeVar262 * vec2( 2.0 ) ) ) );
					nodeVar263 = fract( ( vec3( nodeVar261.x, nodeVar261.y, nodeVar261.x ) * vec3( 0.1031 ) ) );
					nodeVar263 = ( nodeVar263 + vec3( dot( nodeVar263, ( nodeVar263.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar264 = ( nodeVar261 + vec2( 1.0, 0.0 ) );
					nodeVar265 = fract( ( vec3( nodeVar264.x, nodeVar264.y, nodeVar264.x ) * vec3( 0.1031 ) ) );
					nodeVar265 = ( nodeVar265 + vec3( dot( nodeVar265, ( nodeVar265.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar266 = ( nodeVar261 + vec2( 0.0, 1.0 ) );
					nodeVar267 = fract( ( vec3( nodeVar266.x, nodeVar266.y, nodeVar266.x ) * vec3( 0.1031 ) ) );
					nodeVar267 = ( nodeVar267 + vec3( dot( nodeVar267, ( nodeVar267.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar268 = ( nodeVar261 + vec2( 1.0, 1.0 ) );
					nodeVar269 = fract( ( vec3( nodeVar268.x, nodeVar268.y, nodeVar268.x ) * vec3( 0.1031 ) ) );
					nodeVar269 = ( nodeVar269 + vec3( dot( nodeVar269, ( nodeVar269.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar232 = ( nodeVar232 + ( nodeVar233 * mix( mix( fract( ( ( nodeVar263.x + nodeVar263.y ) * nodeVar263.z ) ), fract( ( ( nodeVar265.x + nodeVar265.y ) * nodeVar265.z ) ), nodeVar262.x ), mix( fract( ( ( nodeVar267.x + nodeVar267.y ) * nodeVar267.z ) ), fract( ( ( nodeVar269.x + nodeVar269.y ) * nodeVar269.z ) ), nodeVar262.x ), nodeVar262.y ) ) );
					nodeVar231 = ( nodeVar231 * vec2( 2.03 ) );
					nodeVar233 = ( nodeVar233 * 0.52 );
					nodeVar270 = nodeVar232;
					nodeVar271 = fract( ( ( nodeVar228 * 5.1 ) * 0.1031 ) );
					nodeVar271 = ( nodeVar271 * ( nodeVar271 + 33.33 ) );
					nodeVar271 = ( nodeVar271 * ( nodeVar271 + nodeVar271 ) );
					nodeVar10 = vec3( ( ( ( nodeVar230 * ( 0.6 + ( nodeVar270 * 0.4 ) ) ) * 0.5 ) + ( ( fract( nodeVar271 ) * 0.12 ) * nodeVar230 ) ), nodeVar230, nodeVar270 );
					

				} else {


					if ( ( nodeVar9 < 4.5 ) ) {

						nodeVar272 = floor( ( NORMAL_nodeVar7.y / 0.45 ) );
						nodeVar273 = fract( ( ( nodeVar272 * 4.7 ) * 0.1031 ) );
						nodeVar273 = ( nodeVar273 * ( nodeVar273 + 33.33 ) );
						nodeVar273 = ( nodeVar273 * ( nodeVar273 + nodeVar273 ) );
						nodeVar274 = ( ( ( mod( nodeVar272, 2.0 ) * 0.5 ) * 0.9 ) + ( fract( nodeVar273 ) * 0.18 ) );
						nodeVar275 = fract( ( ( NORMAL_nodeVar7.x + nodeVar274 ) / 0.9 ) );
						nodeVar276 = fract( ( NORMAL_nodeVar7.y / 0.45 ) );
						nodeVar277 = min( ( min( nodeVar275, ( 1.0 - nodeVar275 ) ) * 0.9 ), ( min( nodeVar276, ( 1.0 - nodeVar276 ) ) * 0.45 ) );
						nodeVar278 = smoothstep( 0.0, 0.006, nodeVar277 );
						nodeVar279 = vec2( ( NORMAL_nodeVar7.x * 2.2 ), ( NORMAL_nodeVar7.y * 16.0 ) );
						nodeVar280 = 0.0;
						nodeVar281 = 0.5;
						nodeVar282 = floor( nodeVar279 );
						nodeVar283 = fract( nodeVar279 );
						nodeVar283 = ( ( nodeVar283 * nodeVar283 ) * ( vec2( 3.0 ) - ( nodeVar283 * vec2( 2.0 ) ) ) );
						nodeVar284 = fract( ( vec3( nodeVar282.x, nodeVar282.y, nodeVar282.x ) * vec3( 0.1031 ) ) );
						nodeVar284 = ( nodeVar284 + vec3( dot( nodeVar284, ( nodeVar284.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar285 = ( nodeVar282 + vec2( 1.0, 0.0 ) );
						nodeVar286 = fract( ( vec3( nodeVar285.x, nodeVar285.y, nodeVar285.x ) * vec3( 0.1031 ) ) );
						nodeVar286 = ( nodeVar286 + vec3( dot( nodeVar286, ( nodeVar286.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar287 = ( nodeVar282 + vec2( 0.0, 1.0 ) );
						nodeVar288 = fract( ( vec3( nodeVar287.x, nodeVar287.y, nodeVar287.x ) * vec3( 0.1031 ) ) );
						nodeVar288 = ( nodeVar288 + vec3( dot( nodeVar288, ( nodeVar288.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar289 = ( nodeVar282 + vec2( 1.0, 1.0 ) );
						nodeVar290 = fract( ( vec3( nodeVar289.x, nodeVar289.y, nodeVar289.x ) * vec3( 0.1031 ) ) );
						nodeVar290 = ( nodeVar290 + vec3( dot( nodeVar290, ( nodeVar290.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar280 = ( nodeVar280 + ( nodeVar281 * mix( mix( fract( ( ( nodeVar284.x + nodeVar284.y ) * nodeVar284.z ) ), fract( ( ( nodeVar286.x + nodeVar286.y ) * nodeVar286.z ) ), nodeVar283.x ), mix( fract( ( ( nodeVar288.x + nodeVar288.y ) * nodeVar288.z ) ), fract( ( ( nodeVar290.x + nodeVar290.y ) * nodeVar290.z ) ), nodeVar283.x ), nodeVar283.y ) ) );
						nodeVar279 = ( nodeVar279 * vec2( 2.03 ) );
						nodeVar281 = ( nodeVar281 * 0.52 );
						nodeVar291 = floor( nodeVar279 );
						nodeVar292 = fract( nodeVar279 );
						nodeVar292 = ( ( nodeVar292 * nodeVar292 ) * ( vec2( 3.0 ) - ( nodeVar292 * vec2( 2.0 ) ) ) );
						nodeVar293 = fract( ( vec3( nodeVar291.x, nodeVar291.y, nodeVar291.x ) * vec3( 0.1031 ) ) );
						nodeVar293 = ( nodeVar293 + vec3( dot( nodeVar293, ( nodeVar293.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar294 = ( nodeVar291 + vec2( 1.0, 0.0 ) );
						nodeVar295 = fract( ( vec3( nodeVar294.x, nodeVar294.y, nodeVar294.x ) * vec3( 0.1031 ) ) );
						nodeVar295 = ( nodeVar295 + vec3( dot( nodeVar295, ( nodeVar295.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar296 = ( nodeVar291 + vec2( 0.0, 1.0 ) );
						nodeVar297 = fract( ( vec3( nodeVar296.x, nodeVar296.y, nodeVar296.x ) * vec3( 0.1031 ) ) );
						nodeVar297 = ( nodeVar297 + vec3( dot( nodeVar297, ( nodeVar297.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar298 = ( nodeVar291 + vec2( 1.0, 1.0 ) );
						nodeVar299 = fract( ( vec3( nodeVar298.x, nodeVar298.y, nodeVar298.x ) * vec3( 0.1031 ) ) );
						nodeVar299 = ( nodeVar299 + vec3( dot( nodeVar299, ( nodeVar299.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar280 = ( nodeVar280 + ( nodeVar281 * mix( mix( fract( ( ( nodeVar293.x + nodeVar293.y ) * nodeVar293.z ) ), fract( ( ( nodeVar295.x + nodeVar295.y ) * nodeVar295.z ) ), nodeVar292.x ), mix( fract( ( ( nodeVar297.x + nodeVar297.y ) * nodeVar297.z ) ), fract( ( ( nodeVar299.x + nodeVar299.y ) * nodeVar299.z ) ), nodeVar292.x ), nodeVar292.y ) ) );
						nodeVar279 = ( nodeVar279 * vec2( 2.03 ) );
						nodeVar281 = ( nodeVar281 * 0.52 );
						nodeVar300 = floor( nodeVar279 );
						nodeVar301 = fract( nodeVar279 );
						nodeVar301 = ( ( nodeVar301 * nodeVar301 ) * ( vec2( 3.0 ) - ( nodeVar301 * vec2( 2.0 ) ) ) );
						nodeVar302 = fract( ( vec3( nodeVar300.x, nodeVar300.y, nodeVar300.x ) * vec3( 0.1031 ) ) );
						nodeVar302 = ( nodeVar302 + vec3( dot( nodeVar302, ( nodeVar302.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar303 = ( nodeVar300 + vec2( 1.0, 0.0 ) );
						nodeVar304 = fract( ( vec3( nodeVar303.x, nodeVar303.y, nodeVar303.x ) * vec3( 0.1031 ) ) );
						nodeVar304 = ( nodeVar304 + vec3( dot( nodeVar304, ( nodeVar304.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar305 = ( nodeVar300 + vec2( 0.0, 1.0 ) );
						nodeVar306 = fract( ( vec3( nodeVar305.x, nodeVar305.y, nodeVar305.x ) * vec3( 0.1031 ) ) );
						nodeVar306 = ( nodeVar306 + vec3( dot( nodeVar306, ( nodeVar306.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar307 = ( nodeVar300 + vec2( 1.0, 1.0 ) );
						nodeVar308 = fract( ( vec3( nodeVar307.x, nodeVar307.y, nodeVar307.x ) * vec3( 0.1031 ) ) );
						nodeVar308 = ( nodeVar308 + vec3( dot( nodeVar308, ( nodeVar308.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar280 = ( nodeVar280 + ( nodeVar281 * mix( mix( fract( ( ( nodeVar302.x + nodeVar302.y ) * nodeVar302.z ) ), fract( ( ( nodeVar304.x + nodeVar304.y ) * nodeVar304.z ) ), nodeVar301.x ), mix( fract( ( ( nodeVar306.x + nodeVar306.y ) * nodeVar306.z ) ), fract( ( ( nodeVar308.x + nodeVar308.y ) * nodeVar308.z ) ), nodeVar301.x ), nodeVar301.y ) ) );
						nodeVar279 = ( nodeVar279 * vec2( 2.03 ) );
						nodeVar281 = ( nodeVar281 * 0.52 );
						nodeVar309 = floor( nodeVar279 );
						nodeVar310 = fract( nodeVar279 );
						nodeVar310 = ( ( nodeVar310 * nodeVar310 ) * ( vec2( 3.0 ) - ( nodeVar310 * vec2( 2.0 ) ) ) );
						nodeVar311 = fract( ( vec3( nodeVar309.x, nodeVar309.y, nodeVar309.x ) * vec3( 0.1031 ) ) );
						nodeVar311 = ( nodeVar311 + vec3( dot( nodeVar311, ( nodeVar311.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar312 = ( nodeVar309 + vec2( 1.0, 0.0 ) );
						nodeVar313 = fract( ( vec3( nodeVar312.x, nodeVar312.y, nodeVar312.x ) * vec3( 0.1031 ) ) );
						nodeVar313 = ( nodeVar313 + vec3( dot( nodeVar313, ( nodeVar313.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar314 = ( nodeVar309 + vec2( 0.0, 1.0 ) );
						nodeVar315 = fract( ( vec3( nodeVar314.x, nodeVar314.y, nodeVar314.x ) * vec3( 0.1031 ) ) );
						nodeVar315 = ( nodeVar315 + vec3( dot( nodeVar315, ( nodeVar315.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar316 = ( nodeVar309 + vec2( 1.0, 1.0 ) );
						nodeVar317 = fract( ( vec3( nodeVar316.x, nodeVar316.y, nodeVar316.x ) * vec3( 0.1031 ) ) );
						nodeVar317 = ( nodeVar317 + vec3( dot( nodeVar317, ( nodeVar317.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar280 = ( nodeVar280 + ( nodeVar281 * mix( mix( fract( ( ( nodeVar311.x + nodeVar311.y ) * nodeVar311.z ) ), fract( ( ( nodeVar313.x + nodeVar313.y ) * nodeVar313.z ) ), nodeVar310.x ), mix( fract( ( ( nodeVar315.x + nodeVar315.y ) * nodeVar315.z ) ), fract( ( ( nodeVar317.x + nodeVar317.y ) * nodeVar317.z ) ), nodeVar310.x ), nodeVar310.y ) ) );
						nodeVar279 = ( nodeVar279 * vec2( 2.03 ) );
						nodeVar281 = ( nodeVar281 * 0.52 );
						nodeVar318 = nodeVar280;
						nodeVar319 = ( vec2( floor( ( ( NORMAL_nodeVar7.x + nodeVar274 ) / 0.9 ) ), nodeVar272 ) * vec2( 1.61 ) );
						nodeVar320 = fract( ( vec3( nodeVar319.x, nodeVar319.y, nodeVar319.x ) * vec3( 0.1031 ) ) );
						nodeVar320 = ( nodeVar320 + vec3( dot( nodeVar320, ( nodeVar320.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar321 = fract( ( ( nodeVar320.x + nodeVar320.y ) * nodeVar320.z ) );
						nodeVar322 = ( NORMAL_nodeVar7 * vec2( 26.0 ) );
						nodeVar323 = 0.0;
						nodeVar324 = 0.5;
						nodeVar325 = floor( nodeVar322 );
						nodeVar326 = fract( nodeVar322 );
						nodeVar326 = ( ( nodeVar326 * nodeVar326 ) * ( vec2( 3.0 ) - ( nodeVar326 * vec2( 2.0 ) ) ) );
						nodeVar327 = fract( ( vec3( nodeVar325.x, nodeVar325.y, nodeVar325.x ) * vec3( 0.1031 ) ) );
						nodeVar327 = ( nodeVar327 + vec3( dot( nodeVar327, ( nodeVar327.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar328 = ( nodeVar325 + vec2( 1.0, 0.0 ) );
						nodeVar329 = fract( ( vec3( nodeVar328.x, nodeVar328.y, nodeVar328.x ) * vec3( 0.1031 ) ) );
						nodeVar329 = ( nodeVar329 + vec3( dot( nodeVar329, ( nodeVar329.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar330 = ( nodeVar325 + vec2( 0.0, 1.0 ) );
						nodeVar331 = fract( ( vec3( nodeVar330.x, nodeVar330.y, nodeVar330.x ) * vec3( 0.1031 ) ) );
						nodeVar331 = ( nodeVar331 + vec3( dot( nodeVar331, ( nodeVar331.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar332 = ( nodeVar325 + vec2( 1.0, 1.0 ) );
						nodeVar333 = fract( ( vec3( nodeVar332.x, nodeVar332.y, nodeVar332.x ) * vec3( 0.1031 ) ) );
						nodeVar333 = ( nodeVar333 + vec3( dot( nodeVar333, ( nodeVar333.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar323 = ( nodeVar323 + ( nodeVar324 * mix( mix( fract( ( ( nodeVar327.x + nodeVar327.y ) * nodeVar327.z ) ), fract( ( ( nodeVar329.x + nodeVar329.y ) * nodeVar329.z ) ), nodeVar326.x ), mix( fract( ( ( nodeVar331.x + nodeVar331.y ) * nodeVar331.z ) ), fract( ( ( nodeVar333.x + nodeVar333.y ) * nodeVar333.z ) ), nodeVar326.x ), nodeVar326.y ) ) );
						nodeVar322 = ( nodeVar322 * vec2( 2.03 ) );
						nodeVar324 = ( nodeVar324 * 0.52 );
						nodeVar334 = floor( nodeVar322 );
						nodeVar335 = fract( nodeVar322 );
						nodeVar335 = ( ( nodeVar335 * nodeVar335 ) * ( vec2( 3.0 ) - ( nodeVar335 * vec2( 2.0 ) ) ) );
						nodeVar336 = fract( ( vec3( nodeVar334.x, nodeVar334.y, nodeVar334.x ) * vec3( 0.1031 ) ) );
						nodeVar336 = ( nodeVar336 + vec3( dot( nodeVar336, ( nodeVar336.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar337 = ( nodeVar334 + vec2( 1.0, 0.0 ) );
						nodeVar338 = fract( ( vec3( nodeVar337.x, nodeVar337.y, nodeVar337.x ) * vec3( 0.1031 ) ) );
						nodeVar338 = ( nodeVar338 + vec3( dot( nodeVar338, ( nodeVar338.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar339 = ( nodeVar334 + vec2( 0.0, 1.0 ) );
						nodeVar340 = fract( ( vec3( nodeVar339.x, nodeVar339.y, nodeVar339.x ) * vec3( 0.1031 ) ) );
						nodeVar340 = ( nodeVar340 + vec3( dot( nodeVar340, ( nodeVar340.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar341 = ( nodeVar334 + vec2( 1.0, 1.0 ) );
						nodeVar342 = fract( ( vec3( nodeVar341.x, nodeVar341.y, nodeVar341.x ) * vec3( 0.1031 ) ) );
						nodeVar342 = ( nodeVar342 + vec3( dot( nodeVar342, ( nodeVar342.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar323 = ( nodeVar323 + ( nodeVar324 * mix( mix( fract( ( ( nodeVar336.x + nodeVar336.y ) * nodeVar336.z ) ), fract( ( ( nodeVar338.x + nodeVar338.y ) * nodeVar338.z ) ), nodeVar335.x ), mix( fract( ( ( nodeVar340.x + nodeVar340.y ) * nodeVar340.z ) ), fract( ( ( nodeVar342.x + nodeVar342.y ) * nodeVar342.z ) ), nodeVar335.x ), nodeVar335.y ) ) );
						nodeVar322 = ( nodeVar322 * vec2( 2.03 ) );
						nodeVar324 = ( nodeVar324 * 0.52 );
						nodeVar343 = floor( nodeVar322 );
						nodeVar344 = fract( nodeVar322 );
						nodeVar344 = ( ( nodeVar344 * nodeVar344 ) * ( vec2( 3.0 ) - ( nodeVar344 * vec2( 2.0 ) ) ) );
						nodeVar345 = fract( ( vec3( nodeVar343.x, nodeVar343.y, nodeVar343.x ) * vec3( 0.1031 ) ) );
						nodeVar345 = ( nodeVar345 + vec3( dot( nodeVar345, ( nodeVar345.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar346 = ( nodeVar343 + vec2( 1.0, 0.0 ) );
						nodeVar347 = fract( ( vec3( nodeVar346.x, nodeVar346.y, nodeVar346.x ) * vec3( 0.1031 ) ) );
						nodeVar347 = ( nodeVar347 + vec3( dot( nodeVar347, ( nodeVar347.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar348 = ( nodeVar343 + vec2( 0.0, 1.0 ) );
						nodeVar349 = fract( ( vec3( nodeVar348.x, nodeVar348.y, nodeVar348.x ) * vec3( 0.1031 ) ) );
						nodeVar349 = ( nodeVar349 + vec3( dot( nodeVar349, ( nodeVar349.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar350 = ( nodeVar343 + vec2( 1.0, 1.0 ) );
						nodeVar351 = fract( ( vec3( nodeVar350.x, nodeVar350.y, nodeVar350.x ) * vec3( 0.1031 ) ) );
						nodeVar351 = ( nodeVar351 + vec3( dot( nodeVar351, ( nodeVar351.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar323 = ( nodeVar323 + ( nodeVar324 * mix( mix( fract( ( ( nodeVar345.x + nodeVar345.y ) * nodeVar345.z ) ), fract( ( ( nodeVar347.x + nodeVar347.y ) * nodeVar347.z ) ), nodeVar344.x ), mix( fract( ( ( nodeVar349.x + nodeVar349.y ) * nodeVar349.z ) ), fract( ( ( nodeVar351.x + nodeVar351.y ) * nodeVar351.z ) ), nodeVar344.x ), nodeVar344.y ) ) );
						nodeVar322 = ( nodeVar322 * vec2( 2.03 ) );
						nodeVar324 = ( nodeVar324 * 0.52 );
						nodeVar352 = floor( nodeVar322 );
						nodeVar353 = fract( nodeVar322 );
						nodeVar353 = ( ( nodeVar353 * nodeVar353 ) * ( vec2( 3.0 ) - ( nodeVar353 * vec2( 2.0 ) ) ) );
						nodeVar354 = fract( ( vec3( nodeVar352.x, nodeVar352.y, nodeVar352.x ) * vec3( 0.1031 ) ) );
						nodeVar354 = ( nodeVar354 + vec3( dot( nodeVar354, ( nodeVar354.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar355 = ( nodeVar352 + vec2( 1.0, 0.0 ) );
						nodeVar356 = fract( ( vec3( nodeVar355.x, nodeVar355.y, nodeVar355.x ) * vec3( 0.1031 ) ) );
						nodeVar356 = ( nodeVar356 + vec3( dot( nodeVar356, ( nodeVar356.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar357 = ( nodeVar352 + vec2( 0.0, 1.0 ) );
						nodeVar358 = fract( ( vec3( nodeVar357.x, nodeVar357.y, nodeVar357.x ) * vec3( 0.1031 ) ) );
						nodeVar358 = ( nodeVar358 + vec3( dot( nodeVar358, ( nodeVar358.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar359 = ( nodeVar352 + vec2( 1.0, 1.0 ) );
						nodeVar360 = fract( ( vec3( nodeVar359.x, nodeVar359.y, nodeVar359.x ) * vec3( 0.1031 ) ) );
						nodeVar360 = ( nodeVar360 + vec3( dot( nodeVar360, ( nodeVar360.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar323 = ( nodeVar323 + ( nodeVar324 * mix( mix( fract( ( ( nodeVar354.x + nodeVar354.y ) * nodeVar354.z ) ), fract( ( ( nodeVar356.x + nodeVar356.y ) * nodeVar356.z ) ), nodeVar353.x ), mix( fract( ( ( nodeVar358.x + nodeVar358.y ) * nodeVar358.z ) ), fract( ( ( nodeVar360.x + nodeVar360.y ) * nodeVar360.z ) ), nodeVar353.x ), nodeVar353.y ) ) );
						nodeVar322 = ( nodeVar322 * vec2( 2.03 ) );
						nodeVar324 = ( nodeVar324 * 0.52 );
						nodeVar361 = smoothstep( 0.62, 0.92, nodeVar323 );
						nodeVar10 = vec3( ( ( ( nodeVar278 * ( 0.62 + ( nodeVar321 * 0.38 ) ) ) * 0.4 ) - ( nodeVar361 * 0.22 ) ), ( nodeVar278 * ( 1.0 - ( nodeVar361 * 0.7 ) ) ), ( ( nodeVar318 * 0.35 ) + ( nodeVar321 * 0.65 ) ) );
						

					} else {


						if ( ( nodeVar9 < 5.5 ) ) {

							nodeVar362 = ( NORMAL_nodeVar7 * vec2( 4.2 ) );
							nodeVar363 = 0.0;
							nodeVar364 = 0.5;
							nodeVar365 = floor( nodeVar362 );
							nodeVar366 = fract( nodeVar362 );
							nodeVar366 = ( ( nodeVar366 * nodeVar366 ) * ( vec2( 3.0 ) - ( nodeVar366 * vec2( 2.0 ) ) ) );
							nodeVar367 = fract( ( vec3( nodeVar365.x, nodeVar365.y, nodeVar365.x ) * vec3( 0.1031 ) ) );
							nodeVar367 = ( nodeVar367 + vec3( dot( nodeVar367, ( nodeVar367.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar368 = ( nodeVar365 + vec2( 1.0, 0.0 ) );
							nodeVar369 = fract( ( vec3( nodeVar368.x, nodeVar368.y, nodeVar368.x ) * vec3( 0.1031 ) ) );
							nodeVar369 = ( nodeVar369 + vec3( dot( nodeVar369, ( nodeVar369.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar370 = ( nodeVar365 + vec2( 0.0, 1.0 ) );
							nodeVar371 = fract( ( vec3( nodeVar370.x, nodeVar370.y, nodeVar370.x ) * vec3( 0.1031 ) ) );
							nodeVar371 = ( nodeVar371 + vec3( dot( nodeVar371, ( nodeVar371.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar372 = ( nodeVar365 + vec2( 1.0, 1.0 ) );
							nodeVar373 = fract( ( vec3( nodeVar372.x, nodeVar372.y, nodeVar372.x ) * vec3( 0.1031 ) ) );
							nodeVar373 = ( nodeVar373 + vec3( dot( nodeVar373, ( nodeVar373.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar363 = ( nodeVar363 + ( nodeVar364 * mix( mix( fract( ( ( nodeVar367.x + nodeVar367.y ) * nodeVar367.z ) ), fract( ( ( nodeVar369.x + nodeVar369.y ) * nodeVar369.z ) ), nodeVar366.x ), mix( fract( ( ( nodeVar371.x + nodeVar371.y ) * nodeVar371.z ) ), fract( ( ( nodeVar373.x + nodeVar373.y ) * nodeVar373.z ) ), nodeVar366.x ), nodeVar366.y ) ) );
							nodeVar362 = ( nodeVar362 * vec2( 2.03 ) );
							nodeVar364 = ( nodeVar364 * 0.52 );
							nodeVar374 = floor( nodeVar362 );
							nodeVar375 = fract( nodeVar362 );
							nodeVar375 = ( ( nodeVar375 * nodeVar375 ) * ( vec2( 3.0 ) - ( nodeVar375 * vec2( 2.0 ) ) ) );
							nodeVar376 = fract( ( vec3( nodeVar374.x, nodeVar374.y, nodeVar374.x ) * vec3( 0.1031 ) ) );
							nodeVar376 = ( nodeVar376 + vec3( dot( nodeVar376, ( nodeVar376.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar377 = ( nodeVar374 + vec2( 1.0, 0.0 ) );
							nodeVar378 = fract( ( vec3( nodeVar377.x, nodeVar377.y, nodeVar377.x ) * vec3( 0.1031 ) ) );
							nodeVar378 = ( nodeVar378 + vec3( dot( nodeVar378, ( nodeVar378.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar379 = ( nodeVar374 + vec2( 0.0, 1.0 ) );
							nodeVar380 = fract( ( vec3( nodeVar379.x, nodeVar379.y, nodeVar379.x ) * vec3( 0.1031 ) ) );
							nodeVar380 = ( nodeVar380 + vec3( dot( nodeVar380, ( nodeVar380.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar381 = ( nodeVar374 + vec2( 1.0, 1.0 ) );
							nodeVar382 = fract( ( vec3( nodeVar381.x, nodeVar381.y, nodeVar381.x ) * vec3( 0.1031 ) ) );
							nodeVar382 = ( nodeVar382 + vec3( dot( nodeVar382, ( nodeVar382.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar363 = ( nodeVar363 + ( nodeVar364 * mix( mix( fract( ( ( nodeVar376.x + nodeVar376.y ) * nodeVar376.z ) ), fract( ( ( nodeVar378.x + nodeVar378.y ) * nodeVar378.z ) ), nodeVar375.x ), mix( fract( ( ( nodeVar380.x + nodeVar380.y ) * nodeVar380.z ) ), fract( ( ( nodeVar382.x + nodeVar382.y ) * nodeVar382.z ) ), nodeVar375.x ), nodeVar375.y ) ) );
							nodeVar362 = ( nodeVar362 * vec2( 2.03 ) );
							nodeVar364 = ( nodeVar364 * 0.52 );
							nodeVar383 = floor( nodeVar362 );
							nodeVar384 = fract( nodeVar362 );
							nodeVar384 = ( ( nodeVar384 * nodeVar384 ) * ( vec2( 3.0 ) - ( nodeVar384 * vec2( 2.0 ) ) ) );
							nodeVar385 = fract( ( vec3( nodeVar383.x, nodeVar383.y, nodeVar383.x ) * vec3( 0.1031 ) ) );
							nodeVar385 = ( nodeVar385 + vec3( dot( nodeVar385, ( nodeVar385.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar386 = ( nodeVar383 + vec2( 1.0, 0.0 ) );
							nodeVar387 = fract( ( vec3( nodeVar386.x, nodeVar386.y, nodeVar386.x ) * vec3( 0.1031 ) ) );
							nodeVar387 = ( nodeVar387 + vec3( dot( nodeVar387, ( nodeVar387.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar388 = ( nodeVar383 + vec2( 0.0, 1.0 ) );
							nodeVar389 = fract( ( vec3( nodeVar388.x, nodeVar388.y, nodeVar388.x ) * vec3( 0.1031 ) ) );
							nodeVar389 = ( nodeVar389 + vec3( dot( nodeVar389, ( nodeVar389.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar390 = ( nodeVar383 + vec2( 1.0, 1.0 ) );
							nodeVar391 = fract( ( vec3( nodeVar390.x, nodeVar390.y, nodeVar390.x ) * vec3( 0.1031 ) ) );
							nodeVar391 = ( nodeVar391 + vec3( dot( nodeVar391, ( nodeVar391.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar363 = ( nodeVar363 + ( nodeVar364 * mix( mix( fract( ( ( nodeVar385.x + nodeVar385.y ) * nodeVar385.z ) ), fract( ( ( nodeVar387.x + nodeVar387.y ) * nodeVar387.z ) ), nodeVar384.x ), mix( fract( ( ( nodeVar389.x + nodeVar389.y ) * nodeVar389.z ) ), fract( ( ( nodeVar391.x + nodeVar391.y ) * nodeVar391.z ) ), nodeVar384.x ), nodeVar384.y ) ) );
							nodeVar362 = ( nodeVar362 * vec2( 2.03 ) );
							nodeVar364 = ( nodeVar364 * 0.52 );
							nodeVar392 = floor( nodeVar362 );
							nodeVar393 = fract( nodeVar362 );
							nodeVar393 = ( ( nodeVar393 * nodeVar393 ) * ( vec2( 3.0 ) - ( nodeVar393 * vec2( 2.0 ) ) ) );
							nodeVar394 = fract( ( vec3( nodeVar392.x, nodeVar392.y, nodeVar392.x ) * vec3( 0.1031 ) ) );
							nodeVar394 = ( nodeVar394 + vec3( dot( nodeVar394, ( nodeVar394.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar395 = ( nodeVar392 + vec2( 1.0, 0.0 ) );
							nodeVar396 = fract( ( vec3( nodeVar395.x, nodeVar395.y, nodeVar395.x ) * vec3( 0.1031 ) ) );
							nodeVar396 = ( nodeVar396 + vec3( dot( nodeVar396, ( nodeVar396.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar397 = ( nodeVar392 + vec2( 0.0, 1.0 ) );
							nodeVar398 = fract( ( vec3( nodeVar397.x, nodeVar397.y, nodeVar397.x ) * vec3( 0.1031 ) ) );
							nodeVar398 = ( nodeVar398 + vec3( dot( nodeVar398, ( nodeVar398.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar399 = ( nodeVar392 + vec2( 1.0, 1.0 ) );
							nodeVar400 = fract( ( vec3( nodeVar399.x, nodeVar399.y, nodeVar399.x ) * vec3( 0.1031 ) ) );
							nodeVar400 = ( nodeVar400 + vec3( dot( nodeVar400, ( nodeVar400.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar363 = ( nodeVar363 + ( nodeVar364 * mix( mix( fract( ( ( nodeVar394.x + nodeVar394.y ) * nodeVar394.z ) ), fract( ( ( nodeVar396.x + nodeVar396.y ) * nodeVar396.z ) ), nodeVar393.x ), mix( fract( ( ( nodeVar398.x + nodeVar398.y ) * nodeVar398.z ) ), fract( ( ( nodeVar400.x + nodeVar400.y ) * nodeVar400.z ) ), nodeVar393.x ), nodeVar393.y ) ) );
							nodeVar362 = ( nodeVar362 * vec2( 2.03 ) );
							nodeVar364 = ( nodeVar364 * 0.52 );
							nodeVar401 = ( NORMAL_nodeVar7 * vec2( 19.0 ) );
							nodeVar402 = 0.0;
							nodeVar403 = 0.5;
							nodeVar404 = floor( nodeVar401 );
							nodeVar405 = fract( nodeVar401 );
							nodeVar405 = ( ( nodeVar405 * nodeVar405 ) * ( vec2( 3.0 ) - ( nodeVar405 * vec2( 2.0 ) ) ) );
							nodeVar406 = fract( ( vec3( nodeVar404.x, nodeVar404.y, nodeVar404.x ) * vec3( 0.1031 ) ) );
							nodeVar406 = ( nodeVar406 + vec3( dot( nodeVar406, ( nodeVar406.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar407 = ( nodeVar404 + vec2( 1.0, 0.0 ) );
							nodeVar408 = fract( ( vec3( nodeVar407.x, nodeVar407.y, nodeVar407.x ) * vec3( 0.1031 ) ) );
							nodeVar408 = ( nodeVar408 + vec3( dot( nodeVar408, ( nodeVar408.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar409 = ( nodeVar404 + vec2( 0.0, 1.0 ) );
							nodeVar410 = fract( ( vec3( nodeVar409.x, nodeVar409.y, nodeVar409.x ) * vec3( 0.1031 ) ) );
							nodeVar410 = ( nodeVar410 + vec3( dot( nodeVar410, ( nodeVar410.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar411 = ( nodeVar404 + vec2( 1.0, 1.0 ) );
							nodeVar412 = fract( ( vec3( nodeVar411.x, nodeVar411.y, nodeVar411.x ) * vec3( 0.1031 ) ) );
							nodeVar412 = ( nodeVar412 + vec3( dot( nodeVar412, ( nodeVar412.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar402 = ( nodeVar402 + ( nodeVar403 * mix( mix( fract( ( ( nodeVar406.x + nodeVar406.y ) * nodeVar406.z ) ), fract( ( ( nodeVar408.x + nodeVar408.y ) * nodeVar408.z ) ), nodeVar405.x ), mix( fract( ( ( nodeVar410.x + nodeVar410.y ) * nodeVar410.z ) ), fract( ( ( nodeVar412.x + nodeVar412.y ) * nodeVar412.z ) ), nodeVar405.x ), nodeVar405.y ) ) );
							nodeVar401 = ( nodeVar401 * vec2( 2.03 ) );
							nodeVar403 = ( nodeVar403 * 0.52 );
							nodeVar413 = floor( nodeVar401 );
							nodeVar414 = fract( nodeVar401 );
							nodeVar414 = ( ( nodeVar414 * nodeVar414 ) * ( vec2( 3.0 ) - ( nodeVar414 * vec2( 2.0 ) ) ) );
							nodeVar415 = fract( ( vec3( nodeVar413.x, nodeVar413.y, nodeVar413.x ) * vec3( 0.1031 ) ) );
							nodeVar415 = ( nodeVar415 + vec3( dot( nodeVar415, ( nodeVar415.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar416 = ( nodeVar413 + vec2( 1.0, 0.0 ) );
							nodeVar417 = fract( ( vec3( nodeVar416.x, nodeVar416.y, nodeVar416.x ) * vec3( 0.1031 ) ) );
							nodeVar417 = ( nodeVar417 + vec3( dot( nodeVar417, ( nodeVar417.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar418 = ( nodeVar413 + vec2( 0.0, 1.0 ) );
							nodeVar419 = fract( ( vec3( nodeVar418.x, nodeVar418.y, nodeVar418.x ) * vec3( 0.1031 ) ) );
							nodeVar419 = ( nodeVar419 + vec3( dot( nodeVar419, ( nodeVar419.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar420 = ( nodeVar413 + vec2( 1.0, 1.0 ) );
							nodeVar421 = fract( ( vec3( nodeVar420.x, nodeVar420.y, nodeVar420.x ) * vec3( 0.1031 ) ) );
							nodeVar421 = ( nodeVar421 + vec3( dot( nodeVar421, ( nodeVar421.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar402 = ( nodeVar402 + ( nodeVar403 * mix( mix( fract( ( ( nodeVar415.x + nodeVar415.y ) * nodeVar415.z ) ), fract( ( ( nodeVar417.x + nodeVar417.y ) * nodeVar417.z ) ), nodeVar414.x ), mix( fract( ( ( nodeVar419.x + nodeVar419.y ) * nodeVar419.z ) ), fract( ( ( nodeVar421.x + nodeVar421.y ) * nodeVar421.z ) ), nodeVar414.x ), nodeVar414.y ) ) );
							nodeVar401 = ( nodeVar401 * vec2( 2.03 ) );
							nodeVar403 = ( nodeVar403 * 0.52 );
							nodeVar422 = floor( nodeVar401 );
							nodeVar423 = fract( nodeVar401 );
							nodeVar423 = ( ( nodeVar423 * nodeVar423 ) * ( vec2( 3.0 ) - ( nodeVar423 * vec2( 2.0 ) ) ) );
							nodeVar424 = fract( ( vec3( nodeVar422.x, nodeVar422.y, nodeVar422.x ) * vec3( 0.1031 ) ) );
							nodeVar424 = ( nodeVar424 + vec3( dot( nodeVar424, ( nodeVar424.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar425 = ( nodeVar422 + vec2( 1.0, 0.0 ) );
							nodeVar426 = fract( ( vec3( nodeVar425.x, nodeVar425.y, nodeVar425.x ) * vec3( 0.1031 ) ) );
							nodeVar426 = ( nodeVar426 + vec3( dot( nodeVar426, ( nodeVar426.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar427 = ( nodeVar422 + vec2( 0.0, 1.0 ) );
							nodeVar428 = fract( ( vec3( nodeVar427.x, nodeVar427.y, nodeVar427.x ) * vec3( 0.1031 ) ) );
							nodeVar428 = ( nodeVar428 + vec3( dot( nodeVar428, ( nodeVar428.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar429 = ( nodeVar422 + vec2( 1.0, 1.0 ) );
							nodeVar430 = fract( ( vec3( nodeVar429.x, nodeVar429.y, nodeVar429.x ) * vec3( 0.1031 ) ) );
							nodeVar430 = ( nodeVar430 + vec3( dot( nodeVar430, ( nodeVar430.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar402 = ( nodeVar402 + ( nodeVar403 * mix( mix( fract( ( ( nodeVar424.x + nodeVar424.y ) * nodeVar424.z ) ), fract( ( ( nodeVar426.x + nodeVar426.y ) * nodeVar426.z ) ), nodeVar423.x ), mix( fract( ( ( nodeVar428.x + nodeVar428.y ) * nodeVar428.z ) ), fract( ( ( nodeVar430.x + nodeVar430.y ) * nodeVar430.z ) ), nodeVar423.x ), nodeVar423.y ) ) );
							nodeVar401 = ( nodeVar401 * vec2( 2.03 ) );
							nodeVar403 = ( nodeVar403 * 0.52 );
							nodeVar431 = floor( nodeVar401 );
							nodeVar432 = fract( nodeVar401 );
							nodeVar432 = ( ( nodeVar432 * nodeVar432 ) * ( vec2( 3.0 ) - ( nodeVar432 * vec2( 2.0 ) ) ) );
							nodeVar433 = fract( ( vec3( nodeVar431.x, nodeVar431.y, nodeVar431.x ) * vec3( 0.1031 ) ) );
							nodeVar433 = ( nodeVar433 + vec3( dot( nodeVar433, ( nodeVar433.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar434 = ( nodeVar431 + vec2( 1.0, 0.0 ) );
							nodeVar435 = fract( ( vec3( nodeVar434.x, nodeVar434.y, nodeVar434.x ) * vec3( 0.1031 ) ) );
							nodeVar435 = ( nodeVar435 + vec3( dot( nodeVar435, ( nodeVar435.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar436 = ( nodeVar431 + vec2( 0.0, 1.0 ) );
							nodeVar437 = fract( ( vec3( nodeVar436.x, nodeVar436.y, nodeVar436.x ) * vec3( 0.1031 ) ) );
							nodeVar437 = ( nodeVar437 + vec3( dot( nodeVar437, ( nodeVar437.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar438 = ( nodeVar431 + vec2( 1.0, 1.0 ) );
							nodeVar439 = fract( ( vec3( nodeVar438.x, nodeVar438.y, nodeVar438.x ) * vec3( 0.1031 ) ) );
							nodeVar439 = ( nodeVar439 + vec3( dot( nodeVar439, ( nodeVar439.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar402 = ( nodeVar402 + ( nodeVar403 * mix( mix( fract( ( ( nodeVar433.x + nodeVar433.y ) * nodeVar433.z ) ), fract( ( ( nodeVar435.x + nodeVar435.y ) * nodeVar435.z ) ), nodeVar432.x ), mix( fract( ( ( nodeVar437.x + nodeVar437.y ) * nodeVar437.z ) ), fract( ( ( nodeVar439.x + nodeVar439.y ) * nodeVar439.z ) ), nodeVar432.x ), nodeVar432.y ) ) );
							nodeVar401 = ( nodeVar401 * vec2( 2.03 ) );
							nodeVar403 = ( nodeVar403 * 0.52 );
							nodeVar440 = ( ( nodeVar363 * 0.6 ) + ( nodeVar402 * 0.4 ) );
							nodeVar10 = vec3( ( nodeVar440 * 0.6 ), ( 0.7 + ( nodeVar440 * 0.3 ) ), nodeVar440 );
							

						} else {


							if ( ( nodeVar9 < 6.5 ) ) {

								nodeVar441 = vec2( ( NORMAL_nodeVar7.x * 90.0 ), ( NORMAL_nodeVar7.y * 4.0 ) );
								nodeVar442 = 0.0;
								nodeVar443 = 0.5;
								nodeVar444 = floor( nodeVar441 );
								nodeVar445 = fract( nodeVar441 );
								nodeVar445 = ( ( nodeVar445 * nodeVar445 ) * ( vec2( 3.0 ) - ( nodeVar445 * vec2( 2.0 ) ) ) );
								nodeVar446 = fract( ( vec3( nodeVar444.x, nodeVar444.y, nodeVar444.x ) * vec3( 0.1031 ) ) );
								nodeVar446 = ( nodeVar446 + vec3( dot( nodeVar446, ( nodeVar446.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar447 = ( nodeVar444 + vec2( 1.0, 0.0 ) );
								nodeVar448 = fract( ( vec3( nodeVar447.x, nodeVar447.y, nodeVar447.x ) * vec3( 0.1031 ) ) );
								nodeVar448 = ( nodeVar448 + vec3( dot( nodeVar448, ( nodeVar448.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar449 = ( nodeVar444 + vec2( 0.0, 1.0 ) );
								nodeVar450 = fract( ( vec3( nodeVar449.x, nodeVar449.y, nodeVar449.x ) * vec3( 0.1031 ) ) );
								nodeVar450 = ( nodeVar450 + vec3( dot( nodeVar450, ( nodeVar450.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar451 = ( nodeVar444 + vec2( 1.0, 1.0 ) );
								nodeVar452 = fract( ( vec3( nodeVar451.x, nodeVar451.y, nodeVar451.x ) * vec3( 0.1031 ) ) );
								nodeVar452 = ( nodeVar452 + vec3( dot( nodeVar452, ( nodeVar452.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar442 = ( nodeVar442 + ( nodeVar443 * mix( mix( fract( ( ( nodeVar446.x + nodeVar446.y ) * nodeVar446.z ) ), fract( ( ( nodeVar448.x + nodeVar448.y ) * nodeVar448.z ) ), nodeVar445.x ), mix( fract( ( ( nodeVar450.x + nodeVar450.y ) * nodeVar450.z ) ), fract( ( ( nodeVar452.x + nodeVar452.y ) * nodeVar452.z ) ), nodeVar445.x ), nodeVar445.y ) ) );
								nodeVar441 = ( nodeVar441 * vec2( 2.03 ) );
								nodeVar443 = ( nodeVar443 * 0.52 );
								nodeVar453 = floor( nodeVar441 );
								nodeVar454 = fract( nodeVar441 );
								nodeVar454 = ( ( nodeVar454 * nodeVar454 ) * ( vec2( 3.0 ) - ( nodeVar454 * vec2( 2.0 ) ) ) );
								nodeVar455 = fract( ( vec3( nodeVar453.x, nodeVar453.y, nodeVar453.x ) * vec3( 0.1031 ) ) );
								nodeVar455 = ( nodeVar455 + vec3( dot( nodeVar455, ( nodeVar455.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar456 = ( nodeVar453 + vec2( 1.0, 0.0 ) );
								nodeVar457 = fract( ( vec3( nodeVar456.x, nodeVar456.y, nodeVar456.x ) * vec3( 0.1031 ) ) );
								nodeVar457 = ( nodeVar457 + vec3( dot( nodeVar457, ( nodeVar457.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar458 = ( nodeVar453 + vec2( 0.0, 1.0 ) );
								nodeVar459 = fract( ( vec3( nodeVar458.x, nodeVar458.y, nodeVar458.x ) * vec3( 0.1031 ) ) );
								nodeVar459 = ( nodeVar459 + vec3( dot( nodeVar459, ( nodeVar459.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar460 = ( nodeVar453 + vec2( 1.0, 1.0 ) );
								nodeVar461 = fract( ( vec3( nodeVar460.x, nodeVar460.y, nodeVar460.x ) * vec3( 0.1031 ) ) );
								nodeVar461 = ( nodeVar461 + vec3( dot( nodeVar461, ( nodeVar461.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar442 = ( nodeVar442 + ( nodeVar443 * mix( mix( fract( ( ( nodeVar455.x + nodeVar455.y ) * nodeVar455.z ) ), fract( ( ( nodeVar457.x + nodeVar457.y ) * nodeVar457.z ) ), nodeVar454.x ), mix( fract( ( ( nodeVar459.x + nodeVar459.y ) * nodeVar459.z ) ), fract( ( ( nodeVar461.x + nodeVar461.y ) * nodeVar461.z ) ), nodeVar454.x ), nodeVar454.y ) ) );
								nodeVar441 = ( nodeVar441 * vec2( 2.03 ) );
								nodeVar443 = ( nodeVar443 * 0.52 );
								nodeVar462 = floor( nodeVar441 );
								nodeVar463 = fract( nodeVar441 );
								nodeVar463 = ( ( nodeVar463 * nodeVar463 ) * ( vec2( 3.0 ) - ( nodeVar463 * vec2( 2.0 ) ) ) );
								nodeVar464 = fract( ( vec3( nodeVar462.x, nodeVar462.y, nodeVar462.x ) * vec3( 0.1031 ) ) );
								nodeVar464 = ( nodeVar464 + vec3( dot( nodeVar464, ( nodeVar464.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar465 = ( nodeVar462 + vec2( 1.0, 0.0 ) );
								nodeVar466 = fract( ( vec3( nodeVar465.x, nodeVar465.y, nodeVar465.x ) * vec3( 0.1031 ) ) );
								nodeVar466 = ( nodeVar466 + vec3( dot( nodeVar466, ( nodeVar466.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar467 = ( nodeVar462 + vec2( 0.0, 1.0 ) );
								nodeVar468 = fract( ( vec3( nodeVar467.x, nodeVar467.y, nodeVar467.x ) * vec3( 0.1031 ) ) );
								nodeVar468 = ( nodeVar468 + vec3( dot( nodeVar468, ( nodeVar468.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar469 = ( nodeVar462 + vec2( 1.0, 1.0 ) );
								nodeVar470 = fract( ( vec3( nodeVar469.x, nodeVar469.y, nodeVar469.x ) * vec3( 0.1031 ) ) );
								nodeVar470 = ( nodeVar470 + vec3( dot( nodeVar470, ( nodeVar470.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar442 = ( nodeVar442 + ( nodeVar443 * mix( mix( fract( ( ( nodeVar464.x + nodeVar464.y ) * nodeVar464.z ) ), fract( ( ( nodeVar466.x + nodeVar466.y ) * nodeVar466.z ) ), nodeVar463.x ), mix( fract( ( ( nodeVar468.x + nodeVar468.y ) * nodeVar468.z ) ), fract( ( ( nodeVar470.x + nodeVar470.y ) * nodeVar470.z ) ), nodeVar463.x ), nodeVar463.y ) ) );
								nodeVar441 = ( nodeVar441 * vec2( 2.03 ) );
								nodeVar443 = ( nodeVar443 * 0.52 );
								nodeVar471 = floor( nodeVar441 );
								nodeVar472 = fract( nodeVar441 );
								nodeVar472 = ( ( nodeVar472 * nodeVar472 ) * ( vec2( 3.0 ) - ( nodeVar472 * vec2( 2.0 ) ) ) );
								nodeVar473 = fract( ( vec3( nodeVar471.x, nodeVar471.y, nodeVar471.x ) * vec3( 0.1031 ) ) );
								nodeVar473 = ( nodeVar473 + vec3( dot( nodeVar473, ( nodeVar473.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar474 = ( nodeVar471 + vec2( 1.0, 0.0 ) );
								nodeVar475 = fract( ( vec3( nodeVar474.x, nodeVar474.y, nodeVar474.x ) * vec3( 0.1031 ) ) );
								nodeVar475 = ( nodeVar475 + vec3( dot( nodeVar475, ( nodeVar475.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar476 = ( nodeVar471 + vec2( 0.0, 1.0 ) );
								nodeVar477 = fract( ( vec3( nodeVar476.x, nodeVar476.y, nodeVar476.x ) * vec3( 0.1031 ) ) );
								nodeVar477 = ( nodeVar477 + vec3( dot( nodeVar477, ( nodeVar477.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar478 = ( nodeVar471 + vec2( 1.0, 1.0 ) );
								nodeVar479 = fract( ( vec3( nodeVar478.x, nodeVar478.y, nodeVar478.x ) * vec3( 0.1031 ) ) );
								nodeVar479 = ( nodeVar479 + vec3( dot( nodeVar479, ( nodeVar479.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar442 = ( nodeVar442 + ( nodeVar443 * mix( mix( fract( ( ( nodeVar473.x + nodeVar473.y ) * nodeVar473.z ) ), fract( ( ( nodeVar475.x + nodeVar475.y ) * nodeVar475.z ) ), nodeVar472.x ), mix( fract( ( ( nodeVar477.x + nodeVar477.y ) * nodeVar477.z ) ), fract( ( ( nodeVar479.x + nodeVar479.y ) * nodeVar479.z ) ), nodeVar472.x ), nodeVar472.y ) ) );
								nodeVar441 = ( nodeVar441 * vec2( 2.03 ) );
								nodeVar443 = ( nodeVar443 * 0.52 );
								nodeVar480 = nodeVar442;
								nodeVar10 = vec3( ( nodeVar480 * 0.25 ), 1.0, nodeVar480 );
								

							} else {


								if ( ( nodeVar9 < 7.5 ) ) {

									nodeVar481 = ( NORMAL_nodeVar7 * vec2( 0.28 ) );
									nodeVar482 = 0.0;
									nodeVar483 = 0.5;
									nodeVar484 = floor( nodeVar481 );
									nodeVar485 = fract( nodeVar481 );
									nodeVar485 = ( ( nodeVar485 * nodeVar485 ) * ( vec2( 3.0 ) - ( nodeVar485 * vec2( 2.0 ) ) ) );
									nodeVar486 = fract( ( vec3( nodeVar484.x, nodeVar484.y, nodeVar484.x ) * vec3( 0.1031 ) ) );
									nodeVar486 = ( nodeVar486 + vec3( dot( nodeVar486, ( nodeVar486.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar487 = ( nodeVar484 + vec2( 1.0, 0.0 ) );
									nodeVar488 = fract( ( vec3( nodeVar487.x, nodeVar487.y, nodeVar487.x ) * vec3( 0.1031 ) ) );
									nodeVar488 = ( nodeVar488 + vec3( dot( nodeVar488, ( nodeVar488.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar489 = ( nodeVar484 + vec2( 0.0, 1.0 ) );
									nodeVar490 = fract( ( vec3( nodeVar489.x, nodeVar489.y, nodeVar489.x ) * vec3( 0.1031 ) ) );
									nodeVar490 = ( nodeVar490 + vec3( dot( nodeVar490, ( nodeVar490.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar491 = ( nodeVar484 + vec2( 1.0, 1.0 ) );
									nodeVar492 = fract( ( vec3( nodeVar491.x, nodeVar491.y, nodeVar491.x ) * vec3( 0.1031 ) ) );
									nodeVar492 = ( nodeVar492 + vec3( dot( nodeVar492, ( nodeVar492.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar482 = ( nodeVar482 + ( nodeVar483 * mix( mix( fract( ( ( nodeVar486.x + nodeVar486.y ) * nodeVar486.z ) ), fract( ( ( nodeVar488.x + nodeVar488.y ) * nodeVar488.z ) ), nodeVar485.x ), mix( fract( ( ( nodeVar490.x + nodeVar490.y ) * nodeVar490.z ) ), fract( ( ( nodeVar492.x + nodeVar492.y ) * nodeVar492.z ) ), nodeVar485.x ), nodeVar485.y ) ) );
									nodeVar481 = ( nodeVar481 * vec2( 2.11 ) );
									nodeVar483 = ( nodeVar483 * 0.5 );
									nodeVar493 = floor( nodeVar481 );
									nodeVar494 = fract( nodeVar481 );
									nodeVar494 = ( ( nodeVar494 * nodeVar494 ) * ( vec2( 3.0 ) - ( nodeVar494 * vec2( 2.0 ) ) ) );
									nodeVar495 = fract( ( vec3( nodeVar493.x, nodeVar493.y, nodeVar493.x ) * vec3( 0.1031 ) ) );
									nodeVar495 = ( nodeVar495 + vec3( dot( nodeVar495, ( nodeVar495.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar496 = ( nodeVar493 + vec2( 1.0, 0.0 ) );
									nodeVar497 = fract( ( vec3( nodeVar496.x, nodeVar496.y, nodeVar496.x ) * vec3( 0.1031 ) ) );
									nodeVar497 = ( nodeVar497 + vec3( dot( nodeVar497, ( nodeVar497.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar498 = ( nodeVar493 + vec2( 0.0, 1.0 ) );
									nodeVar499 = fract( ( vec3( nodeVar498.x, nodeVar498.y, nodeVar498.x ) * vec3( 0.1031 ) ) );
									nodeVar499 = ( nodeVar499 + vec3( dot( nodeVar499, ( nodeVar499.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar500 = ( nodeVar493 + vec2( 1.0, 1.0 ) );
									nodeVar501 = fract( ( vec3( nodeVar500.x, nodeVar500.y, nodeVar500.x ) * vec3( 0.1031 ) ) );
									nodeVar501 = ( nodeVar501 + vec3( dot( nodeVar501, ( nodeVar501.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar482 = ( nodeVar482 + ( nodeVar483 * mix( mix( fract( ( ( nodeVar495.x + nodeVar495.y ) * nodeVar495.z ) ), fract( ( ( nodeVar497.x + nodeVar497.y ) * nodeVar497.z ) ), nodeVar494.x ), mix( fract( ( ( nodeVar499.x + nodeVar499.y ) * nodeVar499.z ) ), fract( ( ( nodeVar501.x + nodeVar501.y ) * nodeVar501.z ) ), nodeVar494.x ), nodeVar494.y ) ) );
									nodeVar481 = ( nodeVar481 * vec2( 2.11 ) );
									nodeVar483 = ( nodeVar483 * 0.5 );
									nodeVar502 = floor( nodeVar481 );
									nodeVar503 = fract( nodeVar481 );
									nodeVar503 = ( ( nodeVar503 * nodeVar503 ) * ( vec2( 3.0 ) - ( nodeVar503 * vec2( 2.0 ) ) ) );
									nodeVar504 = fract( ( vec3( nodeVar502.x, nodeVar502.y, nodeVar502.x ) * vec3( 0.1031 ) ) );
									nodeVar504 = ( nodeVar504 + vec3( dot( nodeVar504, ( nodeVar504.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar505 = ( nodeVar502 + vec2( 1.0, 0.0 ) );
									nodeVar506 = fract( ( vec3( nodeVar505.x, nodeVar505.y, nodeVar505.x ) * vec3( 0.1031 ) ) );
									nodeVar506 = ( nodeVar506 + vec3( dot( nodeVar506, ( nodeVar506.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar507 = ( nodeVar502 + vec2( 0.0, 1.0 ) );
									nodeVar508 = fract( ( vec3( nodeVar507.x, nodeVar507.y, nodeVar507.x ) * vec3( 0.1031 ) ) );
									nodeVar508 = ( nodeVar508 + vec3( dot( nodeVar508, ( nodeVar508.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar509 = ( nodeVar502 + vec2( 1.0, 1.0 ) );
									nodeVar510 = fract( ( vec3( nodeVar509.x, nodeVar509.y, nodeVar509.x ) * vec3( 0.1031 ) ) );
									nodeVar510 = ( nodeVar510 + vec3( dot( nodeVar510, ( nodeVar510.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar482 = ( nodeVar482 + ( nodeVar483 * mix( mix( fract( ( ( nodeVar504.x + nodeVar504.y ) * nodeVar504.z ) ), fract( ( ( nodeVar506.x + nodeVar506.y ) * nodeVar506.z ) ), nodeVar503.x ), mix( fract( ( ( nodeVar508.x + nodeVar508.y ) * nodeVar508.z ) ), fract( ( ( nodeVar510.x + nodeVar510.y ) * nodeVar510.z ) ), nodeVar503.x ), nodeVar503.y ) ) );
									nodeVar481 = ( nodeVar481 * vec2( 2.11 ) );
									nodeVar483 = ( nodeVar483 * 0.5 );
									nodeVar511 = ( ( NORMAL_nodeVar7 * vec2( 0.28 ) ) + vec2( 19.0 ) );
									nodeVar512 = 0.0;
									nodeVar513 = 0.5;
									nodeVar514 = floor( nodeVar511 );
									nodeVar515 = fract( nodeVar511 );
									nodeVar515 = ( ( nodeVar515 * nodeVar515 ) * ( vec2( 3.0 ) - ( nodeVar515 * vec2( 2.0 ) ) ) );
									nodeVar516 = fract( ( vec3( nodeVar514.x, nodeVar514.y, nodeVar514.x ) * vec3( 0.1031 ) ) );
									nodeVar516 = ( nodeVar516 + vec3( dot( nodeVar516, ( nodeVar516.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar517 = ( nodeVar514 + vec2( 1.0, 0.0 ) );
									nodeVar518 = fract( ( vec3( nodeVar517.x, nodeVar517.y, nodeVar517.x ) * vec3( 0.1031 ) ) );
									nodeVar518 = ( nodeVar518 + vec3( dot( nodeVar518, ( nodeVar518.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar519 = ( nodeVar514 + vec2( 0.0, 1.0 ) );
									nodeVar520 = fract( ( vec3( nodeVar519.x, nodeVar519.y, nodeVar519.x ) * vec3( 0.1031 ) ) );
									nodeVar520 = ( nodeVar520 + vec3( dot( nodeVar520, ( nodeVar520.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar521 = ( nodeVar514 + vec2( 1.0, 1.0 ) );
									nodeVar522 = fract( ( vec3( nodeVar521.x, nodeVar521.y, nodeVar521.x ) * vec3( 0.1031 ) ) );
									nodeVar522 = ( nodeVar522 + vec3( dot( nodeVar522, ( nodeVar522.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar512 = ( nodeVar512 + ( nodeVar513 * mix( mix( fract( ( ( nodeVar516.x + nodeVar516.y ) * nodeVar516.z ) ), fract( ( ( nodeVar518.x + nodeVar518.y ) * nodeVar518.z ) ), nodeVar515.x ), mix( fract( ( ( nodeVar520.x + nodeVar520.y ) * nodeVar520.z ) ), fract( ( ( nodeVar522.x + nodeVar522.y ) * nodeVar522.z ) ), nodeVar515.x ), nodeVar515.y ) ) );
									nodeVar511 = ( nodeVar511 * vec2( 2.11 ) );
									nodeVar513 = ( nodeVar513 * 0.5 );
									nodeVar523 = floor( nodeVar511 );
									nodeVar524 = fract( nodeVar511 );
									nodeVar524 = ( ( nodeVar524 * nodeVar524 ) * ( vec2( 3.0 ) - ( nodeVar524 * vec2( 2.0 ) ) ) );
									nodeVar525 = fract( ( vec3( nodeVar523.x, nodeVar523.y, nodeVar523.x ) * vec3( 0.1031 ) ) );
									nodeVar525 = ( nodeVar525 + vec3( dot( nodeVar525, ( nodeVar525.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar526 = ( nodeVar523 + vec2( 1.0, 0.0 ) );
									nodeVar527 = fract( ( vec3( nodeVar526.x, nodeVar526.y, nodeVar526.x ) * vec3( 0.1031 ) ) );
									nodeVar527 = ( nodeVar527 + vec3( dot( nodeVar527, ( nodeVar527.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar528 = ( nodeVar523 + vec2( 0.0, 1.0 ) );
									nodeVar529 = fract( ( vec3( nodeVar528.x, nodeVar528.y, nodeVar528.x ) * vec3( 0.1031 ) ) );
									nodeVar529 = ( nodeVar529 + vec3( dot( nodeVar529, ( nodeVar529.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar530 = ( nodeVar523 + vec2( 1.0, 1.0 ) );
									nodeVar531 = fract( ( vec3( nodeVar530.x, nodeVar530.y, nodeVar530.x ) * vec3( 0.1031 ) ) );
									nodeVar531 = ( nodeVar531 + vec3( dot( nodeVar531, ( nodeVar531.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar512 = ( nodeVar512 + ( nodeVar513 * mix( mix( fract( ( ( nodeVar525.x + nodeVar525.y ) * nodeVar525.z ) ), fract( ( ( nodeVar527.x + nodeVar527.y ) * nodeVar527.z ) ), nodeVar524.x ), mix( fract( ( ( nodeVar529.x + nodeVar529.y ) * nodeVar529.z ) ), fract( ( ( nodeVar531.x + nodeVar531.y ) * nodeVar531.z ) ), nodeVar524.x ), nodeVar524.y ) ) );
									nodeVar511 = ( nodeVar511 * vec2( 2.11 ) );
									nodeVar513 = ( nodeVar513 * 0.5 );
									nodeVar532 = floor( nodeVar511 );
									nodeVar533 = fract( nodeVar511 );
									nodeVar533 = ( ( nodeVar533 * nodeVar533 ) * ( vec2( 3.0 ) - ( nodeVar533 * vec2( 2.0 ) ) ) );
									nodeVar534 = fract( ( vec3( nodeVar532.x, nodeVar532.y, nodeVar532.x ) * vec3( 0.1031 ) ) );
									nodeVar534 = ( nodeVar534 + vec3( dot( nodeVar534, ( nodeVar534.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar535 = ( nodeVar532 + vec2( 1.0, 0.0 ) );
									nodeVar536 = fract( ( vec3( nodeVar535.x, nodeVar535.y, nodeVar535.x ) * vec3( 0.1031 ) ) );
									nodeVar536 = ( nodeVar536 + vec3( dot( nodeVar536, ( nodeVar536.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar537 = ( nodeVar532 + vec2( 0.0, 1.0 ) );
									nodeVar538 = fract( ( vec3( nodeVar537.x, nodeVar537.y, nodeVar537.x ) * vec3( 0.1031 ) ) );
									nodeVar538 = ( nodeVar538 + vec3( dot( nodeVar538, ( nodeVar538.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar539 = ( nodeVar532 + vec2( 1.0, 1.0 ) );
									nodeVar540 = fract( ( vec3( nodeVar539.x, nodeVar539.y, nodeVar539.x ) * vec3( 0.1031 ) ) );
									nodeVar540 = ( nodeVar540 + vec3( dot( nodeVar540, ( nodeVar540.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar512 = ( nodeVar512 + ( nodeVar513 * mix( mix( fract( ( ( nodeVar534.x + nodeVar534.y ) * nodeVar534.z ) ), fract( ( ( nodeVar536.x + nodeVar536.y ) * nodeVar536.z ) ), nodeVar533.x ), mix( fract( ( ( nodeVar538.x + nodeVar538.y ) * nodeVar538.z ) ), fract( ( ( nodeVar540.x + nodeVar540.y ) * nodeVar540.z ) ), nodeVar533.x ), nodeVar533.y ) ) );
									nodeVar511 = ( nodeVar511 * vec2( 2.11 ) );
									nodeVar513 = ( nodeVar513 * 0.5 );
									nodeVar541 = ( vec2( nodeVar482, nodeVar512 ) - vec2( 0.5 ) );
									nodeVar542 = ( ( NORMAL_nodeVar7 * vec2( 4.05 ) ) + ( nodeVar541 * vec2( 0.85 ) ) );
									nodeVar543 = floor( nodeVar542 );
									nodeVar544 = fract( nodeVar542 );
									nodeVar545 = 9.0;
									nodeVar546 = 9.0;
									nodeVar547 = vec2( 0.0, 0.0 );
									nodeVar548 = ( nodeVar543 + vec2( -1.0, -1.0 ) );
									nodeVar549 = fract( ( vec3( nodeVar548.x, nodeVar548.y, nodeVar548.x ) * vec3( 0.1031 ) ) );
									nodeVar549 = ( nodeVar549 + vec3( dot( nodeVar549, ( nodeVar549.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar550 = ( ( nodeVar543 + vec2( -1.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar551 = fract( ( vec3( nodeVar550.x, nodeVar550.y, nodeVar550.x ) * vec3( 0.1031 ) ) );
									nodeVar551 = ( nodeVar551 + vec3( dot( nodeVar551, ( nodeVar551.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar552 = length( ( ( vec2( -1.0, -1.0 ) + vec2( fract( ( ( nodeVar549.x + nodeVar549.y ) * nodeVar549.z ) ), fract( ( ( nodeVar551.x + nodeVar551.y ) * nodeVar551.z ) ) ) ) - nodeVar544 ) );

									if ( ( nodeVar552 < nodeVar545 ) ) {

										nodeVar546 = nodeVar545;
										nodeVar545 = nodeVar552;
										nodeVar547 = ( nodeVar543 + vec2( -1.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar552 < nodeVar546 ) ) {

											nodeVar546 = nodeVar552;
											

										}

										

									}

									nodeVar553 = ( nodeVar543 + vec2( 0.0, -1.0 ) );
									nodeVar554 = fract( ( vec3( nodeVar553.x, nodeVar553.y, nodeVar553.x ) * vec3( 0.1031 ) ) );
									nodeVar554 = ( nodeVar554 + vec3( dot( nodeVar554, ( nodeVar554.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar555 = ( ( nodeVar543 + vec2( 0.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar556 = fract( ( vec3( nodeVar555.x, nodeVar555.y, nodeVar555.x ) * vec3( 0.1031 ) ) );
									nodeVar556 = ( nodeVar556 + vec3( dot( nodeVar556, ( nodeVar556.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar557 = length( ( ( vec2( 0.0, -1.0 ) + vec2( fract( ( ( nodeVar554.x + nodeVar554.y ) * nodeVar554.z ) ), fract( ( ( nodeVar556.x + nodeVar556.y ) * nodeVar556.z ) ) ) ) - nodeVar544 ) );

									if ( ( nodeVar557 < nodeVar545 ) ) {

										nodeVar546 = nodeVar545;
										nodeVar545 = nodeVar557;
										nodeVar547 = ( nodeVar543 + vec2( 0.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar557 < nodeVar546 ) ) {

											nodeVar546 = nodeVar557;
											

										}

										

									}

									nodeVar558 = ( nodeVar543 + vec2( 1.0, -1.0 ) );
									nodeVar559 = fract( ( vec3( nodeVar558.x, nodeVar558.y, nodeVar558.x ) * vec3( 0.1031 ) ) );
									nodeVar559 = ( nodeVar559 + vec3( dot( nodeVar559, ( nodeVar559.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar560 = ( ( nodeVar543 + vec2( 1.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar561 = fract( ( vec3( nodeVar560.x, nodeVar560.y, nodeVar560.x ) * vec3( 0.1031 ) ) );
									nodeVar561 = ( nodeVar561 + vec3( dot( nodeVar561, ( nodeVar561.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar562 = length( ( ( vec2( 1.0, -1.0 ) + vec2( fract( ( ( nodeVar559.x + nodeVar559.y ) * nodeVar559.z ) ), fract( ( ( nodeVar561.x + nodeVar561.y ) * nodeVar561.z ) ) ) ) - nodeVar544 ) );

									if ( ( nodeVar562 < nodeVar545 ) ) {

										nodeVar546 = nodeVar545;
										nodeVar545 = nodeVar562;
										nodeVar547 = ( nodeVar543 + vec2( 1.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar562 < nodeVar546 ) ) {

											nodeVar546 = nodeVar562;
											

										}

										

									}

									nodeVar563 = ( nodeVar543 + vec2( -1.0, 0.0 ) );
									nodeVar564 = fract( ( vec3( nodeVar563.x, nodeVar563.y, nodeVar563.x ) * vec3( 0.1031 ) ) );
									nodeVar564 = ( nodeVar564 + vec3( dot( nodeVar564, ( nodeVar564.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar565 = ( ( nodeVar543 + vec2( -1.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar566 = fract( ( vec3( nodeVar565.x, nodeVar565.y, nodeVar565.x ) * vec3( 0.1031 ) ) );
									nodeVar566 = ( nodeVar566 + vec3( dot( nodeVar566, ( nodeVar566.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar567 = length( ( ( vec2( -1.0, 0.0 ) + vec2( fract( ( ( nodeVar564.x + nodeVar564.y ) * nodeVar564.z ) ), fract( ( ( nodeVar566.x + nodeVar566.y ) * nodeVar566.z ) ) ) ) - nodeVar544 ) );

									if ( ( nodeVar567 < nodeVar545 ) ) {

										nodeVar546 = nodeVar545;
										nodeVar545 = nodeVar567;
										nodeVar547 = ( nodeVar543 + vec2( -1.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar567 < nodeVar546 ) ) {

											nodeVar546 = nodeVar567;
											

										}

										

									}

									nodeVar568 = ( nodeVar543 + vec2( 0.0, 0.0 ) );
									nodeVar569 = fract( ( vec3( nodeVar568.x, nodeVar568.y, nodeVar568.x ) * vec3( 0.1031 ) ) );
									nodeVar569 = ( nodeVar569 + vec3( dot( nodeVar569, ( nodeVar569.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar570 = ( ( nodeVar543 + vec2( 0.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar571 = fract( ( vec3( nodeVar570.x, nodeVar570.y, nodeVar570.x ) * vec3( 0.1031 ) ) );
									nodeVar571 = ( nodeVar571 + vec3( dot( nodeVar571, ( nodeVar571.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar572 = length( ( ( vec2( 0.0, 0.0 ) + vec2( fract( ( ( nodeVar569.x + nodeVar569.y ) * nodeVar569.z ) ), fract( ( ( nodeVar571.x + nodeVar571.y ) * nodeVar571.z ) ) ) ) - nodeVar544 ) );

									if ( ( nodeVar572 < nodeVar545 ) ) {

										nodeVar546 = nodeVar545;
										nodeVar545 = nodeVar572;
										nodeVar547 = ( nodeVar543 + vec2( 0.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar572 < nodeVar546 ) ) {

											nodeVar546 = nodeVar572;
											

										}

										

									}

									nodeVar573 = ( nodeVar543 + vec2( 1.0, 0.0 ) );
									nodeVar574 = fract( ( vec3( nodeVar573.x, nodeVar573.y, nodeVar573.x ) * vec3( 0.1031 ) ) );
									nodeVar574 = ( nodeVar574 + vec3( dot( nodeVar574, ( nodeVar574.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar575 = ( ( nodeVar543 + vec2( 1.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar576 = fract( ( vec3( nodeVar575.x, nodeVar575.y, nodeVar575.x ) * vec3( 0.1031 ) ) );
									nodeVar576 = ( nodeVar576 + vec3( dot( nodeVar576, ( nodeVar576.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar577 = length( ( ( vec2( 1.0, 0.0 ) + vec2( fract( ( ( nodeVar574.x + nodeVar574.y ) * nodeVar574.z ) ), fract( ( ( nodeVar576.x + nodeVar576.y ) * nodeVar576.z ) ) ) ) - nodeVar544 ) );

									if ( ( nodeVar577 < nodeVar545 ) ) {

										nodeVar546 = nodeVar545;
										nodeVar545 = nodeVar577;
										nodeVar547 = ( nodeVar543 + vec2( 1.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar577 < nodeVar546 ) ) {

											nodeVar546 = nodeVar577;
											

										}

										

									}

									nodeVar578 = ( nodeVar543 + vec2( -1.0, 1.0 ) );
									nodeVar579 = fract( ( vec3( nodeVar578.x, nodeVar578.y, nodeVar578.x ) * vec3( 0.1031 ) ) );
									nodeVar579 = ( nodeVar579 + vec3( dot( nodeVar579, ( nodeVar579.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar580 = ( ( nodeVar543 + vec2( -1.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar581 = fract( ( vec3( nodeVar580.x, nodeVar580.y, nodeVar580.x ) * vec3( 0.1031 ) ) );
									nodeVar581 = ( nodeVar581 + vec3( dot( nodeVar581, ( nodeVar581.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar582 = length( ( ( vec2( -1.0, 1.0 ) + vec2( fract( ( ( nodeVar579.x + nodeVar579.y ) * nodeVar579.z ) ), fract( ( ( nodeVar581.x + nodeVar581.y ) * nodeVar581.z ) ) ) ) - nodeVar544 ) );

									if ( ( nodeVar582 < nodeVar545 ) ) {

										nodeVar546 = nodeVar545;
										nodeVar545 = nodeVar582;
										nodeVar547 = ( nodeVar543 + vec2( -1.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar582 < nodeVar546 ) ) {

											nodeVar546 = nodeVar582;
											

										}

										

									}

									nodeVar583 = ( nodeVar543 + vec2( 0.0, 1.0 ) );
									nodeVar584 = fract( ( vec3( nodeVar583.x, nodeVar583.y, nodeVar583.x ) * vec3( 0.1031 ) ) );
									nodeVar584 = ( nodeVar584 + vec3( dot( nodeVar584, ( nodeVar584.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar585 = ( ( nodeVar543 + vec2( 0.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar586 = fract( ( vec3( nodeVar585.x, nodeVar585.y, nodeVar585.x ) * vec3( 0.1031 ) ) );
									nodeVar586 = ( nodeVar586 + vec3( dot( nodeVar586, ( nodeVar586.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar587 = length( ( ( vec2( 0.0, 1.0 ) + vec2( fract( ( ( nodeVar584.x + nodeVar584.y ) * nodeVar584.z ) ), fract( ( ( nodeVar586.x + nodeVar586.y ) * nodeVar586.z ) ) ) ) - nodeVar544 ) );

									if ( ( nodeVar587 < nodeVar545 ) ) {

										nodeVar546 = nodeVar545;
										nodeVar545 = nodeVar587;
										nodeVar547 = ( nodeVar543 + vec2( 0.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar587 < nodeVar546 ) ) {

											nodeVar546 = nodeVar587;
											

										}

										

									}

									nodeVar588 = ( nodeVar543 + vec2( 1.0, 1.0 ) );
									nodeVar589 = fract( ( vec3( nodeVar588.x, nodeVar588.y, nodeVar588.x ) * vec3( 0.1031 ) ) );
									nodeVar589 = ( nodeVar589 + vec3( dot( nodeVar589, ( nodeVar589.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar590 = ( ( nodeVar543 + vec2( 1.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar591 = fract( ( vec3( nodeVar590.x, nodeVar590.y, nodeVar590.x ) * vec3( 0.1031 ) ) );
									nodeVar591 = ( nodeVar591 + vec3( dot( nodeVar591, ( nodeVar591.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar592 = length( ( ( vec2( 1.0, 1.0 ) + vec2( fract( ( ( nodeVar589.x + nodeVar589.y ) * nodeVar589.z ) ), fract( ( ( nodeVar591.x + nodeVar591.y ) * nodeVar591.z ) ) ) ) - nodeVar544 ) );

									if ( ( nodeVar592 < nodeVar545 ) ) {

										nodeVar546 = nodeVar545;
										nodeVar545 = nodeVar592;
										nodeVar547 = ( nodeVar543 + vec2( 1.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar592 < nodeVar546 ) ) {

											nodeVar546 = nodeVar592;
											

										}

										

									}

									nodeVar593 = smoothstep( 0.0, 0.038, ( nodeVar546 - nodeVar545 ) );
									nodeVar594 = ( nodeVar547 * vec2( 1.13 ) );
									nodeVar595 = fract( ( vec3( nodeVar594.x, nodeVar594.y, nodeVar594.x ) * vec3( 0.1031 ) ) );
									nodeVar595 = ( nodeVar595 + vec3( dot( nodeVar595, ( nodeVar595.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar596 = fract( ( ( nodeVar595.x + nodeVar595.y ) * nodeVar595.z ) );
									nodeVar597 = ( NORMAL_nodeVar7 * vec2( 9.0 ) );
									nodeVar598 = 0.0;
									nodeVar599 = 0.5;
									nodeVar600 = floor( nodeVar597 );
									nodeVar601 = fract( nodeVar597 );
									nodeVar601 = ( ( nodeVar601 * nodeVar601 ) * ( vec2( 3.0 ) - ( nodeVar601 * vec2( 2.0 ) ) ) );
									nodeVar602 = fract( ( vec3( nodeVar600.x, nodeVar600.y, nodeVar600.x ) * vec3( 0.1031 ) ) );
									nodeVar602 = ( nodeVar602 + vec3( dot( nodeVar602, ( nodeVar602.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar603 = ( nodeVar600 + vec2( 1.0, 0.0 ) );
									nodeVar604 = fract( ( vec3( nodeVar603.x, nodeVar603.y, nodeVar603.x ) * vec3( 0.1031 ) ) );
									nodeVar604 = ( nodeVar604 + vec3( dot( nodeVar604, ( nodeVar604.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar605 = ( nodeVar600 + vec2( 0.0, 1.0 ) );
									nodeVar606 = fract( ( vec3( nodeVar605.x, nodeVar605.y, nodeVar605.x ) * vec3( 0.1031 ) ) );
									nodeVar606 = ( nodeVar606 + vec3( dot( nodeVar606, ( nodeVar606.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar607 = ( nodeVar600 + vec2( 1.0, 1.0 ) );
									nodeVar608 = fract( ( vec3( nodeVar607.x, nodeVar607.y, nodeVar607.x ) * vec3( 0.1031 ) ) );
									nodeVar608 = ( nodeVar608 + vec3( dot( nodeVar608, ( nodeVar608.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar598 = ( nodeVar598 + ( nodeVar599 * mix( mix( fract( ( ( nodeVar602.x + nodeVar602.y ) * nodeVar602.z ) ), fract( ( ( nodeVar604.x + nodeVar604.y ) * nodeVar604.z ) ), nodeVar601.x ), mix( fract( ( ( nodeVar606.x + nodeVar606.y ) * nodeVar606.z ) ), fract( ( ( nodeVar608.x + nodeVar608.y ) * nodeVar608.z ) ), nodeVar601.x ), nodeVar601.y ) ) );
									nodeVar597 = ( nodeVar597 * vec2( 2.03 ) );
									nodeVar599 = ( nodeVar599 * 0.52 );
									nodeVar609 = floor( nodeVar597 );
									nodeVar610 = fract( nodeVar597 );
									nodeVar610 = ( ( nodeVar610 * nodeVar610 ) * ( vec2( 3.0 ) - ( nodeVar610 * vec2( 2.0 ) ) ) );
									nodeVar611 = fract( ( vec3( nodeVar609.x, nodeVar609.y, nodeVar609.x ) * vec3( 0.1031 ) ) );
									nodeVar611 = ( nodeVar611 + vec3( dot( nodeVar611, ( nodeVar611.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar612 = ( nodeVar609 + vec2( 1.0, 0.0 ) );
									nodeVar613 = fract( ( vec3( nodeVar612.x, nodeVar612.y, nodeVar612.x ) * vec3( 0.1031 ) ) );
									nodeVar613 = ( nodeVar613 + vec3( dot( nodeVar613, ( nodeVar613.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar614 = ( nodeVar609 + vec2( 0.0, 1.0 ) );
									nodeVar615 = fract( ( vec3( nodeVar614.x, nodeVar614.y, nodeVar614.x ) * vec3( 0.1031 ) ) );
									nodeVar615 = ( nodeVar615 + vec3( dot( nodeVar615, ( nodeVar615.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar616 = ( nodeVar609 + vec2( 1.0, 1.0 ) );
									nodeVar617 = fract( ( vec3( nodeVar616.x, nodeVar616.y, nodeVar616.x ) * vec3( 0.1031 ) ) );
									nodeVar617 = ( nodeVar617 + vec3( dot( nodeVar617, ( nodeVar617.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar598 = ( nodeVar598 + ( nodeVar599 * mix( mix( fract( ( ( nodeVar611.x + nodeVar611.y ) * nodeVar611.z ) ), fract( ( ( nodeVar613.x + nodeVar613.y ) * nodeVar613.z ) ), nodeVar610.x ), mix( fract( ( ( nodeVar615.x + nodeVar615.y ) * nodeVar615.z ) ), fract( ( ( nodeVar617.x + nodeVar617.y ) * nodeVar617.z ) ), nodeVar610.x ), nodeVar610.y ) ) );
									nodeVar597 = ( nodeVar597 * vec2( 2.03 ) );
									nodeVar599 = ( nodeVar599 * 0.52 );
									nodeVar618 = floor( nodeVar597 );
									nodeVar619 = fract( nodeVar597 );
									nodeVar619 = ( ( nodeVar619 * nodeVar619 ) * ( vec2( 3.0 ) - ( nodeVar619 * vec2( 2.0 ) ) ) );
									nodeVar620 = fract( ( vec3( nodeVar618.x, nodeVar618.y, nodeVar618.x ) * vec3( 0.1031 ) ) );
									nodeVar620 = ( nodeVar620 + vec3( dot( nodeVar620, ( nodeVar620.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar621 = ( nodeVar618 + vec2( 1.0, 0.0 ) );
									nodeVar622 = fract( ( vec3( nodeVar621.x, nodeVar621.y, nodeVar621.x ) * vec3( 0.1031 ) ) );
									nodeVar622 = ( nodeVar622 + vec3( dot( nodeVar622, ( nodeVar622.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar623 = ( nodeVar618 + vec2( 0.0, 1.0 ) );
									nodeVar624 = fract( ( vec3( nodeVar623.x, nodeVar623.y, nodeVar623.x ) * vec3( 0.1031 ) ) );
									nodeVar624 = ( nodeVar624 + vec3( dot( nodeVar624, ( nodeVar624.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar625 = ( nodeVar618 + vec2( 1.0, 1.0 ) );
									nodeVar626 = fract( ( vec3( nodeVar625.x, nodeVar625.y, nodeVar625.x ) * vec3( 0.1031 ) ) );
									nodeVar626 = ( nodeVar626 + vec3( dot( nodeVar626, ( nodeVar626.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar598 = ( nodeVar598 + ( nodeVar599 * mix( mix( fract( ( ( nodeVar620.x + nodeVar620.y ) * nodeVar620.z ) ), fract( ( ( nodeVar622.x + nodeVar622.y ) * nodeVar622.z ) ), nodeVar619.x ), mix( fract( ( ( nodeVar624.x + nodeVar624.y ) * nodeVar624.z ) ), fract( ( ( nodeVar626.x + nodeVar626.y ) * nodeVar626.z ) ), nodeVar619.x ), nodeVar619.y ) ) );
									nodeVar597 = ( nodeVar597 * vec2( 2.03 ) );
									nodeVar599 = ( nodeVar599 * 0.52 );
									nodeVar627 = floor( nodeVar597 );
									nodeVar628 = fract( nodeVar597 );
									nodeVar628 = ( ( nodeVar628 * nodeVar628 ) * ( vec2( 3.0 ) - ( nodeVar628 * vec2( 2.0 ) ) ) );
									nodeVar629 = fract( ( vec3( nodeVar627.x, nodeVar627.y, nodeVar627.x ) * vec3( 0.1031 ) ) );
									nodeVar629 = ( nodeVar629 + vec3( dot( nodeVar629, ( nodeVar629.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar630 = ( nodeVar627 + vec2( 1.0, 0.0 ) );
									nodeVar631 = fract( ( vec3( nodeVar630.x, nodeVar630.y, nodeVar630.x ) * vec3( 0.1031 ) ) );
									nodeVar631 = ( nodeVar631 + vec3( dot( nodeVar631, ( nodeVar631.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar632 = ( nodeVar627 + vec2( 0.0, 1.0 ) );
									nodeVar633 = fract( ( vec3( nodeVar632.x, nodeVar632.y, nodeVar632.x ) * vec3( 0.1031 ) ) );
									nodeVar633 = ( nodeVar633 + vec3( dot( nodeVar633, ( nodeVar633.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar634 = ( nodeVar627 + vec2( 1.0, 1.0 ) );
									nodeVar635 = fract( ( vec3( nodeVar634.x, nodeVar634.y, nodeVar634.x ) * vec3( 0.1031 ) ) );
									nodeVar635 = ( nodeVar635 + vec3( dot( nodeVar635, ( nodeVar635.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar598 = ( nodeVar598 + ( nodeVar599 * mix( mix( fract( ( ( nodeVar629.x + nodeVar629.y ) * nodeVar629.z ) ), fract( ( ( nodeVar631.x + nodeVar631.y ) * nodeVar631.z ) ), nodeVar628.x ), mix( fract( ( ( nodeVar633.x + nodeVar633.y ) * nodeVar633.z ) ), fract( ( ( nodeVar635.x + nodeVar635.y ) * nodeVar635.z ) ), nodeVar628.x ), nodeVar628.y ) ) );
									nodeVar597 = ( nodeVar597 * vec2( 2.03 ) );
									nodeVar599 = ( nodeVar599 * 0.52 );
									nodeVar10 = vec3( ( ( ( nodeVar593 * ( 0.5 + ( nodeVar596 * 0.5 ) ) ) * 0.5 ) + ( ( nodeVar593 * 0.22 ) * nodeVar598 ) ), nodeVar593, nodeVar596 );
									

								} else {


									if ( ( nodeVar9 < 8.5 ) ) {

										nodeVar636 = ( NORMAL_nodeVar7 * vec2( 0.9 ) );
										nodeVar637 = 0.0;
										nodeVar638 = 0.5;
										nodeVar639 = floor( nodeVar636 );
										nodeVar640 = fract( nodeVar636 );
										nodeVar640 = ( ( nodeVar640 * nodeVar640 ) * ( vec2( 3.0 ) - ( nodeVar640 * vec2( 2.0 ) ) ) );
										nodeVar641 = fract( ( vec3( nodeVar639.x, nodeVar639.y, nodeVar639.x ) * vec3( 0.1031 ) ) );
										nodeVar641 = ( nodeVar641 + vec3( dot( nodeVar641, ( nodeVar641.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar642 = ( nodeVar639 + vec2( 1.0, 0.0 ) );
										nodeVar643 = fract( ( vec3( nodeVar642.x, nodeVar642.y, nodeVar642.x ) * vec3( 0.1031 ) ) );
										nodeVar643 = ( nodeVar643 + vec3( dot( nodeVar643, ( nodeVar643.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar644 = ( nodeVar639 + vec2( 0.0, 1.0 ) );
										nodeVar645 = fract( ( vec3( nodeVar644.x, nodeVar644.y, nodeVar644.x ) * vec3( 0.1031 ) ) );
										nodeVar645 = ( nodeVar645 + vec3( dot( nodeVar645, ( nodeVar645.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar646 = ( nodeVar639 + vec2( 1.0, 1.0 ) );
										nodeVar647 = fract( ( vec3( nodeVar646.x, nodeVar646.y, nodeVar646.x ) * vec3( 0.1031 ) ) );
										nodeVar647 = ( nodeVar647 + vec3( dot( nodeVar647, ( nodeVar647.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar637 = ( nodeVar637 + ( nodeVar638 * mix( mix( fract( ( ( nodeVar641.x + nodeVar641.y ) * nodeVar641.z ) ), fract( ( ( nodeVar643.x + nodeVar643.y ) * nodeVar643.z ) ), nodeVar640.x ), mix( fract( ( ( nodeVar645.x + nodeVar645.y ) * nodeVar645.z ) ), fract( ( ( nodeVar647.x + nodeVar647.y ) * nodeVar647.z ) ), nodeVar640.x ), nodeVar640.y ) ) );
										nodeVar636 = ( nodeVar636 * vec2( 2.03 ) );
										nodeVar638 = ( nodeVar638 * 0.52 );
										nodeVar648 = floor( nodeVar636 );
										nodeVar649 = fract( nodeVar636 );
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
										nodeVar637 = ( nodeVar637 + ( nodeVar638 * mix( mix( fract( ( ( nodeVar650.x + nodeVar650.y ) * nodeVar650.z ) ), fract( ( ( nodeVar652.x + nodeVar652.y ) * nodeVar652.z ) ), nodeVar649.x ), mix( fract( ( ( nodeVar654.x + nodeVar654.y ) * nodeVar654.z ) ), fract( ( ( nodeVar656.x + nodeVar656.y ) * nodeVar656.z ) ), nodeVar649.x ), nodeVar649.y ) ) );
										nodeVar636 = ( nodeVar636 * vec2( 2.03 ) );
										nodeVar638 = ( nodeVar638 * 0.52 );
										nodeVar657 = floor( nodeVar636 );
										nodeVar658 = fract( nodeVar636 );
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
										nodeVar637 = ( nodeVar637 + ( nodeVar638 * mix( mix( fract( ( ( nodeVar659.x + nodeVar659.y ) * nodeVar659.z ) ), fract( ( ( nodeVar661.x + nodeVar661.y ) * nodeVar661.z ) ), nodeVar658.x ), mix( fract( ( ( nodeVar663.x + nodeVar663.y ) * nodeVar663.z ) ), fract( ( ( nodeVar665.x + nodeVar665.y ) * nodeVar665.z ) ), nodeVar658.x ), nodeVar658.y ) ) );
										nodeVar636 = ( nodeVar636 * vec2( 2.03 ) );
										nodeVar638 = ( nodeVar638 * 0.52 );
										nodeVar666 = floor( nodeVar636 );
										nodeVar667 = fract( nodeVar636 );
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
										nodeVar637 = ( nodeVar637 + ( nodeVar638 * mix( mix( fract( ( ( nodeVar668.x + nodeVar668.y ) * nodeVar668.z ) ), fract( ( ( nodeVar670.x + nodeVar670.y ) * nodeVar670.z ) ), nodeVar667.x ), mix( fract( ( ( nodeVar672.x + nodeVar672.y ) * nodeVar672.z ) ), fract( ( ( nodeVar674.x + nodeVar674.y ) * nodeVar674.z ) ), nodeVar667.x ), nodeVar667.y ) ) );
										nodeVar636 = ( nodeVar636 * vec2( 2.03 ) );
										nodeVar638 = ( nodeVar638 * 0.52 );
										nodeVar675 = ( NORMAL_nodeVar7 * vec2( 6.0 ) );
										nodeVar676 = 0.0;
										nodeVar677 = 0.5;
										nodeVar678 = floor( nodeVar675 );
										nodeVar679 = fract( nodeVar675 );
										nodeVar679 = ( ( nodeVar679 * nodeVar679 ) * ( vec2( 3.0 ) - ( nodeVar679 * vec2( 2.0 ) ) ) );
										nodeVar680 = fract( ( vec3( nodeVar678.x, nodeVar678.y, nodeVar678.x ) * vec3( 0.1031 ) ) );
										nodeVar680 = ( nodeVar680 + vec3( dot( nodeVar680, ( nodeVar680.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar681 = ( nodeVar678 + vec2( 1.0, 0.0 ) );
										nodeVar682 = fract( ( vec3( nodeVar681.x, nodeVar681.y, nodeVar681.x ) * vec3( 0.1031 ) ) );
										nodeVar682 = ( nodeVar682 + vec3( dot( nodeVar682, ( nodeVar682.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar683 = ( nodeVar678 + vec2( 0.0, 1.0 ) );
										nodeVar684 = fract( ( vec3( nodeVar683.x, nodeVar683.y, nodeVar683.x ) * vec3( 0.1031 ) ) );
										nodeVar684 = ( nodeVar684 + vec3( dot( nodeVar684, ( nodeVar684.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar685 = ( nodeVar678 + vec2( 1.0, 1.0 ) );
										nodeVar686 = fract( ( vec3( nodeVar685.x, nodeVar685.y, nodeVar685.x ) * vec3( 0.1031 ) ) );
										nodeVar686 = ( nodeVar686 + vec3( dot( nodeVar686, ( nodeVar686.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar676 = ( nodeVar676 + ( nodeVar677 * mix( mix( fract( ( ( nodeVar680.x + nodeVar680.y ) * nodeVar680.z ) ), fract( ( ( nodeVar682.x + nodeVar682.y ) * nodeVar682.z ) ), nodeVar679.x ), mix( fract( ( ( nodeVar684.x + nodeVar684.y ) * nodeVar684.z ) ), fract( ( ( nodeVar686.x + nodeVar686.y ) * nodeVar686.z ) ), nodeVar679.x ), nodeVar679.y ) ) );
										nodeVar675 = ( nodeVar675 * vec2( 2.03 ) );
										nodeVar677 = ( nodeVar677 * 0.52 );
										nodeVar687 = floor( nodeVar675 );
										nodeVar688 = fract( nodeVar675 );
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
										nodeVar676 = ( nodeVar676 + ( nodeVar677 * mix( mix( fract( ( ( nodeVar689.x + nodeVar689.y ) * nodeVar689.z ) ), fract( ( ( nodeVar691.x + nodeVar691.y ) * nodeVar691.z ) ), nodeVar688.x ), mix( fract( ( ( nodeVar693.x + nodeVar693.y ) * nodeVar693.z ) ), fract( ( ( nodeVar695.x + nodeVar695.y ) * nodeVar695.z ) ), nodeVar688.x ), nodeVar688.y ) ) );
										nodeVar675 = ( nodeVar675 * vec2( 2.03 ) );
										nodeVar677 = ( nodeVar677 * 0.52 );
										nodeVar696 = floor( nodeVar675 );
										nodeVar697 = fract( nodeVar675 );
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
										nodeVar676 = ( nodeVar676 + ( nodeVar677 * mix( mix( fract( ( ( nodeVar698.x + nodeVar698.y ) * nodeVar698.z ) ), fract( ( ( nodeVar700.x + nodeVar700.y ) * nodeVar700.z ) ), nodeVar697.x ), mix( fract( ( ( nodeVar702.x + nodeVar702.y ) * nodeVar702.z ) ), fract( ( ( nodeVar704.x + nodeVar704.y ) * nodeVar704.z ) ), nodeVar697.x ), nodeVar697.y ) ) );
										nodeVar675 = ( nodeVar675 * vec2( 2.03 ) );
										nodeVar677 = ( nodeVar677 * 0.52 );
										nodeVar705 = floor( nodeVar675 );
										nodeVar706 = fract( nodeVar675 );
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
										nodeVar676 = ( nodeVar676 + ( nodeVar677 * mix( mix( fract( ( ( nodeVar707.x + nodeVar707.y ) * nodeVar707.z ) ), fract( ( ( nodeVar709.x + nodeVar709.y ) * nodeVar709.z ) ), nodeVar706.x ), mix( fract( ( ( nodeVar711.x + nodeVar711.y ) * nodeVar711.z ) ), fract( ( ( nodeVar713.x + nodeVar713.y ) * nodeVar713.z ) ), nodeVar706.x ), nodeVar706.y ) ) );
										nodeVar675 = ( nodeVar675 * vec2( 2.03 ) );
										nodeVar677 = ( nodeVar677 * 0.52 );
										nodeVar714 = ( ( nodeVar637 * 0.6 ) + ( nodeVar676 * 0.4 ) );
										nodeVar10 = vec3( nodeVar714, 1.0, nodeVar714 );
										

									} else {


										if ( ( nodeVar9 < 9.5 ) ) {

											nodeVar715 = ( NORMAL_nodeVar7 * vec2( 26.0 ) );
											nodeVar716 = 0.0;
											nodeVar717 = 0.5;
											nodeVar718 = floor( nodeVar715 );
											nodeVar719 = fract( nodeVar715 );
											nodeVar719 = ( ( nodeVar719 * nodeVar719 ) * ( vec2( 3.0 ) - ( nodeVar719 * vec2( 2.0 ) ) ) );
											nodeVar720 = fract( ( vec3( nodeVar718.x, nodeVar718.y, nodeVar718.x ) * vec3( 0.1031 ) ) );
											nodeVar720 = ( nodeVar720 + vec3( dot( nodeVar720, ( nodeVar720.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar721 = ( nodeVar718 + vec2( 1.0, 0.0 ) );
											nodeVar722 = fract( ( vec3( nodeVar721.x, nodeVar721.y, nodeVar721.x ) * vec3( 0.1031 ) ) );
											nodeVar722 = ( nodeVar722 + vec3( dot( nodeVar722, ( nodeVar722.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar723 = ( nodeVar718 + vec2( 0.0, 1.0 ) );
											nodeVar724 = fract( ( vec3( nodeVar723.x, nodeVar723.y, nodeVar723.x ) * vec3( 0.1031 ) ) );
											nodeVar724 = ( nodeVar724 + vec3( dot( nodeVar724, ( nodeVar724.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar725 = ( nodeVar718 + vec2( 1.0, 1.0 ) );
											nodeVar726 = fract( ( vec3( nodeVar725.x, nodeVar725.y, nodeVar725.x ) * vec3( 0.1031 ) ) );
											nodeVar726 = ( nodeVar726 + vec3( dot( nodeVar726, ( nodeVar726.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar716 = ( nodeVar716 + ( nodeVar717 * mix( mix( fract( ( ( nodeVar720.x + nodeVar720.y ) * nodeVar720.z ) ), fract( ( ( nodeVar722.x + nodeVar722.y ) * nodeVar722.z ) ), nodeVar719.x ), mix( fract( ( ( nodeVar724.x + nodeVar724.y ) * nodeVar724.z ) ), fract( ( ( nodeVar726.x + nodeVar726.y ) * nodeVar726.z ) ), nodeVar719.x ), nodeVar719.y ) ) );
											nodeVar715 = ( nodeVar715 * vec2( 2.03 ) );
											nodeVar717 = ( nodeVar717 * 0.52 );
											nodeVar727 = floor( nodeVar715 );
											nodeVar728 = fract( nodeVar715 );
											nodeVar728 = ( ( nodeVar728 * nodeVar728 ) * ( vec2( 3.0 ) - ( nodeVar728 * vec2( 2.0 ) ) ) );
											nodeVar729 = fract( ( vec3( nodeVar727.x, nodeVar727.y, nodeVar727.x ) * vec3( 0.1031 ) ) );
											nodeVar729 = ( nodeVar729 + vec3( dot( nodeVar729, ( nodeVar729.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar730 = ( nodeVar727 + vec2( 1.0, 0.0 ) );
											nodeVar731 = fract( ( vec3( nodeVar730.x, nodeVar730.y, nodeVar730.x ) * vec3( 0.1031 ) ) );
											nodeVar731 = ( nodeVar731 + vec3( dot( nodeVar731, ( nodeVar731.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar732 = ( nodeVar727 + vec2( 0.0, 1.0 ) );
											nodeVar733 = fract( ( vec3( nodeVar732.x, nodeVar732.y, nodeVar732.x ) * vec3( 0.1031 ) ) );
											nodeVar733 = ( nodeVar733 + vec3( dot( nodeVar733, ( nodeVar733.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar734 = ( nodeVar727 + vec2( 1.0, 1.0 ) );
											nodeVar735 = fract( ( vec3( nodeVar734.x, nodeVar734.y, nodeVar734.x ) * vec3( 0.1031 ) ) );
											nodeVar735 = ( nodeVar735 + vec3( dot( nodeVar735, ( nodeVar735.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar716 = ( nodeVar716 + ( nodeVar717 * mix( mix( fract( ( ( nodeVar729.x + nodeVar729.y ) * nodeVar729.z ) ), fract( ( ( nodeVar731.x + nodeVar731.y ) * nodeVar731.z ) ), nodeVar728.x ), mix( fract( ( ( nodeVar733.x + nodeVar733.y ) * nodeVar733.z ) ), fract( ( ( nodeVar735.x + nodeVar735.y ) * nodeVar735.z ) ), nodeVar728.x ), nodeVar728.y ) ) );
											nodeVar715 = ( nodeVar715 * vec2( 2.03 ) );
											nodeVar717 = ( nodeVar717 * 0.52 );
											nodeVar736 = floor( nodeVar715 );
											nodeVar737 = fract( nodeVar715 );
											nodeVar737 = ( ( nodeVar737 * nodeVar737 ) * ( vec2( 3.0 ) - ( nodeVar737 * vec2( 2.0 ) ) ) );
											nodeVar738 = fract( ( vec3( nodeVar736.x, nodeVar736.y, nodeVar736.x ) * vec3( 0.1031 ) ) );
											nodeVar738 = ( nodeVar738 + vec3( dot( nodeVar738, ( nodeVar738.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar739 = ( nodeVar736 + vec2( 1.0, 0.0 ) );
											nodeVar740 = fract( ( vec3( nodeVar739.x, nodeVar739.y, nodeVar739.x ) * vec3( 0.1031 ) ) );
											nodeVar740 = ( nodeVar740 + vec3( dot( nodeVar740, ( nodeVar740.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar741 = ( nodeVar736 + vec2( 0.0, 1.0 ) );
											nodeVar742 = fract( ( vec3( nodeVar741.x, nodeVar741.y, nodeVar741.x ) * vec3( 0.1031 ) ) );
											nodeVar742 = ( nodeVar742 + vec3( dot( nodeVar742, ( nodeVar742.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar743 = ( nodeVar736 + vec2( 1.0, 1.0 ) );
											nodeVar744 = fract( ( vec3( nodeVar743.x, nodeVar743.y, nodeVar743.x ) * vec3( 0.1031 ) ) );
											nodeVar744 = ( nodeVar744 + vec3( dot( nodeVar744, ( nodeVar744.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar716 = ( nodeVar716 + ( nodeVar717 * mix( mix( fract( ( ( nodeVar738.x + nodeVar738.y ) * nodeVar738.z ) ), fract( ( ( nodeVar740.x + nodeVar740.y ) * nodeVar740.z ) ), nodeVar737.x ), mix( fract( ( ( nodeVar742.x + nodeVar742.y ) * nodeVar742.z ) ), fract( ( ( nodeVar744.x + nodeVar744.y ) * nodeVar744.z ) ), nodeVar737.x ), nodeVar737.y ) ) );
											nodeVar715 = ( nodeVar715 * vec2( 2.03 ) );
											nodeVar717 = ( nodeVar717 * 0.52 );
											nodeVar745 = floor( nodeVar715 );
											nodeVar746 = fract( nodeVar715 );
											nodeVar746 = ( ( nodeVar746 * nodeVar746 ) * ( vec2( 3.0 ) - ( nodeVar746 * vec2( 2.0 ) ) ) );
											nodeVar747 = fract( ( vec3( nodeVar745.x, nodeVar745.y, nodeVar745.x ) * vec3( 0.1031 ) ) );
											nodeVar747 = ( nodeVar747 + vec3( dot( nodeVar747, ( nodeVar747.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar748 = ( nodeVar745 + vec2( 1.0, 0.0 ) );
											nodeVar749 = fract( ( vec3( nodeVar748.x, nodeVar748.y, nodeVar748.x ) * vec3( 0.1031 ) ) );
											nodeVar749 = ( nodeVar749 + vec3( dot( nodeVar749, ( nodeVar749.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar750 = ( nodeVar745 + vec2( 0.0, 1.0 ) );
											nodeVar751 = fract( ( vec3( nodeVar750.x, nodeVar750.y, nodeVar750.x ) * vec3( 0.1031 ) ) );
											nodeVar751 = ( nodeVar751 + vec3( dot( nodeVar751, ( nodeVar751.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar752 = ( nodeVar745 + vec2( 1.0, 1.0 ) );
											nodeVar753 = fract( ( vec3( nodeVar752.x, nodeVar752.y, nodeVar752.x ) * vec3( 0.1031 ) ) );
											nodeVar753 = ( nodeVar753 + vec3( dot( nodeVar753, ( nodeVar753.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar716 = ( nodeVar716 + ( nodeVar717 * mix( mix( fract( ( ( nodeVar747.x + nodeVar747.y ) * nodeVar747.z ) ), fract( ( ( nodeVar749.x + nodeVar749.y ) * nodeVar749.z ) ), nodeVar746.x ), mix( fract( ( ( nodeVar751.x + nodeVar751.y ) * nodeVar751.z ) ), fract( ( ( nodeVar753.x + nodeVar753.y ) * nodeVar753.z ) ), nodeVar746.x ), nodeVar746.y ) ) );
											nodeVar715 = ( nodeVar715 * vec2( 2.03 ) );
											nodeVar717 = ( nodeVar717 * 0.52 );
											nodeVar754 = ( NORMAL_nodeVar7 * vec2( 90.0 ) );
											nodeVar755 = 0.0;
											nodeVar756 = 0.5;
											nodeVar757 = floor( nodeVar754 );
											nodeVar758 = fract( nodeVar754 );
											nodeVar758 = ( ( nodeVar758 * nodeVar758 ) * ( vec2( 3.0 ) - ( nodeVar758 * vec2( 2.0 ) ) ) );
											nodeVar759 = fract( ( vec3( nodeVar757.x, nodeVar757.y, nodeVar757.x ) * vec3( 0.1031 ) ) );
											nodeVar759 = ( nodeVar759 + vec3( dot( nodeVar759, ( nodeVar759.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar760 = ( nodeVar757 + vec2( 1.0, 0.0 ) );
											nodeVar761 = fract( ( vec3( nodeVar760.x, nodeVar760.y, nodeVar760.x ) * vec3( 0.1031 ) ) );
											nodeVar761 = ( nodeVar761 + vec3( dot( nodeVar761, ( nodeVar761.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar762 = ( nodeVar757 + vec2( 0.0, 1.0 ) );
											nodeVar763 = fract( ( vec3( nodeVar762.x, nodeVar762.y, nodeVar762.x ) * vec3( 0.1031 ) ) );
											nodeVar763 = ( nodeVar763 + vec3( dot( nodeVar763, ( nodeVar763.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar764 = ( nodeVar757 + vec2( 1.0, 1.0 ) );
											nodeVar765 = fract( ( vec3( nodeVar764.x, nodeVar764.y, nodeVar764.x ) * vec3( 0.1031 ) ) );
											nodeVar765 = ( nodeVar765 + vec3( dot( nodeVar765, ( nodeVar765.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar755 = ( nodeVar755 + ( nodeVar756 * mix( mix( fract( ( ( nodeVar759.x + nodeVar759.y ) * nodeVar759.z ) ), fract( ( ( nodeVar761.x + nodeVar761.y ) * nodeVar761.z ) ), nodeVar758.x ), mix( fract( ( ( nodeVar763.x + nodeVar763.y ) * nodeVar763.z ) ), fract( ( ( nodeVar765.x + nodeVar765.y ) * nodeVar765.z ) ), nodeVar758.x ), nodeVar758.y ) ) );
											nodeVar754 = ( nodeVar754 * vec2( 2.03 ) );
											nodeVar756 = ( nodeVar756 * 0.52 );
											nodeVar766 = floor( nodeVar754 );
											nodeVar767 = fract( nodeVar754 );
											nodeVar767 = ( ( nodeVar767 * nodeVar767 ) * ( vec2( 3.0 ) - ( nodeVar767 * vec2( 2.0 ) ) ) );
											nodeVar768 = fract( ( vec3( nodeVar766.x, nodeVar766.y, nodeVar766.x ) * vec3( 0.1031 ) ) );
											nodeVar768 = ( nodeVar768 + vec3( dot( nodeVar768, ( nodeVar768.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar769 = ( nodeVar766 + vec2( 1.0, 0.0 ) );
											nodeVar770 = fract( ( vec3( nodeVar769.x, nodeVar769.y, nodeVar769.x ) * vec3( 0.1031 ) ) );
											nodeVar770 = ( nodeVar770 + vec3( dot( nodeVar770, ( nodeVar770.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar771 = ( nodeVar766 + vec2( 0.0, 1.0 ) );
											nodeVar772 = fract( ( vec3( nodeVar771.x, nodeVar771.y, nodeVar771.x ) * vec3( 0.1031 ) ) );
											nodeVar772 = ( nodeVar772 + vec3( dot( nodeVar772, ( nodeVar772.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar773 = ( nodeVar766 + vec2( 1.0, 1.0 ) );
											nodeVar774 = fract( ( vec3( nodeVar773.x, nodeVar773.y, nodeVar773.x ) * vec3( 0.1031 ) ) );
											nodeVar774 = ( nodeVar774 + vec3( dot( nodeVar774, ( nodeVar774.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar755 = ( nodeVar755 + ( nodeVar756 * mix( mix( fract( ( ( nodeVar768.x + nodeVar768.y ) * nodeVar768.z ) ), fract( ( ( nodeVar770.x + nodeVar770.y ) * nodeVar770.z ) ), nodeVar767.x ), mix( fract( ( ( nodeVar772.x + nodeVar772.y ) * nodeVar772.z ) ), fract( ( ( nodeVar774.x + nodeVar774.y ) * nodeVar774.z ) ), nodeVar767.x ), nodeVar767.y ) ) );
											nodeVar754 = ( nodeVar754 * vec2( 2.03 ) );
											nodeVar756 = ( nodeVar756 * 0.52 );
											nodeVar775 = floor( nodeVar754 );
											nodeVar776 = fract( nodeVar754 );
											nodeVar776 = ( ( nodeVar776 * nodeVar776 ) * ( vec2( 3.0 ) - ( nodeVar776 * vec2( 2.0 ) ) ) );
											nodeVar777 = fract( ( vec3( nodeVar775.x, nodeVar775.y, nodeVar775.x ) * vec3( 0.1031 ) ) );
											nodeVar777 = ( nodeVar777 + vec3( dot( nodeVar777, ( nodeVar777.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar778 = ( nodeVar775 + vec2( 1.0, 0.0 ) );
											nodeVar779 = fract( ( vec3( nodeVar778.x, nodeVar778.y, nodeVar778.x ) * vec3( 0.1031 ) ) );
											nodeVar779 = ( nodeVar779 + vec3( dot( nodeVar779, ( nodeVar779.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar780 = ( nodeVar775 + vec2( 0.0, 1.0 ) );
											nodeVar781 = fract( ( vec3( nodeVar780.x, nodeVar780.y, nodeVar780.x ) * vec3( 0.1031 ) ) );
											nodeVar781 = ( nodeVar781 + vec3( dot( nodeVar781, ( nodeVar781.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar782 = ( nodeVar775 + vec2( 1.0, 1.0 ) );
											nodeVar783 = fract( ( vec3( nodeVar782.x, nodeVar782.y, nodeVar782.x ) * vec3( 0.1031 ) ) );
											nodeVar783 = ( nodeVar783 + vec3( dot( nodeVar783, ( nodeVar783.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar755 = ( nodeVar755 + ( nodeVar756 * mix( mix( fract( ( ( nodeVar777.x + nodeVar777.y ) * nodeVar777.z ) ), fract( ( ( nodeVar779.x + nodeVar779.y ) * nodeVar779.z ) ), nodeVar776.x ), mix( fract( ( ( nodeVar781.x + nodeVar781.y ) * nodeVar781.z ) ), fract( ( ( nodeVar783.x + nodeVar783.y ) * nodeVar783.z ) ), nodeVar776.x ), nodeVar776.y ) ) );
											nodeVar754 = ( nodeVar754 * vec2( 2.03 ) );
											nodeVar756 = ( nodeVar756 * 0.52 );
											nodeVar784 = floor( nodeVar754 );
											nodeVar785 = fract( nodeVar754 );
											nodeVar785 = ( ( nodeVar785 * nodeVar785 ) * ( vec2( 3.0 ) - ( nodeVar785 * vec2( 2.0 ) ) ) );
											nodeVar786 = fract( ( vec3( nodeVar784.x, nodeVar784.y, nodeVar784.x ) * vec3( 0.1031 ) ) );
											nodeVar786 = ( nodeVar786 + vec3( dot( nodeVar786, ( nodeVar786.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar787 = ( nodeVar784 + vec2( 1.0, 0.0 ) );
											nodeVar788 = fract( ( vec3( nodeVar787.x, nodeVar787.y, nodeVar787.x ) * vec3( 0.1031 ) ) );
											nodeVar788 = ( nodeVar788 + vec3( dot( nodeVar788, ( nodeVar788.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar789 = ( nodeVar784 + vec2( 0.0, 1.0 ) );
											nodeVar790 = fract( ( vec3( nodeVar789.x, nodeVar789.y, nodeVar789.x ) * vec3( 0.1031 ) ) );
											nodeVar790 = ( nodeVar790 + vec3( dot( nodeVar790, ( nodeVar790.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar791 = ( nodeVar784 + vec2( 1.0, 1.0 ) );
											nodeVar792 = fract( ( vec3( nodeVar791.x, nodeVar791.y, nodeVar791.x ) * vec3( 0.1031 ) ) );
											nodeVar792 = ( nodeVar792 + vec3( dot( nodeVar792, ( nodeVar792.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar755 = ( nodeVar755 + ( nodeVar756 * mix( mix( fract( ( ( nodeVar786.x + nodeVar786.y ) * nodeVar786.z ) ), fract( ( ( nodeVar788.x + nodeVar788.y ) * nodeVar788.z ) ), nodeVar785.x ), mix( fract( ( ( nodeVar790.x + nodeVar790.y ) * nodeVar790.z ) ), fract( ( ( nodeVar792.x + nodeVar792.y ) * nodeVar792.z ) ), nodeVar785.x ), nodeVar785.y ) ) );
											nodeVar754 = ( nodeVar754 * vec2( 2.03 ) );
											nodeVar756 = ( nodeVar756 * 0.52 );
											nodeVar793 = ( ( nodeVar716 * 0.6 ) + ( nodeVar755 * 0.4 ) );
											nodeVar10 = vec3( ( nodeVar793 * 0.5 ), ( 0.8 + ( nodeVar793 * 0.2 ) ), nodeVar793 );
											

										} else {


											if ( ( nodeVar9 < 10.5 ) ) {

												nodeVar794 = ( NORMAL_nodeVar7 * vec2( 5.5 ) );
												nodeVar795 = 0.0;
												nodeVar796 = 0.5;
												nodeVar797 = floor( nodeVar794 );
												nodeVar798 = fract( nodeVar794 );
												nodeVar798 = ( ( nodeVar798 * nodeVar798 ) * ( vec2( 3.0 ) - ( nodeVar798 * vec2( 2.0 ) ) ) );
												nodeVar799 = fract( ( vec3( nodeVar797.x, nodeVar797.y, nodeVar797.x ) * vec3( 0.1031 ) ) );
												nodeVar799 = ( nodeVar799 + vec3( dot( nodeVar799, ( nodeVar799.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar800 = ( nodeVar797 + vec2( 1.0, 0.0 ) );
												nodeVar801 = fract( ( vec3( nodeVar800.x, nodeVar800.y, nodeVar800.x ) * vec3( 0.1031 ) ) );
												nodeVar801 = ( nodeVar801 + vec3( dot( nodeVar801, ( nodeVar801.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar802 = ( nodeVar797 + vec2( 0.0, 1.0 ) );
												nodeVar803 = fract( ( vec3( nodeVar802.x, nodeVar802.y, nodeVar802.x ) * vec3( 0.1031 ) ) );
												nodeVar803 = ( nodeVar803 + vec3( dot( nodeVar803, ( nodeVar803.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar804 = ( nodeVar797 + vec2( 1.0, 1.0 ) );
												nodeVar805 = fract( ( vec3( nodeVar804.x, nodeVar804.y, nodeVar804.x ) * vec3( 0.1031 ) ) );
												nodeVar805 = ( nodeVar805 + vec3( dot( nodeVar805, ( nodeVar805.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar795 = ( nodeVar795 + ( nodeVar796 * mix( mix( fract( ( ( nodeVar799.x + nodeVar799.y ) * nodeVar799.z ) ), fract( ( ( nodeVar801.x + nodeVar801.y ) * nodeVar801.z ) ), nodeVar798.x ), mix( fract( ( ( nodeVar803.x + nodeVar803.y ) * nodeVar803.z ) ), fract( ( ( nodeVar805.x + nodeVar805.y ) * nodeVar805.z ) ), nodeVar798.x ), nodeVar798.y ) ) );
												nodeVar794 = ( nodeVar794 * vec2( 2.03 ) );
												nodeVar796 = ( nodeVar796 * 0.52 );
												nodeVar806 = floor( nodeVar794 );
												nodeVar807 = fract( nodeVar794 );
												nodeVar807 = ( ( nodeVar807 * nodeVar807 ) * ( vec2( 3.0 ) - ( nodeVar807 * vec2( 2.0 ) ) ) );
												nodeVar808 = fract( ( vec3( nodeVar806.x, nodeVar806.y, nodeVar806.x ) * vec3( 0.1031 ) ) );
												nodeVar808 = ( nodeVar808 + vec3( dot( nodeVar808, ( nodeVar808.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar809 = ( nodeVar806 + vec2( 1.0, 0.0 ) );
												nodeVar810 = fract( ( vec3( nodeVar809.x, nodeVar809.y, nodeVar809.x ) * vec3( 0.1031 ) ) );
												nodeVar810 = ( nodeVar810 + vec3( dot( nodeVar810, ( nodeVar810.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar811 = ( nodeVar806 + vec2( 0.0, 1.0 ) );
												nodeVar812 = fract( ( vec3( nodeVar811.x, nodeVar811.y, nodeVar811.x ) * vec3( 0.1031 ) ) );
												nodeVar812 = ( nodeVar812 + vec3( dot( nodeVar812, ( nodeVar812.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar813 = ( nodeVar806 + vec2( 1.0, 1.0 ) );
												nodeVar814 = fract( ( vec3( nodeVar813.x, nodeVar813.y, nodeVar813.x ) * vec3( 0.1031 ) ) );
												nodeVar814 = ( nodeVar814 + vec3( dot( nodeVar814, ( nodeVar814.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar795 = ( nodeVar795 + ( nodeVar796 * mix( mix( fract( ( ( nodeVar808.x + nodeVar808.y ) * nodeVar808.z ) ), fract( ( ( nodeVar810.x + nodeVar810.y ) * nodeVar810.z ) ), nodeVar807.x ), mix( fract( ( ( nodeVar812.x + nodeVar812.y ) * nodeVar812.z ) ), fract( ( ( nodeVar814.x + nodeVar814.y ) * nodeVar814.z ) ), nodeVar807.x ), nodeVar807.y ) ) );
												nodeVar794 = ( nodeVar794 * vec2( 2.03 ) );
												nodeVar796 = ( nodeVar796 * 0.52 );
												nodeVar815 = floor( nodeVar794 );
												nodeVar816 = fract( nodeVar794 );
												nodeVar816 = ( ( nodeVar816 * nodeVar816 ) * ( vec2( 3.0 ) - ( nodeVar816 * vec2( 2.0 ) ) ) );
												nodeVar817 = fract( ( vec3( nodeVar815.x, nodeVar815.y, nodeVar815.x ) * vec3( 0.1031 ) ) );
												nodeVar817 = ( nodeVar817 + vec3( dot( nodeVar817, ( nodeVar817.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar818 = ( nodeVar815 + vec2( 1.0, 0.0 ) );
												nodeVar819 = fract( ( vec3( nodeVar818.x, nodeVar818.y, nodeVar818.x ) * vec3( 0.1031 ) ) );
												nodeVar819 = ( nodeVar819 + vec3( dot( nodeVar819, ( nodeVar819.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar820 = ( nodeVar815 + vec2( 0.0, 1.0 ) );
												nodeVar821 = fract( ( vec3( nodeVar820.x, nodeVar820.y, nodeVar820.x ) * vec3( 0.1031 ) ) );
												nodeVar821 = ( nodeVar821 + vec3( dot( nodeVar821, ( nodeVar821.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar822 = ( nodeVar815 + vec2( 1.0, 1.0 ) );
												nodeVar823 = fract( ( vec3( nodeVar822.x, nodeVar822.y, nodeVar822.x ) * vec3( 0.1031 ) ) );
												nodeVar823 = ( nodeVar823 + vec3( dot( nodeVar823, ( nodeVar823.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar795 = ( nodeVar795 + ( nodeVar796 * mix( mix( fract( ( ( nodeVar817.x + nodeVar817.y ) * nodeVar817.z ) ), fract( ( ( nodeVar819.x + nodeVar819.y ) * nodeVar819.z ) ), nodeVar816.x ), mix( fract( ( ( nodeVar821.x + nodeVar821.y ) * nodeVar821.z ) ), fract( ( ( nodeVar823.x + nodeVar823.y ) * nodeVar823.z ) ), nodeVar816.x ), nodeVar816.y ) ) );
												nodeVar794 = ( nodeVar794 * vec2( 2.03 ) );
												nodeVar796 = ( nodeVar796 * 0.52 );
												nodeVar824 = floor( nodeVar794 );
												nodeVar825 = fract( nodeVar794 );
												nodeVar825 = ( ( nodeVar825 * nodeVar825 ) * ( vec2( 3.0 ) - ( nodeVar825 * vec2( 2.0 ) ) ) );
												nodeVar826 = fract( ( vec3( nodeVar824.x, nodeVar824.y, nodeVar824.x ) * vec3( 0.1031 ) ) );
												nodeVar826 = ( nodeVar826 + vec3( dot( nodeVar826, ( nodeVar826.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar827 = ( nodeVar824 + vec2( 1.0, 0.0 ) );
												nodeVar828 = fract( ( vec3( nodeVar827.x, nodeVar827.y, nodeVar827.x ) * vec3( 0.1031 ) ) );
												nodeVar828 = ( nodeVar828 + vec3( dot( nodeVar828, ( nodeVar828.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar829 = ( nodeVar824 + vec2( 0.0, 1.0 ) );
												nodeVar830 = fract( ( vec3( nodeVar829.x, nodeVar829.y, nodeVar829.x ) * vec3( 0.1031 ) ) );
												nodeVar830 = ( nodeVar830 + vec3( dot( nodeVar830, ( nodeVar830.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar831 = ( nodeVar824 + vec2( 1.0, 1.0 ) );
												nodeVar832 = fract( ( vec3( nodeVar831.x, nodeVar831.y, nodeVar831.x ) * vec3( 0.1031 ) ) );
												nodeVar832 = ( nodeVar832 + vec3( dot( nodeVar832, ( nodeVar832.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar795 = ( nodeVar795 + ( nodeVar796 * mix( mix( fract( ( ( nodeVar826.x + nodeVar826.y ) * nodeVar826.z ) ), fract( ( ( nodeVar828.x + nodeVar828.y ) * nodeVar828.z ) ), nodeVar825.x ), mix( fract( ( ( nodeVar830.x + nodeVar830.y ) * nodeVar830.z ) ), fract( ( ( nodeVar832.x + nodeVar832.y ) * nodeVar832.z ) ), nodeVar825.x ), nodeVar825.y ) ) );
												nodeVar794 = ( nodeVar794 * vec2( 2.03 ) );
												nodeVar796 = ( nodeVar796 * 0.52 );
												nodeVar833 = ( NORMAL_nodeVar7 * vec2( 17.0 ) );
												nodeVar834 = 0.0;
												nodeVar835 = 0.5;
												nodeVar836 = floor( nodeVar833 );
												nodeVar837 = fract( nodeVar833 );
												nodeVar837 = ( ( nodeVar837 * nodeVar837 ) * ( vec2( 3.0 ) - ( nodeVar837 * vec2( 2.0 ) ) ) );
												nodeVar838 = fract( ( vec3( nodeVar836.x, nodeVar836.y, nodeVar836.x ) * vec3( 0.1031 ) ) );
												nodeVar838 = ( nodeVar838 + vec3( dot( nodeVar838, ( nodeVar838.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar839 = ( nodeVar836 + vec2( 1.0, 0.0 ) );
												nodeVar840 = fract( ( vec3( nodeVar839.x, nodeVar839.y, nodeVar839.x ) * vec3( 0.1031 ) ) );
												nodeVar840 = ( nodeVar840 + vec3( dot( nodeVar840, ( nodeVar840.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar841 = ( nodeVar836 + vec2( 0.0, 1.0 ) );
												nodeVar842 = fract( ( vec3( nodeVar841.x, nodeVar841.y, nodeVar841.x ) * vec3( 0.1031 ) ) );
												nodeVar842 = ( nodeVar842 + vec3( dot( nodeVar842, ( nodeVar842.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar843 = ( nodeVar836 + vec2( 1.0, 1.0 ) );
												nodeVar844 = fract( ( vec3( nodeVar843.x, nodeVar843.y, nodeVar843.x ) * vec3( 0.1031 ) ) );
												nodeVar844 = ( nodeVar844 + vec3( dot( nodeVar844, ( nodeVar844.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar834 = ( nodeVar834 + ( nodeVar835 * mix( mix( fract( ( ( nodeVar838.x + nodeVar838.y ) * nodeVar838.z ) ), fract( ( ( nodeVar840.x + nodeVar840.y ) * nodeVar840.z ) ), nodeVar837.x ), mix( fract( ( ( nodeVar842.x + nodeVar842.y ) * nodeVar842.z ) ), fract( ( ( nodeVar844.x + nodeVar844.y ) * nodeVar844.z ) ), nodeVar837.x ), nodeVar837.y ) ) );
												nodeVar833 = ( nodeVar833 * vec2( 2.03 ) );
												nodeVar835 = ( nodeVar835 * 0.52 );
												nodeVar845 = floor( nodeVar833 );
												nodeVar846 = fract( nodeVar833 );
												nodeVar846 = ( ( nodeVar846 * nodeVar846 ) * ( vec2( 3.0 ) - ( nodeVar846 * vec2( 2.0 ) ) ) );
												nodeVar847 = fract( ( vec3( nodeVar845.x, nodeVar845.y, nodeVar845.x ) * vec3( 0.1031 ) ) );
												nodeVar847 = ( nodeVar847 + vec3( dot( nodeVar847, ( nodeVar847.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar848 = ( nodeVar845 + vec2( 1.0, 0.0 ) );
												nodeVar849 = fract( ( vec3( nodeVar848.x, nodeVar848.y, nodeVar848.x ) * vec3( 0.1031 ) ) );
												nodeVar849 = ( nodeVar849 + vec3( dot( nodeVar849, ( nodeVar849.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar850 = ( nodeVar845 + vec2( 0.0, 1.0 ) );
												nodeVar851 = fract( ( vec3( nodeVar850.x, nodeVar850.y, nodeVar850.x ) * vec3( 0.1031 ) ) );
												nodeVar851 = ( nodeVar851 + vec3( dot( nodeVar851, ( nodeVar851.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar852 = ( nodeVar845 + vec2( 1.0, 1.0 ) );
												nodeVar853 = fract( ( vec3( nodeVar852.x, nodeVar852.y, nodeVar852.x ) * vec3( 0.1031 ) ) );
												nodeVar853 = ( nodeVar853 + vec3( dot( nodeVar853, ( nodeVar853.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar834 = ( nodeVar834 + ( nodeVar835 * mix( mix( fract( ( ( nodeVar847.x + nodeVar847.y ) * nodeVar847.z ) ), fract( ( ( nodeVar849.x + nodeVar849.y ) * nodeVar849.z ) ), nodeVar846.x ), mix( fract( ( ( nodeVar851.x + nodeVar851.y ) * nodeVar851.z ) ), fract( ( ( nodeVar853.x + nodeVar853.y ) * nodeVar853.z ) ), nodeVar846.x ), nodeVar846.y ) ) );
												nodeVar833 = ( nodeVar833 * vec2( 2.03 ) );
												nodeVar835 = ( nodeVar835 * 0.52 );
												nodeVar854 = floor( nodeVar833 );
												nodeVar855 = fract( nodeVar833 );
												nodeVar855 = ( ( nodeVar855 * nodeVar855 ) * ( vec2( 3.0 ) - ( nodeVar855 * vec2( 2.0 ) ) ) );
												nodeVar856 = fract( ( vec3( nodeVar854.x, nodeVar854.y, nodeVar854.x ) * vec3( 0.1031 ) ) );
												nodeVar856 = ( nodeVar856 + vec3( dot( nodeVar856, ( nodeVar856.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar857 = ( nodeVar854 + vec2( 1.0, 0.0 ) );
												nodeVar858 = fract( ( vec3( nodeVar857.x, nodeVar857.y, nodeVar857.x ) * vec3( 0.1031 ) ) );
												nodeVar858 = ( nodeVar858 + vec3( dot( nodeVar858, ( nodeVar858.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar859 = ( nodeVar854 + vec2( 0.0, 1.0 ) );
												nodeVar860 = fract( ( vec3( nodeVar859.x, nodeVar859.y, nodeVar859.x ) * vec3( 0.1031 ) ) );
												nodeVar860 = ( nodeVar860 + vec3( dot( nodeVar860, ( nodeVar860.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar861 = ( nodeVar854 + vec2( 1.0, 1.0 ) );
												nodeVar862 = fract( ( vec3( nodeVar861.x, nodeVar861.y, nodeVar861.x ) * vec3( 0.1031 ) ) );
												nodeVar862 = ( nodeVar862 + vec3( dot( nodeVar862, ( nodeVar862.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar834 = ( nodeVar834 + ( nodeVar835 * mix( mix( fract( ( ( nodeVar856.x + nodeVar856.y ) * nodeVar856.z ) ), fract( ( ( nodeVar858.x + nodeVar858.y ) * nodeVar858.z ) ), nodeVar855.x ), mix( fract( ( ( nodeVar860.x + nodeVar860.y ) * nodeVar860.z ) ), fract( ( ( nodeVar862.x + nodeVar862.y ) * nodeVar862.z ) ), nodeVar855.x ), nodeVar855.y ) ) );
												nodeVar833 = ( nodeVar833 * vec2( 2.03 ) );
												nodeVar835 = ( nodeVar835 * 0.52 );
												nodeVar863 = floor( nodeVar833 );
												nodeVar864 = fract( nodeVar833 );
												nodeVar864 = ( ( nodeVar864 * nodeVar864 ) * ( vec2( 3.0 ) - ( nodeVar864 * vec2( 2.0 ) ) ) );
												nodeVar865 = fract( ( vec3( nodeVar863.x, nodeVar863.y, nodeVar863.x ) * vec3( 0.1031 ) ) );
												nodeVar865 = ( nodeVar865 + vec3( dot( nodeVar865, ( nodeVar865.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar866 = ( nodeVar863 + vec2( 1.0, 0.0 ) );
												nodeVar867 = fract( ( vec3( nodeVar866.x, nodeVar866.y, nodeVar866.x ) * vec3( 0.1031 ) ) );
												nodeVar867 = ( nodeVar867 + vec3( dot( nodeVar867, ( nodeVar867.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar868 = ( nodeVar863 + vec2( 0.0, 1.0 ) );
												nodeVar869 = fract( ( vec3( nodeVar868.x, nodeVar868.y, nodeVar868.x ) * vec3( 0.1031 ) ) );
												nodeVar869 = ( nodeVar869 + vec3( dot( nodeVar869, ( nodeVar869.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar870 = ( nodeVar863 + vec2( 1.0, 1.0 ) );
												nodeVar871 = fract( ( vec3( nodeVar870.x, nodeVar870.y, nodeVar870.x ) * vec3( 0.1031 ) ) );
												nodeVar871 = ( nodeVar871 + vec3( dot( nodeVar871, ( nodeVar871.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar834 = ( nodeVar834 + ( nodeVar835 * mix( mix( fract( ( ( nodeVar865.x + nodeVar865.y ) * nodeVar865.z ) ), fract( ( ( nodeVar867.x + nodeVar867.y ) * nodeVar867.z ) ), nodeVar864.x ), mix( fract( ( ( nodeVar869.x + nodeVar869.y ) * nodeVar869.z ) ), fract( ( ( nodeVar871.x + nodeVar871.y ) * nodeVar871.z ) ), nodeVar864.x ), nodeVar864.y ) ) );
												nodeVar833 = ( nodeVar833 * vec2( 2.03 ) );
												nodeVar835 = ( nodeVar835 * 0.52 );
												nodeVar872 = ( ( nodeVar795 * 0.62 ) + ( nodeVar834 * 0.38 ) );
												nodeVar10 = vec3( ( ( nodeVar872 * 0.52 ) + ( ( 0.5 + ( ( sin( ( NORMAL_nodeVar7.x * 1300.0 ) ) * sin( ( NORMAL_nodeVar7.y * 1300.0 ) ) ) * 0.5 ) ) * 0.055 ) ), 1.0, ( 0.34 + ( nodeVar872 * 0.66 ) ) );
												

											} else {

												nodeVar873 = ( NORMAL_nodeVar7 * vec2( 4.0 ) );
												nodeVar874 = 0.0;
												nodeVar875 = 0.5;
												nodeVar876 = floor( nodeVar873 );
												nodeVar877 = fract( nodeVar873 );
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
												nodeVar874 = ( nodeVar874 + ( nodeVar875 * mix( mix( fract( ( ( nodeVar878.x + nodeVar878.y ) * nodeVar878.z ) ), fract( ( ( nodeVar880.x + nodeVar880.y ) * nodeVar880.z ) ), nodeVar877.x ), mix( fract( ( ( nodeVar882.x + nodeVar882.y ) * nodeVar882.z ) ), fract( ( ( nodeVar884.x + nodeVar884.y ) * nodeVar884.z ) ), nodeVar877.x ), nodeVar877.y ) ) );
												nodeVar873 = ( nodeVar873 * vec2( 2.03 ) );
												nodeVar875 = ( nodeVar875 * 0.52 );
												nodeVar885 = floor( nodeVar873 );
												nodeVar886 = fract( nodeVar873 );
												nodeVar886 = ( ( nodeVar886 * nodeVar886 ) * ( vec2( 3.0 ) - ( nodeVar886 * vec2( 2.0 ) ) ) );
												nodeVar887 = fract( ( vec3( nodeVar885.x, nodeVar885.y, nodeVar885.x ) * vec3( 0.1031 ) ) );
												nodeVar887 = ( nodeVar887 + vec3( dot( nodeVar887, ( nodeVar887.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar888 = ( nodeVar885 + vec2( 1.0, 0.0 ) );
												nodeVar889 = fract( ( vec3( nodeVar888.x, nodeVar888.y, nodeVar888.x ) * vec3( 0.1031 ) ) );
												nodeVar889 = ( nodeVar889 + vec3( dot( nodeVar889, ( nodeVar889.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar890 = ( nodeVar885 + vec2( 0.0, 1.0 ) );
												nodeVar891 = fract( ( vec3( nodeVar890.x, nodeVar890.y, nodeVar890.x ) * vec3( 0.1031 ) ) );
												nodeVar891 = ( nodeVar891 + vec3( dot( nodeVar891, ( nodeVar891.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar892 = ( nodeVar885 + vec2( 1.0, 1.0 ) );
												nodeVar893 = fract( ( vec3( nodeVar892.x, nodeVar892.y, nodeVar892.x ) * vec3( 0.1031 ) ) );
												nodeVar893 = ( nodeVar893 + vec3( dot( nodeVar893, ( nodeVar893.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar874 = ( nodeVar874 + ( nodeVar875 * mix( mix( fract( ( ( nodeVar887.x + nodeVar887.y ) * nodeVar887.z ) ), fract( ( ( nodeVar889.x + nodeVar889.y ) * nodeVar889.z ) ), nodeVar886.x ), mix( fract( ( ( nodeVar891.x + nodeVar891.y ) * nodeVar891.z ) ), fract( ( ( nodeVar893.x + nodeVar893.y ) * nodeVar893.z ) ), nodeVar886.x ), nodeVar886.y ) ) );
												nodeVar873 = ( nodeVar873 * vec2( 2.03 ) );
												nodeVar875 = ( nodeVar875 * 0.52 );
												nodeVar894 = floor( nodeVar873 );
												nodeVar895 = fract( nodeVar873 );
												nodeVar895 = ( ( nodeVar895 * nodeVar895 ) * ( vec2( 3.0 ) - ( nodeVar895 * vec2( 2.0 ) ) ) );
												nodeVar896 = fract( ( vec3( nodeVar894.x, nodeVar894.y, nodeVar894.x ) * vec3( 0.1031 ) ) );
												nodeVar896 = ( nodeVar896 + vec3( dot( nodeVar896, ( nodeVar896.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar897 = ( nodeVar894 + vec2( 1.0, 0.0 ) );
												nodeVar898 = fract( ( vec3( nodeVar897.x, nodeVar897.y, nodeVar897.x ) * vec3( 0.1031 ) ) );
												nodeVar898 = ( nodeVar898 + vec3( dot( nodeVar898, ( nodeVar898.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar899 = ( nodeVar894 + vec2( 0.0, 1.0 ) );
												nodeVar900 = fract( ( vec3( nodeVar899.x, nodeVar899.y, nodeVar899.x ) * vec3( 0.1031 ) ) );
												nodeVar900 = ( nodeVar900 + vec3( dot( nodeVar900, ( nodeVar900.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar901 = ( nodeVar894 + vec2( 1.0, 1.0 ) );
												nodeVar902 = fract( ( vec3( nodeVar901.x, nodeVar901.y, nodeVar901.x ) * vec3( 0.1031 ) ) );
												nodeVar902 = ( nodeVar902 + vec3( dot( nodeVar902, ( nodeVar902.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar874 = ( nodeVar874 + ( nodeVar875 * mix( mix( fract( ( ( nodeVar896.x + nodeVar896.y ) * nodeVar896.z ) ), fract( ( ( nodeVar898.x + nodeVar898.y ) * nodeVar898.z ) ), nodeVar895.x ), mix( fract( ( ( nodeVar900.x + nodeVar900.y ) * nodeVar900.z ) ), fract( ( ( nodeVar902.x + nodeVar902.y ) * nodeVar902.z ) ), nodeVar895.x ), nodeVar895.y ) ) );
												nodeVar873 = ( nodeVar873 * vec2( 2.03 ) );
												nodeVar875 = ( nodeVar875 * 0.52 );
												nodeVar903 = floor( nodeVar873 );
												nodeVar904 = fract( nodeVar873 );
												nodeVar904 = ( ( nodeVar904 * nodeVar904 ) * ( vec2( 3.0 ) - ( nodeVar904 * vec2( 2.0 ) ) ) );
												nodeVar905 = fract( ( vec3( nodeVar903.x, nodeVar903.y, nodeVar903.x ) * vec3( 0.1031 ) ) );
												nodeVar905 = ( nodeVar905 + vec3( dot( nodeVar905, ( nodeVar905.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar906 = ( nodeVar903 + vec2( 1.0, 0.0 ) );
												nodeVar907 = fract( ( vec3( nodeVar906.x, nodeVar906.y, nodeVar906.x ) * vec3( 0.1031 ) ) );
												nodeVar907 = ( nodeVar907 + vec3( dot( nodeVar907, ( nodeVar907.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar908 = ( nodeVar903 + vec2( 0.0, 1.0 ) );
												nodeVar909 = fract( ( vec3( nodeVar908.x, nodeVar908.y, nodeVar908.x ) * vec3( 0.1031 ) ) );
												nodeVar909 = ( nodeVar909 + vec3( dot( nodeVar909, ( nodeVar909.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar910 = ( nodeVar903 + vec2( 1.0, 1.0 ) );
												nodeVar911 = fract( ( vec3( nodeVar910.x, nodeVar910.y, nodeVar910.x ) * vec3( 0.1031 ) ) );
												nodeVar911 = ( nodeVar911 + vec3( dot( nodeVar911, ( nodeVar911.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar874 = ( nodeVar874 + ( nodeVar875 * mix( mix( fract( ( ( nodeVar905.x + nodeVar905.y ) * nodeVar905.z ) ), fract( ( ( nodeVar907.x + nodeVar907.y ) * nodeVar907.z ) ), nodeVar904.x ), mix( fract( ( ( nodeVar909.x + nodeVar909.y ) * nodeVar909.z ) ), fract( ( ( nodeVar911.x + nodeVar911.y ) * nodeVar911.z ) ), nodeVar904.x ), nodeVar904.y ) ) );
												nodeVar873 = ( nodeVar873 * vec2( 2.03 ) );
												nodeVar875 = ( nodeVar875 * 0.52 );
												nodeVar912 = nodeVar874;
												nodeVar10 = vec3( nodeVar912, 1.0, nodeVar912 );
												

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

	NORMAL_nodeVar913 = nodeVar10;
	nodeVar914 = ( nodeVar6 + vec2( nodeVar2, 0.0 ) );
	nodeVar915 = nodeVar8;
	nodeVar916 = vec3( 0.0, 1.0, 0.5 );

	if ( ( nodeVar915 < 0.5 ) ) {

		nodeVar917 = floor( ( nodeVar914.y / 0.225 ) );
		nodeVar918 = fract( ( ( nodeVar917 * 7.13 ) * 0.1031 ) );
		nodeVar918 = ( nodeVar918 * ( nodeVar918 + 33.33 ) );
		nodeVar918 = ( nodeVar918 * ( nodeVar918 + nodeVar918 ) );
		nodeVar919 = ( fract( nodeVar918 ) * 0.9 );
		nodeVar920 = fract( ( ( ( nodeVar917 * 3.7 ) + 11.0 ) * 0.1031 ) );
		nodeVar920 = ( nodeVar920 * ( nodeVar920 + 33.33 ) );
		nodeVar920 = ( nodeVar920 * ( nodeVar920 + nodeVar920 ) );
		nodeVar921 = ( 0.42 + ( fract( nodeVar920 ) * 0.42 ) );
		nodeVar922 = fract( ( ( nodeVar914.x + nodeVar919 ) / nodeVar921 ) );
		nodeVar923 = fract( ( nodeVar914.y / 0.225 ) );
		nodeVar924 = min( ( min( nodeVar922, ( 1.0 - nodeVar922 ) ) * nodeVar921 ), ( min( nodeVar923, ( 1.0 - nodeVar923 ) ) * 0.225 ) );
		nodeVar925 = smoothstep( 0.0, 0.016, nodeVar924 );
		nodeVar926 = ( vec2( floor( ( ( nodeVar914.x + nodeVar919 ) / nodeVar921 ) ), nodeVar917 ) * vec2( 1.37 ) );
		nodeVar927 = fract( ( vec3( nodeVar926.x, nodeVar926.y, nodeVar926.x ) * vec3( 0.1031 ) ) );
		nodeVar927 = ( nodeVar927 + vec3( dot( nodeVar927, ( nodeVar927.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar928 = fract( ( ( nodeVar927.x + nodeVar927.y ) * nodeVar927.z ) );
		nodeVar929 = ( ( nodeVar914 * vec2( 22.0 ) ) + vec2( ( nodeVar928 * 30.0 ) ) );
		nodeVar930 = 0.0;
		nodeVar931 = 0.5;
		nodeVar932 = floor( nodeVar929 );
		nodeVar933 = fract( nodeVar929 );
		nodeVar933 = ( ( nodeVar933 * nodeVar933 ) * ( vec2( 3.0 ) - ( nodeVar933 * vec2( 2.0 ) ) ) );
		nodeVar934 = fract( ( vec3( nodeVar932.x, nodeVar932.y, nodeVar932.x ) * vec3( 0.1031 ) ) );
		nodeVar934 = ( nodeVar934 + vec3( dot( nodeVar934, ( nodeVar934.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar935 = ( nodeVar932 + vec2( 1.0, 0.0 ) );
		nodeVar936 = fract( ( vec3( nodeVar935.x, nodeVar935.y, nodeVar935.x ) * vec3( 0.1031 ) ) );
		nodeVar936 = ( nodeVar936 + vec3( dot( nodeVar936, ( nodeVar936.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar937 = ( nodeVar932 + vec2( 0.0, 1.0 ) );
		nodeVar938 = fract( ( vec3( nodeVar937.x, nodeVar937.y, nodeVar937.x ) * vec3( 0.1031 ) ) );
		nodeVar938 = ( nodeVar938 + vec3( dot( nodeVar938, ( nodeVar938.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar939 = ( nodeVar932 + vec2( 1.0, 1.0 ) );
		nodeVar940 = fract( ( vec3( nodeVar939.x, nodeVar939.y, nodeVar939.x ) * vec3( 0.1031 ) ) );
		nodeVar940 = ( nodeVar940 + vec3( dot( nodeVar940, ( nodeVar940.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar930 = ( nodeVar930 + ( nodeVar931 * mix( mix( fract( ( ( nodeVar934.x + nodeVar934.y ) * nodeVar934.z ) ), fract( ( ( nodeVar936.x + nodeVar936.y ) * nodeVar936.z ) ), nodeVar933.x ), mix( fract( ( ( nodeVar938.x + nodeVar938.y ) * nodeVar938.z ) ), fract( ( ( nodeVar940.x + nodeVar940.y ) * nodeVar940.z ) ), nodeVar933.x ), nodeVar933.y ) ) );
		nodeVar929 = ( nodeVar929 * vec2( 2.03 ) );
		nodeVar931 = ( nodeVar931 * 0.52 );
		nodeVar941 = floor( nodeVar929 );
		nodeVar942 = fract( nodeVar929 );
		nodeVar942 = ( ( nodeVar942 * nodeVar942 ) * ( vec2( 3.0 ) - ( nodeVar942 * vec2( 2.0 ) ) ) );
		nodeVar943 = fract( ( vec3( nodeVar941.x, nodeVar941.y, nodeVar941.x ) * vec3( 0.1031 ) ) );
		nodeVar943 = ( nodeVar943 + vec3( dot( nodeVar943, ( nodeVar943.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar944 = ( nodeVar941 + vec2( 1.0, 0.0 ) );
		nodeVar945 = fract( ( vec3( nodeVar944.x, nodeVar944.y, nodeVar944.x ) * vec3( 0.1031 ) ) );
		nodeVar945 = ( nodeVar945 + vec3( dot( nodeVar945, ( nodeVar945.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar946 = ( nodeVar941 + vec2( 0.0, 1.0 ) );
		nodeVar947 = fract( ( vec3( nodeVar946.x, nodeVar946.y, nodeVar946.x ) * vec3( 0.1031 ) ) );
		nodeVar947 = ( nodeVar947 + vec3( dot( nodeVar947, ( nodeVar947.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar948 = ( nodeVar941 + vec2( 1.0, 1.0 ) );
		nodeVar949 = fract( ( vec3( nodeVar948.x, nodeVar948.y, nodeVar948.x ) * vec3( 0.1031 ) ) );
		nodeVar949 = ( nodeVar949 + vec3( dot( nodeVar949, ( nodeVar949.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar930 = ( nodeVar930 + ( nodeVar931 * mix( mix( fract( ( ( nodeVar943.x + nodeVar943.y ) * nodeVar943.z ) ), fract( ( ( nodeVar945.x + nodeVar945.y ) * nodeVar945.z ) ), nodeVar942.x ), mix( fract( ( ( nodeVar947.x + nodeVar947.y ) * nodeVar947.z ) ), fract( ( ( nodeVar949.x + nodeVar949.y ) * nodeVar949.z ) ), nodeVar942.x ), nodeVar942.y ) ) );
		nodeVar929 = ( nodeVar929 * vec2( 2.03 ) );
		nodeVar931 = ( nodeVar931 * 0.52 );
		nodeVar950 = floor( nodeVar929 );
		nodeVar951 = fract( nodeVar929 );
		nodeVar951 = ( ( nodeVar951 * nodeVar951 ) * ( vec2( 3.0 ) - ( nodeVar951 * vec2( 2.0 ) ) ) );
		nodeVar952 = fract( ( vec3( nodeVar950.x, nodeVar950.y, nodeVar950.x ) * vec3( 0.1031 ) ) );
		nodeVar952 = ( nodeVar952 + vec3( dot( nodeVar952, ( nodeVar952.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar953 = ( nodeVar950 + vec2( 1.0, 0.0 ) );
		nodeVar954 = fract( ( vec3( nodeVar953.x, nodeVar953.y, nodeVar953.x ) * vec3( 0.1031 ) ) );
		nodeVar954 = ( nodeVar954 + vec3( dot( nodeVar954, ( nodeVar954.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar955 = ( nodeVar950 + vec2( 0.0, 1.0 ) );
		nodeVar956 = fract( ( vec3( nodeVar955.x, nodeVar955.y, nodeVar955.x ) * vec3( 0.1031 ) ) );
		nodeVar956 = ( nodeVar956 + vec3( dot( nodeVar956, ( nodeVar956.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar957 = ( nodeVar950 + vec2( 1.0, 1.0 ) );
		nodeVar958 = fract( ( vec3( nodeVar957.x, nodeVar957.y, nodeVar957.x ) * vec3( 0.1031 ) ) );
		nodeVar958 = ( nodeVar958 + vec3( dot( nodeVar958, ( nodeVar958.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar930 = ( nodeVar930 + ( nodeVar931 * mix( mix( fract( ( ( nodeVar952.x + nodeVar952.y ) * nodeVar952.z ) ), fract( ( ( nodeVar954.x + nodeVar954.y ) * nodeVar954.z ) ), nodeVar951.x ), mix( fract( ( ( nodeVar956.x + nodeVar956.y ) * nodeVar956.z ) ), fract( ( ( nodeVar958.x + nodeVar958.y ) * nodeVar958.z ) ), nodeVar951.x ), nodeVar951.y ) ) );
		nodeVar929 = ( nodeVar929 * vec2( 2.03 ) );
		nodeVar931 = ( nodeVar931 * 0.52 );
		nodeVar959 = floor( nodeVar929 );
		nodeVar960 = fract( nodeVar929 );
		nodeVar960 = ( ( nodeVar960 * nodeVar960 ) * ( vec2( 3.0 ) - ( nodeVar960 * vec2( 2.0 ) ) ) );
		nodeVar961 = fract( ( vec3( nodeVar959.x, nodeVar959.y, nodeVar959.x ) * vec3( 0.1031 ) ) );
		nodeVar961 = ( nodeVar961 + vec3( dot( nodeVar961, ( nodeVar961.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar962 = ( nodeVar959 + vec2( 1.0, 0.0 ) );
		nodeVar963 = fract( ( vec3( nodeVar962.x, nodeVar962.y, nodeVar962.x ) * vec3( 0.1031 ) ) );
		nodeVar963 = ( nodeVar963 + vec3( dot( nodeVar963, ( nodeVar963.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar964 = ( nodeVar959 + vec2( 0.0, 1.0 ) );
		nodeVar965 = fract( ( vec3( nodeVar964.x, nodeVar964.y, nodeVar964.x ) * vec3( 0.1031 ) ) );
		nodeVar965 = ( nodeVar965 + vec3( dot( nodeVar965, ( nodeVar965.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar966 = ( nodeVar959 + vec2( 1.0, 1.0 ) );
		nodeVar967 = fract( ( vec3( nodeVar966.x, nodeVar966.y, nodeVar966.x ) * vec3( 0.1031 ) ) );
		nodeVar967 = ( nodeVar967 + vec3( dot( nodeVar967, ( nodeVar967.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar930 = ( nodeVar930 + ( nodeVar931 * mix( mix( fract( ( ( nodeVar961.x + nodeVar961.y ) * nodeVar961.z ) ), fract( ( ( nodeVar963.x + nodeVar963.y ) * nodeVar963.z ) ), nodeVar960.x ), mix( fract( ( ( nodeVar965.x + nodeVar965.y ) * nodeVar965.z ) ), fract( ( ( nodeVar967.x + nodeVar967.y ) * nodeVar967.z ) ), nodeVar960.x ), nodeVar960.y ) ) );
		nodeVar929 = ( nodeVar929 * vec2( 2.03 ) );
		nodeVar931 = ( nodeVar931 * 0.52 );
		nodeVar916 = vec3( ( ( ( nodeVar925 * ( 0.55 + ( nodeVar928 * 0.45 ) ) ) * 0.55 ) + ( ( ( 0.55 + ( nodeVar930 * 0.45 ) ) * 0.3 ) * nodeVar925 ) ), nodeVar925, nodeVar928 );
		

	} else {


		if ( ( nodeVar915 < 1.5 ) ) {

			nodeVar968 = ( nodeVar914 * vec2( 3.2 ) );
			nodeVar969 = 0.0;
			nodeVar970 = 0.5;
			nodeVar971 = floor( nodeVar968 );
			nodeVar972 = fract( nodeVar968 );
			nodeVar972 = ( ( nodeVar972 * nodeVar972 ) * ( vec2( 3.0 ) - ( nodeVar972 * vec2( 2.0 ) ) ) );
			nodeVar973 = fract( ( vec3( nodeVar971.x, nodeVar971.y, nodeVar971.x ) * vec3( 0.1031 ) ) );
			nodeVar973 = ( nodeVar973 + vec3( dot( nodeVar973, ( nodeVar973.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar974 = ( nodeVar971 + vec2( 1.0, 0.0 ) );
			nodeVar975 = fract( ( vec3( nodeVar974.x, nodeVar974.y, nodeVar974.x ) * vec3( 0.1031 ) ) );
			nodeVar975 = ( nodeVar975 + vec3( dot( nodeVar975, ( nodeVar975.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar976 = ( nodeVar971 + vec2( 0.0, 1.0 ) );
			nodeVar977 = fract( ( vec3( nodeVar976.x, nodeVar976.y, nodeVar976.x ) * vec3( 0.1031 ) ) );
			nodeVar977 = ( nodeVar977 + vec3( dot( nodeVar977, ( nodeVar977.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar978 = ( nodeVar971 + vec2( 1.0, 1.0 ) );
			nodeVar979 = fract( ( vec3( nodeVar978.x, nodeVar978.y, nodeVar978.x ) * vec3( 0.1031 ) ) );
			nodeVar979 = ( nodeVar979 + vec3( dot( nodeVar979, ( nodeVar979.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar969 = ( nodeVar969 + ( nodeVar970 * mix( mix( fract( ( ( nodeVar973.x + nodeVar973.y ) * nodeVar973.z ) ), fract( ( ( nodeVar975.x + nodeVar975.y ) * nodeVar975.z ) ), nodeVar972.x ), mix( fract( ( ( nodeVar977.x + nodeVar977.y ) * nodeVar977.z ) ), fract( ( ( nodeVar979.x + nodeVar979.y ) * nodeVar979.z ) ), nodeVar972.x ), nodeVar972.y ) ) );
			nodeVar968 = ( nodeVar968 * vec2( 2.03 ) );
			nodeVar970 = ( nodeVar970 * 0.52 );
			nodeVar980 = floor( nodeVar968 );
			nodeVar981 = fract( nodeVar968 );
			nodeVar981 = ( ( nodeVar981 * nodeVar981 ) * ( vec2( 3.0 ) - ( nodeVar981 * vec2( 2.0 ) ) ) );
			nodeVar982 = fract( ( vec3( nodeVar980.x, nodeVar980.y, nodeVar980.x ) * vec3( 0.1031 ) ) );
			nodeVar982 = ( nodeVar982 + vec3( dot( nodeVar982, ( nodeVar982.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar983 = ( nodeVar980 + vec2( 1.0, 0.0 ) );
			nodeVar984 = fract( ( vec3( nodeVar983.x, nodeVar983.y, nodeVar983.x ) * vec3( 0.1031 ) ) );
			nodeVar984 = ( nodeVar984 + vec3( dot( nodeVar984, ( nodeVar984.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar985 = ( nodeVar980 + vec2( 0.0, 1.0 ) );
			nodeVar986 = fract( ( vec3( nodeVar985.x, nodeVar985.y, nodeVar985.x ) * vec3( 0.1031 ) ) );
			nodeVar986 = ( nodeVar986 + vec3( dot( nodeVar986, ( nodeVar986.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar987 = ( nodeVar980 + vec2( 1.0, 1.0 ) );
			nodeVar988 = fract( ( vec3( nodeVar987.x, nodeVar987.y, nodeVar987.x ) * vec3( 0.1031 ) ) );
			nodeVar988 = ( nodeVar988 + vec3( dot( nodeVar988, ( nodeVar988.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar969 = ( nodeVar969 + ( nodeVar970 * mix( mix( fract( ( ( nodeVar982.x + nodeVar982.y ) * nodeVar982.z ) ), fract( ( ( nodeVar984.x + nodeVar984.y ) * nodeVar984.z ) ), nodeVar981.x ), mix( fract( ( ( nodeVar986.x + nodeVar986.y ) * nodeVar986.z ) ), fract( ( ( nodeVar988.x + nodeVar988.y ) * nodeVar988.z ) ), nodeVar981.x ), nodeVar981.y ) ) );
			nodeVar968 = ( nodeVar968 * vec2( 2.03 ) );
			nodeVar970 = ( nodeVar970 * 0.52 );
			nodeVar989 = floor( nodeVar968 );
			nodeVar990 = fract( nodeVar968 );
			nodeVar990 = ( ( nodeVar990 * nodeVar990 ) * ( vec2( 3.0 ) - ( nodeVar990 * vec2( 2.0 ) ) ) );
			nodeVar991 = fract( ( vec3( nodeVar989.x, nodeVar989.y, nodeVar989.x ) * vec3( 0.1031 ) ) );
			nodeVar991 = ( nodeVar991 + vec3( dot( nodeVar991, ( nodeVar991.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar992 = ( nodeVar989 + vec2( 1.0, 0.0 ) );
			nodeVar993 = fract( ( vec3( nodeVar992.x, nodeVar992.y, nodeVar992.x ) * vec3( 0.1031 ) ) );
			nodeVar993 = ( nodeVar993 + vec3( dot( nodeVar993, ( nodeVar993.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar994 = ( nodeVar989 + vec2( 0.0, 1.0 ) );
			nodeVar995 = fract( ( vec3( nodeVar994.x, nodeVar994.y, nodeVar994.x ) * vec3( 0.1031 ) ) );
			nodeVar995 = ( nodeVar995 + vec3( dot( nodeVar995, ( nodeVar995.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar996 = ( nodeVar989 + vec2( 1.0, 1.0 ) );
			nodeVar997 = fract( ( vec3( nodeVar996.x, nodeVar996.y, nodeVar996.x ) * vec3( 0.1031 ) ) );
			nodeVar997 = ( nodeVar997 + vec3( dot( nodeVar997, ( nodeVar997.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar969 = ( nodeVar969 + ( nodeVar970 * mix( mix( fract( ( ( nodeVar991.x + nodeVar991.y ) * nodeVar991.z ) ), fract( ( ( nodeVar993.x + nodeVar993.y ) * nodeVar993.z ) ), nodeVar990.x ), mix( fract( ( ( nodeVar995.x + nodeVar995.y ) * nodeVar995.z ) ), fract( ( ( nodeVar997.x + nodeVar997.y ) * nodeVar997.z ) ), nodeVar990.x ), nodeVar990.y ) ) );
			nodeVar968 = ( nodeVar968 * vec2( 2.03 ) );
			nodeVar970 = ( nodeVar970 * 0.52 );
			nodeVar998 = floor( nodeVar968 );
			nodeVar999 = fract( nodeVar968 );
			nodeVar999 = ( ( nodeVar999 * nodeVar999 ) * ( vec2( 3.0 ) - ( nodeVar999 * vec2( 2.0 ) ) ) );
			nodeVar1000 = fract( ( vec3( nodeVar998.x, nodeVar998.y, nodeVar998.x ) * vec3( 0.1031 ) ) );
			nodeVar1000 = ( nodeVar1000 + vec3( dot( nodeVar1000, ( nodeVar1000.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1001 = ( nodeVar998 + vec2( 1.0, 0.0 ) );
			nodeVar1002 = fract( ( vec3( nodeVar1001.x, nodeVar1001.y, nodeVar1001.x ) * vec3( 0.1031 ) ) );
			nodeVar1002 = ( nodeVar1002 + vec3( dot( nodeVar1002, ( nodeVar1002.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1003 = ( nodeVar998 + vec2( 0.0, 1.0 ) );
			nodeVar1004 = fract( ( vec3( nodeVar1003.x, nodeVar1003.y, nodeVar1003.x ) * vec3( 0.1031 ) ) );
			nodeVar1004 = ( nodeVar1004 + vec3( dot( nodeVar1004, ( nodeVar1004.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1005 = ( nodeVar998 + vec2( 1.0, 1.0 ) );
			nodeVar1006 = fract( ( vec3( nodeVar1005.x, nodeVar1005.y, nodeVar1005.x ) * vec3( 0.1031 ) ) );
			nodeVar1006 = ( nodeVar1006 + vec3( dot( nodeVar1006, ( nodeVar1006.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar969 = ( nodeVar969 + ( nodeVar970 * mix( mix( fract( ( ( nodeVar1000.x + nodeVar1000.y ) * nodeVar1000.z ) ), fract( ( ( nodeVar1002.x + nodeVar1002.y ) * nodeVar1002.z ) ), nodeVar999.x ), mix( fract( ( ( nodeVar1004.x + nodeVar1004.y ) * nodeVar1004.z ) ), fract( ( ( nodeVar1006.x + nodeVar1006.y ) * nodeVar1006.z ) ), nodeVar999.x ), nodeVar999.y ) ) );
			nodeVar968 = ( nodeVar968 * vec2( 2.03 ) );
			nodeVar970 = ( nodeVar970 * 0.52 );
			nodeVar1007 = ( nodeVar914 * vec2( 14.0 ) );
			nodeVar1008 = 0.0;
			nodeVar1009 = 0.5;
			nodeVar1010 = floor( nodeVar1007 );
			nodeVar1011 = fract( nodeVar1007 );
			nodeVar1011 = ( ( nodeVar1011 * nodeVar1011 ) * ( vec2( 3.0 ) - ( nodeVar1011 * vec2( 2.0 ) ) ) );
			nodeVar1012 = fract( ( vec3( nodeVar1010.x, nodeVar1010.y, nodeVar1010.x ) * vec3( 0.1031 ) ) );
			nodeVar1012 = ( nodeVar1012 + vec3( dot( nodeVar1012, ( nodeVar1012.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1013 = ( nodeVar1010 + vec2( 1.0, 0.0 ) );
			nodeVar1014 = fract( ( vec3( nodeVar1013.x, nodeVar1013.y, nodeVar1013.x ) * vec3( 0.1031 ) ) );
			nodeVar1014 = ( nodeVar1014 + vec3( dot( nodeVar1014, ( nodeVar1014.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1015 = ( nodeVar1010 + vec2( 0.0, 1.0 ) );
			nodeVar1016 = fract( ( vec3( nodeVar1015.x, nodeVar1015.y, nodeVar1015.x ) * vec3( 0.1031 ) ) );
			nodeVar1016 = ( nodeVar1016 + vec3( dot( nodeVar1016, ( nodeVar1016.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1017 = ( nodeVar1010 + vec2( 1.0, 1.0 ) );
			nodeVar1018 = fract( ( vec3( nodeVar1017.x, nodeVar1017.y, nodeVar1017.x ) * vec3( 0.1031 ) ) );
			nodeVar1018 = ( nodeVar1018 + vec3( dot( nodeVar1018, ( nodeVar1018.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1008 = ( nodeVar1008 + ( nodeVar1009 * mix( mix( fract( ( ( nodeVar1012.x + nodeVar1012.y ) * nodeVar1012.z ) ), fract( ( ( nodeVar1014.x + nodeVar1014.y ) * nodeVar1014.z ) ), nodeVar1011.x ), mix( fract( ( ( nodeVar1016.x + nodeVar1016.y ) * nodeVar1016.z ) ), fract( ( ( nodeVar1018.x + nodeVar1018.y ) * nodeVar1018.z ) ), nodeVar1011.x ), nodeVar1011.y ) ) );
			nodeVar1007 = ( nodeVar1007 * vec2( 2.03 ) );
			nodeVar1009 = ( nodeVar1009 * 0.52 );
			nodeVar1019 = floor( nodeVar1007 );
			nodeVar1020 = fract( nodeVar1007 );
			nodeVar1020 = ( ( nodeVar1020 * nodeVar1020 ) * ( vec2( 3.0 ) - ( nodeVar1020 * vec2( 2.0 ) ) ) );
			nodeVar1021 = fract( ( vec3( nodeVar1019.x, nodeVar1019.y, nodeVar1019.x ) * vec3( 0.1031 ) ) );
			nodeVar1021 = ( nodeVar1021 + vec3( dot( nodeVar1021, ( nodeVar1021.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1022 = ( nodeVar1019 + vec2( 1.0, 0.0 ) );
			nodeVar1023 = fract( ( vec3( nodeVar1022.x, nodeVar1022.y, nodeVar1022.x ) * vec3( 0.1031 ) ) );
			nodeVar1023 = ( nodeVar1023 + vec3( dot( nodeVar1023, ( nodeVar1023.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1024 = ( nodeVar1019 + vec2( 0.0, 1.0 ) );
			nodeVar1025 = fract( ( vec3( nodeVar1024.x, nodeVar1024.y, nodeVar1024.x ) * vec3( 0.1031 ) ) );
			nodeVar1025 = ( nodeVar1025 + vec3( dot( nodeVar1025, ( nodeVar1025.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1026 = ( nodeVar1019 + vec2( 1.0, 1.0 ) );
			nodeVar1027 = fract( ( vec3( nodeVar1026.x, nodeVar1026.y, nodeVar1026.x ) * vec3( 0.1031 ) ) );
			nodeVar1027 = ( nodeVar1027 + vec3( dot( nodeVar1027, ( nodeVar1027.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1008 = ( nodeVar1008 + ( nodeVar1009 * mix( mix( fract( ( ( nodeVar1021.x + nodeVar1021.y ) * nodeVar1021.z ) ), fract( ( ( nodeVar1023.x + nodeVar1023.y ) * nodeVar1023.z ) ), nodeVar1020.x ), mix( fract( ( ( nodeVar1025.x + nodeVar1025.y ) * nodeVar1025.z ) ), fract( ( ( nodeVar1027.x + nodeVar1027.y ) * nodeVar1027.z ) ), nodeVar1020.x ), nodeVar1020.y ) ) );
			nodeVar1007 = ( nodeVar1007 * vec2( 2.03 ) );
			nodeVar1009 = ( nodeVar1009 * 0.52 );
			nodeVar1028 = floor( nodeVar1007 );
			nodeVar1029 = fract( nodeVar1007 );
			nodeVar1029 = ( ( nodeVar1029 * nodeVar1029 ) * ( vec2( 3.0 ) - ( nodeVar1029 * vec2( 2.0 ) ) ) );
			nodeVar1030 = fract( ( vec3( nodeVar1028.x, nodeVar1028.y, nodeVar1028.x ) * vec3( 0.1031 ) ) );
			nodeVar1030 = ( nodeVar1030 + vec3( dot( nodeVar1030, ( nodeVar1030.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1031 = ( nodeVar1028 + vec2( 1.0, 0.0 ) );
			nodeVar1032 = fract( ( vec3( nodeVar1031.x, nodeVar1031.y, nodeVar1031.x ) * vec3( 0.1031 ) ) );
			nodeVar1032 = ( nodeVar1032 + vec3( dot( nodeVar1032, ( nodeVar1032.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1033 = ( nodeVar1028 + vec2( 0.0, 1.0 ) );
			nodeVar1034 = fract( ( vec3( nodeVar1033.x, nodeVar1033.y, nodeVar1033.x ) * vec3( 0.1031 ) ) );
			nodeVar1034 = ( nodeVar1034 + vec3( dot( nodeVar1034, ( nodeVar1034.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1035 = ( nodeVar1028 + vec2( 1.0, 1.0 ) );
			nodeVar1036 = fract( ( vec3( nodeVar1035.x, nodeVar1035.y, nodeVar1035.x ) * vec3( 0.1031 ) ) );
			nodeVar1036 = ( nodeVar1036 + vec3( dot( nodeVar1036, ( nodeVar1036.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1008 = ( nodeVar1008 + ( nodeVar1009 * mix( mix( fract( ( ( nodeVar1030.x + nodeVar1030.y ) * nodeVar1030.z ) ), fract( ( ( nodeVar1032.x + nodeVar1032.y ) * nodeVar1032.z ) ), nodeVar1029.x ), mix( fract( ( ( nodeVar1034.x + nodeVar1034.y ) * nodeVar1034.z ) ), fract( ( ( nodeVar1036.x + nodeVar1036.y ) * nodeVar1036.z ) ), nodeVar1029.x ), nodeVar1029.y ) ) );
			nodeVar1007 = ( nodeVar1007 * vec2( 2.03 ) );
			nodeVar1009 = ( nodeVar1009 * 0.52 );
			nodeVar1037 = floor( nodeVar1007 );
			nodeVar1038 = fract( nodeVar1007 );
			nodeVar1038 = ( ( nodeVar1038 * nodeVar1038 ) * ( vec2( 3.0 ) - ( nodeVar1038 * vec2( 2.0 ) ) ) );
			nodeVar1039 = fract( ( vec3( nodeVar1037.x, nodeVar1037.y, nodeVar1037.x ) * vec3( 0.1031 ) ) );
			nodeVar1039 = ( nodeVar1039 + vec3( dot( nodeVar1039, ( nodeVar1039.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1040 = ( nodeVar1037 + vec2( 1.0, 0.0 ) );
			nodeVar1041 = fract( ( vec3( nodeVar1040.x, nodeVar1040.y, nodeVar1040.x ) * vec3( 0.1031 ) ) );
			nodeVar1041 = ( nodeVar1041 + vec3( dot( nodeVar1041, ( nodeVar1041.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1042 = ( nodeVar1037 + vec2( 0.0, 1.0 ) );
			nodeVar1043 = fract( ( vec3( nodeVar1042.x, nodeVar1042.y, nodeVar1042.x ) * vec3( 0.1031 ) ) );
			nodeVar1043 = ( nodeVar1043 + vec3( dot( nodeVar1043, ( nodeVar1043.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1044 = ( nodeVar1037 + vec2( 1.0, 1.0 ) );
			nodeVar1045 = fract( ( vec3( nodeVar1044.x, nodeVar1044.y, nodeVar1044.x ) * vec3( 0.1031 ) ) );
			nodeVar1045 = ( nodeVar1045 + vec3( dot( nodeVar1045, ( nodeVar1045.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1008 = ( nodeVar1008 + ( nodeVar1009 * mix( mix( fract( ( ( nodeVar1039.x + nodeVar1039.y ) * nodeVar1039.z ) ), fract( ( ( nodeVar1041.x + nodeVar1041.y ) * nodeVar1041.z ) ), nodeVar1038.x ), mix( fract( ( ( nodeVar1043.x + nodeVar1043.y ) * nodeVar1043.z ) ), fract( ( ( nodeVar1045.x + nodeVar1045.y ) * nodeVar1045.z ) ), nodeVar1038.x ), nodeVar1038.y ) ) );
			nodeVar1007 = ( nodeVar1007 * vec2( 2.03 ) );
			nodeVar1009 = ( nodeVar1009 * 0.52 );
			nodeVar1046 = ( nodeVar914 * vec2( 46.0 ) );
			nodeVar1047 = 0.0;
			nodeVar1048 = 0.5;
			nodeVar1049 = floor( nodeVar1046 );
			nodeVar1050 = fract( nodeVar1046 );
			nodeVar1050 = ( ( nodeVar1050 * nodeVar1050 ) * ( vec2( 3.0 ) - ( nodeVar1050 * vec2( 2.0 ) ) ) );
			nodeVar1051 = fract( ( vec3( nodeVar1049.x, nodeVar1049.y, nodeVar1049.x ) * vec3( 0.1031 ) ) );
			nodeVar1051 = ( nodeVar1051 + vec3( dot( nodeVar1051, ( nodeVar1051.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1052 = ( nodeVar1049 + vec2( 1.0, 0.0 ) );
			nodeVar1053 = fract( ( vec3( nodeVar1052.x, nodeVar1052.y, nodeVar1052.x ) * vec3( 0.1031 ) ) );
			nodeVar1053 = ( nodeVar1053 + vec3( dot( nodeVar1053, ( nodeVar1053.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1054 = ( nodeVar1049 + vec2( 0.0, 1.0 ) );
			nodeVar1055 = fract( ( vec3( nodeVar1054.x, nodeVar1054.y, nodeVar1054.x ) * vec3( 0.1031 ) ) );
			nodeVar1055 = ( nodeVar1055 + vec3( dot( nodeVar1055, ( nodeVar1055.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1056 = ( nodeVar1049 + vec2( 1.0, 1.0 ) );
			nodeVar1057 = fract( ( vec3( nodeVar1056.x, nodeVar1056.y, nodeVar1056.x ) * vec3( 0.1031 ) ) );
			nodeVar1057 = ( nodeVar1057 + vec3( dot( nodeVar1057, ( nodeVar1057.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1047 = ( nodeVar1047 + ( nodeVar1048 * mix( mix( fract( ( ( nodeVar1051.x + nodeVar1051.y ) * nodeVar1051.z ) ), fract( ( ( nodeVar1053.x + nodeVar1053.y ) * nodeVar1053.z ) ), nodeVar1050.x ), mix( fract( ( ( nodeVar1055.x + nodeVar1055.y ) * nodeVar1055.z ) ), fract( ( ( nodeVar1057.x + nodeVar1057.y ) * nodeVar1057.z ) ), nodeVar1050.x ), nodeVar1050.y ) ) );
			nodeVar1046 = ( nodeVar1046 * vec2( 2.03 ) );
			nodeVar1048 = ( nodeVar1048 * 0.52 );
			nodeVar1058 = floor( nodeVar1046 );
			nodeVar1059 = fract( nodeVar1046 );
			nodeVar1059 = ( ( nodeVar1059 * nodeVar1059 ) * ( vec2( 3.0 ) - ( nodeVar1059 * vec2( 2.0 ) ) ) );
			nodeVar1060 = fract( ( vec3( nodeVar1058.x, nodeVar1058.y, nodeVar1058.x ) * vec3( 0.1031 ) ) );
			nodeVar1060 = ( nodeVar1060 + vec3( dot( nodeVar1060, ( nodeVar1060.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1061 = ( nodeVar1058 + vec2( 1.0, 0.0 ) );
			nodeVar1062 = fract( ( vec3( nodeVar1061.x, nodeVar1061.y, nodeVar1061.x ) * vec3( 0.1031 ) ) );
			nodeVar1062 = ( nodeVar1062 + vec3( dot( nodeVar1062, ( nodeVar1062.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1063 = ( nodeVar1058 + vec2( 0.0, 1.0 ) );
			nodeVar1064 = fract( ( vec3( nodeVar1063.x, nodeVar1063.y, nodeVar1063.x ) * vec3( 0.1031 ) ) );
			nodeVar1064 = ( nodeVar1064 + vec3( dot( nodeVar1064, ( nodeVar1064.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1065 = ( nodeVar1058 + vec2( 1.0, 1.0 ) );
			nodeVar1066 = fract( ( vec3( nodeVar1065.x, nodeVar1065.y, nodeVar1065.x ) * vec3( 0.1031 ) ) );
			nodeVar1066 = ( nodeVar1066 + vec3( dot( nodeVar1066, ( nodeVar1066.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1047 = ( nodeVar1047 + ( nodeVar1048 * mix( mix( fract( ( ( nodeVar1060.x + nodeVar1060.y ) * nodeVar1060.z ) ), fract( ( ( nodeVar1062.x + nodeVar1062.y ) * nodeVar1062.z ) ), nodeVar1059.x ), mix( fract( ( ( nodeVar1064.x + nodeVar1064.y ) * nodeVar1064.z ) ), fract( ( ( nodeVar1066.x + nodeVar1066.y ) * nodeVar1066.z ) ), nodeVar1059.x ), nodeVar1059.y ) ) );
			nodeVar1046 = ( nodeVar1046 * vec2( 2.03 ) );
			nodeVar1048 = ( nodeVar1048 * 0.52 );
			nodeVar1067 = floor( nodeVar1046 );
			nodeVar1068 = fract( nodeVar1046 );
			nodeVar1068 = ( ( nodeVar1068 * nodeVar1068 ) * ( vec2( 3.0 ) - ( nodeVar1068 * vec2( 2.0 ) ) ) );
			nodeVar1069 = fract( ( vec3( nodeVar1067.x, nodeVar1067.y, nodeVar1067.x ) * vec3( 0.1031 ) ) );
			nodeVar1069 = ( nodeVar1069 + vec3( dot( nodeVar1069, ( nodeVar1069.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1070 = ( nodeVar1067 + vec2( 1.0, 0.0 ) );
			nodeVar1071 = fract( ( vec3( nodeVar1070.x, nodeVar1070.y, nodeVar1070.x ) * vec3( 0.1031 ) ) );
			nodeVar1071 = ( nodeVar1071 + vec3( dot( nodeVar1071, ( nodeVar1071.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1072 = ( nodeVar1067 + vec2( 0.0, 1.0 ) );
			nodeVar1073 = fract( ( vec3( nodeVar1072.x, nodeVar1072.y, nodeVar1072.x ) * vec3( 0.1031 ) ) );
			nodeVar1073 = ( nodeVar1073 + vec3( dot( nodeVar1073, ( nodeVar1073.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1074 = ( nodeVar1067 + vec2( 1.0, 1.0 ) );
			nodeVar1075 = fract( ( vec3( nodeVar1074.x, nodeVar1074.y, nodeVar1074.x ) * vec3( 0.1031 ) ) );
			nodeVar1075 = ( nodeVar1075 + vec3( dot( nodeVar1075, ( nodeVar1075.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1047 = ( nodeVar1047 + ( nodeVar1048 * mix( mix( fract( ( ( nodeVar1069.x + nodeVar1069.y ) * nodeVar1069.z ) ), fract( ( ( nodeVar1071.x + nodeVar1071.y ) * nodeVar1071.z ) ), nodeVar1068.x ), mix( fract( ( ( nodeVar1073.x + nodeVar1073.y ) * nodeVar1073.z ) ), fract( ( ( nodeVar1075.x + nodeVar1075.y ) * nodeVar1075.z ) ), nodeVar1068.x ), nodeVar1068.y ) ) );
			nodeVar1046 = ( nodeVar1046 * vec2( 2.03 ) );
			nodeVar1048 = ( nodeVar1048 * 0.52 );
			nodeVar1076 = floor( nodeVar1046 );
			nodeVar1077 = fract( nodeVar1046 );
			nodeVar1077 = ( ( nodeVar1077 * nodeVar1077 ) * ( vec2( 3.0 ) - ( nodeVar1077 * vec2( 2.0 ) ) ) );
			nodeVar1078 = fract( ( vec3( nodeVar1076.x, nodeVar1076.y, nodeVar1076.x ) * vec3( 0.1031 ) ) );
			nodeVar1078 = ( nodeVar1078 + vec3( dot( nodeVar1078, ( nodeVar1078.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1079 = ( nodeVar1076 + vec2( 1.0, 0.0 ) );
			nodeVar1080 = fract( ( vec3( nodeVar1079.x, nodeVar1079.y, nodeVar1079.x ) * vec3( 0.1031 ) ) );
			nodeVar1080 = ( nodeVar1080 + vec3( dot( nodeVar1080, ( nodeVar1080.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1081 = ( nodeVar1076 + vec2( 0.0, 1.0 ) );
			nodeVar1082 = fract( ( vec3( nodeVar1081.x, nodeVar1081.y, nodeVar1081.x ) * vec3( 0.1031 ) ) );
			nodeVar1082 = ( nodeVar1082 + vec3( dot( nodeVar1082, ( nodeVar1082.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1083 = ( nodeVar1076 + vec2( 1.0, 1.0 ) );
			nodeVar1084 = fract( ( vec3( nodeVar1083.x, nodeVar1083.y, nodeVar1083.x ) * vec3( 0.1031 ) ) );
			nodeVar1084 = ( nodeVar1084 + vec3( dot( nodeVar1084, ( nodeVar1084.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1047 = ( nodeVar1047 + ( nodeVar1048 * mix( mix( fract( ( ( nodeVar1078.x + nodeVar1078.y ) * nodeVar1078.z ) ), fract( ( ( nodeVar1080.x + nodeVar1080.y ) * nodeVar1080.z ) ), nodeVar1077.x ), mix( fract( ( ( nodeVar1082.x + nodeVar1082.y ) * nodeVar1082.z ) ), fract( ( ( nodeVar1084.x + nodeVar1084.y ) * nodeVar1084.z ) ), nodeVar1077.x ), nodeVar1077.y ) ) );
			nodeVar1046 = ( nodeVar1046 * vec2( 2.03 ) );
			nodeVar1048 = ( nodeVar1048 * 0.52 );
			nodeVar1085 = ( ( ( nodeVar969 * 0.55 ) + ( nodeVar1008 * 0.3 ) ) + ( nodeVar1047 * 0.15 ) );
			nodeVar916 = vec3( nodeVar1085, ( 0.55 + ( nodeVar1085 * 0.45 ) ), nodeVar1085 );
			

		} else {


			if ( ( nodeVar915 < 2.5 ) ) {

				nodeVar1086 = floor( ( nodeVar914.y / 0.082 ) );
				nodeVar1087 = ( ( mod( nodeVar1086, 2.0 ) * 0.5 ) * 0.235 );
				nodeVar1088 = fract( ( ( nodeVar914.x + nodeVar1087 ) / 0.235 ) );
				nodeVar1089 = fract( ( nodeVar914.y / 0.082 ) );
				nodeVar1090 = min( ( min( nodeVar1088, ( 1.0 - nodeVar1088 ) ) * 0.235 ), ( min( nodeVar1089, ( 1.0 - nodeVar1089 ) ) * 0.082 ) );
				nodeVar1091 = smoothstep( 0.0, 0.011, nodeVar1090 );
				nodeVar1092 = ( vec2( floor( ( ( nodeVar914.x + nodeVar1087 ) / 0.235 ) ), nodeVar1086 ) * vec2( 1.91 ) );
				nodeVar1093 = fract( ( vec3( nodeVar1092.x, nodeVar1092.y, nodeVar1092.x ) * vec3( 0.1031 ) ) );
				nodeVar1093 = ( nodeVar1093 + vec3( dot( nodeVar1093, ( nodeVar1093.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1094 = fract( ( ( nodeVar1093.x + nodeVar1093.y ) * nodeVar1093.z ) );
				nodeVar1095 = ( nodeVar914 * vec2( 40.0 ) );
				nodeVar1096 = 0.0;
				nodeVar1097 = 0.5;
				nodeVar1098 = floor( nodeVar1095 );
				nodeVar1099 = fract( nodeVar1095 );
				nodeVar1099 = ( ( nodeVar1099 * nodeVar1099 ) * ( vec2( 3.0 ) - ( nodeVar1099 * vec2( 2.0 ) ) ) );
				nodeVar1100 = fract( ( vec3( nodeVar1098.x, nodeVar1098.y, nodeVar1098.x ) * vec3( 0.1031 ) ) );
				nodeVar1100 = ( nodeVar1100 + vec3( dot( nodeVar1100, ( nodeVar1100.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1101 = ( nodeVar1098 + vec2( 1.0, 0.0 ) );
				nodeVar1102 = fract( ( vec3( nodeVar1101.x, nodeVar1101.y, nodeVar1101.x ) * vec3( 0.1031 ) ) );
				nodeVar1102 = ( nodeVar1102 + vec3( dot( nodeVar1102, ( nodeVar1102.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1103 = ( nodeVar1098 + vec2( 0.0, 1.0 ) );
				nodeVar1104 = fract( ( vec3( nodeVar1103.x, nodeVar1103.y, nodeVar1103.x ) * vec3( 0.1031 ) ) );
				nodeVar1104 = ( nodeVar1104 + vec3( dot( nodeVar1104, ( nodeVar1104.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1105 = ( nodeVar1098 + vec2( 1.0, 1.0 ) );
				nodeVar1106 = fract( ( vec3( nodeVar1105.x, nodeVar1105.y, nodeVar1105.x ) * vec3( 0.1031 ) ) );
				nodeVar1106 = ( nodeVar1106 + vec3( dot( nodeVar1106, ( nodeVar1106.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1096 = ( nodeVar1096 + ( nodeVar1097 * mix( mix( fract( ( ( nodeVar1100.x + nodeVar1100.y ) * nodeVar1100.z ) ), fract( ( ( nodeVar1102.x + nodeVar1102.y ) * nodeVar1102.z ) ), nodeVar1099.x ), mix( fract( ( ( nodeVar1104.x + nodeVar1104.y ) * nodeVar1104.z ) ), fract( ( ( nodeVar1106.x + nodeVar1106.y ) * nodeVar1106.z ) ), nodeVar1099.x ), nodeVar1099.y ) ) );
				nodeVar1095 = ( nodeVar1095 * vec2( 2.03 ) );
				nodeVar1097 = ( nodeVar1097 * 0.52 );
				nodeVar1107 = floor( nodeVar1095 );
				nodeVar1108 = fract( nodeVar1095 );
				nodeVar1108 = ( ( nodeVar1108 * nodeVar1108 ) * ( vec2( 3.0 ) - ( nodeVar1108 * vec2( 2.0 ) ) ) );
				nodeVar1109 = fract( ( vec3( nodeVar1107.x, nodeVar1107.y, nodeVar1107.x ) * vec3( 0.1031 ) ) );
				nodeVar1109 = ( nodeVar1109 + vec3( dot( nodeVar1109, ( nodeVar1109.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1110 = ( nodeVar1107 + vec2( 1.0, 0.0 ) );
				nodeVar1111 = fract( ( vec3( nodeVar1110.x, nodeVar1110.y, nodeVar1110.x ) * vec3( 0.1031 ) ) );
				nodeVar1111 = ( nodeVar1111 + vec3( dot( nodeVar1111, ( nodeVar1111.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1112 = ( nodeVar1107 + vec2( 0.0, 1.0 ) );
				nodeVar1113 = fract( ( vec3( nodeVar1112.x, nodeVar1112.y, nodeVar1112.x ) * vec3( 0.1031 ) ) );
				nodeVar1113 = ( nodeVar1113 + vec3( dot( nodeVar1113, ( nodeVar1113.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1114 = ( nodeVar1107 + vec2( 1.0, 1.0 ) );
				nodeVar1115 = fract( ( vec3( nodeVar1114.x, nodeVar1114.y, nodeVar1114.x ) * vec3( 0.1031 ) ) );
				nodeVar1115 = ( nodeVar1115 + vec3( dot( nodeVar1115, ( nodeVar1115.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1096 = ( nodeVar1096 + ( nodeVar1097 * mix( mix( fract( ( ( nodeVar1109.x + nodeVar1109.y ) * nodeVar1109.z ) ), fract( ( ( nodeVar1111.x + nodeVar1111.y ) * nodeVar1111.z ) ), nodeVar1108.x ), mix( fract( ( ( nodeVar1113.x + nodeVar1113.y ) * nodeVar1113.z ) ), fract( ( ( nodeVar1115.x + nodeVar1115.y ) * nodeVar1115.z ) ), nodeVar1108.x ), nodeVar1108.y ) ) );
				nodeVar1095 = ( nodeVar1095 * vec2( 2.03 ) );
				nodeVar1097 = ( nodeVar1097 * 0.52 );
				nodeVar1116 = floor( nodeVar1095 );
				nodeVar1117 = fract( nodeVar1095 );
				nodeVar1117 = ( ( nodeVar1117 * nodeVar1117 ) * ( vec2( 3.0 ) - ( nodeVar1117 * vec2( 2.0 ) ) ) );
				nodeVar1118 = fract( ( vec3( nodeVar1116.x, nodeVar1116.y, nodeVar1116.x ) * vec3( 0.1031 ) ) );
				nodeVar1118 = ( nodeVar1118 + vec3( dot( nodeVar1118, ( nodeVar1118.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1119 = ( nodeVar1116 + vec2( 1.0, 0.0 ) );
				nodeVar1120 = fract( ( vec3( nodeVar1119.x, nodeVar1119.y, nodeVar1119.x ) * vec3( 0.1031 ) ) );
				nodeVar1120 = ( nodeVar1120 + vec3( dot( nodeVar1120, ( nodeVar1120.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1121 = ( nodeVar1116 + vec2( 0.0, 1.0 ) );
				nodeVar1122 = fract( ( vec3( nodeVar1121.x, nodeVar1121.y, nodeVar1121.x ) * vec3( 0.1031 ) ) );
				nodeVar1122 = ( nodeVar1122 + vec3( dot( nodeVar1122, ( nodeVar1122.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1123 = ( nodeVar1116 + vec2( 1.0, 1.0 ) );
				nodeVar1124 = fract( ( vec3( nodeVar1123.x, nodeVar1123.y, nodeVar1123.x ) * vec3( 0.1031 ) ) );
				nodeVar1124 = ( nodeVar1124 + vec3( dot( nodeVar1124, ( nodeVar1124.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1096 = ( nodeVar1096 + ( nodeVar1097 * mix( mix( fract( ( ( nodeVar1118.x + nodeVar1118.y ) * nodeVar1118.z ) ), fract( ( ( nodeVar1120.x + nodeVar1120.y ) * nodeVar1120.z ) ), nodeVar1117.x ), mix( fract( ( ( nodeVar1122.x + nodeVar1122.y ) * nodeVar1122.z ) ), fract( ( ( nodeVar1124.x + nodeVar1124.y ) * nodeVar1124.z ) ), nodeVar1117.x ), nodeVar1117.y ) ) );
				nodeVar1095 = ( nodeVar1095 * vec2( 2.03 ) );
				nodeVar1097 = ( nodeVar1097 * 0.52 );
				nodeVar1125 = floor( nodeVar1095 );
				nodeVar1126 = fract( nodeVar1095 );
				nodeVar1126 = ( ( nodeVar1126 * nodeVar1126 ) * ( vec2( 3.0 ) - ( nodeVar1126 * vec2( 2.0 ) ) ) );
				nodeVar1127 = fract( ( vec3( nodeVar1125.x, nodeVar1125.y, nodeVar1125.x ) * vec3( 0.1031 ) ) );
				nodeVar1127 = ( nodeVar1127 + vec3( dot( nodeVar1127, ( nodeVar1127.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1128 = ( nodeVar1125 + vec2( 1.0, 0.0 ) );
				nodeVar1129 = fract( ( vec3( nodeVar1128.x, nodeVar1128.y, nodeVar1128.x ) * vec3( 0.1031 ) ) );
				nodeVar1129 = ( nodeVar1129 + vec3( dot( nodeVar1129, ( nodeVar1129.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1130 = ( nodeVar1125 + vec2( 0.0, 1.0 ) );
				nodeVar1131 = fract( ( vec3( nodeVar1130.x, nodeVar1130.y, nodeVar1130.x ) * vec3( 0.1031 ) ) );
				nodeVar1131 = ( nodeVar1131 + vec3( dot( nodeVar1131, ( nodeVar1131.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1132 = ( nodeVar1125 + vec2( 1.0, 1.0 ) );
				nodeVar1133 = fract( ( vec3( nodeVar1132.x, nodeVar1132.y, nodeVar1132.x ) * vec3( 0.1031 ) ) );
				nodeVar1133 = ( nodeVar1133 + vec3( dot( nodeVar1133, ( nodeVar1133.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar1096 = ( nodeVar1096 + ( nodeVar1097 * mix( mix( fract( ( ( nodeVar1127.x + nodeVar1127.y ) * nodeVar1127.z ) ), fract( ( ( nodeVar1129.x + nodeVar1129.y ) * nodeVar1129.z ) ), nodeVar1126.x ), mix( fract( ( ( nodeVar1131.x + nodeVar1131.y ) * nodeVar1131.z ) ), fract( ( ( nodeVar1133.x + nodeVar1133.y ) * nodeVar1133.z ) ), nodeVar1126.x ), nodeVar1126.y ) ) );
				nodeVar1095 = ( nodeVar1095 * vec2( 2.03 ) );
				nodeVar1097 = ( nodeVar1097 * 0.52 );
				nodeVar916 = vec3( ( ( ( nodeVar1091 * ( 0.62 + ( nodeVar1094 * 0.38 ) ) ) * 0.72 ) + ( ( nodeVar1096 * 0.16 ) * nodeVar1091 ) ), nodeVar1091, nodeVar1094 );
				

			} else {


				if ( ( nodeVar915 < 3.5 ) ) {

					nodeVar1134 = floor( ( nodeVar914.y * 5.2 ) );
					nodeVar1135 = fract( ( nodeVar914.y * 5.2 ) );
					nodeVar1136 = smoothstep( 0.0, 0.06, min( nodeVar1135, ( 1.0 - nodeVar1135 ) ) );
					nodeVar1137 = vec2( ( nodeVar914.x * 2.2 ), ( nodeVar914.y * 60.0 ) );
					nodeVar1138 = 0.0;
					nodeVar1139 = 0.5;
					nodeVar1140 = floor( nodeVar1137 );
					nodeVar1141 = fract( nodeVar1137 );
					nodeVar1141 = ( ( nodeVar1141 * nodeVar1141 ) * ( vec2( 3.0 ) - ( nodeVar1141 * vec2( 2.0 ) ) ) );
					nodeVar1142 = fract( ( vec3( nodeVar1140.x, nodeVar1140.y, nodeVar1140.x ) * vec3( 0.1031 ) ) );
					nodeVar1142 = ( nodeVar1142 + vec3( dot( nodeVar1142, ( nodeVar1142.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1143 = ( nodeVar1140 + vec2( 1.0, 0.0 ) );
					nodeVar1144 = fract( ( vec3( nodeVar1143.x, nodeVar1143.y, nodeVar1143.x ) * vec3( 0.1031 ) ) );
					nodeVar1144 = ( nodeVar1144 + vec3( dot( nodeVar1144, ( nodeVar1144.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1145 = ( nodeVar1140 + vec2( 0.0, 1.0 ) );
					nodeVar1146 = fract( ( vec3( nodeVar1145.x, nodeVar1145.y, nodeVar1145.x ) * vec3( 0.1031 ) ) );
					nodeVar1146 = ( nodeVar1146 + vec3( dot( nodeVar1146, ( nodeVar1146.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1147 = ( nodeVar1140 + vec2( 1.0, 1.0 ) );
					nodeVar1148 = fract( ( vec3( nodeVar1147.x, nodeVar1147.y, nodeVar1147.x ) * vec3( 0.1031 ) ) );
					nodeVar1148 = ( nodeVar1148 + vec3( dot( nodeVar1148, ( nodeVar1148.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1138 = ( nodeVar1138 + ( nodeVar1139 * mix( mix( fract( ( ( nodeVar1142.x + nodeVar1142.y ) * nodeVar1142.z ) ), fract( ( ( nodeVar1144.x + nodeVar1144.y ) * nodeVar1144.z ) ), nodeVar1141.x ), mix( fract( ( ( nodeVar1146.x + nodeVar1146.y ) * nodeVar1146.z ) ), fract( ( ( nodeVar1148.x + nodeVar1148.y ) * nodeVar1148.z ) ), nodeVar1141.x ), nodeVar1141.y ) ) );
					nodeVar1137 = ( nodeVar1137 * vec2( 2.03 ) );
					nodeVar1139 = ( nodeVar1139 * 0.52 );
					nodeVar1149 = floor( nodeVar1137 );
					nodeVar1150 = fract( nodeVar1137 );
					nodeVar1150 = ( ( nodeVar1150 * nodeVar1150 ) * ( vec2( 3.0 ) - ( nodeVar1150 * vec2( 2.0 ) ) ) );
					nodeVar1151 = fract( ( vec3( nodeVar1149.x, nodeVar1149.y, nodeVar1149.x ) * vec3( 0.1031 ) ) );
					nodeVar1151 = ( nodeVar1151 + vec3( dot( nodeVar1151, ( nodeVar1151.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1152 = ( nodeVar1149 + vec2( 1.0, 0.0 ) );
					nodeVar1153 = fract( ( vec3( nodeVar1152.x, nodeVar1152.y, nodeVar1152.x ) * vec3( 0.1031 ) ) );
					nodeVar1153 = ( nodeVar1153 + vec3( dot( nodeVar1153, ( nodeVar1153.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1154 = ( nodeVar1149 + vec2( 0.0, 1.0 ) );
					nodeVar1155 = fract( ( vec3( nodeVar1154.x, nodeVar1154.y, nodeVar1154.x ) * vec3( 0.1031 ) ) );
					nodeVar1155 = ( nodeVar1155 + vec3( dot( nodeVar1155, ( nodeVar1155.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1156 = ( nodeVar1149 + vec2( 1.0, 1.0 ) );
					nodeVar1157 = fract( ( vec3( nodeVar1156.x, nodeVar1156.y, nodeVar1156.x ) * vec3( 0.1031 ) ) );
					nodeVar1157 = ( nodeVar1157 + vec3( dot( nodeVar1157, ( nodeVar1157.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1138 = ( nodeVar1138 + ( nodeVar1139 * mix( mix( fract( ( ( nodeVar1151.x + nodeVar1151.y ) * nodeVar1151.z ) ), fract( ( ( nodeVar1153.x + nodeVar1153.y ) * nodeVar1153.z ) ), nodeVar1150.x ), mix( fract( ( ( nodeVar1155.x + nodeVar1155.y ) * nodeVar1155.z ) ), fract( ( ( nodeVar1157.x + nodeVar1157.y ) * nodeVar1157.z ) ), nodeVar1150.x ), nodeVar1150.y ) ) );
					nodeVar1137 = ( nodeVar1137 * vec2( 2.03 ) );
					nodeVar1139 = ( nodeVar1139 * 0.52 );
					nodeVar1158 = floor( nodeVar1137 );
					nodeVar1159 = fract( nodeVar1137 );
					nodeVar1159 = ( ( nodeVar1159 * nodeVar1159 ) * ( vec2( 3.0 ) - ( nodeVar1159 * vec2( 2.0 ) ) ) );
					nodeVar1160 = fract( ( vec3( nodeVar1158.x, nodeVar1158.y, nodeVar1158.x ) * vec3( 0.1031 ) ) );
					nodeVar1160 = ( nodeVar1160 + vec3( dot( nodeVar1160, ( nodeVar1160.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1161 = ( nodeVar1158 + vec2( 1.0, 0.0 ) );
					nodeVar1162 = fract( ( vec3( nodeVar1161.x, nodeVar1161.y, nodeVar1161.x ) * vec3( 0.1031 ) ) );
					nodeVar1162 = ( nodeVar1162 + vec3( dot( nodeVar1162, ( nodeVar1162.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1163 = ( nodeVar1158 + vec2( 0.0, 1.0 ) );
					nodeVar1164 = fract( ( vec3( nodeVar1163.x, nodeVar1163.y, nodeVar1163.x ) * vec3( 0.1031 ) ) );
					nodeVar1164 = ( nodeVar1164 + vec3( dot( nodeVar1164, ( nodeVar1164.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1165 = ( nodeVar1158 + vec2( 1.0, 1.0 ) );
					nodeVar1166 = fract( ( vec3( nodeVar1165.x, nodeVar1165.y, nodeVar1165.x ) * vec3( 0.1031 ) ) );
					nodeVar1166 = ( nodeVar1166 + vec3( dot( nodeVar1166, ( nodeVar1166.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1138 = ( nodeVar1138 + ( nodeVar1139 * mix( mix( fract( ( ( nodeVar1160.x + nodeVar1160.y ) * nodeVar1160.z ) ), fract( ( ( nodeVar1162.x + nodeVar1162.y ) * nodeVar1162.z ) ), nodeVar1159.x ), mix( fract( ( ( nodeVar1164.x + nodeVar1164.y ) * nodeVar1164.z ) ), fract( ( ( nodeVar1166.x + nodeVar1166.y ) * nodeVar1166.z ) ), nodeVar1159.x ), nodeVar1159.y ) ) );
					nodeVar1137 = ( nodeVar1137 * vec2( 2.03 ) );
					nodeVar1139 = ( nodeVar1139 * 0.52 );
					nodeVar1167 = floor( nodeVar1137 );
					nodeVar1168 = fract( nodeVar1137 );
					nodeVar1168 = ( ( nodeVar1168 * nodeVar1168 ) * ( vec2( 3.0 ) - ( nodeVar1168 * vec2( 2.0 ) ) ) );
					nodeVar1169 = fract( ( vec3( nodeVar1167.x, nodeVar1167.y, nodeVar1167.x ) * vec3( 0.1031 ) ) );
					nodeVar1169 = ( nodeVar1169 + vec3( dot( nodeVar1169, ( nodeVar1169.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1170 = ( nodeVar1167 + vec2( 1.0, 0.0 ) );
					nodeVar1171 = fract( ( vec3( nodeVar1170.x, nodeVar1170.y, nodeVar1170.x ) * vec3( 0.1031 ) ) );
					nodeVar1171 = ( nodeVar1171 + vec3( dot( nodeVar1171, ( nodeVar1171.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1172 = ( nodeVar1167 + vec2( 0.0, 1.0 ) );
					nodeVar1173 = fract( ( vec3( nodeVar1172.x, nodeVar1172.y, nodeVar1172.x ) * vec3( 0.1031 ) ) );
					nodeVar1173 = ( nodeVar1173 + vec3( dot( nodeVar1173, ( nodeVar1173.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1174 = ( nodeVar1167 + vec2( 1.0, 1.0 ) );
					nodeVar1175 = fract( ( vec3( nodeVar1174.x, nodeVar1174.y, nodeVar1174.x ) * vec3( 0.1031 ) ) );
					nodeVar1175 = ( nodeVar1175 + vec3( dot( nodeVar1175, ( nodeVar1175.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar1138 = ( nodeVar1138 + ( nodeVar1139 * mix( mix( fract( ( ( nodeVar1169.x + nodeVar1169.y ) * nodeVar1169.z ) ), fract( ( ( nodeVar1171.x + nodeVar1171.y ) * nodeVar1171.z ) ), nodeVar1168.x ), mix( fract( ( ( nodeVar1173.x + nodeVar1173.y ) * nodeVar1173.z ) ), fract( ( ( nodeVar1175.x + nodeVar1175.y ) * nodeVar1175.z ) ), nodeVar1168.x ), nodeVar1168.y ) ) );
					nodeVar1137 = ( nodeVar1137 * vec2( 2.03 ) );
					nodeVar1139 = ( nodeVar1139 * 0.52 );
					nodeVar1176 = nodeVar1138;
					nodeVar1177 = fract( ( ( nodeVar1134 * 5.1 ) * 0.1031 ) );
					nodeVar1177 = ( nodeVar1177 * ( nodeVar1177 + 33.33 ) );
					nodeVar1177 = ( nodeVar1177 * ( nodeVar1177 + nodeVar1177 ) );
					nodeVar916 = vec3( ( ( ( nodeVar1136 * ( 0.6 + ( nodeVar1176 * 0.4 ) ) ) * 0.5 ) + ( ( fract( nodeVar1177 ) * 0.12 ) * nodeVar1136 ) ), nodeVar1136, nodeVar1176 );
					

				} else {


					if ( ( nodeVar915 < 4.5 ) ) {

						nodeVar1178 = floor( ( nodeVar914.y / 0.45 ) );
						nodeVar1179 = fract( ( ( nodeVar1178 * 4.7 ) * 0.1031 ) );
						nodeVar1179 = ( nodeVar1179 * ( nodeVar1179 + 33.33 ) );
						nodeVar1179 = ( nodeVar1179 * ( nodeVar1179 + nodeVar1179 ) );
						nodeVar1180 = ( ( ( mod( nodeVar1178, 2.0 ) * 0.5 ) * 0.9 ) + ( fract( nodeVar1179 ) * 0.18 ) );
						nodeVar1181 = fract( ( ( nodeVar914.x + nodeVar1180 ) / 0.9 ) );
						nodeVar1182 = fract( ( nodeVar914.y / 0.45 ) );
						nodeVar1183 = min( ( min( nodeVar1181, ( 1.0 - nodeVar1181 ) ) * 0.9 ), ( min( nodeVar1182, ( 1.0 - nodeVar1182 ) ) * 0.45 ) );
						nodeVar1184 = smoothstep( 0.0, 0.006, nodeVar1183 );
						nodeVar1185 = vec2( ( nodeVar914.x * 2.2 ), ( nodeVar914.y * 16.0 ) );
						nodeVar1186 = 0.0;
						nodeVar1187 = 0.5;
						nodeVar1188 = floor( nodeVar1185 );
						nodeVar1189 = fract( nodeVar1185 );
						nodeVar1189 = ( ( nodeVar1189 * nodeVar1189 ) * ( vec2( 3.0 ) - ( nodeVar1189 * vec2( 2.0 ) ) ) );
						nodeVar1190 = fract( ( vec3( nodeVar1188.x, nodeVar1188.y, nodeVar1188.x ) * vec3( 0.1031 ) ) );
						nodeVar1190 = ( nodeVar1190 + vec3( dot( nodeVar1190, ( nodeVar1190.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1191 = ( nodeVar1188 + vec2( 1.0, 0.0 ) );
						nodeVar1192 = fract( ( vec3( nodeVar1191.x, nodeVar1191.y, nodeVar1191.x ) * vec3( 0.1031 ) ) );
						nodeVar1192 = ( nodeVar1192 + vec3( dot( nodeVar1192, ( nodeVar1192.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1193 = ( nodeVar1188 + vec2( 0.0, 1.0 ) );
						nodeVar1194 = fract( ( vec3( nodeVar1193.x, nodeVar1193.y, nodeVar1193.x ) * vec3( 0.1031 ) ) );
						nodeVar1194 = ( nodeVar1194 + vec3( dot( nodeVar1194, ( nodeVar1194.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1195 = ( nodeVar1188 + vec2( 1.0, 1.0 ) );
						nodeVar1196 = fract( ( vec3( nodeVar1195.x, nodeVar1195.y, nodeVar1195.x ) * vec3( 0.1031 ) ) );
						nodeVar1196 = ( nodeVar1196 + vec3( dot( nodeVar1196, ( nodeVar1196.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1186 = ( nodeVar1186 + ( nodeVar1187 * mix( mix( fract( ( ( nodeVar1190.x + nodeVar1190.y ) * nodeVar1190.z ) ), fract( ( ( nodeVar1192.x + nodeVar1192.y ) * nodeVar1192.z ) ), nodeVar1189.x ), mix( fract( ( ( nodeVar1194.x + nodeVar1194.y ) * nodeVar1194.z ) ), fract( ( ( nodeVar1196.x + nodeVar1196.y ) * nodeVar1196.z ) ), nodeVar1189.x ), nodeVar1189.y ) ) );
						nodeVar1185 = ( nodeVar1185 * vec2( 2.03 ) );
						nodeVar1187 = ( nodeVar1187 * 0.52 );
						nodeVar1197 = floor( nodeVar1185 );
						nodeVar1198 = fract( nodeVar1185 );
						nodeVar1198 = ( ( nodeVar1198 * nodeVar1198 ) * ( vec2( 3.0 ) - ( nodeVar1198 * vec2( 2.0 ) ) ) );
						nodeVar1199 = fract( ( vec3( nodeVar1197.x, nodeVar1197.y, nodeVar1197.x ) * vec3( 0.1031 ) ) );
						nodeVar1199 = ( nodeVar1199 + vec3( dot( nodeVar1199, ( nodeVar1199.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1200 = ( nodeVar1197 + vec2( 1.0, 0.0 ) );
						nodeVar1201 = fract( ( vec3( nodeVar1200.x, nodeVar1200.y, nodeVar1200.x ) * vec3( 0.1031 ) ) );
						nodeVar1201 = ( nodeVar1201 + vec3( dot( nodeVar1201, ( nodeVar1201.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1202 = ( nodeVar1197 + vec2( 0.0, 1.0 ) );
						nodeVar1203 = fract( ( vec3( nodeVar1202.x, nodeVar1202.y, nodeVar1202.x ) * vec3( 0.1031 ) ) );
						nodeVar1203 = ( nodeVar1203 + vec3( dot( nodeVar1203, ( nodeVar1203.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1204 = ( nodeVar1197 + vec2( 1.0, 1.0 ) );
						nodeVar1205 = fract( ( vec3( nodeVar1204.x, nodeVar1204.y, nodeVar1204.x ) * vec3( 0.1031 ) ) );
						nodeVar1205 = ( nodeVar1205 + vec3( dot( nodeVar1205, ( nodeVar1205.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1186 = ( nodeVar1186 + ( nodeVar1187 * mix( mix( fract( ( ( nodeVar1199.x + nodeVar1199.y ) * nodeVar1199.z ) ), fract( ( ( nodeVar1201.x + nodeVar1201.y ) * nodeVar1201.z ) ), nodeVar1198.x ), mix( fract( ( ( nodeVar1203.x + nodeVar1203.y ) * nodeVar1203.z ) ), fract( ( ( nodeVar1205.x + nodeVar1205.y ) * nodeVar1205.z ) ), nodeVar1198.x ), nodeVar1198.y ) ) );
						nodeVar1185 = ( nodeVar1185 * vec2( 2.03 ) );
						nodeVar1187 = ( nodeVar1187 * 0.52 );
						nodeVar1206 = floor( nodeVar1185 );
						nodeVar1207 = fract( nodeVar1185 );
						nodeVar1207 = ( ( nodeVar1207 * nodeVar1207 ) * ( vec2( 3.0 ) - ( nodeVar1207 * vec2( 2.0 ) ) ) );
						nodeVar1208 = fract( ( vec3( nodeVar1206.x, nodeVar1206.y, nodeVar1206.x ) * vec3( 0.1031 ) ) );
						nodeVar1208 = ( nodeVar1208 + vec3( dot( nodeVar1208, ( nodeVar1208.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1209 = ( nodeVar1206 + vec2( 1.0, 0.0 ) );
						nodeVar1210 = fract( ( vec3( nodeVar1209.x, nodeVar1209.y, nodeVar1209.x ) * vec3( 0.1031 ) ) );
						nodeVar1210 = ( nodeVar1210 + vec3( dot( nodeVar1210, ( nodeVar1210.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1211 = ( nodeVar1206 + vec2( 0.0, 1.0 ) );
						nodeVar1212 = fract( ( vec3( nodeVar1211.x, nodeVar1211.y, nodeVar1211.x ) * vec3( 0.1031 ) ) );
						nodeVar1212 = ( nodeVar1212 + vec3( dot( nodeVar1212, ( nodeVar1212.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1213 = ( nodeVar1206 + vec2( 1.0, 1.0 ) );
						nodeVar1214 = fract( ( vec3( nodeVar1213.x, nodeVar1213.y, nodeVar1213.x ) * vec3( 0.1031 ) ) );
						nodeVar1214 = ( nodeVar1214 + vec3( dot( nodeVar1214, ( nodeVar1214.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1186 = ( nodeVar1186 + ( nodeVar1187 * mix( mix( fract( ( ( nodeVar1208.x + nodeVar1208.y ) * nodeVar1208.z ) ), fract( ( ( nodeVar1210.x + nodeVar1210.y ) * nodeVar1210.z ) ), nodeVar1207.x ), mix( fract( ( ( nodeVar1212.x + nodeVar1212.y ) * nodeVar1212.z ) ), fract( ( ( nodeVar1214.x + nodeVar1214.y ) * nodeVar1214.z ) ), nodeVar1207.x ), nodeVar1207.y ) ) );
						nodeVar1185 = ( nodeVar1185 * vec2( 2.03 ) );
						nodeVar1187 = ( nodeVar1187 * 0.52 );
						nodeVar1215 = floor( nodeVar1185 );
						nodeVar1216 = fract( nodeVar1185 );
						nodeVar1216 = ( ( nodeVar1216 * nodeVar1216 ) * ( vec2( 3.0 ) - ( nodeVar1216 * vec2( 2.0 ) ) ) );
						nodeVar1217 = fract( ( vec3( nodeVar1215.x, nodeVar1215.y, nodeVar1215.x ) * vec3( 0.1031 ) ) );
						nodeVar1217 = ( nodeVar1217 + vec3( dot( nodeVar1217, ( nodeVar1217.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1218 = ( nodeVar1215 + vec2( 1.0, 0.0 ) );
						nodeVar1219 = fract( ( vec3( nodeVar1218.x, nodeVar1218.y, nodeVar1218.x ) * vec3( 0.1031 ) ) );
						nodeVar1219 = ( nodeVar1219 + vec3( dot( nodeVar1219, ( nodeVar1219.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1220 = ( nodeVar1215 + vec2( 0.0, 1.0 ) );
						nodeVar1221 = fract( ( vec3( nodeVar1220.x, nodeVar1220.y, nodeVar1220.x ) * vec3( 0.1031 ) ) );
						nodeVar1221 = ( nodeVar1221 + vec3( dot( nodeVar1221, ( nodeVar1221.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1222 = ( nodeVar1215 + vec2( 1.0, 1.0 ) );
						nodeVar1223 = fract( ( vec3( nodeVar1222.x, nodeVar1222.y, nodeVar1222.x ) * vec3( 0.1031 ) ) );
						nodeVar1223 = ( nodeVar1223 + vec3( dot( nodeVar1223, ( nodeVar1223.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1186 = ( nodeVar1186 + ( nodeVar1187 * mix( mix( fract( ( ( nodeVar1217.x + nodeVar1217.y ) * nodeVar1217.z ) ), fract( ( ( nodeVar1219.x + nodeVar1219.y ) * nodeVar1219.z ) ), nodeVar1216.x ), mix( fract( ( ( nodeVar1221.x + nodeVar1221.y ) * nodeVar1221.z ) ), fract( ( ( nodeVar1223.x + nodeVar1223.y ) * nodeVar1223.z ) ), nodeVar1216.x ), nodeVar1216.y ) ) );
						nodeVar1185 = ( nodeVar1185 * vec2( 2.03 ) );
						nodeVar1187 = ( nodeVar1187 * 0.52 );
						nodeVar1224 = nodeVar1186;
						nodeVar1225 = ( vec2( floor( ( ( nodeVar914.x + nodeVar1180 ) / 0.9 ) ), nodeVar1178 ) * vec2( 1.61 ) );
						nodeVar1226 = fract( ( vec3( nodeVar1225.x, nodeVar1225.y, nodeVar1225.x ) * vec3( 0.1031 ) ) );
						nodeVar1226 = ( nodeVar1226 + vec3( dot( nodeVar1226, ( nodeVar1226.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1227 = fract( ( ( nodeVar1226.x + nodeVar1226.y ) * nodeVar1226.z ) );
						nodeVar1228 = ( nodeVar914 * vec2( 26.0 ) );
						nodeVar1229 = 0.0;
						nodeVar1230 = 0.5;
						nodeVar1231 = floor( nodeVar1228 );
						nodeVar1232 = fract( nodeVar1228 );
						nodeVar1232 = ( ( nodeVar1232 * nodeVar1232 ) * ( vec2( 3.0 ) - ( nodeVar1232 * vec2( 2.0 ) ) ) );
						nodeVar1233 = fract( ( vec3( nodeVar1231.x, nodeVar1231.y, nodeVar1231.x ) * vec3( 0.1031 ) ) );
						nodeVar1233 = ( nodeVar1233 + vec3( dot( nodeVar1233, ( nodeVar1233.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1234 = ( nodeVar1231 + vec2( 1.0, 0.0 ) );
						nodeVar1235 = fract( ( vec3( nodeVar1234.x, nodeVar1234.y, nodeVar1234.x ) * vec3( 0.1031 ) ) );
						nodeVar1235 = ( nodeVar1235 + vec3( dot( nodeVar1235, ( nodeVar1235.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1236 = ( nodeVar1231 + vec2( 0.0, 1.0 ) );
						nodeVar1237 = fract( ( vec3( nodeVar1236.x, nodeVar1236.y, nodeVar1236.x ) * vec3( 0.1031 ) ) );
						nodeVar1237 = ( nodeVar1237 + vec3( dot( nodeVar1237, ( nodeVar1237.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1238 = ( nodeVar1231 + vec2( 1.0, 1.0 ) );
						nodeVar1239 = fract( ( vec3( nodeVar1238.x, nodeVar1238.y, nodeVar1238.x ) * vec3( 0.1031 ) ) );
						nodeVar1239 = ( nodeVar1239 + vec3( dot( nodeVar1239, ( nodeVar1239.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1229 = ( nodeVar1229 + ( nodeVar1230 * mix( mix( fract( ( ( nodeVar1233.x + nodeVar1233.y ) * nodeVar1233.z ) ), fract( ( ( nodeVar1235.x + nodeVar1235.y ) * nodeVar1235.z ) ), nodeVar1232.x ), mix( fract( ( ( nodeVar1237.x + nodeVar1237.y ) * nodeVar1237.z ) ), fract( ( ( nodeVar1239.x + nodeVar1239.y ) * nodeVar1239.z ) ), nodeVar1232.x ), nodeVar1232.y ) ) );
						nodeVar1228 = ( nodeVar1228 * vec2( 2.03 ) );
						nodeVar1230 = ( nodeVar1230 * 0.52 );
						nodeVar1240 = floor( nodeVar1228 );
						nodeVar1241 = fract( nodeVar1228 );
						nodeVar1241 = ( ( nodeVar1241 * nodeVar1241 ) * ( vec2( 3.0 ) - ( nodeVar1241 * vec2( 2.0 ) ) ) );
						nodeVar1242 = fract( ( vec3( nodeVar1240.x, nodeVar1240.y, nodeVar1240.x ) * vec3( 0.1031 ) ) );
						nodeVar1242 = ( nodeVar1242 + vec3( dot( nodeVar1242, ( nodeVar1242.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1243 = ( nodeVar1240 + vec2( 1.0, 0.0 ) );
						nodeVar1244 = fract( ( vec3( nodeVar1243.x, nodeVar1243.y, nodeVar1243.x ) * vec3( 0.1031 ) ) );
						nodeVar1244 = ( nodeVar1244 + vec3( dot( nodeVar1244, ( nodeVar1244.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1245 = ( nodeVar1240 + vec2( 0.0, 1.0 ) );
						nodeVar1246 = fract( ( vec3( nodeVar1245.x, nodeVar1245.y, nodeVar1245.x ) * vec3( 0.1031 ) ) );
						nodeVar1246 = ( nodeVar1246 + vec3( dot( nodeVar1246, ( nodeVar1246.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1247 = ( nodeVar1240 + vec2( 1.0, 1.0 ) );
						nodeVar1248 = fract( ( vec3( nodeVar1247.x, nodeVar1247.y, nodeVar1247.x ) * vec3( 0.1031 ) ) );
						nodeVar1248 = ( nodeVar1248 + vec3( dot( nodeVar1248, ( nodeVar1248.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1229 = ( nodeVar1229 + ( nodeVar1230 * mix( mix( fract( ( ( nodeVar1242.x + nodeVar1242.y ) * nodeVar1242.z ) ), fract( ( ( nodeVar1244.x + nodeVar1244.y ) * nodeVar1244.z ) ), nodeVar1241.x ), mix( fract( ( ( nodeVar1246.x + nodeVar1246.y ) * nodeVar1246.z ) ), fract( ( ( nodeVar1248.x + nodeVar1248.y ) * nodeVar1248.z ) ), nodeVar1241.x ), nodeVar1241.y ) ) );
						nodeVar1228 = ( nodeVar1228 * vec2( 2.03 ) );
						nodeVar1230 = ( nodeVar1230 * 0.52 );
						nodeVar1249 = floor( nodeVar1228 );
						nodeVar1250 = fract( nodeVar1228 );
						nodeVar1250 = ( ( nodeVar1250 * nodeVar1250 ) * ( vec2( 3.0 ) - ( nodeVar1250 * vec2( 2.0 ) ) ) );
						nodeVar1251 = fract( ( vec3( nodeVar1249.x, nodeVar1249.y, nodeVar1249.x ) * vec3( 0.1031 ) ) );
						nodeVar1251 = ( nodeVar1251 + vec3( dot( nodeVar1251, ( nodeVar1251.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1252 = ( nodeVar1249 + vec2( 1.0, 0.0 ) );
						nodeVar1253 = fract( ( vec3( nodeVar1252.x, nodeVar1252.y, nodeVar1252.x ) * vec3( 0.1031 ) ) );
						nodeVar1253 = ( nodeVar1253 + vec3( dot( nodeVar1253, ( nodeVar1253.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1254 = ( nodeVar1249 + vec2( 0.0, 1.0 ) );
						nodeVar1255 = fract( ( vec3( nodeVar1254.x, nodeVar1254.y, nodeVar1254.x ) * vec3( 0.1031 ) ) );
						nodeVar1255 = ( nodeVar1255 + vec3( dot( nodeVar1255, ( nodeVar1255.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1256 = ( nodeVar1249 + vec2( 1.0, 1.0 ) );
						nodeVar1257 = fract( ( vec3( nodeVar1256.x, nodeVar1256.y, nodeVar1256.x ) * vec3( 0.1031 ) ) );
						nodeVar1257 = ( nodeVar1257 + vec3( dot( nodeVar1257, ( nodeVar1257.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1229 = ( nodeVar1229 + ( nodeVar1230 * mix( mix( fract( ( ( nodeVar1251.x + nodeVar1251.y ) * nodeVar1251.z ) ), fract( ( ( nodeVar1253.x + nodeVar1253.y ) * nodeVar1253.z ) ), nodeVar1250.x ), mix( fract( ( ( nodeVar1255.x + nodeVar1255.y ) * nodeVar1255.z ) ), fract( ( ( nodeVar1257.x + nodeVar1257.y ) * nodeVar1257.z ) ), nodeVar1250.x ), nodeVar1250.y ) ) );
						nodeVar1228 = ( nodeVar1228 * vec2( 2.03 ) );
						nodeVar1230 = ( nodeVar1230 * 0.52 );
						nodeVar1258 = floor( nodeVar1228 );
						nodeVar1259 = fract( nodeVar1228 );
						nodeVar1259 = ( ( nodeVar1259 * nodeVar1259 ) * ( vec2( 3.0 ) - ( nodeVar1259 * vec2( 2.0 ) ) ) );
						nodeVar1260 = fract( ( vec3( nodeVar1258.x, nodeVar1258.y, nodeVar1258.x ) * vec3( 0.1031 ) ) );
						nodeVar1260 = ( nodeVar1260 + vec3( dot( nodeVar1260, ( nodeVar1260.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1261 = ( nodeVar1258 + vec2( 1.0, 0.0 ) );
						nodeVar1262 = fract( ( vec3( nodeVar1261.x, nodeVar1261.y, nodeVar1261.x ) * vec3( 0.1031 ) ) );
						nodeVar1262 = ( nodeVar1262 + vec3( dot( nodeVar1262, ( nodeVar1262.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1263 = ( nodeVar1258 + vec2( 0.0, 1.0 ) );
						nodeVar1264 = fract( ( vec3( nodeVar1263.x, nodeVar1263.y, nodeVar1263.x ) * vec3( 0.1031 ) ) );
						nodeVar1264 = ( nodeVar1264 + vec3( dot( nodeVar1264, ( nodeVar1264.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1265 = ( nodeVar1258 + vec2( 1.0, 1.0 ) );
						nodeVar1266 = fract( ( vec3( nodeVar1265.x, nodeVar1265.y, nodeVar1265.x ) * vec3( 0.1031 ) ) );
						nodeVar1266 = ( nodeVar1266 + vec3( dot( nodeVar1266, ( nodeVar1266.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar1229 = ( nodeVar1229 + ( nodeVar1230 * mix( mix( fract( ( ( nodeVar1260.x + nodeVar1260.y ) * nodeVar1260.z ) ), fract( ( ( nodeVar1262.x + nodeVar1262.y ) * nodeVar1262.z ) ), nodeVar1259.x ), mix( fract( ( ( nodeVar1264.x + nodeVar1264.y ) * nodeVar1264.z ) ), fract( ( ( nodeVar1266.x + nodeVar1266.y ) * nodeVar1266.z ) ), nodeVar1259.x ), nodeVar1259.y ) ) );
						nodeVar1228 = ( nodeVar1228 * vec2( 2.03 ) );
						nodeVar1230 = ( nodeVar1230 * 0.52 );
						nodeVar1267 = smoothstep( 0.62, 0.92, nodeVar1229 );
						nodeVar916 = vec3( ( ( ( nodeVar1184 * ( 0.62 + ( nodeVar1227 * 0.38 ) ) ) * 0.4 ) - ( nodeVar1267 * 0.22 ) ), ( nodeVar1184 * ( 1.0 - ( nodeVar1267 * 0.7 ) ) ), ( ( nodeVar1224 * 0.35 ) + ( nodeVar1227 * 0.65 ) ) );
						

					} else {


						if ( ( nodeVar915 < 5.5 ) ) {

							nodeVar1268 = ( nodeVar914 * vec2( 4.2 ) );
							nodeVar1269 = 0.0;
							nodeVar1270 = 0.5;
							nodeVar1271 = floor( nodeVar1268 );
							nodeVar1272 = fract( nodeVar1268 );
							nodeVar1272 = ( ( nodeVar1272 * nodeVar1272 ) * ( vec2( 3.0 ) - ( nodeVar1272 * vec2( 2.0 ) ) ) );
							nodeVar1273 = fract( ( vec3( nodeVar1271.x, nodeVar1271.y, nodeVar1271.x ) * vec3( 0.1031 ) ) );
							nodeVar1273 = ( nodeVar1273 + vec3( dot( nodeVar1273, ( nodeVar1273.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1274 = ( nodeVar1271 + vec2( 1.0, 0.0 ) );
							nodeVar1275 = fract( ( vec3( nodeVar1274.x, nodeVar1274.y, nodeVar1274.x ) * vec3( 0.1031 ) ) );
							nodeVar1275 = ( nodeVar1275 + vec3( dot( nodeVar1275, ( nodeVar1275.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1276 = ( nodeVar1271 + vec2( 0.0, 1.0 ) );
							nodeVar1277 = fract( ( vec3( nodeVar1276.x, nodeVar1276.y, nodeVar1276.x ) * vec3( 0.1031 ) ) );
							nodeVar1277 = ( nodeVar1277 + vec3( dot( nodeVar1277, ( nodeVar1277.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1278 = ( nodeVar1271 + vec2( 1.0, 1.0 ) );
							nodeVar1279 = fract( ( vec3( nodeVar1278.x, nodeVar1278.y, nodeVar1278.x ) * vec3( 0.1031 ) ) );
							nodeVar1279 = ( nodeVar1279 + vec3( dot( nodeVar1279, ( nodeVar1279.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1269 = ( nodeVar1269 + ( nodeVar1270 * mix( mix( fract( ( ( nodeVar1273.x + nodeVar1273.y ) * nodeVar1273.z ) ), fract( ( ( nodeVar1275.x + nodeVar1275.y ) * nodeVar1275.z ) ), nodeVar1272.x ), mix( fract( ( ( nodeVar1277.x + nodeVar1277.y ) * nodeVar1277.z ) ), fract( ( ( nodeVar1279.x + nodeVar1279.y ) * nodeVar1279.z ) ), nodeVar1272.x ), nodeVar1272.y ) ) );
							nodeVar1268 = ( nodeVar1268 * vec2( 2.03 ) );
							nodeVar1270 = ( nodeVar1270 * 0.52 );
							nodeVar1280 = floor( nodeVar1268 );
							nodeVar1281 = fract( nodeVar1268 );
							nodeVar1281 = ( ( nodeVar1281 * nodeVar1281 ) * ( vec2( 3.0 ) - ( nodeVar1281 * vec2( 2.0 ) ) ) );
							nodeVar1282 = fract( ( vec3( nodeVar1280.x, nodeVar1280.y, nodeVar1280.x ) * vec3( 0.1031 ) ) );
							nodeVar1282 = ( nodeVar1282 + vec3( dot( nodeVar1282, ( nodeVar1282.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1283 = ( nodeVar1280 + vec2( 1.0, 0.0 ) );
							nodeVar1284 = fract( ( vec3( nodeVar1283.x, nodeVar1283.y, nodeVar1283.x ) * vec3( 0.1031 ) ) );
							nodeVar1284 = ( nodeVar1284 + vec3( dot( nodeVar1284, ( nodeVar1284.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1285 = ( nodeVar1280 + vec2( 0.0, 1.0 ) );
							nodeVar1286 = fract( ( vec3( nodeVar1285.x, nodeVar1285.y, nodeVar1285.x ) * vec3( 0.1031 ) ) );
							nodeVar1286 = ( nodeVar1286 + vec3( dot( nodeVar1286, ( nodeVar1286.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1287 = ( nodeVar1280 + vec2( 1.0, 1.0 ) );
							nodeVar1288 = fract( ( vec3( nodeVar1287.x, nodeVar1287.y, nodeVar1287.x ) * vec3( 0.1031 ) ) );
							nodeVar1288 = ( nodeVar1288 + vec3( dot( nodeVar1288, ( nodeVar1288.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1269 = ( nodeVar1269 + ( nodeVar1270 * mix( mix( fract( ( ( nodeVar1282.x + nodeVar1282.y ) * nodeVar1282.z ) ), fract( ( ( nodeVar1284.x + nodeVar1284.y ) * nodeVar1284.z ) ), nodeVar1281.x ), mix( fract( ( ( nodeVar1286.x + nodeVar1286.y ) * nodeVar1286.z ) ), fract( ( ( nodeVar1288.x + nodeVar1288.y ) * nodeVar1288.z ) ), nodeVar1281.x ), nodeVar1281.y ) ) );
							nodeVar1268 = ( nodeVar1268 * vec2( 2.03 ) );
							nodeVar1270 = ( nodeVar1270 * 0.52 );
							nodeVar1289 = floor( nodeVar1268 );
							nodeVar1290 = fract( nodeVar1268 );
							nodeVar1290 = ( ( nodeVar1290 * nodeVar1290 ) * ( vec2( 3.0 ) - ( nodeVar1290 * vec2( 2.0 ) ) ) );
							nodeVar1291 = fract( ( vec3( nodeVar1289.x, nodeVar1289.y, nodeVar1289.x ) * vec3( 0.1031 ) ) );
							nodeVar1291 = ( nodeVar1291 + vec3( dot( nodeVar1291, ( nodeVar1291.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1292 = ( nodeVar1289 + vec2( 1.0, 0.0 ) );
							nodeVar1293 = fract( ( vec3( nodeVar1292.x, nodeVar1292.y, nodeVar1292.x ) * vec3( 0.1031 ) ) );
							nodeVar1293 = ( nodeVar1293 + vec3( dot( nodeVar1293, ( nodeVar1293.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1294 = ( nodeVar1289 + vec2( 0.0, 1.0 ) );
							nodeVar1295 = fract( ( vec3( nodeVar1294.x, nodeVar1294.y, nodeVar1294.x ) * vec3( 0.1031 ) ) );
							nodeVar1295 = ( nodeVar1295 + vec3( dot( nodeVar1295, ( nodeVar1295.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1296 = ( nodeVar1289 + vec2( 1.0, 1.0 ) );
							nodeVar1297 = fract( ( vec3( nodeVar1296.x, nodeVar1296.y, nodeVar1296.x ) * vec3( 0.1031 ) ) );
							nodeVar1297 = ( nodeVar1297 + vec3( dot( nodeVar1297, ( nodeVar1297.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1269 = ( nodeVar1269 + ( nodeVar1270 * mix( mix( fract( ( ( nodeVar1291.x + nodeVar1291.y ) * nodeVar1291.z ) ), fract( ( ( nodeVar1293.x + nodeVar1293.y ) * nodeVar1293.z ) ), nodeVar1290.x ), mix( fract( ( ( nodeVar1295.x + nodeVar1295.y ) * nodeVar1295.z ) ), fract( ( ( nodeVar1297.x + nodeVar1297.y ) * nodeVar1297.z ) ), nodeVar1290.x ), nodeVar1290.y ) ) );
							nodeVar1268 = ( nodeVar1268 * vec2( 2.03 ) );
							nodeVar1270 = ( nodeVar1270 * 0.52 );
							nodeVar1298 = floor( nodeVar1268 );
							nodeVar1299 = fract( nodeVar1268 );
							nodeVar1299 = ( ( nodeVar1299 * nodeVar1299 ) * ( vec2( 3.0 ) - ( nodeVar1299 * vec2( 2.0 ) ) ) );
							nodeVar1300 = fract( ( vec3( nodeVar1298.x, nodeVar1298.y, nodeVar1298.x ) * vec3( 0.1031 ) ) );
							nodeVar1300 = ( nodeVar1300 + vec3( dot( nodeVar1300, ( nodeVar1300.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1301 = ( nodeVar1298 + vec2( 1.0, 0.0 ) );
							nodeVar1302 = fract( ( vec3( nodeVar1301.x, nodeVar1301.y, nodeVar1301.x ) * vec3( 0.1031 ) ) );
							nodeVar1302 = ( nodeVar1302 + vec3( dot( nodeVar1302, ( nodeVar1302.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1303 = ( nodeVar1298 + vec2( 0.0, 1.0 ) );
							nodeVar1304 = fract( ( vec3( nodeVar1303.x, nodeVar1303.y, nodeVar1303.x ) * vec3( 0.1031 ) ) );
							nodeVar1304 = ( nodeVar1304 + vec3( dot( nodeVar1304, ( nodeVar1304.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1305 = ( nodeVar1298 + vec2( 1.0, 1.0 ) );
							nodeVar1306 = fract( ( vec3( nodeVar1305.x, nodeVar1305.y, nodeVar1305.x ) * vec3( 0.1031 ) ) );
							nodeVar1306 = ( nodeVar1306 + vec3( dot( nodeVar1306, ( nodeVar1306.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1269 = ( nodeVar1269 + ( nodeVar1270 * mix( mix( fract( ( ( nodeVar1300.x + nodeVar1300.y ) * nodeVar1300.z ) ), fract( ( ( nodeVar1302.x + nodeVar1302.y ) * nodeVar1302.z ) ), nodeVar1299.x ), mix( fract( ( ( nodeVar1304.x + nodeVar1304.y ) * nodeVar1304.z ) ), fract( ( ( nodeVar1306.x + nodeVar1306.y ) * nodeVar1306.z ) ), nodeVar1299.x ), nodeVar1299.y ) ) );
							nodeVar1268 = ( nodeVar1268 * vec2( 2.03 ) );
							nodeVar1270 = ( nodeVar1270 * 0.52 );
							nodeVar1307 = ( nodeVar914 * vec2( 19.0 ) );
							nodeVar1308 = 0.0;
							nodeVar1309 = 0.5;
							nodeVar1310 = floor( nodeVar1307 );
							nodeVar1311 = fract( nodeVar1307 );
							nodeVar1311 = ( ( nodeVar1311 * nodeVar1311 ) * ( vec2( 3.0 ) - ( nodeVar1311 * vec2( 2.0 ) ) ) );
							nodeVar1312 = fract( ( vec3( nodeVar1310.x, nodeVar1310.y, nodeVar1310.x ) * vec3( 0.1031 ) ) );
							nodeVar1312 = ( nodeVar1312 + vec3( dot( nodeVar1312, ( nodeVar1312.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1313 = ( nodeVar1310 + vec2( 1.0, 0.0 ) );
							nodeVar1314 = fract( ( vec3( nodeVar1313.x, nodeVar1313.y, nodeVar1313.x ) * vec3( 0.1031 ) ) );
							nodeVar1314 = ( nodeVar1314 + vec3( dot( nodeVar1314, ( nodeVar1314.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1315 = ( nodeVar1310 + vec2( 0.0, 1.0 ) );
							nodeVar1316 = fract( ( vec3( nodeVar1315.x, nodeVar1315.y, nodeVar1315.x ) * vec3( 0.1031 ) ) );
							nodeVar1316 = ( nodeVar1316 + vec3( dot( nodeVar1316, ( nodeVar1316.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1317 = ( nodeVar1310 + vec2( 1.0, 1.0 ) );
							nodeVar1318 = fract( ( vec3( nodeVar1317.x, nodeVar1317.y, nodeVar1317.x ) * vec3( 0.1031 ) ) );
							nodeVar1318 = ( nodeVar1318 + vec3( dot( nodeVar1318, ( nodeVar1318.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1308 = ( nodeVar1308 + ( nodeVar1309 * mix( mix( fract( ( ( nodeVar1312.x + nodeVar1312.y ) * nodeVar1312.z ) ), fract( ( ( nodeVar1314.x + nodeVar1314.y ) * nodeVar1314.z ) ), nodeVar1311.x ), mix( fract( ( ( nodeVar1316.x + nodeVar1316.y ) * nodeVar1316.z ) ), fract( ( ( nodeVar1318.x + nodeVar1318.y ) * nodeVar1318.z ) ), nodeVar1311.x ), nodeVar1311.y ) ) );
							nodeVar1307 = ( nodeVar1307 * vec2( 2.03 ) );
							nodeVar1309 = ( nodeVar1309 * 0.52 );
							nodeVar1319 = floor( nodeVar1307 );
							nodeVar1320 = fract( nodeVar1307 );
							nodeVar1320 = ( ( nodeVar1320 * nodeVar1320 ) * ( vec2( 3.0 ) - ( nodeVar1320 * vec2( 2.0 ) ) ) );
							nodeVar1321 = fract( ( vec3( nodeVar1319.x, nodeVar1319.y, nodeVar1319.x ) * vec3( 0.1031 ) ) );
							nodeVar1321 = ( nodeVar1321 + vec3( dot( nodeVar1321, ( nodeVar1321.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1322 = ( nodeVar1319 + vec2( 1.0, 0.0 ) );
							nodeVar1323 = fract( ( vec3( nodeVar1322.x, nodeVar1322.y, nodeVar1322.x ) * vec3( 0.1031 ) ) );
							nodeVar1323 = ( nodeVar1323 + vec3( dot( nodeVar1323, ( nodeVar1323.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1324 = ( nodeVar1319 + vec2( 0.0, 1.0 ) );
							nodeVar1325 = fract( ( vec3( nodeVar1324.x, nodeVar1324.y, nodeVar1324.x ) * vec3( 0.1031 ) ) );
							nodeVar1325 = ( nodeVar1325 + vec3( dot( nodeVar1325, ( nodeVar1325.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1326 = ( nodeVar1319 + vec2( 1.0, 1.0 ) );
							nodeVar1327 = fract( ( vec3( nodeVar1326.x, nodeVar1326.y, nodeVar1326.x ) * vec3( 0.1031 ) ) );
							nodeVar1327 = ( nodeVar1327 + vec3( dot( nodeVar1327, ( nodeVar1327.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1308 = ( nodeVar1308 + ( nodeVar1309 * mix( mix( fract( ( ( nodeVar1321.x + nodeVar1321.y ) * nodeVar1321.z ) ), fract( ( ( nodeVar1323.x + nodeVar1323.y ) * nodeVar1323.z ) ), nodeVar1320.x ), mix( fract( ( ( nodeVar1325.x + nodeVar1325.y ) * nodeVar1325.z ) ), fract( ( ( nodeVar1327.x + nodeVar1327.y ) * nodeVar1327.z ) ), nodeVar1320.x ), nodeVar1320.y ) ) );
							nodeVar1307 = ( nodeVar1307 * vec2( 2.03 ) );
							nodeVar1309 = ( nodeVar1309 * 0.52 );
							nodeVar1328 = floor( nodeVar1307 );
							nodeVar1329 = fract( nodeVar1307 );
							nodeVar1329 = ( ( nodeVar1329 * nodeVar1329 ) * ( vec2( 3.0 ) - ( nodeVar1329 * vec2( 2.0 ) ) ) );
							nodeVar1330 = fract( ( vec3( nodeVar1328.x, nodeVar1328.y, nodeVar1328.x ) * vec3( 0.1031 ) ) );
							nodeVar1330 = ( nodeVar1330 + vec3( dot( nodeVar1330, ( nodeVar1330.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1331 = ( nodeVar1328 + vec2( 1.0, 0.0 ) );
							nodeVar1332 = fract( ( vec3( nodeVar1331.x, nodeVar1331.y, nodeVar1331.x ) * vec3( 0.1031 ) ) );
							nodeVar1332 = ( nodeVar1332 + vec3( dot( nodeVar1332, ( nodeVar1332.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1333 = ( nodeVar1328 + vec2( 0.0, 1.0 ) );
							nodeVar1334 = fract( ( vec3( nodeVar1333.x, nodeVar1333.y, nodeVar1333.x ) * vec3( 0.1031 ) ) );
							nodeVar1334 = ( nodeVar1334 + vec3( dot( nodeVar1334, ( nodeVar1334.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1335 = ( nodeVar1328 + vec2( 1.0, 1.0 ) );
							nodeVar1336 = fract( ( vec3( nodeVar1335.x, nodeVar1335.y, nodeVar1335.x ) * vec3( 0.1031 ) ) );
							nodeVar1336 = ( nodeVar1336 + vec3( dot( nodeVar1336, ( nodeVar1336.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1308 = ( nodeVar1308 + ( nodeVar1309 * mix( mix( fract( ( ( nodeVar1330.x + nodeVar1330.y ) * nodeVar1330.z ) ), fract( ( ( nodeVar1332.x + nodeVar1332.y ) * nodeVar1332.z ) ), nodeVar1329.x ), mix( fract( ( ( nodeVar1334.x + nodeVar1334.y ) * nodeVar1334.z ) ), fract( ( ( nodeVar1336.x + nodeVar1336.y ) * nodeVar1336.z ) ), nodeVar1329.x ), nodeVar1329.y ) ) );
							nodeVar1307 = ( nodeVar1307 * vec2( 2.03 ) );
							nodeVar1309 = ( nodeVar1309 * 0.52 );
							nodeVar1337 = floor( nodeVar1307 );
							nodeVar1338 = fract( nodeVar1307 );
							nodeVar1338 = ( ( nodeVar1338 * nodeVar1338 ) * ( vec2( 3.0 ) - ( nodeVar1338 * vec2( 2.0 ) ) ) );
							nodeVar1339 = fract( ( vec3( nodeVar1337.x, nodeVar1337.y, nodeVar1337.x ) * vec3( 0.1031 ) ) );
							nodeVar1339 = ( nodeVar1339 + vec3( dot( nodeVar1339, ( nodeVar1339.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1340 = ( nodeVar1337 + vec2( 1.0, 0.0 ) );
							nodeVar1341 = fract( ( vec3( nodeVar1340.x, nodeVar1340.y, nodeVar1340.x ) * vec3( 0.1031 ) ) );
							nodeVar1341 = ( nodeVar1341 + vec3( dot( nodeVar1341, ( nodeVar1341.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1342 = ( nodeVar1337 + vec2( 0.0, 1.0 ) );
							nodeVar1343 = fract( ( vec3( nodeVar1342.x, nodeVar1342.y, nodeVar1342.x ) * vec3( 0.1031 ) ) );
							nodeVar1343 = ( nodeVar1343 + vec3( dot( nodeVar1343, ( nodeVar1343.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1344 = ( nodeVar1337 + vec2( 1.0, 1.0 ) );
							nodeVar1345 = fract( ( vec3( nodeVar1344.x, nodeVar1344.y, nodeVar1344.x ) * vec3( 0.1031 ) ) );
							nodeVar1345 = ( nodeVar1345 + vec3( dot( nodeVar1345, ( nodeVar1345.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar1308 = ( nodeVar1308 + ( nodeVar1309 * mix( mix( fract( ( ( nodeVar1339.x + nodeVar1339.y ) * nodeVar1339.z ) ), fract( ( ( nodeVar1341.x + nodeVar1341.y ) * nodeVar1341.z ) ), nodeVar1338.x ), mix( fract( ( ( nodeVar1343.x + nodeVar1343.y ) * nodeVar1343.z ) ), fract( ( ( nodeVar1345.x + nodeVar1345.y ) * nodeVar1345.z ) ), nodeVar1338.x ), nodeVar1338.y ) ) );
							nodeVar1307 = ( nodeVar1307 * vec2( 2.03 ) );
							nodeVar1309 = ( nodeVar1309 * 0.52 );
							nodeVar1346 = ( ( nodeVar1269 * 0.6 ) + ( nodeVar1308 * 0.4 ) );
							nodeVar916 = vec3( ( nodeVar1346 * 0.6 ), ( 0.7 + ( nodeVar1346 * 0.3 ) ), nodeVar1346 );
							

						} else {


							if ( ( nodeVar915 < 6.5 ) ) {

								nodeVar1347 = vec2( ( nodeVar914.x * 90.0 ), ( nodeVar914.y * 4.0 ) );
								nodeVar1348 = 0.0;
								nodeVar1349 = 0.5;
								nodeVar1350 = floor( nodeVar1347 );
								nodeVar1351 = fract( nodeVar1347 );
								nodeVar1351 = ( ( nodeVar1351 * nodeVar1351 ) * ( vec2( 3.0 ) - ( nodeVar1351 * vec2( 2.0 ) ) ) );
								nodeVar1352 = fract( ( vec3( nodeVar1350.x, nodeVar1350.y, nodeVar1350.x ) * vec3( 0.1031 ) ) );
								nodeVar1352 = ( nodeVar1352 + vec3( dot( nodeVar1352, ( nodeVar1352.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1353 = ( nodeVar1350 + vec2( 1.0, 0.0 ) );
								nodeVar1354 = fract( ( vec3( nodeVar1353.x, nodeVar1353.y, nodeVar1353.x ) * vec3( 0.1031 ) ) );
								nodeVar1354 = ( nodeVar1354 + vec3( dot( nodeVar1354, ( nodeVar1354.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1355 = ( nodeVar1350 + vec2( 0.0, 1.0 ) );
								nodeVar1356 = fract( ( vec3( nodeVar1355.x, nodeVar1355.y, nodeVar1355.x ) * vec3( 0.1031 ) ) );
								nodeVar1356 = ( nodeVar1356 + vec3( dot( nodeVar1356, ( nodeVar1356.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1357 = ( nodeVar1350 + vec2( 1.0, 1.0 ) );
								nodeVar1358 = fract( ( vec3( nodeVar1357.x, nodeVar1357.y, nodeVar1357.x ) * vec3( 0.1031 ) ) );
								nodeVar1358 = ( nodeVar1358 + vec3( dot( nodeVar1358, ( nodeVar1358.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1348 = ( nodeVar1348 + ( nodeVar1349 * mix( mix( fract( ( ( nodeVar1352.x + nodeVar1352.y ) * nodeVar1352.z ) ), fract( ( ( nodeVar1354.x + nodeVar1354.y ) * nodeVar1354.z ) ), nodeVar1351.x ), mix( fract( ( ( nodeVar1356.x + nodeVar1356.y ) * nodeVar1356.z ) ), fract( ( ( nodeVar1358.x + nodeVar1358.y ) * nodeVar1358.z ) ), nodeVar1351.x ), nodeVar1351.y ) ) );
								nodeVar1347 = ( nodeVar1347 * vec2( 2.03 ) );
								nodeVar1349 = ( nodeVar1349 * 0.52 );
								nodeVar1359 = floor( nodeVar1347 );
								nodeVar1360 = fract( nodeVar1347 );
								nodeVar1360 = ( ( nodeVar1360 * nodeVar1360 ) * ( vec2( 3.0 ) - ( nodeVar1360 * vec2( 2.0 ) ) ) );
								nodeVar1361 = fract( ( vec3( nodeVar1359.x, nodeVar1359.y, nodeVar1359.x ) * vec3( 0.1031 ) ) );
								nodeVar1361 = ( nodeVar1361 + vec3( dot( nodeVar1361, ( nodeVar1361.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1362 = ( nodeVar1359 + vec2( 1.0, 0.0 ) );
								nodeVar1363 = fract( ( vec3( nodeVar1362.x, nodeVar1362.y, nodeVar1362.x ) * vec3( 0.1031 ) ) );
								nodeVar1363 = ( nodeVar1363 + vec3( dot( nodeVar1363, ( nodeVar1363.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1364 = ( nodeVar1359 + vec2( 0.0, 1.0 ) );
								nodeVar1365 = fract( ( vec3( nodeVar1364.x, nodeVar1364.y, nodeVar1364.x ) * vec3( 0.1031 ) ) );
								nodeVar1365 = ( nodeVar1365 + vec3( dot( nodeVar1365, ( nodeVar1365.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1366 = ( nodeVar1359 + vec2( 1.0, 1.0 ) );
								nodeVar1367 = fract( ( vec3( nodeVar1366.x, nodeVar1366.y, nodeVar1366.x ) * vec3( 0.1031 ) ) );
								nodeVar1367 = ( nodeVar1367 + vec3( dot( nodeVar1367, ( nodeVar1367.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1348 = ( nodeVar1348 + ( nodeVar1349 * mix( mix( fract( ( ( nodeVar1361.x + nodeVar1361.y ) * nodeVar1361.z ) ), fract( ( ( nodeVar1363.x + nodeVar1363.y ) * nodeVar1363.z ) ), nodeVar1360.x ), mix( fract( ( ( nodeVar1365.x + nodeVar1365.y ) * nodeVar1365.z ) ), fract( ( ( nodeVar1367.x + nodeVar1367.y ) * nodeVar1367.z ) ), nodeVar1360.x ), nodeVar1360.y ) ) );
								nodeVar1347 = ( nodeVar1347 * vec2( 2.03 ) );
								nodeVar1349 = ( nodeVar1349 * 0.52 );
								nodeVar1368 = floor( nodeVar1347 );
								nodeVar1369 = fract( nodeVar1347 );
								nodeVar1369 = ( ( nodeVar1369 * nodeVar1369 ) * ( vec2( 3.0 ) - ( nodeVar1369 * vec2( 2.0 ) ) ) );
								nodeVar1370 = fract( ( vec3( nodeVar1368.x, nodeVar1368.y, nodeVar1368.x ) * vec3( 0.1031 ) ) );
								nodeVar1370 = ( nodeVar1370 + vec3( dot( nodeVar1370, ( nodeVar1370.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1371 = ( nodeVar1368 + vec2( 1.0, 0.0 ) );
								nodeVar1372 = fract( ( vec3( nodeVar1371.x, nodeVar1371.y, nodeVar1371.x ) * vec3( 0.1031 ) ) );
								nodeVar1372 = ( nodeVar1372 + vec3( dot( nodeVar1372, ( nodeVar1372.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1373 = ( nodeVar1368 + vec2( 0.0, 1.0 ) );
								nodeVar1374 = fract( ( vec3( nodeVar1373.x, nodeVar1373.y, nodeVar1373.x ) * vec3( 0.1031 ) ) );
								nodeVar1374 = ( nodeVar1374 + vec3( dot( nodeVar1374, ( nodeVar1374.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1375 = ( nodeVar1368 + vec2( 1.0, 1.0 ) );
								nodeVar1376 = fract( ( vec3( nodeVar1375.x, nodeVar1375.y, nodeVar1375.x ) * vec3( 0.1031 ) ) );
								nodeVar1376 = ( nodeVar1376 + vec3( dot( nodeVar1376, ( nodeVar1376.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1348 = ( nodeVar1348 + ( nodeVar1349 * mix( mix( fract( ( ( nodeVar1370.x + nodeVar1370.y ) * nodeVar1370.z ) ), fract( ( ( nodeVar1372.x + nodeVar1372.y ) * nodeVar1372.z ) ), nodeVar1369.x ), mix( fract( ( ( nodeVar1374.x + nodeVar1374.y ) * nodeVar1374.z ) ), fract( ( ( nodeVar1376.x + nodeVar1376.y ) * nodeVar1376.z ) ), nodeVar1369.x ), nodeVar1369.y ) ) );
								nodeVar1347 = ( nodeVar1347 * vec2( 2.03 ) );
								nodeVar1349 = ( nodeVar1349 * 0.52 );
								nodeVar1377 = floor( nodeVar1347 );
								nodeVar1378 = fract( nodeVar1347 );
								nodeVar1378 = ( ( nodeVar1378 * nodeVar1378 ) * ( vec2( 3.0 ) - ( nodeVar1378 * vec2( 2.0 ) ) ) );
								nodeVar1379 = fract( ( vec3( nodeVar1377.x, nodeVar1377.y, nodeVar1377.x ) * vec3( 0.1031 ) ) );
								nodeVar1379 = ( nodeVar1379 + vec3( dot( nodeVar1379, ( nodeVar1379.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1380 = ( nodeVar1377 + vec2( 1.0, 0.0 ) );
								nodeVar1381 = fract( ( vec3( nodeVar1380.x, nodeVar1380.y, nodeVar1380.x ) * vec3( 0.1031 ) ) );
								nodeVar1381 = ( nodeVar1381 + vec3( dot( nodeVar1381, ( nodeVar1381.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1382 = ( nodeVar1377 + vec2( 0.0, 1.0 ) );
								nodeVar1383 = fract( ( vec3( nodeVar1382.x, nodeVar1382.y, nodeVar1382.x ) * vec3( 0.1031 ) ) );
								nodeVar1383 = ( nodeVar1383 + vec3( dot( nodeVar1383, ( nodeVar1383.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1384 = ( nodeVar1377 + vec2( 1.0, 1.0 ) );
								nodeVar1385 = fract( ( vec3( nodeVar1384.x, nodeVar1384.y, nodeVar1384.x ) * vec3( 0.1031 ) ) );
								nodeVar1385 = ( nodeVar1385 + vec3( dot( nodeVar1385, ( nodeVar1385.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar1348 = ( nodeVar1348 + ( nodeVar1349 * mix( mix( fract( ( ( nodeVar1379.x + nodeVar1379.y ) * nodeVar1379.z ) ), fract( ( ( nodeVar1381.x + nodeVar1381.y ) * nodeVar1381.z ) ), nodeVar1378.x ), mix( fract( ( ( nodeVar1383.x + nodeVar1383.y ) * nodeVar1383.z ) ), fract( ( ( nodeVar1385.x + nodeVar1385.y ) * nodeVar1385.z ) ), nodeVar1378.x ), nodeVar1378.y ) ) );
								nodeVar1347 = ( nodeVar1347 * vec2( 2.03 ) );
								nodeVar1349 = ( nodeVar1349 * 0.52 );
								nodeVar1386 = nodeVar1348;
								nodeVar916 = vec3( ( nodeVar1386 * 0.25 ), 1.0, nodeVar1386 );
								

							} else {


								if ( ( nodeVar915 < 7.5 ) ) {

									nodeVar1387 = ( nodeVar914 * vec2( 0.28 ) );
									nodeVar1388 = 0.0;
									nodeVar1389 = 0.5;
									nodeVar1390 = floor( nodeVar1387 );
									nodeVar1391 = fract( nodeVar1387 );
									nodeVar1391 = ( ( nodeVar1391 * nodeVar1391 ) * ( vec2( 3.0 ) - ( nodeVar1391 * vec2( 2.0 ) ) ) );
									nodeVar1392 = fract( ( vec3( nodeVar1390.x, nodeVar1390.y, nodeVar1390.x ) * vec3( 0.1031 ) ) );
									nodeVar1392 = ( nodeVar1392 + vec3( dot( nodeVar1392, ( nodeVar1392.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1393 = ( nodeVar1390 + vec2( 1.0, 0.0 ) );
									nodeVar1394 = fract( ( vec3( nodeVar1393.x, nodeVar1393.y, nodeVar1393.x ) * vec3( 0.1031 ) ) );
									nodeVar1394 = ( nodeVar1394 + vec3( dot( nodeVar1394, ( nodeVar1394.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1395 = ( nodeVar1390 + vec2( 0.0, 1.0 ) );
									nodeVar1396 = fract( ( vec3( nodeVar1395.x, nodeVar1395.y, nodeVar1395.x ) * vec3( 0.1031 ) ) );
									nodeVar1396 = ( nodeVar1396 + vec3( dot( nodeVar1396, ( nodeVar1396.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1397 = ( nodeVar1390 + vec2( 1.0, 1.0 ) );
									nodeVar1398 = fract( ( vec3( nodeVar1397.x, nodeVar1397.y, nodeVar1397.x ) * vec3( 0.1031 ) ) );
									nodeVar1398 = ( nodeVar1398 + vec3( dot( nodeVar1398, ( nodeVar1398.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1388 = ( nodeVar1388 + ( nodeVar1389 * mix( mix( fract( ( ( nodeVar1392.x + nodeVar1392.y ) * nodeVar1392.z ) ), fract( ( ( nodeVar1394.x + nodeVar1394.y ) * nodeVar1394.z ) ), nodeVar1391.x ), mix( fract( ( ( nodeVar1396.x + nodeVar1396.y ) * nodeVar1396.z ) ), fract( ( ( nodeVar1398.x + nodeVar1398.y ) * nodeVar1398.z ) ), nodeVar1391.x ), nodeVar1391.y ) ) );
									nodeVar1387 = ( nodeVar1387 * vec2( 2.11 ) );
									nodeVar1389 = ( nodeVar1389 * 0.5 );
									nodeVar1399 = floor( nodeVar1387 );
									nodeVar1400 = fract( nodeVar1387 );
									nodeVar1400 = ( ( nodeVar1400 * nodeVar1400 ) * ( vec2( 3.0 ) - ( nodeVar1400 * vec2( 2.0 ) ) ) );
									nodeVar1401 = fract( ( vec3( nodeVar1399.x, nodeVar1399.y, nodeVar1399.x ) * vec3( 0.1031 ) ) );
									nodeVar1401 = ( nodeVar1401 + vec3( dot( nodeVar1401, ( nodeVar1401.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1402 = ( nodeVar1399 + vec2( 1.0, 0.0 ) );
									nodeVar1403 = fract( ( vec3( nodeVar1402.x, nodeVar1402.y, nodeVar1402.x ) * vec3( 0.1031 ) ) );
									nodeVar1403 = ( nodeVar1403 + vec3( dot( nodeVar1403, ( nodeVar1403.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1404 = ( nodeVar1399 + vec2( 0.0, 1.0 ) );
									nodeVar1405 = fract( ( vec3( nodeVar1404.x, nodeVar1404.y, nodeVar1404.x ) * vec3( 0.1031 ) ) );
									nodeVar1405 = ( nodeVar1405 + vec3( dot( nodeVar1405, ( nodeVar1405.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1406 = ( nodeVar1399 + vec2( 1.0, 1.0 ) );
									nodeVar1407 = fract( ( vec3( nodeVar1406.x, nodeVar1406.y, nodeVar1406.x ) * vec3( 0.1031 ) ) );
									nodeVar1407 = ( nodeVar1407 + vec3( dot( nodeVar1407, ( nodeVar1407.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1388 = ( nodeVar1388 + ( nodeVar1389 * mix( mix( fract( ( ( nodeVar1401.x + nodeVar1401.y ) * nodeVar1401.z ) ), fract( ( ( nodeVar1403.x + nodeVar1403.y ) * nodeVar1403.z ) ), nodeVar1400.x ), mix( fract( ( ( nodeVar1405.x + nodeVar1405.y ) * nodeVar1405.z ) ), fract( ( ( nodeVar1407.x + nodeVar1407.y ) * nodeVar1407.z ) ), nodeVar1400.x ), nodeVar1400.y ) ) );
									nodeVar1387 = ( nodeVar1387 * vec2( 2.11 ) );
									nodeVar1389 = ( nodeVar1389 * 0.5 );
									nodeVar1408 = floor( nodeVar1387 );
									nodeVar1409 = fract( nodeVar1387 );
									nodeVar1409 = ( ( nodeVar1409 * nodeVar1409 ) * ( vec2( 3.0 ) - ( nodeVar1409 * vec2( 2.0 ) ) ) );
									nodeVar1410 = fract( ( vec3( nodeVar1408.x, nodeVar1408.y, nodeVar1408.x ) * vec3( 0.1031 ) ) );
									nodeVar1410 = ( nodeVar1410 + vec3( dot( nodeVar1410, ( nodeVar1410.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1411 = ( nodeVar1408 + vec2( 1.0, 0.0 ) );
									nodeVar1412 = fract( ( vec3( nodeVar1411.x, nodeVar1411.y, nodeVar1411.x ) * vec3( 0.1031 ) ) );
									nodeVar1412 = ( nodeVar1412 + vec3( dot( nodeVar1412, ( nodeVar1412.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1413 = ( nodeVar1408 + vec2( 0.0, 1.0 ) );
									nodeVar1414 = fract( ( vec3( nodeVar1413.x, nodeVar1413.y, nodeVar1413.x ) * vec3( 0.1031 ) ) );
									nodeVar1414 = ( nodeVar1414 + vec3( dot( nodeVar1414, ( nodeVar1414.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1415 = ( nodeVar1408 + vec2( 1.0, 1.0 ) );
									nodeVar1416 = fract( ( vec3( nodeVar1415.x, nodeVar1415.y, nodeVar1415.x ) * vec3( 0.1031 ) ) );
									nodeVar1416 = ( nodeVar1416 + vec3( dot( nodeVar1416, ( nodeVar1416.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1388 = ( nodeVar1388 + ( nodeVar1389 * mix( mix( fract( ( ( nodeVar1410.x + nodeVar1410.y ) * nodeVar1410.z ) ), fract( ( ( nodeVar1412.x + nodeVar1412.y ) * nodeVar1412.z ) ), nodeVar1409.x ), mix( fract( ( ( nodeVar1414.x + nodeVar1414.y ) * nodeVar1414.z ) ), fract( ( ( nodeVar1416.x + nodeVar1416.y ) * nodeVar1416.z ) ), nodeVar1409.x ), nodeVar1409.y ) ) );
									nodeVar1387 = ( nodeVar1387 * vec2( 2.11 ) );
									nodeVar1389 = ( nodeVar1389 * 0.5 );
									nodeVar1417 = ( ( nodeVar914 * vec2( 0.28 ) ) + vec2( 19.0 ) );
									nodeVar1418 = 0.0;
									nodeVar1419 = 0.5;
									nodeVar1420 = floor( nodeVar1417 );
									nodeVar1421 = fract( nodeVar1417 );
									nodeVar1421 = ( ( nodeVar1421 * nodeVar1421 ) * ( vec2( 3.0 ) - ( nodeVar1421 * vec2( 2.0 ) ) ) );
									nodeVar1422 = fract( ( vec3( nodeVar1420.x, nodeVar1420.y, nodeVar1420.x ) * vec3( 0.1031 ) ) );
									nodeVar1422 = ( nodeVar1422 + vec3( dot( nodeVar1422, ( nodeVar1422.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1423 = ( nodeVar1420 + vec2( 1.0, 0.0 ) );
									nodeVar1424 = fract( ( vec3( nodeVar1423.x, nodeVar1423.y, nodeVar1423.x ) * vec3( 0.1031 ) ) );
									nodeVar1424 = ( nodeVar1424 + vec3( dot( nodeVar1424, ( nodeVar1424.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1425 = ( nodeVar1420 + vec2( 0.0, 1.0 ) );
									nodeVar1426 = fract( ( vec3( nodeVar1425.x, nodeVar1425.y, nodeVar1425.x ) * vec3( 0.1031 ) ) );
									nodeVar1426 = ( nodeVar1426 + vec3( dot( nodeVar1426, ( nodeVar1426.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1427 = ( nodeVar1420 + vec2( 1.0, 1.0 ) );
									nodeVar1428 = fract( ( vec3( nodeVar1427.x, nodeVar1427.y, nodeVar1427.x ) * vec3( 0.1031 ) ) );
									nodeVar1428 = ( nodeVar1428 + vec3( dot( nodeVar1428, ( nodeVar1428.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1418 = ( nodeVar1418 + ( nodeVar1419 * mix( mix( fract( ( ( nodeVar1422.x + nodeVar1422.y ) * nodeVar1422.z ) ), fract( ( ( nodeVar1424.x + nodeVar1424.y ) * nodeVar1424.z ) ), nodeVar1421.x ), mix( fract( ( ( nodeVar1426.x + nodeVar1426.y ) * nodeVar1426.z ) ), fract( ( ( nodeVar1428.x + nodeVar1428.y ) * nodeVar1428.z ) ), nodeVar1421.x ), nodeVar1421.y ) ) );
									nodeVar1417 = ( nodeVar1417 * vec2( 2.11 ) );
									nodeVar1419 = ( nodeVar1419 * 0.5 );
									nodeVar1429 = floor( nodeVar1417 );
									nodeVar1430 = fract( nodeVar1417 );
									nodeVar1430 = ( ( nodeVar1430 * nodeVar1430 ) * ( vec2( 3.0 ) - ( nodeVar1430 * vec2( 2.0 ) ) ) );
									nodeVar1431 = fract( ( vec3( nodeVar1429.x, nodeVar1429.y, nodeVar1429.x ) * vec3( 0.1031 ) ) );
									nodeVar1431 = ( nodeVar1431 + vec3( dot( nodeVar1431, ( nodeVar1431.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1432 = ( nodeVar1429 + vec2( 1.0, 0.0 ) );
									nodeVar1433 = fract( ( vec3( nodeVar1432.x, nodeVar1432.y, nodeVar1432.x ) * vec3( 0.1031 ) ) );
									nodeVar1433 = ( nodeVar1433 + vec3( dot( nodeVar1433, ( nodeVar1433.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1434 = ( nodeVar1429 + vec2( 0.0, 1.0 ) );
									nodeVar1435 = fract( ( vec3( nodeVar1434.x, nodeVar1434.y, nodeVar1434.x ) * vec3( 0.1031 ) ) );
									nodeVar1435 = ( nodeVar1435 + vec3( dot( nodeVar1435, ( nodeVar1435.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1436 = ( nodeVar1429 + vec2( 1.0, 1.0 ) );
									nodeVar1437 = fract( ( vec3( nodeVar1436.x, nodeVar1436.y, nodeVar1436.x ) * vec3( 0.1031 ) ) );
									nodeVar1437 = ( nodeVar1437 + vec3( dot( nodeVar1437, ( nodeVar1437.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1418 = ( nodeVar1418 + ( nodeVar1419 * mix( mix( fract( ( ( nodeVar1431.x + nodeVar1431.y ) * nodeVar1431.z ) ), fract( ( ( nodeVar1433.x + nodeVar1433.y ) * nodeVar1433.z ) ), nodeVar1430.x ), mix( fract( ( ( nodeVar1435.x + nodeVar1435.y ) * nodeVar1435.z ) ), fract( ( ( nodeVar1437.x + nodeVar1437.y ) * nodeVar1437.z ) ), nodeVar1430.x ), nodeVar1430.y ) ) );
									nodeVar1417 = ( nodeVar1417 * vec2( 2.11 ) );
									nodeVar1419 = ( nodeVar1419 * 0.5 );
									nodeVar1438 = floor( nodeVar1417 );
									nodeVar1439 = fract( nodeVar1417 );
									nodeVar1439 = ( ( nodeVar1439 * nodeVar1439 ) * ( vec2( 3.0 ) - ( nodeVar1439 * vec2( 2.0 ) ) ) );
									nodeVar1440 = fract( ( vec3( nodeVar1438.x, nodeVar1438.y, nodeVar1438.x ) * vec3( 0.1031 ) ) );
									nodeVar1440 = ( nodeVar1440 + vec3( dot( nodeVar1440, ( nodeVar1440.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1441 = ( nodeVar1438 + vec2( 1.0, 0.0 ) );
									nodeVar1442 = fract( ( vec3( nodeVar1441.x, nodeVar1441.y, nodeVar1441.x ) * vec3( 0.1031 ) ) );
									nodeVar1442 = ( nodeVar1442 + vec3( dot( nodeVar1442, ( nodeVar1442.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1443 = ( nodeVar1438 + vec2( 0.0, 1.0 ) );
									nodeVar1444 = fract( ( vec3( nodeVar1443.x, nodeVar1443.y, nodeVar1443.x ) * vec3( 0.1031 ) ) );
									nodeVar1444 = ( nodeVar1444 + vec3( dot( nodeVar1444, ( nodeVar1444.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1445 = ( nodeVar1438 + vec2( 1.0, 1.0 ) );
									nodeVar1446 = fract( ( vec3( nodeVar1445.x, nodeVar1445.y, nodeVar1445.x ) * vec3( 0.1031 ) ) );
									nodeVar1446 = ( nodeVar1446 + vec3( dot( nodeVar1446, ( nodeVar1446.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1418 = ( nodeVar1418 + ( nodeVar1419 * mix( mix( fract( ( ( nodeVar1440.x + nodeVar1440.y ) * nodeVar1440.z ) ), fract( ( ( nodeVar1442.x + nodeVar1442.y ) * nodeVar1442.z ) ), nodeVar1439.x ), mix( fract( ( ( nodeVar1444.x + nodeVar1444.y ) * nodeVar1444.z ) ), fract( ( ( nodeVar1446.x + nodeVar1446.y ) * nodeVar1446.z ) ), nodeVar1439.x ), nodeVar1439.y ) ) );
									nodeVar1417 = ( nodeVar1417 * vec2( 2.11 ) );
									nodeVar1419 = ( nodeVar1419 * 0.5 );
									nodeVar1447 = ( vec2( nodeVar1388, nodeVar1418 ) - vec2( 0.5 ) );
									nodeVar1448 = ( ( nodeVar914 * vec2( 4.05 ) ) + ( nodeVar1447 * vec2( 0.85 ) ) );
									nodeVar1449 = floor( nodeVar1448 );
									nodeVar1450 = fract( nodeVar1448 );
									nodeVar1451 = 9.0;
									nodeVar1452 = 9.0;
									nodeVar1453 = vec2( 0.0, 0.0 );
									nodeVar1454 = ( nodeVar1449 + vec2( -1.0, -1.0 ) );
									nodeVar1455 = fract( ( vec3( nodeVar1454.x, nodeVar1454.y, nodeVar1454.x ) * vec3( 0.1031 ) ) );
									nodeVar1455 = ( nodeVar1455 + vec3( dot( nodeVar1455, ( nodeVar1455.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1456 = ( ( nodeVar1449 + vec2( -1.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar1457 = fract( ( vec3( nodeVar1456.x, nodeVar1456.y, nodeVar1456.x ) * vec3( 0.1031 ) ) );
									nodeVar1457 = ( nodeVar1457 + vec3( dot( nodeVar1457, ( nodeVar1457.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1458 = length( ( ( vec2( -1.0, -1.0 ) + vec2( fract( ( ( nodeVar1455.x + nodeVar1455.y ) * nodeVar1455.z ) ), fract( ( ( nodeVar1457.x + nodeVar1457.y ) * nodeVar1457.z ) ) ) ) - nodeVar1450 ) );

									if ( ( nodeVar1458 < nodeVar1451 ) ) {

										nodeVar1452 = nodeVar1451;
										nodeVar1451 = nodeVar1458;
										nodeVar1453 = ( nodeVar1449 + vec2( -1.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar1458 < nodeVar1452 ) ) {

											nodeVar1452 = nodeVar1458;
											

										}

										

									}

									nodeVar1459 = ( nodeVar1449 + vec2( 0.0, -1.0 ) );
									nodeVar1460 = fract( ( vec3( nodeVar1459.x, nodeVar1459.y, nodeVar1459.x ) * vec3( 0.1031 ) ) );
									nodeVar1460 = ( nodeVar1460 + vec3( dot( nodeVar1460, ( nodeVar1460.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1461 = ( ( nodeVar1449 + vec2( 0.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar1462 = fract( ( vec3( nodeVar1461.x, nodeVar1461.y, nodeVar1461.x ) * vec3( 0.1031 ) ) );
									nodeVar1462 = ( nodeVar1462 + vec3( dot( nodeVar1462, ( nodeVar1462.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1463 = length( ( ( vec2( 0.0, -1.0 ) + vec2( fract( ( ( nodeVar1460.x + nodeVar1460.y ) * nodeVar1460.z ) ), fract( ( ( nodeVar1462.x + nodeVar1462.y ) * nodeVar1462.z ) ) ) ) - nodeVar1450 ) );

									if ( ( nodeVar1463 < nodeVar1451 ) ) {

										nodeVar1452 = nodeVar1451;
										nodeVar1451 = nodeVar1463;
										nodeVar1453 = ( nodeVar1449 + vec2( 0.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar1463 < nodeVar1452 ) ) {

											nodeVar1452 = nodeVar1463;
											

										}

										

									}

									nodeVar1464 = ( nodeVar1449 + vec2( 1.0, -1.0 ) );
									nodeVar1465 = fract( ( vec3( nodeVar1464.x, nodeVar1464.y, nodeVar1464.x ) * vec3( 0.1031 ) ) );
									nodeVar1465 = ( nodeVar1465 + vec3( dot( nodeVar1465, ( nodeVar1465.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1466 = ( ( nodeVar1449 + vec2( 1.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar1467 = fract( ( vec3( nodeVar1466.x, nodeVar1466.y, nodeVar1466.x ) * vec3( 0.1031 ) ) );
									nodeVar1467 = ( nodeVar1467 + vec3( dot( nodeVar1467, ( nodeVar1467.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1468 = length( ( ( vec2( 1.0, -1.0 ) + vec2( fract( ( ( nodeVar1465.x + nodeVar1465.y ) * nodeVar1465.z ) ), fract( ( ( nodeVar1467.x + nodeVar1467.y ) * nodeVar1467.z ) ) ) ) - nodeVar1450 ) );

									if ( ( nodeVar1468 < nodeVar1451 ) ) {

										nodeVar1452 = nodeVar1451;
										nodeVar1451 = nodeVar1468;
										nodeVar1453 = ( nodeVar1449 + vec2( 1.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar1468 < nodeVar1452 ) ) {

											nodeVar1452 = nodeVar1468;
											

										}

										

									}

									nodeVar1469 = ( nodeVar1449 + vec2( -1.0, 0.0 ) );
									nodeVar1470 = fract( ( vec3( nodeVar1469.x, nodeVar1469.y, nodeVar1469.x ) * vec3( 0.1031 ) ) );
									nodeVar1470 = ( nodeVar1470 + vec3( dot( nodeVar1470, ( nodeVar1470.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1471 = ( ( nodeVar1449 + vec2( -1.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar1472 = fract( ( vec3( nodeVar1471.x, nodeVar1471.y, nodeVar1471.x ) * vec3( 0.1031 ) ) );
									nodeVar1472 = ( nodeVar1472 + vec3( dot( nodeVar1472, ( nodeVar1472.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1473 = length( ( ( vec2( -1.0, 0.0 ) + vec2( fract( ( ( nodeVar1470.x + nodeVar1470.y ) * nodeVar1470.z ) ), fract( ( ( nodeVar1472.x + nodeVar1472.y ) * nodeVar1472.z ) ) ) ) - nodeVar1450 ) );

									if ( ( nodeVar1473 < nodeVar1451 ) ) {

										nodeVar1452 = nodeVar1451;
										nodeVar1451 = nodeVar1473;
										nodeVar1453 = ( nodeVar1449 + vec2( -1.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar1473 < nodeVar1452 ) ) {

											nodeVar1452 = nodeVar1473;
											

										}

										

									}

									nodeVar1474 = ( nodeVar1449 + vec2( 0.0, 0.0 ) );
									nodeVar1475 = fract( ( vec3( nodeVar1474.x, nodeVar1474.y, nodeVar1474.x ) * vec3( 0.1031 ) ) );
									nodeVar1475 = ( nodeVar1475 + vec3( dot( nodeVar1475, ( nodeVar1475.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1476 = ( ( nodeVar1449 + vec2( 0.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar1477 = fract( ( vec3( nodeVar1476.x, nodeVar1476.y, nodeVar1476.x ) * vec3( 0.1031 ) ) );
									nodeVar1477 = ( nodeVar1477 + vec3( dot( nodeVar1477, ( nodeVar1477.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1478 = length( ( ( vec2( 0.0, 0.0 ) + vec2( fract( ( ( nodeVar1475.x + nodeVar1475.y ) * nodeVar1475.z ) ), fract( ( ( nodeVar1477.x + nodeVar1477.y ) * nodeVar1477.z ) ) ) ) - nodeVar1450 ) );

									if ( ( nodeVar1478 < nodeVar1451 ) ) {

										nodeVar1452 = nodeVar1451;
										nodeVar1451 = nodeVar1478;
										nodeVar1453 = ( nodeVar1449 + vec2( 0.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar1478 < nodeVar1452 ) ) {

											nodeVar1452 = nodeVar1478;
											

										}

										

									}

									nodeVar1479 = ( nodeVar1449 + vec2( 1.0, 0.0 ) );
									nodeVar1480 = fract( ( vec3( nodeVar1479.x, nodeVar1479.y, nodeVar1479.x ) * vec3( 0.1031 ) ) );
									nodeVar1480 = ( nodeVar1480 + vec3( dot( nodeVar1480, ( nodeVar1480.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1481 = ( ( nodeVar1449 + vec2( 1.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar1482 = fract( ( vec3( nodeVar1481.x, nodeVar1481.y, nodeVar1481.x ) * vec3( 0.1031 ) ) );
									nodeVar1482 = ( nodeVar1482 + vec3( dot( nodeVar1482, ( nodeVar1482.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1483 = length( ( ( vec2( 1.0, 0.0 ) + vec2( fract( ( ( nodeVar1480.x + nodeVar1480.y ) * nodeVar1480.z ) ), fract( ( ( nodeVar1482.x + nodeVar1482.y ) * nodeVar1482.z ) ) ) ) - nodeVar1450 ) );

									if ( ( nodeVar1483 < nodeVar1451 ) ) {

										nodeVar1452 = nodeVar1451;
										nodeVar1451 = nodeVar1483;
										nodeVar1453 = ( nodeVar1449 + vec2( 1.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar1483 < nodeVar1452 ) ) {

											nodeVar1452 = nodeVar1483;
											

										}

										

									}

									nodeVar1484 = ( nodeVar1449 + vec2( -1.0, 1.0 ) );
									nodeVar1485 = fract( ( vec3( nodeVar1484.x, nodeVar1484.y, nodeVar1484.x ) * vec3( 0.1031 ) ) );
									nodeVar1485 = ( nodeVar1485 + vec3( dot( nodeVar1485, ( nodeVar1485.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1486 = ( ( nodeVar1449 + vec2( -1.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar1487 = fract( ( vec3( nodeVar1486.x, nodeVar1486.y, nodeVar1486.x ) * vec3( 0.1031 ) ) );
									nodeVar1487 = ( nodeVar1487 + vec3( dot( nodeVar1487, ( nodeVar1487.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1488 = length( ( ( vec2( -1.0, 1.0 ) + vec2( fract( ( ( nodeVar1485.x + nodeVar1485.y ) * nodeVar1485.z ) ), fract( ( ( nodeVar1487.x + nodeVar1487.y ) * nodeVar1487.z ) ) ) ) - nodeVar1450 ) );

									if ( ( nodeVar1488 < nodeVar1451 ) ) {

										nodeVar1452 = nodeVar1451;
										nodeVar1451 = nodeVar1488;
										nodeVar1453 = ( nodeVar1449 + vec2( -1.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar1488 < nodeVar1452 ) ) {

											nodeVar1452 = nodeVar1488;
											

										}

										

									}

									nodeVar1489 = ( nodeVar1449 + vec2( 0.0, 1.0 ) );
									nodeVar1490 = fract( ( vec3( nodeVar1489.x, nodeVar1489.y, nodeVar1489.x ) * vec3( 0.1031 ) ) );
									nodeVar1490 = ( nodeVar1490 + vec3( dot( nodeVar1490, ( nodeVar1490.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1491 = ( ( nodeVar1449 + vec2( 0.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar1492 = fract( ( vec3( nodeVar1491.x, nodeVar1491.y, nodeVar1491.x ) * vec3( 0.1031 ) ) );
									nodeVar1492 = ( nodeVar1492 + vec3( dot( nodeVar1492, ( nodeVar1492.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1493 = length( ( ( vec2( 0.0, 1.0 ) + vec2( fract( ( ( nodeVar1490.x + nodeVar1490.y ) * nodeVar1490.z ) ), fract( ( ( nodeVar1492.x + nodeVar1492.y ) * nodeVar1492.z ) ) ) ) - nodeVar1450 ) );

									if ( ( nodeVar1493 < nodeVar1451 ) ) {

										nodeVar1452 = nodeVar1451;
										nodeVar1451 = nodeVar1493;
										nodeVar1453 = ( nodeVar1449 + vec2( 0.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar1493 < nodeVar1452 ) ) {

											nodeVar1452 = nodeVar1493;
											

										}

										

									}

									nodeVar1494 = ( nodeVar1449 + vec2( 1.0, 1.0 ) );
									nodeVar1495 = fract( ( vec3( nodeVar1494.x, nodeVar1494.y, nodeVar1494.x ) * vec3( 0.1031 ) ) );
									nodeVar1495 = ( nodeVar1495 + vec3( dot( nodeVar1495, ( nodeVar1495.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1496 = ( ( nodeVar1449 + vec2( 1.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar1497 = fract( ( vec3( nodeVar1496.x, nodeVar1496.y, nodeVar1496.x ) * vec3( 0.1031 ) ) );
									nodeVar1497 = ( nodeVar1497 + vec3( dot( nodeVar1497, ( nodeVar1497.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1498 = length( ( ( vec2( 1.0, 1.0 ) + vec2( fract( ( ( nodeVar1495.x + nodeVar1495.y ) * nodeVar1495.z ) ), fract( ( ( nodeVar1497.x + nodeVar1497.y ) * nodeVar1497.z ) ) ) ) - nodeVar1450 ) );

									if ( ( nodeVar1498 < nodeVar1451 ) ) {

										nodeVar1452 = nodeVar1451;
										nodeVar1451 = nodeVar1498;
										nodeVar1453 = ( nodeVar1449 + vec2( 1.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar1498 < nodeVar1452 ) ) {

											nodeVar1452 = nodeVar1498;
											

										}

										

									}

									nodeVar1499 = smoothstep( 0.0, 0.038, ( nodeVar1452 - nodeVar1451 ) );
									nodeVar1500 = ( nodeVar1453 * vec2( 1.13 ) );
									nodeVar1501 = fract( ( vec3( nodeVar1500.x, nodeVar1500.y, nodeVar1500.x ) * vec3( 0.1031 ) ) );
									nodeVar1501 = ( nodeVar1501 + vec3( dot( nodeVar1501, ( nodeVar1501.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1502 = fract( ( ( nodeVar1501.x + nodeVar1501.y ) * nodeVar1501.z ) );
									nodeVar1503 = ( nodeVar914 * vec2( 9.0 ) );
									nodeVar1504 = 0.0;
									nodeVar1505 = 0.5;
									nodeVar1506 = floor( nodeVar1503 );
									nodeVar1507 = fract( nodeVar1503 );
									nodeVar1507 = ( ( nodeVar1507 * nodeVar1507 ) * ( vec2( 3.0 ) - ( nodeVar1507 * vec2( 2.0 ) ) ) );
									nodeVar1508 = fract( ( vec3( nodeVar1506.x, nodeVar1506.y, nodeVar1506.x ) * vec3( 0.1031 ) ) );
									nodeVar1508 = ( nodeVar1508 + vec3( dot( nodeVar1508, ( nodeVar1508.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1509 = ( nodeVar1506 + vec2( 1.0, 0.0 ) );
									nodeVar1510 = fract( ( vec3( nodeVar1509.x, nodeVar1509.y, nodeVar1509.x ) * vec3( 0.1031 ) ) );
									nodeVar1510 = ( nodeVar1510 + vec3( dot( nodeVar1510, ( nodeVar1510.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1511 = ( nodeVar1506 + vec2( 0.0, 1.0 ) );
									nodeVar1512 = fract( ( vec3( nodeVar1511.x, nodeVar1511.y, nodeVar1511.x ) * vec3( 0.1031 ) ) );
									nodeVar1512 = ( nodeVar1512 + vec3( dot( nodeVar1512, ( nodeVar1512.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1513 = ( nodeVar1506 + vec2( 1.0, 1.0 ) );
									nodeVar1514 = fract( ( vec3( nodeVar1513.x, nodeVar1513.y, nodeVar1513.x ) * vec3( 0.1031 ) ) );
									nodeVar1514 = ( nodeVar1514 + vec3( dot( nodeVar1514, ( nodeVar1514.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1504 = ( nodeVar1504 + ( nodeVar1505 * mix( mix( fract( ( ( nodeVar1508.x + nodeVar1508.y ) * nodeVar1508.z ) ), fract( ( ( nodeVar1510.x + nodeVar1510.y ) * nodeVar1510.z ) ), nodeVar1507.x ), mix( fract( ( ( nodeVar1512.x + nodeVar1512.y ) * nodeVar1512.z ) ), fract( ( ( nodeVar1514.x + nodeVar1514.y ) * nodeVar1514.z ) ), nodeVar1507.x ), nodeVar1507.y ) ) );
									nodeVar1503 = ( nodeVar1503 * vec2( 2.03 ) );
									nodeVar1505 = ( nodeVar1505 * 0.52 );
									nodeVar1515 = floor( nodeVar1503 );
									nodeVar1516 = fract( nodeVar1503 );
									nodeVar1516 = ( ( nodeVar1516 * nodeVar1516 ) * ( vec2( 3.0 ) - ( nodeVar1516 * vec2( 2.0 ) ) ) );
									nodeVar1517 = fract( ( vec3( nodeVar1515.x, nodeVar1515.y, nodeVar1515.x ) * vec3( 0.1031 ) ) );
									nodeVar1517 = ( nodeVar1517 + vec3( dot( nodeVar1517, ( nodeVar1517.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1518 = ( nodeVar1515 + vec2( 1.0, 0.0 ) );
									nodeVar1519 = fract( ( vec3( nodeVar1518.x, nodeVar1518.y, nodeVar1518.x ) * vec3( 0.1031 ) ) );
									nodeVar1519 = ( nodeVar1519 + vec3( dot( nodeVar1519, ( nodeVar1519.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1520 = ( nodeVar1515 + vec2( 0.0, 1.0 ) );
									nodeVar1521 = fract( ( vec3( nodeVar1520.x, nodeVar1520.y, nodeVar1520.x ) * vec3( 0.1031 ) ) );
									nodeVar1521 = ( nodeVar1521 + vec3( dot( nodeVar1521, ( nodeVar1521.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1522 = ( nodeVar1515 + vec2( 1.0, 1.0 ) );
									nodeVar1523 = fract( ( vec3( nodeVar1522.x, nodeVar1522.y, nodeVar1522.x ) * vec3( 0.1031 ) ) );
									nodeVar1523 = ( nodeVar1523 + vec3( dot( nodeVar1523, ( nodeVar1523.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1504 = ( nodeVar1504 + ( nodeVar1505 * mix( mix( fract( ( ( nodeVar1517.x + nodeVar1517.y ) * nodeVar1517.z ) ), fract( ( ( nodeVar1519.x + nodeVar1519.y ) * nodeVar1519.z ) ), nodeVar1516.x ), mix( fract( ( ( nodeVar1521.x + nodeVar1521.y ) * nodeVar1521.z ) ), fract( ( ( nodeVar1523.x + nodeVar1523.y ) * nodeVar1523.z ) ), nodeVar1516.x ), nodeVar1516.y ) ) );
									nodeVar1503 = ( nodeVar1503 * vec2( 2.03 ) );
									nodeVar1505 = ( nodeVar1505 * 0.52 );
									nodeVar1524 = floor( nodeVar1503 );
									nodeVar1525 = fract( nodeVar1503 );
									nodeVar1525 = ( ( nodeVar1525 * nodeVar1525 ) * ( vec2( 3.0 ) - ( nodeVar1525 * vec2( 2.0 ) ) ) );
									nodeVar1526 = fract( ( vec3( nodeVar1524.x, nodeVar1524.y, nodeVar1524.x ) * vec3( 0.1031 ) ) );
									nodeVar1526 = ( nodeVar1526 + vec3( dot( nodeVar1526, ( nodeVar1526.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1527 = ( nodeVar1524 + vec2( 1.0, 0.0 ) );
									nodeVar1528 = fract( ( vec3( nodeVar1527.x, nodeVar1527.y, nodeVar1527.x ) * vec3( 0.1031 ) ) );
									nodeVar1528 = ( nodeVar1528 + vec3( dot( nodeVar1528, ( nodeVar1528.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1529 = ( nodeVar1524 + vec2( 0.0, 1.0 ) );
									nodeVar1530 = fract( ( vec3( nodeVar1529.x, nodeVar1529.y, nodeVar1529.x ) * vec3( 0.1031 ) ) );
									nodeVar1530 = ( nodeVar1530 + vec3( dot( nodeVar1530, ( nodeVar1530.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1531 = ( nodeVar1524 + vec2( 1.0, 1.0 ) );
									nodeVar1532 = fract( ( vec3( nodeVar1531.x, nodeVar1531.y, nodeVar1531.x ) * vec3( 0.1031 ) ) );
									nodeVar1532 = ( nodeVar1532 + vec3( dot( nodeVar1532, ( nodeVar1532.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1504 = ( nodeVar1504 + ( nodeVar1505 * mix( mix( fract( ( ( nodeVar1526.x + nodeVar1526.y ) * nodeVar1526.z ) ), fract( ( ( nodeVar1528.x + nodeVar1528.y ) * nodeVar1528.z ) ), nodeVar1525.x ), mix( fract( ( ( nodeVar1530.x + nodeVar1530.y ) * nodeVar1530.z ) ), fract( ( ( nodeVar1532.x + nodeVar1532.y ) * nodeVar1532.z ) ), nodeVar1525.x ), nodeVar1525.y ) ) );
									nodeVar1503 = ( nodeVar1503 * vec2( 2.03 ) );
									nodeVar1505 = ( nodeVar1505 * 0.52 );
									nodeVar1533 = floor( nodeVar1503 );
									nodeVar1534 = fract( nodeVar1503 );
									nodeVar1534 = ( ( nodeVar1534 * nodeVar1534 ) * ( vec2( 3.0 ) - ( nodeVar1534 * vec2( 2.0 ) ) ) );
									nodeVar1535 = fract( ( vec3( nodeVar1533.x, nodeVar1533.y, nodeVar1533.x ) * vec3( 0.1031 ) ) );
									nodeVar1535 = ( nodeVar1535 + vec3( dot( nodeVar1535, ( nodeVar1535.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1536 = ( nodeVar1533 + vec2( 1.0, 0.0 ) );
									nodeVar1537 = fract( ( vec3( nodeVar1536.x, nodeVar1536.y, nodeVar1536.x ) * vec3( 0.1031 ) ) );
									nodeVar1537 = ( nodeVar1537 + vec3( dot( nodeVar1537, ( nodeVar1537.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1538 = ( nodeVar1533 + vec2( 0.0, 1.0 ) );
									nodeVar1539 = fract( ( vec3( nodeVar1538.x, nodeVar1538.y, nodeVar1538.x ) * vec3( 0.1031 ) ) );
									nodeVar1539 = ( nodeVar1539 + vec3( dot( nodeVar1539, ( nodeVar1539.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1540 = ( nodeVar1533 + vec2( 1.0, 1.0 ) );
									nodeVar1541 = fract( ( vec3( nodeVar1540.x, nodeVar1540.y, nodeVar1540.x ) * vec3( 0.1031 ) ) );
									nodeVar1541 = ( nodeVar1541 + vec3( dot( nodeVar1541, ( nodeVar1541.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar1504 = ( nodeVar1504 + ( nodeVar1505 * mix( mix( fract( ( ( nodeVar1535.x + nodeVar1535.y ) * nodeVar1535.z ) ), fract( ( ( nodeVar1537.x + nodeVar1537.y ) * nodeVar1537.z ) ), nodeVar1534.x ), mix( fract( ( ( nodeVar1539.x + nodeVar1539.y ) * nodeVar1539.z ) ), fract( ( ( nodeVar1541.x + nodeVar1541.y ) * nodeVar1541.z ) ), nodeVar1534.x ), nodeVar1534.y ) ) );
									nodeVar1503 = ( nodeVar1503 * vec2( 2.03 ) );
									nodeVar1505 = ( nodeVar1505 * 0.52 );
									nodeVar916 = vec3( ( ( ( nodeVar1499 * ( 0.5 + ( nodeVar1502 * 0.5 ) ) ) * 0.5 ) + ( ( nodeVar1499 * 0.22 ) * nodeVar1504 ) ), nodeVar1499, nodeVar1502 );
									

								} else {


									if ( ( nodeVar915 < 8.5 ) ) {

										nodeVar1542 = ( nodeVar914 * vec2( 0.9 ) );
										nodeVar1543 = 0.0;
										nodeVar1544 = 0.5;
										nodeVar1545 = floor( nodeVar1542 );
										nodeVar1546 = fract( nodeVar1542 );
										nodeVar1546 = ( ( nodeVar1546 * nodeVar1546 ) * ( vec2( 3.0 ) - ( nodeVar1546 * vec2( 2.0 ) ) ) );
										nodeVar1547 = fract( ( vec3( nodeVar1545.x, nodeVar1545.y, nodeVar1545.x ) * vec3( 0.1031 ) ) );
										nodeVar1547 = ( nodeVar1547 + vec3( dot( nodeVar1547, ( nodeVar1547.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1548 = ( nodeVar1545 + vec2( 1.0, 0.0 ) );
										nodeVar1549 = fract( ( vec3( nodeVar1548.x, nodeVar1548.y, nodeVar1548.x ) * vec3( 0.1031 ) ) );
										nodeVar1549 = ( nodeVar1549 + vec3( dot( nodeVar1549, ( nodeVar1549.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1550 = ( nodeVar1545 + vec2( 0.0, 1.0 ) );
										nodeVar1551 = fract( ( vec3( nodeVar1550.x, nodeVar1550.y, nodeVar1550.x ) * vec3( 0.1031 ) ) );
										nodeVar1551 = ( nodeVar1551 + vec3( dot( nodeVar1551, ( nodeVar1551.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1552 = ( nodeVar1545 + vec2( 1.0, 1.0 ) );
										nodeVar1553 = fract( ( vec3( nodeVar1552.x, nodeVar1552.y, nodeVar1552.x ) * vec3( 0.1031 ) ) );
										nodeVar1553 = ( nodeVar1553 + vec3( dot( nodeVar1553, ( nodeVar1553.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1543 = ( nodeVar1543 + ( nodeVar1544 * mix( mix( fract( ( ( nodeVar1547.x + nodeVar1547.y ) * nodeVar1547.z ) ), fract( ( ( nodeVar1549.x + nodeVar1549.y ) * nodeVar1549.z ) ), nodeVar1546.x ), mix( fract( ( ( nodeVar1551.x + nodeVar1551.y ) * nodeVar1551.z ) ), fract( ( ( nodeVar1553.x + nodeVar1553.y ) * nodeVar1553.z ) ), nodeVar1546.x ), nodeVar1546.y ) ) );
										nodeVar1542 = ( nodeVar1542 * vec2( 2.03 ) );
										nodeVar1544 = ( nodeVar1544 * 0.52 );
										nodeVar1554 = floor( nodeVar1542 );
										nodeVar1555 = fract( nodeVar1542 );
										nodeVar1555 = ( ( nodeVar1555 * nodeVar1555 ) * ( vec2( 3.0 ) - ( nodeVar1555 * vec2( 2.0 ) ) ) );
										nodeVar1556 = fract( ( vec3( nodeVar1554.x, nodeVar1554.y, nodeVar1554.x ) * vec3( 0.1031 ) ) );
										nodeVar1556 = ( nodeVar1556 + vec3( dot( nodeVar1556, ( nodeVar1556.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1557 = ( nodeVar1554 + vec2( 1.0, 0.0 ) );
										nodeVar1558 = fract( ( vec3( nodeVar1557.x, nodeVar1557.y, nodeVar1557.x ) * vec3( 0.1031 ) ) );
										nodeVar1558 = ( nodeVar1558 + vec3( dot( nodeVar1558, ( nodeVar1558.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1559 = ( nodeVar1554 + vec2( 0.0, 1.0 ) );
										nodeVar1560 = fract( ( vec3( nodeVar1559.x, nodeVar1559.y, nodeVar1559.x ) * vec3( 0.1031 ) ) );
										nodeVar1560 = ( nodeVar1560 + vec3( dot( nodeVar1560, ( nodeVar1560.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1561 = ( nodeVar1554 + vec2( 1.0, 1.0 ) );
										nodeVar1562 = fract( ( vec3( nodeVar1561.x, nodeVar1561.y, nodeVar1561.x ) * vec3( 0.1031 ) ) );
										nodeVar1562 = ( nodeVar1562 + vec3( dot( nodeVar1562, ( nodeVar1562.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1543 = ( nodeVar1543 + ( nodeVar1544 * mix( mix( fract( ( ( nodeVar1556.x + nodeVar1556.y ) * nodeVar1556.z ) ), fract( ( ( nodeVar1558.x + nodeVar1558.y ) * nodeVar1558.z ) ), nodeVar1555.x ), mix( fract( ( ( nodeVar1560.x + nodeVar1560.y ) * nodeVar1560.z ) ), fract( ( ( nodeVar1562.x + nodeVar1562.y ) * nodeVar1562.z ) ), nodeVar1555.x ), nodeVar1555.y ) ) );
										nodeVar1542 = ( nodeVar1542 * vec2( 2.03 ) );
										nodeVar1544 = ( nodeVar1544 * 0.52 );
										nodeVar1563 = floor( nodeVar1542 );
										nodeVar1564 = fract( nodeVar1542 );
										nodeVar1564 = ( ( nodeVar1564 * nodeVar1564 ) * ( vec2( 3.0 ) - ( nodeVar1564 * vec2( 2.0 ) ) ) );
										nodeVar1565 = fract( ( vec3( nodeVar1563.x, nodeVar1563.y, nodeVar1563.x ) * vec3( 0.1031 ) ) );
										nodeVar1565 = ( nodeVar1565 + vec3( dot( nodeVar1565, ( nodeVar1565.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1566 = ( nodeVar1563 + vec2( 1.0, 0.0 ) );
										nodeVar1567 = fract( ( vec3( nodeVar1566.x, nodeVar1566.y, nodeVar1566.x ) * vec3( 0.1031 ) ) );
										nodeVar1567 = ( nodeVar1567 + vec3( dot( nodeVar1567, ( nodeVar1567.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1568 = ( nodeVar1563 + vec2( 0.0, 1.0 ) );
										nodeVar1569 = fract( ( vec3( nodeVar1568.x, nodeVar1568.y, nodeVar1568.x ) * vec3( 0.1031 ) ) );
										nodeVar1569 = ( nodeVar1569 + vec3( dot( nodeVar1569, ( nodeVar1569.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1570 = ( nodeVar1563 + vec2( 1.0, 1.0 ) );
										nodeVar1571 = fract( ( vec3( nodeVar1570.x, nodeVar1570.y, nodeVar1570.x ) * vec3( 0.1031 ) ) );
										nodeVar1571 = ( nodeVar1571 + vec3( dot( nodeVar1571, ( nodeVar1571.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1543 = ( nodeVar1543 + ( nodeVar1544 * mix( mix( fract( ( ( nodeVar1565.x + nodeVar1565.y ) * nodeVar1565.z ) ), fract( ( ( nodeVar1567.x + nodeVar1567.y ) * nodeVar1567.z ) ), nodeVar1564.x ), mix( fract( ( ( nodeVar1569.x + nodeVar1569.y ) * nodeVar1569.z ) ), fract( ( ( nodeVar1571.x + nodeVar1571.y ) * nodeVar1571.z ) ), nodeVar1564.x ), nodeVar1564.y ) ) );
										nodeVar1542 = ( nodeVar1542 * vec2( 2.03 ) );
										nodeVar1544 = ( nodeVar1544 * 0.52 );
										nodeVar1572 = floor( nodeVar1542 );
										nodeVar1573 = fract( nodeVar1542 );
										nodeVar1573 = ( ( nodeVar1573 * nodeVar1573 ) * ( vec2( 3.0 ) - ( nodeVar1573 * vec2( 2.0 ) ) ) );
										nodeVar1574 = fract( ( vec3( nodeVar1572.x, nodeVar1572.y, nodeVar1572.x ) * vec3( 0.1031 ) ) );
										nodeVar1574 = ( nodeVar1574 + vec3( dot( nodeVar1574, ( nodeVar1574.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1575 = ( nodeVar1572 + vec2( 1.0, 0.0 ) );
										nodeVar1576 = fract( ( vec3( nodeVar1575.x, nodeVar1575.y, nodeVar1575.x ) * vec3( 0.1031 ) ) );
										nodeVar1576 = ( nodeVar1576 + vec3( dot( nodeVar1576, ( nodeVar1576.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1577 = ( nodeVar1572 + vec2( 0.0, 1.0 ) );
										nodeVar1578 = fract( ( vec3( nodeVar1577.x, nodeVar1577.y, nodeVar1577.x ) * vec3( 0.1031 ) ) );
										nodeVar1578 = ( nodeVar1578 + vec3( dot( nodeVar1578, ( nodeVar1578.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1579 = ( nodeVar1572 + vec2( 1.0, 1.0 ) );
										nodeVar1580 = fract( ( vec3( nodeVar1579.x, nodeVar1579.y, nodeVar1579.x ) * vec3( 0.1031 ) ) );
										nodeVar1580 = ( nodeVar1580 + vec3( dot( nodeVar1580, ( nodeVar1580.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1543 = ( nodeVar1543 + ( nodeVar1544 * mix( mix( fract( ( ( nodeVar1574.x + nodeVar1574.y ) * nodeVar1574.z ) ), fract( ( ( nodeVar1576.x + nodeVar1576.y ) * nodeVar1576.z ) ), nodeVar1573.x ), mix( fract( ( ( nodeVar1578.x + nodeVar1578.y ) * nodeVar1578.z ) ), fract( ( ( nodeVar1580.x + nodeVar1580.y ) * nodeVar1580.z ) ), nodeVar1573.x ), nodeVar1573.y ) ) );
										nodeVar1542 = ( nodeVar1542 * vec2( 2.03 ) );
										nodeVar1544 = ( nodeVar1544 * 0.52 );
										nodeVar1581 = ( nodeVar914 * vec2( 6.0 ) );
										nodeVar1582 = 0.0;
										nodeVar1583 = 0.5;
										nodeVar1584 = floor( nodeVar1581 );
										nodeVar1585 = fract( nodeVar1581 );
										nodeVar1585 = ( ( nodeVar1585 * nodeVar1585 ) * ( vec2( 3.0 ) - ( nodeVar1585 * vec2( 2.0 ) ) ) );
										nodeVar1586 = fract( ( vec3( nodeVar1584.x, nodeVar1584.y, nodeVar1584.x ) * vec3( 0.1031 ) ) );
										nodeVar1586 = ( nodeVar1586 + vec3( dot( nodeVar1586, ( nodeVar1586.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1587 = ( nodeVar1584 + vec2( 1.0, 0.0 ) );
										nodeVar1588 = fract( ( vec3( nodeVar1587.x, nodeVar1587.y, nodeVar1587.x ) * vec3( 0.1031 ) ) );
										nodeVar1588 = ( nodeVar1588 + vec3( dot( nodeVar1588, ( nodeVar1588.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1589 = ( nodeVar1584 + vec2( 0.0, 1.0 ) );
										nodeVar1590 = fract( ( vec3( nodeVar1589.x, nodeVar1589.y, nodeVar1589.x ) * vec3( 0.1031 ) ) );
										nodeVar1590 = ( nodeVar1590 + vec3( dot( nodeVar1590, ( nodeVar1590.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1591 = ( nodeVar1584 + vec2( 1.0, 1.0 ) );
										nodeVar1592 = fract( ( vec3( nodeVar1591.x, nodeVar1591.y, nodeVar1591.x ) * vec3( 0.1031 ) ) );
										nodeVar1592 = ( nodeVar1592 + vec3( dot( nodeVar1592, ( nodeVar1592.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1582 = ( nodeVar1582 + ( nodeVar1583 * mix( mix( fract( ( ( nodeVar1586.x + nodeVar1586.y ) * nodeVar1586.z ) ), fract( ( ( nodeVar1588.x + nodeVar1588.y ) * nodeVar1588.z ) ), nodeVar1585.x ), mix( fract( ( ( nodeVar1590.x + nodeVar1590.y ) * nodeVar1590.z ) ), fract( ( ( nodeVar1592.x + nodeVar1592.y ) * nodeVar1592.z ) ), nodeVar1585.x ), nodeVar1585.y ) ) );
										nodeVar1581 = ( nodeVar1581 * vec2( 2.03 ) );
										nodeVar1583 = ( nodeVar1583 * 0.52 );
										nodeVar1593 = floor( nodeVar1581 );
										nodeVar1594 = fract( nodeVar1581 );
										nodeVar1594 = ( ( nodeVar1594 * nodeVar1594 ) * ( vec2( 3.0 ) - ( nodeVar1594 * vec2( 2.0 ) ) ) );
										nodeVar1595 = fract( ( vec3( nodeVar1593.x, nodeVar1593.y, nodeVar1593.x ) * vec3( 0.1031 ) ) );
										nodeVar1595 = ( nodeVar1595 + vec3( dot( nodeVar1595, ( nodeVar1595.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1596 = ( nodeVar1593 + vec2( 1.0, 0.0 ) );
										nodeVar1597 = fract( ( vec3( nodeVar1596.x, nodeVar1596.y, nodeVar1596.x ) * vec3( 0.1031 ) ) );
										nodeVar1597 = ( nodeVar1597 + vec3( dot( nodeVar1597, ( nodeVar1597.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1598 = ( nodeVar1593 + vec2( 0.0, 1.0 ) );
										nodeVar1599 = fract( ( vec3( nodeVar1598.x, nodeVar1598.y, nodeVar1598.x ) * vec3( 0.1031 ) ) );
										nodeVar1599 = ( nodeVar1599 + vec3( dot( nodeVar1599, ( nodeVar1599.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1600 = ( nodeVar1593 + vec2( 1.0, 1.0 ) );
										nodeVar1601 = fract( ( vec3( nodeVar1600.x, nodeVar1600.y, nodeVar1600.x ) * vec3( 0.1031 ) ) );
										nodeVar1601 = ( nodeVar1601 + vec3( dot( nodeVar1601, ( nodeVar1601.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1582 = ( nodeVar1582 + ( nodeVar1583 * mix( mix( fract( ( ( nodeVar1595.x + nodeVar1595.y ) * nodeVar1595.z ) ), fract( ( ( nodeVar1597.x + nodeVar1597.y ) * nodeVar1597.z ) ), nodeVar1594.x ), mix( fract( ( ( nodeVar1599.x + nodeVar1599.y ) * nodeVar1599.z ) ), fract( ( ( nodeVar1601.x + nodeVar1601.y ) * nodeVar1601.z ) ), nodeVar1594.x ), nodeVar1594.y ) ) );
										nodeVar1581 = ( nodeVar1581 * vec2( 2.03 ) );
										nodeVar1583 = ( nodeVar1583 * 0.52 );
										nodeVar1602 = floor( nodeVar1581 );
										nodeVar1603 = fract( nodeVar1581 );
										nodeVar1603 = ( ( nodeVar1603 * nodeVar1603 ) * ( vec2( 3.0 ) - ( nodeVar1603 * vec2( 2.0 ) ) ) );
										nodeVar1604 = fract( ( vec3( nodeVar1602.x, nodeVar1602.y, nodeVar1602.x ) * vec3( 0.1031 ) ) );
										nodeVar1604 = ( nodeVar1604 + vec3( dot( nodeVar1604, ( nodeVar1604.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1605 = ( nodeVar1602 + vec2( 1.0, 0.0 ) );
										nodeVar1606 = fract( ( vec3( nodeVar1605.x, nodeVar1605.y, nodeVar1605.x ) * vec3( 0.1031 ) ) );
										nodeVar1606 = ( nodeVar1606 + vec3( dot( nodeVar1606, ( nodeVar1606.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1607 = ( nodeVar1602 + vec2( 0.0, 1.0 ) );
										nodeVar1608 = fract( ( vec3( nodeVar1607.x, nodeVar1607.y, nodeVar1607.x ) * vec3( 0.1031 ) ) );
										nodeVar1608 = ( nodeVar1608 + vec3( dot( nodeVar1608, ( nodeVar1608.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1609 = ( nodeVar1602 + vec2( 1.0, 1.0 ) );
										nodeVar1610 = fract( ( vec3( nodeVar1609.x, nodeVar1609.y, nodeVar1609.x ) * vec3( 0.1031 ) ) );
										nodeVar1610 = ( nodeVar1610 + vec3( dot( nodeVar1610, ( nodeVar1610.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1582 = ( nodeVar1582 + ( nodeVar1583 * mix( mix( fract( ( ( nodeVar1604.x + nodeVar1604.y ) * nodeVar1604.z ) ), fract( ( ( nodeVar1606.x + nodeVar1606.y ) * nodeVar1606.z ) ), nodeVar1603.x ), mix( fract( ( ( nodeVar1608.x + nodeVar1608.y ) * nodeVar1608.z ) ), fract( ( ( nodeVar1610.x + nodeVar1610.y ) * nodeVar1610.z ) ), nodeVar1603.x ), nodeVar1603.y ) ) );
										nodeVar1581 = ( nodeVar1581 * vec2( 2.03 ) );
										nodeVar1583 = ( nodeVar1583 * 0.52 );
										nodeVar1611 = floor( nodeVar1581 );
										nodeVar1612 = fract( nodeVar1581 );
										nodeVar1612 = ( ( nodeVar1612 * nodeVar1612 ) * ( vec2( 3.0 ) - ( nodeVar1612 * vec2( 2.0 ) ) ) );
										nodeVar1613 = fract( ( vec3( nodeVar1611.x, nodeVar1611.y, nodeVar1611.x ) * vec3( 0.1031 ) ) );
										nodeVar1613 = ( nodeVar1613 + vec3( dot( nodeVar1613, ( nodeVar1613.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1614 = ( nodeVar1611 + vec2( 1.0, 0.0 ) );
										nodeVar1615 = fract( ( vec3( nodeVar1614.x, nodeVar1614.y, nodeVar1614.x ) * vec3( 0.1031 ) ) );
										nodeVar1615 = ( nodeVar1615 + vec3( dot( nodeVar1615, ( nodeVar1615.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1616 = ( nodeVar1611 + vec2( 0.0, 1.0 ) );
										nodeVar1617 = fract( ( vec3( nodeVar1616.x, nodeVar1616.y, nodeVar1616.x ) * vec3( 0.1031 ) ) );
										nodeVar1617 = ( nodeVar1617 + vec3( dot( nodeVar1617, ( nodeVar1617.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1618 = ( nodeVar1611 + vec2( 1.0, 1.0 ) );
										nodeVar1619 = fract( ( vec3( nodeVar1618.x, nodeVar1618.y, nodeVar1618.x ) * vec3( 0.1031 ) ) );
										nodeVar1619 = ( nodeVar1619 + vec3( dot( nodeVar1619, ( nodeVar1619.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar1582 = ( nodeVar1582 + ( nodeVar1583 * mix( mix( fract( ( ( nodeVar1613.x + nodeVar1613.y ) * nodeVar1613.z ) ), fract( ( ( nodeVar1615.x + nodeVar1615.y ) * nodeVar1615.z ) ), nodeVar1612.x ), mix( fract( ( ( nodeVar1617.x + nodeVar1617.y ) * nodeVar1617.z ) ), fract( ( ( nodeVar1619.x + nodeVar1619.y ) * nodeVar1619.z ) ), nodeVar1612.x ), nodeVar1612.y ) ) );
										nodeVar1581 = ( nodeVar1581 * vec2( 2.03 ) );
										nodeVar1583 = ( nodeVar1583 * 0.52 );
										nodeVar1620 = ( ( nodeVar1543 * 0.6 ) + ( nodeVar1582 * 0.4 ) );
										nodeVar916 = vec3( nodeVar1620, 1.0, nodeVar1620 );
										

									} else {


										if ( ( nodeVar915 < 9.5 ) ) {

											nodeVar1621 = ( nodeVar914 * vec2( 26.0 ) );
											nodeVar1622 = 0.0;
											nodeVar1623 = 0.5;
											nodeVar1624 = floor( nodeVar1621 );
											nodeVar1625 = fract( nodeVar1621 );
											nodeVar1625 = ( ( nodeVar1625 * nodeVar1625 ) * ( vec2( 3.0 ) - ( nodeVar1625 * vec2( 2.0 ) ) ) );
											nodeVar1626 = fract( ( vec3( nodeVar1624.x, nodeVar1624.y, nodeVar1624.x ) * vec3( 0.1031 ) ) );
											nodeVar1626 = ( nodeVar1626 + vec3( dot( nodeVar1626, ( nodeVar1626.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1627 = ( nodeVar1624 + vec2( 1.0, 0.0 ) );
											nodeVar1628 = fract( ( vec3( nodeVar1627.x, nodeVar1627.y, nodeVar1627.x ) * vec3( 0.1031 ) ) );
											nodeVar1628 = ( nodeVar1628 + vec3( dot( nodeVar1628, ( nodeVar1628.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1629 = ( nodeVar1624 + vec2( 0.0, 1.0 ) );
											nodeVar1630 = fract( ( vec3( nodeVar1629.x, nodeVar1629.y, nodeVar1629.x ) * vec3( 0.1031 ) ) );
											nodeVar1630 = ( nodeVar1630 + vec3( dot( nodeVar1630, ( nodeVar1630.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1631 = ( nodeVar1624 + vec2( 1.0, 1.0 ) );
											nodeVar1632 = fract( ( vec3( nodeVar1631.x, nodeVar1631.y, nodeVar1631.x ) * vec3( 0.1031 ) ) );
											nodeVar1632 = ( nodeVar1632 + vec3( dot( nodeVar1632, ( nodeVar1632.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1622 = ( nodeVar1622 + ( nodeVar1623 * mix( mix( fract( ( ( nodeVar1626.x + nodeVar1626.y ) * nodeVar1626.z ) ), fract( ( ( nodeVar1628.x + nodeVar1628.y ) * nodeVar1628.z ) ), nodeVar1625.x ), mix( fract( ( ( nodeVar1630.x + nodeVar1630.y ) * nodeVar1630.z ) ), fract( ( ( nodeVar1632.x + nodeVar1632.y ) * nodeVar1632.z ) ), nodeVar1625.x ), nodeVar1625.y ) ) );
											nodeVar1621 = ( nodeVar1621 * vec2( 2.03 ) );
											nodeVar1623 = ( nodeVar1623 * 0.52 );
											nodeVar1633 = floor( nodeVar1621 );
											nodeVar1634 = fract( nodeVar1621 );
											nodeVar1634 = ( ( nodeVar1634 * nodeVar1634 ) * ( vec2( 3.0 ) - ( nodeVar1634 * vec2( 2.0 ) ) ) );
											nodeVar1635 = fract( ( vec3( nodeVar1633.x, nodeVar1633.y, nodeVar1633.x ) * vec3( 0.1031 ) ) );
											nodeVar1635 = ( nodeVar1635 + vec3( dot( nodeVar1635, ( nodeVar1635.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1636 = ( nodeVar1633 + vec2( 1.0, 0.0 ) );
											nodeVar1637 = fract( ( vec3( nodeVar1636.x, nodeVar1636.y, nodeVar1636.x ) * vec3( 0.1031 ) ) );
											nodeVar1637 = ( nodeVar1637 + vec3( dot( nodeVar1637, ( nodeVar1637.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1638 = ( nodeVar1633 + vec2( 0.0, 1.0 ) );
											nodeVar1639 = fract( ( vec3( nodeVar1638.x, nodeVar1638.y, nodeVar1638.x ) * vec3( 0.1031 ) ) );
											nodeVar1639 = ( nodeVar1639 + vec3( dot( nodeVar1639, ( nodeVar1639.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1640 = ( nodeVar1633 + vec2( 1.0, 1.0 ) );
											nodeVar1641 = fract( ( vec3( nodeVar1640.x, nodeVar1640.y, nodeVar1640.x ) * vec3( 0.1031 ) ) );
											nodeVar1641 = ( nodeVar1641 + vec3( dot( nodeVar1641, ( nodeVar1641.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1622 = ( nodeVar1622 + ( nodeVar1623 * mix( mix( fract( ( ( nodeVar1635.x + nodeVar1635.y ) * nodeVar1635.z ) ), fract( ( ( nodeVar1637.x + nodeVar1637.y ) * nodeVar1637.z ) ), nodeVar1634.x ), mix( fract( ( ( nodeVar1639.x + nodeVar1639.y ) * nodeVar1639.z ) ), fract( ( ( nodeVar1641.x + nodeVar1641.y ) * nodeVar1641.z ) ), nodeVar1634.x ), nodeVar1634.y ) ) );
											nodeVar1621 = ( nodeVar1621 * vec2( 2.03 ) );
											nodeVar1623 = ( nodeVar1623 * 0.52 );
											nodeVar1642 = floor( nodeVar1621 );
											nodeVar1643 = fract( nodeVar1621 );
											nodeVar1643 = ( ( nodeVar1643 * nodeVar1643 ) * ( vec2( 3.0 ) - ( nodeVar1643 * vec2( 2.0 ) ) ) );
											nodeVar1644 = fract( ( vec3( nodeVar1642.x, nodeVar1642.y, nodeVar1642.x ) * vec3( 0.1031 ) ) );
											nodeVar1644 = ( nodeVar1644 + vec3( dot( nodeVar1644, ( nodeVar1644.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1645 = ( nodeVar1642 + vec2( 1.0, 0.0 ) );
											nodeVar1646 = fract( ( vec3( nodeVar1645.x, nodeVar1645.y, nodeVar1645.x ) * vec3( 0.1031 ) ) );
											nodeVar1646 = ( nodeVar1646 + vec3( dot( nodeVar1646, ( nodeVar1646.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1647 = ( nodeVar1642 + vec2( 0.0, 1.0 ) );
											nodeVar1648 = fract( ( vec3( nodeVar1647.x, nodeVar1647.y, nodeVar1647.x ) * vec3( 0.1031 ) ) );
											nodeVar1648 = ( nodeVar1648 + vec3( dot( nodeVar1648, ( nodeVar1648.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1649 = ( nodeVar1642 + vec2( 1.0, 1.0 ) );
											nodeVar1650 = fract( ( vec3( nodeVar1649.x, nodeVar1649.y, nodeVar1649.x ) * vec3( 0.1031 ) ) );
											nodeVar1650 = ( nodeVar1650 + vec3( dot( nodeVar1650, ( nodeVar1650.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1622 = ( nodeVar1622 + ( nodeVar1623 * mix( mix( fract( ( ( nodeVar1644.x + nodeVar1644.y ) * nodeVar1644.z ) ), fract( ( ( nodeVar1646.x + nodeVar1646.y ) * nodeVar1646.z ) ), nodeVar1643.x ), mix( fract( ( ( nodeVar1648.x + nodeVar1648.y ) * nodeVar1648.z ) ), fract( ( ( nodeVar1650.x + nodeVar1650.y ) * nodeVar1650.z ) ), nodeVar1643.x ), nodeVar1643.y ) ) );
											nodeVar1621 = ( nodeVar1621 * vec2( 2.03 ) );
											nodeVar1623 = ( nodeVar1623 * 0.52 );
											nodeVar1651 = floor( nodeVar1621 );
											nodeVar1652 = fract( nodeVar1621 );
											nodeVar1652 = ( ( nodeVar1652 * nodeVar1652 ) * ( vec2( 3.0 ) - ( nodeVar1652 * vec2( 2.0 ) ) ) );
											nodeVar1653 = fract( ( vec3( nodeVar1651.x, nodeVar1651.y, nodeVar1651.x ) * vec3( 0.1031 ) ) );
											nodeVar1653 = ( nodeVar1653 + vec3( dot( nodeVar1653, ( nodeVar1653.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1654 = ( nodeVar1651 + vec2( 1.0, 0.0 ) );
											nodeVar1655 = fract( ( vec3( nodeVar1654.x, nodeVar1654.y, nodeVar1654.x ) * vec3( 0.1031 ) ) );
											nodeVar1655 = ( nodeVar1655 + vec3( dot( nodeVar1655, ( nodeVar1655.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1656 = ( nodeVar1651 + vec2( 0.0, 1.0 ) );
											nodeVar1657 = fract( ( vec3( nodeVar1656.x, nodeVar1656.y, nodeVar1656.x ) * vec3( 0.1031 ) ) );
											nodeVar1657 = ( nodeVar1657 + vec3( dot( nodeVar1657, ( nodeVar1657.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1658 = ( nodeVar1651 + vec2( 1.0, 1.0 ) );
											nodeVar1659 = fract( ( vec3( nodeVar1658.x, nodeVar1658.y, nodeVar1658.x ) * vec3( 0.1031 ) ) );
											nodeVar1659 = ( nodeVar1659 + vec3( dot( nodeVar1659, ( nodeVar1659.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1622 = ( nodeVar1622 + ( nodeVar1623 * mix( mix( fract( ( ( nodeVar1653.x + nodeVar1653.y ) * nodeVar1653.z ) ), fract( ( ( nodeVar1655.x + nodeVar1655.y ) * nodeVar1655.z ) ), nodeVar1652.x ), mix( fract( ( ( nodeVar1657.x + nodeVar1657.y ) * nodeVar1657.z ) ), fract( ( ( nodeVar1659.x + nodeVar1659.y ) * nodeVar1659.z ) ), nodeVar1652.x ), nodeVar1652.y ) ) );
											nodeVar1621 = ( nodeVar1621 * vec2( 2.03 ) );
											nodeVar1623 = ( nodeVar1623 * 0.52 );
											nodeVar1660 = ( nodeVar914 * vec2( 90.0 ) );
											nodeVar1661 = 0.0;
											nodeVar1662 = 0.5;
											nodeVar1663 = floor( nodeVar1660 );
											nodeVar1664 = fract( nodeVar1660 );
											nodeVar1664 = ( ( nodeVar1664 * nodeVar1664 ) * ( vec2( 3.0 ) - ( nodeVar1664 * vec2( 2.0 ) ) ) );
											nodeVar1665 = fract( ( vec3( nodeVar1663.x, nodeVar1663.y, nodeVar1663.x ) * vec3( 0.1031 ) ) );
											nodeVar1665 = ( nodeVar1665 + vec3( dot( nodeVar1665, ( nodeVar1665.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1666 = ( nodeVar1663 + vec2( 1.0, 0.0 ) );
											nodeVar1667 = fract( ( vec3( nodeVar1666.x, nodeVar1666.y, nodeVar1666.x ) * vec3( 0.1031 ) ) );
											nodeVar1667 = ( nodeVar1667 + vec3( dot( nodeVar1667, ( nodeVar1667.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1668 = ( nodeVar1663 + vec2( 0.0, 1.0 ) );
											nodeVar1669 = fract( ( vec3( nodeVar1668.x, nodeVar1668.y, nodeVar1668.x ) * vec3( 0.1031 ) ) );
											nodeVar1669 = ( nodeVar1669 + vec3( dot( nodeVar1669, ( nodeVar1669.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1670 = ( nodeVar1663 + vec2( 1.0, 1.0 ) );
											nodeVar1671 = fract( ( vec3( nodeVar1670.x, nodeVar1670.y, nodeVar1670.x ) * vec3( 0.1031 ) ) );
											nodeVar1671 = ( nodeVar1671 + vec3( dot( nodeVar1671, ( nodeVar1671.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1661 = ( nodeVar1661 + ( nodeVar1662 * mix( mix( fract( ( ( nodeVar1665.x + nodeVar1665.y ) * nodeVar1665.z ) ), fract( ( ( nodeVar1667.x + nodeVar1667.y ) * nodeVar1667.z ) ), nodeVar1664.x ), mix( fract( ( ( nodeVar1669.x + nodeVar1669.y ) * nodeVar1669.z ) ), fract( ( ( nodeVar1671.x + nodeVar1671.y ) * nodeVar1671.z ) ), nodeVar1664.x ), nodeVar1664.y ) ) );
											nodeVar1660 = ( nodeVar1660 * vec2( 2.03 ) );
											nodeVar1662 = ( nodeVar1662 * 0.52 );
											nodeVar1672 = floor( nodeVar1660 );
											nodeVar1673 = fract( nodeVar1660 );
											nodeVar1673 = ( ( nodeVar1673 * nodeVar1673 ) * ( vec2( 3.0 ) - ( nodeVar1673 * vec2( 2.0 ) ) ) );
											nodeVar1674 = fract( ( vec3( nodeVar1672.x, nodeVar1672.y, nodeVar1672.x ) * vec3( 0.1031 ) ) );
											nodeVar1674 = ( nodeVar1674 + vec3( dot( nodeVar1674, ( nodeVar1674.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1675 = ( nodeVar1672 + vec2( 1.0, 0.0 ) );
											nodeVar1676 = fract( ( vec3( nodeVar1675.x, nodeVar1675.y, nodeVar1675.x ) * vec3( 0.1031 ) ) );
											nodeVar1676 = ( nodeVar1676 + vec3( dot( nodeVar1676, ( nodeVar1676.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1677 = ( nodeVar1672 + vec2( 0.0, 1.0 ) );
											nodeVar1678 = fract( ( vec3( nodeVar1677.x, nodeVar1677.y, nodeVar1677.x ) * vec3( 0.1031 ) ) );
											nodeVar1678 = ( nodeVar1678 + vec3( dot( nodeVar1678, ( nodeVar1678.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1679 = ( nodeVar1672 + vec2( 1.0, 1.0 ) );
											nodeVar1680 = fract( ( vec3( nodeVar1679.x, nodeVar1679.y, nodeVar1679.x ) * vec3( 0.1031 ) ) );
											nodeVar1680 = ( nodeVar1680 + vec3( dot( nodeVar1680, ( nodeVar1680.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1661 = ( nodeVar1661 + ( nodeVar1662 * mix( mix( fract( ( ( nodeVar1674.x + nodeVar1674.y ) * nodeVar1674.z ) ), fract( ( ( nodeVar1676.x + nodeVar1676.y ) * nodeVar1676.z ) ), nodeVar1673.x ), mix( fract( ( ( nodeVar1678.x + nodeVar1678.y ) * nodeVar1678.z ) ), fract( ( ( nodeVar1680.x + nodeVar1680.y ) * nodeVar1680.z ) ), nodeVar1673.x ), nodeVar1673.y ) ) );
											nodeVar1660 = ( nodeVar1660 * vec2( 2.03 ) );
											nodeVar1662 = ( nodeVar1662 * 0.52 );
											nodeVar1681 = floor( nodeVar1660 );
											nodeVar1682 = fract( nodeVar1660 );
											nodeVar1682 = ( ( nodeVar1682 * nodeVar1682 ) * ( vec2( 3.0 ) - ( nodeVar1682 * vec2( 2.0 ) ) ) );
											nodeVar1683 = fract( ( vec3( nodeVar1681.x, nodeVar1681.y, nodeVar1681.x ) * vec3( 0.1031 ) ) );
											nodeVar1683 = ( nodeVar1683 + vec3( dot( nodeVar1683, ( nodeVar1683.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1684 = ( nodeVar1681 + vec2( 1.0, 0.0 ) );
											nodeVar1685 = fract( ( vec3( nodeVar1684.x, nodeVar1684.y, nodeVar1684.x ) * vec3( 0.1031 ) ) );
											nodeVar1685 = ( nodeVar1685 + vec3( dot( nodeVar1685, ( nodeVar1685.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1686 = ( nodeVar1681 + vec2( 0.0, 1.0 ) );
											nodeVar1687 = fract( ( vec3( nodeVar1686.x, nodeVar1686.y, nodeVar1686.x ) * vec3( 0.1031 ) ) );
											nodeVar1687 = ( nodeVar1687 + vec3( dot( nodeVar1687, ( nodeVar1687.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1688 = ( nodeVar1681 + vec2( 1.0, 1.0 ) );
											nodeVar1689 = fract( ( vec3( nodeVar1688.x, nodeVar1688.y, nodeVar1688.x ) * vec3( 0.1031 ) ) );
											nodeVar1689 = ( nodeVar1689 + vec3( dot( nodeVar1689, ( nodeVar1689.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1661 = ( nodeVar1661 + ( nodeVar1662 * mix( mix( fract( ( ( nodeVar1683.x + nodeVar1683.y ) * nodeVar1683.z ) ), fract( ( ( nodeVar1685.x + nodeVar1685.y ) * nodeVar1685.z ) ), nodeVar1682.x ), mix( fract( ( ( nodeVar1687.x + nodeVar1687.y ) * nodeVar1687.z ) ), fract( ( ( nodeVar1689.x + nodeVar1689.y ) * nodeVar1689.z ) ), nodeVar1682.x ), nodeVar1682.y ) ) );
											nodeVar1660 = ( nodeVar1660 * vec2( 2.03 ) );
											nodeVar1662 = ( nodeVar1662 * 0.52 );
											nodeVar1690 = floor( nodeVar1660 );
											nodeVar1691 = fract( nodeVar1660 );
											nodeVar1691 = ( ( nodeVar1691 * nodeVar1691 ) * ( vec2( 3.0 ) - ( nodeVar1691 * vec2( 2.0 ) ) ) );
											nodeVar1692 = fract( ( vec3( nodeVar1690.x, nodeVar1690.y, nodeVar1690.x ) * vec3( 0.1031 ) ) );
											nodeVar1692 = ( nodeVar1692 + vec3( dot( nodeVar1692, ( nodeVar1692.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1693 = ( nodeVar1690 + vec2( 1.0, 0.0 ) );
											nodeVar1694 = fract( ( vec3( nodeVar1693.x, nodeVar1693.y, nodeVar1693.x ) * vec3( 0.1031 ) ) );
											nodeVar1694 = ( nodeVar1694 + vec3( dot( nodeVar1694, ( nodeVar1694.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1695 = ( nodeVar1690 + vec2( 0.0, 1.0 ) );
											nodeVar1696 = fract( ( vec3( nodeVar1695.x, nodeVar1695.y, nodeVar1695.x ) * vec3( 0.1031 ) ) );
											nodeVar1696 = ( nodeVar1696 + vec3( dot( nodeVar1696, ( nodeVar1696.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1697 = ( nodeVar1690 + vec2( 1.0, 1.0 ) );
											nodeVar1698 = fract( ( vec3( nodeVar1697.x, nodeVar1697.y, nodeVar1697.x ) * vec3( 0.1031 ) ) );
											nodeVar1698 = ( nodeVar1698 + vec3( dot( nodeVar1698, ( nodeVar1698.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar1661 = ( nodeVar1661 + ( nodeVar1662 * mix( mix( fract( ( ( nodeVar1692.x + nodeVar1692.y ) * nodeVar1692.z ) ), fract( ( ( nodeVar1694.x + nodeVar1694.y ) * nodeVar1694.z ) ), nodeVar1691.x ), mix( fract( ( ( nodeVar1696.x + nodeVar1696.y ) * nodeVar1696.z ) ), fract( ( ( nodeVar1698.x + nodeVar1698.y ) * nodeVar1698.z ) ), nodeVar1691.x ), nodeVar1691.y ) ) );
											nodeVar1660 = ( nodeVar1660 * vec2( 2.03 ) );
											nodeVar1662 = ( nodeVar1662 * 0.52 );
											nodeVar1699 = ( ( nodeVar1622 * 0.6 ) + ( nodeVar1661 * 0.4 ) );
											nodeVar916 = vec3( ( nodeVar1699 * 0.5 ), ( 0.8 + ( nodeVar1699 * 0.2 ) ), nodeVar1699 );
											

										} else {


											if ( ( nodeVar915 < 10.5 ) ) {

												nodeVar1700 = ( nodeVar914 * vec2( 5.5 ) );
												nodeVar1701 = 0.0;
												nodeVar1702 = 0.5;
												nodeVar1703 = floor( nodeVar1700 );
												nodeVar1704 = fract( nodeVar1700 );
												nodeVar1704 = ( ( nodeVar1704 * nodeVar1704 ) * ( vec2( 3.0 ) - ( nodeVar1704 * vec2( 2.0 ) ) ) );
												nodeVar1705 = fract( ( vec3( nodeVar1703.x, nodeVar1703.y, nodeVar1703.x ) * vec3( 0.1031 ) ) );
												nodeVar1705 = ( nodeVar1705 + vec3( dot( nodeVar1705, ( nodeVar1705.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1706 = ( nodeVar1703 + vec2( 1.0, 0.0 ) );
												nodeVar1707 = fract( ( vec3( nodeVar1706.x, nodeVar1706.y, nodeVar1706.x ) * vec3( 0.1031 ) ) );
												nodeVar1707 = ( nodeVar1707 + vec3( dot( nodeVar1707, ( nodeVar1707.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1708 = ( nodeVar1703 + vec2( 0.0, 1.0 ) );
												nodeVar1709 = fract( ( vec3( nodeVar1708.x, nodeVar1708.y, nodeVar1708.x ) * vec3( 0.1031 ) ) );
												nodeVar1709 = ( nodeVar1709 + vec3( dot( nodeVar1709, ( nodeVar1709.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1710 = ( nodeVar1703 + vec2( 1.0, 1.0 ) );
												nodeVar1711 = fract( ( vec3( nodeVar1710.x, nodeVar1710.y, nodeVar1710.x ) * vec3( 0.1031 ) ) );
												nodeVar1711 = ( nodeVar1711 + vec3( dot( nodeVar1711, ( nodeVar1711.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1701 = ( nodeVar1701 + ( nodeVar1702 * mix( mix( fract( ( ( nodeVar1705.x + nodeVar1705.y ) * nodeVar1705.z ) ), fract( ( ( nodeVar1707.x + nodeVar1707.y ) * nodeVar1707.z ) ), nodeVar1704.x ), mix( fract( ( ( nodeVar1709.x + nodeVar1709.y ) * nodeVar1709.z ) ), fract( ( ( nodeVar1711.x + nodeVar1711.y ) * nodeVar1711.z ) ), nodeVar1704.x ), nodeVar1704.y ) ) );
												nodeVar1700 = ( nodeVar1700 * vec2( 2.03 ) );
												nodeVar1702 = ( nodeVar1702 * 0.52 );
												nodeVar1712 = floor( nodeVar1700 );
												nodeVar1713 = fract( nodeVar1700 );
												nodeVar1713 = ( ( nodeVar1713 * nodeVar1713 ) * ( vec2( 3.0 ) - ( nodeVar1713 * vec2( 2.0 ) ) ) );
												nodeVar1714 = fract( ( vec3( nodeVar1712.x, nodeVar1712.y, nodeVar1712.x ) * vec3( 0.1031 ) ) );
												nodeVar1714 = ( nodeVar1714 + vec3( dot( nodeVar1714, ( nodeVar1714.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1715 = ( nodeVar1712 + vec2( 1.0, 0.0 ) );
												nodeVar1716 = fract( ( vec3( nodeVar1715.x, nodeVar1715.y, nodeVar1715.x ) * vec3( 0.1031 ) ) );
												nodeVar1716 = ( nodeVar1716 + vec3( dot( nodeVar1716, ( nodeVar1716.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1717 = ( nodeVar1712 + vec2( 0.0, 1.0 ) );
												nodeVar1718 = fract( ( vec3( nodeVar1717.x, nodeVar1717.y, nodeVar1717.x ) * vec3( 0.1031 ) ) );
												nodeVar1718 = ( nodeVar1718 + vec3( dot( nodeVar1718, ( nodeVar1718.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1719 = ( nodeVar1712 + vec2( 1.0, 1.0 ) );
												nodeVar1720 = fract( ( vec3( nodeVar1719.x, nodeVar1719.y, nodeVar1719.x ) * vec3( 0.1031 ) ) );
												nodeVar1720 = ( nodeVar1720 + vec3( dot( nodeVar1720, ( nodeVar1720.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1701 = ( nodeVar1701 + ( nodeVar1702 * mix( mix( fract( ( ( nodeVar1714.x + nodeVar1714.y ) * nodeVar1714.z ) ), fract( ( ( nodeVar1716.x + nodeVar1716.y ) * nodeVar1716.z ) ), nodeVar1713.x ), mix( fract( ( ( nodeVar1718.x + nodeVar1718.y ) * nodeVar1718.z ) ), fract( ( ( nodeVar1720.x + nodeVar1720.y ) * nodeVar1720.z ) ), nodeVar1713.x ), nodeVar1713.y ) ) );
												nodeVar1700 = ( nodeVar1700 * vec2( 2.03 ) );
												nodeVar1702 = ( nodeVar1702 * 0.52 );
												nodeVar1721 = floor( nodeVar1700 );
												nodeVar1722 = fract( nodeVar1700 );
												nodeVar1722 = ( ( nodeVar1722 * nodeVar1722 ) * ( vec2( 3.0 ) - ( nodeVar1722 * vec2( 2.0 ) ) ) );
												nodeVar1723 = fract( ( vec3( nodeVar1721.x, nodeVar1721.y, nodeVar1721.x ) * vec3( 0.1031 ) ) );
												nodeVar1723 = ( nodeVar1723 + vec3( dot( nodeVar1723, ( nodeVar1723.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1724 = ( nodeVar1721 + vec2( 1.0, 0.0 ) );
												nodeVar1725 = fract( ( vec3( nodeVar1724.x, nodeVar1724.y, nodeVar1724.x ) * vec3( 0.1031 ) ) );
												nodeVar1725 = ( nodeVar1725 + vec3( dot( nodeVar1725, ( nodeVar1725.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1726 = ( nodeVar1721 + vec2( 0.0, 1.0 ) );
												nodeVar1727 = fract( ( vec3( nodeVar1726.x, nodeVar1726.y, nodeVar1726.x ) * vec3( 0.1031 ) ) );
												nodeVar1727 = ( nodeVar1727 + vec3( dot( nodeVar1727, ( nodeVar1727.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1728 = ( nodeVar1721 + vec2( 1.0, 1.0 ) );
												nodeVar1729 = fract( ( vec3( nodeVar1728.x, nodeVar1728.y, nodeVar1728.x ) * vec3( 0.1031 ) ) );
												nodeVar1729 = ( nodeVar1729 + vec3( dot( nodeVar1729, ( nodeVar1729.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1701 = ( nodeVar1701 + ( nodeVar1702 * mix( mix( fract( ( ( nodeVar1723.x + nodeVar1723.y ) * nodeVar1723.z ) ), fract( ( ( nodeVar1725.x + nodeVar1725.y ) * nodeVar1725.z ) ), nodeVar1722.x ), mix( fract( ( ( nodeVar1727.x + nodeVar1727.y ) * nodeVar1727.z ) ), fract( ( ( nodeVar1729.x + nodeVar1729.y ) * nodeVar1729.z ) ), nodeVar1722.x ), nodeVar1722.y ) ) );
												nodeVar1700 = ( nodeVar1700 * vec2( 2.03 ) );
												nodeVar1702 = ( nodeVar1702 * 0.52 );
												nodeVar1730 = floor( nodeVar1700 );
												nodeVar1731 = fract( nodeVar1700 );
												nodeVar1731 = ( ( nodeVar1731 * nodeVar1731 ) * ( vec2( 3.0 ) - ( nodeVar1731 * vec2( 2.0 ) ) ) );
												nodeVar1732 = fract( ( vec3( nodeVar1730.x, nodeVar1730.y, nodeVar1730.x ) * vec3( 0.1031 ) ) );
												nodeVar1732 = ( nodeVar1732 + vec3( dot( nodeVar1732, ( nodeVar1732.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1733 = ( nodeVar1730 + vec2( 1.0, 0.0 ) );
												nodeVar1734 = fract( ( vec3( nodeVar1733.x, nodeVar1733.y, nodeVar1733.x ) * vec3( 0.1031 ) ) );
												nodeVar1734 = ( nodeVar1734 + vec3( dot( nodeVar1734, ( nodeVar1734.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1735 = ( nodeVar1730 + vec2( 0.0, 1.0 ) );
												nodeVar1736 = fract( ( vec3( nodeVar1735.x, nodeVar1735.y, nodeVar1735.x ) * vec3( 0.1031 ) ) );
												nodeVar1736 = ( nodeVar1736 + vec3( dot( nodeVar1736, ( nodeVar1736.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1737 = ( nodeVar1730 + vec2( 1.0, 1.0 ) );
												nodeVar1738 = fract( ( vec3( nodeVar1737.x, nodeVar1737.y, nodeVar1737.x ) * vec3( 0.1031 ) ) );
												nodeVar1738 = ( nodeVar1738 + vec3( dot( nodeVar1738, ( nodeVar1738.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1701 = ( nodeVar1701 + ( nodeVar1702 * mix( mix( fract( ( ( nodeVar1732.x + nodeVar1732.y ) * nodeVar1732.z ) ), fract( ( ( nodeVar1734.x + nodeVar1734.y ) * nodeVar1734.z ) ), nodeVar1731.x ), mix( fract( ( ( nodeVar1736.x + nodeVar1736.y ) * nodeVar1736.z ) ), fract( ( ( nodeVar1738.x + nodeVar1738.y ) * nodeVar1738.z ) ), nodeVar1731.x ), nodeVar1731.y ) ) );
												nodeVar1700 = ( nodeVar1700 * vec2( 2.03 ) );
												nodeVar1702 = ( nodeVar1702 * 0.52 );
												nodeVar1739 = ( nodeVar914 * vec2( 17.0 ) );
												nodeVar1740 = 0.0;
												nodeVar1741 = 0.5;
												nodeVar1742 = floor( nodeVar1739 );
												nodeVar1743 = fract( nodeVar1739 );
												nodeVar1743 = ( ( nodeVar1743 * nodeVar1743 ) * ( vec2( 3.0 ) - ( nodeVar1743 * vec2( 2.0 ) ) ) );
												nodeVar1744 = fract( ( vec3( nodeVar1742.x, nodeVar1742.y, nodeVar1742.x ) * vec3( 0.1031 ) ) );
												nodeVar1744 = ( nodeVar1744 + vec3( dot( nodeVar1744, ( nodeVar1744.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1745 = ( nodeVar1742 + vec2( 1.0, 0.0 ) );
												nodeVar1746 = fract( ( vec3( nodeVar1745.x, nodeVar1745.y, nodeVar1745.x ) * vec3( 0.1031 ) ) );
												nodeVar1746 = ( nodeVar1746 + vec3( dot( nodeVar1746, ( nodeVar1746.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1747 = ( nodeVar1742 + vec2( 0.0, 1.0 ) );
												nodeVar1748 = fract( ( vec3( nodeVar1747.x, nodeVar1747.y, nodeVar1747.x ) * vec3( 0.1031 ) ) );
												nodeVar1748 = ( nodeVar1748 + vec3( dot( nodeVar1748, ( nodeVar1748.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1749 = ( nodeVar1742 + vec2( 1.0, 1.0 ) );
												nodeVar1750 = fract( ( vec3( nodeVar1749.x, nodeVar1749.y, nodeVar1749.x ) * vec3( 0.1031 ) ) );
												nodeVar1750 = ( nodeVar1750 + vec3( dot( nodeVar1750, ( nodeVar1750.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1740 = ( nodeVar1740 + ( nodeVar1741 * mix( mix( fract( ( ( nodeVar1744.x + nodeVar1744.y ) * nodeVar1744.z ) ), fract( ( ( nodeVar1746.x + nodeVar1746.y ) * nodeVar1746.z ) ), nodeVar1743.x ), mix( fract( ( ( nodeVar1748.x + nodeVar1748.y ) * nodeVar1748.z ) ), fract( ( ( nodeVar1750.x + nodeVar1750.y ) * nodeVar1750.z ) ), nodeVar1743.x ), nodeVar1743.y ) ) );
												nodeVar1739 = ( nodeVar1739 * vec2( 2.03 ) );
												nodeVar1741 = ( nodeVar1741 * 0.52 );
												nodeVar1751 = floor( nodeVar1739 );
												nodeVar1752 = fract( nodeVar1739 );
												nodeVar1752 = ( ( nodeVar1752 * nodeVar1752 ) * ( vec2( 3.0 ) - ( nodeVar1752 * vec2( 2.0 ) ) ) );
												nodeVar1753 = fract( ( vec3( nodeVar1751.x, nodeVar1751.y, nodeVar1751.x ) * vec3( 0.1031 ) ) );
												nodeVar1753 = ( nodeVar1753 + vec3( dot( nodeVar1753, ( nodeVar1753.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1754 = ( nodeVar1751 + vec2( 1.0, 0.0 ) );
												nodeVar1755 = fract( ( vec3( nodeVar1754.x, nodeVar1754.y, nodeVar1754.x ) * vec3( 0.1031 ) ) );
												nodeVar1755 = ( nodeVar1755 + vec3( dot( nodeVar1755, ( nodeVar1755.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1756 = ( nodeVar1751 + vec2( 0.0, 1.0 ) );
												nodeVar1757 = fract( ( vec3( nodeVar1756.x, nodeVar1756.y, nodeVar1756.x ) * vec3( 0.1031 ) ) );
												nodeVar1757 = ( nodeVar1757 + vec3( dot( nodeVar1757, ( nodeVar1757.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1758 = ( nodeVar1751 + vec2( 1.0, 1.0 ) );
												nodeVar1759 = fract( ( vec3( nodeVar1758.x, nodeVar1758.y, nodeVar1758.x ) * vec3( 0.1031 ) ) );
												nodeVar1759 = ( nodeVar1759 + vec3( dot( nodeVar1759, ( nodeVar1759.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1740 = ( nodeVar1740 + ( nodeVar1741 * mix( mix( fract( ( ( nodeVar1753.x + nodeVar1753.y ) * nodeVar1753.z ) ), fract( ( ( nodeVar1755.x + nodeVar1755.y ) * nodeVar1755.z ) ), nodeVar1752.x ), mix( fract( ( ( nodeVar1757.x + nodeVar1757.y ) * nodeVar1757.z ) ), fract( ( ( nodeVar1759.x + nodeVar1759.y ) * nodeVar1759.z ) ), nodeVar1752.x ), nodeVar1752.y ) ) );
												nodeVar1739 = ( nodeVar1739 * vec2( 2.03 ) );
												nodeVar1741 = ( nodeVar1741 * 0.52 );
												nodeVar1760 = floor( nodeVar1739 );
												nodeVar1761 = fract( nodeVar1739 );
												nodeVar1761 = ( ( nodeVar1761 * nodeVar1761 ) * ( vec2( 3.0 ) - ( nodeVar1761 * vec2( 2.0 ) ) ) );
												nodeVar1762 = fract( ( vec3( nodeVar1760.x, nodeVar1760.y, nodeVar1760.x ) * vec3( 0.1031 ) ) );
												nodeVar1762 = ( nodeVar1762 + vec3( dot( nodeVar1762, ( nodeVar1762.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1763 = ( nodeVar1760 + vec2( 1.0, 0.0 ) );
												nodeVar1764 = fract( ( vec3( nodeVar1763.x, nodeVar1763.y, nodeVar1763.x ) * vec3( 0.1031 ) ) );
												nodeVar1764 = ( nodeVar1764 + vec3( dot( nodeVar1764, ( nodeVar1764.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1765 = ( nodeVar1760 + vec2( 0.0, 1.0 ) );
												nodeVar1766 = fract( ( vec3( nodeVar1765.x, nodeVar1765.y, nodeVar1765.x ) * vec3( 0.1031 ) ) );
												nodeVar1766 = ( nodeVar1766 + vec3( dot( nodeVar1766, ( nodeVar1766.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1767 = ( nodeVar1760 + vec2( 1.0, 1.0 ) );
												nodeVar1768 = fract( ( vec3( nodeVar1767.x, nodeVar1767.y, nodeVar1767.x ) * vec3( 0.1031 ) ) );
												nodeVar1768 = ( nodeVar1768 + vec3( dot( nodeVar1768, ( nodeVar1768.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1740 = ( nodeVar1740 + ( nodeVar1741 * mix( mix( fract( ( ( nodeVar1762.x + nodeVar1762.y ) * nodeVar1762.z ) ), fract( ( ( nodeVar1764.x + nodeVar1764.y ) * nodeVar1764.z ) ), nodeVar1761.x ), mix( fract( ( ( nodeVar1766.x + nodeVar1766.y ) * nodeVar1766.z ) ), fract( ( ( nodeVar1768.x + nodeVar1768.y ) * nodeVar1768.z ) ), nodeVar1761.x ), nodeVar1761.y ) ) );
												nodeVar1739 = ( nodeVar1739 * vec2( 2.03 ) );
												nodeVar1741 = ( nodeVar1741 * 0.52 );
												nodeVar1769 = floor( nodeVar1739 );
												nodeVar1770 = fract( nodeVar1739 );
												nodeVar1770 = ( ( nodeVar1770 * nodeVar1770 ) * ( vec2( 3.0 ) - ( nodeVar1770 * vec2( 2.0 ) ) ) );
												nodeVar1771 = fract( ( vec3( nodeVar1769.x, nodeVar1769.y, nodeVar1769.x ) * vec3( 0.1031 ) ) );
												nodeVar1771 = ( nodeVar1771 + vec3( dot( nodeVar1771, ( nodeVar1771.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1772 = ( nodeVar1769 + vec2( 1.0, 0.0 ) );
												nodeVar1773 = fract( ( vec3( nodeVar1772.x, nodeVar1772.y, nodeVar1772.x ) * vec3( 0.1031 ) ) );
												nodeVar1773 = ( nodeVar1773 + vec3( dot( nodeVar1773, ( nodeVar1773.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1774 = ( nodeVar1769 + vec2( 0.0, 1.0 ) );
												nodeVar1775 = fract( ( vec3( nodeVar1774.x, nodeVar1774.y, nodeVar1774.x ) * vec3( 0.1031 ) ) );
												nodeVar1775 = ( nodeVar1775 + vec3( dot( nodeVar1775, ( nodeVar1775.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1776 = ( nodeVar1769 + vec2( 1.0, 1.0 ) );
												nodeVar1777 = fract( ( vec3( nodeVar1776.x, nodeVar1776.y, nodeVar1776.x ) * vec3( 0.1031 ) ) );
												nodeVar1777 = ( nodeVar1777 + vec3( dot( nodeVar1777, ( nodeVar1777.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1740 = ( nodeVar1740 + ( nodeVar1741 * mix( mix( fract( ( ( nodeVar1771.x + nodeVar1771.y ) * nodeVar1771.z ) ), fract( ( ( nodeVar1773.x + nodeVar1773.y ) * nodeVar1773.z ) ), nodeVar1770.x ), mix( fract( ( ( nodeVar1775.x + nodeVar1775.y ) * nodeVar1775.z ) ), fract( ( ( nodeVar1777.x + nodeVar1777.y ) * nodeVar1777.z ) ), nodeVar1770.x ), nodeVar1770.y ) ) );
												nodeVar1739 = ( nodeVar1739 * vec2( 2.03 ) );
												nodeVar1741 = ( nodeVar1741 * 0.52 );
												nodeVar1778 = ( ( nodeVar1701 * 0.62 ) + ( nodeVar1740 * 0.38 ) );
												nodeVar916 = vec3( ( ( nodeVar1778 * 0.52 ) + ( ( 0.5 + ( ( sin( ( nodeVar914.x * 1300.0 ) ) * sin( ( nodeVar914.y * 1300.0 ) ) ) * 0.5 ) ) * 0.055 ) ), 1.0, ( 0.34 + ( nodeVar1778 * 0.66 ) ) );
												

											} else {

												nodeVar1779 = ( nodeVar914 * vec2( 4.0 ) );
												nodeVar1780 = 0.0;
												nodeVar1781 = 0.5;
												nodeVar1782 = floor( nodeVar1779 );
												nodeVar1783 = fract( nodeVar1779 );
												nodeVar1783 = ( ( nodeVar1783 * nodeVar1783 ) * ( vec2( 3.0 ) - ( nodeVar1783 * vec2( 2.0 ) ) ) );
												nodeVar1784 = fract( ( vec3( nodeVar1782.x, nodeVar1782.y, nodeVar1782.x ) * vec3( 0.1031 ) ) );
												nodeVar1784 = ( nodeVar1784 + vec3( dot( nodeVar1784, ( nodeVar1784.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1785 = ( nodeVar1782 + vec2( 1.0, 0.0 ) );
												nodeVar1786 = fract( ( vec3( nodeVar1785.x, nodeVar1785.y, nodeVar1785.x ) * vec3( 0.1031 ) ) );
												nodeVar1786 = ( nodeVar1786 + vec3( dot( nodeVar1786, ( nodeVar1786.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1787 = ( nodeVar1782 + vec2( 0.0, 1.0 ) );
												nodeVar1788 = fract( ( vec3( nodeVar1787.x, nodeVar1787.y, nodeVar1787.x ) * vec3( 0.1031 ) ) );
												nodeVar1788 = ( nodeVar1788 + vec3( dot( nodeVar1788, ( nodeVar1788.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1789 = ( nodeVar1782 + vec2( 1.0, 1.0 ) );
												nodeVar1790 = fract( ( vec3( nodeVar1789.x, nodeVar1789.y, nodeVar1789.x ) * vec3( 0.1031 ) ) );
												nodeVar1790 = ( nodeVar1790 + vec3( dot( nodeVar1790, ( nodeVar1790.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1780 = ( nodeVar1780 + ( nodeVar1781 * mix( mix( fract( ( ( nodeVar1784.x + nodeVar1784.y ) * nodeVar1784.z ) ), fract( ( ( nodeVar1786.x + nodeVar1786.y ) * nodeVar1786.z ) ), nodeVar1783.x ), mix( fract( ( ( nodeVar1788.x + nodeVar1788.y ) * nodeVar1788.z ) ), fract( ( ( nodeVar1790.x + nodeVar1790.y ) * nodeVar1790.z ) ), nodeVar1783.x ), nodeVar1783.y ) ) );
												nodeVar1779 = ( nodeVar1779 * vec2( 2.03 ) );
												nodeVar1781 = ( nodeVar1781 * 0.52 );
												nodeVar1791 = floor( nodeVar1779 );
												nodeVar1792 = fract( nodeVar1779 );
												nodeVar1792 = ( ( nodeVar1792 * nodeVar1792 ) * ( vec2( 3.0 ) - ( nodeVar1792 * vec2( 2.0 ) ) ) );
												nodeVar1793 = fract( ( vec3( nodeVar1791.x, nodeVar1791.y, nodeVar1791.x ) * vec3( 0.1031 ) ) );
												nodeVar1793 = ( nodeVar1793 + vec3( dot( nodeVar1793, ( nodeVar1793.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1794 = ( nodeVar1791 + vec2( 1.0, 0.0 ) );
												nodeVar1795 = fract( ( vec3( nodeVar1794.x, nodeVar1794.y, nodeVar1794.x ) * vec3( 0.1031 ) ) );
												nodeVar1795 = ( nodeVar1795 + vec3( dot( nodeVar1795, ( nodeVar1795.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1796 = ( nodeVar1791 + vec2( 0.0, 1.0 ) );
												nodeVar1797 = fract( ( vec3( nodeVar1796.x, nodeVar1796.y, nodeVar1796.x ) * vec3( 0.1031 ) ) );
												nodeVar1797 = ( nodeVar1797 + vec3( dot( nodeVar1797, ( nodeVar1797.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1798 = ( nodeVar1791 + vec2( 1.0, 1.0 ) );
												nodeVar1799 = fract( ( vec3( nodeVar1798.x, nodeVar1798.y, nodeVar1798.x ) * vec3( 0.1031 ) ) );
												nodeVar1799 = ( nodeVar1799 + vec3( dot( nodeVar1799, ( nodeVar1799.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1780 = ( nodeVar1780 + ( nodeVar1781 * mix( mix( fract( ( ( nodeVar1793.x + nodeVar1793.y ) * nodeVar1793.z ) ), fract( ( ( nodeVar1795.x + nodeVar1795.y ) * nodeVar1795.z ) ), nodeVar1792.x ), mix( fract( ( ( nodeVar1797.x + nodeVar1797.y ) * nodeVar1797.z ) ), fract( ( ( nodeVar1799.x + nodeVar1799.y ) * nodeVar1799.z ) ), nodeVar1792.x ), nodeVar1792.y ) ) );
												nodeVar1779 = ( nodeVar1779 * vec2( 2.03 ) );
												nodeVar1781 = ( nodeVar1781 * 0.52 );
												nodeVar1800 = floor( nodeVar1779 );
												nodeVar1801 = fract( nodeVar1779 );
												nodeVar1801 = ( ( nodeVar1801 * nodeVar1801 ) * ( vec2( 3.0 ) - ( nodeVar1801 * vec2( 2.0 ) ) ) );
												nodeVar1802 = fract( ( vec3( nodeVar1800.x, nodeVar1800.y, nodeVar1800.x ) * vec3( 0.1031 ) ) );
												nodeVar1802 = ( nodeVar1802 + vec3( dot( nodeVar1802, ( nodeVar1802.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1803 = ( nodeVar1800 + vec2( 1.0, 0.0 ) );
												nodeVar1804 = fract( ( vec3( nodeVar1803.x, nodeVar1803.y, nodeVar1803.x ) * vec3( 0.1031 ) ) );
												nodeVar1804 = ( nodeVar1804 + vec3( dot( nodeVar1804, ( nodeVar1804.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1805 = ( nodeVar1800 + vec2( 0.0, 1.0 ) );
												nodeVar1806 = fract( ( vec3( nodeVar1805.x, nodeVar1805.y, nodeVar1805.x ) * vec3( 0.1031 ) ) );
												nodeVar1806 = ( nodeVar1806 + vec3( dot( nodeVar1806, ( nodeVar1806.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1807 = ( nodeVar1800 + vec2( 1.0, 1.0 ) );
												nodeVar1808 = fract( ( vec3( nodeVar1807.x, nodeVar1807.y, nodeVar1807.x ) * vec3( 0.1031 ) ) );
												nodeVar1808 = ( nodeVar1808 + vec3( dot( nodeVar1808, ( nodeVar1808.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1780 = ( nodeVar1780 + ( nodeVar1781 * mix( mix( fract( ( ( nodeVar1802.x + nodeVar1802.y ) * nodeVar1802.z ) ), fract( ( ( nodeVar1804.x + nodeVar1804.y ) * nodeVar1804.z ) ), nodeVar1801.x ), mix( fract( ( ( nodeVar1806.x + nodeVar1806.y ) * nodeVar1806.z ) ), fract( ( ( nodeVar1808.x + nodeVar1808.y ) * nodeVar1808.z ) ), nodeVar1801.x ), nodeVar1801.y ) ) );
												nodeVar1779 = ( nodeVar1779 * vec2( 2.03 ) );
												nodeVar1781 = ( nodeVar1781 * 0.52 );
												nodeVar1809 = floor( nodeVar1779 );
												nodeVar1810 = fract( nodeVar1779 );
												nodeVar1810 = ( ( nodeVar1810 * nodeVar1810 ) * ( vec2( 3.0 ) - ( nodeVar1810 * vec2( 2.0 ) ) ) );
												nodeVar1811 = fract( ( vec3( nodeVar1809.x, nodeVar1809.y, nodeVar1809.x ) * vec3( 0.1031 ) ) );
												nodeVar1811 = ( nodeVar1811 + vec3( dot( nodeVar1811, ( nodeVar1811.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1812 = ( nodeVar1809 + vec2( 1.0, 0.0 ) );
												nodeVar1813 = fract( ( vec3( nodeVar1812.x, nodeVar1812.y, nodeVar1812.x ) * vec3( 0.1031 ) ) );
												nodeVar1813 = ( nodeVar1813 + vec3( dot( nodeVar1813, ( nodeVar1813.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1814 = ( nodeVar1809 + vec2( 0.0, 1.0 ) );
												nodeVar1815 = fract( ( vec3( nodeVar1814.x, nodeVar1814.y, nodeVar1814.x ) * vec3( 0.1031 ) ) );
												nodeVar1815 = ( nodeVar1815 + vec3( dot( nodeVar1815, ( nodeVar1815.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1816 = ( nodeVar1809 + vec2( 1.0, 1.0 ) );
												nodeVar1817 = fract( ( vec3( nodeVar1816.x, nodeVar1816.y, nodeVar1816.x ) * vec3( 0.1031 ) ) );
												nodeVar1817 = ( nodeVar1817 + vec3( dot( nodeVar1817, ( nodeVar1817.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar1780 = ( nodeVar1780 + ( nodeVar1781 * mix( mix( fract( ( ( nodeVar1811.x + nodeVar1811.y ) * nodeVar1811.z ) ), fract( ( ( nodeVar1813.x + nodeVar1813.y ) * nodeVar1813.z ) ), nodeVar1810.x ), mix( fract( ( ( nodeVar1815.x + nodeVar1815.y ) * nodeVar1815.z ) ), fract( ( ( nodeVar1817.x + nodeVar1817.y ) * nodeVar1817.z ) ), nodeVar1810.x ), nodeVar1810.y ) ) );
												nodeVar1779 = ( nodeVar1779 * vec2( 2.03 ) );
												nodeVar1781 = ( nodeVar1781 * 0.52 );
												nodeVar1818 = nodeVar1780;
												nodeVar916 = vec3( nodeVar1818, 1.0, nodeVar1818 );
												

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

	nodeVar1819 = nodeVar916;
	nodeVar1820 = ( nodeVar6 + vec2( 0.0, nodeVar2 ) );
	nodeVar1821 = nodeVar8;
	nodeVar1822 = vec3( 0.0, 1.0, 0.5 );

	if ( ( nodeVar1821 < 0.5 ) ) {

		nodeVar1823 = floor( ( nodeVar1820.y / 0.225 ) );
		nodeVar1824 = fract( ( ( nodeVar1823 * 7.13 ) * 0.1031 ) );
		nodeVar1824 = ( nodeVar1824 * ( nodeVar1824 + 33.33 ) );
		nodeVar1824 = ( nodeVar1824 * ( nodeVar1824 + nodeVar1824 ) );
		nodeVar1825 = ( fract( nodeVar1824 ) * 0.9 );
		nodeVar1826 = fract( ( ( ( nodeVar1823 * 3.7 ) + 11.0 ) * 0.1031 ) );
		nodeVar1826 = ( nodeVar1826 * ( nodeVar1826 + 33.33 ) );
		nodeVar1826 = ( nodeVar1826 * ( nodeVar1826 + nodeVar1826 ) );
		nodeVar1827 = ( 0.42 + ( fract( nodeVar1826 ) * 0.42 ) );
		nodeVar1828 = fract( ( ( nodeVar1820.x + nodeVar1825 ) / nodeVar1827 ) );
		nodeVar1829 = fract( ( nodeVar1820.y / 0.225 ) );
		nodeVar1830 = min( ( min( nodeVar1828, ( 1.0 - nodeVar1828 ) ) * nodeVar1827 ), ( min( nodeVar1829, ( 1.0 - nodeVar1829 ) ) * 0.225 ) );
		nodeVar1831 = smoothstep( 0.0, 0.016, nodeVar1830 );
		nodeVar1832 = ( vec2( floor( ( ( nodeVar1820.x + nodeVar1825 ) / nodeVar1827 ) ), nodeVar1823 ) * vec2( 1.37 ) );
		nodeVar1833 = fract( ( vec3( nodeVar1832.x, nodeVar1832.y, nodeVar1832.x ) * vec3( 0.1031 ) ) );
		nodeVar1833 = ( nodeVar1833 + vec3( dot( nodeVar1833, ( nodeVar1833.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1834 = fract( ( ( nodeVar1833.x + nodeVar1833.y ) * nodeVar1833.z ) );
		nodeVar1835 = ( ( nodeVar1820 * vec2( 22.0 ) ) + vec2( ( nodeVar1834 * 30.0 ) ) );
		nodeVar1836 = 0.0;
		nodeVar1837 = 0.5;
		nodeVar1838 = floor( nodeVar1835 );
		nodeVar1839 = fract( nodeVar1835 );
		nodeVar1839 = ( ( nodeVar1839 * nodeVar1839 ) * ( vec2( 3.0 ) - ( nodeVar1839 * vec2( 2.0 ) ) ) );
		nodeVar1840 = fract( ( vec3( nodeVar1838.x, nodeVar1838.y, nodeVar1838.x ) * vec3( 0.1031 ) ) );
		nodeVar1840 = ( nodeVar1840 + vec3( dot( nodeVar1840, ( nodeVar1840.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1841 = ( nodeVar1838 + vec2( 1.0, 0.0 ) );
		nodeVar1842 = fract( ( vec3( nodeVar1841.x, nodeVar1841.y, nodeVar1841.x ) * vec3( 0.1031 ) ) );
		nodeVar1842 = ( nodeVar1842 + vec3( dot( nodeVar1842, ( nodeVar1842.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1843 = ( nodeVar1838 + vec2( 0.0, 1.0 ) );
		nodeVar1844 = fract( ( vec3( nodeVar1843.x, nodeVar1843.y, nodeVar1843.x ) * vec3( 0.1031 ) ) );
		nodeVar1844 = ( nodeVar1844 + vec3( dot( nodeVar1844, ( nodeVar1844.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1845 = ( nodeVar1838 + vec2( 1.0, 1.0 ) );
		nodeVar1846 = fract( ( vec3( nodeVar1845.x, nodeVar1845.y, nodeVar1845.x ) * vec3( 0.1031 ) ) );
		nodeVar1846 = ( nodeVar1846 + vec3( dot( nodeVar1846, ( nodeVar1846.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1836 = ( nodeVar1836 + ( nodeVar1837 * mix( mix( fract( ( ( nodeVar1840.x + nodeVar1840.y ) * nodeVar1840.z ) ), fract( ( ( nodeVar1842.x + nodeVar1842.y ) * nodeVar1842.z ) ), nodeVar1839.x ), mix( fract( ( ( nodeVar1844.x + nodeVar1844.y ) * nodeVar1844.z ) ), fract( ( ( nodeVar1846.x + nodeVar1846.y ) * nodeVar1846.z ) ), nodeVar1839.x ), nodeVar1839.y ) ) );
		nodeVar1835 = ( nodeVar1835 * vec2( 2.03 ) );
		nodeVar1837 = ( nodeVar1837 * 0.52 );
		nodeVar1847 = floor( nodeVar1835 );
		nodeVar1848 = fract( nodeVar1835 );
		nodeVar1848 = ( ( nodeVar1848 * nodeVar1848 ) * ( vec2( 3.0 ) - ( nodeVar1848 * vec2( 2.0 ) ) ) );
		nodeVar1849 = fract( ( vec3( nodeVar1847.x, nodeVar1847.y, nodeVar1847.x ) * vec3( 0.1031 ) ) );
		nodeVar1849 = ( nodeVar1849 + vec3( dot( nodeVar1849, ( nodeVar1849.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1850 = ( nodeVar1847 + vec2( 1.0, 0.0 ) );
		nodeVar1851 = fract( ( vec3( nodeVar1850.x, nodeVar1850.y, nodeVar1850.x ) * vec3( 0.1031 ) ) );
		nodeVar1851 = ( nodeVar1851 + vec3( dot( nodeVar1851, ( nodeVar1851.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1852 = ( nodeVar1847 + vec2( 0.0, 1.0 ) );
		nodeVar1853 = fract( ( vec3( nodeVar1852.x, nodeVar1852.y, nodeVar1852.x ) * vec3( 0.1031 ) ) );
		nodeVar1853 = ( nodeVar1853 + vec3( dot( nodeVar1853, ( nodeVar1853.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1854 = ( nodeVar1847 + vec2( 1.0, 1.0 ) );
		nodeVar1855 = fract( ( vec3( nodeVar1854.x, nodeVar1854.y, nodeVar1854.x ) * vec3( 0.1031 ) ) );
		nodeVar1855 = ( nodeVar1855 + vec3( dot( nodeVar1855, ( nodeVar1855.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1836 = ( nodeVar1836 + ( nodeVar1837 * mix( mix( fract( ( ( nodeVar1849.x + nodeVar1849.y ) * nodeVar1849.z ) ), fract( ( ( nodeVar1851.x + nodeVar1851.y ) * nodeVar1851.z ) ), nodeVar1848.x ), mix( fract( ( ( nodeVar1853.x + nodeVar1853.y ) * nodeVar1853.z ) ), fract( ( ( nodeVar1855.x + nodeVar1855.y ) * nodeVar1855.z ) ), nodeVar1848.x ), nodeVar1848.y ) ) );
		nodeVar1835 = ( nodeVar1835 * vec2( 2.03 ) );
		nodeVar1837 = ( nodeVar1837 * 0.52 );
		nodeVar1856 = floor( nodeVar1835 );
		nodeVar1857 = fract( nodeVar1835 );
		nodeVar1857 = ( ( nodeVar1857 * nodeVar1857 ) * ( vec2( 3.0 ) - ( nodeVar1857 * vec2( 2.0 ) ) ) );
		nodeVar1858 = fract( ( vec3( nodeVar1856.x, nodeVar1856.y, nodeVar1856.x ) * vec3( 0.1031 ) ) );
		nodeVar1858 = ( nodeVar1858 + vec3( dot( nodeVar1858, ( nodeVar1858.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1859 = ( nodeVar1856 + vec2( 1.0, 0.0 ) );
		nodeVar1860 = fract( ( vec3( nodeVar1859.x, nodeVar1859.y, nodeVar1859.x ) * vec3( 0.1031 ) ) );
		nodeVar1860 = ( nodeVar1860 + vec3( dot( nodeVar1860, ( nodeVar1860.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1861 = ( nodeVar1856 + vec2( 0.0, 1.0 ) );
		nodeVar1862 = fract( ( vec3( nodeVar1861.x, nodeVar1861.y, nodeVar1861.x ) * vec3( 0.1031 ) ) );
		nodeVar1862 = ( nodeVar1862 + vec3( dot( nodeVar1862, ( nodeVar1862.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1863 = ( nodeVar1856 + vec2( 1.0, 1.0 ) );
		nodeVar1864 = fract( ( vec3( nodeVar1863.x, nodeVar1863.y, nodeVar1863.x ) * vec3( 0.1031 ) ) );
		nodeVar1864 = ( nodeVar1864 + vec3( dot( nodeVar1864, ( nodeVar1864.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1836 = ( nodeVar1836 + ( nodeVar1837 * mix( mix( fract( ( ( nodeVar1858.x + nodeVar1858.y ) * nodeVar1858.z ) ), fract( ( ( nodeVar1860.x + nodeVar1860.y ) * nodeVar1860.z ) ), nodeVar1857.x ), mix( fract( ( ( nodeVar1862.x + nodeVar1862.y ) * nodeVar1862.z ) ), fract( ( ( nodeVar1864.x + nodeVar1864.y ) * nodeVar1864.z ) ), nodeVar1857.x ), nodeVar1857.y ) ) );
		nodeVar1835 = ( nodeVar1835 * vec2( 2.03 ) );
		nodeVar1837 = ( nodeVar1837 * 0.52 );
		nodeVar1865 = floor( nodeVar1835 );
		nodeVar1866 = fract( nodeVar1835 );
		nodeVar1866 = ( ( nodeVar1866 * nodeVar1866 ) * ( vec2( 3.0 ) - ( nodeVar1866 * vec2( 2.0 ) ) ) );
		nodeVar1867 = fract( ( vec3( nodeVar1865.x, nodeVar1865.y, nodeVar1865.x ) * vec3( 0.1031 ) ) );
		nodeVar1867 = ( nodeVar1867 + vec3( dot( nodeVar1867, ( nodeVar1867.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1868 = ( nodeVar1865 + vec2( 1.0, 0.0 ) );
		nodeVar1869 = fract( ( vec3( nodeVar1868.x, nodeVar1868.y, nodeVar1868.x ) * vec3( 0.1031 ) ) );
		nodeVar1869 = ( nodeVar1869 + vec3( dot( nodeVar1869, ( nodeVar1869.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1870 = ( nodeVar1865 + vec2( 0.0, 1.0 ) );
		nodeVar1871 = fract( ( vec3( nodeVar1870.x, nodeVar1870.y, nodeVar1870.x ) * vec3( 0.1031 ) ) );
		nodeVar1871 = ( nodeVar1871 + vec3( dot( nodeVar1871, ( nodeVar1871.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1872 = ( nodeVar1865 + vec2( 1.0, 1.0 ) );
		nodeVar1873 = fract( ( vec3( nodeVar1872.x, nodeVar1872.y, nodeVar1872.x ) * vec3( 0.1031 ) ) );
		nodeVar1873 = ( nodeVar1873 + vec3( dot( nodeVar1873, ( nodeVar1873.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar1836 = ( nodeVar1836 + ( nodeVar1837 * mix( mix( fract( ( ( nodeVar1867.x + nodeVar1867.y ) * nodeVar1867.z ) ), fract( ( ( nodeVar1869.x + nodeVar1869.y ) * nodeVar1869.z ) ), nodeVar1866.x ), mix( fract( ( ( nodeVar1871.x + nodeVar1871.y ) * nodeVar1871.z ) ), fract( ( ( nodeVar1873.x + nodeVar1873.y ) * nodeVar1873.z ) ), nodeVar1866.x ), nodeVar1866.y ) ) );
		nodeVar1835 = ( nodeVar1835 * vec2( 2.03 ) );
		nodeVar1837 = ( nodeVar1837 * 0.52 );
		nodeVar1822 = vec3( ( ( ( nodeVar1831 * ( 0.55 + ( nodeVar1834 * 0.45 ) ) ) * 0.55 ) + ( ( ( 0.55 + ( nodeVar1836 * 0.45 ) ) * 0.3 ) * nodeVar1831 ) ), nodeVar1831, nodeVar1834 );
		

	} else {


		if ( ( nodeVar1821 < 1.5 ) ) {

			nodeVar1874 = ( nodeVar1820 * vec2( 3.2 ) );
			nodeVar1875 = 0.0;
			nodeVar1876 = 0.5;
			nodeVar1877 = floor( nodeVar1874 );
			nodeVar1878 = fract( nodeVar1874 );
			nodeVar1878 = ( ( nodeVar1878 * nodeVar1878 ) * ( vec2( 3.0 ) - ( nodeVar1878 * vec2( 2.0 ) ) ) );
			nodeVar1879 = fract( ( vec3( nodeVar1877.x, nodeVar1877.y, nodeVar1877.x ) * vec3( 0.1031 ) ) );
			nodeVar1879 = ( nodeVar1879 + vec3( dot( nodeVar1879, ( nodeVar1879.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1880 = ( nodeVar1877 + vec2( 1.0, 0.0 ) );
			nodeVar1881 = fract( ( vec3( nodeVar1880.x, nodeVar1880.y, nodeVar1880.x ) * vec3( 0.1031 ) ) );
			nodeVar1881 = ( nodeVar1881 + vec3( dot( nodeVar1881, ( nodeVar1881.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1882 = ( nodeVar1877 + vec2( 0.0, 1.0 ) );
			nodeVar1883 = fract( ( vec3( nodeVar1882.x, nodeVar1882.y, nodeVar1882.x ) * vec3( 0.1031 ) ) );
			nodeVar1883 = ( nodeVar1883 + vec3( dot( nodeVar1883, ( nodeVar1883.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1884 = ( nodeVar1877 + vec2( 1.0, 1.0 ) );
			nodeVar1885 = fract( ( vec3( nodeVar1884.x, nodeVar1884.y, nodeVar1884.x ) * vec3( 0.1031 ) ) );
			nodeVar1885 = ( nodeVar1885 + vec3( dot( nodeVar1885, ( nodeVar1885.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1875 = ( nodeVar1875 + ( nodeVar1876 * mix( mix( fract( ( ( nodeVar1879.x + nodeVar1879.y ) * nodeVar1879.z ) ), fract( ( ( nodeVar1881.x + nodeVar1881.y ) * nodeVar1881.z ) ), nodeVar1878.x ), mix( fract( ( ( nodeVar1883.x + nodeVar1883.y ) * nodeVar1883.z ) ), fract( ( ( nodeVar1885.x + nodeVar1885.y ) * nodeVar1885.z ) ), nodeVar1878.x ), nodeVar1878.y ) ) );
			nodeVar1874 = ( nodeVar1874 * vec2( 2.03 ) );
			nodeVar1876 = ( nodeVar1876 * 0.52 );
			nodeVar1886 = floor( nodeVar1874 );
			nodeVar1887 = fract( nodeVar1874 );
			nodeVar1887 = ( ( nodeVar1887 * nodeVar1887 ) * ( vec2( 3.0 ) - ( nodeVar1887 * vec2( 2.0 ) ) ) );
			nodeVar1888 = fract( ( vec3( nodeVar1886.x, nodeVar1886.y, nodeVar1886.x ) * vec3( 0.1031 ) ) );
			nodeVar1888 = ( nodeVar1888 + vec3( dot( nodeVar1888, ( nodeVar1888.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1889 = ( nodeVar1886 + vec2( 1.0, 0.0 ) );
			nodeVar1890 = fract( ( vec3( nodeVar1889.x, nodeVar1889.y, nodeVar1889.x ) * vec3( 0.1031 ) ) );
			nodeVar1890 = ( nodeVar1890 + vec3( dot( nodeVar1890, ( nodeVar1890.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1891 = ( nodeVar1886 + vec2( 0.0, 1.0 ) );
			nodeVar1892 = fract( ( vec3( nodeVar1891.x, nodeVar1891.y, nodeVar1891.x ) * vec3( 0.1031 ) ) );
			nodeVar1892 = ( nodeVar1892 + vec3( dot( nodeVar1892, ( nodeVar1892.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1893 = ( nodeVar1886 + vec2( 1.0, 1.0 ) );
			nodeVar1894 = fract( ( vec3( nodeVar1893.x, nodeVar1893.y, nodeVar1893.x ) * vec3( 0.1031 ) ) );
			nodeVar1894 = ( nodeVar1894 + vec3( dot( nodeVar1894, ( nodeVar1894.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1875 = ( nodeVar1875 + ( nodeVar1876 * mix( mix( fract( ( ( nodeVar1888.x + nodeVar1888.y ) * nodeVar1888.z ) ), fract( ( ( nodeVar1890.x + nodeVar1890.y ) * nodeVar1890.z ) ), nodeVar1887.x ), mix( fract( ( ( nodeVar1892.x + nodeVar1892.y ) * nodeVar1892.z ) ), fract( ( ( nodeVar1894.x + nodeVar1894.y ) * nodeVar1894.z ) ), nodeVar1887.x ), nodeVar1887.y ) ) );
			nodeVar1874 = ( nodeVar1874 * vec2( 2.03 ) );
			nodeVar1876 = ( nodeVar1876 * 0.52 );
			nodeVar1895 = floor( nodeVar1874 );
			nodeVar1896 = fract( nodeVar1874 );
			nodeVar1896 = ( ( nodeVar1896 * nodeVar1896 ) * ( vec2( 3.0 ) - ( nodeVar1896 * vec2( 2.0 ) ) ) );
			nodeVar1897 = fract( ( vec3( nodeVar1895.x, nodeVar1895.y, nodeVar1895.x ) * vec3( 0.1031 ) ) );
			nodeVar1897 = ( nodeVar1897 + vec3( dot( nodeVar1897, ( nodeVar1897.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1898 = ( nodeVar1895 + vec2( 1.0, 0.0 ) );
			nodeVar1899 = fract( ( vec3( nodeVar1898.x, nodeVar1898.y, nodeVar1898.x ) * vec3( 0.1031 ) ) );
			nodeVar1899 = ( nodeVar1899 + vec3( dot( nodeVar1899, ( nodeVar1899.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1900 = ( nodeVar1895 + vec2( 0.0, 1.0 ) );
			nodeVar1901 = fract( ( vec3( nodeVar1900.x, nodeVar1900.y, nodeVar1900.x ) * vec3( 0.1031 ) ) );
			nodeVar1901 = ( nodeVar1901 + vec3( dot( nodeVar1901, ( nodeVar1901.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1902 = ( nodeVar1895 + vec2( 1.0, 1.0 ) );
			nodeVar1903 = fract( ( vec3( nodeVar1902.x, nodeVar1902.y, nodeVar1902.x ) * vec3( 0.1031 ) ) );
			nodeVar1903 = ( nodeVar1903 + vec3( dot( nodeVar1903, ( nodeVar1903.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1875 = ( nodeVar1875 + ( nodeVar1876 * mix( mix( fract( ( ( nodeVar1897.x + nodeVar1897.y ) * nodeVar1897.z ) ), fract( ( ( nodeVar1899.x + nodeVar1899.y ) * nodeVar1899.z ) ), nodeVar1896.x ), mix( fract( ( ( nodeVar1901.x + nodeVar1901.y ) * nodeVar1901.z ) ), fract( ( ( nodeVar1903.x + nodeVar1903.y ) * nodeVar1903.z ) ), nodeVar1896.x ), nodeVar1896.y ) ) );
			nodeVar1874 = ( nodeVar1874 * vec2( 2.03 ) );
			nodeVar1876 = ( nodeVar1876 * 0.52 );
			nodeVar1904 = floor( nodeVar1874 );
			nodeVar1905 = fract( nodeVar1874 );
			nodeVar1905 = ( ( nodeVar1905 * nodeVar1905 ) * ( vec2( 3.0 ) - ( nodeVar1905 * vec2( 2.0 ) ) ) );
			nodeVar1906 = fract( ( vec3( nodeVar1904.x, nodeVar1904.y, nodeVar1904.x ) * vec3( 0.1031 ) ) );
			nodeVar1906 = ( nodeVar1906 + vec3( dot( nodeVar1906, ( nodeVar1906.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1907 = ( nodeVar1904 + vec2( 1.0, 0.0 ) );
			nodeVar1908 = fract( ( vec3( nodeVar1907.x, nodeVar1907.y, nodeVar1907.x ) * vec3( 0.1031 ) ) );
			nodeVar1908 = ( nodeVar1908 + vec3( dot( nodeVar1908, ( nodeVar1908.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1909 = ( nodeVar1904 + vec2( 0.0, 1.0 ) );
			nodeVar1910 = fract( ( vec3( nodeVar1909.x, nodeVar1909.y, nodeVar1909.x ) * vec3( 0.1031 ) ) );
			nodeVar1910 = ( nodeVar1910 + vec3( dot( nodeVar1910, ( nodeVar1910.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1911 = ( nodeVar1904 + vec2( 1.0, 1.0 ) );
			nodeVar1912 = fract( ( vec3( nodeVar1911.x, nodeVar1911.y, nodeVar1911.x ) * vec3( 0.1031 ) ) );
			nodeVar1912 = ( nodeVar1912 + vec3( dot( nodeVar1912, ( nodeVar1912.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1875 = ( nodeVar1875 + ( nodeVar1876 * mix( mix( fract( ( ( nodeVar1906.x + nodeVar1906.y ) * nodeVar1906.z ) ), fract( ( ( nodeVar1908.x + nodeVar1908.y ) * nodeVar1908.z ) ), nodeVar1905.x ), mix( fract( ( ( nodeVar1910.x + nodeVar1910.y ) * nodeVar1910.z ) ), fract( ( ( nodeVar1912.x + nodeVar1912.y ) * nodeVar1912.z ) ), nodeVar1905.x ), nodeVar1905.y ) ) );
			nodeVar1874 = ( nodeVar1874 * vec2( 2.03 ) );
			nodeVar1876 = ( nodeVar1876 * 0.52 );
			nodeVar1913 = ( nodeVar1820 * vec2( 14.0 ) );
			nodeVar1914 = 0.0;
			nodeVar1915 = 0.5;
			nodeVar1916 = floor( nodeVar1913 );
			nodeVar1917 = fract( nodeVar1913 );
			nodeVar1917 = ( ( nodeVar1917 * nodeVar1917 ) * ( vec2( 3.0 ) - ( nodeVar1917 * vec2( 2.0 ) ) ) );
			nodeVar1918 = fract( ( vec3( nodeVar1916.x, nodeVar1916.y, nodeVar1916.x ) * vec3( 0.1031 ) ) );
			nodeVar1918 = ( nodeVar1918 + vec3( dot( nodeVar1918, ( nodeVar1918.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1919 = ( nodeVar1916 + vec2( 1.0, 0.0 ) );
			nodeVar1920 = fract( ( vec3( nodeVar1919.x, nodeVar1919.y, nodeVar1919.x ) * vec3( 0.1031 ) ) );
			nodeVar1920 = ( nodeVar1920 + vec3( dot( nodeVar1920, ( nodeVar1920.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1921 = ( nodeVar1916 + vec2( 0.0, 1.0 ) );
			nodeVar1922 = fract( ( vec3( nodeVar1921.x, nodeVar1921.y, nodeVar1921.x ) * vec3( 0.1031 ) ) );
			nodeVar1922 = ( nodeVar1922 + vec3( dot( nodeVar1922, ( nodeVar1922.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1923 = ( nodeVar1916 + vec2( 1.0, 1.0 ) );
			nodeVar1924 = fract( ( vec3( nodeVar1923.x, nodeVar1923.y, nodeVar1923.x ) * vec3( 0.1031 ) ) );
			nodeVar1924 = ( nodeVar1924 + vec3( dot( nodeVar1924, ( nodeVar1924.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1914 = ( nodeVar1914 + ( nodeVar1915 * mix( mix( fract( ( ( nodeVar1918.x + nodeVar1918.y ) * nodeVar1918.z ) ), fract( ( ( nodeVar1920.x + nodeVar1920.y ) * nodeVar1920.z ) ), nodeVar1917.x ), mix( fract( ( ( nodeVar1922.x + nodeVar1922.y ) * nodeVar1922.z ) ), fract( ( ( nodeVar1924.x + nodeVar1924.y ) * nodeVar1924.z ) ), nodeVar1917.x ), nodeVar1917.y ) ) );
			nodeVar1913 = ( nodeVar1913 * vec2( 2.03 ) );
			nodeVar1915 = ( nodeVar1915 * 0.52 );
			nodeVar1925 = floor( nodeVar1913 );
			nodeVar1926 = fract( nodeVar1913 );
			nodeVar1926 = ( ( nodeVar1926 * nodeVar1926 ) * ( vec2( 3.0 ) - ( nodeVar1926 * vec2( 2.0 ) ) ) );
			nodeVar1927 = fract( ( vec3( nodeVar1925.x, nodeVar1925.y, nodeVar1925.x ) * vec3( 0.1031 ) ) );
			nodeVar1927 = ( nodeVar1927 + vec3( dot( nodeVar1927, ( nodeVar1927.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1928 = ( nodeVar1925 + vec2( 1.0, 0.0 ) );
			nodeVar1929 = fract( ( vec3( nodeVar1928.x, nodeVar1928.y, nodeVar1928.x ) * vec3( 0.1031 ) ) );
			nodeVar1929 = ( nodeVar1929 + vec3( dot( nodeVar1929, ( nodeVar1929.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1930 = ( nodeVar1925 + vec2( 0.0, 1.0 ) );
			nodeVar1931 = fract( ( vec3( nodeVar1930.x, nodeVar1930.y, nodeVar1930.x ) * vec3( 0.1031 ) ) );
			nodeVar1931 = ( nodeVar1931 + vec3( dot( nodeVar1931, ( nodeVar1931.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1932 = ( nodeVar1925 + vec2( 1.0, 1.0 ) );
			nodeVar1933 = fract( ( vec3( nodeVar1932.x, nodeVar1932.y, nodeVar1932.x ) * vec3( 0.1031 ) ) );
			nodeVar1933 = ( nodeVar1933 + vec3( dot( nodeVar1933, ( nodeVar1933.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1914 = ( nodeVar1914 + ( nodeVar1915 * mix( mix( fract( ( ( nodeVar1927.x + nodeVar1927.y ) * nodeVar1927.z ) ), fract( ( ( nodeVar1929.x + nodeVar1929.y ) * nodeVar1929.z ) ), nodeVar1926.x ), mix( fract( ( ( nodeVar1931.x + nodeVar1931.y ) * nodeVar1931.z ) ), fract( ( ( nodeVar1933.x + nodeVar1933.y ) * nodeVar1933.z ) ), nodeVar1926.x ), nodeVar1926.y ) ) );
			nodeVar1913 = ( nodeVar1913 * vec2( 2.03 ) );
			nodeVar1915 = ( nodeVar1915 * 0.52 );
			nodeVar1934 = floor( nodeVar1913 );
			nodeVar1935 = fract( nodeVar1913 );
			nodeVar1935 = ( ( nodeVar1935 * nodeVar1935 ) * ( vec2( 3.0 ) - ( nodeVar1935 * vec2( 2.0 ) ) ) );
			nodeVar1936 = fract( ( vec3( nodeVar1934.x, nodeVar1934.y, nodeVar1934.x ) * vec3( 0.1031 ) ) );
			nodeVar1936 = ( nodeVar1936 + vec3( dot( nodeVar1936, ( nodeVar1936.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1937 = ( nodeVar1934 + vec2( 1.0, 0.0 ) );
			nodeVar1938 = fract( ( vec3( nodeVar1937.x, nodeVar1937.y, nodeVar1937.x ) * vec3( 0.1031 ) ) );
			nodeVar1938 = ( nodeVar1938 + vec3( dot( nodeVar1938, ( nodeVar1938.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1939 = ( nodeVar1934 + vec2( 0.0, 1.0 ) );
			nodeVar1940 = fract( ( vec3( nodeVar1939.x, nodeVar1939.y, nodeVar1939.x ) * vec3( 0.1031 ) ) );
			nodeVar1940 = ( nodeVar1940 + vec3( dot( nodeVar1940, ( nodeVar1940.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1941 = ( nodeVar1934 + vec2( 1.0, 1.0 ) );
			nodeVar1942 = fract( ( vec3( nodeVar1941.x, nodeVar1941.y, nodeVar1941.x ) * vec3( 0.1031 ) ) );
			nodeVar1942 = ( nodeVar1942 + vec3( dot( nodeVar1942, ( nodeVar1942.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1914 = ( nodeVar1914 + ( nodeVar1915 * mix( mix( fract( ( ( nodeVar1936.x + nodeVar1936.y ) * nodeVar1936.z ) ), fract( ( ( nodeVar1938.x + nodeVar1938.y ) * nodeVar1938.z ) ), nodeVar1935.x ), mix( fract( ( ( nodeVar1940.x + nodeVar1940.y ) * nodeVar1940.z ) ), fract( ( ( nodeVar1942.x + nodeVar1942.y ) * nodeVar1942.z ) ), nodeVar1935.x ), nodeVar1935.y ) ) );
			nodeVar1913 = ( nodeVar1913 * vec2( 2.03 ) );
			nodeVar1915 = ( nodeVar1915 * 0.52 );
			nodeVar1943 = floor( nodeVar1913 );
			nodeVar1944 = fract( nodeVar1913 );
			nodeVar1944 = ( ( nodeVar1944 * nodeVar1944 ) * ( vec2( 3.0 ) - ( nodeVar1944 * vec2( 2.0 ) ) ) );
			nodeVar1945 = fract( ( vec3( nodeVar1943.x, nodeVar1943.y, nodeVar1943.x ) * vec3( 0.1031 ) ) );
			nodeVar1945 = ( nodeVar1945 + vec3( dot( nodeVar1945, ( nodeVar1945.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1946 = ( nodeVar1943 + vec2( 1.0, 0.0 ) );
			nodeVar1947 = fract( ( vec3( nodeVar1946.x, nodeVar1946.y, nodeVar1946.x ) * vec3( 0.1031 ) ) );
			nodeVar1947 = ( nodeVar1947 + vec3( dot( nodeVar1947, ( nodeVar1947.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1948 = ( nodeVar1943 + vec2( 0.0, 1.0 ) );
			nodeVar1949 = fract( ( vec3( nodeVar1948.x, nodeVar1948.y, nodeVar1948.x ) * vec3( 0.1031 ) ) );
			nodeVar1949 = ( nodeVar1949 + vec3( dot( nodeVar1949, ( nodeVar1949.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1950 = ( nodeVar1943 + vec2( 1.0, 1.0 ) );
			nodeVar1951 = fract( ( vec3( nodeVar1950.x, nodeVar1950.y, nodeVar1950.x ) * vec3( 0.1031 ) ) );
			nodeVar1951 = ( nodeVar1951 + vec3( dot( nodeVar1951, ( nodeVar1951.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1914 = ( nodeVar1914 + ( nodeVar1915 * mix( mix( fract( ( ( nodeVar1945.x + nodeVar1945.y ) * nodeVar1945.z ) ), fract( ( ( nodeVar1947.x + nodeVar1947.y ) * nodeVar1947.z ) ), nodeVar1944.x ), mix( fract( ( ( nodeVar1949.x + nodeVar1949.y ) * nodeVar1949.z ) ), fract( ( ( nodeVar1951.x + nodeVar1951.y ) * nodeVar1951.z ) ), nodeVar1944.x ), nodeVar1944.y ) ) );
			nodeVar1913 = ( nodeVar1913 * vec2( 2.03 ) );
			nodeVar1915 = ( nodeVar1915 * 0.52 );
			nodeVar1952 = ( nodeVar1820 * vec2( 46.0 ) );
			nodeVar1953 = 0.0;
			nodeVar1954 = 0.5;
			nodeVar1955 = floor( nodeVar1952 );
			nodeVar1956 = fract( nodeVar1952 );
			nodeVar1956 = ( ( nodeVar1956 * nodeVar1956 ) * ( vec2( 3.0 ) - ( nodeVar1956 * vec2( 2.0 ) ) ) );
			nodeVar1957 = fract( ( vec3( nodeVar1955.x, nodeVar1955.y, nodeVar1955.x ) * vec3( 0.1031 ) ) );
			nodeVar1957 = ( nodeVar1957 + vec3( dot( nodeVar1957, ( nodeVar1957.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1958 = ( nodeVar1955 + vec2( 1.0, 0.0 ) );
			nodeVar1959 = fract( ( vec3( nodeVar1958.x, nodeVar1958.y, nodeVar1958.x ) * vec3( 0.1031 ) ) );
			nodeVar1959 = ( nodeVar1959 + vec3( dot( nodeVar1959, ( nodeVar1959.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1960 = ( nodeVar1955 + vec2( 0.0, 1.0 ) );
			nodeVar1961 = fract( ( vec3( nodeVar1960.x, nodeVar1960.y, nodeVar1960.x ) * vec3( 0.1031 ) ) );
			nodeVar1961 = ( nodeVar1961 + vec3( dot( nodeVar1961, ( nodeVar1961.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1962 = ( nodeVar1955 + vec2( 1.0, 1.0 ) );
			nodeVar1963 = fract( ( vec3( nodeVar1962.x, nodeVar1962.y, nodeVar1962.x ) * vec3( 0.1031 ) ) );
			nodeVar1963 = ( nodeVar1963 + vec3( dot( nodeVar1963, ( nodeVar1963.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1953 = ( nodeVar1953 + ( nodeVar1954 * mix( mix( fract( ( ( nodeVar1957.x + nodeVar1957.y ) * nodeVar1957.z ) ), fract( ( ( nodeVar1959.x + nodeVar1959.y ) * nodeVar1959.z ) ), nodeVar1956.x ), mix( fract( ( ( nodeVar1961.x + nodeVar1961.y ) * nodeVar1961.z ) ), fract( ( ( nodeVar1963.x + nodeVar1963.y ) * nodeVar1963.z ) ), nodeVar1956.x ), nodeVar1956.y ) ) );
			nodeVar1952 = ( nodeVar1952 * vec2( 2.03 ) );
			nodeVar1954 = ( nodeVar1954 * 0.52 );
			nodeVar1964 = floor( nodeVar1952 );
			nodeVar1965 = fract( nodeVar1952 );
			nodeVar1965 = ( ( nodeVar1965 * nodeVar1965 ) * ( vec2( 3.0 ) - ( nodeVar1965 * vec2( 2.0 ) ) ) );
			nodeVar1966 = fract( ( vec3( nodeVar1964.x, nodeVar1964.y, nodeVar1964.x ) * vec3( 0.1031 ) ) );
			nodeVar1966 = ( nodeVar1966 + vec3( dot( nodeVar1966, ( nodeVar1966.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1967 = ( nodeVar1964 + vec2( 1.0, 0.0 ) );
			nodeVar1968 = fract( ( vec3( nodeVar1967.x, nodeVar1967.y, nodeVar1967.x ) * vec3( 0.1031 ) ) );
			nodeVar1968 = ( nodeVar1968 + vec3( dot( nodeVar1968, ( nodeVar1968.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1969 = ( nodeVar1964 + vec2( 0.0, 1.0 ) );
			nodeVar1970 = fract( ( vec3( nodeVar1969.x, nodeVar1969.y, nodeVar1969.x ) * vec3( 0.1031 ) ) );
			nodeVar1970 = ( nodeVar1970 + vec3( dot( nodeVar1970, ( nodeVar1970.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1971 = ( nodeVar1964 + vec2( 1.0, 1.0 ) );
			nodeVar1972 = fract( ( vec3( nodeVar1971.x, nodeVar1971.y, nodeVar1971.x ) * vec3( 0.1031 ) ) );
			nodeVar1972 = ( nodeVar1972 + vec3( dot( nodeVar1972, ( nodeVar1972.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1953 = ( nodeVar1953 + ( nodeVar1954 * mix( mix( fract( ( ( nodeVar1966.x + nodeVar1966.y ) * nodeVar1966.z ) ), fract( ( ( nodeVar1968.x + nodeVar1968.y ) * nodeVar1968.z ) ), nodeVar1965.x ), mix( fract( ( ( nodeVar1970.x + nodeVar1970.y ) * nodeVar1970.z ) ), fract( ( ( nodeVar1972.x + nodeVar1972.y ) * nodeVar1972.z ) ), nodeVar1965.x ), nodeVar1965.y ) ) );
			nodeVar1952 = ( nodeVar1952 * vec2( 2.03 ) );
			nodeVar1954 = ( nodeVar1954 * 0.52 );
			nodeVar1973 = floor( nodeVar1952 );
			nodeVar1974 = fract( nodeVar1952 );
			nodeVar1974 = ( ( nodeVar1974 * nodeVar1974 ) * ( vec2( 3.0 ) - ( nodeVar1974 * vec2( 2.0 ) ) ) );
			nodeVar1975 = fract( ( vec3( nodeVar1973.x, nodeVar1973.y, nodeVar1973.x ) * vec3( 0.1031 ) ) );
			nodeVar1975 = ( nodeVar1975 + vec3( dot( nodeVar1975, ( nodeVar1975.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1976 = ( nodeVar1973 + vec2( 1.0, 0.0 ) );
			nodeVar1977 = fract( ( vec3( nodeVar1976.x, nodeVar1976.y, nodeVar1976.x ) * vec3( 0.1031 ) ) );
			nodeVar1977 = ( nodeVar1977 + vec3( dot( nodeVar1977, ( nodeVar1977.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1978 = ( nodeVar1973 + vec2( 0.0, 1.0 ) );
			nodeVar1979 = fract( ( vec3( nodeVar1978.x, nodeVar1978.y, nodeVar1978.x ) * vec3( 0.1031 ) ) );
			nodeVar1979 = ( nodeVar1979 + vec3( dot( nodeVar1979, ( nodeVar1979.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1980 = ( nodeVar1973 + vec2( 1.0, 1.0 ) );
			nodeVar1981 = fract( ( vec3( nodeVar1980.x, nodeVar1980.y, nodeVar1980.x ) * vec3( 0.1031 ) ) );
			nodeVar1981 = ( nodeVar1981 + vec3( dot( nodeVar1981, ( nodeVar1981.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1953 = ( nodeVar1953 + ( nodeVar1954 * mix( mix( fract( ( ( nodeVar1975.x + nodeVar1975.y ) * nodeVar1975.z ) ), fract( ( ( nodeVar1977.x + nodeVar1977.y ) * nodeVar1977.z ) ), nodeVar1974.x ), mix( fract( ( ( nodeVar1979.x + nodeVar1979.y ) * nodeVar1979.z ) ), fract( ( ( nodeVar1981.x + nodeVar1981.y ) * nodeVar1981.z ) ), nodeVar1974.x ), nodeVar1974.y ) ) );
			nodeVar1952 = ( nodeVar1952 * vec2( 2.03 ) );
			nodeVar1954 = ( nodeVar1954 * 0.52 );
			nodeVar1982 = floor( nodeVar1952 );
			nodeVar1983 = fract( nodeVar1952 );
			nodeVar1983 = ( ( nodeVar1983 * nodeVar1983 ) * ( vec2( 3.0 ) - ( nodeVar1983 * vec2( 2.0 ) ) ) );
			nodeVar1984 = fract( ( vec3( nodeVar1982.x, nodeVar1982.y, nodeVar1982.x ) * vec3( 0.1031 ) ) );
			nodeVar1984 = ( nodeVar1984 + vec3( dot( nodeVar1984, ( nodeVar1984.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1985 = ( nodeVar1982 + vec2( 1.0, 0.0 ) );
			nodeVar1986 = fract( ( vec3( nodeVar1985.x, nodeVar1985.y, nodeVar1985.x ) * vec3( 0.1031 ) ) );
			nodeVar1986 = ( nodeVar1986 + vec3( dot( nodeVar1986, ( nodeVar1986.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1987 = ( nodeVar1982 + vec2( 0.0, 1.0 ) );
			nodeVar1988 = fract( ( vec3( nodeVar1987.x, nodeVar1987.y, nodeVar1987.x ) * vec3( 0.1031 ) ) );
			nodeVar1988 = ( nodeVar1988 + vec3( dot( nodeVar1988, ( nodeVar1988.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1989 = ( nodeVar1982 + vec2( 1.0, 1.0 ) );
			nodeVar1990 = fract( ( vec3( nodeVar1989.x, nodeVar1989.y, nodeVar1989.x ) * vec3( 0.1031 ) ) );
			nodeVar1990 = ( nodeVar1990 + vec3( dot( nodeVar1990, ( nodeVar1990.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar1953 = ( nodeVar1953 + ( nodeVar1954 * mix( mix( fract( ( ( nodeVar1984.x + nodeVar1984.y ) * nodeVar1984.z ) ), fract( ( ( nodeVar1986.x + nodeVar1986.y ) * nodeVar1986.z ) ), nodeVar1983.x ), mix( fract( ( ( nodeVar1988.x + nodeVar1988.y ) * nodeVar1988.z ) ), fract( ( ( nodeVar1990.x + nodeVar1990.y ) * nodeVar1990.z ) ), nodeVar1983.x ), nodeVar1983.y ) ) );
			nodeVar1952 = ( nodeVar1952 * vec2( 2.03 ) );
			nodeVar1954 = ( nodeVar1954 * 0.52 );
			nodeVar1991 = ( ( ( nodeVar1875 * 0.55 ) + ( nodeVar1914 * 0.3 ) ) + ( nodeVar1953 * 0.15 ) );
			nodeVar1822 = vec3( nodeVar1991, ( 0.55 + ( nodeVar1991 * 0.45 ) ), nodeVar1991 );
			

		} else {


			if ( ( nodeVar1821 < 2.5 ) ) {

				nodeVar1992 = floor( ( nodeVar1820.y / 0.082 ) );
				nodeVar1993 = ( ( mod( nodeVar1992, 2.0 ) * 0.5 ) * 0.235 );
				nodeVar1994 = fract( ( ( nodeVar1820.x + nodeVar1993 ) / 0.235 ) );
				nodeVar1995 = fract( ( nodeVar1820.y / 0.082 ) );
				nodeVar1996 = min( ( min( nodeVar1994, ( 1.0 - nodeVar1994 ) ) * 0.235 ), ( min( nodeVar1995, ( 1.0 - nodeVar1995 ) ) * 0.082 ) );
				nodeVar1997 = smoothstep( 0.0, 0.011, nodeVar1996 );
				nodeVar1998 = ( vec2( floor( ( ( nodeVar1820.x + nodeVar1993 ) / 0.235 ) ), nodeVar1992 ) * vec2( 1.91 ) );
				nodeVar1999 = fract( ( vec3( nodeVar1998.x, nodeVar1998.y, nodeVar1998.x ) * vec3( 0.1031 ) ) );
				nodeVar1999 = ( nodeVar1999 + vec3( dot( nodeVar1999, ( nodeVar1999.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2000 = fract( ( ( nodeVar1999.x + nodeVar1999.y ) * nodeVar1999.z ) );
				nodeVar2001 = ( nodeVar1820 * vec2( 40.0 ) );
				nodeVar2002 = 0.0;
				nodeVar2003 = 0.5;
				nodeVar2004 = floor( nodeVar2001 );
				nodeVar2005 = fract( nodeVar2001 );
				nodeVar2005 = ( ( nodeVar2005 * nodeVar2005 ) * ( vec2( 3.0 ) - ( nodeVar2005 * vec2( 2.0 ) ) ) );
				nodeVar2006 = fract( ( vec3( nodeVar2004.x, nodeVar2004.y, nodeVar2004.x ) * vec3( 0.1031 ) ) );
				nodeVar2006 = ( nodeVar2006 + vec3( dot( nodeVar2006, ( nodeVar2006.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2007 = ( nodeVar2004 + vec2( 1.0, 0.0 ) );
				nodeVar2008 = fract( ( vec3( nodeVar2007.x, nodeVar2007.y, nodeVar2007.x ) * vec3( 0.1031 ) ) );
				nodeVar2008 = ( nodeVar2008 + vec3( dot( nodeVar2008, ( nodeVar2008.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2009 = ( nodeVar2004 + vec2( 0.0, 1.0 ) );
				nodeVar2010 = fract( ( vec3( nodeVar2009.x, nodeVar2009.y, nodeVar2009.x ) * vec3( 0.1031 ) ) );
				nodeVar2010 = ( nodeVar2010 + vec3( dot( nodeVar2010, ( nodeVar2010.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2011 = ( nodeVar2004 + vec2( 1.0, 1.0 ) );
				nodeVar2012 = fract( ( vec3( nodeVar2011.x, nodeVar2011.y, nodeVar2011.x ) * vec3( 0.1031 ) ) );
				nodeVar2012 = ( nodeVar2012 + vec3( dot( nodeVar2012, ( nodeVar2012.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2002 = ( nodeVar2002 + ( nodeVar2003 * mix( mix( fract( ( ( nodeVar2006.x + nodeVar2006.y ) * nodeVar2006.z ) ), fract( ( ( nodeVar2008.x + nodeVar2008.y ) * nodeVar2008.z ) ), nodeVar2005.x ), mix( fract( ( ( nodeVar2010.x + nodeVar2010.y ) * nodeVar2010.z ) ), fract( ( ( nodeVar2012.x + nodeVar2012.y ) * nodeVar2012.z ) ), nodeVar2005.x ), nodeVar2005.y ) ) );
				nodeVar2001 = ( nodeVar2001 * vec2( 2.03 ) );
				nodeVar2003 = ( nodeVar2003 * 0.52 );
				nodeVar2013 = floor( nodeVar2001 );
				nodeVar2014 = fract( nodeVar2001 );
				nodeVar2014 = ( ( nodeVar2014 * nodeVar2014 ) * ( vec2( 3.0 ) - ( nodeVar2014 * vec2( 2.0 ) ) ) );
				nodeVar2015 = fract( ( vec3( nodeVar2013.x, nodeVar2013.y, nodeVar2013.x ) * vec3( 0.1031 ) ) );
				nodeVar2015 = ( nodeVar2015 + vec3( dot( nodeVar2015, ( nodeVar2015.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2016 = ( nodeVar2013 + vec2( 1.0, 0.0 ) );
				nodeVar2017 = fract( ( vec3( nodeVar2016.x, nodeVar2016.y, nodeVar2016.x ) * vec3( 0.1031 ) ) );
				nodeVar2017 = ( nodeVar2017 + vec3( dot( nodeVar2017, ( nodeVar2017.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2018 = ( nodeVar2013 + vec2( 0.0, 1.0 ) );
				nodeVar2019 = fract( ( vec3( nodeVar2018.x, nodeVar2018.y, nodeVar2018.x ) * vec3( 0.1031 ) ) );
				nodeVar2019 = ( nodeVar2019 + vec3( dot( nodeVar2019, ( nodeVar2019.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2020 = ( nodeVar2013 + vec2( 1.0, 1.0 ) );
				nodeVar2021 = fract( ( vec3( nodeVar2020.x, nodeVar2020.y, nodeVar2020.x ) * vec3( 0.1031 ) ) );
				nodeVar2021 = ( nodeVar2021 + vec3( dot( nodeVar2021, ( nodeVar2021.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2002 = ( nodeVar2002 + ( nodeVar2003 * mix( mix( fract( ( ( nodeVar2015.x + nodeVar2015.y ) * nodeVar2015.z ) ), fract( ( ( nodeVar2017.x + nodeVar2017.y ) * nodeVar2017.z ) ), nodeVar2014.x ), mix( fract( ( ( nodeVar2019.x + nodeVar2019.y ) * nodeVar2019.z ) ), fract( ( ( nodeVar2021.x + nodeVar2021.y ) * nodeVar2021.z ) ), nodeVar2014.x ), nodeVar2014.y ) ) );
				nodeVar2001 = ( nodeVar2001 * vec2( 2.03 ) );
				nodeVar2003 = ( nodeVar2003 * 0.52 );
				nodeVar2022 = floor( nodeVar2001 );
				nodeVar2023 = fract( nodeVar2001 );
				nodeVar2023 = ( ( nodeVar2023 * nodeVar2023 ) * ( vec2( 3.0 ) - ( nodeVar2023 * vec2( 2.0 ) ) ) );
				nodeVar2024 = fract( ( vec3( nodeVar2022.x, nodeVar2022.y, nodeVar2022.x ) * vec3( 0.1031 ) ) );
				nodeVar2024 = ( nodeVar2024 + vec3( dot( nodeVar2024, ( nodeVar2024.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2025 = ( nodeVar2022 + vec2( 1.0, 0.0 ) );
				nodeVar2026 = fract( ( vec3( nodeVar2025.x, nodeVar2025.y, nodeVar2025.x ) * vec3( 0.1031 ) ) );
				nodeVar2026 = ( nodeVar2026 + vec3( dot( nodeVar2026, ( nodeVar2026.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2027 = ( nodeVar2022 + vec2( 0.0, 1.0 ) );
				nodeVar2028 = fract( ( vec3( nodeVar2027.x, nodeVar2027.y, nodeVar2027.x ) * vec3( 0.1031 ) ) );
				nodeVar2028 = ( nodeVar2028 + vec3( dot( nodeVar2028, ( nodeVar2028.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2029 = ( nodeVar2022 + vec2( 1.0, 1.0 ) );
				nodeVar2030 = fract( ( vec3( nodeVar2029.x, nodeVar2029.y, nodeVar2029.x ) * vec3( 0.1031 ) ) );
				nodeVar2030 = ( nodeVar2030 + vec3( dot( nodeVar2030, ( nodeVar2030.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2002 = ( nodeVar2002 + ( nodeVar2003 * mix( mix( fract( ( ( nodeVar2024.x + nodeVar2024.y ) * nodeVar2024.z ) ), fract( ( ( nodeVar2026.x + nodeVar2026.y ) * nodeVar2026.z ) ), nodeVar2023.x ), mix( fract( ( ( nodeVar2028.x + nodeVar2028.y ) * nodeVar2028.z ) ), fract( ( ( nodeVar2030.x + nodeVar2030.y ) * nodeVar2030.z ) ), nodeVar2023.x ), nodeVar2023.y ) ) );
				nodeVar2001 = ( nodeVar2001 * vec2( 2.03 ) );
				nodeVar2003 = ( nodeVar2003 * 0.52 );
				nodeVar2031 = floor( nodeVar2001 );
				nodeVar2032 = fract( nodeVar2001 );
				nodeVar2032 = ( ( nodeVar2032 * nodeVar2032 ) * ( vec2( 3.0 ) - ( nodeVar2032 * vec2( 2.0 ) ) ) );
				nodeVar2033 = fract( ( vec3( nodeVar2031.x, nodeVar2031.y, nodeVar2031.x ) * vec3( 0.1031 ) ) );
				nodeVar2033 = ( nodeVar2033 + vec3( dot( nodeVar2033, ( nodeVar2033.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2034 = ( nodeVar2031 + vec2( 1.0, 0.0 ) );
				nodeVar2035 = fract( ( vec3( nodeVar2034.x, nodeVar2034.y, nodeVar2034.x ) * vec3( 0.1031 ) ) );
				nodeVar2035 = ( nodeVar2035 + vec3( dot( nodeVar2035, ( nodeVar2035.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2036 = ( nodeVar2031 + vec2( 0.0, 1.0 ) );
				nodeVar2037 = fract( ( vec3( nodeVar2036.x, nodeVar2036.y, nodeVar2036.x ) * vec3( 0.1031 ) ) );
				nodeVar2037 = ( nodeVar2037 + vec3( dot( nodeVar2037, ( nodeVar2037.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2038 = ( nodeVar2031 + vec2( 1.0, 1.0 ) );
				nodeVar2039 = fract( ( vec3( nodeVar2038.x, nodeVar2038.y, nodeVar2038.x ) * vec3( 0.1031 ) ) );
				nodeVar2039 = ( nodeVar2039 + vec3( dot( nodeVar2039, ( nodeVar2039.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2002 = ( nodeVar2002 + ( nodeVar2003 * mix( mix( fract( ( ( nodeVar2033.x + nodeVar2033.y ) * nodeVar2033.z ) ), fract( ( ( nodeVar2035.x + nodeVar2035.y ) * nodeVar2035.z ) ), nodeVar2032.x ), mix( fract( ( ( nodeVar2037.x + nodeVar2037.y ) * nodeVar2037.z ) ), fract( ( ( nodeVar2039.x + nodeVar2039.y ) * nodeVar2039.z ) ), nodeVar2032.x ), nodeVar2032.y ) ) );
				nodeVar2001 = ( nodeVar2001 * vec2( 2.03 ) );
				nodeVar2003 = ( nodeVar2003 * 0.52 );
				nodeVar1822 = vec3( ( ( ( nodeVar1997 * ( 0.62 + ( nodeVar2000 * 0.38 ) ) ) * 0.72 ) + ( ( nodeVar2002 * 0.16 ) * nodeVar1997 ) ), nodeVar1997, nodeVar2000 );
				

			} else {


				if ( ( nodeVar1821 < 3.5 ) ) {

					nodeVar2040 = floor( ( nodeVar1820.y * 5.2 ) );
					nodeVar2041 = fract( ( nodeVar1820.y * 5.2 ) );
					nodeVar2042 = smoothstep( 0.0, 0.06, min( nodeVar2041, ( 1.0 - nodeVar2041 ) ) );
					nodeVar2043 = vec2( ( nodeVar1820.x * 2.2 ), ( nodeVar1820.y * 60.0 ) );
					nodeVar2044 = 0.0;
					nodeVar2045 = 0.5;
					nodeVar2046 = floor( nodeVar2043 );
					nodeVar2047 = fract( nodeVar2043 );
					nodeVar2047 = ( ( nodeVar2047 * nodeVar2047 ) * ( vec2( 3.0 ) - ( nodeVar2047 * vec2( 2.0 ) ) ) );
					nodeVar2048 = fract( ( vec3( nodeVar2046.x, nodeVar2046.y, nodeVar2046.x ) * vec3( 0.1031 ) ) );
					nodeVar2048 = ( nodeVar2048 + vec3( dot( nodeVar2048, ( nodeVar2048.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2049 = ( nodeVar2046 + vec2( 1.0, 0.0 ) );
					nodeVar2050 = fract( ( vec3( nodeVar2049.x, nodeVar2049.y, nodeVar2049.x ) * vec3( 0.1031 ) ) );
					nodeVar2050 = ( nodeVar2050 + vec3( dot( nodeVar2050, ( nodeVar2050.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2051 = ( nodeVar2046 + vec2( 0.0, 1.0 ) );
					nodeVar2052 = fract( ( vec3( nodeVar2051.x, nodeVar2051.y, nodeVar2051.x ) * vec3( 0.1031 ) ) );
					nodeVar2052 = ( nodeVar2052 + vec3( dot( nodeVar2052, ( nodeVar2052.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2053 = ( nodeVar2046 + vec2( 1.0, 1.0 ) );
					nodeVar2054 = fract( ( vec3( nodeVar2053.x, nodeVar2053.y, nodeVar2053.x ) * vec3( 0.1031 ) ) );
					nodeVar2054 = ( nodeVar2054 + vec3( dot( nodeVar2054, ( nodeVar2054.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2044 = ( nodeVar2044 + ( nodeVar2045 * mix( mix( fract( ( ( nodeVar2048.x + nodeVar2048.y ) * nodeVar2048.z ) ), fract( ( ( nodeVar2050.x + nodeVar2050.y ) * nodeVar2050.z ) ), nodeVar2047.x ), mix( fract( ( ( nodeVar2052.x + nodeVar2052.y ) * nodeVar2052.z ) ), fract( ( ( nodeVar2054.x + nodeVar2054.y ) * nodeVar2054.z ) ), nodeVar2047.x ), nodeVar2047.y ) ) );
					nodeVar2043 = ( nodeVar2043 * vec2( 2.03 ) );
					nodeVar2045 = ( nodeVar2045 * 0.52 );
					nodeVar2055 = floor( nodeVar2043 );
					nodeVar2056 = fract( nodeVar2043 );
					nodeVar2056 = ( ( nodeVar2056 * nodeVar2056 ) * ( vec2( 3.0 ) - ( nodeVar2056 * vec2( 2.0 ) ) ) );
					nodeVar2057 = fract( ( vec3( nodeVar2055.x, nodeVar2055.y, nodeVar2055.x ) * vec3( 0.1031 ) ) );
					nodeVar2057 = ( nodeVar2057 + vec3( dot( nodeVar2057, ( nodeVar2057.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2058 = ( nodeVar2055 + vec2( 1.0, 0.0 ) );
					nodeVar2059 = fract( ( vec3( nodeVar2058.x, nodeVar2058.y, nodeVar2058.x ) * vec3( 0.1031 ) ) );
					nodeVar2059 = ( nodeVar2059 + vec3( dot( nodeVar2059, ( nodeVar2059.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2060 = ( nodeVar2055 + vec2( 0.0, 1.0 ) );
					nodeVar2061 = fract( ( vec3( nodeVar2060.x, nodeVar2060.y, nodeVar2060.x ) * vec3( 0.1031 ) ) );
					nodeVar2061 = ( nodeVar2061 + vec3( dot( nodeVar2061, ( nodeVar2061.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2062 = ( nodeVar2055 + vec2( 1.0, 1.0 ) );
					nodeVar2063 = fract( ( vec3( nodeVar2062.x, nodeVar2062.y, nodeVar2062.x ) * vec3( 0.1031 ) ) );
					nodeVar2063 = ( nodeVar2063 + vec3( dot( nodeVar2063, ( nodeVar2063.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2044 = ( nodeVar2044 + ( nodeVar2045 * mix( mix( fract( ( ( nodeVar2057.x + nodeVar2057.y ) * nodeVar2057.z ) ), fract( ( ( nodeVar2059.x + nodeVar2059.y ) * nodeVar2059.z ) ), nodeVar2056.x ), mix( fract( ( ( nodeVar2061.x + nodeVar2061.y ) * nodeVar2061.z ) ), fract( ( ( nodeVar2063.x + nodeVar2063.y ) * nodeVar2063.z ) ), nodeVar2056.x ), nodeVar2056.y ) ) );
					nodeVar2043 = ( nodeVar2043 * vec2( 2.03 ) );
					nodeVar2045 = ( nodeVar2045 * 0.52 );
					nodeVar2064 = floor( nodeVar2043 );
					nodeVar2065 = fract( nodeVar2043 );
					nodeVar2065 = ( ( nodeVar2065 * nodeVar2065 ) * ( vec2( 3.0 ) - ( nodeVar2065 * vec2( 2.0 ) ) ) );
					nodeVar2066 = fract( ( vec3( nodeVar2064.x, nodeVar2064.y, nodeVar2064.x ) * vec3( 0.1031 ) ) );
					nodeVar2066 = ( nodeVar2066 + vec3( dot( nodeVar2066, ( nodeVar2066.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2067 = ( nodeVar2064 + vec2( 1.0, 0.0 ) );
					nodeVar2068 = fract( ( vec3( nodeVar2067.x, nodeVar2067.y, nodeVar2067.x ) * vec3( 0.1031 ) ) );
					nodeVar2068 = ( nodeVar2068 + vec3( dot( nodeVar2068, ( nodeVar2068.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2069 = ( nodeVar2064 + vec2( 0.0, 1.0 ) );
					nodeVar2070 = fract( ( vec3( nodeVar2069.x, nodeVar2069.y, nodeVar2069.x ) * vec3( 0.1031 ) ) );
					nodeVar2070 = ( nodeVar2070 + vec3( dot( nodeVar2070, ( nodeVar2070.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2071 = ( nodeVar2064 + vec2( 1.0, 1.0 ) );
					nodeVar2072 = fract( ( vec3( nodeVar2071.x, nodeVar2071.y, nodeVar2071.x ) * vec3( 0.1031 ) ) );
					nodeVar2072 = ( nodeVar2072 + vec3( dot( nodeVar2072, ( nodeVar2072.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2044 = ( nodeVar2044 + ( nodeVar2045 * mix( mix( fract( ( ( nodeVar2066.x + nodeVar2066.y ) * nodeVar2066.z ) ), fract( ( ( nodeVar2068.x + nodeVar2068.y ) * nodeVar2068.z ) ), nodeVar2065.x ), mix( fract( ( ( nodeVar2070.x + nodeVar2070.y ) * nodeVar2070.z ) ), fract( ( ( nodeVar2072.x + nodeVar2072.y ) * nodeVar2072.z ) ), nodeVar2065.x ), nodeVar2065.y ) ) );
					nodeVar2043 = ( nodeVar2043 * vec2( 2.03 ) );
					nodeVar2045 = ( nodeVar2045 * 0.52 );
					nodeVar2073 = floor( nodeVar2043 );
					nodeVar2074 = fract( nodeVar2043 );
					nodeVar2074 = ( ( nodeVar2074 * nodeVar2074 ) * ( vec2( 3.0 ) - ( nodeVar2074 * vec2( 2.0 ) ) ) );
					nodeVar2075 = fract( ( vec3( nodeVar2073.x, nodeVar2073.y, nodeVar2073.x ) * vec3( 0.1031 ) ) );
					nodeVar2075 = ( nodeVar2075 + vec3( dot( nodeVar2075, ( nodeVar2075.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2076 = ( nodeVar2073 + vec2( 1.0, 0.0 ) );
					nodeVar2077 = fract( ( vec3( nodeVar2076.x, nodeVar2076.y, nodeVar2076.x ) * vec3( 0.1031 ) ) );
					nodeVar2077 = ( nodeVar2077 + vec3( dot( nodeVar2077, ( nodeVar2077.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2078 = ( nodeVar2073 + vec2( 0.0, 1.0 ) );
					nodeVar2079 = fract( ( vec3( nodeVar2078.x, nodeVar2078.y, nodeVar2078.x ) * vec3( 0.1031 ) ) );
					nodeVar2079 = ( nodeVar2079 + vec3( dot( nodeVar2079, ( nodeVar2079.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2080 = ( nodeVar2073 + vec2( 1.0, 1.0 ) );
					nodeVar2081 = fract( ( vec3( nodeVar2080.x, nodeVar2080.y, nodeVar2080.x ) * vec3( 0.1031 ) ) );
					nodeVar2081 = ( nodeVar2081 + vec3( dot( nodeVar2081, ( nodeVar2081.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2044 = ( nodeVar2044 + ( nodeVar2045 * mix( mix( fract( ( ( nodeVar2075.x + nodeVar2075.y ) * nodeVar2075.z ) ), fract( ( ( nodeVar2077.x + nodeVar2077.y ) * nodeVar2077.z ) ), nodeVar2074.x ), mix( fract( ( ( nodeVar2079.x + nodeVar2079.y ) * nodeVar2079.z ) ), fract( ( ( nodeVar2081.x + nodeVar2081.y ) * nodeVar2081.z ) ), nodeVar2074.x ), nodeVar2074.y ) ) );
					nodeVar2043 = ( nodeVar2043 * vec2( 2.03 ) );
					nodeVar2045 = ( nodeVar2045 * 0.52 );
					nodeVar2082 = nodeVar2044;
					nodeVar2083 = fract( ( ( nodeVar2040 * 5.1 ) * 0.1031 ) );
					nodeVar2083 = ( nodeVar2083 * ( nodeVar2083 + 33.33 ) );
					nodeVar2083 = ( nodeVar2083 * ( nodeVar2083 + nodeVar2083 ) );
					nodeVar1822 = vec3( ( ( ( nodeVar2042 * ( 0.6 + ( nodeVar2082 * 0.4 ) ) ) * 0.5 ) + ( ( fract( nodeVar2083 ) * 0.12 ) * nodeVar2042 ) ), nodeVar2042, nodeVar2082 );
					

				} else {


					if ( ( nodeVar1821 < 4.5 ) ) {

						nodeVar2084 = floor( ( nodeVar1820.y / 0.45 ) );
						nodeVar2085 = fract( ( ( nodeVar2084 * 4.7 ) * 0.1031 ) );
						nodeVar2085 = ( nodeVar2085 * ( nodeVar2085 + 33.33 ) );
						nodeVar2085 = ( nodeVar2085 * ( nodeVar2085 + nodeVar2085 ) );
						nodeVar2086 = ( ( ( mod( nodeVar2084, 2.0 ) * 0.5 ) * 0.9 ) + ( fract( nodeVar2085 ) * 0.18 ) );
						nodeVar2087 = fract( ( ( nodeVar1820.x + nodeVar2086 ) / 0.9 ) );
						nodeVar2088 = fract( ( nodeVar1820.y / 0.45 ) );
						nodeVar2089 = min( ( min( nodeVar2087, ( 1.0 - nodeVar2087 ) ) * 0.9 ), ( min( nodeVar2088, ( 1.0 - nodeVar2088 ) ) * 0.45 ) );
						nodeVar2090 = smoothstep( 0.0, 0.006, nodeVar2089 );
						nodeVar2091 = vec2( ( nodeVar1820.x * 2.2 ), ( nodeVar1820.y * 16.0 ) );
						nodeVar2092 = 0.0;
						nodeVar2093 = 0.5;
						nodeVar2094 = floor( nodeVar2091 );
						nodeVar2095 = fract( nodeVar2091 );
						nodeVar2095 = ( ( nodeVar2095 * nodeVar2095 ) * ( vec2( 3.0 ) - ( nodeVar2095 * vec2( 2.0 ) ) ) );
						nodeVar2096 = fract( ( vec3( nodeVar2094.x, nodeVar2094.y, nodeVar2094.x ) * vec3( 0.1031 ) ) );
						nodeVar2096 = ( nodeVar2096 + vec3( dot( nodeVar2096, ( nodeVar2096.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2097 = ( nodeVar2094 + vec2( 1.0, 0.0 ) );
						nodeVar2098 = fract( ( vec3( nodeVar2097.x, nodeVar2097.y, nodeVar2097.x ) * vec3( 0.1031 ) ) );
						nodeVar2098 = ( nodeVar2098 + vec3( dot( nodeVar2098, ( nodeVar2098.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2099 = ( nodeVar2094 + vec2( 0.0, 1.0 ) );
						nodeVar2100 = fract( ( vec3( nodeVar2099.x, nodeVar2099.y, nodeVar2099.x ) * vec3( 0.1031 ) ) );
						nodeVar2100 = ( nodeVar2100 + vec3( dot( nodeVar2100, ( nodeVar2100.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2101 = ( nodeVar2094 + vec2( 1.0, 1.0 ) );
						nodeVar2102 = fract( ( vec3( nodeVar2101.x, nodeVar2101.y, nodeVar2101.x ) * vec3( 0.1031 ) ) );
						nodeVar2102 = ( nodeVar2102 + vec3( dot( nodeVar2102, ( nodeVar2102.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2092 = ( nodeVar2092 + ( nodeVar2093 * mix( mix( fract( ( ( nodeVar2096.x + nodeVar2096.y ) * nodeVar2096.z ) ), fract( ( ( nodeVar2098.x + nodeVar2098.y ) * nodeVar2098.z ) ), nodeVar2095.x ), mix( fract( ( ( nodeVar2100.x + nodeVar2100.y ) * nodeVar2100.z ) ), fract( ( ( nodeVar2102.x + nodeVar2102.y ) * nodeVar2102.z ) ), nodeVar2095.x ), nodeVar2095.y ) ) );
						nodeVar2091 = ( nodeVar2091 * vec2( 2.03 ) );
						nodeVar2093 = ( nodeVar2093 * 0.52 );
						nodeVar2103 = floor( nodeVar2091 );
						nodeVar2104 = fract( nodeVar2091 );
						nodeVar2104 = ( ( nodeVar2104 * nodeVar2104 ) * ( vec2( 3.0 ) - ( nodeVar2104 * vec2( 2.0 ) ) ) );
						nodeVar2105 = fract( ( vec3( nodeVar2103.x, nodeVar2103.y, nodeVar2103.x ) * vec3( 0.1031 ) ) );
						nodeVar2105 = ( nodeVar2105 + vec3( dot( nodeVar2105, ( nodeVar2105.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2106 = ( nodeVar2103 + vec2( 1.0, 0.0 ) );
						nodeVar2107 = fract( ( vec3( nodeVar2106.x, nodeVar2106.y, nodeVar2106.x ) * vec3( 0.1031 ) ) );
						nodeVar2107 = ( nodeVar2107 + vec3( dot( nodeVar2107, ( nodeVar2107.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2108 = ( nodeVar2103 + vec2( 0.0, 1.0 ) );
						nodeVar2109 = fract( ( vec3( nodeVar2108.x, nodeVar2108.y, nodeVar2108.x ) * vec3( 0.1031 ) ) );
						nodeVar2109 = ( nodeVar2109 + vec3( dot( nodeVar2109, ( nodeVar2109.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2110 = ( nodeVar2103 + vec2( 1.0, 1.0 ) );
						nodeVar2111 = fract( ( vec3( nodeVar2110.x, nodeVar2110.y, nodeVar2110.x ) * vec3( 0.1031 ) ) );
						nodeVar2111 = ( nodeVar2111 + vec3( dot( nodeVar2111, ( nodeVar2111.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2092 = ( nodeVar2092 + ( nodeVar2093 * mix( mix( fract( ( ( nodeVar2105.x + nodeVar2105.y ) * nodeVar2105.z ) ), fract( ( ( nodeVar2107.x + nodeVar2107.y ) * nodeVar2107.z ) ), nodeVar2104.x ), mix( fract( ( ( nodeVar2109.x + nodeVar2109.y ) * nodeVar2109.z ) ), fract( ( ( nodeVar2111.x + nodeVar2111.y ) * nodeVar2111.z ) ), nodeVar2104.x ), nodeVar2104.y ) ) );
						nodeVar2091 = ( nodeVar2091 * vec2( 2.03 ) );
						nodeVar2093 = ( nodeVar2093 * 0.52 );
						nodeVar2112 = floor( nodeVar2091 );
						nodeVar2113 = fract( nodeVar2091 );
						nodeVar2113 = ( ( nodeVar2113 * nodeVar2113 ) * ( vec2( 3.0 ) - ( nodeVar2113 * vec2( 2.0 ) ) ) );
						nodeVar2114 = fract( ( vec3( nodeVar2112.x, nodeVar2112.y, nodeVar2112.x ) * vec3( 0.1031 ) ) );
						nodeVar2114 = ( nodeVar2114 + vec3( dot( nodeVar2114, ( nodeVar2114.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2115 = ( nodeVar2112 + vec2( 1.0, 0.0 ) );
						nodeVar2116 = fract( ( vec3( nodeVar2115.x, nodeVar2115.y, nodeVar2115.x ) * vec3( 0.1031 ) ) );
						nodeVar2116 = ( nodeVar2116 + vec3( dot( nodeVar2116, ( nodeVar2116.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2117 = ( nodeVar2112 + vec2( 0.0, 1.0 ) );
						nodeVar2118 = fract( ( vec3( nodeVar2117.x, nodeVar2117.y, nodeVar2117.x ) * vec3( 0.1031 ) ) );
						nodeVar2118 = ( nodeVar2118 + vec3( dot( nodeVar2118, ( nodeVar2118.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2119 = ( nodeVar2112 + vec2( 1.0, 1.0 ) );
						nodeVar2120 = fract( ( vec3( nodeVar2119.x, nodeVar2119.y, nodeVar2119.x ) * vec3( 0.1031 ) ) );
						nodeVar2120 = ( nodeVar2120 + vec3( dot( nodeVar2120, ( nodeVar2120.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2092 = ( nodeVar2092 + ( nodeVar2093 * mix( mix( fract( ( ( nodeVar2114.x + nodeVar2114.y ) * nodeVar2114.z ) ), fract( ( ( nodeVar2116.x + nodeVar2116.y ) * nodeVar2116.z ) ), nodeVar2113.x ), mix( fract( ( ( nodeVar2118.x + nodeVar2118.y ) * nodeVar2118.z ) ), fract( ( ( nodeVar2120.x + nodeVar2120.y ) * nodeVar2120.z ) ), nodeVar2113.x ), nodeVar2113.y ) ) );
						nodeVar2091 = ( nodeVar2091 * vec2( 2.03 ) );
						nodeVar2093 = ( nodeVar2093 * 0.52 );
						nodeVar2121 = floor( nodeVar2091 );
						nodeVar2122 = fract( nodeVar2091 );
						nodeVar2122 = ( ( nodeVar2122 * nodeVar2122 ) * ( vec2( 3.0 ) - ( nodeVar2122 * vec2( 2.0 ) ) ) );
						nodeVar2123 = fract( ( vec3( nodeVar2121.x, nodeVar2121.y, nodeVar2121.x ) * vec3( 0.1031 ) ) );
						nodeVar2123 = ( nodeVar2123 + vec3( dot( nodeVar2123, ( nodeVar2123.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2124 = ( nodeVar2121 + vec2( 1.0, 0.0 ) );
						nodeVar2125 = fract( ( vec3( nodeVar2124.x, nodeVar2124.y, nodeVar2124.x ) * vec3( 0.1031 ) ) );
						nodeVar2125 = ( nodeVar2125 + vec3( dot( nodeVar2125, ( nodeVar2125.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2126 = ( nodeVar2121 + vec2( 0.0, 1.0 ) );
						nodeVar2127 = fract( ( vec3( nodeVar2126.x, nodeVar2126.y, nodeVar2126.x ) * vec3( 0.1031 ) ) );
						nodeVar2127 = ( nodeVar2127 + vec3( dot( nodeVar2127, ( nodeVar2127.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2128 = ( nodeVar2121 + vec2( 1.0, 1.0 ) );
						nodeVar2129 = fract( ( vec3( nodeVar2128.x, nodeVar2128.y, nodeVar2128.x ) * vec3( 0.1031 ) ) );
						nodeVar2129 = ( nodeVar2129 + vec3( dot( nodeVar2129, ( nodeVar2129.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2092 = ( nodeVar2092 + ( nodeVar2093 * mix( mix( fract( ( ( nodeVar2123.x + nodeVar2123.y ) * nodeVar2123.z ) ), fract( ( ( nodeVar2125.x + nodeVar2125.y ) * nodeVar2125.z ) ), nodeVar2122.x ), mix( fract( ( ( nodeVar2127.x + nodeVar2127.y ) * nodeVar2127.z ) ), fract( ( ( nodeVar2129.x + nodeVar2129.y ) * nodeVar2129.z ) ), nodeVar2122.x ), nodeVar2122.y ) ) );
						nodeVar2091 = ( nodeVar2091 * vec2( 2.03 ) );
						nodeVar2093 = ( nodeVar2093 * 0.52 );
						nodeVar2130 = nodeVar2092;
						nodeVar2131 = ( vec2( floor( ( ( nodeVar1820.x + nodeVar2086 ) / 0.9 ) ), nodeVar2084 ) * vec2( 1.61 ) );
						nodeVar2132 = fract( ( vec3( nodeVar2131.x, nodeVar2131.y, nodeVar2131.x ) * vec3( 0.1031 ) ) );
						nodeVar2132 = ( nodeVar2132 + vec3( dot( nodeVar2132, ( nodeVar2132.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2133 = fract( ( ( nodeVar2132.x + nodeVar2132.y ) * nodeVar2132.z ) );
						nodeVar2134 = ( nodeVar1820 * vec2( 26.0 ) );
						nodeVar2135 = 0.0;
						nodeVar2136 = 0.5;
						nodeVar2137 = floor( nodeVar2134 );
						nodeVar2138 = fract( nodeVar2134 );
						nodeVar2138 = ( ( nodeVar2138 * nodeVar2138 ) * ( vec2( 3.0 ) - ( nodeVar2138 * vec2( 2.0 ) ) ) );
						nodeVar2139 = fract( ( vec3( nodeVar2137.x, nodeVar2137.y, nodeVar2137.x ) * vec3( 0.1031 ) ) );
						nodeVar2139 = ( nodeVar2139 + vec3( dot( nodeVar2139, ( nodeVar2139.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2140 = ( nodeVar2137 + vec2( 1.0, 0.0 ) );
						nodeVar2141 = fract( ( vec3( nodeVar2140.x, nodeVar2140.y, nodeVar2140.x ) * vec3( 0.1031 ) ) );
						nodeVar2141 = ( nodeVar2141 + vec3( dot( nodeVar2141, ( nodeVar2141.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2142 = ( nodeVar2137 + vec2( 0.0, 1.0 ) );
						nodeVar2143 = fract( ( vec3( nodeVar2142.x, nodeVar2142.y, nodeVar2142.x ) * vec3( 0.1031 ) ) );
						nodeVar2143 = ( nodeVar2143 + vec3( dot( nodeVar2143, ( nodeVar2143.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2144 = ( nodeVar2137 + vec2( 1.0, 1.0 ) );
						nodeVar2145 = fract( ( vec3( nodeVar2144.x, nodeVar2144.y, nodeVar2144.x ) * vec3( 0.1031 ) ) );
						nodeVar2145 = ( nodeVar2145 + vec3( dot( nodeVar2145, ( nodeVar2145.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2135 = ( nodeVar2135 + ( nodeVar2136 * mix( mix( fract( ( ( nodeVar2139.x + nodeVar2139.y ) * nodeVar2139.z ) ), fract( ( ( nodeVar2141.x + nodeVar2141.y ) * nodeVar2141.z ) ), nodeVar2138.x ), mix( fract( ( ( nodeVar2143.x + nodeVar2143.y ) * nodeVar2143.z ) ), fract( ( ( nodeVar2145.x + nodeVar2145.y ) * nodeVar2145.z ) ), nodeVar2138.x ), nodeVar2138.y ) ) );
						nodeVar2134 = ( nodeVar2134 * vec2( 2.03 ) );
						nodeVar2136 = ( nodeVar2136 * 0.52 );
						nodeVar2146 = floor( nodeVar2134 );
						nodeVar2147 = fract( nodeVar2134 );
						nodeVar2147 = ( ( nodeVar2147 * nodeVar2147 ) * ( vec2( 3.0 ) - ( nodeVar2147 * vec2( 2.0 ) ) ) );
						nodeVar2148 = fract( ( vec3( nodeVar2146.x, nodeVar2146.y, nodeVar2146.x ) * vec3( 0.1031 ) ) );
						nodeVar2148 = ( nodeVar2148 + vec3( dot( nodeVar2148, ( nodeVar2148.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2149 = ( nodeVar2146 + vec2( 1.0, 0.0 ) );
						nodeVar2150 = fract( ( vec3( nodeVar2149.x, nodeVar2149.y, nodeVar2149.x ) * vec3( 0.1031 ) ) );
						nodeVar2150 = ( nodeVar2150 + vec3( dot( nodeVar2150, ( nodeVar2150.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2151 = ( nodeVar2146 + vec2( 0.0, 1.0 ) );
						nodeVar2152 = fract( ( vec3( nodeVar2151.x, nodeVar2151.y, nodeVar2151.x ) * vec3( 0.1031 ) ) );
						nodeVar2152 = ( nodeVar2152 + vec3( dot( nodeVar2152, ( nodeVar2152.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2153 = ( nodeVar2146 + vec2( 1.0, 1.0 ) );
						nodeVar2154 = fract( ( vec3( nodeVar2153.x, nodeVar2153.y, nodeVar2153.x ) * vec3( 0.1031 ) ) );
						nodeVar2154 = ( nodeVar2154 + vec3( dot( nodeVar2154, ( nodeVar2154.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2135 = ( nodeVar2135 + ( nodeVar2136 * mix( mix( fract( ( ( nodeVar2148.x + nodeVar2148.y ) * nodeVar2148.z ) ), fract( ( ( nodeVar2150.x + nodeVar2150.y ) * nodeVar2150.z ) ), nodeVar2147.x ), mix( fract( ( ( nodeVar2152.x + nodeVar2152.y ) * nodeVar2152.z ) ), fract( ( ( nodeVar2154.x + nodeVar2154.y ) * nodeVar2154.z ) ), nodeVar2147.x ), nodeVar2147.y ) ) );
						nodeVar2134 = ( nodeVar2134 * vec2( 2.03 ) );
						nodeVar2136 = ( nodeVar2136 * 0.52 );
						nodeVar2155 = floor( nodeVar2134 );
						nodeVar2156 = fract( nodeVar2134 );
						nodeVar2156 = ( ( nodeVar2156 * nodeVar2156 ) * ( vec2( 3.0 ) - ( nodeVar2156 * vec2( 2.0 ) ) ) );
						nodeVar2157 = fract( ( vec3( nodeVar2155.x, nodeVar2155.y, nodeVar2155.x ) * vec3( 0.1031 ) ) );
						nodeVar2157 = ( nodeVar2157 + vec3( dot( nodeVar2157, ( nodeVar2157.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2158 = ( nodeVar2155 + vec2( 1.0, 0.0 ) );
						nodeVar2159 = fract( ( vec3( nodeVar2158.x, nodeVar2158.y, nodeVar2158.x ) * vec3( 0.1031 ) ) );
						nodeVar2159 = ( nodeVar2159 + vec3( dot( nodeVar2159, ( nodeVar2159.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2160 = ( nodeVar2155 + vec2( 0.0, 1.0 ) );
						nodeVar2161 = fract( ( vec3( nodeVar2160.x, nodeVar2160.y, nodeVar2160.x ) * vec3( 0.1031 ) ) );
						nodeVar2161 = ( nodeVar2161 + vec3( dot( nodeVar2161, ( nodeVar2161.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2162 = ( nodeVar2155 + vec2( 1.0, 1.0 ) );
						nodeVar2163 = fract( ( vec3( nodeVar2162.x, nodeVar2162.y, nodeVar2162.x ) * vec3( 0.1031 ) ) );
						nodeVar2163 = ( nodeVar2163 + vec3( dot( nodeVar2163, ( nodeVar2163.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2135 = ( nodeVar2135 + ( nodeVar2136 * mix( mix( fract( ( ( nodeVar2157.x + nodeVar2157.y ) * nodeVar2157.z ) ), fract( ( ( nodeVar2159.x + nodeVar2159.y ) * nodeVar2159.z ) ), nodeVar2156.x ), mix( fract( ( ( nodeVar2161.x + nodeVar2161.y ) * nodeVar2161.z ) ), fract( ( ( nodeVar2163.x + nodeVar2163.y ) * nodeVar2163.z ) ), nodeVar2156.x ), nodeVar2156.y ) ) );
						nodeVar2134 = ( nodeVar2134 * vec2( 2.03 ) );
						nodeVar2136 = ( nodeVar2136 * 0.52 );
						nodeVar2164 = floor( nodeVar2134 );
						nodeVar2165 = fract( nodeVar2134 );
						nodeVar2165 = ( ( nodeVar2165 * nodeVar2165 ) * ( vec2( 3.0 ) - ( nodeVar2165 * vec2( 2.0 ) ) ) );
						nodeVar2166 = fract( ( vec3( nodeVar2164.x, nodeVar2164.y, nodeVar2164.x ) * vec3( 0.1031 ) ) );
						nodeVar2166 = ( nodeVar2166 + vec3( dot( nodeVar2166, ( nodeVar2166.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2167 = ( nodeVar2164 + vec2( 1.0, 0.0 ) );
						nodeVar2168 = fract( ( vec3( nodeVar2167.x, nodeVar2167.y, nodeVar2167.x ) * vec3( 0.1031 ) ) );
						nodeVar2168 = ( nodeVar2168 + vec3( dot( nodeVar2168, ( nodeVar2168.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2169 = ( nodeVar2164 + vec2( 0.0, 1.0 ) );
						nodeVar2170 = fract( ( vec3( nodeVar2169.x, nodeVar2169.y, nodeVar2169.x ) * vec3( 0.1031 ) ) );
						nodeVar2170 = ( nodeVar2170 + vec3( dot( nodeVar2170, ( nodeVar2170.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2171 = ( nodeVar2164 + vec2( 1.0, 1.0 ) );
						nodeVar2172 = fract( ( vec3( nodeVar2171.x, nodeVar2171.y, nodeVar2171.x ) * vec3( 0.1031 ) ) );
						nodeVar2172 = ( nodeVar2172 + vec3( dot( nodeVar2172, ( nodeVar2172.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar2135 = ( nodeVar2135 + ( nodeVar2136 * mix( mix( fract( ( ( nodeVar2166.x + nodeVar2166.y ) * nodeVar2166.z ) ), fract( ( ( nodeVar2168.x + nodeVar2168.y ) * nodeVar2168.z ) ), nodeVar2165.x ), mix( fract( ( ( nodeVar2170.x + nodeVar2170.y ) * nodeVar2170.z ) ), fract( ( ( nodeVar2172.x + nodeVar2172.y ) * nodeVar2172.z ) ), nodeVar2165.x ), nodeVar2165.y ) ) );
						nodeVar2134 = ( nodeVar2134 * vec2( 2.03 ) );
						nodeVar2136 = ( nodeVar2136 * 0.52 );
						nodeVar2173 = smoothstep( 0.62, 0.92, nodeVar2135 );
						nodeVar1822 = vec3( ( ( ( nodeVar2090 * ( 0.62 + ( nodeVar2133 * 0.38 ) ) ) * 0.4 ) - ( nodeVar2173 * 0.22 ) ), ( nodeVar2090 * ( 1.0 - ( nodeVar2173 * 0.7 ) ) ), ( ( nodeVar2130 * 0.35 ) + ( nodeVar2133 * 0.65 ) ) );
						

					} else {


						if ( ( nodeVar1821 < 5.5 ) ) {

							nodeVar2174 = ( nodeVar1820 * vec2( 4.2 ) );
							nodeVar2175 = 0.0;
							nodeVar2176 = 0.5;
							nodeVar2177 = floor( nodeVar2174 );
							nodeVar2178 = fract( nodeVar2174 );
							nodeVar2178 = ( ( nodeVar2178 * nodeVar2178 ) * ( vec2( 3.0 ) - ( nodeVar2178 * vec2( 2.0 ) ) ) );
							nodeVar2179 = fract( ( vec3( nodeVar2177.x, nodeVar2177.y, nodeVar2177.x ) * vec3( 0.1031 ) ) );
							nodeVar2179 = ( nodeVar2179 + vec3( dot( nodeVar2179, ( nodeVar2179.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2180 = ( nodeVar2177 + vec2( 1.0, 0.0 ) );
							nodeVar2181 = fract( ( vec3( nodeVar2180.x, nodeVar2180.y, nodeVar2180.x ) * vec3( 0.1031 ) ) );
							nodeVar2181 = ( nodeVar2181 + vec3( dot( nodeVar2181, ( nodeVar2181.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2182 = ( nodeVar2177 + vec2( 0.0, 1.0 ) );
							nodeVar2183 = fract( ( vec3( nodeVar2182.x, nodeVar2182.y, nodeVar2182.x ) * vec3( 0.1031 ) ) );
							nodeVar2183 = ( nodeVar2183 + vec3( dot( nodeVar2183, ( nodeVar2183.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2184 = ( nodeVar2177 + vec2( 1.0, 1.0 ) );
							nodeVar2185 = fract( ( vec3( nodeVar2184.x, nodeVar2184.y, nodeVar2184.x ) * vec3( 0.1031 ) ) );
							nodeVar2185 = ( nodeVar2185 + vec3( dot( nodeVar2185, ( nodeVar2185.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2175 = ( nodeVar2175 + ( nodeVar2176 * mix( mix( fract( ( ( nodeVar2179.x + nodeVar2179.y ) * nodeVar2179.z ) ), fract( ( ( nodeVar2181.x + nodeVar2181.y ) * nodeVar2181.z ) ), nodeVar2178.x ), mix( fract( ( ( nodeVar2183.x + nodeVar2183.y ) * nodeVar2183.z ) ), fract( ( ( nodeVar2185.x + nodeVar2185.y ) * nodeVar2185.z ) ), nodeVar2178.x ), nodeVar2178.y ) ) );
							nodeVar2174 = ( nodeVar2174 * vec2( 2.03 ) );
							nodeVar2176 = ( nodeVar2176 * 0.52 );
							nodeVar2186 = floor( nodeVar2174 );
							nodeVar2187 = fract( nodeVar2174 );
							nodeVar2187 = ( ( nodeVar2187 * nodeVar2187 ) * ( vec2( 3.0 ) - ( nodeVar2187 * vec2( 2.0 ) ) ) );
							nodeVar2188 = fract( ( vec3( nodeVar2186.x, nodeVar2186.y, nodeVar2186.x ) * vec3( 0.1031 ) ) );
							nodeVar2188 = ( nodeVar2188 + vec3( dot( nodeVar2188, ( nodeVar2188.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2189 = ( nodeVar2186 + vec2( 1.0, 0.0 ) );
							nodeVar2190 = fract( ( vec3( nodeVar2189.x, nodeVar2189.y, nodeVar2189.x ) * vec3( 0.1031 ) ) );
							nodeVar2190 = ( nodeVar2190 + vec3( dot( nodeVar2190, ( nodeVar2190.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2191 = ( nodeVar2186 + vec2( 0.0, 1.0 ) );
							nodeVar2192 = fract( ( vec3( nodeVar2191.x, nodeVar2191.y, nodeVar2191.x ) * vec3( 0.1031 ) ) );
							nodeVar2192 = ( nodeVar2192 + vec3( dot( nodeVar2192, ( nodeVar2192.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2193 = ( nodeVar2186 + vec2( 1.0, 1.0 ) );
							nodeVar2194 = fract( ( vec3( nodeVar2193.x, nodeVar2193.y, nodeVar2193.x ) * vec3( 0.1031 ) ) );
							nodeVar2194 = ( nodeVar2194 + vec3( dot( nodeVar2194, ( nodeVar2194.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2175 = ( nodeVar2175 + ( nodeVar2176 * mix( mix( fract( ( ( nodeVar2188.x + nodeVar2188.y ) * nodeVar2188.z ) ), fract( ( ( nodeVar2190.x + nodeVar2190.y ) * nodeVar2190.z ) ), nodeVar2187.x ), mix( fract( ( ( nodeVar2192.x + nodeVar2192.y ) * nodeVar2192.z ) ), fract( ( ( nodeVar2194.x + nodeVar2194.y ) * nodeVar2194.z ) ), nodeVar2187.x ), nodeVar2187.y ) ) );
							nodeVar2174 = ( nodeVar2174 * vec2( 2.03 ) );
							nodeVar2176 = ( nodeVar2176 * 0.52 );
							nodeVar2195 = floor( nodeVar2174 );
							nodeVar2196 = fract( nodeVar2174 );
							nodeVar2196 = ( ( nodeVar2196 * nodeVar2196 ) * ( vec2( 3.0 ) - ( nodeVar2196 * vec2( 2.0 ) ) ) );
							nodeVar2197 = fract( ( vec3( nodeVar2195.x, nodeVar2195.y, nodeVar2195.x ) * vec3( 0.1031 ) ) );
							nodeVar2197 = ( nodeVar2197 + vec3( dot( nodeVar2197, ( nodeVar2197.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2198 = ( nodeVar2195 + vec2( 1.0, 0.0 ) );
							nodeVar2199 = fract( ( vec3( nodeVar2198.x, nodeVar2198.y, nodeVar2198.x ) * vec3( 0.1031 ) ) );
							nodeVar2199 = ( nodeVar2199 + vec3( dot( nodeVar2199, ( nodeVar2199.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2200 = ( nodeVar2195 + vec2( 0.0, 1.0 ) );
							nodeVar2201 = fract( ( vec3( nodeVar2200.x, nodeVar2200.y, nodeVar2200.x ) * vec3( 0.1031 ) ) );
							nodeVar2201 = ( nodeVar2201 + vec3( dot( nodeVar2201, ( nodeVar2201.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2202 = ( nodeVar2195 + vec2( 1.0, 1.0 ) );
							nodeVar2203 = fract( ( vec3( nodeVar2202.x, nodeVar2202.y, nodeVar2202.x ) * vec3( 0.1031 ) ) );
							nodeVar2203 = ( nodeVar2203 + vec3( dot( nodeVar2203, ( nodeVar2203.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2175 = ( nodeVar2175 + ( nodeVar2176 * mix( mix( fract( ( ( nodeVar2197.x + nodeVar2197.y ) * nodeVar2197.z ) ), fract( ( ( nodeVar2199.x + nodeVar2199.y ) * nodeVar2199.z ) ), nodeVar2196.x ), mix( fract( ( ( nodeVar2201.x + nodeVar2201.y ) * nodeVar2201.z ) ), fract( ( ( nodeVar2203.x + nodeVar2203.y ) * nodeVar2203.z ) ), nodeVar2196.x ), nodeVar2196.y ) ) );
							nodeVar2174 = ( nodeVar2174 * vec2( 2.03 ) );
							nodeVar2176 = ( nodeVar2176 * 0.52 );
							nodeVar2204 = floor( nodeVar2174 );
							nodeVar2205 = fract( nodeVar2174 );
							nodeVar2205 = ( ( nodeVar2205 * nodeVar2205 ) * ( vec2( 3.0 ) - ( nodeVar2205 * vec2( 2.0 ) ) ) );
							nodeVar2206 = fract( ( vec3( nodeVar2204.x, nodeVar2204.y, nodeVar2204.x ) * vec3( 0.1031 ) ) );
							nodeVar2206 = ( nodeVar2206 + vec3( dot( nodeVar2206, ( nodeVar2206.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2207 = ( nodeVar2204 + vec2( 1.0, 0.0 ) );
							nodeVar2208 = fract( ( vec3( nodeVar2207.x, nodeVar2207.y, nodeVar2207.x ) * vec3( 0.1031 ) ) );
							nodeVar2208 = ( nodeVar2208 + vec3( dot( nodeVar2208, ( nodeVar2208.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2209 = ( nodeVar2204 + vec2( 0.0, 1.0 ) );
							nodeVar2210 = fract( ( vec3( nodeVar2209.x, nodeVar2209.y, nodeVar2209.x ) * vec3( 0.1031 ) ) );
							nodeVar2210 = ( nodeVar2210 + vec3( dot( nodeVar2210, ( nodeVar2210.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2211 = ( nodeVar2204 + vec2( 1.0, 1.0 ) );
							nodeVar2212 = fract( ( vec3( nodeVar2211.x, nodeVar2211.y, nodeVar2211.x ) * vec3( 0.1031 ) ) );
							nodeVar2212 = ( nodeVar2212 + vec3( dot( nodeVar2212, ( nodeVar2212.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2175 = ( nodeVar2175 + ( nodeVar2176 * mix( mix( fract( ( ( nodeVar2206.x + nodeVar2206.y ) * nodeVar2206.z ) ), fract( ( ( nodeVar2208.x + nodeVar2208.y ) * nodeVar2208.z ) ), nodeVar2205.x ), mix( fract( ( ( nodeVar2210.x + nodeVar2210.y ) * nodeVar2210.z ) ), fract( ( ( nodeVar2212.x + nodeVar2212.y ) * nodeVar2212.z ) ), nodeVar2205.x ), nodeVar2205.y ) ) );
							nodeVar2174 = ( nodeVar2174 * vec2( 2.03 ) );
							nodeVar2176 = ( nodeVar2176 * 0.52 );
							nodeVar2213 = ( nodeVar1820 * vec2( 19.0 ) );
							nodeVar2214 = 0.0;
							nodeVar2215 = 0.5;
							nodeVar2216 = floor( nodeVar2213 );
							nodeVar2217 = fract( nodeVar2213 );
							nodeVar2217 = ( ( nodeVar2217 * nodeVar2217 ) * ( vec2( 3.0 ) - ( nodeVar2217 * vec2( 2.0 ) ) ) );
							nodeVar2218 = fract( ( vec3( nodeVar2216.x, nodeVar2216.y, nodeVar2216.x ) * vec3( 0.1031 ) ) );
							nodeVar2218 = ( nodeVar2218 + vec3( dot( nodeVar2218, ( nodeVar2218.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2219 = ( nodeVar2216 + vec2( 1.0, 0.0 ) );
							nodeVar2220 = fract( ( vec3( nodeVar2219.x, nodeVar2219.y, nodeVar2219.x ) * vec3( 0.1031 ) ) );
							nodeVar2220 = ( nodeVar2220 + vec3( dot( nodeVar2220, ( nodeVar2220.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2221 = ( nodeVar2216 + vec2( 0.0, 1.0 ) );
							nodeVar2222 = fract( ( vec3( nodeVar2221.x, nodeVar2221.y, nodeVar2221.x ) * vec3( 0.1031 ) ) );
							nodeVar2222 = ( nodeVar2222 + vec3( dot( nodeVar2222, ( nodeVar2222.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2223 = ( nodeVar2216 + vec2( 1.0, 1.0 ) );
							nodeVar2224 = fract( ( vec3( nodeVar2223.x, nodeVar2223.y, nodeVar2223.x ) * vec3( 0.1031 ) ) );
							nodeVar2224 = ( nodeVar2224 + vec3( dot( nodeVar2224, ( nodeVar2224.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2214 = ( nodeVar2214 + ( nodeVar2215 * mix( mix( fract( ( ( nodeVar2218.x + nodeVar2218.y ) * nodeVar2218.z ) ), fract( ( ( nodeVar2220.x + nodeVar2220.y ) * nodeVar2220.z ) ), nodeVar2217.x ), mix( fract( ( ( nodeVar2222.x + nodeVar2222.y ) * nodeVar2222.z ) ), fract( ( ( nodeVar2224.x + nodeVar2224.y ) * nodeVar2224.z ) ), nodeVar2217.x ), nodeVar2217.y ) ) );
							nodeVar2213 = ( nodeVar2213 * vec2( 2.03 ) );
							nodeVar2215 = ( nodeVar2215 * 0.52 );
							nodeVar2225 = floor( nodeVar2213 );
							nodeVar2226 = fract( nodeVar2213 );
							nodeVar2226 = ( ( nodeVar2226 * nodeVar2226 ) * ( vec2( 3.0 ) - ( nodeVar2226 * vec2( 2.0 ) ) ) );
							nodeVar2227 = fract( ( vec3( nodeVar2225.x, nodeVar2225.y, nodeVar2225.x ) * vec3( 0.1031 ) ) );
							nodeVar2227 = ( nodeVar2227 + vec3( dot( nodeVar2227, ( nodeVar2227.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2228 = ( nodeVar2225 + vec2( 1.0, 0.0 ) );
							nodeVar2229 = fract( ( vec3( nodeVar2228.x, nodeVar2228.y, nodeVar2228.x ) * vec3( 0.1031 ) ) );
							nodeVar2229 = ( nodeVar2229 + vec3( dot( nodeVar2229, ( nodeVar2229.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2230 = ( nodeVar2225 + vec2( 0.0, 1.0 ) );
							nodeVar2231 = fract( ( vec3( nodeVar2230.x, nodeVar2230.y, nodeVar2230.x ) * vec3( 0.1031 ) ) );
							nodeVar2231 = ( nodeVar2231 + vec3( dot( nodeVar2231, ( nodeVar2231.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2232 = ( nodeVar2225 + vec2( 1.0, 1.0 ) );
							nodeVar2233 = fract( ( vec3( nodeVar2232.x, nodeVar2232.y, nodeVar2232.x ) * vec3( 0.1031 ) ) );
							nodeVar2233 = ( nodeVar2233 + vec3( dot( nodeVar2233, ( nodeVar2233.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2214 = ( nodeVar2214 + ( nodeVar2215 * mix( mix( fract( ( ( nodeVar2227.x + nodeVar2227.y ) * nodeVar2227.z ) ), fract( ( ( nodeVar2229.x + nodeVar2229.y ) * nodeVar2229.z ) ), nodeVar2226.x ), mix( fract( ( ( nodeVar2231.x + nodeVar2231.y ) * nodeVar2231.z ) ), fract( ( ( nodeVar2233.x + nodeVar2233.y ) * nodeVar2233.z ) ), nodeVar2226.x ), nodeVar2226.y ) ) );
							nodeVar2213 = ( nodeVar2213 * vec2( 2.03 ) );
							nodeVar2215 = ( nodeVar2215 * 0.52 );
							nodeVar2234 = floor( nodeVar2213 );
							nodeVar2235 = fract( nodeVar2213 );
							nodeVar2235 = ( ( nodeVar2235 * nodeVar2235 ) * ( vec2( 3.0 ) - ( nodeVar2235 * vec2( 2.0 ) ) ) );
							nodeVar2236 = fract( ( vec3( nodeVar2234.x, nodeVar2234.y, nodeVar2234.x ) * vec3( 0.1031 ) ) );
							nodeVar2236 = ( nodeVar2236 + vec3( dot( nodeVar2236, ( nodeVar2236.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2237 = ( nodeVar2234 + vec2( 1.0, 0.0 ) );
							nodeVar2238 = fract( ( vec3( nodeVar2237.x, nodeVar2237.y, nodeVar2237.x ) * vec3( 0.1031 ) ) );
							nodeVar2238 = ( nodeVar2238 + vec3( dot( nodeVar2238, ( nodeVar2238.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2239 = ( nodeVar2234 + vec2( 0.0, 1.0 ) );
							nodeVar2240 = fract( ( vec3( nodeVar2239.x, nodeVar2239.y, nodeVar2239.x ) * vec3( 0.1031 ) ) );
							nodeVar2240 = ( nodeVar2240 + vec3( dot( nodeVar2240, ( nodeVar2240.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2241 = ( nodeVar2234 + vec2( 1.0, 1.0 ) );
							nodeVar2242 = fract( ( vec3( nodeVar2241.x, nodeVar2241.y, nodeVar2241.x ) * vec3( 0.1031 ) ) );
							nodeVar2242 = ( nodeVar2242 + vec3( dot( nodeVar2242, ( nodeVar2242.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2214 = ( nodeVar2214 + ( nodeVar2215 * mix( mix( fract( ( ( nodeVar2236.x + nodeVar2236.y ) * nodeVar2236.z ) ), fract( ( ( nodeVar2238.x + nodeVar2238.y ) * nodeVar2238.z ) ), nodeVar2235.x ), mix( fract( ( ( nodeVar2240.x + nodeVar2240.y ) * nodeVar2240.z ) ), fract( ( ( nodeVar2242.x + nodeVar2242.y ) * nodeVar2242.z ) ), nodeVar2235.x ), nodeVar2235.y ) ) );
							nodeVar2213 = ( nodeVar2213 * vec2( 2.03 ) );
							nodeVar2215 = ( nodeVar2215 * 0.52 );
							nodeVar2243 = floor( nodeVar2213 );
							nodeVar2244 = fract( nodeVar2213 );
							nodeVar2244 = ( ( nodeVar2244 * nodeVar2244 ) * ( vec2( 3.0 ) - ( nodeVar2244 * vec2( 2.0 ) ) ) );
							nodeVar2245 = fract( ( vec3( nodeVar2243.x, nodeVar2243.y, nodeVar2243.x ) * vec3( 0.1031 ) ) );
							nodeVar2245 = ( nodeVar2245 + vec3( dot( nodeVar2245, ( nodeVar2245.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2246 = ( nodeVar2243 + vec2( 1.0, 0.0 ) );
							nodeVar2247 = fract( ( vec3( nodeVar2246.x, nodeVar2246.y, nodeVar2246.x ) * vec3( 0.1031 ) ) );
							nodeVar2247 = ( nodeVar2247 + vec3( dot( nodeVar2247, ( nodeVar2247.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2248 = ( nodeVar2243 + vec2( 0.0, 1.0 ) );
							nodeVar2249 = fract( ( vec3( nodeVar2248.x, nodeVar2248.y, nodeVar2248.x ) * vec3( 0.1031 ) ) );
							nodeVar2249 = ( nodeVar2249 + vec3( dot( nodeVar2249, ( nodeVar2249.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2250 = ( nodeVar2243 + vec2( 1.0, 1.0 ) );
							nodeVar2251 = fract( ( vec3( nodeVar2250.x, nodeVar2250.y, nodeVar2250.x ) * vec3( 0.1031 ) ) );
							nodeVar2251 = ( nodeVar2251 + vec3( dot( nodeVar2251, ( nodeVar2251.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar2214 = ( nodeVar2214 + ( nodeVar2215 * mix( mix( fract( ( ( nodeVar2245.x + nodeVar2245.y ) * nodeVar2245.z ) ), fract( ( ( nodeVar2247.x + nodeVar2247.y ) * nodeVar2247.z ) ), nodeVar2244.x ), mix( fract( ( ( nodeVar2249.x + nodeVar2249.y ) * nodeVar2249.z ) ), fract( ( ( nodeVar2251.x + nodeVar2251.y ) * nodeVar2251.z ) ), nodeVar2244.x ), nodeVar2244.y ) ) );
							nodeVar2213 = ( nodeVar2213 * vec2( 2.03 ) );
							nodeVar2215 = ( nodeVar2215 * 0.52 );
							nodeVar2252 = ( ( nodeVar2175 * 0.6 ) + ( nodeVar2214 * 0.4 ) );
							nodeVar1822 = vec3( ( nodeVar2252 * 0.6 ), ( 0.7 + ( nodeVar2252 * 0.3 ) ), nodeVar2252 );
							

						} else {


							if ( ( nodeVar1821 < 6.5 ) ) {

								nodeVar2253 = vec2( ( nodeVar1820.x * 90.0 ), ( nodeVar1820.y * 4.0 ) );
								nodeVar2254 = 0.0;
								nodeVar2255 = 0.5;
								nodeVar2256 = floor( nodeVar2253 );
								nodeVar2257 = fract( nodeVar2253 );
								nodeVar2257 = ( ( nodeVar2257 * nodeVar2257 ) * ( vec2( 3.0 ) - ( nodeVar2257 * vec2( 2.0 ) ) ) );
								nodeVar2258 = fract( ( vec3( nodeVar2256.x, nodeVar2256.y, nodeVar2256.x ) * vec3( 0.1031 ) ) );
								nodeVar2258 = ( nodeVar2258 + vec3( dot( nodeVar2258, ( nodeVar2258.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2259 = ( nodeVar2256 + vec2( 1.0, 0.0 ) );
								nodeVar2260 = fract( ( vec3( nodeVar2259.x, nodeVar2259.y, nodeVar2259.x ) * vec3( 0.1031 ) ) );
								nodeVar2260 = ( nodeVar2260 + vec3( dot( nodeVar2260, ( nodeVar2260.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2261 = ( nodeVar2256 + vec2( 0.0, 1.0 ) );
								nodeVar2262 = fract( ( vec3( nodeVar2261.x, nodeVar2261.y, nodeVar2261.x ) * vec3( 0.1031 ) ) );
								nodeVar2262 = ( nodeVar2262 + vec3( dot( nodeVar2262, ( nodeVar2262.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2263 = ( nodeVar2256 + vec2( 1.0, 1.0 ) );
								nodeVar2264 = fract( ( vec3( nodeVar2263.x, nodeVar2263.y, nodeVar2263.x ) * vec3( 0.1031 ) ) );
								nodeVar2264 = ( nodeVar2264 + vec3( dot( nodeVar2264, ( nodeVar2264.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2254 = ( nodeVar2254 + ( nodeVar2255 * mix( mix( fract( ( ( nodeVar2258.x + nodeVar2258.y ) * nodeVar2258.z ) ), fract( ( ( nodeVar2260.x + nodeVar2260.y ) * nodeVar2260.z ) ), nodeVar2257.x ), mix( fract( ( ( nodeVar2262.x + nodeVar2262.y ) * nodeVar2262.z ) ), fract( ( ( nodeVar2264.x + nodeVar2264.y ) * nodeVar2264.z ) ), nodeVar2257.x ), nodeVar2257.y ) ) );
								nodeVar2253 = ( nodeVar2253 * vec2( 2.03 ) );
								nodeVar2255 = ( nodeVar2255 * 0.52 );
								nodeVar2265 = floor( nodeVar2253 );
								nodeVar2266 = fract( nodeVar2253 );
								nodeVar2266 = ( ( nodeVar2266 * nodeVar2266 ) * ( vec2( 3.0 ) - ( nodeVar2266 * vec2( 2.0 ) ) ) );
								nodeVar2267 = fract( ( vec3( nodeVar2265.x, nodeVar2265.y, nodeVar2265.x ) * vec3( 0.1031 ) ) );
								nodeVar2267 = ( nodeVar2267 + vec3( dot( nodeVar2267, ( nodeVar2267.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2268 = ( nodeVar2265 + vec2( 1.0, 0.0 ) );
								nodeVar2269 = fract( ( vec3( nodeVar2268.x, nodeVar2268.y, nodeVar2268.x ) * vec3( 0.1031 ) ) );
								nodeVar2269 = ( nodeVar2269 + vec3( dot( nodeVar2269, ( nodeVar2269.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2270 = ( nodeVar2265 + vec2( 0.0, 1.0 ) );
								nodeVar2271 = fract( ( vec3( nodeVar2270.x, nodeVar2270.y, nodeVar2270.x ) * vec3( 0.1031 ) ) );
								nodeVar2271 = ( nodeVar2271 + vec3( dot( nodeVar2271, ( nodeVar2271.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2272 = ( nodeVar2265 + vec2( 1.0, 1.0 ) );
								nodeVar2273 = fract( ( vec3( nodeVar2272.x, nodeVar2272.y, nodeVar2272.x ) * vec3( 0.1031 ) ) );
								nodeVar2273 = ( nodeVar2273 + vec3( dot( nodeVar2273, ( nodeVar2273.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2254 = ( nodeVar2254 + ( nodeVar2255 * mix( mix( fract( ( ( nodeVar2267.x + nodeVar2267.y ) * nodeVar2267.z ) ), fract( ( ( nodeVar2269.x + nodeVar2269.y ) * nodeVar2269.z ) ), nodeVar2266.x ), mix( fract( ( ( nodeVar2271.x + nodeVar2271.y ) * nodeVar2271.z ) ), fract( ( ( nodeVar2273.x + nodeVar2273.y ) * nodeVar2273.z ) ), nodeVar2266.x ), nodeVar2266.y ) ) );
								nodeVar2253 = ( nodeVar2253 * vec2( 2.03 ) );
								nodeVar2255 = ( nodeVar2255 * 0.52 );
								nodeVar2274 = floor( nodeVar2253 );
								nodeVar2275 = fract( nodeVar2253 );
								nodeVar2275 = ( ( nodeVar2275 * nodeVar2275 ) * ( vec2( 3.0 ) - ( nodeVar2275 * vec2( 2.0 ) ) ) );
								nodeVar2276 = fract( ( vec3( nodeVar2274.x, nodeVar2274.y, nodeVar2274.x ) * vec3( 0.1031 ) ) );
								nodeVar2276 = ( nodeVar2276 + vec3( dot( nodeVar2276, ( nodeVar2276.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2277 = ( nodeVar2274 + vec2( 1.0, 0.0 ) );
								nodeVar2278 = fract( ( vec3( nodeVar2277.x, nodeVar2277.y, nodeVar2277.x ) * vec3( 0.1031 ) ) );
								nodeVar2278 = ( nodeVar2278 + vec3( dot( nodeVar2278, ( nodeVar2278.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2279 = ( nodeVar2274 + vec2( 0.0, 1.0 ) );
								nodeVar2280 = fract( ( vec3( nodeVar2279.x, nodeVar2279.y, nodeVar2279.x ) * vec3( 0.1031 ) ) );
								nodeVar2280 = ( nodeVar2280 + vec3( dot( nodeVar2280, ( nodeVar2280.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2281 = ( nodeVar2274 + vec2( 1.0, 1.0 ) );
								nodeVar2282 = fract( ( vec3( nodeVar2281.x, nodeVar2281.y, nodeVar2281.x ) * vec3( 0.1031 ) ) );
								nodeVar2282 = ( nodeVar2282 + vec3( dot( nodeVar2282, ( nodeVar2282.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2254 = ( nodeVar2254 + ( nodeVar2255 * mix( mix( fract( ( ( nodeVar2276.x + nodeVar2276.y ) * nodeVar2276.z ) ), fract( ( ( nodeVar2278.x + nodeVar2278.y ) * nodeVar2278.z ) ), nodeVar2275.x ), mix( fract( ( ( nodeVar2280.x + nodeVar2280.y ) * nodeVar2280.z ) ), fract( ( ( nodeVar2282.x + nodeVar2282.y ) * nodeVar2282.z ) ), nodeVar2275.x ), nodeVar2275.y ) ) );
								nodeVar2253 = ( nodeVar2253 * vec2( 2.03 ) );
								nodeVar2255 = ( nodeVar2255 * 0.52 );
								nodeVar2283 = floor( nodeVar2253 );
								nodeVar2284 = fract( nodeVar2253 );
								nodeVar2284 = ( ( nodeVar2284 * nodeVar2284 ) * ( vec2( 3.0 ) - ( nodeVar2284 * vec2( 2.0 ) ) ) );
								nodeVar2285 = fract( ( vec3( nodeVar2283.x, nodeVar2283.y, nodeVar2283.x ) * vec3( 0.1031 ) ) );
								nodeVar2285 = ( nodeVar2285 + vec3( dot( nodeVar2285, ( nodeVar2285.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2286 = ( nodeVar2283 + vec2( 1.0, 0.0 ) );
								nodeVar2287 = fract( ( vec3( nodeVar2286.x, nodeVar2286.y, nodeVar2286.x ) * vec3( 0.1031 ) ) );
								nodeVar2287 = ( nodeVar2287 + vec3( dot( nodeVar2287, ( nodeVar2287.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2288 = ( nodeVar2283 + vec2( 0.0, 1.0 ) );
								nodeVar2289 = fract( ( vec3( nodeVar2288.x, nodeVar2288.y, nodeVar2288.x ) * vec3( 0.1031 ) ) );
								nodeVar2289 = ( nodeVar2289 + vec3( dot( nodeVar2289, ( nodeVar2289.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2290 = ( nodeVar2283 + vec2( 1.0, 1.0 ) );
								nodeVar2291 = fract( ( vec3( nodeVar2290.x, nodeVar2290.y, nodeVar2290.x ) * vec3( 0.1031 ) ) );
								nodeVar2291 = ( nodeVar2291 + vec3( dot( nodeVar2291, ( nodeVar2291.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar2254 = ( nodeVar2254 + ( nodeVar2255 * mix( mix( fract( ( ( nodeVar2285.x + nodeVar2285.y ) * nodeVar2285.z ) ), fract( ( ( nodeVar2287.x + nodeVar2287.y ) * nodeVar2287.z ) ), nodeVar2284.x ), mix( fract( ( ( nodeVar2289.x + nodeVar2289.y ) * nodeVar2289.z ) ), fract( ( ( nodeVar2291.x + nodeVar2291.y ) * nodeVar2291.z ) ), nodeVar2284.x ), nodeVar2284.y ) ) );
								nodeVar2253 = ( nodeVar2253 * vec2( 2.03 ) );
								nodeVar2255 = ( nodeVar2255 * 0.52 );
								nodeVar2292 = nodeVar2254;
								nodeVar1822 = vec3( ( nodeVar2292 * 0.25 ), 1.0, nodeVar2292 );
								

							} else {


								if ( ( nodeVar1821 < 7.5 ) ) {

									nodeVar2293 = ( nodeVar1820 * vec2( 0.28 ) );
									nodeVar2294 = 0.0;
									nodeVar2295 = 0.5;
									nodeVar2296 = floor( nodeVar2293 );
									nodeVar2297 = fract( nodeVar2293 );
									nodeVar2297 = ( ( nodeVar2297 * nodeVar2297 ) * ( vec2( 3.0 ) - ( nodeVar2297 * vec2( 2.0 ) ) ) );
									nodeVar2298 = fract( ( vec3( nodeVar2296.x, nodeVar2296.y, nodeVar2296.x ) * vec3( 0.1031 ) ) );
									nodeVar2298 = ( nodeVar2298 + vec3( dot( nodeVar2298, ( nodeVar2298.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2299 = ( nodeVar2296 + vec2( 1.0, 0.0 ) );
									nodeVar2300 = fract( ( vec3( nodeVar2299.x, nodeVar2299.y, nodeVar2299.x ) * vec3( 0.1031 ) ) );
									nodeVar2300 = ( nodeVar2300 + vec3( dot( nodeVar2300, ( nodeVar2300.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2301 = ( nodeVar2296 + vec2( 0.0, 1.0 ) );
									nodeVar2302 = fract( ( vec3( nodeVar2301.x, nodeVar2301.y, nodeVar2301.x ) * vec3( 0.1031 ) ) );
									nodeVar2302 = ( nodeVar2302 + vec3( dot( nodeVar2302, ( nodeVar2302.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2303 = ( nodeVar2296 + vec2( 1.0, 1.0 ) );
									nodeVar2304 = fract( ( vec3( nodeVar2303.x, nodeVar2303.y, nodeVar2303.x ) * vec3( 0.1031 ) ) );
									nodeVar2304 = ( nodeVar2304 + vec3( dot( nodeVar2304, ( nodeVar2304.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2294 = ( nodeVar2294 + ( nodeVar2295 * mix( mix( fract( ( ( nodeVar2298.x + nodeVar2298.y ) * nodeVar2298.z ) ), fract( ( ( nodeVar2300.x + nodeVar2300.y ) * nodeVar2300.z ) ), nodeVar2297.x ), mix( fract( ( ( nodeVar2302.x + nodeVar2302.y ) * nodeVar2302.z ) ), fract( ( ( nodeVar2304.x + nodeVar2304.y ) * nodeVar2304.z ) ), nodeVar2297.x ), nodeVar2297.y ) ) );
									nodeVar2293 = ( nodeVar2293 * vec2( 2.11 ) );
									nodeVar2295 = ( nodeVar2295 * 0.5 );
									nodeVar2305 = floor( nodeVar2293 );
									nodeVar2306 = fract( nodeVar2293 );
									nodeVar2306 = ( ( nodeVar2306 * nodeVar2306 ) * ( vec2( 3.0 ) - ( nodeVar2306 * vec2( 2.0 ) ) ) );
									nodeVar2307 = fract( ( vec3( nodeVar2305.x, nodeVar2305.y, nodeVar2305.x ) * vec3( 0.1031 ) ) );
									nodeVar2307 = ( nodeVar2307 + vec3( dot( nodeVar2307, ( nodeVar2307.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2308 = ( nodeVar2305 + vec2( 1.0, 0.0 ) );
									nodeVar2309 = fract( ( vec3( nodeVar2308.x, nodeVar2308.y, nodeVar2308.x ) * vec3( 0.1031 ) ) );
									nodeVar2309 = ( nodeVar2309 + vec3( dot( nodeVar2309, ( nodeVar2309.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2310 = ( nodeVar2305 + vec2( 0.0, 1.0 ) );
									nodeVar2311 = fract( ( vec3( nodeVar2310.x, nodeVar2310.y, nodeVar2310.x ) * vec3( 0.1031 ) ) );
									nodeVar2311 = ( nodeVar2311 + vec3( dot( nodeVar2311, ( nodeVar2311.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2312 = ( nodeVar2305 + vec2( 1.0, 1.0 ) );
									nodeVar2313 = fract( ( vec3( nodeVar2312.x, nodeVar2312.y, nodeVar2312.x ) * vec3( 0.1031 ) ) );
									nodeVar2313 = ( nodeVar2313 + vec3( dot( nodeVar2313, ( nodeVar2313.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2294 = ( nodeVar2294 + ( nodeVar2295 * mix( mix( fract( ( ( nodeVar2307.x + nodeVar2307.y ) * nodeVar2307.z ) ), fract( ( ( nodeVar2309.x + nodeVar2309.y ) * nodeVar2309.z ) ), nodeVar2306.x ), mix( fract( ( ( nodeVar2311.x + nodeVar2311.y ) * nodeVar2311.z ) ), fract( ( ( nodeVar2313.x + nodeVar2313.y ) * nodeVar2313.z ) ), nodeVar2306.x ), nodeVar2306.y ) ) );
									nodeVar2293 = ( nodeVar2293 * vec2( 2.11 ) );
									nodeVar2295 = ( nodeVar2295 * 0.5 );
									nodeVar2314 = floor( nodeVar2293 );
									nodeVar2315 = fract( nodeVar2293 );
									nodeVar2315 = ( ( nodeVar2315 * nodeVar2315 ) * ( vec2( 3.0 ) - ( nodeVar2315 * vec2( 2.0 ) ) ) );
									nodeVar2316 = fract( ( vec3( nodeVar2314.x, nodeVar2314.y, nodeVar2314.x ) * vec3( 0.1031 ) ) );
									nodeVar2316 = ( nodeVar2316 + vec3( dot( nodeVar2316, ( nodeVar2316.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2317 = ( nodeVar2314 + vec2( 1.0, 0.0 ) );
									nodeVar2318 = fract( ( vec3( nodeVar2317.x, nodeVar2317.y, nodeVar2317.x ) * vec3( 0.1031 ) ) );
									nodeVar2318 = ( nodeVar2318 + vec3( dot( nodeVar2318, ( nodeVar2318.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2319 = ( nodeVar2314 + vec2( 0.0, 1.0 ) );
									nodeVar2320 = fract( ( vec3( nodeVar2319.x, nodeVar2319.y, nodeVar2319.x ) * vec3( 0.1031 ) ) );
									nodeVar2320 = ( nodeVar2320 + vec3( dot( nodeVar2320, ( nodeVar2320.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2321 = ( nodeVar2314 + vec2( 1.0, 1.0 ) );
									nodeVar2322 = fract( ( vec3( nodeVar2321.x, nodeVar2321.y, nodeVar2321.x ) * vec3( 0.1031 ) ) );
									nodeVar2322 = ( nodeVar2322 + vec3( dot( nodeVar2322, ( nodeVar2322.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2294 = ( nodeVar2294 + ( nodeVar2295 * mix( mix( fract( ( ( nodeVar2316.x + nodeVar2316.y ) * nodeVar2316.z ) ), fract( ( ( nodeVar2318.x + nodeVar2318.y ) * nodeVar2318.z ) ), nodeVar2315.x ), mix( fract( ( ( nodeVar2320.x + nodeVar2320.y ) * nodeVar2320.z ) ), fract( ( ( nodeVar2322.x + nodeVar2322.y ) * nodeVar2322.z ) ), nodeVar2315.x ), nodeVar2315.y ) ) );
									nodeVar2293 = ( nodeVar2293 * vec2( 2.11 ) );
									nodeVar2295 = ( nodeVar2295 * 0.5 );
									nodeVar2323 = ( ( nodeVar1820 * vec2( 0.28 ) ) + vec2( 19.0 ) );
									nodeVar2324 = 0.0;
									nodeVar2325 = 0.5;
									nodeVar2326 = floor( nodeVar2323 );
									nodeVar2327 = fract( nodeVar2323 );
									nodeVar2327 = ( ( nodeVar2327 * nodeVar2327 ) * ( vec2( 3.0 ) - ( nodeVar2327 * vec2( 2.0 ) ) ) );
									nodeVar2328 = fract( ( vec3( nodeVar2326.x, nodeVar2326.y, nodeVar2326.x ) * vec3( 0.1031 ) ) );
									nodeVar2328 = ( nodeVar2328 + vec3( dot( nodeVar2328, ( nodeVar2328.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2329 = ( nodeVar2326 + vec2( 1.0, 0.0 ) );
									nodeVar2330 = fract( ( vec3( nodeVar2329.x, nodeVar2329.y, nodeVar2329.x ) * vec3( 0.1031 ) ) );
									nodeVar2330 = ( nodeVar2330 + vec3( dot( nodeVar2330, ( nodeVar2330.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2331 = ( nodeVar2326 + vec2( 0.0, 1.0 ) );
									nodeVar2332 = fract( ( vec3( nodeVar2331.x, nodeVar2331.y, nodeVar2331.x ) * vec3( 0.1031 ) ) );
									nodeVar2332 = ( nodeVar2332 + vec3( dot( nodeVar2332, ( nodeVar2332.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2333 = ( nodeVar2326 + vec2( 1.0, 1.0 ) );
									nodeVar2334 = fract( ( vec3( nodeVar2333.x, nodeVar2333.y, nodeVar2333.x ) * vec3( 0.1031 ) ) );
									nodeVar2334 = ( nodeVar2334 + vec3( dot( nodeVar2334, ( nodeVar2334.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2324 = ( nodeVar2324 + ( nodeVar2325 * mix( mix( fract( ( ( nodeVar2328.x + nodeVar2328.y ) * nodeVar2328.z ) ), fract( ( ( nodeVar2330.x + nodeVar2330.y ) * nodeVar2330.z ) ), nodeVar2327.x ), mix( fract( ( ( nodeVar2332.x + nodeVar2332.y ) * nodeVar2332.z ) ), fract( ( ( nodeVar2334.x + nodeVar2334.y ) * nodeVar2334.z ) ), nodeVar2327.x ), nodeVar2327.y ) ) );
									nodeVar2323 = ( nodeVar2323 * vec2( 2.11 ) );
									nodeVar2325 = ( nodeVar2325 * 0.5 );
									nodeVar2335 = floor( nodeVar2323 );
									nodeVar2336 = fract( nodeVar2323 );
									nodeVar2336 = ( ( nodeVar2336 * nodeVar2336 ) * ( vec2( 3.0 ) - ( nodeVar2336 * vec2( 2.0 ) ) ) );
									nodeVar2337 = fract( ( vec3( nodeVar2335.x, nodeVar2335.y, nodeVar2335.x ) * vec3( 0.1031 ) ) );
									nodeVar2337 = ( nodeVar2337 + vec3( dot( nodeVar2337, ( nodeVar2337.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2338 = ( nodeVar2335 + vec2( 1.0, 0.0 ) );
									nodeVar2339 = fract( ( vec3( nodeVar2338.x, nodeVar2338.y, nodeVar2338.x ) * vec3( 0.1031 ) ) );
									nodeVar2339 = ( nodeVar2339 + vec3( dot( nodeVar2339, ( nodeVar2339.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2340 = ( nodeVar2335 + vec2( 0.0, 1.0 ) );
									nodeVar2341 = fract( ( vec3( nodeVar2340.x, nodeVar2340.y, nodeVar2340.x ) * vec3( 0.1031 ) ) );
									nodeVar2341 = ( nodeVar2341 + vec3( dot( nodeVar2341, ( nodeVar2341.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2342 = ( nodeVar2335 + vec2( 1.0, 1.0 ) );
									nodeVar2343 = fract( ( vec3( nodeVar2342.x, nodeVar2342.y, nodeVar2342.x ) * vec3( 0.1031 ) ) );
									nodeVar2343 = ( nodeVar2343 + vec3( dot( nodeVar2343, ( nodeVar2343.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2324 = ( nodeVar2324 + ( nodeVar2325 * mix( mix( fract( ( ( nodeVar2337.x + nodeVar2337.y ) * nodeVar2337.z ) ), fract( ( ( nodeVar2339.x + nodeVar2339.y ) * nodeVar2339.z ) ), nodeVar2336.x ), mix( fract( ( ( nodeVar2341.x + nodeVar2341.y ) * nodeVar2341.z ) ), fract( ( ( nodeVar2343.x + nodeVar2343.y ) * nodeVar2343.z ) ), nodeVar2336.x ), nodeVar2336.y ) ) );
									nodeVar2323 = ( nodeVar2323 * vec2( 2.11 ) );
									nodeVar2325 = ( nodeVar2325 * 0.5 );
									nodeVar2344 = floor( nodeVar2323 );
									nodeVar2345 = fract( nodeVar2323 );
									nodeVar2345 = ( ( nodeVar2345 * nodeVar2345 ) * ( vec2( 3.0 ) - ( nodeVar2345 * vec2( 2.0 ) ) ) );
									nodeVar2346 = fract( ( vec3( nodeVar2344.x, nodeVar2344.y, nodeVar2344.x ) * vec3( 0.1031 ) ) );
									nodeVar2346 = ( nodeVar2346 + vec3( dot( nodeVar2346, ( nodeVar2346.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2347 = ( nodeVar2344 + vec2( 1.0, 0.0 ) );
									nodeVar2348 = fract( ( vec3( nodeVar2347.x, nodeVar2347.y, nodeVar2347.x ) * vec3( 0.1031 ) ) );
									nodeVar2348 = ( nodeVar2348 + vec3( dot( nodeVar2348, ( nodeVar2348.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2349 = ( nodeVar2344 + vec2( 0.0, 1.0 ) );
									nodeVar2350 = fract( ( vec3( nodeVar2349.x, nodeVar2349.y, nodeVar2349.x ) * vec3( 0.1031 ) ) );
									nodeVar2350 = ( nodeVar2350 + vec3( dot( nodeVar2350, ( nodeVar2350.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2351 = ( nodeVar2344 + vec2( 1.0, 1.0 ) );
									nodeVar2352 = fract( ( vec3( nodeVar2351.x, nodeVar2351.y, nodeVar2351.x ) * vec3( 0.1031 ) ) );
									nodeVar2352 = ( nodeVar2352 + vec3( dot( nodeVar2352, ( nodeVar2352.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2324 = ( nodeVar2324 + ( nodeVar2325 * mix( mix( fract( ( ( nodeVar2346.x + nodeVar2346.y ) * nodeVar2346.z ) ), fract( ( ( nodeVar2348.x + nodeVar2348.y ) * nodeVar2348.z ) ), nodeVar2345.x ), mix( fract( ( ( nodeVar2350.x + nodeVar2350.y ) * nodeVar2350.z ) ), fract( ( ( nodeVar2352.x + nodeVar2352.y ) * nodeVar2352.z ) ), nodeVar2345.x ), nodeVar2345.y ) ) );
									nodeVar2323 = ( nodeVar2323 * vec2( 2.11 ) );
									nodeVar2325 = ( nodeVar2325 * 0.5 );
									nodeVar2353 = ( vec2( nodeVar2294, nodeVar2324 ) - vec2( 0.5 ) );
									nodeVar2354 = ( ( nodeVar1820 * vec2( 4.05 ) ) + ( nodeVar2353 * vec2( 0.85 ) ) );
									nodeVar2355 = floor( nodeVar2354 );
									nodeVar2356 = fract( nodeVar2354 );
									nodeVar2357 = 9.0;
									nodeVar2358 = 9.0;
									nodeVar2359 = vec2( 0.0, 0.0 );
									nodeVar2360 = ( nodeVar2355 + vec2( -1.0, -1.0 ) );
									nodeVar2361 = fract( ( vec3( nodeVar2360.x, nodeVar2360.y, nodeVar2360.x ) * vec3( 0.1031 ) ) );
									nodeVar2361 = ( nodeVar2361 + vec3( dot( nodeVar2361, ( nodeVar2361.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2362 = ( ( nodeVar2355 + vec2( -1.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar2363 = fract( ( vec3( nodeVar2362.x, nodeVar2362.y, nodeVar2362.x ) * vec3( 0.1031 ) ) );
									nodeVar2363 = ( nodeVar2363 + vec3( dot( nodeVar2363, ( nodeVar2363.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2364 = length( ( ( vec2( -1.0, -1.0 ) + vec2( fract( ( ( nodeVar2361.x + nodeVar2361.y ) * nodeVar2361.z ) ), fract( ( ( nodeVar2363.x + nodeVar2363.y ) * nodeVar2363.z ) ) ) ) - nodeVar2356 ) );

									if ( ( nodeVar2364 < nodeVar2357 ) ) {

										nodeVar2358 = nodeVar2357;
										nodeVar2357 = nodeVar2364;
										nodeVar2359 = ( nodeVar2355 + vec2( -1.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar2364 < nodeVar2358 ) ) {

											nodeVar2358 = nodeVar2364;
											

										}

										

									}

									nodeVar2365 = ( nodeVar2355 + vec2( 0.0, -1.0 ) );
									nodeVar2366 = fract( ( vec3( nodeVar2365.x, nodeVar2365.y, nodeVar2365.x ) * vec3( 0.1031 ) ) );
									nodeVar2366 = ( nodeVar2366 + vec3( dot( nodeVar2366, ( nodeVar2366.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2367 = ( ( nodeVar2355 + vec2( 0.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar2368 = fract( ( vec3( nodeVar2367.x, nodeVar2367.y, nodeVar2367.x ) * vec3( 0.1031 ) ) );
									nodeVar2368 = ( nodeVar2368 + vec3( dot( nodeVar2368, ( nodeVar2368.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2369 = length( ( ( vec2( 0.0, -1.0 ) + vec2( fract( ( ( nodeVar2366.x + nodeVar2366.y ) * nodeVar2366.z ) ), fract( ( ( nodeVar2368.x + nodeVar2368.y ) * nodeVar2368.z ) ) ) ) - nodeVar2356 ) );

									if ( ( nodeVar2369 < nodeVar2357 ) ) {

										nodeVar2358 = nodeVar2357;
										nodeVar2357 = nodeVar2369;
										nodeVar2359 = ( nodeVar2355 + vec2( 0.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar2369 < nodeVar2358 ) ) {

											nodeVar2358 = nodeVar2369;
											

										}

										

									}

									nodeVar2370 = ( nodeVar2355 + vec2( 1.0, -1.0 ) );
									nodeVar2371 = fract( ( vec3( nodeVar2370.x, nodeVar2370.y, nodeVar2370.x ) * vec3( 0.1031 ) ) );
									nodeVar2371 = ( nodeVar2371 + vec3( dot( nodeVar2371, ( nodeVar2371.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2372 = ( ( nodeVar2355 + vec2( 1.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar2373 = fract( ( vec3( nodeVar2372.x, nodeVar2372.y, nodeVar2372.x ) * vec3( 0.1031 ) ) );
									nodeVar2373 = ( nodeVar2373 + vec3( dot( nodeVar2373, ( nodeVar2373.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2374 = length( ( ( vec2( 1.0, -1.0 ) + vec2( fract( ( ( nodeVar2371.x + nodeVar2371.y ) * nodeVar2371.z ) ), fract( ( ( nodeVar2373.x + nodeVar2373.y ) * nodeVar2373.z ) ) ) ) - nodeVar2356 ) );

									if ( ( nodeVar2374 < nodeVar2357 ) ) {

										nodeVar2358 = nodeVar2357;
										nodeVar2357 = nodeVar2374;
										nodeVar2359 = ( nodeVar2355 + vec2( 1.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar2374 < nodeVar2358 ) ) {

											nodeVar2358 = nodeVar2374;
											

										}

										

									}

									nodeVar2375 = ( nodeVar2355 + vec2( -1.0, 0.0 ) );
									nodeVar2376 = fract( ( vec3( nodeVar2375.x, nodeVar2375.y, nodeVar2375.x ) * vec3( 0.1031 ) ) );
									nodeVar2376 = ( nodeVar2376 + vec3( dot( nodeVar2376, ( nodeVar2376.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2377 = ( ( nodeVar2355 + vec2( -1.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar2378 = fract( ( vec3( nodeVar2377.x, nodeVar2377.y, nodeVar2377.x ) * vec3( 0.1031 ) ) );
									nodeVar2378 = ( nodeVar2378 + vec3( dot( nodeVar2378, ( nodeVar2378.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2379 = length( ( ( vec2( -1.0, 0.0 ) + vec2( fract( ( ( nodeVar2376.x + nodeVar2376.y ) * nodeVar2376.z ) ), fract( ( ( nodeVar2378.x + nodeVar2378.y ) * nodeVar2378.z ) ) ) ) - nodeVar2356 ) );

									if ( ( nodeVar2379 < nodeVar2357 ) ) {

										nodeVar2358 = nodeVar2357;
										nodeVar2357 = nodeVar2379;
										nodeVar2359 = ( nodeVar2355 + vec2( -1.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar2379 < nodeVar2358 ) ) {

											nodeVar2358 = nodeVar2379;
											

										}

										

									}

									nodeVar2380 = ( nodeVar2355 + vec2( 0.0, 0.0 ) );
									nodeVar2381 = fract( ( vec3( nodeVar2380.x, nodeVar2380.y, nodeVar2380.x ) * vec3( 0.1031 ) ) );
									nodeVar2381 = ( nodeVar2381 + vec3( dot( nodeVar2381, ( nodeVar2381.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2382 = ( ( nodeVar2355 + vec2( 0.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar2383 = fract( ( vec3( nodeVar2382.x, nodeVar2382.y, nodeVar2382.x ) * vec3( 0.1031 ) ) );
									nodeVar2383 = ( nodeVar2383 + vec3( dot( nodeVar2383, ( nodeVar2383.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2384 = length( ( ( vec2( 0.0, 0.0 ) + vec2( fract( ( ( nodeVar2381.x + nodeVar2381.y ) * nodeVar2381.z ) ), fract( ( ( nodeVar2383.x + nodeVar2383.y ) * nodeVar2383.z ) ) ) ) - nodeVar2356 ) );

									if ( ( nodeVar2384 < nodeVar2357 ) ) {

										nodeVar2358 = nodeVar2357;
										nodeVar2357 = nodeVar2384;
										nodeVar2359 = ( nodeVar2355 + vec2( 0.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar2384 < nodeVar2358 ) ) {

											nodeVar2358 = nodeVar2384;
											

										}

										

									}

									nodeVar2385 = ( nodeVar2355 + vec2( 1.0, 0.0 ) );
									nodeVar2386 = fract( ( vec3( nodeVar2385.x, nodeVar2385.y, nodeVar2385.x ) * vec3( 0.1031 ) ) );
									nodeVar2386 = ( nodeVar2386 + vec3( dot( nodeVar2386, ( nodeVar2386.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2387 = ( ( nodeVar2355 + vec2( 1.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar2388 = fract( ( vec3( nodeVar2387.x, nodeVar2387.y, nodeVar2387.x ) * vec3( 0.1031 ) ) );
									nodeVar2388 = ( nodeVar2388 + vec3( dot( nodeVar2388, ( nodeVar2388.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2389 = length( ( ( vec2( 1.0, 0.0 ) + vec2( fract( ( ( nodeVar2386.x + nodeVar2386.y ) * nodeVar2386.z ) ), fract( ( ( nodeVar2388.x + nodeVar2388.y ) * nodeVar2388.z ) ) ) ) - nodeVar2356 ) );

									if ( ( nodeVar2389 < nodeVar2357 ) ) {

										nodeVar2358 = nodeVar2357;
										nodeVar2357 = nodeVar2389;
										nodeVar2359 = ( nodeVar2355 + vec2( 1.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar2389 < nodeVar2358 ) ) {

											nodeVar2358 = nodeVar2389;
											

										}

										

									}

									nodeVar2390 = ( nodeVar2355 + vec2( -1.0, 1.0 ) );
									nodeVar2391 = fract( ( vec3( nodeVar2390.x, nodeVar2390.y, nodeVar2390.x ) * vec3( 0.1031 ) ) );
									nodeVar2391 = ( nodeVar2391 + vec3( dot( nodeVar2391, ( nodeVar2391.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2392 = ( ( nodeVar2355 + vec2( -1.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar2393 = fract( ( vec3( nodeVar2392.x, nodeVar2392.y, nodeVar2392.x ) * vec3( 0.1031 ) ) );
									nodeVar2393 = ( nodeVar2393 + vec3( dot( nodeVar2393, ( nodeVar2393.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2394 = length( ( ( vec2( -1.0, 1.0 ) + vec2( fract( ( ( nodeVar2391.x + nodeVar2391.y ) * nodeVar2391.z ) ), fract( ( ( nodeVar2393.x + nodeVar2393.y ) * nodeVar2393.z ) ) ) ) - nodeVar2356 ) );

									if ( ( nodeVar2394 < nodeVar2357 ) ) {

										nodeVar2358 = nodeVar2357;
										nodeVar2357 = nodeVar2394;
										nodeVar2359 = ( nodeVar2355 + vec2( -1.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar2394 < nodeVar2358 ) ) {

											nodeVar2358 = nodeVar2394;
											

										}

										

									}

									nodeVar2395 = ( nodeVar2355 + vec2( 0.0, 1.0 ) );
									nodeVar2396 = fract( ( vec3( nodeVar2395.x, nodeVar2395.y, nodeVar2395.x ) * vec3( 0.1031 ) ) );
									nodeVar2396 = ( nodeVar2396 + vec3( dot( nodeVar2396, ( nodeVar2396.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2397 = ( ( nodeVar2355 + vec2( 0.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar2398 = fract( ( vec3( nodeVar2397.x, nodeVar2397.y, nodeVar2397.x ) * vec3( 0.1031 ) ) );
									nodeVar2398 = ( nodeVar2398 + vec3( dot( nodeVar2398, ( nodeVar2398.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2399 = length( ( ( vec2( 0.0, 1.0 ) + vec2( fract( ( ( nodeVar2396.x + nodeVar2396.y ) * nodeVar2396.z ) ), fract( ( ( nodeVar2398.x + nodeVar2398.y ) * nodeVar2398.z ) ) ) ) - nodeVar2356 ) );

									if ( ( nodeVar2399 < nodeVar2357 ) ) {

										nodeVar2358 = nodeVar2357;
										nodeVar2357 = nodeVar2399;
										nodeVar2359 = ( nodeVar2355 + vec2( 0.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar2399 < nodeVar2358 ) ) {

											nodeVar2358 = nodeVar2399;
											

										}

										

									}

									nodeVar2400 = ( nodeVar2355 + vec2( 1.0, 1.0 ) );
									nodeVar2401 = fract( ( vec3( nodeVar2400.x, nodeVar2400.y, nodeVar2400.x ) * vec3( 0.1031 ) ) );
									nodeVar2401 = ( nodeVar2401 + vec3( dot( nodeVar2401, ( nodeVar2401.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2402 = ( ( nodeVar2355 + vec2( 1.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar2403 = fract( ( vec3( nodeVar2402.x, nodeVar2402.y, nodeVar2402.x ) * vec3( 0.1031 ) ) );
									nodeVar2403 = ( nodeVar2403 + vec3( dot( nodeVar2403, ( nodeVar2403.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2404 = length( ( ( vec2( 1.0, 1.0 ) + vec2( fract( ( ( nodeVar2401.x + nodeVar2401.y ) * nodeVar2401.z ) ), fract( ( ( nodeVar2403.x + nodeVar2403.y ) * nodeVar2403.z ) ) ) ) - nodeVar2356 ) );

									if ( ( nodeVar2404 < nodeVar2357 ) ) {

										nodeVar2358 = nodeVar2357;
										nodeVar2357 = nodeVar2404;
										nodeVar2359 = ( nodeVar2355 + vec2( 1.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar2404 < nodeVar2358 ) ) {

											nodeVar2358 = nodeVar2404;
											

										}

										

									}

									nodeVar2405 = smoothstep( 0.0, 0.038, ( nodeVar2358 - nodeVar2357 ) );
									nodeVar2406 = ( nodeVar2359 * vec2( 1.13 ) );
									nodeVar2407 = fract( ( vec3( nodeVar2406.x, nodeVar2406.y, nodeVar2406.x ) * vec3( 0.1031 ) ) );
									nodeVar2407 = ( nodeVar2407 + vec3( dot( nodeVar2407, ( nodeVar2407.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2408 = fract( ( ( nodeVar2407.x + nodeVar2407.y ) * nodeVar2407.z ) );
									nodeVar2409 = ( nodeVar1820 * vec2( 9.0 ) );
									nodeVar2410 = 0.0;
									nodeVar2411 = 0.5;
									nodeVar2412 = floor( nodeVar2409 );
									nodeVar2413 = fract( nodeVar2409 );
									nodeVar2413 = ( ( nodeVar2413 * nodeVar2413 ) * ( vec2( 3.0 ) - ( nodeVar2413 * vec2( 2.0 ) ) ) );
									nodeVar2414 = fract( ( vec3( nodeVar2412.x, nodeVar2412.y, nodeVar2412.x ) * vec3( 0.1031 ) ) );
									nodeVar2414 = ( nodeVar2414 + vec3( dot( nodeVar2414, ( nodeVar2414.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2415 = ( nodeVar2412 + vec2( 1.0, 0.0 ) );
									nodeVar2416 = fract( ( vec3( nodeVar2415.x, nodeVar2415.y, nodeVar2415.x ) * vec3( 0.1031 ) ) );
									nodeVar2416 = ( nodeVar2416 + vec3( dot( nodeVar2416, ( nodeVar2416.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2417 = ( nodeVar2412 + vec2( 0.0, 1.0 ) );
									nodeVar2418 = fract( ( vec3( nodeVar2417.x, nodeVar2417.y, nodeVar2417.x ) * vec3( 0.1031 ) ) );
									nodeVar2418 = ( nodeVar2418 + vec3( dot( nodeVar2418, ( nodeVar2418.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2419 = ( nodeVar2412 + vec2( 1.0, 1.0 ) );
									nodeVar2420 = fract( ( vec3( nodeVar2419.x, nodeVar2419.y, nodeVar2419.x ) * vec3( 0.1031 ) ) );
									nodeVar2420 = ( nodeVar2420 + vec3( dot( nodeVar2420, ( nodeVar2420.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2410 = ( nodeVar2410 + ( nodeVar2411 * mix( mix( fract( ( ( nodeVar2414.x + nodeVar2414.y ) * nodeVar2414.z ) ), fract( ( ( nodeVar2416.x + nodeVar2416.y ) * nodeVar2416.z ) ), nodeVar2413.x ), mix( fract( ( ( nodeVar2418.x + nodeVar2418.y ) * nodeVar2418.z ) ), fract( ( ( nodeVar2420.x + nodeVar2420.y ) * nodeVar2420.z ) ), nodeVar2413.x ), nodeVar2413.y ) ) );
									nodeVar2409 = ( nodeVar2409 * vec2( 2.03 ) );
									nodeVar2411 = ( nodeVar2411 * 0.52 );
									nodeVar2421 = floor( nodeVar2409 );
									nodeVar2422 = fract( nodeVar2409 );
									nodeVar2422 = ( ( nodeVar2422 * nodeVar2422 ) * ( vec2( 3.0 ) - ( nodeVar2422 * vec2( 2.0 ) ) ) );
									nodeVar2423 = fract( ( vec3( nodeVar2421.x, nodeVar2421.y, nodeVar2421.x ) * vec3( 0.1031 ) ) );
									nodeVar2423 = ( nodeVar2423 + vec3( dot( nodeVar2423, ( nodeVar2423.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2424 = ( nodeVar2421 + vec2( 1.0, 0.0 ) );
									nodeVar2425 = fract( ( vec3( nodeVar2424.x, nodeVar2424.y, nodeVar2424.x ) * vec3( 0.1031 ) ) );
									nodeVar2425 = ( nodeVar2425 + vec3( dot( nodeVar2425, ( nodeVar2425.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2426 = ( nodeVar2421 + vec2( 0.0, 1.0 ) );
									nodeVar2427 = fract( ( vec3( nodeVar2426.x, nodeVar2426.y, nodeVar2426.x ) * vec3( 0.1031 ) ) );
									nodeVar2427 = ( nodeVar2427 + vec3( dot( nodeVar2427, ( nodeVar2427.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2428 = ( nodeVar2421 + vec2( 1.0, 1.0 ) );
									nodeVar2429 = fract( ( vec3( nodeVar2428.x, nodeVar2428.y, nodeVar2428.x ) * vec3( 0.1031 ) ) );
									nodeVar2429 = ( nodeVar2429 + vec3( dot( nodeVar2429, ( nodeVar2429.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2410 = ( nodeVar2410 + ( nodeVar2411 * mix( mix( fract( ( ( nodeVar2423.x + nodeVar2423.y ) * nodeVar2423.z ) ), fract( ( ( nodeVar2425.x + nodeVar2425.y ) * nodeVar2425.z ) ), nodeVar2422.x ), mix( fract( ( ( nodeVar2427.x + nodeVar2427.y ) * nodeVar2427.z ) ), fract( ( ( nodeVar2429.x + nodeVar2429.y ) * nodeVar2429.z ) ), nodeVar2422.x ), nodeVar2422.y ) ) );
									nodeVar2409 = ( nodeVar2409 * vec2( 2.03 ) );
									nodeVar2411 = ( nodeVar2411 * 0.52 );
									nodeVar2430 = floor( nodeVar2409 );
									nodeVar2431 = fract( nodeVar2409 );
									nodeVar2431 = ( ( nodeVar2431 * nodeVar2431 ) * ( vec2( 3.0 ) - ( nodeVar2431 * vec2( 2.0 ) ) ) );
									nodeVar2432 = fract( ( vec3( nodeVar2430.x, nodeVar2430.y, nodeVar2430.x ) * vec3( 0.1031 ) ) );
									nodeVar2432 = ( nodeVar2432 + vec3( dot( nodeVar2432, ( nodeVar2432.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2433 = ( nodeVar2430 + vec2( 1.0, 0.0 ) );
									nodeVar2434 = fract( ( vec3( nodeVar2433.x, nodeVar2433.y, nodeVar2433.x ) * vec3( 0.1031 ) ) );
									nodeVar2434 = ( nodeVar2434 + vec3( dot( nodeVar2434, ( nodeVar2434.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2435 = ( nodeVar2430 + vec2( 0.0, 1.0 ) );
									nodeVar2436 = fract( ( vec3( nodeVar2435.x, nodeVar2435.y, nodeVar2435.x ) * vec3( 0.1031 ) ) );
									nodeVar2436 = ( nodeVar2436 + vec3( dot( nodeVar2436, ( nodeVar2436.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2437 = ( nodeVar2430 + vec2( 1.0, 1.0 ) );
									nodeVar2438 = fract( ( vec3( nodeVar2437.x, nodeVar2437.y, nodeVar2437.x ) * vec3( 0.1031 ) ) );
									nodeVar2438 = ( nodeVar2438 + vec3( dot( nodeVar2438, ( nodeVar2438.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2410 = ( nodeVar2410 + ( nodeVar2411 * mix( mix( fract( ( ( nodeVar2432.x + nodeVar2432.y ) * nodeVar2432.z ) ), fract( ( ( nodeVar2434.x + nodeVar2434.y ) * nodeVar2434.z ) ), nodeVar2431.x ), mix( fract( ( ( nodeVar2436.x + nodeVar2436.y ) * nodeVar2436.z ) ), fract( ( ( nodeVar2438.x + nodeVar2438.y ) * nodeVar2438.z ) ), nodeVar2431.x ), nodeVar2431.y ) ) );
									nodeVar2409 = ( nodeVar2409 * vec2( 2.03 ) );
									nodeVar2411 = ( nodeVar2411 * 0.52 );
									nodeVar2439 = floor( nodeVar2409 );
									nodeVar2440 = fract( nodeVar2409 );
									nodeVar2440 = ( ( nodeVar2440 * nodeVar2440 ) * ( vec2( 3.0 ) - ( nodeVar2440 * vec2( 2.0 ) ) ) );
									nodeVar2441 = fract( ( vec3( nodeVar2439.x, nodeVar2439.y, nodeVar2439.x ) * vec3( 0.1031 ) ) );
									nodeVar2441 = ( nodeVar2441 + vec3( dot( nodeVar2441, ( nodeVar2441.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2442 = ( nodeVar2439 + vec2( 1.0, 0.0 ) );
									nodeVar2443 = fract( ( vec3( nodeVar2442.x, nodeVar2442.y, nodeVar2442.x ) * vec3( 0.1031 ) ) );
									nodeVar2443 = ( nodeVar2443 + vec3( dot( nodeVar2443, ( nodeVar2443.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2444 = ( nodeVar2439 + vec2( 0.0, 1.0 ) );
									nodeVar2445 = fract( ( vec3( nodeVar2444.x, nodeVar2444.y, nodeVar2444.x ) * vec3( 0.1031 ) ) );
									nodeVar2445 = ( nodeVar2445 + vec3( dot( nodeVar2445, ( nodeVar2445.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2446 = ( nodeVar2439 + vec2( 1.0, 1.0 ) );
									nodeVar2447 = fract( ( vec3( nodeVar2446.x, nodeVar2446.y, nodeVar2446.x ) * vec3( 0.1031 ) ) );
									nodeVar2447 = ( nodeVar2447 + vec3( dot( nodeVar2447, ( nodeVar2447.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar2410 = ( nodeVar2410 + ( nodeVar2411 * mix( mix( fract( ( ( nodeVar2441.x + nodeVar2441.y ) * nodeVar2441.z ) ), fract( ( ( nodeVar2443.x + nodeVar2443.y ) * nodeVar2443.z ) ), nodeVar2440.x ), mix( fract( ( ( nodeVar2445.x + nodeVar2445.y ) * nodeVar2445.z ) ), fract( ( ( nodeVar2447.x + nodeVar2447.y ) * nodeVar2447.z ) ), nodeVar2440.x ), nodeVar2440.y ) ) );
									nodeVar2409 = ( nodeVar2409 * vec2( 2.03 ) );
									nodeVar2411 = ( nodeVar2411 * 0.52 );
									nodeVar1822 = vec3( ( ( ( nodeVar2405 * ( 0.5 + ( nodeVar2408 * 0.5 ) ) ) * 0.5 ) + ( ( nodeVar2405 * 0.22 ) * nodeVar2410 ) ), nodeVar2405, nodeVar2408 );
									

								} else {


									if ( ( nodeVar1821 < 8.5 ) ) {

										nodeVar2448 = ( nodeVar1820 * vec2( 0.9 ) );
										nodeVar2449 = 0.0;
										nodeVar2450 = 0.5;
										nodeVar2451 = floor( nodeVar2448 );
										nodeVar2452 = fract( nodeVar2448 );
										nodeVar2452 = ( ( nodeVar2452 * nodeVar2452 ) * ( vec2( 3.0 ) - ( nodeVar2452 * vec2( 2.0 ) ) ) );
										nodeVar2453 = fract( ( vec3( nodeVar2451.x, nodeVar2451.y, nodeVar2451.x ) * vec3( 0.1031 ) ) );
										nodeVar2453 = ( nodeVar2453 + vec3( dot( nodeVar2453, ( nodeVar2453.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2454 = ( nodeVar2451 + vec2( 1.0, 0.0 ) );
										nodeVar2455 = fract( ( vec3( nodeVar2454.x, nodeVar2454.y, nodeVar2454.x ) * vec3( 0.1031 ) ) );
										nodeVar2455 = ( nodeVar2455 + vec3( dot( nodeVar2455, ( nodeVar2455.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2456 = ( nodeVar2451 + vec2( 0.0, 1.0 ) );
										nodeVar2457 = fract( ( vec3( nodeVar2456.x, nodeVar2456.y, nodeVar2456.x ) * vec3( 0.1031 ) ) );
										nodeVar2457 = ( nodeVar2457 + vec3( dot( nodeVar2457, ( nodeVar2457.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2458 = ( nodeVar2451 + vec2( 1.0, 1.0 ) );
										nodeVar2459 = fract( ( vec3( nodeVar2458.x, nodeVar2458.y, nodeVar2458.x ) * vec3( 0.1031 ) ) );
										nodeVar2459 = ( nodeVar2459 + vec3( dot( nodeVar2459, ( nodeVar2459.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2449 = ( nodeVar2449 + ( nodeVar2450 * mix( mix( fract( ( ( nodeVar2453.x + nodeVar2453.y ) * nodeVar2453.z ) ), fract( ( ( nodeVar2455.x + nodeVar2455.y ) * nodeVar2455.z ) ), nodeVar2452.x ), mix( fract( ( ( nodeVar2457.x + nodeVar2457.y ) * nodeVar2457.z ) ), fract( ( ( nodeVar2459.x + nodeVar2459.y ) * nodeVar2459.z ) ), nodeVar2452.x ), nodeVar2452.y ) ) );
										nodeVar2448 = ( nodeVar2448 * vec2( 2.03 ) );
										nodeVar2450 = ( nodeVar2450 * 0.52 );
										nodeVar2460 = floor( nodeVar2448 );
										nodeVar2461 = fract( nodeVar2448 );
										nodeVar2461 = ( ( nodeVar2461 * nodeVar2461 ) * ( vec2( 3.0 ) - ( nodeVar2461 * vec2( 2.0 ) ) ) );
										nodeVar2462 = fract( ( vec3( nodeVar2460.x, nodeVar2460.y, nodeVar2460.x ) * vec3( 0.1031 ) ) );
										nodeVar2462 = ( nodeVar2462 + vec3( dot( nodeVar2462, ( nodeVar2462.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2463 = ( nodeVar2460 + vec2( 1.0, 0.0 ) );
										nodeVar2464 = fract( ( vec3( nodeVar2463.x, nodeVar2463.y, nodeVar2463.x ) * vec3( 0.1031 ) ) );
										nodeVar2464 = ( nodeVar2464 + vec3( dot( nodeVar2464, ( nodeVar2464.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2465 = ( nodeVar2460 + vec2( 0.0, 1.0 ) );
										nodeVar2466 = fract( ( vec3( nodeVar2465.x, nodeVar2465.y, nodeVar2465.x ) * vec3( 0.1031 ) ) );
										nodeVar2466 = ( nodeVar2466 + vec3( dot( nodeVar2466, ( nodeVar2466.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2467 = ( nodeVar2460 + vec2( 1.0, 1.0 ) );
										nodeVar2468 = fract( ( vec3( nodeVar2467.x, nodeVar2467.y, nodeVar2467.x ) * vec3( 0.1031 ) ) );
										nodeVar2468 = ( nodeVar2468 + vec3( dot( nodeVar2468, ( nodeVar2468.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2449 = ( nodeVar2449 + ( nodeVar2450 * mix( mix( fract( ( ( nodeVar2462.x + nodeVar2462.y ) * nodeVar2462.z ) ), fract( ( ( nodeVar2464.x + nodeVar2464.y ) * nodeVar2464.z ) ), nodeVar2461.x ), mix( fract( ( ( nodeVar2466.x + nodeVar2466.y ) * nodeVar2466.z ) ), fract( ( ( nodeVar2468.x + nodeVar2468.y ) * nodeVar2468.z ) ), nodeVar2461.x ), nodeVar2461.y ) ) );
										nodeVar2448 = ( nodeVar2448 * vec2( 2.03 ) );
										nodeVar2450 = ( nodeVar2450 * 0.52 );
										nodeVar2469 = floor( nodeVar2448 );
										nodeVar2470 = fract( nodeVar2448 );
										nodeVar2470 = ( ( nodeVar2470 * nodeVar2470 ) * ( vec2( 3.0 ) - ( nodeVar2470 * vec2( 2.0 ) ) ) );
										nodeVar2471 = fract( ( vec3( nodeVar2469.x, nodeVar2469.y, nodeVar2469.x ) * vec3( 0.1031 ) ) );
										nodeVar2471 = ( nodeVar2471 + vec3( dot( nodeVar2471, ( nodeVar2471.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2472 = ( nodeVar2469 + vec2( 1.0, 0.0 ) );
										nodeVar2473 = fract( ( vec3( nodeVar2472.x, nodeVar2472.y, nodeVar2472.x ) * vec3( 0.1031 ) ) );
										nodeVar2473 = ( nodeVar2473 + vec3( dot( nodeVar2473, ( nodeVar2473.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2474 = ( nodeVar2469 + vec2( 0.0, 1.0 ) );
										nodeVar2475 = fract( ( vec3( nodeVar2474.x, nodeVar2474.y, nodeVar2474.x ) * vec3( 0.1031 ) ) );
										nodeVar2475 = ( nodeVar2475 + vec3( dot( nodeVar2475, ( nodeVar2475.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2476 = ( nodeVar2469 + vec2( 1.0, 1.0 ) );
										nodeVar2477 = fract( ( vec3( nodeVar2476.x, nodeVar2476.y, nodeVar2476.x ) * vec3( 0.1031 ) ) );
										nodeVar2477 = ( nodeVar2477 + vec3( dot( nodeVar2477, ( nodeVar2477.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2449 = ( nodeVar2449 + ( nodeVar2450 * mix( mix( fract( ( ( nodeVar2471.x + nodeVar2471.y ) * nodeVar2471.z ) ), fract( ( ( nodeVar2473.x + nodeVar2473.y ) * nodeVar2473.z ) ), nodeVar2470.x ), mix( fract( ( ( nodeVar2475.x + nodeVar2475.y ) * nodeVar2475.z ) ), fract( ( ( nodeVar2477.x + nodeVar2477.y ) * nodeVar2477.z ) ), nodeVar2470.x ), nodeVar2470.y ) ) );
										nodeVar2448 = ( nodeVar2448 * vec2( 2.03 ) );
										nodeVar2450 = ( nodeVar2450 * 0.52 );
										nodeVar2478 = floor( nodeVar2448 );
										nodeVar2479 = fract( nodeVar2448 );
										nodeVar2479 = ( ( nodeVar2479 * nodeVar2479 ) * ( vec2( 3.0 ) - ( nodeVar2479 * vec2( 2.0 ) ) ) );
										nodeVar2480 = fract( ( vec3( nodeVar2478.x, nodeVar2478.y, nodeVar2478.x ) * vec3( 0.1031 ) ) );
										nodeVar2480 = ( nodeVar2480 + vec3( dot( nodeVar2480, ( nodeVar2480.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2481 = ( nodeVar2478 + vec2( 1.0, 0.0 ) );
										nodeVar2482 = fract( ( vec3( nodeVar2481.x, nodeVar2481.y, nodeVar2481.x ) * vec3( 0.1031 ) ) );
										nodeVar2482 = ( nodeVar2482 + vec3( dot( nodeVar2482, ( nodeVar2482.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2483 = ( nodeVar2478 + vec2( 0.0, 1.0 ) );
										nodeVar2484 = fract( ( vec3( nodeVar2483.x, nodeVar2483.y, nodeVar2483.x ) * vec3( 0.1031 ) ) );
										nodeVar2484 = ( nodeVar2484 + vec3( dot( nodeVar2484, ( nodeVar2484.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2485 = ( nodeVar2478 + vec2( 1.0, 1.0 ) );
										nodeVar2486 = fract( ( vec3( nodeVar2485.x, nodeVar2485.y, nodeVar2485.x ) * vec3( 0.1031 ) ) );
										nodeVar2486 = ( nodeVar2486 + vec3( dot( nodeVar2486, ( nodeVar2486.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2449 = ( nodeVar2449 + ( nodeVar2450 * mix( mix( fract( ( ( nodeVar2480.x + nodeVar2480.y ) * nodeVar2480.z ) ), fract( ( ( nodeVar2482.x + nodeVar2482.y ) * nodeVar2482.z ) ), nodeVar2479.x ), mix( fract( ( ( nodeVar2484.x + nodeVar2484.y ) * nodeVar2484.z ) ), fract( ( ( nodeVar2486.x + nodeVar2486.y ) * nodeVar2486.z ) ), nodeVar2479.x ), nodeVar2479.y ) ) );
										nodeVar2448 = ( nodeVar2448 * vec2( 2.03 ) );
										nodeVar2450 = ( nodeVar2450 * 0.52 );
										nodeVar2487 = ( nodeVar1820 * vec2( 6.0 ) );
										nodeVar2488 = 0.0;
										nodeVar2489 = 0.5;
										nodeVar2490 = floor( nodeVar2487 );
										nodeVar2491 = fract( nodeVar2487 );
										nodeVar2491 = ( ( nodeVar2491 * nodeVar2491 ) * ( vec2( 3.0 ) - ( nodeVar2491 * vec2( 2.0 ) ) ) );
										nodeVar2492 = fract( ( vec3( nodeVar2490.x, nodeVar2490.y, nodeVar2490.x ) * vec3( 0.1031 ) ) );
										nodeVar2492 = ( nodeVar2492 + vec3( dot( nodeVar2492, ( nodeVar2492.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2493 = ( nodeVar2490 + vec2( 1.0, 0.0 ) );
										nodeVar2494 = fract( ( vec3( nodeVar2493.x, nodeVar2493.y, nodeVar2493.x ) * vec3( 0.1031 ) ) );
										nodeVar2494 = ( nodeVar2494 + vec3( dot( nodeVar2494, ( nodeVar2494.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2495 = ( nodeVar2490 + vec2( 0.0, 1.0 ) );
										nodeVar2496 = fract( ( vec3( nodeVar2495.x, nodeVar2495.y, nodeVar2495.x ) * vec3( 0.1031 ) ) );
										nodeVar2496 = ( nodeVar2496 + vec3( dot( nodeVar2496, ( nodeVar2496.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2497 = ( nodeVar2490 + vec2( 1.0, 1.0 ) );
										nodeVar2498 = fract( ( vec3( nodeVar2497.x, nodeVar2497.y, nodeVar2497.x ) * vec3( 0.1031 ) ) );
										nodeVar2498 = ( nodeVar2498 + vec3( dot( nodeVar2498, ( nodeVar2498.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2488 = ( nodeVar2488 + ( nodeVar2489 * mix( mix( fract( ( ( nodeVar2492.x + nodeVar2492.y ) * nodeVar2492.z ) ), fract( ( ( nodeVar2494.x + nodeVar2494.y ) * nodeVar2494.z ) ), nodeVar2491.x ), mix( fract( ( ( nodeVar2496.x + nodeVar2496.y ) * nodeVar2496.z ) ), fract( ( ( nodeVar2498.x + nodeVar2498.y ) * nodeVar2498.z ) ), nodeVar2491.x ), nodeVar2491.y ) ) );
										nodeVar2487 = ( nodeVar2487 * vec2( 2.03 ) );
										nodeVar2489 = ( nodeVar2489 * 0.52 );
										nodeVar2499 = floor( nodeVar2487 );
										nodeVar2500 = fract( nodeVar2487 );
										nodeVar2500 = ( ( nodeVar2500 * nodeVar2500 ) * ( vec2( 3.0 ) - ( nodeVar2500 * vec2( 2.0 ) ) ) );
										nodeVar2501 = fract( ( vec3( nodeVar2499.x, nodeVar2499.y, nodeVar2499.x ) * vec3( 0.1031 ) ) );
										nodeVar2501 = ( nodeVar2501 + vec3( dot( nodeVar2501, ( nodeVar2501.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2502 = ( nodeVar2499 + vec2( 1.0, 0.0 ) );
										nodeVar2503 = fract( ( vec3( nodeVar2502.x, nodeVar2502.y, nodeVar2502.x ) * vec3( 0.1031 ) ) );
										nodeVar2503 = ( nodeVar2503 + vec3( dot( nodeVar2503, ( nodeVar2503.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2504 = ( nodeVar2499 + vec2( 0.0, 1.0 ) );
										nodeVar2505 = fract( ( vec3( nodeVar2504.x, nodeVar2504.y, nodeVar2504.x ) * vec3( 0.1031 ) ) );
										nodeVar2505 = ( nodeVar2505 + vec3( dot( nodeVar2505, ( nodeVar2505.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2506 = ( nodeVar2499 + vec2( 1.0, 1.0 ) );
										nodeVar2507 = fract( ( vec3( nodeVar2506.x, nodeVar2506.y, nodeVar2506.x ) * vec3( 0.1031 ) ) );
										nodeVar2507 = ( nodeVar2507 + vec3( dot( nodeVar2507, ( nodeVar2507.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2488 = ( nodeVar2488 + ( nodeVar2489 * mix( mix( fract( ( ( nodeVar2501.x + nodeVar2501.y ) * nodeVar2501.z ) ), fract( ( ( nodeVar2503.x + nodeVar2503.y ) * nodeVar2503.z ) ), nodeVar2500.x ), mix( fract( ( ( nodeVar2505.x + nodeVar2505.y ) * nodeVar2505.z ) ), fract( ( ( nodeVar2507.x + nodeVar2507.y ) * nodeVar2507.z ) ), nodeVar2500.x ), nodeVar2500.y ) ) );
										nodeVar2487 = ( nodeVar2487 * vec2( 2.03 ) );
										nodeVar2489 = ( nodeVar2489 * 0.52 );
										nodeVar2508 = floor( nodeVar2487 );
										nodeVar2509 = fract( nodeVar2487 );
										nodeVar2509 = ( ( nodeVar2509 * nodeVar2509 ) * ( vec2( 3.0 ) - ( nodeVar2509 * vec2( 2.0 ) ) ) );
										nodeVar2510 = fract( ( vec3( nodeVar2508.x, nodeVar2508.y, nodeVar2508.x ) * vec3( 0.1031 ) ) );
										nodeVar2510 = ( nodeVar2510 + vec3( dot( nodeVar2510, ( nodeVar2510.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2511 = ( nodeVar2508 + vec2( 1.0, 0.0 ) );
										nodeVar2512 = fract( ( vec3( nodeVar2511.x, nodeVar2511.y, nodeVar2511.x ) * vec3( 0.1031 ) ) );
										nodeVar2512 = ( nodeVar2512 + vec3( dot( nodeVar2512, ( nodeVar2512.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2513 = ( nodeVar2508 + vec2( 0.0, 1.0 ) );
										nodeVar2514 = fract( ( vec3( nodeVar2513.x, nodeVar2513.y, nodeVar2513.x ) * vec3( 0.1031 ) ) );
										nodeVar2514 = ( nodeVar2514 + vec3( dot( nodeVar2514, ( nodeVar2514.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2515 = ( nodeVar2508 + vec2( 1.0, 1.0 ) );
										nodeVar2516 = fract( ( vec3( nodeVar2515.x, nodeVar2515.y, nodeVar2515.x ) * vec3( 0.1031 ) ) );
										nodeVar2516 = ( nodeVar2516 + vec3( dot( nodeVar2516, ( nodeVar2516.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2488 = ( nodeVar2488 + ( nodeVar2489 * mix( mix( fract( ( ( nodeVar2510.x + nodeVar2510.y ) * nodeVar2510.z ) ), fract( ( ( nodeVar2512.x + nodeVar2512.y ) * nodeVar2512.z ) ), nodeVar2509.x ), mix( fract( ( ( nodeVar2514.x + nodeVar2514.y ) * nodeVar2514.z ) ), fract( ( ( nodeVar2516.x + nodeVar2516.y ) * nodeVar2516.z ) ), nodeVar2509.x ), nodeVar2509.y ) ) );
										nodeVar2487 = ( nodeVar2487 * vec2( 2.03 ) );
										nodeVar2489 = ( nodeVar2489 * 0.52 );
										nodeVar2517 = floor( nodeVar2487 );
										nodeVar2518 = fract( nodeVar2487 );
										nodeVar2518 = ( ( nodeVar2518 * nodeVar2518 ) * ( vec2( 3.0 ) - ( nodeVar2518 * vec2( 2.0 ) ) ) );
										nodeVar2519 = fract( ( vec3( nodeVar2517.x, nodeVar2517.y, nodeVar2517.x ) * vec3( 0.1031 ) ) );
										nodeVar2519 = ( nodeVar2519 + vec3( dot( nodeVar2519, ( nodeVar2519.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2520 = ( nodeVar2517 + vec2( 1.0, 0.0 ) );
										nodeVar2521 = fract( ( vec3( nodeVar2520.x, nodeVar2520.y, nodeVar2520.x ) * vec3( 0.1031 ) ) );
										nodeVar2521 = ( nodeVar2521 + vec3( dot( nodeVar2521, ( nodeVar2521.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2522 = ( nodeVar2517 + vec2( 0.0, 1.0 ) );
										nodeVar2523 = fract( ( vec3( nodeVar2522.x, nodeVar2522.y, nodeVar2522.x ) * vec3( 0.1031 ) ) );
										nodeVar2523 = ( nodeVar2523 + vec3( dot( nodeVar2523, ( nodeVar2523.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2524 = ( nodeVar2517 + vec2( 1.0, 1.0 ) );
										nodeVar2525 = fract( ( vec3( nodeVar2524.x, nodeVar2524.y, nodeVar2524.x ) * vec3( 0.1031 ) ) );
										nodeVar2525 = ( nodeVar2525 + vec3( dot( nodeVar2525, ( nodeVar2525.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar2488 = ( nodeVar2488 + ( nodeVar2489 * mix( mix( fract( ( ( nodeVar2519.x + nodeVar2519.y ) * nodeVar2519.z ) ), fract( ( ( nodeVar2521.x + nodeVar2521.y ) * nodeVar2521.z ) ), nodeVar2518.x ), mix( fract( ( ( nodeVar2523.x + nodeVar2523.y ) * nodeVar2523.z ) ), fract( ( ( nodeVar2525.x + nodeVar2525.y ) * nodeVar2525.z ) ), nodeVar2518.x ), nodeVar2518.y ) ) );
										nodeVar2487 = ( nodeVar2487 * vec2( 2.03 ) );
										nodeVar2489 = ( nodeVar2489 * 0.52 );
										nodeVar2526 = ( ( nodeVar2449 * 0.6 ) + ( nodeVar2488 * 0.4 ) );
										nodeVar1822 = vec3( nodeVar2526, 1.0, nodeVar2526 );
										

									} else {


										if ( ( nodeVar1821 < 9.5 ) ) {

											nodeVar2527 = ( nodeVar1820 * vec2( 26.0 ) );
											nodeVar2528 = 0.0;
											nodeVar2529 = 0.5;
											nodeVar2530 = floor( nodeVar2527 );
											nodeVar2531 = fract( nodeVar2527 );
											nodeVar2531 = ( ( nodeVar2531 * nodeVar2531 ) * ( vec2( 3.0 ) - ( nodeVar2531 * vec2( 2.0 ) ) ) );
											nodeVar2532 = fract( ( vec3( nodeVar2530.x, nodeVar2530.y, nodeVar2530.x ) * vec3( 0.1031 ) ) );
											nodeVar2532 = ( nodeVar2532 + vec3( dot( nodeVar2532, ( nodeVar2532.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2533 = ( nodeVar2530 + vec2( 1.0, 0.0 ) );
											nodeVar2534 = fract( ( vec3( nodeVar2533.x, nodeVar2533.y, nodeVar2533.x ) * vec3( 0.1031 ) ) );
											nodeVar2534 = ( nodeVar2534 + vec3( dot( nodeVar2534, ( nodeVar2534.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2535 = ( nodeVar2530 + vec2( 0.0, 1.0 ) );
											nodeVar2536 = fract( ( vec3( nodeVar2535.x, nodeVar2535.y, nodeVar2535.x ) * vec3( 0.1031 ) ) );
											nodeVar2536 = ( nodeVar2536 + vec3( dot( nodeVar2536, ( nodeVar2536.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2537 = ( nodeVar2530 + vec2( 1.0, 1.0 ) );
											nodeVar2538 = fract( ( vec3( nodeVar2537.x, nodeVar2537.y, nodeVar2537.x ) * vec3( 0.1031 ) ) );
											nodeVar2538 = ( nodeVar2538 + vec3( dot( nodeVar2538, ( nodeVar2538.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2528 = ( nodeVar2528 + ( nodeVar2529 * mix( mix( fract( ( ( nodeVar2532.x + nodeVar2532.y ) * nodeVar2532.z ) ), fract( ( ( nodeVar2534.x + nodeVar2534.y ) * nodeVar2534.z ) ), nodeVar2531.x ), mix( fract( ( ( nodeVar2536.x + nodeVar2536.y ) * nodeVar2536.z ) ), fract( ( ( nodeVar2538.x + nodeVar2538.y ) * nodeVar2538.z ) ), nodeVar2531.x ), nodeVar2531.y ) ) );
											nodeVar2527 = ( nodeVar2527 * vec2( 2.03 ) );
											nodeVar2529 = ( nodeVar2529 * 0.52 );
											nodeVar2539 = floor( nodeVar2527 );
											nodeVar2540 = fract( nodeVar2527 );
											nodeVar2540 = ( ( nodeVar2540 * nodeVar2540 ) * ( vec2( 3.0 ) - ( nodeVar2540 * vec2( 2.0 ) ) ) );
											nodeVar2541 = fract( ( vec3( nodeVar2539.x, nodeVar2539.y, nodeVar2539.x ) * vec3( 0.1031 ) ) );
											nodeVar2541 = ( nodeVar2541 + vec3( dot( nodeVar2541, ( nodeVar2541.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2542 = ( nodeVar2539 + vec2( 1.0, 0.0 ) );
											nodeVar2543 = fract( ( vec3( nodeVar2542.x, nodeVar2542.y, nodeVar2542.x ) * vec3( 0.1031 ) ) );
											nodeVar2543 = ( nodeVar2543 + vec3( dot( nodeVar2543, ( nodeVar2543.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2544 = ( nodeVar2539 + vec2( 0.0, 1.0 ) );
											nodeVar2545 = fract( ( vec3( nodeVar2544.x, nodeVar2544.y, nodeVar2544.x ) * vec3( 0.1031 ) ) );
											nodeVar2545 = ( nodeVar2545 + vec3( dot( nodeVar2545, ( nodeVar2545.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2546 = ( nodeVar2539 + vec2( 1.0, 1.0 ) );
											nodeVar2547 = fract( ( vec3( nodeVar2546.x, nodeVar2546.y, nodeVar2546.x ) * vec3( 0.1031 ) ) );
											nodeVar2547 = ( nodeVar2547 + vec3( dot( nodeVar2547, ( nodeVar2547.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2528 = ( nodeVar2528 + ( nodeVar2529 * mix( mix( fract( ( ( nodeVar2541.x + nodeVar2541.y ) * nodeVar2541.z ) ), fract( ( ( nodeVar2543.x + nodeVar2543.y ) * nodeVar2543.z ) ), nodeVar2540.x ), mix( fract( ( ( nodeVar2545.x + nodeVar2545.y ) * nodeVar2545.z ) ), fract( ( ( nodeVar2547.x + nodeVar2547.y ) * nodeVar2547.z ) ), nodeVar2540.x ), nodeVar2540.y ) ) );
											nodeVar2527 = ( nodeVar2527 * vec2( 2.03 ) );
											nodeVar2529 = ( nodeVar2529 * 0.52 );
											nodeVar2548 = floor( nodeVar2527 );
											nodeVar2549 = fract( nodeVar2527 );
											nodeVar2549 = ( ( nodeVar2549 * nodeVar2549 ) * ( vec2( 3.0 ) - ( nodeVar2549 * vec2( 2.0 ) ) ) );
											nodeVar2550 = fract( ( vec3( nodeVar2548.x, nodeVar2548.y, nodeVar2548.x ) * vec3( 0.1031 ) ) );
											nodeVar2550 = ( nodeVar2550 + vec3( dot( nodeVar2550, ( nodeVar2550.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2551 = ( nodeVar2548 + vec2( 1.0, 0.0 ) );
											nodeVar2552 = fract( ( vec3( nodeVar2551.x, nodeVar2551.y, nodeVar2551.x ) * vec3( 0.1031 ) ) );
											nodeVar2552 = ( nodeVar2552 + vec3( dot( nodeVar2552, ( nodeVar2552.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2553 = ( nodeVar2548 + vec2( 0.0, 1.0 ) );
											nodeVar2554 = fract( ( vec3( nodeVar2553.x, nodeVar2553.y, nodeVar2553.x ) * vec3( 0.1031 ) ) );
											nodeVar2554 = ( nodeVar2554 + vec3( dot( nodeVar2554, ( nodeVar2554.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2555 = ( nodeVar2548 + vec2( 1.0, 1.0 ) );
											nodeVar2556 = fract( ( vec3( nodeVar2555.x, nodeVar2555.y, nodeVar2555.x ) * vec3( 0.1031 ) ) );
											nodeVar2556 = ( nodeVar2556 + vec3( dot( nodeVar2556, ( nodeVar2556.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2528 = ( nodeVar2528 + ( nodeVar2529 * mix( mix( fract( ( ( nodeVar2550.x + nodeVar2550.y ) * nodeVar2550.z ) ), fract( ( ( nodeVar2552.x + nodeVar2552.y ) * nodeVar2552.z ) ), nodeVar2549.x ), mix( fract( ( ( nodeVar2554.x + nodeVar2554.y ) * nodeVar2554.z ) ), fract( ( ( nodeVar2556.x + nodeVar2556.y ) * nodeVar2556.z ) ), nodeVar2549.x ), nodeVar2549.y ) ) );
											nodeVar2527 = ( nodeVar2527 * vec2( 2.03 ) );
											nodeVar2529 = ( nodeVar2529 * 0.52 );
											nodeVar2557 = floor( nodeVar2527 );
											nodeVar2558 = fract( nodeVar2527 );
											nodeVar2558 = ( ( nodeVar2558 * nodeVar2558 ) * ( vec2( 3.0 ) - ( nodeVar2558 * vec2( 2.0 ) ) ) );
											nodeVar2559 = fract( ( vec3( nodeVar2557.x, nodeVar2557.y, nodeVar2557.x ) * vec3( 0.1031 ) ) );
											nodeVar2559 = ( nodeVar2559 + vec3( dot( nodeVar2559, ( nodeVar2559.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2560 = ( nodeVar2557 + vec2( 1.0, 0.0 ) );
											nodeVar2561 = fract( ( vec3( nodeVar2560.x, nodeVar2560.y, nodeVar2560.x ) * vec3( 0.1031 ) ) );
											nodeVar2561 = ( nodeVar2561 + vec3( dot( nodeVar2561, ( nodeVar2561.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2562 = ( nodeVar2557 + vec2( 0.0, 1.0 ) );
											nodeVar2563 = fract( ( vec3( nodeVar2562.x, nodeVar2562.y, nodeVar2562.x ) * vec3( 0.1031 ) ) );
											nodeVar2563 = ( nodeVar2563 + vec3( dot( nodeVar2563, ( nodeVar2563.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2564 = ( nodeVar2557 + vec2( 1.0, 1.0 ) );
											nodeVar2565 = fract( ( vec3( nodeVar2564.x, nodeVar2564.y, nodeVar2564.x ) * vec3( 0.1031 ) ) );
											nodeVar2565 = ( nodeVar2565 + vec3( dot( nodeVar2565, ( nodeVar2565.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2528 = ( nodeVar2528 + ( nodeVar2529 * mix( mix( fract( ( ( nodeVar2559.x + nodeVar2559.y ) * nodeVar2559.z ) ), fract( ( ( nodeVar2561.x + nodeVar2561.y ) * nodeVar2561.z ) ), nodeVar2558.x ), mix( fract( ( ( nodeVar2563.x + nodeVar2563.y ) * nodeVar2563.z ) ), fract( ( ( nodeVar2565.x + nodeVar2565.y ) * nodeVar2565.z ) ), nodeVar2558.x ), nodeVar2558.y ) ) );
											nodeVar2527 = ( nodeVar2527 * vec2( 2.03 ) );
											nodeVar2529 = ( nodeVar2529 * 0.52 );
											nodeVar2566 = ( nodeVar1820 * vec2( 90.0 ) );
											nodeVar2567 = 0.0;
											nodeVar2568 = 0.5;
											nodeVar2569 = floor( nodeVar2566 );
											nodeVar2570 = fract( nodeVar2566 );
											nodeVar2570 = ( ( nodeVar2570 * nodeVar2570 ) * ( vec2( 3.0 ) - ( nodeVar2570 * vec2( 2.0 ) ) ) );
											nodeVar2571 = fract( ( vec3( nodeVar2569.x, nodeVar2569.y, nodeVar2569.x ) * vec3( 0.1031 ) ) );
											nodeVar2571 = ( nodeVar2571 + vec3( dot( nodeVar2571, ( nodeVar2571.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2572 = ( nodeVar2569 + vec2( 1.0, 0.0 ) );
											nodeVar2573 = fract( ( vec3( nodeVar2572.x, nodeVar2572.y, nodeVar2572.x ) * vec3( 0.1031 ) ) );
											nodeVar2573 = ( nodeVar2573 + vec3( dot( nodeVar2573, ( nodeVar2573.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2574 = ( nodeVar2569 + vec2( 0.0, 1.0 ) );
											nodeVar2575 = fract( ( vec3( nodeVar2574.x, nodeVar2574.y, nodeVar2574.x ) * vec3( 0.1031 ) ) );
											nodeVar2575 = ( nodeVar2575 + vec3( dot( nodeVar2575, ( nodeVar2575.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2576 = ( nodeVar2569 + vec2( 1.0, 1.0 ) );
											nodeVar2577 = fract( ( vec3( nodeVar2576.x, nodeVar2576.y, nodeVar2576.x ) * vec3( 0.1031 ) ) );
											nodeVar2577 = ( nodeVar2577 + vec3( dot( nodeVar2577, ( nodeVar2577.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2567 = ( nodeVar2567 + ( nodeVar2568 * mix( mix( fract( ( ( nodeVar2571.x + nodeVar2571.y ) * nodeVar2571.z ) ), fract( ( ( nodeVar2573.x + nodeVar2573.y ) * nodeVar2573.z ) ), nodeVar2570.x ), mix( fract( ( ( nodeVar2575.x + nodeVar2575.y ) * nodeVar2575.z ) ), fract( ( ( nodeVar2577.x + nodeVar2577.y ) * nodeVar2577.z ) ), nodeVar2570.x ), nodeVar2570.y ) ) );
											nodeVar2566 = ( nodeVar2566 * vec2( 2.03 ) );
											nodeVar2568 = ( nodeVar2568 * 0.52 );
											nodeVar2578 = floor( nodeVar2566 );
											nodeVar2579 = fract( nodeVar2566 );
											nodeVar2579 = ( ( nodeVar2579 * nodeVar2579 ) * ( vec2( 3.0 ) - ( nodeVar2579 * vec2( 2.0 ) ) ) );
											nodeVar2580 = fract( ( vec3( nodeVar2578.x, nodeVar2578.y, nodeVar2578.x ) * vec3( 0.1031 ) ) );
											nodeVar2580 = ( nodeVar2580 + vec3( dot( nodeVar2580, ( nodeVar2580.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2581 = ( nodeVar2578 + vec2( 1.0, 0.0 ) );
											nodeVar2582 = fract( ( vec3( nodeVar2581.x, nodeVar2581.y, nodeVar2581.x ) * vec3( 0.1031 ) ) );
											nodeVar2582 = ( nodeVar2582 + vec3( dot( nodeVar2582, ( nodeVar2582.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2583 = ( nodeVar2578 + vec2( 0.0, 1.0 ) );
											nodeVar2584 = fract( ( vec3( nodeVar2583.x, nodeVar2583.y, nodeVar2583.x ) * vec3( 0.1031 ) ) );
											nodeVar2584 = ( nodeVar2584 + vec3( dot( nodeVar2584, ( nodeVar2584.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2585 = ( nodeVar2578 + vec2( 1.0, 1.0 ) );
											nodeVar2586 = fract( ( vec3( nodeVar2585.x, nodeVar2585.y, nodeVar2585.x ) * vec3( 0.1031 ) ) );
											nodeVar2586 = ( nodeVar2586 + vec3( dot( nodeVar2586, ( nodeVar2586.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2567 = ( nodeVar2567 + ( nodeVar2568 * mix( mix( fract( ( ( nodeVar2580.x + nodeVar2580.y ) * nodeVar2580.z ) ), fract( ( ( nodeVar2582.x + nodeVar2582.y ) * nodeVar2582.z ) ), nodeVar2579.x ), mix( fract( ( ( nodeVar2584.x + nodeVar2584.y ) * nodeVar2584.z ) ), fract( ( ( nodeVar2586.x + nodeVar2586.y ) * nodeVar2586.z ) ), nodeVar2579.x ), nodeVar2579.y ) ) );
											nodeVar2566 = ( nodeVar2566 * vec2( 2.03 ) );
											nodeVar2568 = ( nodeVar2568 * 0.52 );
											nodeVar2587 = floor( nodeVar2566 );
											nodeVar2588 = fract( nodeVar2566 );
											nodeVar2588 = ( ( nodeVar2588 * nodeVar2588 ) * ( vec2( 3.0 ) - ( nodeVar2588 * vec2( 2.0 ) ) ) );
											nodeVar2589 = fract( ( vec3( nodeVar2587.x, nodeVar2587.y, nodeVar2587.x ) * vec3( 0.1031 ) ) );
											nodeVar2589 = ( nodeVar2589 + vec3( dot( nodeVar2589, ( nodeVar2589.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2590 = ( nodeVar2587 + vec2( 1.0, 0.0 ) );
											nodeVar2591 = fract( ( vec3( nodeVar2590.x, nodeVar2590.y, nodeVar2590.x ) * vec3( 0.1031 ) ) );
											nodeVar2591 = ( nodeVar2591 + vec3( dot( nodeVar2591, ( nodeVar2591.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2592 = ( nodeVar2587 + vec2( 0.0, 1.0 ) );
											nodeVar2593 = fract( ( vec3( nodeVar2592.x, nodeVar2592.y, nodeVar2592.x ) * vec3( 0.1031 ) ) );
											nodeVar2593 = ( nodeVar2593 + vec3( dot( nodeVar2593, ( nodeVar2593.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2594 = ( nodeVar2587 + vec2( 1.0, 1.0 ) );
											nodeVar2595 = fract( ( vec3( nodeVar2594.x, nodeVar2594.y, nodeVar2594.x ) * vec3( 0.1031 ) ) );
											nodeVar2595 = ( nodeVar2595 + vec3( dot( nodeVar2595, ( nodeVar2595.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2567 = ( nodeVar2567 + ( nodeVar2568 * mix( mix( fract( ( ( nodeVar2589.x + nodeVar2589.y ) * nodeVar2589.z ) ), fract( ( ( nodeVar2591.x + nodeVar2591.y ) * nodeVar2591.z ) ), nodeVar2588.x ), mix( fract( ( ( nodeVar2593.x + nodeVar2593.y ) * nodeVar2593.z ) ), fract( ( ( nodeVar2595.x + nodeVar2595.y ) * nodeVar2595.z ) ), nodeVar2588.x ), nodeVar2588.y ) ) );
											nodeVar2566 = ( nodeVar2566 * vec2( 2.03 ) );
											nodeVar2568 = ( nodeVar2568 * 0.52 );
											nodeVar2596 = floor( nodeVar2566 );
											nodeVar2597 = fract( nodeVar2566 );
											nodeVar2597 = ( ( nodeVar2597 * nodeVar2597 ) * ( vec2( 3.0 ) - ( nodeVar2597 * vec2( 2.0 ) ) ) );
											nodeVar2598 = fract( ( vec3( nodeVar2596.x, nodeVar2596.y, nodeVar2596.x ) * vec3( 0.1031 ) ) );
											nodeVar2598 = ( nodeVar2598 + vec3( dot( nodeVar2598, ( nodeVar2598.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2599 = ( nodeVar2596 + vec2( 1.0, 0.0 ) );
											nodeVar2600 = fract( ( vec3( nodeVar2599.x, nodeVar2599.y, nodeVar2599.x ) * vec3( 0.1031 ) ) );
											nodeVar2600 = ( nodeVar2600 + vec3( dot( nodeVar2600, ( nodeVar2600.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2601 = ( nodeVar2596 + vec2( 0.0, 1.0 ) );
											nodeVar2602 = fract( ( vec3( nodeVar2601.x, nodeVar2601.y, nodeVar2601.x ) * vec3( 0.1031 ) ) );
											nodeVar2602 = ( nodeVar2602 + vec3( dot( nodeVar2602, ( nodeVar2602.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2603 = ( nodeVar2596 + vec2( 1.0, 1.0 ) );
											nodeVar2604 = fract( ( vec3( nodeVar2603.x, nodeVar2603.y, nodeVar2603.x ) * vec3( 0.1031 ) ) );
											nodeVar2604 = ( nodeVar2604 + vec3( dot( nodeVar2604, ( nodeVar2604.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar2567 = ( nodeVar2567 + ( nodeVar2568 * mix( mix( fract( ( ( nodeVar2598.x + nodeVar2598.y ) * nodeVar2598.z ) ), fract( ( ( nodeVar2600.x + nodeVar2600.y ) * nodeVar2600.z ) ), nodeVar2597.x ), mix( fract( ( ( nodeVar2602.x + nodeVar2602.y ) * nodeVar2602.z ) ), fract( ( ( nodeVar2604.x + nodeVar2604.y ) * nodeVar2604.z ) ), nodeVar2597.x ), nodeVar2597.y ) ) );
											nodeVar2566 = ( nodeVar2566 * vec2( 2.03 ) );
											nodeVar2568 = ( nodeVar2568 * 0.52 );
											nodeVar2605 = ( ( nodeVar2528 * 0.6 ) + ( nodeVar2567 * 0.4 ) );
											nodeVar1822 = vec3( ( nodeVar2605 * 0.5 ), ( 0.8 + ( nodeVar2605 * 0.2 ) ), nodeVar2605 );
											

										} else {


											if ( ( nodeVar1821 < 10.5 ) ) {

												nodeVar2606 = ( nodeVar1820 * vec2( 5.5 ) );
												nodeVar2607 = 0.0;
												nodeVar2608 = 0.5;
												nodeVar2609 = floor( nodeVar2606 );
												nodeVar2610 = fract( nodeVar2606 );
												nodeVar2610 = ( ( nodeVar2610 * nodeVar2610 ) * ( vec2( 3.0 ) - ( nodeVar2610 * vec2( 2.0 ) ) ) );
												nodeVar2611 = fract( ( vec3( nodeVar2609.x, nodeVar2609.y, nodeVar2609.x ) * vec3( 0.1031 ) ) );
												nodeVar2611 = ( nodeVar2611 + vec3( dot( nodeVar2611, ( nodeVar2611.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2612 = ( nodeVar2609 + vec2( 1.0, 0.0 ) );
												nodeVar2613 = fract( ( vec3( nodeVar2612.x, nodeVar2612.y, nodeVar2612.x ) * vec3( 0.1031 ) ) );
												nodeVar2613 = ( nodeVar2613 + vec3( dot( nodeVar2613, ( nodeVar2613.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2614 = ( nodeVar2609 + vec2( 0.0, 1.0 ) );
												nodeVar2615 = fract( ( vec3( nodeVar2614.x, nodeVar2614.y, nodeVar2614.x ) * vec3( 0.1031 ) ) );
												nodeVar2615 = ( nodeVar2615 + vec3( dot( nodeVar2615, ( nodeVar2615.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2616 = ( nodeVar2609 + vec2( 1.0, 1.0 ) );
												nodeVar2617 = fract( ( vec3( nodeVar2616.x, nodeVar2616.y, nodeVar2616.x ) * vec3( 0.1031 ) ) );
												nodeVar2617 = ( nodeVar2617 + vec3( dot( nodeVar2617, ( nodeVar2617.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2607 = ( nodeVar2607 + ( nodeVar2608 * mix( mix( fract( ( ( nodeVar2611.x + nodeVar2611.y ) * nodeVar2611.z ) ), fract( ( ( nodeVar2613.x + nodeVar2613.y ) * nodeVar2613.z ) ), nodeVar2610.x ), mix( fract( ( ( nodeVar2615.x + nodeVar2615.y ) * nodeVar2615.z ) ), fract( ( ( nodeVar2617.x + nodeVar2617.y ) * nodeVar2617.z ) ), nodeVar2610.x ), nodeVar2610.y ) ) );
												nodeVar2606 = ( nodeVar2606 * vec2( 2.03 ) );
												nodeVar2608 = ( nodeVar2608 * 0.52 );
												nodeVar2618 = floor( nodeVar2606 );
												nodeVar2619 = fract( nodeVar2606 );
												nodeVar2619 = ( ( nodeVar2619 * nodeVar2619 ) * ( vec2( 3.0 ) - ( nodeVar2619 * vec2( 2.0 ) ) ) );
												nodeVar2620 = fract( ( vec3( nodeVar2618.x, nodeVar2618.y, nodeVar2618.x ) * vec3( 0.1031 ) ) );
												nodeVar2620 = ( nodeVar2620 + vec3( dot( nodeVar2620, ( nodeVar2620.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2621 = ( nodeVar2618 + vec2( 1.0, 0.0 ) );
												nodeVar2622 = fract( ( vec3( nodeVar2621.x, nodeVar2621.y, nodeVar2621.x ) * vec3( 0.1031 ) ) );
												nodeVar2622 = ( nodeVar2622 + vec3( dot( nodeVar2622, ( nodeVar2622.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2623 = ( nodeVar2618 + vec2( 0.0, 1.0 ) );
												nodeVar2624 = fract( ( vec3( nodeVar2623.x, nodeVar2623.y, nodeVar2623.x ) * vec3( 0.1031 ) ) );
												nodeVar2624 = ( nodeVar2624 + vec3( dot( nodeVar2624, ( nodeVar2624.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2625 = ( nodeVar2618 + vec2( 1.0, 1.0 ) );
												nodeVar2626 = fract( ( vec3( nodeVar2625.x, nodeVar2625.y, nodeVar2625.x ) * vec3( 0.1031 ) ) );
												nodeVar2626 = ( nodeVar2626 + vec3( dot( nodeVar2626, ( nodeVar2626.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2607 = ( nodeVar2607 + ( nodeVar2608 * mix( mix( fract( ( ( nodeVar2620.x + nodeVar2620.y ) * nodeVar2620.z ) ), fract( ( ( nodeVar2622.x + nodeVar2622.y ) * nodeVar2622.z ) ), nodeVar2619.x ), mix( fract( ( ( nodeVar2624.x + nodeVar2624.y ) * nodeVar2624.z ) ), fract( ( ( nodeVar2626.x + nodeVar2626.y ) * nodeVar2626.z ) ), nodeVar2619.x ), nodeVar2619.y ) ) );
												nodeVar2606 = ( nodeVar2606 * vec2( 2.03 ) );
												nodeVar2608 = ( nodeVar2608 * 0.52 );
												nodeVar2627 = floor( nodeVar2606 );
												nodeVar2628 = fract( nodeVar2606 );
												nodeVar2628 = ( ( nodeVar2628 * nodeVar2628 ) * ( vec2( 3.0 ) - ( nodeVar2628 * vec2( 2.0 ) ) ) );
												nodeVar2629 = fract( ( vec3( nodeVar2627.x, nodeVar2627.y, nodeVar2627.x ) * vec3( 0.1031 ) ) );
												nodeVar2629 = ( nodeVar2629 + vec3( dot( nodeVar2629, ( nodeVar2629.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2630 = ( nodeVar2627 + vec2( 1.0, 0.0 ) );
												nodeVar2631 = fract( ( vec3( nodeVar2630.x, nodeVar2630.y, nodeVar2630.x ) * vec3( 0.1031 ) ) );
												nodeVar2631 = ( nodeVar2631 + vec3( dot( nodeVar2631, ( nodeVar2631.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2632 = ( nodeVar2627 + vec2( 0.0, 1.0 ) );
												nodeVar2633 = fract( ( vec3( nodeVar2632.x, nodeVar2632.y, nodeVar2632.x ) * vec3( 0.1031 ) ) );
												nodeVar2633 = ( nodeVar2633 + vec3( dot( nodeVar2633, ( nodeVar2633.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2634 = ( nodeVar2627 + vec2( 1.0, 1.0 ) );
												nodeVar2635 = fract( ( vec3( nodeVar2634.x, nodeVar2634.y, nodeVar2634.x ) * vec3( 0.1031 ) ) );
												nodeVar2635 = ( nodeVar2635 + vec3( dot( nodeVar2635, ( nodeVar2635.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2607 = ( nodeVar2607 + ( nodeVar2608 * mix( mix( fract( ( ( nodeVar2629.x + nodeVar2629.y ) * nodeVar2629.z ) ), fract( ( ( nodeVar2631.x + nodeVar2631.y ) * nodeVar2631.z ) ), nodeVar2628.x ), mix( fract( ( ( nodeVar2633.x + nodeVar2633.y ) * nodeVar2633.z ) ), fract( ( ( nodeVar2635.x + nodeVar2635.y ) * nodeVar2635.z ) ), nodeVar2628.x ), nodeVar2628.y ) ) );
												nodeVar2606 = ( nodeVar2606 * vec2( 2.03 ) );
												nodeVar2608 = ( nodeVar2608 * 0.52 );
												nodeVar2636 = floor( nodeVar2606 );
												nodeVar2637 = fract( nodeVar2606 );
												nodeVar2637 = ( ( nodeVar2637 * nodeVar2637 ) * ( vec2( 3.0 ) - ( nodeVar2637 * vec2( 2.0 ) ) ) );
												nodeVar2638 = fract( ( vec3( nodeVar2636.x, nodeVar2636.y, nodeVar2636.x ) * vec3( 0.1031 ) ) );
												nodeVar2638 = ( nodeVar2638 + vec3( dot( nodeVar2638, ( nodeVar2638.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2639 = ( nodeVar2636 + vec2( 1.0, 0.0 ) );
												nodeVar2640 = fract( ( vec3( nodeVar2639.x, nodeVar2639.y, nodeVar2639.x ) * vec3( 0.1031 ) ) );
												nodeVar2640 = ( nodeVar2640 + vec3( dot( nodeVar2640, ( nodeVar2640.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2641 = ( nodeVar2636 + vec2( 0.0, 1.0 ) );
												nodeVar2642 = fract( ( vec3( nodeVar2641.x, nodeVar2641.y, nodeVar2641.x ) * vec3( 0.1031 ) ) );
												nodeVar2642 = ( nodeVar2642 + vec3( dot( nodeVar2642, ( nodeVar2642.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2643 = ( nodeVar2636 + vec2( 1.0, 1.0 ) );
												nodeVar2644 = fract( ( vec3( nodeVar2643.x, nodeVar2643.y, nodeVar2643.x ) * vec3( 0.1031 ) ) );
												nodeVar2644 = ( nodeVar2644 + vec3( dot( nodeVar2644, ( nodeVar2644.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2607 = ( nodeVar2607 + ( nodeVar2608 * mix( mix( fract( ( ( nodeVar2638.x + nodeVar2638.y ) * nodeVar2638.z ) ), fract( ( ( nodeVar2640.x + nodeVar2640.y ) * nodeVar2640.z ) ), nodeVar2637.x ), mix( fract( ( ( nodeVar2642.x + nodeVar2642.y ) * nodeVar2642.z ) ), fract( ( ( nodeVar2644.x + nodeVar2644.y ) * nodeVar2644.z ) ), nodeVar2637.x ), nodeVar2637.y ) ) );
												nodeVar2606 = ( nodeVar2606 * vec2( 2.03 ) );
												nodeVar2608 = ( nodeVar2608 * 0.52 );
												nodeVar2645 = ( nodeVar1820 * vec2( 17.0 ) );
												nodeVar2646 = 0.0;
												nodeVar2647 = 0.5;
												nodeVar2648 = floor( nodeVar2645 );
												nodeVar2649 = fract( nodeVar2645 );
												nodeVar2649 = ( ( nodeVar2649 * nodeVar2649 ) * ( vec2( 3.0 ) - ( nodeVar2649 * vec2( 2.0 ) ) ) );
												nodeVar2650 = fract( ( vec3( nodeVar2648.x, nodeVar2648.y, nodeVar2648.x ) * vec3( 0.1031 ) ) );
												nodeVar2650 = ( nodeVar2650 + vec3( dot( nodeVar2650, ( nodeVar2650.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2651 = ( nodeVar2648 + vec2( 1.0, 0.0 ) );
												nodeVar2652 = fract( ( vec3( nodeVar2651.x, nodeVar2651.y, nodeVar2651.x ) * vec3( 0.1031 ) ) );
												nodeVar2652 = ( nodeVar2652 + vec3( dot( nodeVar2652, ( nodeVar2652.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2653 = ( nodeVar2648 + vec2( 0.0, 1.0 ) );
												nodeVar2654 = fract( ( vec3( nodeVar2653.x, nodeVar2653.y, nodeVar2653.x ) * vec3( 0.1031 ) ) );
												nodeVar2654 = ( nodeVar2654 + vec3( dot( nodeVar2654, ( nodeVar2654.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2655 = ( nodeVar2648 + vec2( 1.0, 1.0 ) );
												nodeVar2656 = fract( ( vec3( nodeVar2655.x, nodeVar2655.y, nodeVar2655.x ) * vec3( 0.1031 ) ) );
												nodeVar2656 = ( nodeVar2656 + vec3( dot( nodeVar2656, ( nodeVar2656.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2646 = ( nodeVar2646 + ( nodeVar2647 * mix( mix( fract( ( ( nodeVar2650.x + nodeVar2650.y ) * nodeVar2650.z ) ), fract( ( ( nodeVar2652.x + nodeVar2652.y ) * nodeVar2652.z ) ), nodeVar2649.x ), mix( fract( ( ( nodeVar2654.x + nodeVar2654.y ) * nodeVar2654.z ) ), fract( ( ( nodeVar2656.x + nodeVar2656.y ) * nodeVar2656.z ) ), nodeVar2649.x ), nodeVar2649.y ) ) );
												nodeVar2645 = ( nodeVar2645 * vec2( 2.03 ) );
												nodeVar2647 = ( nodeVar2647 * 0.52 );
												nodeVar2657 = floor( nodeVar2645 );
												nodeVar2658 = fract( nodeVar2645 );
												nodeVar2658 = ( ( nodeVar2658 * nodeVar2658 ) * ( vec2( 3.0 ) - ( nodeVar2658 * vec2( 2.0 ) ) ) );
												nodeVar2659 = fract( ( vec3( nodeVar2657.x, nodeVar2657.y, nodeVar2657.x ) * vec3( 0.1031 ) ) );
												nodeVar2659 = ( nodeVar2659 + vec3( dot( nodeVar2659, ( nodeVar2659.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2660 = ( nodeVar2657 + vec2( 1.0, 0.0 ) );
												nodeVar2661 = fract( ( vec3( nodeVar2660.x, nodeVar2660.y, nodeVar2660.x ) * vec3( 0.1031 ) ) );
												nodeVar2661 = ( nodeVar2661 + vec3( dot( nodeVar2661, ( nodeVar2661.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2662 = ( nodeVar2657 + vec2( 0.0, 1.0 ) );
												nodeVar2663 = fract( ( vec3( nodeVar2662.x, nodeVar2662.y, nodeVar2662.x ) * vec3( 0.1031 ) ) );
												nodeVar2663 = ( nodeVar2663 + vec3( dot( nodeVar2663, ( nodeVar2663.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2664 = ( nodeVar2657 + vec2( 1.0, 1.0 ) );
												nodeVar2665 = fract( ( vec3( nodeVar2664.x, nodeVar2664.y, nodeVar2664.x ) * vec3( 0.1031 ) ) );
												nodeVar2665 = ( nodeVar2665 + vec3( dot( nodeVar2665, ( nodeVar2665.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2646 = ( nodeVar2646 + ( nodeVar2647 * mix( mix( fract( ( ( nodeVar2659.x + nodeVar2659.y ) * nodeVar2659.z ) ), fract( ( ( nodeVar2661.x + nodeVar2661.y ) * nodeVar2661.z ) ), nodeVar2658.x ), mix( fract( ( ( nodeVar2663.x + nodeVar2663.y ) * nodeVar2663.z ) ), fract( ( ( nodeVar2665.x + nodeVar2665.y ) * nodeVar2665.z ) ), nodeVar2658.x ), nodeVar2658.y ) ) );
												nodeVar2645 = ( nodeVar2645 * vec2( 2.03 ) );
												nodeVar2647 = ( nodeVar2647 * 0.52 );
												nodeVar2666 = floor( nodeVar2645 );
												nodeVar2667 = fract( nodeVar2645 );
												nodeVar2667 = ( ( nodeVar2667 * nodeVar2667 ) * ( vec2( 3.0 ) - ( nodeVar2667 * vec2( 2.0 ) ) ) );
												nodeVar2668 = fract( ( vec3( nodeVar2666.x, nodeVar2666.y, nodeVar2666.x ) * vec3( 0.1031 ) ) );
												nodeVar2668 = ( nodeVar2668 + vec3( dot( nodeVar2668, ( nodeVar2668.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2669 = ( nodeVar2666 + vec2( 1.0, 0.0 ) );
												nodeVar2670 = fract( ( vec3( nodeVar2669.x, nodeVar2669.y, nodeVar2669.x ) * vec3( 0.1031 ) ) );
												nodeVar2670 = ( nodeVar2670 + vec3( dot( nodeVar2670, ( nodeVar2670.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2671 = ( nodeVar2666 + vec2( 0.0, 1.0 ) );
												nodeVar2672 = fract( ( vec3( nodeVar2671.x, nodeVar2671.y, nodeVar2671.x ) * vec3( 0.1031 ) ) );
												nodeVar2672 = ( nodeVar2672 + vec3( dot( nodeVar2672, ( nodeVar2672.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2673 = ( nodeVar2666 + vec2( 1.0, 1.0 ) );
												nodeVar2674 = fract( ( vec3( nodeVar2673.x, nodeVar2673.y, nodeVar2673.x ) * vec3( 0.1031 ) ) );
												nodeVar2674 = ( nodeVar2674 + vec3( dot( nodeVar2674, ( nodeVar2674.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2646 = ( nodeVar2646 + ( nodeVar2647 * mix( mix( fract( ( ( nodeVar2668.x + nodeVar2668.y ) * nodeVar2668.z ) ), fract( ( ( nodeVar2670.x + nodeVar2670.y ) * nodeVar2670.z ) ), nodeVar2667.x ), mix( fract( ( ( nodeVar2672.x + nodeVar2672.y ) * nodeVar2672.z ) ), fract( ( ( nodeVar2674.x + nodeVar2674.y ) * nodeVar2674.z ) ), nodeVar2667.x ), nodeVar2667.y ) ) );
												nodeVar2645 = ( nodeVar2645 * vec2( 2.03 ) );
												nodeVar2647 = ( nodeVar2647 * 0.52 );
												nodeVar2675 = floor( nodeVar2645 );
												nodeVar2676 = fract( nodeVar2645 );
												nodeVar2676 = ( ( nodeVar2676 * nodeVar2676 ) * ( vec2( 3.0 ) - ( nodeVar2676 * vec2( 2.0 ) ) ) );
												nodeVar2677 = fract( ( vec3( nodeVar2675.x, nodeVar2675.y, nodeVar2675.x ) * vec3( 0.1031 ) ) );
												nodeVar2677 = ( nodeVar2677 + vec3( dot( nodeVar2677, ( nodeVar2677.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2678 = ( nodeVar2675 + vec2( 1.0, 0.0 ) );
												nodeVar2679 = fract( ( vec3( nodeVar2678.x, nodeVar2678.y, nodeVar2678.x ) * vec3( 0.1031 ) ) );
												nodeVar2679 = ( nodeVar2679 + vec3( dot( nodeVar2679, ( nodeVar2679.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2680 = ( nodeVar2675 + vec2( 0.0, 1.0 ) );
												nodeVar2681 = fract( ( vec3( nodeVar2680.x, nodeVar2680.y, nodeVar2680.x ) * vec3( 0.1031 ) ) );
												nodeVar2681 = ( nodeVar2681 + vec3( dot( nodeVar2681, ( nodeVar2681.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2682 = ( nodeVar2675 + vec2( 1.0, 1.0 ) );
												nodeVar2683 = fract( ( vec3( nodeVar2682.x, nodeVar2682.y, nodeVar2682.x ) * vec3( 0.1031 ) ) );
												nodeVar2683 = ( nodeVar2683 + vec3( dot( nodeVar2683, ( nodeVar2683.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2646 = ( nodeVar2646 + ( nodeVar2647 * mix( mix( fract( ( ( nodeVar2677.x + nodeVar2677.y ) * nodeVar2677.z ) ), fract( ( ( nodeVar2679.x + nodeVar2679.y ) * nodeVar2679.z ) ), nodeVar2676.x ), mix( fract( ( ( nodeVar2681.x + nodeVar2681.y ) * nodeVar2681.z ) ), fract( ( ( nodeVar2683.x + nodeVar2683.y ) * nodeVar2683.z ) ), nodeVar2676.x ), nodeVar2676.y ) ) );
												nodeVar2645 = ( nodeVar2645 * vec2( 2.03 ) );
												nodeVar2647 = ( nodeVar2647 * 0.52 );
												nodeVar2684 = ( ( nodeVar2607 * 0.62 ) + ( nodeVar2646 * 0.38 ) );
												nodeVar1822 = vec3( ( ( nodeVar2684 * 0.52 ) + ( ( 0.5 + ( ( sin( ( nodeVar1820.x * 1300.0 ) ) * sin( ( nodeVar1820.y * 1300.0 ) ) ) * 0.5 ) ) * 0.055 ) ), 1.0, ( 0.34 + ( nodeVar2684 * 0.66 ) ) );
												

											} else {

												nodeVar2685 = ( nodeVar1820 * vec2( 4.0 ) );
												nodeVar2686 = 0.0;
												nodeVar2687 = 0.5;
												nodeVar2688 = floor( nodeVar2685 );
												nodeVar2689 = fract( nodeVar2685 );
												nodeVar2689 = ( ( nodeVar2689 * nodeVar2689 ) * ( vec2( 3.0 ) - ( nodeVar2689 * vec2( 2.0 ) ) ) );
												nodeVar2690 = fract( ( vec3( nodeVar2688.x, nodeVar2688.y, nodeVar2688.x ) * vec3( 0.1031 ) ) );
												nodeVar2690 = ( nodeVar2690 + vec3( dot( nodeVar2690, ( nodeVar2690.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2691 = ( nodeVar2688 + vec2( 1.0, 0.0 ) );
												nodeVar2692 = fract( ( vec3( nodeVar2691.x, nodeVar2691.y, nodeVar2691.x ) * vec3( 0.1031 ) ) );
												nodeVar2692 = ( nodeVar2692 + vec3( dot( nodeVar2692, ( nodeVar2692.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2693 = ( nodeVar2688 + vec2( 0.0, 1.0 ) );
												nodeVar2694 = fract( ( vec3( nodeVar2693.x, nodeVar2693.y, nodeVar2693.x ) * vec3( 0.1031 ) ) );
												nodeVar2694 = ( nodeVar2694 + vec3( dot( nodeVar2694, ( nodeVar2694.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2695 = ( nodeVar2688 + vec2( 1.0, 1.0 ) );
												nodeVar2696 = fract( ( vec3( nodeVar2695.x, nodeVar2695.y, nodeVar2695.x ) * vec3( 0.1031 ) ) );
												nodeVar2696 = ( nodeVar2696 + vec3( dot( nodeVar2696, ( nodeVar2696.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2686 = ( nodeVar2686 + ( nodeVar2687 * mix( mix( fract( ( ( nodeVar2690.x + nodeVar2690.y ) * nodeVar2690.z ) ), fract( ( ( nodeVar2692.x + nodeVar2692.y ) * nodeVar2692.z ) ), nodeVar2689.x ), mix( fract( ( ( nodeVar2694.x + nodeVar2694.y ) * nodeVar2694.z ) ), fract( ( ( nodeVar2696.x + nodeVar2696.y ) * nodeVar2696.z ) ), nodeVar2689.x ), nodeVar2689.y ) ) );
												nodeVar2685 = ( nodeVar2685 * vec2( 2.03 ) );
												nodeVar2687 = ( nodeVar2687 * 0.52 );
												nodeVar2697 = floor( nodeVar2685 );
												nodeVar2698 = fract( nodeVar2685 );
												nodeVar2698 = ( ( nodeVar2698 * nodeVar2698 ) * ( vec2( 3.0 ) - ( nodeVar2698 * vec2( 2.0 ) ) ) );
												nodeVar2699 = fract( ( vec3( nodeVar2697.x, nodeVar2697.y, nodeVar2697.x ) * vec3( 0.1031 ) ) );
												nodeVar2699 = ( nodeVar2699 + vec3( dot( nodeVar2699, ( nodeVar2699.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2700 = ( nodeVar2697 + vec2( 1.0, 0.0 ) );
												nodeVar2701 = fract( ( vec3( nodeVar2700.x, nodeVar2700.y, nodeVar2700.x ) * vec3( 0.1031 ) ) );
												nodeVar2701 = ( nodeVar2701 + vec3( dot( nodeVar2701, ( nodeVar2701.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2702 = ( nodeVar2697 + vec2( 0.0, 1.0 ) );
												nodeVar2703 = fract( ( vec3( nodeVar2702.x, nodeVar2702.y, nodeVar2702.x ) * vec3( 0.1031 ) ) );
												nodeVar2703 = ( nodeVar2703 + vec3( dot( nodeVar2703, ( nodeVar2703.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2704 = ( nodeVar2697 + vec2( 1.0, 1.0 ) );
												nodeVar2705 = fract( ( vec3( nodeVar2704.x, nodeVar2704.y, nodeVar2704.x ) * vec3( 0.1031 ) ) );
												nodeVar2705 = ( nodeVar2705 + vec3( dot( nodeVar2705, ( nodeVar2705.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2686 = ( nodeVar2686 + ( nodeVar2687 * mix( mix( fract( ( ( nodeVar2699.x + nodeVar2699.y ) * nodeVar2699.z ) ), fract( ( ( nodeVar2701.x + nodeVar2701.y ) * nodeVar2701.z ) ), nodeVar2698.x ), mix( fract( ( ( nodeVar2703.x + nodeVar2703.y ) * nodeVar2703.z ) ), fract( ( ( nodeVar2705.x + nodeVar2705.y ) * nodeVar2705.z ) ), nodeVar2698.x ), nodeVar2698.y ) ) );
												nodeVar2685 = ( nodeVar2685 * vec2( 2.03 ) );
												nodeVar2687 = ( nodeVar2687 * 0.52 );
												nodeVar2706 = floor( nodeVar2685 );
												nodeVar2707 = fract( nodeVar2685 );
												nodeVar2707 = ( ( nodeVar2707 * nodeVar2707 ) * ( vec2( 3.0 ) - ( nodeVar2707 * vec2( 2.0 ) ) ) );
												nodeVar2708 = fract( ( vec3( nodeVar2706.x, nodeVar2706.y, nodeVar2706.x ) * vec3( 0.1031 ) ) );
												nodeVar2708 = ( nodeVar2708 + vec3( dot( nodeVar2708, ( nodeVar2708.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2709 = ( nodeVar2706 + vec2( 1.0, 0.0 ) );
												nodeVar2710 = fract( ( vec3( nodeVar2709.x, nodeVar2709.y, nodeVar2709.x ) * vec3( 0.1031 ) ) );
												nodeVar2710 = ( nodeVar2710 + vec3( dot( nodeVar2710, ( nodeVar2710.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2711 = ( nodeVar2706 + vec2( 0.0, 1.0 ) );
												nodeVar2712 = fract( ( vec3( nodeVar2711.x, nodeVar2711.y, nodeVar2711.x ) * vec3( 0.1031 ) ) );
												nodeVar2712 = ( nodeVar2712 + vec3( dot( nodeVar2712, ( nodeVar2712.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2713 = ( nodeVar2706 + vec2( 1.0, 1.0 ) );
												nodeVar2714 = fract( ( vec3( nodeVar2713.x, nodeVar2713.y, nodeVar2713.x ) * vec3( 0.1031 ) ) );
												nodeVar2714 = ( nodeVar2714 + vec3( dot( nodeVar2714, ( nodeVar2714.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2686 = ( nodeVar2686 + ( nodeVar2687 * mix( mix( fract( ( ( nodeVar2708.x + nodeVar2708.y ) * nodeVar2708.z ) ), fract( ( ( nodeVar2710.x + nodeVar2710.y ) * nodeVar2710.z ) ), nodeVar2707.x ), mix( fract( ( ( nodeVar2712.x + nodeVar2712.y ) * nodeVar2712.z ) ), fract( ( ( nodeVar2714.x + nodeVar2714.y ) * nodeVar2714.z ) ), nodeVar2707.x ), nodeVar2707.y ) ) );
												nodeVar2685 = ( nodeVar2685 * vec2( 2.03 ) );
												nodeVar2687 = ( nodeVar2687 * 0.52 );
												nodeVar2715 = floor( nodeVar2685 );
												nodeVar2716 = fract( nodeVar2685 );
												nodeVar2716 = ( ( nodeVar2716 * nodeVar2716 ) * ( vec2( 3.0 ) - ( nodeVar2716 * vec2( 2.0 ) ) ) );
												nodeVar2717 = fract( ( vec3( nodeVar2715.x, nodeVar2715.y, nodeVar2715.x ) * vec3( 0.1031 ) ) );
												nodeVar2717 = ( nodeVar2717 + vec3( dot( nodeVar2717, ( nodeVar2717.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2718 = ( nodeVar2715 + vec2( 1.0, 0.0 ) );
												nodeVar2719 = fract( ( vec3( nodeVar2718.x, nodeVar2718.y, nodeVar2718.x ) * vec3( 0.1031 ) ) );
												nodeVar2719 = ( nodeVar2719 + vec3( dot( nodeVar2719, ( nodeVar2719.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2720 = ( nodeVar2715 + vec2( 0.0, 1.0 ) );
												nodeVar2721 = fract( ( vec3( nodeVar2720.x, nodeVar2720.y, nodeVar2720.x ) * vec3( 0.1031 ) ) );
												nodeVar2721 = ( nodeVar2721 + vec3( dot( nodeVar2721, ( nodeVar2721.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2722 = ( nodeVar2715 + vec2( 1.0, 1.0 ) );
												nodeVar2723 = fract( ( vec3( nodeVar2722.x, nodeVar2722.y, nodeVar2722.x ) * vec3( 0.1031 ) ) );
												nodeVar2723 = ( nodeVar2723 + vec3( dot( nodeVar2723, ( nodeVar2723.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar2686 = ( nodeVar2686 + ( nodeVar2687 * mix( mix( fract( ( ( nodeVar2717.x + nodeVar2717.y ) * nodeVar2717.z ) ), fract( ( ( nodeVar2719.x + nodeVar2719.y ) * nodeVar2719.z ) ), nodeVar2716.x ), mix( fract( ( ( nodeVar2721.x + nodeVar2721.y ) * nodeVar2721.z ) ), fract( ( ( nodeVar2723.x + nodeVar2723.y ) * nodeVar2723.z ) ), nodeVar2716.x ), nodeVar2716.y ) ) );
												nodeVar2685 = ( nodeVar2685 * vec2( 2.03 ) );
												nodeVar2687 = ( nodeVar2687 * 0.52 );
												nodeVar2724 = nodeVar2686;
												nodeVar1822 = vec3( nodeVar2724, 1.0, nodeVar2724 );
												

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

	nodeVar2725 = nodeVar1822;
	nodeVar2726 = ( 1.0 - smoothstep( 70.0, 300.0, nodeVar1 ) );
	nodeVar2727 = ( ( nodeUniform5 * nodeVar2726 ) / nodeVar2 );
	nodeVar2728 = normalize( vec3( ( - ( ( nodeVar1819.x - NORMAL_nodeVar913.x ) * nodeVar2727 ) ), ( - ( ( nodeVar2725.x - NORMAL_nodeVar913.x ) * nodeVar2727 ) ), 1.0 ) );
	NORMAL_nodeVar2729 = nodeVar2728;
	nodeVar2730 = NORMAL_normalWorld;
	nodeVar2731 = abs( nodeVar2730 );
	nodeVar2732 = vec3( 1.0, 0.0, 0.0 );

	if ( ( nodeVar2731.y > max( nodeVar2731.x, nodeVar2731.z ) ) ) {

		nodeVar2732 = vec3( 1.0, 0.0, 0.0 );
		

	} else {


		if ( ( nodeVar2731.x > nodeVar2731.z ) ) {

			nodeVar2732 = vec3( 0.0, 0.0, 1.0 );
			

		} else {

			nodeVar2732 = vec3( 1.0, 0.0, 0.0 );
			

		}

		

	}

	nodeVar2733 = normalize( ( nodeVar2732 - ( nodeVar2730 * vec3( dot( nodeVar2730, nodeVar2732 ) ) ) ) );
	nodeVar2734 = normalize( cross( NORMAL_normalWorld, nodeVar2733 ) );
	nodeVar2735 = normalize( ( ( ( nodeVar2733 * vec3( NORMAL_nodeVar2729.x ) ) + ( nodeVar2734 * vec3( NORMAL_nodeVar2729.y ) ) ) + ( NORMAL_normalWorld * vec3( NORMAL_nodeVar2729.z ) ) ) );
	normalView = normalize( normalize( ( cameraViewMatrix * vec4( nodeVar2735, 0.0 ) ).xyz ) );
	normalWorld = normalize( ( vec4( normalView, 0.0 ) * cameraViewMatrix ).xyz );
	nodeVar2736 = normalWorld;
	nodeVar2737 = abs( nodeVar2736 );
	nodeVar2738 = vec2( 0.0, 0.0 );

	if ( ( nodeVar2737.y > max( nodeVar2737.x, nodeVar2737.z ) ) ) {

		nodeVar2738 = nodeVar0.xz;
		

	} else {


		if ( ( nodeVar2737.x > nodeVar2737.z ) ) {

			nodeVar2738 = vec2( nodeVar0.z, nodeVar0.y );
			

		} else {

			nodeVar2738 = vec2( nodeVar0.x, nodeVar0.y );
			

		}

		

	}

	nodeVar2739 = nodeVar2738;
	nodeVar2740 = floor( nodeVarying7 );
	nodeVar2741 = vec3( 0.0, 1.0, 0.5 );

	if ( ( nodeVar2740 < 0.5 ) ) {

		nodeVar2742 = floor( ( nodeVar2739.y / 0.225 ) );
		nodeVar2743 = fract( ( ( nodeVar2742 * 7.13 ) * 0.1031 ) );
		nodeVar2743 = ( nodeVar2743 * ( nodeVar2743 + 33.33 ) );
		nodeVar2743 = ( nodeVar2743 * ( nodeVar2743 + nodeVar2743 ) );
		nodeVar2744 = ( fract( nodeVar2743 ) * 0.9 );
		nodeVar2745 = fract( ( ( ( nodeVar2742 * 3.7 ) + 11.0 ) * 0.1031 ) );
		nodeVar2745 = ( nodeVar2745 * ( nodeVar2745 + 33.33 ) );
		nodeVar2745 = ( nodeVar2745 * ( nodeVar2745 + nodeVar2745 ) );
		nodeVar2746 = ( 0.42 + ( fract( nodeVar2745 ) * 0.42 ) );
		nodeVar2747 = fract( ( ( nodeVar2739.x + nodeVar2744 ) / nodeVar2746 ) );
		nodeVar2748 = fract( ( nodeVar2739.y / 0.225 ) );
		nodeVar2749 = min( ( min( nodeVar2747, ( 1.0 - nodeVar2747 ) ) * nodeVar2746 ), ( min( nodeVar2748, ( 1.0 - nodeVar2748 ) ) * 0.225 ) );
		nodeVar2750 = smoothstep( 0.0, 0.016, nodeVar2749 );
		nodeVar2751 = ( vec2( floor( ( ( nodeVar2739.x + nodeVar2744 ) / nodeVar2746 ) ), nodeVar2742 ) * vec2( 1.37 ) );
		nodeVar2752 = fract( ( vec3( nodeVar2751.x, nodeVar2751.y, nodeVar2751.x ) * vec3( 0.1031 ) ) );
		nodeVar2752 = ( nodeVar2752 + vec3( dot( nodeVar2752, ( nodeVar2752.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2753 = fract( ( ( nodeVar2752.x + nodeVar2752.y ) * nodeVar2752.z ) );
		nodeVar2754 = ( ( nodeVar2739 * vec2( 22.0 ) ) + vec2( ( nodeVar2753 * 30.0 ) ) );
		nodeVar2755 = 0.0;
		nodeVar2756 = 0.5;
		nodeVar2757 = floor( nodeVar2754 );
		nodeVar2758 = fract( nodeVar2754 );
		nodeVar2758 = ( ( nodeVar2758 * nodeVar2758 ) * ( vec2( 3.0 ) - ( nodeVar2758 * vec2( 2.0 ) ) ) );
		nodeVar2759 = fract( ( vec3( nodeVar2757.x, nodeVar2757.y, nodeVar2757.x ) * vec3( 0.1031 ) ) );
		nodeVar2759 = ( nodeVar2759 + vec3( dot( nodeVar2759, ( nodeVar2759.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2760 = ( nodeVar2757 + vec2( 1.0, 0.0 ) );
		nodeVar2761 = fract( ( vec3( nodeVar2760.x, nodeVar2760.y, nodeVar2760.x ) * vec3( 0.1031 ) ) );
		nodeVar2761 = ( nodeVar2761 + vec3( dot( nodeVar2761, ( nodeVar2761.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2762 = ( nodeVar2757 + vec2( 0.0, 1.0 ) );
		nodeVar2763 = fract( ( vec3( nodeVar2762.x, nodeVar2762.y, nodeVar2762.x ) * vec3( 0.1031 ) ) );
		nodeVar2763 = ( nodeVar2763 + vec3( dot( nodeVar2763, ( nodeVar2763.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2764 = ( nodeVar2757 + vec2( 1.0, 1.0 ) );
		nodeVar2765 = fract( ( vec3( nodeVar2764.x, nodeVar2764.y, nodeVar2764.x ) * vec3( 0.1031 ) ) );
		nodeVar2765 = ( nodeVar2765 + vec3( dot( nodeVar2765, ( nodeVar2765.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2755 = ( nodeVar2755 + ( nodeVar2756 * mix( mix( fract( ( ( nodeVar2759.x + nodeVar2759.y ) * nodeVar2759.z ) ), fract( ( ( nodeVar2761.x + nodeVar2761.y ) * nodeVar2761.z ) ), nodeVar2758.x ), mix( fract( ( ( nodeVar2763.x + nodeVar2763.y ) * nodeVar2763.z ) ), fract( ( ( nodeVar2765.x + nodeVar2765.y ) * nodeVar2765.z ) ), nodeVar2758.x ), nodeVar2758.y ) ) );
		nodeVar2754 = ( nodeVar2754 * vec2( 2.03 ) );
		nodeVar2756 = ( nodeVar2756 * 0.52 );
		nodeVar2766 = floor( nodeVar2754 );
		nodeVar2767 = fract( nodeVar2754 );
		nodeVar2767 = ( ( nodeVar2767 * nodeVar2767 ) * ( vec2( 3.0 ) - ( nodeVar2767 * vec2( 2.0 ) ) ) );
		nodeVar2768 = fract( ( vec3( nodeVar2766.x, nodeVar2766.y, nodeVar2766.x ) * vec3( 0.1031 ) ) );
		nodeVar2768 = ( nodeVar2768 + vec3( dot( nodeVar2768, ( nodeVar2768.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2769 = ( nodeVar2766 + vec2( 1.0, 0.0 ) );
		nodeVar2770 = fract( ( vec3( nodeVar2769.x, nodeVar2769.y, nodeVar2769.x ) * vec3( 0.1031 ) ) );
		nodeVar2770 = ( nodeVar2770 + vec3( dot( nodeVar2770, ( nodeVar2770.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2771 = ( nodeVar2766 + vec2( 0.0, 1.0 ) );
		nodeVar2772 = fract( ( vec3( nodeVar2771.x, nodeVar2771.y, nodeVar2771.x ) * vec3( 0.1031 ) ) );
		nodeVar2772 = ( nodeVar2772 + vec3( dot( nodeVar2772, ( nodeVar2772.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2773 = ( nodeVar2766 + vec2( 1.0, 1.0 ) );
		nodeVar2774 = fract( ( vec3( nodeVar2773.x, nodeVar2773.y, nodeVar2773.x ) * vec3( 0.1031 ) ) );
		nodeVar2774 = ( nodeVar2774 + vec3( dot( nodeVar2774, ( nodeVar2774.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2755 = ( nodeVar2755 + ( nodeVar2756 * mix( mix( fract( ( ( nodeVar2768.x + nodeVar2768.y ) * nodeVar2768.z ) ), fract( ( ( nodeVar2770.x + nodeVar2770.y ) * nodeVar2770.z ) ), nodeVar2767.x ), mix( fract( ( ( nodeVar2772.x + nodeVar2772.y ) * nodeVar2772.z ) ), fract( ( ( nodeVar2774.x + nodeVar2774.y ) * nodeVar2774.z ) ), nodeVar2767.x ), nodeVar2767.y ) ) );
		nodeVar2754 = ( nodeVar2754 * vec2( 2.03 ) );
		nodeVar2756 = ( nodeVar2756 * 0.52 );
		nodeVar2775 = floor( nodeVar2754 );
		nodeVar2776 = fract( nodeVar2754 );
		nodeVar2776 = ( ( nodeVar2776 * nodeVar2776 ) * ( vec2( 3.0 ) - ( nodeVar2776 * vec2( 2.0 ) ) ) );
		nodeVar2777 = fract( ( vec3( nodeVar2775.x, nodeVar2775.y, nodeVar2775.x ) * vec3( 0.1031 ) ) );
		nodeVar2777 = ( nodeVar2777 + vec3( dot( nodeVar2777, ( nodeVar2777.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2778 = ( nodeVar2775 + vec2( 1.0, 0.0 ) );
		nodeVar2779 = fract( ( vec3( nodeVar2778.x, nodeVar2778.y, nodeVar2778.x ) * vec3( 0.1031 ) ) );
		nodeVar2779 = ( nodeVar2779 + vec3( dot( nodeVar2779, ( nodeVar2779.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2780 = ( nodeVar2775 + vec2( 0.0, 1.0 ) );
		nodeVar2781 = fract( ( vec3( nodeVar2780.x, nodeVar2780.y, nodeVar2780.x ) * vec3( 0.1031 ) ) );
		nodeVar2781 = ( nodeVar2781 + vec3( dot( nodeVar2781, ( nodeVar2781.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2782 = ( nodeVar2775 + vec2( 1.0, 1.0 ) );
		nodeVar2783 = fract( ( vec3( nodeVar2782.x, nodeVar2782.y, nodeVar2782.x ) * vec3( 0.1031 ) ) );
		nodeVar2783 = ( nodeVar2783 + vec3( dot( nodeVar2783, ( nodeVar2783.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2755 = ( nodeVar2755 + ( nodeVar2756 * mix( mix( fract( ( ( nodeVar2777.x + nodeVar2777.y ) * nodeVar2777.z ) ), fract( ( ( nodeVar2779.x + nodeVar2779.y ) * nodeVar2779.z ) ), nodeVar2776.x ), mix( fract( ( ( nodeVar2781.x + nodeVar2781.y ) * nodeVar2781.z ) ), fract( ( ( nodeVar2783.x + nodeVar2783.y ) * nodeVar2783.z ) ), nodeVar2776.x ), nodeVar2776.y ) ) );
		nodeVar2754 = ( nodeVar2754 * vec2( 2.03 ) );
		nodeVar2756 = ( nodeVar2756 * 0.52 );
		nodeVar2784 = floor( nodeVar2754 );
		nodeVar2785 = fract( nodeVar2754 );
		nodeVar2785 = ( ( nodeVar2785 * nodeVar2785 ) * ( vec2( 3.0 ) - ( nodeVar2785 * vec2( 2.0 ) ) ) );
		nodeVar2786 = fract( ( vec3( nodeVar2784.x, nodeVar2784.y, nodeVar2784.x ) * vec3( 0.1031 ) ) );
		nodeVar2786 = ( nodeVar2786 + vec3( dot( nodeVar2786, ( nodeVar2786.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2787 = ( nodeVar2784 + vec2( 1.0, 0.0 ) );
		nodeVar2788 = fract( ( vec3( nodeVar2787.x, nodeVar2787.y, nodeVar2787.x ) * vec3( 0.1031 ) ) );
		nodeVar2788 = ( nodeVar2788 + vec3( dot( nodeVar2788, ( nodeVar2788.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2789 = ( nodeVar2784 + vec2( 0.0, 1.0 ) );
		nodeVar2790 = fract( ( vec3( nodeVar2789.x, nodeVar2789.y, nodeVar2789.x ) * vec3( 0.1031 ) ) );
		nodeVar2790 = ( nodeVar2790 + vec3( dot( nodeVar2790, ( nodeVar2790.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2791 = ( nodeVar2784 + vec2( 1.0, 1.0 ) );
		nodeVar2792 = fract( ( vec3( nodeVar2791.x, nodeVar2791.y, nodeVar2791.x ) * vec3( 0.1031 ) ) );
		nodeVar2792 = ( nodeVar2792 + vec3( dot( nodeVar2792, ( nodeVar2792.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar2755 = ( nodeVar2755 + ( nodeVar2756 * mix( mix( fract( ( ( nodeVar2786.x + nodeVar2786.y ) * nodeVar2786.z ) ), fract( ( ( nodeVar2788.x + nodeVar2788.y ) * nodeVar2788.z ) ), nodeVar2785.x ), mix( fract( ( ( nodeVar2790.x + nodeVar2790.y ) * nodeVar2790.z ) ), fract( ( ( nodeVar2792.x + nodeVar2792.y ) * nodeVar2792.z ) ), nodeVar2785.x ), nodeVar2785.y ) ) );
		nodeVar2754 = ( nodeVar2754 * vec2( 2.03 ) );
		nodeVar2756 = ( nodeVar2756 * 0.52 );
		nodeVar2741 = vec3( ( ( ( nodeVar2750 * ( 0.55 + ( nodeVar2753 * 0.45 ) ) ) * 0.55 ) + ( ( ( 0.55 + ( nodeVar2755 * 0.45 ) ) * 0.3 ) * nodeVar2750 ) ), nodeVar2750, nodeVar2753 );
		

	} else {


		if ( ( nodeVar2740 < 1.5 ) ) {

			nodeVar2793 = ( nodeVar2739 * vec2( 3.2 ) );
			nodeVar2794 = 0.0;
			nodeVar2795 = 0.5;
			nodeVar2796 = floor( nodeVar2793 );
			nodeVar2797 = fract( nodeVar2793 );
			nodeVar2797 = ( ( nodeVar2797 * nodeVar2797 ) * ( vec2( 3.0 ) - ( nodeVar2797 * vec2( 2.0 ) ) ) );
			nodeVar2798 = fract( ( vec3( nodeVar2796.x, nodeVar2796.y, nodeVar2796.x ) * vec3( 0.1031 ) ) );
			nodeVar2798 = ( nodeVar2798 + vec3( dot( nodeVar2798, ( nodeVar2798.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2799 = ( nodeVar2796 + vec2( 1.0, 0.0 ) );
			nodeVar2800 = fract( ( vec3( nodeVar2799.x, nodeVar2799.y, nodeVar2799.x ) * vec3( 0.1031 ) ) );
			nodeVar2800 = ( nodeVar2800 + vec3( dot( nodeVar2800, ( nodeVar2800.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2801 = ( nodeVar2796 + vec2( 0.0, 1.0 ) );
			nodeVar2802 = fract( ( vec3( nodeVar2801.x, nodeVar2801.y, nodeVar2801.x ) * vec3( 0.1031 ) ) );
			nodeVar2802 = ( nodeVar2802 + vec3( dot( nodeVar2802, ( nodeVar2802.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2803 = ( nodeVar2796 + vec2( 1.0, 1.0 ) );
			nodeVar2804 = fract( ( vec3( nodeVar2803.x, nodeVar2803.y, nodeVar2803.x ) * vec3( 0.1031 ) ) );
			nodeVar2804 = ( nodeVar2804 + vec3( dot( nodeVar2804, ( nodeVar2804.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2794 = ( nodeVar2794 + ( nodeVar2795 * mix( mix( fract( ( ( nodeVar2798.x + nodeVar2798.y ) * nodeVar2798.z ) ), fract( ( ( nodeVar2800.x + nodeVar2800.y ) * nodeVar2800.z ) ), nodeVar2797.x ), mix( fract( ( ( nodeVar2802.x + nodeVar2802.y ) * nodeVar2802.z ) ), fract( ( ( nodeVar2804.x + nodeVar2804.y ) * nodeVar2804.z ) ), nodeVar2797.x ), nodeVar2797.y ) ) );
			nodeVar2793 = ( nodeVar2793 * vec2( 2.03 ) );
			nodeVar2795 = ( nodeVar2795 * 0.52 );
			nodeVar2805 = floor( nodeVar2793 );
			nodeVar2806 = fract( nodeVar2793 );
			nodeVar2806 = ( ( nodeVar2806 * nodeVar2806 ) * ( vec2( 3.0 ) - ( nodeVar2806 * vec2( 2.0 ) ) ) );
			nodeVar2807 = fract( ( vec3( nodeVar2805.x, nodeVar2805.y, nodeVar2805.x ) * vec3( 0.1031 ) ) );
			nodeVar2807 = ( nodeVar2807 + vec3( dot( nodeVar2807, ( nodeVar2807.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2808 = ( nodeVar2805 + vec2( 1.0, 0.0 ) );
			nodeVar2809 = fract( ( vec3( nodeVar2808.x, nodeVar2808.y, nodeVar2808.x ) * vec3( 0.1031 ) ) );
			nodeVar2809 = ( nodeVar2809 + vec3( dot( nodeVar2809, ( nodeVar2809.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2810 = ( nodeVar2805 + vec2( 0.0, 1.0 ) );
			nodeVar2811 = fract( ( vec3( nodeVar2810.x, nodeVar2810.y, nodeVar2810.x ) * vec3( 0.1031 ) ) );
			nodeVar2811 = ( nodeVar2811 + vec3( dot( nodeVar2811, ( nodeVar2811.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2812 = ( nodeVar2805 + vec2( 1.0, 1.0 ) );
			nodeVar2813 = fract( ( vec3( nodeVar2812.x, nodeVar2812.y, nodeVar2812.x ) * vec3( 0.1031 ) ) );
			nodeVar2813 = ( nodeVar2813 + vec3( dot( nodeVar2813, ( nodeVar2813.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2794 = ( nodeVar2794 + ( nodeVar2795 * mix( mix( fract( ( ( nodeVar2807.x + nodeVar2807.y ) * nodeVar2807.z ) ), fract( ( ( nodeVar2809.x + nodeVar2809.y ) * nodeVar2809.z ) ), nodeVar2806.x ), mix( fract( ( ( nodeVar2811.x + nodeVar2811.y ) * nodeVar2811.z ) ), fract( ( ( nodeVar2813.x + nodeVar2813.y ) * nodeVar2813.z ) ), nodeVar2806.x ), nodeVar2806.y ) ) );
			nodeVar2793 = ( nodeVar2793 * vec2( 2.03 ) );
			nodeVar2795 = ( nodeVar2795 * 0.52 );
			nodeVar2814 = floor( nodeVar2793 );
			nodeVar2815 = fract( nodeVar2793 );
			nodeVar2815 = ( ( nodeVar2815 * nodeVar2815 ) * ( vec2( 3.0 ) - ( nodeVar2815 * vec2( 2.0 ) ) ) );
			nodeVar2816 = fract( ( vec3( nodeVar2814.x, nodeVar2814.y, nodeVar2814.x ) * vec3( 0.1031 ) ) );
			nodeVar2816 = ( nodeVar2816 + vec3( dot( nodeVar2816, ( nodeVar2816.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2817 = ( nodeVar2814 + vec2( 1.0, 0.0 ) );
			nodeVar2818 = fract( ( vec3( nodeVar2817.x, nodeVar2817.y, nodeVar2817.x ) * vec3( 0.1031 ) ) );
			nodeVar2818 = ( nodeVar2818 + vec3( dot( nodeVar2818, ( nodeVar2818.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2819 = ( nodeVar2814 + vec2( 0.0, 1.0 ) );
			nodeVar2820 = fract( ( vec3( nodeVar2819.x, nodeVar2819.y, nodeVar2819.x ) * vec3( 0.1031 ) ) );
			nodeVar2820 = ( nodeVar2820 + vec3( dot( nodeVar2820, ( nodeVar2820.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2821 = ( nodeVar2814 + vec2( 1.0, 1.0 ) );
			nodeVar2822 = fract( ( vec3( nodeVar2821.x, nodeVar2821.y, nodeVar2821.x ) * vec3( 0.1031 ) ) );
			nodeVar2822 = ( nodeVar2822 + vec3( dot( nodeVar2822, ( nodeVar2822.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2794 = ( nodeVar2794 + ( nodeVar2795 * mix( mix( fract( ( ( nodeVar2816.x + nodeVar2816.y ) * nodeVar2816.z ) ), fract( ( ( nodeVar2818.x + nodeVar2818.y ) * nodeVar2818.z ) ), nodeVar2815.x ), mix( fract( ( ( nodeVar2820.x + nodeVar2820.y ) * nodeVar2820.z ) ), fract( ( ( nodeVar2822.x + nodeVar2822.y ) * nodeVar2822.z ) ), nodeVar2815.x ), nodeVar2815.y ) ) );
			nodeVar2793 = ( nodeVar2793 * vec2( 2.03 ) );
			nodeVar2795 = ( nodeVar2795 * 0.52 );
			nodeVar2823 = floor( nodeVar2793 );
			nodeVar2824 = fract( nodeVar2793 );
			nodeVar2824 = ( ( nodeVar2824 * nodeVar2824 ) * ( vec2( 3.0 ) - ( nodeVar2824 * vec2( 2.0 ) ) ) );
			nodeVar2825 = fract( ( vec3( nodeVar2823.x, nodeVar2823.y, nodeVar2823.x ) * vec3( 0.1031 ) ) );
			nodeVar2825 = ( nodeVar2825 + vec3( dot( nodeVar2825, ( nodeVar2825.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2826 = ( nodeVar2823 + vec2( 1.0, 0.0 ) );
			nodeVar2827 = fract( ( vec3( nodeVar2826.x, nodeVar2826.y, nodeVar2826.x ) * vec3( 0.1031 ) ) );
			nodeVar2827 = ( nodeVar2827 + vec3( dot( nodeVar2827, ( nodeVar2827.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2828 = ( nodeVar2823 + vec2( 0.0, 1.0 ) );
			nodeVar2829 = fract( ( vec3( nodeVar2828.x, nodeVar2828.y, nodeVar2828.x ) * vec3( 0.1031 ) ) );
			nodeVar2829 = ( nodeVar2829 + vec3( dot( nodeVar2829, ( nodeVar2829.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2830 = ( nodeVar2823 + vec2( 1.0, 1.0 ) );
			nodeVar2831 = fract( ( vec3( nodeVar2830.x, nodeVar2830.y, nodeVar2830.x ) * vec3( 0.1031 ) ) );
			nodeVar2831 = ( nodeVar2831 + vec3( dot( nodeVar2831, ( nodeVar2831.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2794 = ( nodeVar2794 + ( nodeVar2795 * mix( mix( fract( ( ( nodeVar2825.x + nodeVar2825.y ) * nodeVar2825.z ) ), fract( ( ( nodeVar2827.x + nodeVar2827.y ) * nodeVar2827.z ) ), nodeVar2824.x ), mix( fract( ( ( nodeVar2829.x + nodeVar2829.y ) * nodeVar2829.z ) ), fract( ( ( nodeVar2831.x + nodeVar2831.y ) * nodeVar2831.z ) ), nodeVar2824.x ), nodeVar2824.y ) ) );
			nodeVar2793 = ( nodeVar2793 * vec2( 2.03 ) );
			nodeVar2795 = ( nodeVar2795 * 0.52 );
			nodeVar2832 = ( nodeVar2739 * vec2( 14.0 ) );
			nodeVar2833 = 0.0;
			nodeVar2834 = 0.5;
			nodeVar2835 = floor( nodeVar2832 );
			nodeVar2836 = fract( nodeVar2832 );
			nodeVar2836 = ( ( nodeVar2836 * nodeVar2836 ) * ( vec2( 3.0 ) - ( nodeVar2836 * vec2( 2.0 ) ) ) );
			nodeVar2837 = fract( ( vec3( nodeVar2835.x, nodeVar2835.y, nodeVar2835.x ) * vec3( 0.1031 ) ) );
			nodeVar2837 = ( nodeVar2837 + vec3( dot( nodeVar2837, ( nodeVar2837.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2838 = ( nodeVar2835 + vec2( 1.0, 0.0 ) );
			nodeVar2839 = fract( ( vec3( nodeVar2838.x, nodeVar2838.y, nodeVar2838.x ) * vec3( 0.1031 ) ) );
			nodeVar2839 = ( nodeVar2839 + vec3( dot( nodeVar2839, ( nodeVar2839.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2840 = ( nodeVar2835 + vec2( 0.0, 1.0 ) );
			nodeVar2841 = fract( ( vec3( nodeVar2840.x, nodeVar2840.y, nodeVar2840.x ) * vec3( 0.1031 ) ) );
			nodeVar2841 = ( nodeVar2841 + vec3( dot( nodeVar2841, ( nodeVar2841.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2842 = ( nodeVar2835 + vec2( 1.0, 1.0 ) );
			nodeVar2843 = fract( ( vec3( nodeVar2842.x, nodeVar2842.y, nodeVar2842.x ) * vec3( 0.1031 ) ) );
			nodeVar2843 = ( nodeVar2843 + vec3( dot( nodeVar2843, ( nodeVar2843.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2833 = ( nodeVar2833 + ( nodeVar2834 * mix( mix( fract( ( ( nodeVar2837.x + nodeVar2837.y ) * nodeVar2837.z ) ), fract( ( ( nodeVar2839.x + nodeVar2839.y ) * nodeVar2839.z ) ), nodeVar2836.x ), mix( fract( ( ( nodeVar2841.x + nodeVar2841.y ) * nodeVar2841.z ) ), fract( ( ( nodeVar2843.x + nodeVar2843.y ) * nodeVar2843.z ) ), nodeVar2836.x ), nodeVar2836.y ) ) );
			nodeVar2832 = ( nodeVar2832 * vec2( 2.03 ) );
			nodeVar2834 = ( nodeVar2834 * 0.52 );
			nodeVar2844 = floor( nodeVar2832 );
			nodeVar2845 = fract( nodeVar2832 );
			nodeVar2845 = ( ( nodeVar2845 * nodeVar2845 ) * ( vec2( 3.0 ) - ( nodeVar2845 * vec2( 2.0 ) ) ) );
			nodeVar2846 = fract( ( vec3( nodeVar2844.x, nodeVar2844.y, nodeVar2844.x ) * vec3( 0.1031 ) ) );
			nodeVar2846 = ( nodeVar2846 + vec3( dot( nodeVar2846, ( nodeVar2846.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2847 = ( nodeVar2844 + vec2( 1.0, 0.0 ) );
			nodeVar2848 = fract( ( vec3( nodeVar2847.x, nodeVar2847.y, nodeVar2847.x ) * vec3( 0.1031 ) ) );
			nodeVar2848 = ( nodeVar2848 + vec3( dot( nodeVar2848, ( nodeVar2848.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2849 = ( nodeVar2844 + vec2( 0.0, 1.0 ) );
			nodeVar2850 = fract( ( vec3( nodeVar2849.x, nodeVar2849.y, nodeVar2849.x ) * vec3( 0.1031 ) ) );
			nodeVar2850 = ( nodeVar2850 + vec3( dot( nodeVar2850, ( nodeVar2850.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2851 = ( nodeVar2844 + vec2( 1.0, 1.0 ) );
			nodeVar2852 = fract( ( vec3( nodeVar2851.x, nodeVar2851.y, nodeVar2851.x ) * vec3( 0.1031 ) ) );
			nodeVar2852 = ( nodeVar2852 + vec3( dot( nodeVar2852, ( nodeVar2852.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2833 = ( nodeVar2833 + ( nodeVar2834 * mix( mix( fract( ( ( nodeVar2846.x + nodeVar2846.y ) * nodeVar2846.z ) ), fract( ( ( nodeVar2848.x + nodeVar2848.y ) * nodeVar2848.z ) ), nodeVar2845.x ), mix( fract( ( ( nodeVar2850.x + nodeVar2850.y ) * nodeVar2850.z ) ), fract( ( ( nodeVar2852.x + nodeVar2852.y ) * nodeVar2852.z ) ), nodeVar2845.x ), nodeVar2845.y ) ) );
			nodeVar2832 = ( nodeVar2832 * vec2( 2.03 ) );
			nodeVar2834 = ( nodeVar2834 * 0.52 );
			nodeVar2853 = floor( nodeVar2832 );
			nodeVar2854 = fract( nodeVar2832 );
			nodeVar2854 = ( ( nodeVar2854 * nodeVar2854 ) * ( vec2( 3.0 ) - ( nodeVar2854 * vec2( 2.0 ) ) ) );
			nodeVar2855 = fract( ( vec3( nodeVar2853.x, nodeVar2853.y, nodeVar2853.x ) * vec3( 0.1031 ) ) );
			nodeVar2855 = ( nodeVar2855 + vec3( dot( nodeVar2855, ( nodeVar2855.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2856 = ( nodeVar2853 + vec2( 1.0, 0.0 ) );
			nodeVar2857 = fract( ( vec3( nodeVar2856.x, nodeVar2856.y, nodeVar2856.x ) * vec3( 0.1031 ) ) );
			nodeVar2857 = ( nodeVar2857 + vec3( dot( nodeVar2857, ( nodeVar2857.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2858 = ( nodeVar2853 + vec2( 0.0, 1.0 ) );
			nodeVar2859 = fract( ( vec3( nodeVar2858.x, nodeVar2858.y, nodeVar2858.x ) * vec3( 0.1031 ) ) );
			nodeVar2859 = ( nodeVar2859 + vec3( dot( nodeVar2859, ( nodeVar2859.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2860 = ( nodeVar2853 + vec2( 1.0, 1.0 ) );
			nodeVar2861 = fract( ( vec3( nodeVar2860.x, nodeVar2860.y, nodeVar2860.x ) * vec3( 0.1031 ) ) );
			nodeVar2861 = ( nodeVar2861 + vec3( dot( nodeVar2861, ( nodeVar2861.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2833 = ( nodeVar2833 + ( nodeVar2834 * mix( mix( fract( ( ( nodeVar2855.x + nodeVar2855.y ) * nodeVar2855.z ) ), fract( ( ( nodeVar2857.x + nodeVar2857.y ) * nodeVar2857.z ) ), nodeVar2854.x ), mix( fract( ( ( nodeVar2859.x + nodeVar2859.y ) * nodeVar2859.z ) ), fract( ( ( nodeVar2861.x + nodeVar2861.y ) * nodeVar2861.z ) ), nodeVar2854.x ), nodeVar2854.y ) ) );
			nodeVar2832 = ( nodeVar2832 * vec2( 2.03 ) );
			nodeVar2834 = ( nodeVar2834 * 0.52 );
			nodeVar2862 = floor( nodeVar2832 );
			nodeVar2863 = fract( nodeVar2832 );
			nodeVar2863 = ( ( nodeVar2863 * nodeVar2863 ) * ( vec2( 3.0 ) - ( nodeVar2863 * vec2( 2.0 ) ) ) );
			nodeVar2864 = fract( ( vec3( nodeVar2862.x, nodeVar2862.y, nodeVar2862.x ) * vec3( 0.1031 ) ) );
			nodeVar2864 = ( nodeVar2864 + vec3( dot( nodeVar2864, ( nodeVar2864.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2865 = ( nodeVar2862 + vec2( 1.0, 0.0 ) );
			nodeVar2866 = fract( ( vec3( nodeVar2865.x, nodeVar2865.y, nodeVar2865.x ) * vec3( 0.1031 ) ) );
			nodeVar2866 = ( nodeVar2866 + vec3( dot( nodeVar2866, ( nodeVar2866.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2867 = ( nodeVar2862 + vec2( 0.0, 1.0 ) );
			nodeVar2868 = fract( ( vec3( nodeVar2867.x, nodeVar2867.y, nodeVar2867.x ) * vec3( 0.1031 ) ) );
			nodeVar2868 = ( nodeVar2868 + vec3( dot( nodeVar2868, ( nodeVar2868.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2869 = ( nodeVar2862 + vec2( 1.0, 1.0 ) );
			nodeVar2870 = fract( ( vec3( nodeVar2869.x, nodeVar2869.y, nodeVar2869.x ) * vec3( 0.1031 ) ) );
			nodeVar2870 = ( nodeVar2870 + vec3( dot( nodeVar2870, ( nodeVar2870.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2833 = ( nodeVar2833 + ( nodeVar2834 * mix( mix( fract( ( ( nodeVar2864.x + nodeVar2864.y ) * nodeVar2864.z ) ), fract( ( ( nodeVar2866.x + nodeVar2866.y ) * nodeVar2866.z ) ), nodeVar2863.x ), mix( fract( ( ( nodeVar2868.x + nodeVar2868.y ) * nodeVar2868.z ) ), fract( ( ( nodeVar2870.x + nodeVar2870.y ) * nodeVar2870.z ) ), nodeVar2863.x ), nodeVar2863.y ) ) );
			nodeVar2832 = ( nodeVar2832 * vec2( 2.03 ) );
			nodeVar2834 = ( nodeVar2834 * 0.52 );
			nodeVar2871 = ( nodeVar2739 * vec2( 46.0 ) );
			nodeVar2872 = 0.0;
			nodeVar2873 = 0.5;
			nodeVar2874 = floor( nodeVar2871 );
			nodeVar2875 = fract( nodeVar2871 );
			nodeVar2875 = ( ( nodeVar2875 * nodeVar2875 ) * ( vec2( 3.0 ) - ( nodeVar2875 * vec2( 2.0 ) ) ) );
			nodeVar2876 = fract( ( vec3( nodeVar2874.x, nodeVar2874.y, nodeVar2874.x ) * vec3( 0.1031 ) ) );
			nodeVar2876 = ( nodeVar2876 + vec3( dot( nodeVar2876, ( nodeVar2876.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2877 = ( nodeVar2874 + vec2( 1.0, 0.0 ) );
			nodeVar2878 = fract( ( vec3( nodeVar2877.x, nodeVar2877.y, nodeVar2877.x ) * vec3( 0.1031 ) ) );
			nodeVar2878 = ( nodeVar2878 + vec3( dot( nodeVar2878, ( nodeVar2878.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2879 = ( nodeVar2874 + vec2( 0.0, 1.0 ) );
			nodeVar2880 = fract( ( vec3( nodeVar2879.x, nodeVar2879.y, nodeVar2879.x ) * vec3( 0.1031 ) ) );
			nodeVar2880 = ( nodeVar2880 + vec3( dot( nodeVar2880, ( nodeVar2880.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2881 = ( nodeVar2874 + vec2( 1.0, 1.0 ) );
			nodeVar2882 = fract( ( vec3( nodeVar2881.x, nodeVar2881.y, nodeVar2881.x ) * vec3( 0.1031 ) ) );
			nodeVar2882 = ( nodeVar2882 + vec3( dot( nodeVar2882, ( nodeVar2882.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2872 = ( nodeVar2872 + ( nodeVar2873 * mix( mix( fract( ( ( nodeVar2876.x + nodeVar2876.y ) * nodeVar2876.z ) ), fract( ( ( nodeVar2878.x + nodeVar2878.y ) * nodeVar2878.z ) ), nodeVar2875.x ), mix( fract( ( ( nodeVar2880.x + nodeVar2880.y ) * nodeVar2880.z ) ), fract( ( ( nodeVar2882.x + nodeVar2882.y ) * nodeVar2882.z ) ), nodeVar2875.x ), nodeVar2875.y ) ) );
			nodeVar2871 = ( nodeVar2871 * vec2( 2.03 ) );
			nodeVar2873 = ( nodeVar2873 * 0.52 );
			nodeVar2883 = floor( nodeVar2871 );
			nodeVar2884 = fract( nodeVar2871 );
			nodeVar2884 = ( ( nodeVar2884 * nodeVar2884 ) * ( vec2( 3.0 ) - ( nodeVar2884 * vec2( 2.0 ) ) ) );
			nodeVar2885 = fract( ( vec3( nodeVar2883.x, nodeVar2883.y, nodeVar2883.x ) * vec3( 0.1031 ) ) );
			nodeVar2885 = ( nodeVar2885 + vec3( dot( nodeVar2885, ( nodeVar2885.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2886 = ( nodeVar2883 + vec2( 1.0, 0.0 ) );
			nodeVar2887 = fract( ( vec3( nodeVar2886.x, nodeVar2886.y, nodeVar2886.x ) * vec3( 0.1031 ) ) );
			nodeVar2887 = ( nodeVar2887 + vec3( dot( nodeVar2887, ( nodeVar2887.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2888 = ( nodeVar2883 + vec2( 0.0, 1.0 ) );
			nodeVar2889 = fract( ( vec3( nodeVar2888.x, nodeVar2888.y, nodeVar2888.x ) * vec3( 0.1031 ) ) );
			nodeVar2889 = ( nodeVar2889 + vec3( dot( nodeVar2889, ( nodeVar2889.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2890 = ( nodeVar2883 + vec2( 1.0, 1.0 ) );
			nodeVar2891 = fract( ( vec3( nodeVar2890.x, nodeVar2890.y, nodeVar2890.x ) * vec3( 0.1031 ) ) );
			nodeVar2891 = ( nodeVar2891 + vec3( dot( nodeVar2891, ( nodeVar2891.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2872 = ( nodeVar2872 + ( nodeVar2873 * mix( mix( fract( ( ( nodeVar2885.x + nodeVar2885.y ) * nodeVar2885.z ) ), fract( ( ( nodeVar2887.x + nodeVar2887.y ) * nodeVar2887.z ) ), nodeVar2884.x ), mix( fract( ( ( nodeVar2889.x + nodeVar2889.y ) * nodeVar2889.z ) ), fract( ( ( nodeVar2891.x + nodeVar2891.y ) * nodeVar2891.z ) ), nodeVar2884.x ), nodeVar2884.y ) ) );
			nodeVar2871 = ( nodeVar2871 * vec2( 2.03 ) );
			nodeVar2873 = ( nodeVar2873 * 0.52 );
			nodeVar2892 = floor( nodeVar2871 );
			nodeVar2893 = fract( nodeVar2871 );
			nodeVar2893 = ( ( nodeVar2893 * nodeVar2893 ) * ( vec2( 3.0 ) - ( nodeVar2893 * vec2( 2.0 ) ) ) );
			nodeVar2894 = fract( ( vec3( nodeVar2892.x, nodeVar2892.y, nodeVar2892.x ) * vec3( 0.1031 ) ) );
			nodeVar2894 = ( nodeVar2894 + vec3( dot( nodeVar2894, ( nodeVar2894.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2895 = ( nodeVar2892 + vec2( 1.0, 0.0 ) );
			nodeVar2896 = fract( ( vec3( nodeVar2895.x, nodeVar2895.y, nodeVar2895.x ) * vec3( 0.1031 ) ) );
			nodeVar2896 = ( nodeVar2896 + vec3( dot( nodeVar2896, ( nodeVar2896.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2897 = ( nodeVar2892 + vec2( 0.0, 1.0 ) );
			nodeVar2898 = fract( ( vec3( nodeVar2897.x, nodeVar2897.y, nodeVar2897.x ) * vec3( 0.1031 ) ) );
			nodeVar2898 = ( nodeVar2898 + vec3( dot( nodeVar2898, ( nodeVar2898.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2899 = ( nodeVar2892 + vec2( 1.0, 1.0 ) );
			nodeVar2900 = fract( ( vec3( nodeVar2899.x, nodeVar2899.y, nodeVar2899.x ) * vec3( 0.1031 ) ) );
			nodeVar2900 = ( nodeVar2900 + vec3( dot( nodeVar2900, ( nodeVar2900.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2872 = ( nodeVar2872 + ( nodeVar2873 * mix( mix( fract( ( ( nodeVar2894.x + nodeVar2894.y ) * nodeVar2894.z ) ), fract( ( ( nodeVar2896.x + nodeVar2896.y ) * nodeVar2896.z ) ), nodeVar2893.x ), mix( fract( ( ( nodeVar2898.x + nodeVar2898.y ) * nodeVar2898.z ) ), fract( ( ( nodeVar2900.x + nodeVar2900.y ) * nodeVar2900.z ) ), nodeVar2893.x ), nodeVar2893.y ) ) );
			nodeVar2871 = ( nodeVar2871 * vec2( 2.03 ) );
			nodeVar2873 = ( nodeVar2873 * 0.52 );
			nodeVar2901 = floor( nodeVar2871 );
			nodeVar2902 = fract( nodeVar2871 );
			nodeVar2902 = ( ( nodeVar2902 * nodeVar2902 ) * ( vec2( 3.0 ) - ( nodeVar2902 * vec2( 2.0 ) ) ) );
			nodeVar2903 = fract( ( vec3( nodeVar2901.x, nodeVar2901.y, nodeVar2901.x ) * vec3( 0.1031 ) ) );
			nodeVar2903 = ( nodeVar2903 + vec3( dot( nodeVar2903, ( nodeVar2903.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2904 = ( nodeVar2901 + vec2( 1.0, 0.0 ) );
			nodeVar2905 = fract( ( vec3( nodeVar2904.x, nodeVar2904.y, nodeVar2904.x ) * vec3( 0.1031 ) ) );
			nodeVar2905 = ( nodeVar2905 + vec3( dot( nodeVar2905, ( nodeVar2905.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2906 = ( nodeVar2901 + vec2( 0.0, 1.0 ) );
			nodeVar2907 = fract( ( vec3( nodeVar2906.x, nodeVar2906.y, nodeVar2906.x ) * vec3( 0.1031 ) ) );
			nodeVar2907 = ( nodeVar2907 + vec3( dot( nodeVar2907, ( nodeVar2907.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2908 = ( nodeVar2901 + vec2( 1.0, 1.0 ) );
			nodeVar2909 = fract( ( vec3( nodeVar2908.x, nodeVar2908.y, nodeVar2908.x ) * vec3( 0.1031 ) ) );
			nodeVar2909 = ( nodeVar2909 + vec3( dot( nodeVar2909, ( nodeVar2909.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar2872 = ( nodeVar2872 + ( nodeVar2873 * mix( mix( fract( ( ( nodeVar2903.x + nodeVar2903.y ) * nodeVar2903.z ) ), fract( ( ( nodeVar2905.x + nodeVar2905.y ) * nodeVar2905.z ) ), nodeVar2902.x ), mix( fract( ( ( nodeVar2907.x + nodeVar2907.y ) * nodeVar2907.z ) ), fract( ( ( nodeVar2909.x + nodeVar2909.y ) * nodeVar2909.z ) ), nodeVar2902.x ), nodeVar2902.y ) ) );
			nodeVar2871 = ( nodeVar2871 * vec2( 2.03 ) );
			nodeVar2873 = ( nodeVar2873 * 0.52 );
			nodeVar2910 = ( ( ( nodeVar2794 * 0.55 ) + ( nodeVar2833 * 0.3 ) ) + ( nodeVar2872 * 0.15 ) );
			nodeVar2741 = vec3( nodeVar2910, ( 0.55 + ( nodeVar2910 * 0.45 ) ), nodeVar2910 );
			

		} else {


			if ( ( nodeVar2740 < 2.5 ) ) {

				nodeVar2911 = floor( ( nodeVar2739.y / 0.082 ) );
				nodeVar2912 = ( ( mod( nodeVar2911, 2.0 ) * 0.5 ) * 0.235 );
				nodeVar2913 = fract( ( ( nodeVar2739.x + nodeVar2912 ) / 0.235 ) );
				nodeVar2914 = fract( ( nodeVar2739.y / 0.082 ) );
				nodeVar2915 = min( ( min( nodeVar2913, ( 1.0 - nodeVar2913 ) ) * 0.235 ), ( min( nodeVar2914, ( 1.0 - nodeVar2914 ) ) * 0.082 ) );
				nodeVar2916 = smoothstep( 0.0, 0.011, nodeVar2915 );
				nodeVar2917 = ( vec2( floor( ( ( nodeVar2739.x + nodeVar2912 ) / 0.235 ) ), nodeVar2911 ) * vec2( 1.91 ) );
				nodeVar2918 = fract( ( vec3( nodeVar2917.x, nodeVar2917.y, nodeVar2917.x ) * vec3( 0.1031 ) ) );
				nodeVar2918 = ( nodeVar2918 + vec3( dot( nodeVar2918, ( nodeVar2918.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2919 = fract( ( ( nodeVar2918.x + nodeVar2918.y ) * nodeVar2918.z ) );
				nodeVar2920 = ( nodeVar2739 * vec2( 40.0 ) );
				nodeVar2921 = 0.0;
				nodeVar2922 = 0.5;
				nodeVar2923 = floor( nodeVar2920 );
				nodeVar2924 = fract( nodeVar2920 );
				nodeVar2924 = ( ( nodeVar2924 * nodeVar2924 ) * ( vec2( 3.0 ) - ( nodeVar2924 * vec2( 2.0 ) ) ) );
				nodeVar2925 = fract( ( vec3( nodeVar2923.x, nodeVar2923.y, nodeVar2923.x ) * vec3( 0.1031 ) ) );
				nodeVar2925 = ( nodeVar2925 + vec3( dot( nodeVar2925, ( nodeVar2925.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2926 = ( nodeVar2923 + vec2( 1.0, 0.0 ) );
				nodeVar2927 = fract( ( vec3( nodeVar2926.x, nodeVar2926.y, nodeVar2926.x ) * vec3( 0.1031 ) ) );
				nodeVar2927 = ( nodeVar2927 + vec3( dot( nodeVar2927, ( nodeVar2927.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2928 = ( nodeVar2923 + vec2( 0.0, 1.0 ) );
				nodeVar2929 = fract( ( vec3( nodeVar2928.x, nodeVar2928.y, nodeVar2928.x ) * vec3( 0.1031 ) ) );
				nodeVar2929 = ( nodeVar2929 + vec3( dot( nodeVar2929, ( nodeVar2929.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2930 = ( nodeVar2923 + vec2( 1.0, 1.0 ) );
				nodeVar2931 = fract( ( vec3( nodeVar2930.x, nodeVar2930.y, nodeVar2930.x ) * vec3( 0.1031 ) ) );
				nodeVar2931 = ( nodeVar2931 + vec3( dot( nodeVar2931, ( nodeVar2931.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2921 = ( nodeVar2921 + ( nodeVar2922 * mix( mix( fract( ( ( nodeVar2925.x + nodeVar2925.y ) * nodeVar2925.z ) ), fract( ( ( nodeVar2927.x + nodeVar2927.y ) * nodeVar2927.z ) ), nodeVar2924.x ), mix( fract( ( ( nodeVar2929.x + nodeVar2929.y ) * nodeVar2929.z ) ), fract( ( ( nodeVar2931.x + nodeVar2931.y ) * nodeVar2931.z ) ), nodeVar2924.x ), nodeVar2924.y ) ) );
				nodeVar2920 = ( nodeVar2920 * vec2( 2.03 ) );
				nodeVar2922 = ( nodeVar2922 * 0.52 );
				nodeVar2932 = floor( nodeVar2920 );
				nodeVar2933 = fract( nodeVar2920 );
				nodeVar2933 = ( ( nodeVar2933 * nodeVar2933 ) * ( vec2( 3.0 ) - ( nodeVar2933 * vec2( 2.0 ) ) ) );
				nodeVar2934 = fract( ( vec3( nodeVar2932.x, nodeVar2932.y, nodeVar2932.x ) * vec3( 0.1031 ) ) );
				nodeVar2934 = ( nodeVar2934 + vec3( dot( nodeVar2934, ( nodeVar2934.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2935 = ( nodeVar2932 + vec2( 1.0, 0.0 ) );
				nodeVar2936 = fract( ( vec3( nodeVar2935.x, nodeVar2935.y, nodeVar2935.x ) * vec3( 0.1031 ) ) );
				nodeVar2936 = ( nodeVar2936 + vec3( dot( nodeVar2936, ( nodeVar2936.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2937 = ( nodeVar2932 + vec2( 0.0, 1.0 ) );
				nodeVar2938 = fract( ( vec3( nodeVar2937.x, nodeVar2937.y, nodeVar2937.x ) * vec3( 0.1031 ) ) );
				nodeVar2938 = ( nodeVar2938 + vec3( dot( nodeVar2938, ( nodeVar2938.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2939 = ( nodeVar2932 + vec2( 1.0, 1.0 ) );
				nodeVar2940 = fract( ( vec3( nodeVar2939.x, nodeVar2939.y, nodeVar2939.x ) * vec3( 0.1031 ) ) );
				nodeVar2940 = ( nodeVar2940 + vec3( dot( nodeVar2940, ( nodeVar2940.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2921 = ( nodeVar2921 + ( nodeVar2922 * mix( mix( fract( ( ( nodeVar2934.x + nodeVar2934.y ) * nodeVar2934.z ) ), fract( ( ( nodeVar2936.x + nodeVar2936.y ) * nodeVar2936.z ) ), nodeVar2933.x ), mix( fract( ( ( nodeVar2938.x + nodeVar2938.y ) * nodeVar2938.z ) ), fract( ( ( nodeVar2940.x + nodeVar2940.y ) * nodeVar2940.z ) ), nodeVar2933.x ), nodeVar2933.y ) ) );
				nodeVar2920 = ( nodeVar2920 * vec2( 2.03 ) );
				nodeVar2922 = ( nodeVar2922 * 0.52 );
				nodeVar2941 = floor( nodeVar2920 );
				nodeVar2942 = fract( nodeVar2920 );
				nodeVar2942 = ( ( nodeVar2942 * nodeVar2942 ) * ( vec2( 3.0 ) - ( nodeVar2942 * vec2( 2.0 ) ) ) );
				nodeVar2943 = fract( ( vec3( nodeVar2941.x, nodeVar2941.y, nodeVar2941.x ) * vec3( 0.1031 ) ) );
				nodeVar2943 = ( nodeVar2943 + vec3( dot( nodeVar2943, ( nodeVar2943.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2944 = ( nodeVar2941 + vec2( 1.0, 0.0 ) );
				nodeVar2945 = fract( ( vec3( nodeVar2944.x, nodeVar2944.y, nodeVar2944.x ) * vec3( 0.1031 ) ) );
				nodeVar2945 = ( nodeVar2945 + vec3( dot( nodeVar2945, ( nodeVar2945.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2946 = ( nodeVar2941 + vec2( 0.0, 1.0 ) );
				nodeVar2947 = fract( ( vec3( nodeVar2946.x, nodeVar2946.y, nodeVar2946.x ) * vec3( 0.1031 ) ) );
				nodeVar2947 = ( nodeVar2947 + vec3( dot( nodeVar2947, ( nodeVar2947.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2948 = ( nodeVar2941 + vec2( 1.0, 1.0 ) );
				nodeVar2949 = fract( ( vec3( nodeVar2948.x, nodeVar2948.y, nodeVar2948.x ) * vec3( 0.1031 ) ) );
				nodeVar2949 = ( nodeVar2949 + vec3( dot( nodeVar2949, ( nodeVar2949.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2921 = ( nodeVar2921 + ( nodeVar2922 * mix( mix( fract( ( ( nodeVar2943.x + nodeVar2943.y ) * nodeVar2943.z ) ), fract( ( ( nodeVar2945.x + nodeVar2945.y ) * nodeVar2945.z ) ), nodeVar2942.x ), mix( fract( ( ( nodeVar2947.x + nodeVar2947.y ) * nodeVar2947.z ) ), fract( ( ( nodeVar2949.x + nodeVar2949.y ) * nodeVar2949.z ) ), nodeVar2942.x ), nodeVar2942.y ) ) );
				nodeVar2920 = ( nodeVar2920 * vec2( 2.03 ) );
				nodeVar2922 = ( nodeVar2922 * 0.52 );
				nodeVar2950 = floor( nodeVar2920 );
				nodeVar2951 = fract( nodeVar2920 );
				nodeVar2951 = ( ( nodeVar2951 * nodeVar2951 ) * ( vec2( 3.0 ) - ( nodeVar2951 * vec2( 2.0 ) ) ) );
				nodeVar2952 = fract( ( vec3( nodeVar2950.x, nodeVar2950.y, nodeVar2950.x ) * vec3( 0.1031 ) ) );
				nodeVar2952 = ( nodeVar2952 + vec3( dot( nodeVar2952, ( nodeVar2952.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2953 = ( nodeVar2950 + vec2( 1.0, 0.0 ) );
				nodeVar2954 = fract( ( vec3( nodeVar2953.x, nodeVar2953.y, nodeVar2953.x ) * vec3( 0.1031 ) ) );
				nodeVar2954 = ( nodeVar2954 + vec3( dot( nodeVar2954, ( nodeVar2954.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2955 = ( nodeVar2950 + vec2( 0.0, 1.0 ) );
				nodeVar2956 = fract( ( vec3( nodeVar2955.x, nodeVar2955.y, nodeVar2955.x ) * vec3( 0.1031 ) ) );
				nodeVar2956 = ( nodeVar2956 + vec3( dot( nodeVar2956, ( nodeVar2956.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2957 = ( nodeVar2950 + vec2( 1.0, 1.0 ) );
				nodeVar2958 = fract( ( vec3( nodeVar2957.x, nodeVar2957.y, nodeVar2957.x ) * vec3( 0.1031 ) ) );
				nodeVar2958 = ( nodeVar2958 + vec3( dot( nodeVar2958, ( nodeVar2958.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar2921 = ( nodeVar2921 + ( nodeVar2922 * mix( mix( fract( ( ( nodeVar2952.x + nodeVar2952.y ) * nodeVar2952.z ) ), fract( ( ( nodeVar2954.x + nodeVar2954.y ) * nodeVar2954.z ) ), nodeVar2951.x ), mix( fract( ( ( nodeVar2956.x + nodeVar2956.y ) * nodeVar2956.z ) ), fract( ( ( nodeVar2958.x + nodeVar2958.y ) * nodeVar2958.z ) ), nodeVar2951.x ), nodeVar2951.y ) ) );
				nodeVar2920 = ( nodeVar2920 * vec2( 2.03 ) );
				nodeVar2922 = ( nodeVar2922 * 0.52 );
				nodeVar2741 = vec3( ( ( ( nodeVar2916 * ( 0.62 + ( nodeVar2919 * 0.38 ) ) ) * 0.72 ) + ( ( nodeVar2921 * 0.16 ) * nodeVar2916 ) ), nodeVar2916, nodeVar2919 );
				

			} else {


				if ( ( nodeVar2740 < 3.5 ) ) {

					nodeVar2959 = floor( ( nodeVar2739.y * 5.2 ) );
					nodeVar2960 = fract( ( nodeVar2739.y * 5.2 ) );
					nodeVar2961 = smoothstep( 0.0, 0.06, min( nodeVar2960, ( 1.0 - nodeVar2960 ) ) );
					nodeVar2962 = vec2( ( nodeVar2739.x * 2.2 ), ( nodeVar2739.y * 60.0 ) );
					nodeVar2963 = 0.0;
					nodeVar2964 = 0.5;
					nodeVar2965 = floor( nodeVar2962 );
					nodeVar2966 = fract( nodeVar2962 );
					nodeVar2966 = ( ( nodeVar2966 * nodeVar2966 ) * ( vec2( 3.0 ) - ( nodeVar2966 * vec2( 2.0 ) ) ) );
					nodeVar2967 = fract( ( vec3( nodeVar2965.x, nodeVar2965.y, nodeVar2965.x ) * vec3( 0.1031 ) ) );
					nodeVar2967 = ( nodeVar2967 + vec3( dot( nodeVar2967, ( nodeVar2967.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2968 = ( nodeVar2965 + vec2( 1.0, 0.0 ) );
					nodeVar2969 = fract( ( vec3( nodeVar2968.x, nodeVar2968.y, nodeVar2968.x ) * vec3( 0.1031 ) ) );
					nodeVar2969 = ( nodeVar2969 + vec3( dot( nodeVar2969, ( nodeVar2969.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2970 = ( nodeVar2965 + vec2( 0.0, 1.0 ) );
					nodeVar2971 = fract( ( vec3( nodeVar2970.x, nodeVar2970.y, nodeVar2970.x ) * vec3( 0.1031 ) ) );
					nodeVar2971 = ( nodeVar2971 + vec3( dot( nodeVar2971, ( nodeVar2971.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2972 = ( nodeVar2965 + vec2( 1.0, 1.0 ) );
					nodeVar2973 = fract( ( vec3( nodeVar2972.x, nodeVar2972.y, nodeVar2972.x ) * vec3( 0.1031 ) ) );
					nodeVar2973 = ( nodeVar2973 + vec3( dot( nodeVar2973, ( nodeVar2973.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2963 = ( nodeVar2963 + ( nodeVar2964 * mix( mix( fract( ( ( nodeVar2967.x + nodeVar2967.y ) * nodeVar2967.z ) ), fract( ( ( nodeVar2969.x + nodeVar2969.y ) * nodeVar2969.z ) ), nodeVar2966.x ), mix( fract( ( ( nodeVar2971.x + nodeVar2971.y ) * nodeVar2971.z ) ), fract( ( ( nodeVar2973.x + nodeVar2973.y ) * nodeVar2973.z ) ), nodeVar2966.x ), nodeVar2966.y ) ) );
					nodeVar2962 = ( nodeVar2962 * vec2( 2.03 ) );
					nodeVar2964 = ( nodeVar2964 * 0.52 );
					nodeVar2974 = floor( nodeVar2962 );
					nodeVar2975 = fract( nodeVar2962 );
					nodeVar2975 = ( ( nodeVar2975 * nodeVar2975 ) * ( vec2( 3.0 ) - ( nodeVar2975 * vec2( 2.0 ) ) ) );
					nodeVar2976 = fract( ( vec3( nodeVar2974.x, nodeVar2974.y, nodeVar2974.x ) * vec3( 0.1031 ) ) );
					nodeVar2976 = ( nodeVar2976 + vec3( dot( nodeVar2976, ( nodeVar2976.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2977 = ( nodeVar2974 + vec2( 1.0, 0.0 ) );
					nodeVar2978 = fract( ( vec3( nodeVar2977.x, nodeVar2977.y, nodeVar2977.x ) * vec3( 0.1031 ) ) );
					nodeVar2978 = ( nodeVar2978 + vec3( dot( nodeVar2978, ( nodeVar2978.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2979 = ( nodeVar2974 + vec2( 0.0, 1.0 ) );
					nodeVar2980 = fract( ( vec3( nodeVar2979.x, nodeVar2979.y, nodeVar2979.x ) * vec3( 0.1031 ) ) );
					nodeVar2980 = ( nodeVar2980 + vec3( dot( nodeVar2980, ( nodeVar2980.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2981 = ( nodeVar2974 + vec2( 1.0, 1.0 ) );
					nodeVar2982 = fract( ( vec3( nodeVar2981.x, nodeVar2981.y, nodeVar2981.x ) * vec3( 0.1031 ) ) );
					nodeVar2982 = ( nodeVar2982 + vec3( dot( nodeVar2982, ( nodeVar2982.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2963 = ( nodeVar2963 + ( nodeVar2964 * mix( mix( fract( ( ( nodeVar2976.x + nodeVar2976.y ) * nodeVar2976.z ) ), fract( ( ( nodeVar2978.x + nodeVar2978.y ) * nodeVar2978.z ) ), nodeVar2975.x ), mix( fract( ( ( nodeVar2980.x + nodeVar2980.y ) * nodeVar2980.z ) ), fract( ( ( nodeVar2982.x + nodeVar2982.y ) * nodeVar2982.z ) ), nodeVar2975.x ), nodeVar2975.y ) ) );
					nodeVar2962 = ( nodeVar2962 * vec2( 2.03 ) );
					nodeVar2964 = ( nodeVar2964 * 0.52 );
					nodeVar2983 = floor( nodeVar2962 );
					nodeVar2984 = fract( nodeVar2962 );
					nodeVar2984 = ( ( nodeVar2984 * nodeVar2984 ) * ( vec2( 3.0 ) - ( nodeVar2984 * vec2( 2.0 ) ) ) );
					nodeVar2985 = fract( ( vec3( nodeVar2983.x, nodeVar2983.y, nodeVar2983.x ) * vec3( 0.1031 ) ) );
					nodeVar2985 = ( nodeVar2985 + vec3( dot( nodeVar2985, ( nodeVar2985.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2986 = ( nodeVar2983 + vec2( 1.0, 0.0 ) );
					nodeVar2987 = fract( ( vec3( nodeVar2986.x, nodeVar2986.y, nodeVar2986.x ) * vec3( 0.1031 ) ) );
					nodeVar2987 = ( nodeVar2987 + vec3( dot( nodeVar2987, ( nodeVar2987.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2988 = ( nodeVar2983 + vec2( 0.0, 1.0 ) );
					nodeVar2989 = fract( ( vec3( nodeVar2988.x, nodeVar2988.y, nodeVar2988.x ) * vec3( 0.1031 ) ) );
					nodeVar2989 = ( nodeVar2989 + vec3( dot( nodeVar2989, ( nodeVar2989.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2990 = ( nodeVar2983 + vec2( 1.0, 1.0 ) );
					nodeVar2991 = fract( ( vec3( nodeVar2990.x, nodeVar2990.y, nodeVar2990.x ) * vec3( 0.1031 ) ) );
					nodeVar2991 = ( nodeVar2991 + vec3( dot( nodeVar2991, ( nodeVar2991.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2963 = ( nodeVar2963 + ( nodeVar2964 * mix( mix( fract( ( ( nodeVar2985.x + nodeVar2985.y ) * nodeVar2985.z ) ), fract( ( ( nodeVar2987.x + nodeVar2987.y ) * nodeVar2987.z ) ), nodeVar2984.x ), mix( fract( ( ( nodeVar2989.x + nodeVar2989.y ) * nodeVar2989.z ) ), fract( ( ( nodeVar2991.x + nodeVar2991.y ) * nodeVar2991.z ) ), nodeVar2984.x ), nodeVar2984.y ) ) );
					nodeVar2962 = ( nodeVar2962 * vec2( 2.03 ) );
					nodeVar2964 = ( nodeVar2964 * 0.52 );
					nodeVar2992 = floor( nodeVar2962 );
					nodeVar2993 = fract( nodeVar2962 );
					nodeVar2993 = ( ( nodeVar2993 * nodeVar2993 ) * ( vec2( 3.0 ) - ( nodeVar2993 * vec2( 2.0 ) ) ) );
					nodeVar2994 = fract( ( vec3( nodeVar2992.x, nodeVar2992.y, nodeVar2992.x ) * vec3( 0.1031 ) ) );
					nodeVar2994 = ( nodeVar2994 + vec3( dot( nodeVar2994, ( nodeVar2994.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2995 = ( nodeVar2992 + vec2( 1.0, 0.0 ) );
					nodeVar2996 = fract( ( vec3( nodeVar2995.x, nodeVar2995.y, nodeVar2995.x ) * vec3( 0.1031 ) ) );
					nodeVar2996 = ( nodeVar2996 + vec3( dot( nodeVar2996, ( nodeVar2996.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2997 = ( nodeVar2992 + vec2( 0.0, 1.0 ) );
					nodeVar2998 = fract( ( vec3( nodeVar2997.x, nodeVar2997.y, nodeVar2997.x ) * vec3( 0.1031 ) ) );
					nodeVar2998 = ( nodeVar2998 + vec3( dot( nodeVar2998, ( nodeVar2998.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2999 = ( nodeVar2992 + vec2( 1.0, 1.0 ) );
					nodeVar3000 = fract( ( vec3( nodeVar2999.x, nodeVar2999.y, nodeVar2999.x ) * vec3( 0.1031 ) ) );
					nodeVar3000 = ( nodeVar3000 + vec3( dot( nodeVar3000, ( nodeVar3000.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar2963 = ( nodeVar2963 + ( nodeVar2964 * mix( mix( fract( ( ( nodeVar2994.x + nodeVar2994.y ) * nodeVar2994.z ) ), fract( ( ( nodeVar2996.x + nodeVar2996.y ) * nodeVar2996.z ) ), nodeVar2993.x ), mix( fract( ( ( nodeVar2998.x + nodeVar2998.y ) * nodeVar2998.z ) ), fract( ( ( nodeVar3000.x + nodeVar3000.y ) * nodeVar3000.z ) ), nodeVar2993.x ), nodeVar2993.y ) ) );
					nodeVar2962 = ( nodeVar2962 * vec2( 2.03 ) );
					nodeVar2964 = ( nodeVar2964 * 0.52 );
					nodeVar3001 = nodeVar2963;
					nodeVar3002 = fract( ( ( nodeVar2959 * 5.1 ) * 0.1031 ) );
					nodeVar3002 = ( nodeVar3002 * ( nodeVar3002 + 33.33 ) );
					nodeVar3002 = ( nodeVar3002 * ( nodeVar3002 + nodeVar3002 ) );
					nodeVar2741 = vec3( ( ( ( nodeVar2961 * ( 0.6 + ( nodeVar3001 * 0.4 ) ) ) * 0.5 ) + ( ( fract( nodeVar3002 ) * 0.12 ) * nodeVar2961 ) ), nodeVar2961, nodeVar3001 );
					

				} else {


					if ( ( nodeVar2740 < 4.5 ) ) {

						nodeVar3003 = floor( ( nodeVar2739.y / 0.45 ) );
						nodeVar3004 = fract( ( ( nodeVar3003 * 4.7 ) * 0.1031 ) );
						nodeVar3004 = ( nodeVar3004 * ( nodeVar3004 + 33.33 ) );
						nodeVar3004 = ( nodeVar3004 * ( nodeVar3004 + nodeVar3004 ) );
						nodeVar3005 = ( ( ( mod( nodeVar3003, 2.0 ) * 0.5 ) * 0.9 ) + ( fract( nodeVar3004 ) * 0.18 ) );
						nodeVar3006 = fract( ( ( nodeVar2739.x + nodeVar3005 ) / 0.9 ) );
						nodeVar3007 = fract( ( nodeVar2739.y / 0.45 ) );
						nodeVar3008 = min( ( min( nodeVar3006, ( 1.0 - nodeVar3006 ) ) * 0.9 ), ( min( nodeVar3007, ( 1.0 - nodeVar3007 ) ) * 0.45 ) );
						nodeVar3009 = smoothstep( 0.0, 0.006, nodeVar3008 );
						nodeVar3010 = vec2( ( nodeVar2739.x * 2.2 ), ( nodeVar2739.y * 16.0 ) );
						nodeVar3011 = 0.0;
						nodeVar3012 = 0.5;
						nodeVar3013 = floor( nodeVar3010 );
						nodeVar3014 = fract( nodeVar3010 );
						nodeVar3014 = ( ( nodeVar3014 * nodeVar3014 ) * ( vec2( 3.0 ) - ( nodeVar3014 * vec2( 2.0 ) ) ) );
						nodeVar3015 = fract( ( vec3( nodeVar3013.x, nodeVar3013.y, nodeVar3013.x ) * vec3( 0.1031 ) ) );
						nodeVar3015 = ( nodeVar3015 + vec3( dot( nodeVar3015, ( nodeVar3015.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3016 = ( nodeVar3013 + vec2( 1.0, 0.0 ) );
						nodeVar3017 = fract( ( vec3( nodeVar3016.x, nodeVar3016.y, nodeVar3016.x ) * vec3( 0.1031 ) ) );
						nodeVar3017 = ( nodeVar3017 + vec3( dot( nodeVar3017, ( nodeVar3017.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3018 = ( nodeVar3013 + vec2( 0.0, 1.0 ) );
						nodeVar3019 = fract( ( vec3( nodeVar3018.x, nodeVar3018.y, nodeVar3018.x ) * vec3( 0.1031 ) ) );
						nodeVar3019 = ( nodeVar3019 + vec3( dot( nodeVar3019, ( nodeVar3019.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3020 = ( nodeVar3013 + vec2( 1.0, 1.0 ) );
						nodeVar3021 = fract( ( vec3( nodeVar3020.x, nodeVar3020.y, nodeVar3020.x ) * vec3( 0.1031 ) ) );
						nodeVar3021 = ( nodeVar3021 + vec3( dot( nodeVar3021, ( nodeVar3021.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3011 = ( nodeVar3011 + ( nodeVar3012 * mix( mix( fract( ( ( nodeVar3015.x + nodeVar3015.y ) * nodeVar3015.z ) ), fract( ( ( nodeVar3017.x + nodeVar3017.y ) * nodeVar3017.z ) ), nodeVar3014.x ), mix( fract( ( ( nodeVar3019.x + nodeVar3019.y ) * nodeVar3019.z ) ), fract( ( ( nodeVar3021.x + nodeVar3021.y ) * nodeVar3021.z ) ), nodeVar3014.x ), nodeVar3014.y ) ) );
						nodeVar3010 = ( nodeVar3010 * vec2( 2.03 ) );
						nodeVar3012 = ( nodeVar3012 * 0.52 );
						nodeVar3022 = floor( nodeVar3010 );
						nodeVar3023 = fract( nodeVar3010 );
						nodeVar3023 = ( ( nodeVar3023 * nodeVar3023 ) * ( vec2( 3.0 ) - ( nodeVar3023 * vec2( 2.0 ) ) ) );
						nodeVar3024 = fract( ( vec3( nodeVar3022.x, nodeVar3022.y, nodeVar3022.x ) * vec3( 0.1031 ) ) );
						nodeVar3024 = ( nodeVar3024 + vec3( dot( nodeVar3024, ( nodeVar3024.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3025 = ( nodeVar3022 + vec2( 1.0, 0.0 ) );
						nodeVar3026 = fract( ( vec3( nodeVar3025.x, nodeVar3025.y, nodeVar3025.x ) * vec3( 0.1031 ) ) );
						nodeVar3026 = ( nodeVar3026 + vec3( dot( nodeVar3026, ( nodeVar3026.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3027 = ( nodeVar3022 + vec2( 0.0, 1.0 ) );
						nodeVar3028 = fract( ( vec3( nodeVar3027.x, nodeVar3027.y, nodeVar3027.x ) * vec3( 0.1031 ) ) );
						nodeVar3028 = ( nodeVar3028 + vec3( dot( nodeVar3028, ( nodeVar3028.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3029 = ( nodeVar3022 + vec2( 1.0, 1.0 ) );
						nodeVar3030 = fract( ( vec3( nodeVar3029.x, nodeVar3029.y, nodeVar3029.x ) * vec3( 0.1031 ) ) );
						nodeVar3030 = ( nodeVar3030 + vec3( dot( nodeVar3030, ( nodeVar3030.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3011 = ( nodeVar3011 + ( nodeVar3012 * mix( mix( fract( ( ( nodeVar3024.x + nodeVar3024.y ) * nodeVar3024.z ) ), fract( ( ( nodeVar3026.x + nodeVar3026.y ) * nodeVar3026.z ) ), nodeVar3023.x ), mix( fract( ( ( nodeVar3028.x + nodeVar3028.y ) * nodeVar3028.z ) ), fract( ( ( nodeVar3030.x + nodeVar3030.y ) * nodeVar3030.z ) ), nodeVar3023.x ), nodeVar3023.y ) ) );
						nodeVar3010 = ( nodeVar3010 * vec2( 2.03 ) );
						nodeVar3012 = ( nodeVar3012 * 0.52 );
						nodeVar3031 = floor( nodeVar3010 );
						nodeVar3032 = fract( nodeVar3010 );
						nodeVar3032 = ( ( nodeVar3032 * nodeVar3032 ) * ( vec2( 3.0 ) - ( nodeVar3032 * vec2( 2.0 ) ) ) );
						nodeVar3033 = fract( ( vec3( nodeVar3031.x, nodeVar3031.y, nodeVar3031.x ) * vec3( 0.1031 ) ) );
						nodeVar3033 = ( nodeVar3033 + vec3( dot( nodeVar3033, ( nodeVar3033.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3034 = ( nodeVar3031 + vec2( 1.0, 0.0 ) );
						nodeVar3035 = fract( ( vec3( nodeVar3034.x, nodeVar3034.y, nodeVar3034.x ) * vec3( 0.1031 ) ) );
						nodeVar3035 = ( nodeVar3035 + vec3( dot( nodeVar3035, ( nodeVar3035.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3036 = ( nodeVar3031 + vec2( 0.0, 1.0 ) );
						nodeVar3037 = fract( ( vec3( nodeVar3036.x, nodeVar3036.y, nodeVar3036.x ) * vec3( 0.1031 ) ) );
						nodeVar3037 = ( nodeVar3037 + vec3( dot( nodeVar3037, ( nodeVar3037.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3038 = ( nodeVar3031 + vec2( 1.0, 1.0 ) );
						nodeVar3039 = fract( ( vec3( nodeVar3038.x, nodeVar3038.y, nodeVar3038.x ) * vec3( 0.1031 ) ) );
						nodeVar3039 = ( nodeVar3039 + vec3( dot( nodeVar3039, ( nodeVar3039.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3011 = ( nodeVar3011 + ( nodeVar3012 * mix( mix( fract( ( ( nodeVar3033.x + nodeVar3033.y ) * nodeVar3033.z ) ), fract( ( ( nodeVar3035.x + nodeVar3035.y ) * nodeVar3035.z ) ), nodeVar3032.x ), mix( fract( ( ( nodeVar3037.x + nodeVar3037.y ) * nodeVar3037.z ) ), fract( ( ( nodeVar3039.x + nodeVar3039.y ) * nodeVar3039.z ) ), nodeVar3032.x ), nodeVar3032.y ) ) );
						nodeVar3010 = ( nodeVar3010 * vec2( 2.03 ) );
						nodeVar3012 = ( nodeVar3012 * 0.52 );
						nodeVar3040 = floor( nodeVar3010 );
						nodeVar3041 = fract( nodeVar3010 );
						nodeVar3041 = ( ( nodeVar3041 * nodeVar3041 ) * ( vec2( 3.0 ) - ( nodeVar3041 * vec2( 2.0 ) ) ) );
						nodeVar3042 = fract( ( vec3( nodeVar3040.x, nodeVar3040.y, nodeVar3040.x ) * vec3( 0.1031 ) ) );
						nodeVar3042 = ( nodeVar3042 + vec3( dot( nodeVar3042, ( nodeVar3042.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3043 = ( nodeVar3040 + vec2( 1.0, 0.0 ) );
						nodeVar3044 = fract( ( vec3( nodeVar3043.x, nodeVar3043.y, nodeVar3043.x ) * vec3( 0.1031 ) ) );
						nodeVar3044 = ( nodeVar3044 + vec3( dot( nodeVar3044, ( nodeVar3044.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3045 = ( nodeVar3040 + vec2( 0.0, 1.0 ) );
						nodeVar3046 = fract( ( vec3( nodeVar3045.x, nodeVar3045.y, nodeVar3045.x ) * vec3( 0.1031 ) ) );
						nodeVar3046 = ( nodeVar3046 + vec3( dot( nodeVar3046, ( nodeVar3046.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3047 = ( nodeVar3040 + vec2( 1.0, 1.0 ) );
						nodeVar3048 = fract( ( vec3( nodeVar3047.x, nodeVar3047.y, nodeVar3047.x ) * vec3( 0.1031 ) ) );
						nodeVar3048 = ( nodeVar3048 + vec3( dot( nodeVar3048, ( nodeVar3048.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3011 = ( nodeVar3011 + ( nodeVar3012 * mix( mix( fract( ( ( nodeVar3042.x + nodeVar3042.y ) * nodeVar3042.z ) ), fract( ( ( nodeVar3044.x + nodeVar3044.y ) * nodeVar3044.z ) ), nodeVar3041.x ), mix( fract( ( ( nodeVar3046.x + nodeVar3046.y ) * nodeVar3046.z ) ), fract( ( ( nodeVar3048.x + nodeVar3048.y ) * nodeVar3048.z ) ), nodeVar3041.x ), nodeVar3041.y ) ) );
						nodeVar3010 = ( nodeVar3010 * vec2( 2.03 ) );
						nodeVar3012 = ( nodeVar3012 * 0.52 );
						nodeVar3049 = nodeVar3011;
						nodeVar3050 = ( vec2( floor( ( ( nodeVar2739.x + nodeVar3005 ) / 0.9 ) ), nodeVar3003 ) * vec2( 1.61 ) );
						nodeVar3051 = fract( ( vec3( nodeVar3050.x, nodeVar3050.y, nodeVar3050.x ) * vec3( 0.1031 ) ) );
						nodeVar3051 = ( nodeVar3051 + vec3( dot( nodeVar3051, ( nodeVar3051.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3052 = fract( ( ( nodeVar3051.x + nodeVar3051.y ) * nodeVar3051.z ) );
						nodeVar3053 = ( nodeVar2739 * vec2( 26.0 ) );
						nodeVar3054 = 0.0;
						nodeVar3055 = 0.5;
						nodeVar3056 = floor( nodeVar3053 );
						nodeVar3057 = fract( nodeVar3053 );
						nodeVar3057 = ( ( nodeVar3057 * nodeVar3057 ) * ( vec2( 3.0 ) - ( nodeVar3057 * vec2( 2.0 ) ) ) );
						nodeVar3058 = fract( ( vec3( nodeVar3056.x, nodeVar3056.y, nodeVar3056.x ) * vec3( 0.1031 ) ) );
						nodeVar3058 = ( nodeVar3058 + vec3( dot( nodeVar3058, ( nodeVar3058.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3059 = ( nodeVar3056 + vec2( 1.0, 0.0 ) );
						nodeVar3060 = fract( ( vec3( nodeVar3059.x, nodeVar3059.y, nodeVar3059.x ) * vec3( 0.1031 ) ) );
						nodeVar3060 = ( nodeVar3060 + vec3( dot( nodeVar3060, ( nodeVar3060.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3061 = ( nodeVar3056 + vec2( 0.0, 1.0 ) );
						nodeVar3062 = fract( ( vec3( nodeVar3061.x, nodeVar3061.y, nodeVar3061.x ) * vec3( 0.1031 ) ) );
						nodeVar3062 = ( nodeVar3062 + vec3( dot( nodeVar3062, ( nodeVar3062.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3063 = ( nodeVar3056 + vec2( 1.0, 1.0 ) );
						nodeVar3064 = fract( ( vec3( nodeVar3063.x, nodeVar3063.y, nodeVar3063.x ) * vec3( 0.1031 ) ) );
						nodeVar3064 = ( nodeVar3064 + vec3( dot( nodeVar3064, ( nodeVar3064.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3054 = ( nodeVar3054 + ( nodeVar3055 * mix( mix( fract( ( ( nodeVar3058.x + nodeVar3058.y ) * nodeVar3058.z ) ), fract( ( ( nodeVar3060.x + nodeVar3060.y ) * nodeVar3060.z ) ), nodeVar3057.x ), mix( fract( ( ( nodeVar3062.x + nodeVar3062.y ) * nodeVar3062.z ) ), fract( ( ( nodeVar3064.x + nodeVar3064.y ) * nodeVar3064.z ) ), nodeVar3057.x ), nodeVar3057.y ) ) );
						nodeVar3053 = ( nodeVar3053 * vec2( 2.03 ) );
						nodeVar3055 = ( nodeVar3055 * 0.52 );
						nodeVar3065 = floor( nodeVar3053 );
						nodeVar3066 = fract( nodeVar3053 );
						nodeVar3066 = ( ( nodeVar3066 * nodeVar3066 ) * ( vec2( 3.0 ) - ( nodeVar3066 * vec2( 2.0 ) ) ) );
						nodeVar3067 = fract( ( vec3( nodeVar3065.x, nodeVar3065.y, nodeVar3065.x ) * vec3( 0.1031 ) ) );
						nodeVar3067 = ( nodeVar3067 + vec3( dot( nodeVar3067, ( nodeVar3067.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3068 = ( nodeVar3065 + vec2( 1.0, 0.0 ) );
						nodeVar3069 = fract( ( vec3( nodeVar3068.x, nodeVar3068.y, nodeVar3068.x ) * vec3( 0.1031 ) ) );
						nodeVar3069 = ( nodeVar3069 + vec3( dot( nodeVar3069, ( nodeVar3069.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3070 = ( nodeVar3065 + vec2( 0.0, 1.0 ) );
						nodeVar3071 = fract( ( vec3( nodeVar3070.x, nodeVar3070.y, nodeVar3070.x ) * vec3( 0.1031 ) ) );
						nodeVar3071 = ( nodeVar3071 + vec3( dot( nodeVar3071, ( nodeVar3071.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3072 = ( nodeVar3065 + vec2( 1.0, 1.0 ) );
						nodeVar3073 = fract( ( vec3( nodeVar3072.x, nodeVar3072.y, nodeVar3072.x ) * vec3( 0.1031 ) ) );
						nodeVar3073 = ( nodeVar3073 + vec3( dot( nodeVar3073, ( nodeVar3073.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3054 = ( nodeVar3054 + ( nodeVar3055 * mix( mix( fract( ( ( nodeVar3067.x + nodeVar3067.y ) * nodeVar3067.z ) ), fract( ( ( nodeVar3069.x + nodeVar3069.y ) * nodeVar3069.z ) ), nodeVar3066.x ), mix( fract( ( ( nodeVar3071.x + nodeVar3071.y ) * nodeVar3071.z ) ), fract( ( ( nodeVar3073.x + nodeVar3073.y ) * nodeVar3073.z ) ), nodeVar3066.x ), nodeVar3066.y ) ) );
						nodeVar3053 = ( nodeVar3053 * vec2( 2.03 ) );
						nodeVar3055 = ( nodeVar3055 * 0.52 );
						nodeVar3074 = floor( nodeVar3053 );
						nodeVar3075 = fract( nodeVar3053 );
						nodeVar3075 = ( ( nodeVar3075 * nodeVar3075 ) * ( vec2( 3.0 ) - ( nodeVar3075 * vec2( 2.0 ) ) ) );
						nodeVar3076 = fract( ( vec3( nodeVar3074.x, nodeVar3074.y, nodeVar3074.x ) * vec3( 0.1031 ) ) );
						nodeVar3076 = ( nodeVar3076 + vec3( dot( nodeVar3076, ( nodeVar3076.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3077 = ( nodeVar3074 + vec2( 1.0, 0.0 ) );
						nodeVar3078 = fract( ( vec3( nodeVar3077.x, nodeVar3077.y, nodeVar3077.x ) * vec3( 0.1031 ) ) );
						nodeVar3078 = ( nodeVar3078 + vec3( dot( nodeVar3078, ( nodeVar3078.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3079 = ( nodeVar3074 + vec2( 0.0, 1.0 ) );
						nodeVar3080 = fract( ( vec3( nodeVar3079.x, nodeVar3079.y, nodeVar3079.x ) * vec3( 0.1031 ) ) );
						nodeVar3080 = ( nodeVar3080 + vec3( dot( nodeVar3080, ( nodeVar3080.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3081 = ( nodeVar3074 + vec2( 1.0, 1.0 ) );
						nodeVar3082 = fract( ( vec3( nodeVar3081.x, nodeVar3081.y, nodeVar3081.x ) * vec3( 0.1031 ) ) );
						nodeVar3082 = ( nodeVar3082 + vec3( dot( nodeVar3082, ( nodeVar3082.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3054 = ( nodeVar3054 + ( nodeVar3055 * mix( mix( fract( ( ( nodeVar3076.x + nodeVar3076.y ) * nodeVar3076.z ) ), fract( ( ( nodeVar3078.x + nodeVar3078.y ) * nodeVar3078.z ) ), nodeVar3075.x ), mix( fract( ( ( nodeVar3080.x + nodeVar3080.y ) * nodeVar3080.z ) ), fract( ( ( nodeVar3082.x + nodeVar3082.y ) * nodeVar3082.z ) ), nodeVar3075.x ), nodeVar3075.y ) ) );
						nodeVar3053 = ( nodeVar3053 * vec2( 2.03 ) );
						nodeVar3055 = ( nodeVar3055 * 0.52 );
						nodeVar3083 = floor( nodeVar3053 );
						nodeVar3084 = fract( nodeVar3053 );
						nodeVar3084 = ( ( nodeVar3084 * nodeVar3084 ) * ( vec2( 3.0 ) - ( nodeVar3084 * vec2( 2.0 ) ) ) );
						nodeVar3085 = fract( ( vec3( nodeVar3083.x, nodeVar3083.y, nodeVar3083.x ) * vec3( 0.1031 ) ) );
						nodeVar3085 = ( nodeVar3085 + vec3( dot( nodeVar3085, ( nodeVar3085.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3086 = ( nodeVar3083 + vec2( 1.0, 0.0 ) );
						nodeVar3087 = fract( ( vec3( nodeVar3086.x, nodeVar3086.y, nodeVar3086.x ) * vec3( 0.1031 ) ) );
						nodeVar3087 = ( nodeVar3087 + vec3( dot( nodeVar3087, ( nodeVar3087.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3088 = ( nodeVar3083 + vec2( 0.0, 1.0 ) );
						nodeVar3089 = fract( ( vec3( nodeVar3088.x, nodeVar3088.y, nodeVar3088.x ) * vec3( 0.1031 ) ) );
						nodeVar3089 = ( nodeVar3089 + vec3( dot( nodeVar3089, ( nodeVar3089.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3090 = ( nodeVar3083 + vec2( 1.0, 1.0 ) );
						nodeVar3091 = fract( ( vec3( nodeVar3090.x, nodeVar3090.y, nodeVar3090.x ) * vec3( 0.1031 ) ) );
						nodeVar3091 = ( nodeVar3091 + vec3( dot( nodeVar3091, ( nodeVar3091.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3054 = ( nodeVar3054 + ( nodeVar3055 * mix( mix( fract( ( ( nodeVar3085.x + nodeVar3085.y ) * nodeVar3085.z ) ), fract( ( ( nodeVar3087.x + nodeVar3087.y ) * nodeVar3087.z ) ), nodeVar3084.x ), mix( fract( ( ( nodeVar3089.x + nodeVar3089.y ) * nodeVar3089.z ) ), fract( ( ( nodeVar3091.x + nodeVar3091.y ) * nodeVar3091.z ) ), nodeVar3084.x ), nodeVar3084.y ) ) );
						nodeVar3053 = ( nodeVar3053 * vec2( 2.03 ) );
						nodeVar3055 = ( nodeVar3055 * 0.52 );
						nodeVar3092 = smoothstep( 0.62, 0.92, nodeVar3054 );
						nodeVar2741 = vec3( ( ( ( nodeVar3009 * ( 0.62 + ( nodeVar3052 * 0.38 ) ) ) * 0.4 ) - ( nodeVar3092 * 0.22 ) ), ( nodeVar3009 * ( 1.0 - ( nodeVar3092 * 0.7 ) ) ), ( ( nodeVar3049 * 0.35 ) + ( nodeVar3052 * 0.65 ) ) );
						

					} else {


						if ( ( nodeVar2740 < 5.5 ) ) {

							nodeVar3093 = ( nodeVar2739 * vec2( 4.2 ) );
							nodeVar3094 = 0.0;
							nodeVar3095 = 0.5;
							nodeVar3096 = floor( nodeVar3093 );
							nodeVar3097 = fract( nodeVar3093 );
							nodeVar3097 = ( ( nodeVar3097 * nodeVar3097 ) * ( vec2( 3.0 ) - ( nodeVar3097 * vec2( 2.0 ) ) ) );
							nodeVar3098 = fract( ( vec3( nodeVar3096.x, nodeVar3096.y, nodeVar3096.x ) * vec3( 0.1031 ) ) );
							nodeVar3098 = ( nodeVar3098 + vec3( dot( nodeVar3098, ( nodeVar3098.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3099 = ( nodeVar3096 + vec2( 1.0, 0.0 ) );
							nodeVar3100 = fract( ( vec3( nodeVar3099.x, nodeVar3099.y, nodeVar3099.x ) * vec3( 0.1031 ) ) );
							nodeVar3100 = ( nodeVar3100 + vec3( dot( nodeVar3100, ( nodeVar3100.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3101 = ( nodeVar3096 + vec2( 0.0, 1.0 ) );
							nodeVar3102 = fract( ( vec3( nodeVar3101.x, nodeVar3101.y, nodeVar3101.x ) * vec3( 0.1031 ) ) );
							nodeVar3102 = ( nodeVar3102 + vec3( dot( nodeVar3102, ( nodeVar3102.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3103 = ( nodeVar3096 + vec2( 1.0, 1.0 ) );
							nodeVar3104 = fract( ( vec3( nodeVar3103.x, nodeVar3103.y, nodeVar3103.x ) * vec3( 0.1031 ) ) );
							nodeVar3104 = ( nodeVar3104 + vec3( dot( nodeVar3104, ( nodeVar3104.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3094 = ( nodeVar3094 + ( nodeVar3095 * mix( mix( fract( ( ( nodeVar3098.x + nodeVar3098.y ) * nodeVar3098.z ) ), fract( ( ( nodeVar3100.x + nodeVar3100.y ) * nodeVar3100.z ) ), nodeVar3097.x ), mix( fract( ( ( nodeVar3102.x + nodeVar3102.y ) * nodeVar3102.z ) ), fract( ( ( nodeVar3104.x + nodeVar3104.y ) * nodeVar3104.z ) ), nodeVar3097.x ), nodeVar3097.y ) ) );
							nodeVar3093 = ( nodeVar3093 * vec2( 2.03 ) );
							nodeVar3095 = ( nodeVar3095 * 0.52 );
							nodeVar3105 = floor( nodeVar3093 );
							nodeVar3106 = fract( nodeVar3093 );
							nodeVar3106 = ( ( nodeVar3106 * nodeVar3106 ) * ( vec2( 3.0 ) - ( nodeVar3106 * vec2( 2.0 ) ) ) );
							nodeVar3107 = fract( ( vec3( nodeVar3105.x, nodeVar3105.y, nodeVar3105.x ) * vec3( 0.1031 ) ) );
							nodeVar3107 = ( nodeVar3107 + vec3( dot( nodeVar3107, ( nodeVar3107.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3108 = ( nodeVar3105 + vec2( 1.0, 0.0 ) );
							nodeVar3109 = fract( ( vec3( nodeVar3108.x, nodeVar3108.y, nodeVar3108.x ) * vec3( 0.1031 ) ) );
							nodeVar3109 = ( nodeVar3109 + vec3( dot( nodeVar3109, ( nodeVar3109.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3110 = ( nodeVar3105 + vec2( 0.0, 1.0 ) );
							nodeVar3111 = fract( ( vec3( nodeVar3110.x, nodeVar3110.y, nodeVar3110.x ) * vec3( 0.1031 ) ) );
							nodeVar3111 = ( nodeVar3111 + vec3( dot( nodeVar3111, ( nodeVar3111.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3112 = ( nodeVar3105 + vec2( 1.0, 1.0 ) );
							nodeVar3113 = fract( ( vec3( nodeVar3112.x, nodeVar3112.y, nodeVar3112.x ) * vec3( 0.1031 ) ) );
							nodeVar3113 = ( nodeVar3113 + vec3( dot( nodeVar3113, ( nodeVar3113.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3094 = ( nodeVar3094 + ( nodeVar3095 * mix( mix( fract( ( ( nodeVar3107.x + nodeVar3107.y ) * nodeVar3107.z ) ), fract( ( ( nodeVar3109.x + nodeVar3109.y ) * nodeVar3109.z ) ), nodeVar3106.x ), mix( fract( ( ( nodeVar3111.x + nodeVar3111.y ) * nodeVar3111.z ) ), fract( ( ( nodeVar3113.x + nodeVar3113.y ) * nodeVar3113.z ) ), nodeVar3106.x ), nodeVar3106.y ) ) );
							nodeVar3093 = ( nodeVar3093 * vec2( 2.03 ) );
							nodeVar3095 = ( nodeVar3095 * 0.52 );
							nodeVar3114 = floor( nodeVar3093 );
							nodeVar3115 = fract( nodeVar3093 );
							nodeVar3115 = ( ( nodeVar3115 * nodeVar3115 ) * ( vec2( 3.0 ) - ( nodeVar3115 * vec2( 2.0 ) ) ) );
							nodeVar3116 = fract( ( vec3( nodeVar3114.x, nodeVar3114.y, nodeVar3114.x ) * vec3( 0.1031 ) ) );
							nodeVar3116 = ( nodeVar3116 + vec3( dot( nodeVar3116, ( nodeVar3116.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3117 = ( nodeVar3114 + vec2( 1.0, 0.0 ) );
							nodeVar3118 = fract( ( vec3( nodeVar3117.x, nodeVar3117.y, nodeVar3117.x ) * vec3( 0.1031 ) ) );
							nodeVar3118 = ( nodeVar3118 + vec3( dot( nodeVar3118, ( nodeVar3118.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3119 = ( nodeVar3114 + vec2( 0.0, 1.0 ) );
							nodeVar3120 = fract( ( vec3( nodeVar3119.x, nodeVar3119.y, nodeVar3119.x ) * vec3( 0.1031 ) ) );
							nodeVar3120 = ( nodeVar3120 + vec3( dot( nodeVar3120, ( nodeVar3120.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3121 = ( nodeVar3114 + vec2( 1.0, 1.0 ) );
							nodeVar3122 = fract( ( vec3( nodeVar3121.x, nodeVar3121.y, nodeVar3121.x ) * vec3( 0.1031 ) ) );
							nodeVar3122 = ( nodeVar3122 + vec3( dot( nodeVar3122, ( nodeVar3122.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3094 = ( nodeVar3094 + ( nodeVar3095 * mix( mix( fract( ( ( nodeVar3116.x + nodeVar3116.y ) * nodeVar3116.z ) ), fract( ( ( nodeVar3118.x + nodeVar3118.y ) * nodeVar3118.z ) ), nodeVar3115.x ), mix( fract( ( ( nodeVar3120.x + nodeVar3120.y ) * nodeVar3120.z ) ), fract( ( ( nodeVar3122.x + nodeVar3122.y ) * nodeVar3122.z ) ), nodeVar3115.x ), nodeVar3115.y ) ) );
							nodeVar3093 = ( nodeVar3093 * vec2( 2.03 ) );
							nodeVar3095 = ( nodeVar3095 * 0.52 );
							nodeVar3123 = floor( nodeVar3093 );
							nodeVar3124 = fract( nodeVar3093 );
							nodeVar3124 = ( ( nodeVar3124 * nodeVar3124 ) * ( vec2( 3.0 ) - ( nodeVar3124 * vec2( 2.0 ) ) ) );
							nodeVar3125 = fract( ( vec3( nodeVar3123.x, nodeVar3123.y, nodeVar3123.x ) * vec3( 0.1031 ) ) );
							nodeVar3125 = ( nodeVar3125 + vec3( dot( nodeVar3125, ( nodeVar3125.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3126 = ( nodeVar3123 + vec2( 1.0, 0.0 ) );
							nodeVar3127 = fract( ( vec3( nodeVar3126.x, nodeVar3126.y, nodeVar3126.x ) * vec3( 0.1031 ) ) );
							nodeVar3127 = ( nodeVar3127 + vec3( dot( nodeVar3127, ( nodeVar3127.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3128 = ( nodeVar3123 + vec2( 0.0, 1.0 ) );
							nodeVar3129 = fract( ( vec3( nodeVar3128.x, nodeVar3128.y, nodeVar3128.x ) * vec3( 0.1031 ) ) );
							nodeVar3129 = ( nodeVar3129 + vec3( dot( nodeVar3129, ( nodeVar3129.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3130 = ( nodeVar3123 + vec2( 1.0, 1.0 ) );
							nodeVar3131 = fract( ( vec3( nodeVar3130.x, nodeVar3130.y, nodeVar3130.x ) * vec3( 0.1031 ) ) );
							nodeVar3131 = ( nodeVar3131 + vec3( dot( nodeVar3131, ( nodeVar3131.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3094 = ( nodeVar3094 + ( nodeVar3095 * mix( mix( fract( ( ( nodeVar3125.x + nodeVar3125.y ) * nodeVar3125.z ) ), fract( ( ( nodeVar3127.x + nodeVar3127.y ) * nodeVar3127.z ) ), nodeVar3124.x ), mix( fract( ( ( nodeVar3129.x + nodeVar3129.y ) * nodeVar3129.z ) ), fract( ( ( nodeVar3131.x + nodeVar3131.y ) * nodeVar3131.z ) ), nodeVar3124.x ), nodeVar3124.y ) ) );
							nodeVar3093 = ( nodeVar3093 * vec2( 2.03 ) );
							nodeVar3095 = ( nodeVar3095 * 0.52 );
							nodeVar3132 = ( nodeVar2739 * vec2( 19.0 ) );
							nodeVar3133 = 0.0;
							nodeVar3134 = 0.5;
							nodeVar3135 = floor( nodeVar3132 );
							nodeVar3136 = fract( nodeVar3132 );
							nodeVar3136 = ( ( nodeVar3136 * nodeVar3136 ) * ( vec2( 3.0 ) - ( nodeVar3136 * vec2( 2.0 ) ) ) );
							nodeVar3137 = fract( ( vec3( nodeVar3135.x, nodeVar3135.y, nodeVar3135.x ) * vec3( 0.1031 ) ) );
							nodeVar3137 = ( nodeVar3137 + vec3( dot( nodeVar3137, ( nodeVar3137.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3138 = ( nodeVar3135 + vec2( 1.0, 0.0 ) );
							nodeVar3139 = fract( ( vec3( nodeVar3138.x, nodeVar3138.y, nodeVar3138.x ) * vec3( 0.1031 ) ) );
							nodeVar3139 = ( nodeVar3139 + vec3( dot( nodeVar3139, ( nodeVar3139.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3140 = ( nodeVar3135 + vec2( 0.0, 1.0 ) );
							nodeVar3141 = fract( ( vec3( nodeVar3140.x, nodeVar3140.y, nodeVar3140.x ) * vec3( 0.1031 ) ) );
							nodeVar3141 = ( nodeVar3141 + vec3( dot( nodeVar3141, ( nodeVar3141.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3142 = ( nodeVar3135 + vec2( 1.0, 1.0 ) );
							nodeVar3143 = fract( ( vec3( nodeVar3142.x, nodeVar3142.y, nodeVar3142.x ) * vec3( 0.1031 ) ) );
							nodeVar3143 = ( nodeVar3143 + vec3( dot( nodeVar3143, ( nodeVar3143.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3133 = ( nodeVar3133 + ( nodeVar3134 * mix( mix( fract( ( ( nodeVar3137.x + nodeVar3137.y ) * nodeVar3137.z ) ), fract( ( ( nodeVar3139.x + nodeVar3139.y ) * nodeVar3139.z ) ), nodeVar3136.x ), mix( fract( ( ( nodeVar3141.x + nodeVar3141.y ) * nodeVar3141.z ) ), fract( ( ( nodeVar3143.x + nodeVar3143.y ) * nodeVar3143.z ) ), nodeVar3136.x ), nodeVar3136.y ) ) );
							nodeVar3132 = ( nodeVar3132 * vec2( 2.03 ) );
							nodeVar3134 = ( nodeVar3134 * 0.52 );
							nodeVar3144 = floor( nodeVar3132 );
							nodeVar3145 = fract( nodeVar3132 );
							nodeVar3145 = ( ( nodeVar3145 * nodeVar3145 ) * ( vec2( 3.0 ) - ( nodeVar3145 * vec2( 2.0 ) ) ) );
							nodeVar3146 = fract( ( vec3( nodeVar3144.x, nodeVar3144.y, nodeVar3144.x ) * vec3( 0.1031 ) ) );
							nodeVar3146 = ( nodeVar3146 + vec3( dot( nodeVar3146, ( nodeVar3146.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3147 = ( nodeVar3144 + vec2( 1.0, 0.0 ) );
							nodeVar3148 = fract( ( vec3( nodeVar3147.x, nodeVar3147.y, nodeVar3147.x ) * vec3( 0.1031 ) ) );
							nodeVar3148 = ( nodeVar3148 + vec3( dot( nodeVar3148, ( nodeVar3148.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3149 = ( nodeVar3144 + vec2( 0.0, 1.0 ) );
							nodeVar3150 = fract( ( vec3( nodeVar3149.x, nodeVar3149.y, nodeVar3149.x ) * vec3( 0.1031 ) ) );
							nodeVar3150 = ( nodeVar3150 + vec3( dot( nodeVar3150, ( nodeVar3150.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3151 = ( nodeVar3144 + vec2( 1.0, 1.0 ) );
							nodeVar3152 = fract( ( vec3( nodeVar3151.x, nodeVar3151.y, nodeVar3151.x ) * vec3( 0.1031 ) ) );
							nodeVar3152 = ( nodeVar3152 + vec3( dot( nodeVar3152, ( nodeVar3152.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3133 = ( nodeVar3133 + ( nodeVar3134 * mix( mix( fract( ( ( nodeVar3146.x + nodeVar3146.y ) * nodeVar3146.z ) ), fract( ( ( nodeVar3148.x + nodeVar3148.y ) * nodeVar3148.z ) ), nodeVar3145.x ), mix( fract( ( ( nodeVar3150.x + nodeVar3150.y ) * nodeVar3150.z ) ), fract( ( ( nodeVar3152.x + nodeVar3152.y ) * nodeVar3152.z ) ), nodeVar3145.x ), nodeVar3145.y ) ) );
							nodeVar3132 = ( nodeVar3132 * vec2( 2.03 ) );
							nodeVar3134 = ( nodeVar3134 * 0.52 );
							nodeVar3153 = floor( nodeVar3132 );
							nodeVar3154 = fract( nodeVar3132 );
							nodeVar3154 = ( ( nodeVar3154 * nodeVar3154 ) * ( vec2( 3.0 ) - ( nodeVar3154 * vec2( 2.0 ) ) ) );
							nodeVar3155 = fract( ( vec3( nodeVar3153.x, nodeVar3153.y, nodeVar3153.x ) * vec3( 0.1031 ) ) );
							nodeVar3155 = ( nodeVar3155 + vec3( dot( nodeVar3155, ( nodeVar3155.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3156 = ( nodeVar3153 + vec2( 1.0, 0.0 ) );
							nodeVar3157 = fract( ( vec3( nodeVar3156.x, nodeVar3156.y, nodeVar3156.x ) * vec3( 0.1031 ) ) );
							nodeVar3157 = ( nodeVar3157 + vec3( dot( nodeVar3157, ( nodeVar3157.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3158 = ( nodeVar3153 + vec2( 0.0, 1.0 ) );
							nodeVar3159 = fract( ( vec3( nodeVar3158.x, nodeVar3158.y, nodeVar3158.x ) * vec3( 0.1031 ) ) );
							nodeVar3159 = ( nodeVar3159 + vec3( dot( nodeVar3159, ( nodeVar3159.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3160 = ( nodeVar3153 + vec2( 1.0, 1.0 ) );
							nodeVar3161 = fract( ( vec3( nodeVar3160.x, nodeVar3160.y, nodeVar3160.x ) * vec3( 0.1031 ) ) );
							nodeVar3161 = ( nodeVar3161 + vec3( dot( nodeVar3161, ( nodeVar3161.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3133 = ( nodeVar3133 + ( nodeVar3134 * mix( mix( fract( ( ( nodeVar3155.x + nodeVar3155.y ) * nodeVar3155.z ) ), fract( ( ( nodeVar3157.x + nodeVar3157.y ) * nodeVar3157.z ) ), nodeVar3154.x ), mix( fract( ( ( nodeVar3159.x + nodeVar3159.y ) * nodeVar3159.z ) ), fract( ( ( nodeVar3161.x + nodeVar3161.y ) * nodeVar3161.z ) ), nodeVar3154.x ), nodeVar3154.y ) ) );
							nodeVar3132 = ( nodeVar3132 * vec2( 2.03 ) );
							nodeVar3134 = ( nodeVar3134 * 0.52 );
							nodeVar3162 = floor( nodeVar3132 );
							nodeVar3163 = fract( nodeVar3132 );
							nodeVar3163 = ( ( nodeVar3163 * nodeVar3163 ) * ( vec2( 3.0 ) - ( nodeVar3163 * vec2( 2.0 ) ) ) );
							nodeVar3164 = fract( ( vec3( nodeVar3162.x, nodeVar3162.y, nodeVar3162.x ) * vec3( 0.1031 ) ) );
							nodeVar3164 = ( nodeVar3164 + vec3( dot( nodeVar3164, ( nodeVar3164.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3165 = ( nodeVar3162 + vec2( 1.0, 0.0 ) );
							nodeVar3166 = fract( ( vec3( nodeVar3165.x, nodeVar3165.y, nodeVar3165.x ) * vec3( 0.1031 ) ) );
							nodeVar3166 = ( nodeVar3166 + vec3( dot( nodeVar3166, ( nodeVar3166.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3167 = ( nodeVar3162 + vec2( 0.0, 1.0 ) );
							nodeVar3168 = fract( ( vec3( nodeVar3167.x, nodeVar3167.y, nodeVar3167.x ) * vec3( 0.1031 ) ) );
							nodeVar3168 = ( nodeVar3168 + vec3( dot( nodeVar3168, ( nodeVar3168.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3169 = ( nodeVar3162 + vec2( 1.0, 1.0 ) );
							nodeVar3170 = fract( ( vec3( nodeVar3169.x, nodeVar3169.y, nodeVar3169.x ) * vec3( 0.1031 ) ) );
							nodeVar3170 = ( nodeVar3170 + vec3( dot( nodeVar3170, ( nodeVar3170.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar3133 = ( nodeVar3133 + ( nodeVar3134 * mix( mix( fract( ( ( nodeVar3164.x + nodeVar3164.y ) * nodeVar3164.z ) ), fract( ( ( nodeVar3166.x + nodeVar3166.y ) * nodeVar3166.z ) ), nodeVar3163.x ), mix( fract( ( ( nodeVar3168.x + nodeVar3168.y ) * nodeVar3168.z ) ), fract( ( ( nodeVar3170.x + nodeVar3170.y ) * nodeVar3170.z ) ), nodeVar3163.x ), nodeVar3163.y ) ) );
							nodeVar3132 = ( nodeVar3132 * vec2( 2.03 ) );
							nodeVar3134 = ( nodeVar3134 * 0.52 );
							nodeVar3171 = ( ( nodeVar3094 * 0.6 ) + ( nodeVar3133 * 0.4 ) );
							nodeVar2741 = vec3( ( nodeVar3171 * 0.6 ), ( 0.7 + ( nodeVar3171 * 0.3 ) ), nodeVar3171 );
							

						} else {


							if ( ( nodeVar2740 < 6.5 ) ) {

								nodeVar3172 = vec2( ( nodeVar2739.x * 90.0 ), ( nodeVar2739.y * 4.0 ) );
								nodeVar3173 = 0.0;
								nodeVar3174 = 0.5;
								nodeVar3175 = floor( nodeVar3172 );
								nodeVar3176 = fract( nodeVar3172 );
								nodeVar3176 = ( ( nodeVar3176 * nodeVar3176 ) * ( vec2( 3.0 ) - ( nodeVar3176 * vec2( 2.0 ) ) ) );
								nodeVar3177 = fract( ( vec3( nodeVar3175.x, nodeVar3175.y, nodeVar3175.x ) * vec3( 0.1031 ) ) );
								nodeVar3177 = ( nodeVar3177 + vec3( dot( nodeVar3177, ( nodeVar3177.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3178 = ( nodeVar3175 + vec2( 1.0, 0.0 ) );
								nodeVar3179 = fract( ( vec3( nodeVar3178.x, nodeVar3178.y, nodeVar3178.x ) * vec3( 0.1031 ) ) );
								nodeVar3179 = ( nodeVar3179 + vec3( dot( nodeVar3179, ( nodeVar3179.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3180 = ( nodeVar3175 + vec2( 0.0, 1.0 ) );
								nodeVar3181 = fract( ( vec3( nodeVar3180.x, nodeVar3180.y, nodeVar3180.x ) * vec3( 0.1031 ) ) );
								nodeVar3181 = ( nodeVar3181 + vec3( dot( nodeVar3181, ( nodeVar3181.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3182 = ( nodeVar3175 + vec2( 1.0, 1.0 ) );
								nodeVar3183 = fract( ( vec3( nodeVar3182.x, nodeVar3182.y, nodeVar3182.x ) * vec3( 0.1031 ) ) );
								nodeVar3183 = ( nodeVar3183 + vec3( dot( nodeVar3183, ( nodeVar3183.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3173 = ( nodeVar3173 + ( nodeVar3174 * mix( mix( fract( ( ( nodeVar3177.x + nodeVar3177.y ) * nodeVar3177.z ) ), fract( ( ( nodeVar3179.x + nodeVar3179.y ) * nodeVar3179.z ) ), nodeVar3176.x ), mix( fract( ( ( nodeVar3181.x + nodeVar3181.y ) * nodeVar3181.z ) ), fract( ( ( nodeVar3183.x + nodeVar3183.y ) * nodeVar3183.z ) ), nodeVar3176.x ), nodeVar3176.y ) ) );
								nodeVar3172 = ( nodeVar3172 * vec2( 2.03 ) );
								nodeVar3174 = ( nodeVar3174 * 0.52 );
								nodeVar3184 = floor( nodeVar3172 );
								nodeVar3185 = fract( nodeVar3172 );
								nodeVar3185 = ( ( nodeVar3185 * nodeVar3185 ) * ( vec2( 3.0 ) - ( nodeVar3185 * vec2( 2.0 ) ) ) );
								nodeVar3186 = fract( ( vec3( nodeVar3184.x, nodeVar3184.y, nodeVar3184.x ) * vec3( 0.1031 ) ) );
								nodeVar3186 = ( nodeVar3186 + vec3( dot( nodeVar3186, ( nodeVar3186.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3187 = ( nodeVar3184 + vec2( 1.0, 0.0 ) );
								nodeVar3188 = fract( ( vec3( nodeVar3187.x, nodeVar3187.y, nodeVar3187.x ) * vec3( 0.1031 ) ) );
								nodeVar3188 = ( nodeVar3188 + vec3( dot( nodeVar3188, ( nodeVar3188.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3189 = ( nodeVar3184 + vec2( 0.0, 1.0 ) );
								nodeVar3190 = fract( ( vec3( nodeVar3189.x, nodeVar3189.y, nodeVar3189.x ) * vec3( 0.1031 ) ) );
								nodeVar3190 = ( nodeVar3190 + vec3( dot( nodeVar3190, ( nodeVar3190.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3191 = ( nodeVar3184 + vec2( 1.0, 1.0 ) );
								nodeVar3192 = fract( ( vec3( nodeVar3191.x, nodeVar3191.y, nodeVar3191.x ) * vec3( 0.1031 ) ) );
								nodeVar3192 = ( nodeVar3192 + vec3( dot( nodeVar3192, ( nodeVar3192.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3173 = ( nodeVar3173 + ( nodeVar3174 * mix( mix( fract( ( ( nodeVar3186.x + nodeVar3186.y ) * nodeVar3186.z ) ), fract( ( ( nodeVar3188.x + nodeVar3188.y ) * nodeVar3188.z ) ), nodeVar3185.x ), mix( fract( ( ( nodeVar3190.x + nodeVar3190.y ) * nodeVar3190.z ) ), fract( ( ( nodeVar3192.x + nodeVar3192.y ) * nodeVar3192.z ) ), nodeVar3185.x ), nodeVar3185.y ) ) );
								nodeVar3172 = ( nodeVar3172 * vec2( 2.03 ) );
								nodeVar3174 = ( nodeVar3174 * 0.52 );
								nodeVar3193 = floor( nodeVar3172 );
								nodeVar3194 = fract( nodeVar3172 );
								nodeVar3194 = ( ( nodeVar3194 * nodeVar3194 ) * ( vec2( 3.0 ) - ( nodeVar3194 * vec2( 2.0 ) ) ) );
								nodeVar3195 = fract( ( vec3( nodeVar3193.x, nodeVar3193.y, nodeVar3193.x ) * vec3( 0.1031 ) ) );
								nodeVar3195 = ( nodeVar3195 + vec3( dot( nodeVar3195, ( nodeVar3195.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3196 = ( nodeVar3193 + vec2( 1.0, 0.0 ) );
								nodeVar3197 = fract( ( vec3( nodeVar3196.x, nodeVar3196.y, nodeVar3196.x ) * vec3( 0.1031 ) ) );
								nodeVar3197 = ( nodeVar3197 + vec3( dot( nodeVar3197, ( nodeVar3197.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3198 = ( nodeVar3193 + vec2( 0.0, 1.0 ) );
								nodeVar3199 = fract( ( vec3( nodeVar3198.x, nodeVar3198.y, nodeVar3198.x ) * vec3( 0.1031 ) ) );
								nodeVar3199 = ( nodeVar3199 + vec3( dot( nodeVar3199, ( nodeVar3199.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3200 = ( nodeVar3193 + vec2( 1.0, 1.0 ) );
								nodeVar3201 = fract( ( vec3( nodeVar3200.x, nodeVar3200.y, nodeVar3200.x ) * vec3( 0.1031 ) ) );
								nodeVar3201 = ( nodeVar3201 + vec3( dot( nodeVar3201, ( nodeVar3201.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3173 = ( nodeVar3173 + ( nodeVar3174 * mix( mix( fract( ( ( nodeVar3195.x + nodeVar3195.y ) * nodeVar3195.z ) ), fract( ( ( nodeVar3197.x + nodeVar3197.y ) * nodeVar3197.z ) ), nodeVar3194.x ), mix( fract( ( ( nodeVar3199.x + nodeVar3199.y ) * nodeVar3199.z ) ), fract( ( ( nodeVar3201.x + nodeVar3201.y ) * nodeVar3201.z ) ), nodeVar3194.x ), nodeVar3194.y ) ) );
								nodeVar3172 = ( nodeVar3172 * vec2( 2.03 ) );
								nodeVar3174 = ( nodeVar3174 * 0.52 );
								nodeVar3202 = floor( nodeVar3172 );
								nodeVar3203 = fract( nodeVar3172 );
								nodeVar3203 = ( ( nodeVar3203 * nodeVar3203 ) * ( vec2( 3.0 ) - ( nodeVar3203 * vec2( 2.0 ) ) ) );
								nodeVar3204 = fract( ( vec3( nodeVar3202.x, nodeVar3202.y, nodeVar3202.x ) * vec3( 0.1031 ) ) );
								nodeVar3204 = ( nodeVar3204 + vec3( dot( nodeVar3204, ( nodeVar3204.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3205 = ( nodeVar3202 + vec2( 1.0, 0.0 ) );
								nodeVar3206 = fract( ( vec3( nodeVar3205.x, nodeVar3205.y, nodeVar3205.x ) * vec3( 0.1031 ) ) );
								nodeVar3206 = ( nodeVar3206 + vec3( dot( nodeVar3206, ( nodeVar3206.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3207 = ( nodeVar3202 + vec2( 0.0, 1.0 ) );
								nodeVar3208 = fract( ( vec3( nodeVar3207.x, nodeVar3207.y, nodeVar3207.x ) * vec3( 0.1031 ) ) );
								nodeVar3208 = ( nodeVar3208 + vec3( dot( nodeVar3208, ( nodeVar3208.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3209 = ( nodeVar3202 + vec2( 1.0, 1.0 ) );
								nodeVar3210 = fract( ( vec3( nodeVar3209.x, nodeVar3209.y, nodeVar3209.x ) * vec3( 0.1031 ) ) );
								nodeVar3210 = ( nodeVar3210 + vec3( dot( nodeVar3210, ( nodeVar3210.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar3173 = ( nodeVar3173 + ( nodeVar3174 * mix( mix( fract( ( ( nodeVar3204.x + nodeVar3204.y ) * nodeVar3204.z ) ), fract( ( ( nodeVar3206.x + nodeVar3206.y ) * nodeVar3206.z ) ), nodeVar3203.x ), mix( fract( ( ( nodeVar3208.x + nodeVar3208.y ) * nodeVar3208.z ) ), fract( ( ( nodeVar3210.x + nodeVar3210.y ) * nodeVar3210.z ) ), nodeVar3203.x ), nodeVar3203.y ) ) );
								nodeVar3172 = ( nodeVar3172 * vec2( 2.03 ) );
								nodeVar3174 = ( nodeVar3174 * 0.52 );
								nodeVar3211 = nodeVar3173;
								nodeVar2741 = vec3( ( nodeVar3211 * 0.25 ), 1.0, nodeVar3211 );
								

							} else {


								if ( ( nodeVar2740 < 7.5 ) ) {

									nodeVar3212 = ( nodeVar2739 * vec2( 0.28 ) );
									nodeVar3213 = 0.0;
									nodeVar3214 = 0.5;
									nodeVar3215 = floor( nodeVar3212 );
									nodeVar3216 = fract( nodeVar3212 );
									nodeVar3216 = ( ( nodeVar3216 * nodeVar3216 ) * ( vec2( 3.0 ) - ( nodeVar3216 * vec2( 2.0 ) ) ) );
									nodeVar3217 = fract( ( vec3( nodeVar3215.x, nodeVar3215.y, nodeVar3215.x ) * vec3( 0.1031 ) ) );
									nodeVar3217 = ( nodeVar3217 + vec3( dot( nodeVar3217, ( nodeVar3217.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3218 = ( nodeVar3215 + vec2( 1.0, 0.0 ) );
									nodeVar3219 = fract( ( vec3( nodeVar3218.x, nodeVar3218.y, nodeVar3218.x ) * vec3( 0.1031 ) ) );
									nodeVar3219 = ( nodeVar3219 + vec3( dot( nodeVar3219, ( nodeVar3219.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3220 = ( nodeVar3215 + vec2( 0.0, 1.0 ) );
									nodeVar3221 = fract( ( vec3( nodeVar3220.x, nodeVar3220.y, nodeVar3220.x ) * vec3( 0.1031 ) ) );
									nodeVar3221 = ( nodeVar3221 + vec3( dot( nodeVar3221, ( nodeVar3221.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3222 = ( nodeVar3215 + vec2( 1.0, 1.0 ) );
									nodeVar3223 = fract( ( vec3( nodeVar3222.x, nodeVar3222.y, nodeVar3222.x ) * vec3( 0.1031 ) ) );
									nodeVar3223 = ( nodeVar3223 + vec3( dot( nodeVar3223, ( nodeVar3223.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3213 = ( nodeVar3213 + ( nodeVar3214 * mix( mix( fract( ( ( nodeVar3217.x + nodeVar3217.y ) * nodeVar3217.z ) ), fract( ( ( nodeVar3219.x + nodeVar3219.y ) * nodeVar3219.z ) ), nodeVar3216.x ), mix( fract( ( ( nodeVar3221.x + nodeVar3221.y ) * nodeVar3221.z ) ), fract( ( ( nodeVar3223.x + nodeVar3223.y ) * nodeVar3223.z ) ), nodeVar3216.x ), nodeVar3216.y ) ) );
									nodeVar3212 = ( nodeVar3212 * vec2( 2.11 ) );
									nodeVar3214 = ( nodeVar3214 * 0.5 );
									nodeVar3224 = floor( nodeVar3212 );
									nodeVar3225 = fract( nodeVar3212 );
									nodeVar3225 = ( ( nodeVar3225 * nodeVar3225 ) * ( vec2( 3.0 ) - ( nodeVar3225 * vec2( 2.0 ) ) ) );
									nodeVar3226 = fract( ( vec3( nodeVar3224.x, nodeVar3224.y, nodeVar3224.x ) * vec3( 0.1031 ) ) );
									nodeVar3226 = ( nodeVar3226 + vec3( dot( nodeVar3226, ( nodeVar3226.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3227 = ( nodeVar3224 + vec2( 1.0, 0.0 ) );
									nodeVar3228 = fract( ( vec3( nodeVar3227.x, nodeVar3227.y, nodeVar3227.x ) * vec3( 0.1031 ) ) );
									nodeVar3228 = ( nodeVar3228 + vec3( dot( nodeVar3228, ( nodeVar3228.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3229 = ( nodeVar3224 + vec2( 0.0, 1.0 ) );
									nodeVar3230 = fract( ( vec3( nodeVar3229.x, nodeVar3229.y, nodeVar3229.x ) * vec3( 0.1031 ) ) );
									nodeVar3230 = ( nodeVar3230 + vec3( dot( nodeVar3230, ( nodeVar3230.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3231 = ( nodeVar3224 + vec2( 1.0, 1.0 ) );
									nodeVar3232 = fract( ( vec3( nodeVar3231.x, nodeVar3231.y, nodeVar3231.x ) * vec3( 0.1031 ) ) );
									nodeVar3232 = ( nodeVar3232 + vec3( dot( nodeVar3232, ( nodeVar3232.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3213 = ( nodeVar3213 + ( nodeVar3214 * mix( mix( fract( ( ( nodeVar3226.x + nodeVar3226.y ) * nodeVar3226.z ) ), fract( ( ( nodeVar3228.x + nodeVar3228.y ) * nodeVar3228.z ) ), nodeVar3225.x ), mix( fract( ( ( nodeVar3230.x + nodeVar3230.y ) * nodeVar3230.z ) ), fract( ( ( nodeVar3232.x + nodeVar3232.y ) * nodeVar3232.z ) ), nodeVar3225.x ), nodeVar3225.y ) ) );
									nodeVar3212 = ( nodeVar3212 * vec2( 2.11 ) );
									nodeVar3214 = ( nodeVar3214 * 0.5 );
									nodeVar3233 = floor( nodeVar3212 );
									nodeVar3234 = fract( nodeVar3212 );
									nodeVar3234 = ( ( nodeVar3234 * nodeVar3234 ) * ( vec2( 3.0 ) - ( nodeVar3234 * vec2( 2.0 ) ) ) );
									nodeVar3235 = fract( ( vec3( nodeVar3233.x, nodeVar3233.y, nodeVar3233.x ) * vec3( 0.1031 ) ) );
									nodeVar3235 = ( nodeVar3235 + vec3( dot( nodeVar3235, ( nodeVar3235.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3236 = ( nodeVar3233 + vec2( 1.0, 0.0 ) );
									nodeVar3237 = fract( ( vec3( nodeVar3236.x, nodeVar3236.y, nodeVar3236.x ) * vec3( 0.1031 ) ) );
									nodeVar3237 = ( nodeVar3237 + vec3( dot( nodeVar3237, ( nodeVar3237.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3238 = ( nodeVar3233 + vec2( 0.0, 1.0 ) );
									nodeVar3239 = fract( ( vec3( nodeVar3238.x, nodeVar3238.y, nodeVar3238.x ) * vec3( 0.1031 ) ) );
									nodeVar3239 = ( nodeVar3239 + vec3( dot( nodeVar3239, ( nodeVar3239.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3240 = ( nodeVar3233 + vec2( 1.0, 1.0 ) );
									nodeVar3241 = fract( ( vec3( nodeVar3240.x, nodeVar3240.y, nodeVar3240.x ) * vec3( 0.1031 ) ) );
									nodeVar3241 = ( nodeVar3241 + vec3( dot( nodeVar3241, ( nodeVar3241.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3213 = ( nodeVar3213 + ( nodeVar3214 * mix( mix( fract( ( ( nodeVar3235.x + nodeVar3235.y ) * nodeVar3235.z ) ), fract( ( ( nodeVar3237.x + nodeVar3237.y ) * nodeVar3237.z ) ), nodeVar3234.x ), mix( fract( ( ( nodeVar3239.x + nodeVar3239.y ) * nodeVar3239.z ) ), fract( ( ( nodeVar3241.x + nodeVar3241.y ) * nodeVar3241.z ) ), nodeVar3234.x ), nodeVar3234.y ) ) );
									nodeVar3212 = ( nodeVar3212 * vec2( 2.11 ) );
									nodeVar3214 = ( nodeVar3214 * 0.5 );
									nodeVar3242 = ( ( nodeVar2739 * vec2( 0.28 ) ) + vec2( 19.0 ) );
									nodeVar3243 = 0.0;
									nodeVar3244 = 0.5;
									nodeVar3245 = floor( nodeVar3242 );
									nodeVar3246 = fract( nodeVar3242 );
									nodeVar3246 = ( ( nodeVar3246 * nodeVar3246 ) * ( vec2( 3.0 ) - ( nodeVar3246 * vec2( 2.0 ) ) ) );
									nodeVar3247 = fract( ( vec3( nodeVar3245.x, nodeVar3245.y, nodeVar3245.x ) * vec3( 0.1031 ) ) );
									nodeVar3247 = ( nodeVar3247 + vec3( dot( nodeVar3247, ( nodeVar3247.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3248 = ( nodeVar3245 + vec2( 1.0, 0.0 ) );
									nodeVar3249 = fract( ( vec3( nodeVar3248.x, nodeVar3248.y, nodeVar3248.x ) * vec3( 0.1031 ) ) );
									nodeVar3249 = ( nodeVar3249 + vec3( dot( nodeVar3249, ( nodeVar3249.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3250 = ( nodeVar3245 + vec2( 0.0, 1.0 ) );
									nodeVar3251 = fract( ( vec3( nodeVar3250.x, nodeVar3250.y, nodeVar3250.x ) * vec3( 0.1031 ) ) );
									nodeVar3251 = ( nodeVar3251 + vec3( dot( nodeVar3251, ( nodeVar3251.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3252 = ( nodeVar3245 + vec2( 1.0, 1.0 ) );
									nodeVar3253 = fract( ( vec3( nodeVar3252.x, nodeVar3252.y, nodeVar3252.x ) * vec3( 0.1031 ) ) );
									nodeVar3253 = ( nodeVar3253 + vec3( dot( nodeVar3253, ( nodeVar3253.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3243 = ( nodeVar3243 + ( nodeVar3244 * mix( mix( fract( ( ( nodeVar3247.x + nodeVar3247.y ) * nodeVar3247.z ) ), fract( ( ( nodeVar3249.x + nodeVar3249.y ) * nodeVar3249.z ) ), nodeVar3246.x ), mix( fract( ( ( nodeVar3251.x + nodeVar3251.y ) * nodeVar3251.z ) ), fract( ( ( nodeVar3253.x + nodeVar3253.y ) * nodeVar3253.z ) ), nodeVar3246.x ), nodeVar3246.y ) ) );
									nodeVar3242 = ( nodeVar3242 * vec2( 2.11 ) );
									nodeVar3244 = ( nodeVar3244 * 0.5 );
									nodeVar3254 = floor( nodeVar3242 );
									nodeVar3255 = fract( nodeVar3242 );
									nodeVar3255 = ( ( nodeVar3255 * nodeVar3255 ) * ( vec2( 3.0 ) - ( nodeVar3255 * vec2( 2.0 ) ) ) );
									nodeVar3256 = fract( ( vec3( nodeVar3254.x, nodeVar3254.y, nodeVar3254.x ) * vec3( 0.1031 ) ) );
									nodeVar3256 = ( nodeVar3256 + vec3( dot( nodeVar3256, ( nodeVar3256.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3257 = ( nodeVar3254 + vec2( 1.0, 0.0 ) );
									nodeVar3258 = fract( ( vec3( nodeVar3257.x, nodeVar3257.y, nodeVar3257.x ) * vec3( 0.1031 ) ) );
									nodeVar3258 = ( nodeVar3258 + vec3( dot( nodeVar3258, ( nodeVar3258.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3259 = ( nodeVar3254 + vec2( 0.0, 1.0 ) );
									nodeVar3260 = fract( ( vec3( nodeVar3259.x, nodeVar3259.y, nodeVar3259.x ) * vec3( 0.1031 ) ) );
									nodeVar3260 = ( nodeVar3260 + vec3( dot( nodeVar3260, ( nodeVar3260.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3261 = ( nodeVar3254 + vec2( 1.0, 1.0 ) );
									nodeVar3262 = fract( ( vec3( nodeVar3261.x, nodeVar3261.y, nodeVar3261.x ) * vec3( 0.1031 ) ) );
									nodeVar3262 = ( nodeVar3262 + vec3( dot( nodeVar3262, ( nodeVar3262.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3243 = ( nodeVar3243 + ( nodeVar3244 * mix( mix( fract( ( ( nodeVar3256.x + nodeVar3256.y ) * nodeVar3256.z ) ), fract( ( ( nodeVar3258.x + nodeVar3258.y ) * nodeVar3258.z ) ), nodeVar3255.x ), mix( fract( ( ( nodeVar3260.x + nodeVar3260.y ) * nodeVar3260.z ) ), fract( ( ( nodeVar3262.x + nodeVar3262.y ) * nodeVar3262.z ) ), nodeVar3255.x ), nodeVar3255.y ) ) );
									nodeVar3242 = ( nodeVar3242 * vec2( 2.11 ) );
									nodeVar3244 = ( nodeVar3244 * 0.5 );
									nodeVar3263 = floor( nodeVar3242 );
									nodeVar3264 = fract( nodeVar3242 );
									nodeVar3264 = ( ( nodeVar3264 * nodeVar3264 ) * ( vec2( 3.0 ) - ( nodeVar3264 * vec2( 2.0 ) ) ) );
									nodeVar3265 = fract( ( vec3( nodeVar3263.x, nodeVar3263.y, nodeVar3263.x ) * vec3( 0.1031 ) ) );
									nodeVar3265 = ( nodeVar3265 + vec3( dot( nodeVar3265, ( nodeVar3265.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3266 = ( nodeVar3263 + vec2( 1.0, 0.0 ) );
									nodeVar3267 = fract( ( vec3( nodeVar3266.x, nodeVar3266.y, nodeVar3266.x ) * vec3( 0.1031 ) ) );
									nodeVar3267 = ( nodeVar3267 + vec3( dot( nodeVar3267, ( nodeVar3267.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3268 = ( nodeVar3263 + vec2( 0.0, 1.0 ) );
									nodeVar3269 = fract( ( vec3( nodeVar3268.x, nodeVar3268.y, nodeVar3268.x ) * vec3( 0.1031 ) ) );
									nodeVar3269 = ( nodeVar3269 + vec3( dot( nodeVar3269, ( nodeVar3269.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3270 = ( nodeVar3263 + vec2( 1.0, 1.0 ) );
									nodeVar3271 = fract( ( vec3( nodeVar3270.x, nodeVar3270.y, nodeVar3270.x ) * vec3( 0.1031 ) ) );
									nodeVar3271 = ( nodeVar3271 + vec3( dot( nodeVar3271, ( nodeVar3271.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3243 = ( nodeVar3243 + ( nodeVar3244 * mix( mix( fract( ( ( nodeVar3265.x + nodeVar3265.y ) * nodeVar3265.z ) ), fract( ( ( nodeVar3267.x + nodeVar3267.y ) * nodeVar3267.z ) ), nodeVar3264.x ), mix( fract( ( ( nodeVar3269.x + nodeVar3269.y ) * nodeVar3269.z ) ), fract( ( ( nodeVar3271.x + nodeVar3271.y ) * nodeVar3271.z ) ), nodeVar3264.x ), nodeVar3264.y ) ) );
									nodeVar3242 = ( nodeVar3242 * vec2( 2.11 ) );
									nodeVar3244 = ( nodeVar3244 * 0.5 );
									nodeVar3272 = ( vec2( nodeVar3213, nodeVar3243 ) - vec2( 0.5 ) );
									nodeVar3273 = ( ( nodeVar2739 * vec2( 4.05 ) ) + ( nodeVar3272 * vec2( 0.85 ) ) );
									nodeVar3274 = floor( nodeVar3273 );
									nodeVar3275 = fract( nodeVar3273 );
									nodeVar3276 = 9.0;
									nodeVar3277 = 9.0;
									nodeVar3278 = vec2( 0.0, 0.0 );
									nodeVar3279 = ( nodeVar3274 + vec2( -1.0, -1.0 ) );
									nodeVar3280 = fract( ( vec3( nodeVar3279.x, nodeVar3279.y, nodeVar3279.x ) * vec3( 0.1031 ) ) );
									nodeVar3280 = ( nodeVar3280 + vec3( dot( nodeVar3280, ( nodeVar3280.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3281 = ( ( nodeVar3274 + vec2( -1.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar3282 = fract( ( vec3( nodeVar3281.x, nodeVar3281.y, nodeVar3281.x ) * vec3( 0.1031 ) ) );
									nodeVar3282 = ( nodeVar3282 + vec3( dot( nodeVar3282, ( nodeVar3282.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3283 = length( ( ( vec2( -1.0, -1.0 ) + vec2( fract( ( ( nodeVar3280.x + nodeVar3280.y ) * nodeVar3280.z ) ), fract( ( ( nodeVar3282.x + nodeVar3282.y ) * nodeVar3282.z ) ) ) ) - nodeVar3275 ) );

									if ( ( nodeVar3283 < nodeVar3276 ) ) {

										nodeVar3277 = nodeVar3276;
										nodeVar3276 = nodeVar3283;
										nodeVar3278 = ( nodeVar3274 + vec2( -1.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar3283 < nodeVar3277 ) ) {

											nodeVar3277 = nodeVar3283;
											

										}

										

									}

									nodeVar3284 = ( nodeVar3274 + vec2( 0.0, -1.0 ) );
									nodeVar3285 = fract( ( vec3( nodeVar3284.x, nodeVar3284.y, nodeVar3284.x ) * vec3( 0.1031 ) ) );
									nodeVar3285 = ( nodeVar3285 + vec3( dot( nodeVar3285, ( nodeVar3285.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3286 = ( ( nodeVar3274 + vec2( 0.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar3287 = fract( ( vec3( nodeVar3286.x, nodeVar3286.y, nodeVar3286.x ) * vec3( 0.1031 ) ) );
									nodeVar3287 = ( nodeVar3287 + vec3( dot( nodeVar3287, ( nodeVar3287.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3288 = length( ( ( vec2( 0.0, -1.0 ) + vec2( fract( ( ( nodeVar3285.x + nodeVar3285.y ) * nodeVar3285.z ) ), fract( ( ( nodeVar3287.x + nodeVar3287.y ) * nodeVar3287.z ) ) ) ) - nodeVar3275 ) );

									if ( ( nodeVar3288 < nodeVar3276 ) ) {

										nodeVar3277 = nodeVar3276;
										nodeVar3276 = nodeVar3288;
										nodeVar3278 = ( nodeVar3274 + vec2( 0.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar3288 < nodeVar3277 ) ) {

											nodeVar3277 = nodeVar3288;
											

										}

										

									}

									nodeVar3289 = ( nodeVar3274 + vec2( 1.0, -1.0 ) );
									nodeVar3290 = fract( ( vec3( nodeVar3289.x, nodeVar3289.y, nodeVar3289.x ) * vec3( 0.1031 ) ) );
									nodeVar3290 = ( nodeVar3290 + vec3( dot( nodeVar3290, ( nodeVar3290.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3291 = ( ( nodeVar3274 + vec2( 1.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar3292 = fract( ( vec3( nodeVar3291.x, nodeVar3291.y, nodeVar3291.x ) * vec3( 0.1031 ) ) );
									nodeVar3292 = ( nodeVar3292 + vec3( dot( nodeVar3292, ( nodeVar3292.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3293 = length( ( ( vec2( 1.0, -1.0 ) + vec2( fract( ( ( nodeVar3290.x + nodeVar3290.y ) * nodeVar3290.z ) ), fract( ( ( nodeVar3292.x + nodeVar3292.y ) * nodeVar3292.z ) ) ) ) - nodeVar3275 ) );

									if ( ( nodeVar3293 < nodeVar3276 ) ) {

										nodeVar3277 = nodeVar3276;
										nodeVar3276 = nodeVar3293;
										nodeVar3278 = ( nodeVar3274 + vec2( 1.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar3293 < nodeVar3277 ) ) {

											nodeVar3277 = nodeVar3293;
											

										}

										

									}

									nodeVar3294 = ( nodeVar3274 + vec2( -1.0, 0.0 ) );
									nodeVar3295 = fract( ( vec3( nodeVar3294.x, nodeVar3294.y, nodeVar3294.x ) * vec3( 0.1031 ) ) );
									nodeVar3295 = ( nodeVar3295 + vec3( dot( nodeVar3295, ( nodeVar3295.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3296 = ( ( nodeVar3274 + vec2( -1.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar3297 = fract( ( vec3( nodeVar3296.x, nodeVar3296.y, nodeVar3296.x ) * vec3( 0.1031 ) ) );
									nodeVar3297 = ( nodeVar3297 + vec3( dot( nodeVar3297, ( nodeVar3297.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3298 = length( ( ( vec2( -1.0, 0.0 ) + vec2( fract( ( ( nodeVar3295.x + nodeVar3295.y ) * nodeVar3295.z ) ), fract( ( ( nodeVar3297.x + nodeVar3297.y ) * nodeVar3297.z ) ) ) ) - nodeVar3275 ) );

									if ( ( nodeVar3298 < nodeVar3276 ) ) {

										nodeVar3277 = nodeVar3276;
										nodeVar3276 = nodeVar3298;
										nodeVar3278 = ( nodeVar3274 + vec2( -1.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar3298 < nodeVar3277 ) ) {

											nodeVar3277 = nodeVar3298;
											

										}

										

									}

									nodeVar3299 = ( nodeVar3274 + vec2( 0.0, 0.0 ) );
									nodeVar3300 = fract( ( vec3( nodeVar3299.x, nodeVar3299.y, nodeVar3299.x ) * vec3( 0.1031 ) ) );
									nodeVar3300 = ( nodeVar3300 + vec3( dot( nodeVar3300, ( nodeVar3300.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3301 = ( ( nodeVar3274 + vec2( 0.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar3302 = fract( ( vec3( nodeVar3301.x, nodeVar3301.y, nodeVar3301.x ) * vec3( 0.1031 ) ) );
									nodeVar3302 = ( nodeVar3302 + vec3( dot( nodeVar3302, ( nodeVar3302.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3303 = length( ( ( vec2( 0.0, 0.0 ) + vec2( fract( ( ( nodeVar3300.x + nodeVar3300.y ) * nodeVar3300.z ) ), fract( ( ( nodeVar3302.x + nodeVar3302.y ) * nodeVar3302.z ) ) ) ) - nodeVar3275 ) );

									if ( ( nodeVar3303 < nodeVar3276 ) ) {

										nodeVar3277 = nodeVar3276;
										nodeVar3276 = nodeVar3303;
										nodeVar3278 = ( nodeVar3274 + vec2( 0.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar3303 < nodeVar3277 ) ) {

											nodeVar3277 = nodeVar3303;
											

										}

										

									}

									nodeVar3304 = ( nodeVar3274 + vec2( 1.0, 0.0 ) );
									nodeVar3305 = fract( ( vec3( nodeVar3304.x, nodeVar3304.y, nodeVar3304.x ) * vec3( 0.1031 ) ) );
									nodeVar3305 = ( nodeVar3305 + vec3( dot( nodeVar3305, ( nodeVar3305.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3306 = ( ( nodeVar3274 + vec2( 1.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar3307 = fract( ( vec3( nodeVar3306.x, nodeVar3306.y, nodeVar3306.x ) * vec3( 0.1031 ) ) );
									nodeVar3307 = ( nodeVar3307 + vec3( dot( nodeVar3307, ( nodeVar3307.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3308 = length( ( ( vec2( 1.0, 0.0 ) + vec2( fract( ( ( nodeVar3305.x + nodeVar3305.y ) * nodeVar3305.z ) ), fract( ( ( nodeVar3307.x + nodeVar3307.y ) * nodeVar3307.z ) ) ) ) - nodeVar3275 ) );

									if ( ( nodeVar3308 < nodeVar3276 ) ) {

										nodeVar3277 = nodeVar3276;
										nodeVar3276 = nodeVar3308;
										nodeVar3278 = ( nodeVar3274 + vec2( 1.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar3308 < nodeVar3277 ) ) {

											nodeVar3277 = nodeVar3308;
											

										}

										

									}

									nodeVar3309 = ( nodeVar3274 + vec2( -1.0, 1.0 ) );
									nodeVar3310 = fract( ( vec3( nodeVar3309.x, nodeVar3309.y, nodeVar3309.x ) * vec3( 0.1031 ) ) );
									nodeVar3310 = ( nodeVar3310 + vec3( dot( nodeVar3310, ( nodeVar3310.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3311 = ( ( nodeVar3274 + vec2( -1.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar3312 = fract( ( vec3( nodeVar3311.x, nodeVar3311.y, nodeVar3311.x ) * vec3( 0.1031 ) ) );
									nodeVar3312 = ( nodeVar3312 + vec3( dot( nodeVar3312, ( nodeVar3312.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3313 = length( ( ( vec2( -1.0, 1.0 ) + vec2( fract( ( ( nodeVar3310.x + nodeVar3310.y ) * nodeVar3310.z ) ), fract( ( ( nodeVar3312.x + nodeVar3312.y ) * nodeVar3312.z ) ) ) ) - nodeVar3275 ) );

									if ( ( nodeVar3313 < nodeVar3276 ) ) {

										nodeVar3277 = nodeVar3276;
										nodeVar3276 = nodeVar3313;
										nodeVar3278 = ( nodeVar3274 + vec2( -1.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar3313 < nodeVar3277 ) ) {

											nodeVar3277 = nodeVar3313;
											

										}

										

									}

									nodeVar3314 = ( nodeVar3274 + vec2( 0.0, 1.0 ) );
									nodeVar3315 = fract( ( vec3( nodeVar3314.x, nodeVar3314.y, nodeVar3314.x ) * vec3( 0.1031 ) ) );
									nodeVar3315 = ( nodeVar3315 + vec3( dot( nodeVar3315, ( nodeVar3315.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3316 = ( ( nodeVar3274 + vec2( 0.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar3317 = fract( ( vec3( nodeVar3316.x, nodeVar3316.y, nodeVar3316.x ) * vec3( 0.1031 ) ) );
									nodeVar3317 = ( nodeVar3317 + vec3( dot( nodeVar3317, ( nodeVar3317.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3318 = length( ( ( vec2( 0.0, 1.0 ) + vec2( fract( ( ( nodeVar3315.x + nodeVar3315.y ) * nodeVar3315.z ) ), fract( ( ( nodeVar3317.x + nodeVar3317.y ) * nodeVar3317.z ) ) ) ) - nodeVar3275 ) );

									if ( ( nodeVar3318 < nodeVar3276 ) ) {

										nodeVar3277 = nodeVar3276;
										nodeVar3276 = nodeVar3318;
										nodeVar3278 = ( nodeVar3274 + vec2( 0.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar3318 < nodeVar3277 ) ) {

											nodeVar3277 = nodeVar3318;
											

										}

										

									}

									nodeVar3319 = ( nodeVar3274 + vec2( 1.0, 1.0 ) );
									nodeVar3320 = fract( ( vec3( nodeVar3319.x, nodeVar3319.y, nodeVar3319.x ) * vec3( 0.1031 ) ) );
									nodeVar3320 = ( nodeVar3320 + vec3( dot( nodeVar3320, ( nodeVar3320.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3321 = ( ( nodeVar3274 + vec2( 1.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar3322 = fract( ( vec3( nodeVar3321.x, nodeVar3321.y, nodeVar3321.x ) * vec3( 0.1031 ) ) );
									nodeVar3322 = ( nodeVar3322 + vec3( dot( nodeVar3322, ( nodeVar3322.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3323 = length( ( ( vec2( 1.0, 1.0 ) + vec2( fract( ( ( nodeVar3320.x + nodeVar3320.y ) * nodeVar3320.z ) ), fract( ( ( nodeVar3322.x + nodeVar3322.y ) * nodeVar3322.z ) ) ) ) - nodeVar3275 ) );

									if ( ( nodeVar3323 < nodeVar3276 ) ) {

										nodeVar3277 = nodeVar3276;
										nodeVar3276 = nodeVar3323;
										nodeVar3278 = ( nodeVar3274 + vec2( 1.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar3323 < nodeVar3277 ) ) {

											nodeVar3277 = nodeVar3323;
											

										}

										

									}

									nodeVar3324 = smoothstep( 0.0, 0.038, ( nodeVar3277 - nodeVar3276 ) );
									nodeVar3325 = ( nodeVar3278 * vec2( 1.13 ) );
									nodeVar3326 = fract( ( vec3( nodeVar3325.x, nodeVar3325.y, nodeVar3325.x ) * vec3( 0.1031 ) ) );
									nodeVar3326 = ( nodeVar3326 + vec3( dot( nodeVar3326, ( nodeVar3326.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3327 = fract( ( ( nodeVar3326.x + nodeVar3326.y ) * nodeVar3326.z ) );
									nodeVar3328 = ( nodeVar2739 * vec2( 9.0 ) );
									nodeVar3329 = 0.0;
									nodeVar3330 = 0.5;
									nodeVar3331 = floor( nodeVar3328 );
									nodeVar3332 = fract( nodeVar3328 );
									nodeVar3332 = ( ( nodeVar3332 * nodeVar3332 ) * ( vec2( 3.0 ) - ( nodeVar3332 * vec2( 2.0 ) ) ) );
									nodeVar3333 = fract( ( vec3( nodeVar3331.x, nodeVar3331.y, nodeVar3331.x ) * vec3( 0.1031 ) ) );
									nodeVar3333 = ( nodeVar3333 + vec3( dot( nodeVar3333, ( nodeVar3333.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3334 = ( nodeVar3331 + vec2( 1.0, 0.0 ) );
									nodeVar3335 = fract( ( vec3( nodeVar3334.x, nodeVar3334.y, nodeVar3334.x ) * vec3( 0.1031 ) ) );
									nodeVar3335 = ( nodeVar3335 + vec3( dot( nodeVar3335, ( nodeVar3335.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3336 = ( nodeVar3331 + vec2( 0.0, 1.0 ) );
									nodeVar3337 = fract( ( vec3( nodeVar3336.x, nodeVar3336.y, nodeVar3336.x ) * vec3( 0.1031 ) ) );
									nodeVar3337 = ( nodeVar3337 + vec3( dot( nodeVar3337, ( nodeVar3337.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3338 = ( nodeVar3331 + vec2( 1.0, 1.0 ) );
									nodeVar3339 = fract( ( vec3( nodeVar3338.x, nodeVar3338.y, nodeVar3338.x ) * vec3( 0.1031 ) ) );
									nodeVar3339 = ( nodeVar3339 + vec3( dot( nodeVar3339, ( nodeVar3339.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3329 = ( nodeVar3329 + ( nodeVar3330 * mix( mix( fract( ( ( nodeVar3333.x + nodeVar3333.y ) * nodeVar3333.z ) ), fract( ( ( nodeVar3335.x + nodeVar3335.y ) * nodeVar3335.z ) ), nodeVar3332.x ), mix( fract( ( ( nodeVar3337.x + nodeVar3337.y ) * nodeVar3337.z ) ), fract( ( ( nodeVar3339.x + nodeVar3339.y ) * nodeVar3339.z ) ), nodeVar3332.x ), nodeVar3332.y ) ) );
									nodeVar3328 = ( nodeVar3328 * vec2( 2.03 ) );
									nodeVar3330 = ( nodeVar3330 * 0.52 );
									nodeVar3340 = floor( nodeVar3328 );
									nodeVar3341 = fract( nodeVar3328 );
									nodeVar3341 = ( ( nodeVar3341 * nodeVar3341 ) * ( vec2( 3.0 ) - ( nodeVar3341 * vec2( 2.0 ) ) ) );
									nodeVar3342 = fract( ( vec3( nodeVar3340.x, nodeVar3340.y, nodeVar3340.x ) * vec3( 0.1031 ) ) );
									nodeVar3342 = ( nodeVar3342 + vec3( dot( nodeVar3342, ( nodeVar3342.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3343 = ( nodeVar3340 + vec2( 1.0, 0.0 ) );
									nodeVar3344 = fract( ( vec3( nodeVar3343.x, nodeVar3343.y, nodeVar3343.x ) * vec3( 0.1031 ) ) );
									nodeVar3344 = ( nodeVar3344 + vec3( dot( nodeVar3344, ( nodeVar3344.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3345 = ( nodeVar3340 + vec2( 0.0, 1.0 ) );
									nodeVar3346 = fract( ( vec3( nodeVar3345.x, nodeVar3345.y, nodeVar3345.x ) * vec3( 0.1031 ) ) );
									nodeVar3346 = ( nodeVar3346 + vec3( dot( nodeVar3346, ( nodeVar3346.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3347 = ( nodeVar3340 + vec2( 1.0, 1.0 ) );
									nodeVar3348 = fract( ( vec3( nodeVar3347.x, nodeVar3347.y, nodeVar3347.x ) * vec3( 0.1031 ) ) );
									nodeVar3348 = ( nodeVar3348 + vec3( dot( nodeVar3348, ( nodeVar3348.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3329 = ( nodeVar3329 + ( nodeVar3330 * mix( mix( fract( ( ( nodeVar3342.x + nodeVar3342.y ) * nodeVar3342.z ) ), fract( ( ( nodeVar3344.x + nodeVar3344.y ) * nodeVar3344.z ) ), nodeVar3341.x ), mix( fract( ( ( nodeVar3346.x + nodeVar3346.y ) * nodeVar3346.z ) ), fract( ( ( nodeVar3348.x + nodeVar3348.y ) * nodeVar3348.z ) ), nodeVar3341.x ), nodeVar3341.y ) ) );
									nodeVar3328 = ( nodeVar3328 * vec2( 2.03 ) );
									nodeVar3330 = ( nodeVar3330 * 0.52 );
									nodeVar3349 = floor( nodeVar3328 );
									nodeVar3350 = fract( nodeVar3328 );
									nodeVar3350 = ( ( nodeVar3350 * nodeVar3350 ) * ( vec2( 3.0 ) - ( nodeVar3350 * vec2( 2.0 ) ) ) );
									nodeVar3351 = fract( ( vec3( nodeVar3349.x, nodeVar3349.y, nodeVar3349.x ) * vec3( 0.1031 ) ) );
									nodeVar3351 = ( nodeVar3351 + vec3( dot( nodeVar3351, ( nodeVar3351.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3352 = ( nodeVar3349 + vec2( 1.0, 0.0 ) );
									nodeVar3353 = fract( ( vec3( nodeVar3352.x, nodeVar3352.y, nodeVar3352.x ) * vec3( 0.1031 ) ) );
									nodeVar3353 = ( nodeVar3353 + vec3( dot( nodeVar3353, ( nodeVar3353.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3354 = ( nodeVar3349 + vec2( 0.0, 1.0 ) );
									nodeVar3355 = fract( ( vec3( nodeVar3354.x, nodeVar3354.y, nodeVar3354.x ) * vec3( 0.1031 ) ) );
									nodeVar3355 = ( nodeVar3355 + vec3( dot( nodeVar3355, ( nodeVar3355.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3356 = ( nodeVar3349 + vec2( 1.0, 1.0 ) );
									nodeVar3357 = fract( ( vec3( nodeVar3356.x, nodeVar3356.y, nodeVar3356.x ) * vec3( 0.1031 ) ) );
									nodeVar3357 = ( nodeVar3357 + vec3( dot( nodeVar3357, ( nodeVar3357.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3329 = ( nodeVar3329 + ( nodeVar3330 * mix( mix( fract( ( ( nodeVar3351.x + nodeVar3351.y ) * nodeVar3351.z ) ), fract( ( ( nodeVar3353.x + nodeVar3353.y ) * nodeVar3353.z ) ), nodeVar3350.x ), mix( fract( ( ( nodeVar3355.x + nodeVar3355.y ) * nodeVar3355.z ) ), fract( ( ( nodeVar3357.x + nodeVar3357.y ) * nodeVar3357.z ) ), nodeVar3350.x ), nodeVar3350.y ) ) );
									nodeVar3328 = ( nodeVar3328 * vec2( 2.03 ) );
									nodeVar3330 = ( nodeVar3330 * 0.52 );
									nodeVar3358 = floor( nodeVar3328 );
									nodeVar3359 = fract( nodeVar3328 );
									nodeVar3359 = ( ( nodeVar3359 * nodeVar3359 ) * ( vec2( 3.0 ) - ( nodeVar3359 * vec2( 2.0 ) ) ) );
									nodeVar3360 = fract( ( vec3( nodeVar3358.x, nodeVar3358.y, nodeVar3358.x ) * vec3( 0.1031 ) ) );
									nodeVar3360 = ( nodeVar3360 + vec3( dot( nodeVar3360, ( nodeVar3360.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3361 = ( nodeVar3358 + vec2( 1.0, 0.0 ) );
									nodeVar3362 = fract( ( vec3( nodeVar3361.x, nodeVar3361.y, nodeVar3361.x ) * vec3( 0.1031 ) ) );
									nodeVar3362 = ( nodeVar3362 + vec3( dot( nodeVar3362, ( nodeVar3362.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3363 = ( nodeVar3358 + vec2( 0.0, 1.0 ) );
									nodeVar3364 = fract( ( vec3( nodeVar3363.x, nodeVar3363.y, nodeVar3363.x ) * vec3( 0.1031 ) ) );
									nodeVar3364 = ( nodeVar3364 + vec3( dot( nodeVar3364, ( nodeVar3364.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3365 = ( nodeVar3358 + vec2( 1.0, 1.0 ) );
									nodeVar3366 = fract( ( vec3( nodeVar3365.x, nodeVar3365.y, nodeVar3365.x ) * vec3( 0.1031 ) ) );
									nodeVar3366 = ( nodeVar3366 + vec3( dot( nodeVar3366, ( nodeVar3366.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar3329 = ( nodeVar3329 + ( nodeVar3330 * mix( mix( fract( ( ( nodeVar3360.x + nodeVar3360.y ) * nodeVar3360.z ) ), fract( ( ( nodeVar3362.x + nodeVar3362.y ) * nodeVar3362.z ) ), nodeVar3359.x ), mix( fract( ( ( nodeVar3364.x + nodeVar3364.y ) * nodeVar3364.z ) ), fract( ( ( nodeVar3366.x + nodeVar3366.y ) * nodeVar3366.z ) ), nodeVar3359.x ), nodeVar3359.y ) ) );
									nodeVar3328 = ( nodeVar3328 * vec2( 2.03 ) );
									nodeVar3330 = ( nodeVar3330 * 0.52 );
									nodeVar2741 = vec3( ( ( ( nodeVar3324 * ( 0.5 + ( nodeVar3327 * 0.5 ) ) ) * 0.5 ) + ( ( nodeVar3324 * 0.22 ) * nodeVar3329 ) ), nodeVar3324, nodeVar3327 );
									

								} else {


									if ( ( nodeVar2740 < 8.5 ) ) {

										nodeVar3367 = ( nodeVar2739 * vec2( 0.9 ) );
										nodeVar3368 = 0.0;
										nodeVar3369 = 0.5;
										nodeVar3370 = floor( nodeVar3367 );
										nodeVar3371 = fract( nodeVar3367 );
										nodeVar3371 = ( ( nodeVar3371 * nodeVar3371 ) * ( vec2( 3.0 ) - ( nodeVar3371 * vec2( 2.0 ) ) ) );
										nodeVar3372 = fract( ( vec3( nodeVar3370.x, nodeVar3370.y, nodeVar3370.x ) * vec3( 0.1031 ) ) );
										nodeVar3372 = ( nodeVar3372 + vec3( dot( nodeVar3372, ( nodeVar3372.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3373 = ( nodeVar3370 + vec2( 1.0, 0.0 ) );
										nodeVar3374 = fract( ( vec3( nodeVar3373.x, nodeVar3373.y, nodeVar3373.x ) * vec3( 0.1031 ) ) );
										nodeVar3374 = ( nodeVar3374 + vec3( dot( nodeVar3374, ( nodeVar3374.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3375 = ( nodeVar3370 + vec2( 0.0, 1.0 ) );
										nodeVar3376 = fract( ( vec3( nodeVar3375.x, nodeVar3375.y, nodeVar3375.x ) * vec3( 0.1031 ) ) );
										nodeVar3376 = ( nodeVar3376 + vec3( dot( nodeVar3376, ( nodeVar3376.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3377 = ( nodeVar3370 + vec2( 1.0, 1.0 ) );
										nodeVar3378 = fract( ( vec3( nodeVar3377.x, nodeVar3377.y, nodeVar3377.x ) * vec3( 0.1031 ) ) );
										nodeVar3378 = ( nodeVar3378 + vec3( dot( nodeVar3378, ( nodeVar3378.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3368 = ( nodeVar3368 + ( nodeVar3369 * mix( mix( fract( ( ( nodeVar3372.x + nodeVar3372.y ) * nodeVar3372.z ) ), fract( ( ( nodeVar3374.x + nodeVar3374.y ) * nodeVar3374.z ) ), nodeVar3371.x ), mix( fract( ( ( nodeVar3376.x + nodeVar3376.y ) * nodeVar3376.z ) ), fract( ( ( nodeVar3378.x + nodeVar3378.y ) * nodeVar3378.z ) ), nodeVar3371.x ), nodeVar3371.y ) ) );
										nodeVar3367 = ( nodeVar3367 * vec2( 2.03 ) );
										nodeVar3369 = ( nodeVar3369 * 0.52 );
										nodeVar3379 = floor( nodeVar3367 );
										nodeVar3380 = fract( nodeVar3367 );
										nodeVar3380 = ( ( nodeVar3380 * nodeVar3380 ) * ( vec2( 3.0 ) - ( nodeVar3380 * vec2( 2.0 ) ) ) );
										nodeVar3381 = fract( ( vec3( nodeVar3379.x, nodeVar3379.y, nodeVar3379.x ) * vec3( 0.1031 ) ) );
										nodeVar3381 = ( nodeVar3381 + vec3( dot( nodeVar3381, ( nodeVar3381.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3382 = ( nodeVar3379 + vec2( 1.0, 0.0 ) );
										nodeVar3383 = fract( ( vec3( nodeVar3382.x, nodeVar3382.y, nodeVar3382.x ) * vec3( 0.1031 ) ) );
										nodeVar3383 = ( nodeVar3383 + vec3( dot( nodeVar3383, ( nodeVar3383.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3384 = ( nodeVar3379 + vec2( 0.0, 1.0 ) );
										nodeVar3385 = fract( ( vec3( nodeVar3384.x, nodeVar3384.y, nodeVar3384.x ) * vec3( 0.1031 ) ) );
										nodeVar3385 = ( nodeVar3385 + vec3( dot( nodeVar3385, ( nodeVar3385.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3386 = ( nodeVar3379 + vec2( 1.0, 1.0 ) );
										nodeVar3387 = fract( ( vec3( nodeVar3386.x, nodeVar3386.y, nodeVar3386.x ) * vec3( 0.1031 ) ) );
										nodeVar3387 = ( nodeVar3387 + vec3( dot( nodeVar3387, ( nodeVar3387.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3368 = ( nodeVar3368 + ( nodeVar3369 * mix( mix( fract( ( ( nodeVar3381.x + nodeVar3381.y ) * nodeVar3381.z ) ), fract( ( ( nodeVar3383.x + nodeVar3383.y ) * nodeVar3383.z ) ), nodeVar3380.x ), mix( fract( ( ( nodeVar3385.x + nodeVar3385.y ) * nodeVar3385.z ) ), fract( ( ( nodeVar3387.x + nodeVar3387.y ) * nodeVar3387.z ) ), nodeVar3380.x ), nodeVar3380.y ) ) );
										nodeVar3367 = ( nodeVar3367 * vec2( 2.03 ) );
										nodeVar3369 = ( nodeVar3369 * 0.52 );
										nodeVar3388 = floor( nodeVar3367 );
										nodeVar3389 = fract( nodeVar3367 );
										nodeVar3389 = ( ( nodeVar3389 * nodeVar3389 ) * ( vec2( 3.0 ) - ( nodeVar3389 * vec2( 2.0 ) ) ) );
										nodeVar3390 = fract( ( vec3( nodeVar3388.x, nodeVar3388.y, nodeVar3388.x ) * vec3( 0.1031 ) ) );
										nodeVar3390 = ( nodeVar3390 + vec3( dot( nodeVar3390, ( nodeVar3390.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3391 = ( nodeVar3388 + vec2( 1.0, 0.0 ) );
										nodeVar3392 = fract( ( vec3( nodeVar3391.x, nodeVar3391.y, nodeVar3391.x ) * vec3( 0.1031 ) ) );
										nodeVar3392 = ( nodeVar3392 + vec3( dot( nodeVar3392, ( nodeVar3392.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3393 = ( nodeVar3388 + vec2( 0.0, 1.0 ) );
										nodeVar3394 = fract( ( vec3( nodeVar3393.x, nodeVar3393.y, nodeVar3393.x ) * vec3( 0.1031 ) ) );
										nodeVar3394 = ( nodeVar3394 + vec3( dot( nodeVar3394, ( nodeVar3394.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3395 = ( nodeVar3388 + vec2( 1.0, 1.0 ) );
										nodeVar3396 = fract( ( vec3( nodeVar3395.x, nodeVar3395.y, nodeVar3395.x ) * vec3( 0.1031 ) ) );
										nodeVar3396 = ( nodeVar3396 + vec3( dot( nodeVar3396, ( nodeVar3396.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3368 = ( nodeVar3368 + ( nodeVar3369 * mix( mix( fract( ( ( nodeVar3390.x + nodeVar3390.y ) * nodeVar3390.z ) ), fract( ( ( nodeVar3392.x + nodeVar3392.y ) * nodeVar3392.z ) ), nodeVar3389.x ), mix( fract( ( ( nodeVar3394.x + nodeVar3394.y ) * nodeVar3394.z ) ), fract( ( ( nodeVar3396.x + nodeVar3396.y ) * nodeVar3396.z ) ), nodeVar3389.x ), nodeVar3389.y ) ) );
										nodeVar3367 = ( nodeVar3367 * vec2( 2.03 ) );
										nodeVar3369 = ( nodeVar3369 * 0.52 );
										nodeVar3397 = floor( nodeVar3367 );
										nodeVar3398 = fract( nodeVar3367 );
										nodeVar3398 = ( ( nodeVar3398 * nodeVar3398 ) * ( vec2( 3.0 ) - ( nodeVar3398 * vec2( 2.0 ) ) ) );
										nodeVar3399 = fract( ( vec3( nodeVar3397.x, nodeVar3397.y, nodeVar3397.x ) * vec3( 0.1031 ) ) );
										nodeVar3399 = ( nodeVar3399 + vec3( dot( nodeVar3399, ( nodeVar3399.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3400 = ( nodeVar3397 + vec2( 1.0, 0.0 ) );
										nodeVar3401 = fract( ( vec3( nodeVar3400.x, nodeVar3400.y, nodeVar3400.x ) * vec3( 0.1031 ) ) );
										nodeVar3401 = ( nodeVar3401 + vec3( dot( nodeVar3401, ( nodeVar3401.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3402 = ( nodeVar3397 + vec2( 0.0, 1.0 ) );
										nodeVar3403 = fract( ( vec3( nodeVar3402.x, nodeVar3402.y, nodeVar3402.x ) * vec3( 0.1031 ) ) );
										nodeVar3403 = ( nodeVar3403 + vec3( dot( nodeVar3403, ( nodeVar3403.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3404 = ( nodeVar3397 + vec2( 1.0, 1.0 ) );
										nodeVar3405 = fract( ( vec3( nodeVar3404.x, nodeVar3404.y, nodeVar3404.x ) * vec3( 0.1031 ) ) );
										nodeVar3405 = ( nodeVar3405 + vec3( dot( nodeVar3405, ( nodeVar3405.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3368 = ( nodeVar3368 + ( nodeVar3369 * mix( mix( fract( ( ( nodeVar3399.x + nodeVar3399.y ) * nodeVar3399.z ) ), fract( ( ( nodeVar3401.x + nodeVar3401.y ) * nodeVar3401.z ) ), nodeVar3398.x ), mix( fract( ( ( nodeVar3403.x + nodeVar3403.y ) * nodeVar3403.z ) ), fract( ( ( nodeVar3405.x + nodeVar3405.y ) * nodeVar3405.z ) ), nodeVar3398.x ), nodeVar3398.y ) ) );
										nodeVar3367 = ( nodeVar3367 * vec2( 2.03 ) );
										nodeVar3369 = ( nodeVar3369 * 0.52 );
										nodeVar3406 = ( nodeVar2739 * vec2( 6.0 ) );
										nodeVar3407 = 0.0;
										nodeVar3408 = 0.5;
										nodeVar3409 = floor( nodeVar3406 );
										nodeVar3410 = fract( nodeVar3406 );
										nodeVar3410 = ( ( nodeVar3410 * nodeVar3410 ) * ( vec2( 3.0 ) - ( nodeVar3410 * vec2( 2.0 ) ) ) );
										nodeVar3411 = fract( ( vec3( nodeVar3409.x, nodeVar3409.y, nodeVar3409.x ) * vec3( 0.1031 ) ) );
										nodeVar3411 = ( nodeVar3411 + vec3( dot( nodeVar3411, ( nodeVar3411.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3412 = ( nodeVar3409 + vec2( 1.0, 0.0 ) );
										nodeVar3413 = fract( ( vec3( nodeVar3412.x, nodeVar3412.y, nodeVar3412.x ) * vec3( 0.1031 ) ) );
										nodeVar3413 = ( nodeVar3413 + vec3( dot( nodeVar3413, ( nodeVar3413.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3414 = ( nodeVar3409 + vec2( 0.0, 1.0 ) );
										nodeVar3415 = fract( ( vec3( nodeVar3414.x, nodeVar3414.y, nodeVar3414.x ) * vec3( 0.1031 ) ) );
										nodeVar3415 = ( nodeVar3415 + vec3( dot( nodeVar3415, ( nodeVar3415.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3416 = ( nodeVar3409 + vec2( 1.0, 1.0 ) );
										nodeVar3417 = fract( ( vec3( nodeVar3416.x, nodeVar3416.y, nodeVar3416.x ) * vec3( 0.1031 ) ) );
										nodeVar3417 = ( nodeVar3417 + vec3( dot( nodeVar3417, ( nodeVar3417.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3407 = ( nodeVar3407 + ( nodeVar3408 * mix( mix( fract( ( ( nodeVar3411.x + nodeVar3411.y ) * nodeVar3411.z ) ), fract( ( ( nodeVar3413.x + nodeVar3413.y ) * nodeVar3413.z ) ), nodeVar3410.x ), mix( fract( ( ( nodeVar3415.x + nodeVar3415.y ) * nodeVar3415.z ) ), fract( ( ( nodeVar3417.x + nodeVar3417.y ) * nodeVar3417.z ) ), nodeVar3410.x ), nodeVar3410.y ) ) );
										nodeVar3406 = ( nodeVar3406 * vec2( 2.03 ) );
										nodeVar3408 = ( nodeVar3408 * 0.52 );
										nodeVar3418 = floor( nodeVar3406 );
										nodeVar3419 = fract( nodeVar3406 );
										nodeVar3419 = ( ( nodeVar3419 * nodeVar3419 ) * ( vec2( 3.0 ) - ( nodeVar3419 * vec2( 2.0 ) ) ) );
										nodeVar3420 = fract( ( vec3( nodeVar3418.x, nodeVar3418.y, nodeVar3418.x ) * vec3( 0.1031 ) ) );
										nodeVar3420 = ( nodeVar3420 + vec3( dot( nodeVar3420, ( nodeVar3420.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3421 = ( nodeVar3418 + vec2( 1.0, 0.0 ) );
										nodeVar3422 = fract( ( vec3( nodeVar3421.x, nodeVar3421.y, nodeVar3421.x ) * vec3( 0.1031 ) ) );
										nodeVar3422 = ( nodeVar3422 + vec3( dot( nodeVar3422, ( nodeVar3422.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3423 = ( nodeVar3418 + vec2( 0.0, 1.0 ) );
										nodeVar3424 = fract( ( vec3( nodeVar3423.x, nodeVar3423.y, nodeVar3423.x ) * vec3( 0.1031 ) ) );
										nodeVar3424 = ( nodeVar3424 + vec3( dot( nodeVar3424, ( nodeVar3424.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3425 = ( nodeVar3418 + vec2( 1.0, 1.0 ) );
										nodeVar3426 = fract( ( vec3( nodeVar3425.x, nodeVar3425.y, nodeVar3425.x ) * vec3( 0.1031 ) ) );
										nodeVar3426 = ( nodeVar3426 + vec3( dot( nodeVar3426, ( nodeVar3426.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3407 = ( nodeVar3407 + ( nodeVar3408 * mix( mix( fract( ( ( nodeVar3420.x + nodeVar3420.y ) * nodeVar3420.z ) ), fract( ( ( nodeVar3422.x + nodeVar3422.y ) * nodeVar3422.z ) ), nodeVar3419.x ), mix( fract( ( ( nodeVar3424.x + nodeVar3424.y ) * nodeVar3424.z ) ), fract( ( ( nodeVar3426.x + nodeVar3426.y ) * nodeVar3426.z ) ), nodeVar3419.x ), nodeVar3419.y ) ) );
										nodeVar3406 = ( nodeVar3406 * vec2( 2.03 ) );
										nodeVar3408 = ( nodeVar3408 * 0.52 );
										nodeVar3427 = floor( nodeVar3406 );
										nodeVar3428 = fract( nodeVar3406 );
										nodeVar3428 = ( ( nodeVar3428 * nodeVar3428 ) * ( vec2( 3.0 ) - ( nodeVar3428 * vec2( 2.0 ) ) ) );
										nodeVar3429 = fract( ( vec3( nodeVar3427.x, nodeVar3427.y, nodeVar3427.x ) * vec3( 0.1031 ) ) );
										nodeVar3429 = ( nodeVar3429 + vec3( dot( nodeVar3429, ( nodeVar3429.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3430 = ( nodeVar3427 + vec2( 1.0, 0.0 ) );
										nodeVar3431 = fract( ( vec3( nodeVar3430.x, nodeVar3430.y, nodeVar3430.x ) * vec3( 0.1031 ) ) );
										nodeVar3431 = ( nodeVar3431 + vec3( dot( nodeVar3431, ( nodeVar3431.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3432 = ( nodeVar3427 + vec2( 0.0, 1.0 ) );
										nodeVar3433 = fract( ( vec3( nodeVar3432.x, nodeVar3432.y, nodeVar3432.x ) * vec3( 0.1031 ) ) );
										nodeVar3433 = ( nodeVar3433 + vec3( dot( nodeVar3433, ( nodeVar3433.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3434 = ( nodeVar3427 + vec2( 1.0, 1.0 ) );
										nodeVar3435 = fract( ( vec3( nodeVar3434.x, nodeVar3434.y, nodeVar3434.x ) * vec3( 0.1031 ) ) );
										nodeVar3435 = ( nodeVar3435 + vec3( dot( nodeVar3435, ( nodeVar3435.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3407 = ( nodeVar3407 + ( nodeVar3408 * mix( mix( fract( ( ( nodeVar3429.x + nodeVar3429.y ) * nodeVar3429.z ) ), fract( ( ( nodeVar3431.x + nodeVar3431.y ) * nodeVar3431.z ) ), nodeVar3428.x ), mix( fract( ( ( nodeVar3433.x + nodeVar3433.y ) * nodeVar3433.z ) ), fract( ( ( nodeVar3435.x + nodeVar3435.y ) * nodeVar3435.z ) ), nodeVar3428.x ), nodeVar3428.y ) ) );
										nodeVar3406 = ( nodeVar3406 * vec2( 2.03 ) );
										nodeVar3408 = ( nodeVar3408 * 0.52 );
										nodeVar3436 = floor( nodeVar3406 );
										nodeVar3437 = fract( nodeVar3406 );
										nodeVar3437 = ( ( nodeVar3437 * nodeVar3437 ) * ( vec2( 3.0 ) - ( nodeVar3437 * vec2( 2.0 ) ) ) );
										nodeVar3438 = fract( ( vec3( nodeVar3436.x, nodeVar3436.y, nodeVar3436.x ) * vec3( 0.1031 ) ) );
										nodeVar3438 = ( nodeVar3438 + vec3( dot( nodeVar3438, ( nodeVar3438.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3439 = ( nodeVar3436 + vec2( 1.0, 0.0 ) );
										nodeVar3440 = fract( ( vec3( nodeVar3439.x, nodeVar3439.y, nodeVar3439.x ) * vec3( 0.1031 ) ) );
										nodeVar3440 = ( nodeVar3440 + vec3( dot( nodeVar3440, ( nodeVar3440.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3441 = ( nodeVar3436 + vec2( 0.0, 1.0 ) );
										nodeVar3442 = fract( ( vec3( nodeVar3441.x, nodeVar3441.y, nodeVar3441.x ) * vec3( 0.1031 ) ) );
										nodeVar3442 = ( nodeVar3442 + vec3( dot( nodeVar3442, ( nodeVar3442.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3443 = ( nodeVar3436 + vec2( 1.0, 1.0 ) );
										nodeVar3444 = fract( ( vec3( nodeVar3443.x, nodeVar3443.y, nodeVar3443.x ) * vec3( 0.1031 ) ) );
										nodeVar3444 = ( nodeVar3444 + vec3( dot( nodeVar3444, ( nodeVar3444.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar3407 = ( nodeVar3407 + ( nodeVar3408 * mix( mix( fract( ( ( nodeVar3438.x + nodeVar3438.y ) * nodeVar3438.z ) ), fract( ( ( nodeVar3440.x + nodeVar3440.y ) * nodeVar3440.z ) ), nodeVar3437.x ), mix( fract( ( ( nodeVar3442.x + nodeVar3442.y ) * nodeVar3442.z ) ), fract( ( ( nodeVar3444.x + nodeVar3444.y ) * nodeVar3444.z ) ), nodeVar3437.x ), nodeVar3437.y ) ) );
										nodeVar3406 = ( nodeVar3406 * vec2( 2.03 ) );
										nodeVar3408 = ( nodeVar3408 * 0.52 );
										nodeVar3445 = ( ( nodeVar3368 * 0.6 ) + ( nodeVar3407 * 0.4 ) );
										nodeVar2741 = vec3( nodeVar3445, 1.0, nodeVar3445 );
										

									} else {


										if ( ( nodeVar2740 < 9.5 ) ) {

											nodeVar3446 = ( nodeVar2739 * vec2( 26.0 ) );
											nodeVar3447 = 0.0;
											nodeVar3448 = 0.5;
											nodeVar3449 = floor( nodeVar3446 );
											nodeVar3450 = fract( nodeVar3446 );
											nodeVar3450 = ( ( nodeVar3450 * nodeVar3450 ) * ( vec2( 3.0 ) - ( nodeVar3450 * vec2( 2.0 ) ) ) );
											nodeVar3451 = fract( ( vec3( nodeVar3449.x, nodeVar3449.y, nodeVar3449.x ) * vec3( 0.1031 ) ) );
											nodeVar3451 = ( nodeVar3451 + vec3( dot( nodeVar3451, ( nodeVar3451.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3452 = ( nodeVar3449 + vec2( 1.0, 0.0 ) );
											nodeVar3453 = fract( ( vec3( nodeVar3452.x, nodeVar3452.y, nodeVar3452.x ) * vec3( 0.1031 ) ) );
											nodeVar3453 = ( nodeVar3453 + vec3( dot( nodeVar3453, ( nodeVar3453.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3454 = ( nodeVar3449 + vec2( 0.0, 1.0 ) );
											nodeVar3455 = fract( ( vec3( nodeVar3454.x, nodeVar3454.y, nodeVar3454.x ) * vec3( 0.1031 ) ) );
											nodeVar3455 = ( nodeVar3455 + vec3( dot( nodeVar3455, ( nodeVar3455.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3456 = ( nodeVar3449 + vec2( 1.0, 1.0 ) );
											nodeVar3457 = fract( ( vec3( nodeVar3456.x, nodeVar3456.y, nodeVar3456.x ) * vec3( 0.1031 ) ) );
											nodeVar3457 = ( nodeVar3457 + vec3( dot( nodeVar3457, ( nodeVar3457.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3447 = ( nodeVar3447 + ( nodeVar3448 * mix( mix( fract( ( ( nodeVar3451.x + nodeVar3451.y ) * nodeVar3451.z ) ), fract( ( ( nodeVar3453.x + nodeVar3453.y ) * nodeVar3453.z ) ), nodeVar3450.x ), mix( fract( ( ( nodeVar3455.x + nodeVar3455.y ) * nodeVar3455.z ) ), fract( ( ( nodeVar3457.x + nodeVar3457.y ) * nodeVar3457.z ) ), nodeVar3450.x ), nodeVar3450.y ) ) );
											nodeVar3446 = ( nodeVar3446 * vec2( 2.03 ) );
											nodeVar3448 = ( nodeVar3448 * 0.52 );
											nodeVar3458 = floor( nodeVar3446 );
											nodeVar3459 = fract( nodeVar3446 );
											nodeVar3459 = ( ( nodeVar3459 * nodeVar3459 ) * ( vec2( 3.0 ) - ( nodeVar3459 * vec2( 2.0 ) ) ) );
											nodeVar3460 = fract( ( vec3( nodeVar3458.x, nodeVar3458.y, nodeVar3458.x ) * vec3( 0.1031 ) ) );
											nodeVar3460 = ( nodeVar3460 + vec3( dot( nodeVar3460, ( nodeVar3460.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3461 = ( nodeVar3458 + vec2( 1.0, 0.0 ) );
											nodeVar3462 = fract( ( vec3( nodeVar3461.x, nodeVar3461.y, nodeVar3461.x ) * vec3( 0.1031 ) ) );
											nodeVar3462 = ( nodeVar3462 + vec3( dot( nodeVar3462, ( nodeVar3462.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3463 = ( nodeVar3458 + vec2( 0.0, 1.0 ) );
											nodeVar3464 = fract( ( vec3( nodeVar3463.x, nodeVar3463.y, nodeVar3463.x ) * vec3( 0.1031 ) ) );
											nodeVar3464 = ( nodeVar3464 + vec3( dot( nodeVar3464, ( nodeVar3464.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3465 = ( nodeVar3458 + vec2( 1.0, 1.0 ) );
											nodeVar3466 = fract( ( vec3( nodeVar3465.x, nodeVar3465.y, nodeVar3465.x ) * vec3( 0.1031 ) ) );
											nodeVar3466 = ( nodeVar3466 + vec3( dot( nodeVar3466, ( nodeVar3466.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3447 = ( nodeVar3447 + ( nodeVar3448 * mix( mix( fract( ( ( nodeVar3460.x + nodeVar3460.y ) * nodeVar3460.z ) ), fract( ( ( nodeVar3462.x + nodeVar3462.y ) * nodeVar3462.z ) ), nodeVar3459.x ), mix( fract( ( ( nodeVar3464.x + nodeVar3464.y ) * nodeVar3464.z ) ), fract( ( ( nodeVar3466.x + nodeVar3466.y ) * nodeVar3466.z ) ), nodeVar3459.x ), nodeVar3459.y ) ) );
											nodeVar3446 = ( nodeVar3446 * vec2( 2.03 ) );
											nodeVar3448 = ( nodeVar3448 * 0.52 );
											nodeVar3467 = floor( nodeVar3446 );
											nodeVar3468 = fract( nodeVar3446 );
											nodeVar3468 = ( ( nodeVar3468 * nodeVar3468 ) * ( vec2( 3.0 ) - ( nodeVar3468 * vec2( 2.0 ) ) ) );
											nodeVar3469 = fract( ( vec3( nodeVar3467.x, nodeVar3467.y, nodeVar3467.x ) * vec3( 0.1031 ) ) );
											nodeVar3469 = ( nodeVar3469 + vec3( dot( nodeVar3469, ( nodeVar3469.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3470 = ( nodeVar3467 + vec2( 1.0, 0.0 ) );
											nodeVar3471 = fract( ( vec3( nodeVar3470.x, nodeVar3470.y, nodeVar3470.x ) * vec3( 0.1031 ) ) );
											nodeVar3471 = ( nodeVar3471 + vec3( dot( nodeVar3471, ( nodeVar3471.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3472 = ( nodeVar3467 + vec2( 0.0, 1.0 ) );
											nodeVar3473 = fract( ( vec3( nodeVar3472.x, nodeVar3472.y, nodeVar3472.x ) * vec3( 0.1031 ) ) );
											nodeVar3473 = ( nodeVar3473 + vec3( dot( nodeVar3473, ( nodeVar3473.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3474 = ( nodeVar3467 + vec2( 1.0, 1.0 ) );
											nodeVar3475 = fract( ( vec3( nodeVar3474.x, nodeVar3474.y, nodeVar3474.x ) * vec3( 0.1031 ) ) );
											nodeVar3475 = ( nodeVar3475 + vec3( dot( nodeVar3475, ( nodeVar3475.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3447 = ( nodeVar3447 + ( nodeVar3448 * mix( mix( fract( ( ( nodeVar3469.x + nodeVar3469.y ) * nodeVar3469.z ) ), fract( ( ( nodeVar3471.x + nodeVar3471.y ) * nodeVar3471.z ) ), nodeVar3468.x ), mix( fract( ( ( nodeVar3473.x + nodeVar3473.y ) * nodeVar3473.z ) ), fract( ( ( nodeVar3475.x + nodeVar3475.y ) * nodeVar3475.z ) ), nodeVar3468.x ), nodeVar3468.y ) ) );
											nodeVar3446 = ( nodeVar3446 * vec2( 2.03 ) );
											nodeVar3448 = ( nodeVar3448 * 0.52 );
											nodeVar3476 = floor( nodeVar3446 );
											nodeVar3477 = fract( nodeVar3446 );
											nodeVar3477 = ( ( nodeVar3477 * nodeVar3477 ) * ( vec2( 3.0 ) - ( nodeVar3477 * vec2( 2.0 ) ) ) );
											nodeVar3478 = fract( ( vec3( nodeVar3476.x, nodeVar3476.y, nodeVar3476.x ) * vec3( 0.1031 ) ) );
											nodeVar3478 = ( nodeVar3478 + vec3( dot( nodeVar3478, ( nodeVar3478.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3479 = ( nodeVar3476 + vec2( 1.0, 0.0 ) );
											nodeVar3480 = fract( ( vec3( nodeVar3479.x, nodeVar3479.y, nodeVar3479.x ) * vec3( 0.1031 ) ) );
											nodeVar3480 = ( nodeVar3480 + vec3( dot( nodeVar3480, ( nodeVar3480.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3481 = ( nodeVar3476 + vec2( 0.0, 1.0 ) );
											nodeVar3482 = fract( ( vec3( nodeVar3481.x, nodeVar3481.y, nodeVar3481.x ) * vec3( 0.1031 ) ) );
											nodeVar3482 = ( nodeVar3482 + vec3( dot( nodeVar3482, ( nodeVar3482.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3483 = ( nodeVar3476 + vec2( 1.0, 1.0 ) );
											nodeVar3484 = fract( ( vec3( nodeVar3483.x, nodeVar3483.y, nodeVar3483.x ) * vec3( 0.1031 ) ) );
											nodeVar3484 = ( nodeVar3484 + vec3( dot( nodeVar3484, ( nodeVar3484.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3447 = ( nodeVar3447 + ( nodeVar3448 * mix( mix( fract( ( ( nodeVar3478.x + nodeVar3478.y ) * nodeVar3478.z ) ), fract( ( ( nodeVar3480.x + nodeVar3480.y ) * nodeVar3480.z ) ), nodeVar3477.x ), mix( fract( ( ( nodeVar3482.x + nodeVar3482.y ) * nodeVar3482.z ) ), fract( ( ( nodeVar3484.x + nodeVar3484.y ) * nodeVar3484.z ) ), nodeVar3477.x ), nodeVar3477.y ) ) );
											nodeVar3446 = ( nodeVar3446 * vec2( 2.03 ) );
											nodeVar3448 = ( nodeVar3448 * 0.52 );
											nodeVar3485 = ( nodeVar2739 * vec2( 90.0 ) );
											nodeVar3486 = 0.0;
											nodeVar3487 = 0.5;
											nodeVar3488 = floor( nodeVar3485 );
											nodeVar3489 = fract( nodeVar3485 );
											nodeVar3489 = ( ( nodeVar3489 * nodeVar3489 ) * ( vec2( 3.0 ) - ( nodeVar3489 * vec2( 2.0 ) ) ) );
											nodeVar3490 = fract( ( vec3( nodeVar3488.x, nodeVar3488.y, nodeVar3488.x ) * vec3( 0.1031 ) ) );
											nodeVar3490 = ( nodeVar3490 + vec3( dot( nodeVar3490, ( nodeVar3490.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3491 = ( nodeVar3488 + vec2( 1.0, 0.0 ) );
											nodeVar3492 = fract( ( vec3( nodeVar3491.x, nodeVar3491.y, nodeVar3491.x ) * vec3( 0.1031 ) ) );
											nodeVar3492 = ( nodeVar3492 + vec3( dot( nodeVar3492, ( nodeVar3492.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3493 = ( nodeVar3488 + vec2( 0.0, 1.0 ) );
											nodeVar3494 = fract( ( vec3( nodeVar3493.x, nodeVar3493.y, nodeVar3493.x ) * vec3( 0.1031 ) ) );
											nodeVar3494 = ( nodeVar3494 + vec3( dot( nodeVar3494, ( nodeVar3494.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3495 = ( nodeVar3488 + vec2( 1.0, 1.0 ) );
											nodeVar3496 = fract( ( vec3( nodeVar3495.x, nodeVar3495.y, nodeVar3495.x ) * vec3( 0.1031 ) ) );
											nodeVar3496 = ( nodeVar3496 + vec3( dot( nodeVar3496, ( nodeVar3496.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3486 = ( nodeVar3486 + ( nodeVar3487 * mix( mix( fract( ( ( nodeVar3490.x + nodeVar3490.y ) * nodeVar3490.z ) ), fract( ( ( nodeVar3492.x + nodeVar3492.y ) * nodeVar3492.z ) ), nodeVar3489.x ), mix( fract( ( ( nodeVar3494.x + nodeVar3494.y ) * nodeVar3494.z ) ), fract( ( ( nodeVar3496.x + nodeVar3496.y ) * nodeVar3496.z ) ), nodeVar3489.x ), nodeVar3489.y ) ) );
											nodeVar3485 = ( nodeVar3485 * vec2( 2.03 ) );
											nodeVar3487 = ( nodeVar3487 * 0.52 );
											nodeVar3497 = floor( nodeVar3485 );
											nodeVar3498 = fract( nodeVar3485 );
											nodeVar3498 = ( ( nodeVar3498 * nodeVar3498 ) * ( vec2( 3.0 ) - ( nodeVar3498 * vec2( 2.0 ) ) ) );
											nodeVar3499 = fract( ( vec3( nodeVar3497.x, nodeVar3497.y, nodeVar3497.x ) * vec3( 0.1031 ) ) );
											nodeVar3499 = ( nodeVar3499 + vec3( dot( nodeVar3499, ( nodeVar3499.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3500 = ( nodeVar3497 + vec2( 1.0, 0.0 ) );
											nodeVar3501 = fract( ( vec3( nodeVar3500.x, nodeVar3500.y, nodeVar3500.x ) * vec3( 0.1031 ) ) );
											nodeVar3501 = ( nodeVar3501 + vec3( dot( nodeVar3501, ( nodeVar3501.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3502 = ( nodeVar3497 + vec2( 0.0, 1.0 ) );
											nodeVar3503 = fract( ( vec3( nodeVar3502.x, nodeVar3502.y, nodeVar3502.x ) * vec3( 0.1031 ) ) );
											nodeVar3503 = ( nodeVar3503 + vec3( dot( nodeVar3503, ( nodeVar3503.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3504 = ( nodeVar3497 + vec2( 1.0, 1.0 ) );
											nodeVar3505 = fract( ( vec3( nodeVar3504.x, nodeVar3504.y, nodeVar3504.x ) * vec3( 0.1031 ) ) );
											nodeVar3505 = ( nodeVar3505 + vec3( dot( nodeVar3505, ( nodeVar3505.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3486 = ( nodeVar3486 + ( nodeVar3487 * mix( mix( fract( ( ( nodeVar3499.x + nodeVar3499.y ) * nodeVar3499.z ) ), fract( ( ( nodeVar3501.x + nodeVar3501.y ) * nodeVar3501.z ) ), nodeVar3498.x ), mix( fract( ( ( nodeVar3503.x + nodeVar3503.y ) * nodeVar3503.z ) ), fract( ( ( nodeVar3505.x + nodeVar3505.y ) * nodeVar3505.z ) ), nodeVar3498.x ), nodeVar3498.y ) ) );
											nodeVar3485 = ( nodeVar3485 * vec2( 2.03 ) );
											nodeVar3487 = ( nodeVar3487 * 0.52 );
											nodeVar3506 = floor( nodeVar3485 );
											nodeVar3507 = fract( nodeVar3485 );
											nodeVar3507 = ( ( nodeVar3507 * nodeVar3507 ) * ( vec2( 3.0 ) - ( nodeVar3507 * vec2( 2.0 ) ) ) );
											nodeVar3508 = fract( ( vec3( nodeVar3506.x, nodeVar3506.y, nodeVar3506.x ) * vec3( 0.1031 ) ) );
											nodeVar3508 = ( nodeVar3508 + vec3( dot( nodeVar3508, ( nodeVar3508.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3509 = ( nodeVar3506 + vec2( 1.0, 0.0 ) );
											nodeVar3510 = fract( ( vec3( nodeVar3509.x, nodeVar3509.y, nodeVar3509.x ) * vec3( 0.1031 ) ) );
											nodeVar3510 = ( nodeVar3510 + vec3( dot( nodeVar3510, ( nodeVar3510.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3511 = ( nodeVar3506 + vec2( 0.0, 1.0 ) );
											nodeVar3512 = fract( ( vec3( nodeVar3511.x, nodeVar3511.y, nodeVar3511.x ) * vec3( 0.1031 ) ) );
											nodeVar3512 = ( nodeVar3512 + vec3( dot( nodeVar3512, ( nodeVar3512.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3513 = ( nodeVar3506 + vec2( 1.0, 1.0 ) );
											nodeVar3514 = fract( ( vec3( nodeVar3513.x, nodeVar3513.y, nodeVar3513.x ) * vec3( 0.1031 ) ) );
											nodeVar3514 = ( nodeVar3514 + vec3( dot( nodeVar3514, ( nodeVar3514.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3486 = ( nodeVar3486 + ( nodeVar3487 * mix( mix( fract( ( ( nodeVar3508.x + nodeVar3508.y ) * nodeVar3508.z ) ), fract( ( ( nodeVar3510.x + nodeVar3510.y ) * nodeVar3510.z ) ), nodeVar3507.x ), mix( fract( ( ( nodeVar3512.x + nodeVar3512.y ) * nodeVar3512.z ) ), fract( ( ( nodeVar3514.x + nodeVar3514.y ) * nodeVar3514.z ) ), nodeVar3507.x ), nodeVar3507.y ) ) );
											nodeVar3485 = ( nodeVar3485 * vec2( 2.03 ) );
											nodeVar3487 = ( nodeVar3487 * 0.52 );
											nodeVar3515 = floor( nodeVar3485 );
											nodeVar3516 = fract( nodeVar3485 );
											nodeVar3516 = ( ( nodeVar3516 * nodeVar3516 ) * ( vec2( 3.0 ) - ( nodeVar3516 * vec2( 2.0 ) ) ) );
											nodeVar3517 = fract( ( vec3( nodeVar3515.x, nodeVar3515.y, nodeVar3515.x ) * vec3( 0.1031 ) ) );
											nodeVar3517 = ( nodeVar3517 + vec3( dot( nodeVar3517, ( nodeVar3517.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3518 = ( nodeVar3515 + vec2( 1.0, 0.0 ) );
											nodeVar3519 = fract( ( vec3( nodeVar3518.x, nodeVar3518.y, nodeVar3518.x ) * vec3( 0.1031 ) ) );
											nodeVar3519 = ( nodeVar3519 + vec3( dot( nodeVar3519, ( nodeVar3519.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3520 = ( nodeVar3515 + vec2( 0.0, 1.0 ) );
											nodeVar3521 = fract( ( vec3( nodeVar3520.x, nodeVar3520.y, nodeVar3520.x ) * vec3( 0.1031 ) ) );
											nodeVar3521 = ( nodeVar3521 + vec3( dot( nodeVar3521, ( nodeVar3521.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3522 = ( nodeVar3515 + vec2( 1.0, 1.0 ) );
											nodeVar3523 = fract( ( vec3( nodeVar3522.x, nodeVar3522.y, nodeVar3522.x ) * vec3( 0.1031 ) ) );
											nodeVar3523 = ( nodeVar3523 + vec3( dot( nodeVar3523, ( nodeVar3523.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar3486 = ( nodeVar3486 + ( nodeVar3487 * mix( mix( fract( ( ( nodeVar3517.x + nodeVar3517.y ) * nodeVar3517.z ) ), fract( ( ( nodeVar3519.x + nodeVar3519.y ) * nodeVar3519.z ) ), nodeVar3516.x ), mix( fract( ( ( nodeVar3521.x + nodeVar3521.y ) * nodeVar3521.z ) ), fract( ( ( nodeVar3523.x + nodeVar3523.y ) * nodeVar3523.z ) ), nodeVar3516.x ), nodeVar3516.y ) ) );
											nodeVar3485 = ( nodeVar3485 * vec2( 2.03 ) );
											nodeVar3487 = ( nodeVar3487 * 0.52 );
											nodeVar3524 = ( ( nodeVar3447 * 0.6 ) + ( nodeVar3486 * 0.4 ) );
											nodeVar2741 = vec3( ( nodeVar3524 * 0.5 ), ( 0.8 + ( nodeVar3524 * 0.2 ) ), nodeVar3524 );
											

										} else {


											if ( ( nodeVar2740 < 10.5 ) ) {

												nodeVar3525 = ( nodeVar2739 * vec2( 5.5 ) );
												nodeVar3526 = 0.0;
												nodeVar3527 = 0.5;
												nodeVar3528 = floor( nodeVar3525 );
												nodeVar3529 = fract( nodeVar3525 );
												nodeVar3529 = ( ( nodeVar3529 * nodeVar3529 ) * ( vec2( 3.0 ) - ( nodeVar3529 * vec2( 2.0 ) ) ) );
												nodeVar3530 = fract( ( vec3( nodeVar3528.x, nodeVar3528.y, nodeVar3528.x ) * vec3( 0.1031 ) ) );
												nodeVar3530 = ( nodeVar3530 + vec3( dot( nodeVar3530, ( nodeVar3530.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3531 = ( nodeVar3528 + vec2( 1.0, 0.0 ) );
												nodeVar3532 = fract( ( vec3( nodeVar3531.x, nodeVar3531.y, nodeVar3531.x ) * vec3( 0.1031 ) ) );
												nodeVar3532 = ( nodeVar3532 + vec3( dot( nodeVar3532, ( nodeVar3532.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3533 = ( nodeVar3528 + vec2( 0.0, 1.0 ) );
												nodeVar3534 = fract( ( vec3( nodeVar3533.x, nodeVar3533.y, nodeVar3533.x ) * vec3( 0.1031 ) ) );
												nodeVar3534 = ( nodeVar3534 + vec3( dot( nodeVar3534, ( nodeVar3534.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3535 = ( nodeVar3528 + vec2( 1.0, 1.0 ) );
												nodeVar3536 = fract( ( vec3( nodeVar3535.x, nodeVar3535.y, nodeVar3535.x ) * vec3( 0.1031 ) ) );
												nodeVar3536 = ( nodeVar3536 + vec3( dot( nodeVar3536, ( nodeVar3536.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3526 = ( nodeVar3526 + ( nodeVar3527 * mix( mix( fract( ( ( nodeVar3530.x + nodeVar3530.y ) * nodeVar3530.z ) ), fract( ( ( nodeVar3532.x + nodeVar3532.y ) * nodeVar3532.z ) ), nodeVar3529.x ), mix( fract( ( ( nodeVar3534.x + nodeVar3534.y ) * nodeVar3534.z ) ), fract( ( ( nodeVar3536.x + nodeVar3536.y ) * nodeVar3536.z ) ), nodeVar3529.x ), nodeVar3529.y ) ) );
												nodeVar3525 = ( nodeVar3525 * vec2( 2.03 ) );
												nodeVar3527 = ( nodeVar3527 * 0.52 );
												nodeVar3537 = floor( nodeVar3525 );
												nodeVar3538 = fract( nodeVar3525 );
												nodeVar3538 = ( ( nodeVar3538 * nodeVar3538 ) * ( vec2( 3.0 ) - ( nodeVar3538 * vec2( 2.0 ) ) ) );
												nodeVar3539 = fract( ( vec3( nodeVar3537.x, nodeVar3537.y, nodeVar3537.x ) * vec3( 0.1031 ) ) );
												nodeVar3539 = ( nodeVar3539 + vec3( dot( nodeVar3539, ( nodeVar3539.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3540 = ( nodeVar3537 + vec2( 1.0, 0.0 ) );
												nodeVar3541 = fract( ( vec3( nodeVar3540.x, nodeVar3540.y, nodeVar3540.x ) * vec3( 0.1031 ) ) );
												nodeVar3541 = ( nodeVar3541 + vec3( dot( nodeVar3541, ( nodeVar3541.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3542 = ( nodeVar3537 + vec2( 0.0, 1.0 ) );
												nodeVar3543 = fract( ( vec3( nodeVar3542.x, nodeVar3542.y, nodeVar3542.x ) * vec3( 0.1031 ) ) );
												nodeVar3543 = ( nodeVar3543 + vec3( dot( nodeVar3543, ( nodeVar3543.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3544 = ( nodeVar3537 + vec2( 1.0, 1.0 ) );
												nodeVar3545 = fract( ( vec3( nodeVar3544.x, nodeVar3544.y, nodeVar3544.x ) * vec3( 0.1031 ) ) );
												nodeVar3545 = ( nodeVar3545 + vec3( dot( nodeVar3545, ( nodeVar3545.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3526 = ( nodeVar3526 + ( nodeVar3527 * mix( mix( fract( ( ( nodeVar3539.x + nodeVar3539.y ) * nodeVar3539.z ) ), fract( ( ( nodeVar3541.x + nodeVar3541.y ) * nodeVar3541.z ) ), nodeVar3538.x ), mix( fract( ( ( nodeVar3543.x + nodeVar3543.y ) * nodeVar3543.z ) ), fract( ( ( nodeVar3545.x + nodeVar3545.y ) * nodeVar3545.z ) ), nodeVar3538.x ), nodeVar3538.y ) ) );
												nodeVar3525 = ( nodeVar3525 * vec2( 2.03 ) );
												nodeVar3527 = ( nodeVar3527 * 0.52 );
												nodeVar3546 = floor( nodeVar3525 );
												nodeVar3547 = fract( nodeVar3525 );
												nodeVar3547 = ( ( nodeVar3547 * nodeVar3547 ) * ( vec2( 3.0 ) - ( nodeVar3547 * vec2( 2.0 ) ) ) );
												nodeVar3548 = fract( ( vec3( nodeVar3546.x, nodeVar3546.y, nodeVar3546.x ) * vec3( 0.1031 ) ) );
												nodeVar3548 = ( nodeVar3548 + vec3( dot( nodeVar3548, ( nodeVar3548.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3549 = ( nodeVar3546 + vec2( 1.0, 0.0 ) );
												nodeVar3550 = fract( ( vec3( nodeVar3549.x, nodeVar3549.y, nodeVar3549.x ) * vec3( 0.1031 ) ) );
												nodeVar3550 = ( nodeVar3550 + vec3( dot( nodeVar3550, ( nodeVar3550.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3551 = ( nodeVar3546 + vec2( 0.0, 1.0 ) );
												nodeVar3552 = fract( ( vec3( nodeVar3551.x, nodeVar3551.y, nodeVar3551.x ) * vec3( 0.1031 ) ) );
												nodeVar3552 = ( nodeVar3552 + vec3( dot( nodeVar3552, ( nodeVar3552.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3553 = ( nodeVar3546 + vec2( 1.0, 1.0 ) );
												nodeVar3554 = fract( ( vec3( nodeVar3553.x, nodeVar3553.y, nodeVar3553.x ) * vec3( 0.1031 ) ) );
												nodeVar3554 = ( nodeVar3554 + vec3( dot( nodeVar3554, ( nodeVar3554.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3526 = ( nodeVar3526 + ( nodeVar3527 * mix( mix( fract( ( ( nodeVar3548.x + nodeVar3548.y ) * nodeVar3548.z ) ), fract( ( ( nodeVar3550.x + nodeVar3550.y ) * nodeVar3550.z ) ), nodeVar3547.x ), mix( fract( ( ( nodeVar3552.x + nodeVar3552.y ) * nodeVar3552.z ) ), fract( ( ( nodeVar3554.x + nodeVar3554.y ) * nodeVar3554.z ) ), nodeVar3547.x ), nodeVar3547.y ) ) );
												nodeVar3525 = ( nodeVar3525 * vec2( 2.03 ) );
												nodeVar3527 = ( nodeVar3527 * 0.52 );
												nodeVar3555 = floor( nodeVar3525 );
												nodeVar3556 = fract( nodeVar3525 );
												nodeVar3556 = ( ( nodeVar3556 * nodeVar3556 ) * ( vec2( 3.0 ) - ( nodeVar3556 * vec2( 2.0 ) ) ) );
												nodeVar3557 = fract( ( vec3( nodeVar3555.x, nodeVar3555.y, nodeVar3555.x ) * vec3( 0.1031 ) ) );
												nodeVar3557 = ( nodeVar3557 + vec3( dot( nodeVar3557, ( nodeVar3557.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3558 = ( nodeVar3555 + vec2( 1.0, 0.0 ) );
												nodeVar3559 = fract( ( vec3( nodeVar3558.x, nodeVar3558.y, nodeVar3558.x ) * vec3( 0.1031 ) ) );
												nodeVar3559 = ( nodeVar3559 + vec3( dot( nodeVar3559, ( nodeVar3559.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3560 = ( nodeVar3555 + vec2( 0.0, 1.0 ) );
												nodeVar3561 = fract( ( vec3( nodeVar3560.x, nodeVar3560.y, nodeVar3560.x ) * vec3( 0.1031 ) ) );
												nodeVar3561 = ( nodeVar3561 + vec3( dot( nodeVar3561, ( nodeVar3561.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3562 = ( nodeVar3555 + vec2( 1.0, 1.0 ) );
												nodeVar3563 = fract( ( vec3( nodeVar3562.x, nodeVar3562.y, nodeVar3562.x ) * vec3( 0.1031 ) ) );
												nodeVar3563 = ( nodeVar3563 + vec3( dot( nodeVar3563, ( nodeVar3563.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3526 = ( nodeVar3526 + ( nodeVar3527 * mix( mix( fract( ( ( nodeVar3557.x + nodeVar3557.y ) * nodeVar3557.z ) ), fract( ( ( nodeVar3559.x + nodeVar3559.y ) * nodeVar3559.z ) ), nodeVar3556.x ), mix( fract( ( ( nodeVar3561.x + nodeVar3561.y ) * nodeVar3561.z ) ), fract( ( ( nodeVar3563.x + nodeVar3563.y ) * nodeVar3563.z ) ), nodeVar3556.x ), nodeVar3556.y ) ) );
												nodeVar3525 = ( nodeVar3525 * vec2( 2.03 ) );
												nodeVar3527 = ( nodeVar3527 * 0.52 );
												nodeVar3564 = ( nodeVar2739 * vec2( 17.0 ) );
												nodeVar3565 = 0.0;
												nodeVar3566 = 0.5;
												nodeVar3567 = floor( nodeVar3564 );
												nodeVar3568 = fract( nodeVar3564 );
												nodeVar3568 = ( ( nodeVar3568 * nodeVar3568 ) * ( vec2( 3.0 ) - ( nodeVar3568 * vec2( 2.0 ) ) ) );
												nodeVar3569 = fract( ( vec3( nodeVar3567.x, nodeVar3567.y, nodeVar3567.x ) * vec3( 0.1031 ) ) );
												nodeVar3569 = ( nodeVar3569 + vec3( dot( nodeVar3569, ( nodeVar3569.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3570 = ( nodeVar3567 + vec2( 1.0, 0.0 ) );
												nodeVar3571 = fract( ( vec3( nodeVar3570.x, nodeVar3570.y, nodeVar3570.x ) * vec3( 0.1031 ) ) );
												nodeVar3571 = ( nodeVar3571 + vec3( dot( nodeVar3571, ( nodeVar3571.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3572 = ( nodeVar3567 + vec2( 0.0, 1.0 ) );
												nodeVar3573 = fract( ( vec3( nodeVar3572.x, nodeVar3572.y, nodeVar3572.x ) * vec3( 0.1031 ) ) );
												nodeVar3573 = ( nodeVar3573 + vec3( dot( nodeVar3573, ( nodeVar3573.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3574 = ( nodeVar3567 + vec2( 1.0, 1.0 ) );
												nodeVar3575 = fract( ( vec3( nodeVar3574.x, nodeVar3574.y, nodeVar3574.x ) * vec3( 0.1031 ) ) );
												nodeVar3575 = ( nodeVar3575 + vec3( dot( nodeVar3575, ( nodeVar3575.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3565 = ( nodeVar3565 + ( nodeVar3566 * mix( mix( fract( ( ( nodeVar3569.x + nodeVar3569.y ) * nodeVar3569.z ) ), fract( ( ( nodeVar3571.x + nodeVar3571.y ) * nodeVar3571.z ) ), nodeVar3568.x ), mix( fract( ( ( nodeVar3573.x + nodeVar3573.y ) * nodeVar3573.z ) ), fract( ( ( nodeVar3575.x + nodeVar3575.y ) * nodeVar3575.z ) ), nodeVar3568.x ), nodeVar3568.y ) ) );
												nodeVar3564 = ( nodeVar3564 * vec2( 2.03 ) );
												nodeVar3566 = ( nodeVar3566 * 0.52 );
												nodeVar3576 = floor( nodeVar3564 );
												nodeVar3577 = fract( nodeVar3564 );
												nodeVar3577 = ( ( nodeVar3577 * nodeVar3577 ) * ( vec2( 3.0 ) - ( nodeVar3577 * vec2( 2.0 ) ) ) );
												nodeVar3578 = fract( ( vec3( nodeVar3576.x, nodeVar3576.y, nodeVar3576.x ) * vec3( 0.1031 ) ) );
												nodeVar3578 = ( nodeVar3578 + vec3( dot( nodeVar3578, ( nodeVar3578.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3579 = ( nodeVar3576 + vec2( 1.0, 0.0 ) );
												nodeVar3580 = fract( ( vec3( nodeVar3579.x, nodeVar3579.y, nodeVar3579.x ) * vec3( 0.1031 ) ) );
												nodeVar3580 = ( nodeVar3580 + vec3( dot( nodeVar3580, ( nodeVar3580.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3581 = ( nodeVar3576 + vec2( 0.0, 1.0 ) );
												nodeVar3582 = fract( ( vec3( nodeVar3581.x, nodeVar3581.y, nodeVar3581.x ) * vec3( 0.1031 ) ) );
												nodeVar3582 = ( nodeVar3582 + vec3( dot( nodeVar3582, ( nodeVar3582.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3583 = ( nodeVar3576 + vec2( 1.0, 1.0 ) );
												nodeVar3584 = fract( ( vec3( nodeVar3583.x, nodeVar3583.y, nodeVar3583.x ) * vec3( 0.1031 ) ) );
												nodeVar3584 = ( nodeVar3584 + vec3( dot( nodeVar3584, ( nodeVar3584.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3565 = ( nodeVar3565 + ( nodeVar3566 * mix( mix( fract( ( ( nodeVar3578.x + nodeVar3578.y ) * nodeVar3578.z ) ), fract( ( ( nodeVar3580.x + nodeVar3580.y ) * nodeVar3580.z ) ), nodeVar3577.x ), mix( fract( ( ( nodeVar3582.x + nodeVar3582.y ) * nodeVar3582.z ) ), fract( ( ( nodeVar3584.x + nodeVar3584.y ) * nodeVar3584.z ) ), nodeVar3577.x ), nodeVar3577.y ) ) );
												nodeVar3564 = ( nodeVar3564 * vec2( 2.03 ) );
												nodeVar3566 = ( nodeVar3566 * 0.52 );
												nodeVar3585 = floor( nodeVar3564 );
												nodeVar3586 = fract( nodeVar3564 );
												nodeVar3586 = ( ( nodeVar3586 * nodeVar3586 ) * ( vec2( 3.0 ) - ( nodeVar3586 * vec2( 2.0 ) ) ) );
												nodeVar3587 = fract( ( vec3( nodeVar3585.x, nodeVar3585.y, nodeVar3585.x ) * vec3( 0.1031 ) ) );
												nodeVar3587 = ( nodeVar3587 + vec3( dot( nodeVar3587, ( nodeVar3587.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3588 = ( nodeVar3585 + vec2( 1.0, 0.0 ) );
												nodeVar3589 = fract( ( vec3( nodeVar3588.x, nodeVar3588.y, nodeVar3588.x ) * vec3( 0.1031 ) ) );
												nodeVar3589 = ( nodeVar3589 + vec3( dot( nodeVar3589, ( nodeVar3589.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3590 = ( nodeVar3585 + vec2( 0.0, 1.0 ) );
												nodeVar3591 = fract( ( vec3( nodeVar3590.x, nodeVar3590.y, nodeVar3590.x ) * vec3( 0.1031 ) ) );
												nodeVar3591 = ( nodeVar3591 + vec3( dot( nodeVar3591, ( nodeVar3591.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3592 = ( nodeVar3585 + vec2( 1.0, 1.0 ) );
												nodeVar3593 = fract( ( vec3( nodeVar3592.x, nodeVar3592.y, nodeVar3592.x ) * vec3( 0.1031 ) ) );
												nodeVar3593 = ( nodeVar3593 + vec3( dot( nodeVar3593, ( nodeVar3593.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3565 = ( nodeVar3565 + ( nodeVar3566 * mix( mix( fract( ( ( nodeVar3587.x + nodeVar3587.y ) * nodeVar3587.z ) ), fract( ( ( nodeVar3589.x + nodeVar3589.y ) * nodeVar3589.z ) ), nodeVar3586.x ), mix( fract( ( ( nodeVar3591.x + nodeVar3591.y ) * nodeVar3591.z ) ), fract( ( ( nodeVar3593.x + nodeVar3593.y ) * nodeVar3593.z ) ), nodeVar3586.x ), nodeVar3586.y ) ) );
												nodeVar3564 = ( nodeVar3564 * vec2( 2.03 ) );
												nodeVar3566 = ( nodeVar3566 * 0.52 );
												nodeVar3594 = floor( nodeVar3564 );
												nodeVar3595 = fract( nodeVar3564 );
												nodeVar3595 = ( ( nodeVar3595 * nodeVar3595 ) * ( vec2( 3.0 ) - ( nodeVar3595 * vec2( 2.0 ) ) ) );
												nodeVar3596 = fract( ( vec3( nodeVar3594.x, nodeVar3594.y, nodeVar3594.x ) * vec3( 0.1031 ) ) );
												nodeVar3596 = ( nodeVar3596 + vec3( dot( nodeVar3596, ( nodeVar3596.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3597 = ( nodeVar3594 + vec2( 1.0, 0.0 ) );
												nodeVar3598 = fract( ( vec3( nodeVar3597.x, nodeVar3597.y, nodeVar3597.x ) * vec3( 0.1031 ) ) );
												nodeVar3598 = ( nodeVar3598 + vec3( dot( nodeVar3598, ( nodeVar3598.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3599 = ( nodeVar3594 + vec2( 0.0, 1.0 ) );
												nodeVar3600 = fract( ( vec3( nodeVar3599.x, nodeVar3599.y, nodeVar3599.x ) * vec3( 0.1031 ) ) );
												nodeVar3600 = ( nodeVar3600 + vec3( dot( nodeVar3600, ( nodeVar3600.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3601 = ( nodeVar3594 + vec2( 1.0, 1.0 ) );
												nodeVar3602 = fract( ( vec3( nodeVar3601.x, nodeVar3601.y, nodeVar3601.x ) * vec3( 0.1031 ) ) );
												nodeVar3602 = ( nodeVar3602 + vec3( dot( nodeVar3602, ( nodeVar3602.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3565 = ( nodeVar3565 + ( nodeVar3566 * mix( mix( fract( ( ( nodeVar3596.x + nodeVar3596.y ) * nodeVar3596.z ) ), fract( ( ( nodeVar3598.x + nodeVar3598.y ) * nodeVar3598.z ) ), nodeVar3595.x ), mix( fract( ( ( nodeVar3600.x + nodeVar3600.y ) * nodeVar3600.z ) ), fract( ( ( nodeVar3602.x + nodeVar3602.y ) * nodeVar3602.z ) ), nodeVar3595.x ), nodeVar3595.y ) ) );
												nodeVar3564 = ( nodeVar3564 * vec2( 2.03 ) );
												nodeVar3566 = ( nodeVar3566 * 0.52 );
												nodeVar3603 = ( ( nodeVar3526 * 0.62 ) + ( nodeVar3565 * 0.38 ) );
												nodeVar2741 = vec3( ( ( nodeVar3603 * 0.52 ) + ( ( 0.5 + ( ( sin( ( nodeVar2739.x * 1300.0 ) ) * sin( ( nodeVar2739.y * 1300.0 ) ) ) * 0.5 ) ) * 0.055 ) ), 1.0, ( 0.34 + ( nodeVar3603 * 0.66 ) ) );
												

											} else {

												nodeVar3604 = ( nodeVar2739 * vec2( 4.0 ) );
												nodeVar3605 = 0.0;
												nodeVar3606 = 0.5;
												nodeVar3607 = floor( nodeVar3604 );
												nodeVar3608 = fract( nodeVar3604 );
												nodeVar3608 = ( ( nodeVar3608 * nodeVar3608 ) * ( vec2( 3.0 ) - ( nodeVar3608 * vec2( 2.0 ) ) ) );
												nodeVar3609 = fract( ( vec3( nodeVar3607.x, nodeVar3607.y, nodeVar3607.x ) * vec3( 0.1031 ) ) );
												nodeVar3609 = ( nodeVar3609 + vec3( dot( nodeVar3609, ( nodeVar3609.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3610 = ( nodeVar3607 + vec2( 1.0, 0.0 ) );
												nodeVar3611 = fract( ( vec3( nodeVar3610.x, nodeVar3610.y, nodeVar3610.x ) * vec3( 0.1031 ) ) );
												nodeVar3611 = ( nodeVar3611 + vec3( dot( nodeVar3611, ( nodeVar3611.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3612 = ( nodeVar3607 + vec2( 0.0, 1.0 ) );
												nodeVar3613 = fract( ( vec3( nodeVar3612.x, nodeVar3612.y, nodeVar3612.x ) * vec3( 0.1031 ) ) );
												nodeVar3613 = ( nodeVar3613 + vec3( dot( nodeVar3613, ( nodeVar3613.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3614 = ( nodeVar3607 + vec2( 1.0, 1.0 ) );
												nodeVar3615 = fract( ( vec3( nodeVar3614.x, nodeVar3614.y, nodeVar3614.x ) * vec3( 0.1031 ) ) );
												nodeVar3615 = ( nodeVar3615 + vec3( dot( nodeVar3615, ( nodeVar3615.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3605 = ( nodeVar3605 + ( nodeVar3606 * mix( mix( fract( ( ( nodeVar3609.x + nodeVar3609.y ) * nodeVar3609.z ) ), fract( ( ( nodeVar3611.x + nodeVar3611.y ) * nodeVar3611.z ) ), nodeVar3608.x ), mix( fract( ( ( nodeVar3613.x + nodeVar3613.y ) * nodeVar3613.z ) ), fract( ( ( nodeVar3615.x + nodeVar3615.y ) * nodeVar3615.z ) ), nodeVar3608.x ), nodeVar3608.y ) ) );
												nodeVar3604 = ( nodeVar3604 * vec2( 2.03 ) );
												nodeVar3606 = ( nodeVar3606 * 0.52 );
												nodeVar3616 = floor( nodeVar3604 );
												nodeVar3617 = fract( nodeVar3604 );
												nodeVar3617 = ( ( nodeVar3617 * nodeVar3617 ) * ( vec2( 3.0 ) - ( nodeVar3617 * vec2( 2.0 ) ) ) );
												nodeVar3618 = fract( ( vec3( nodeVar3616.x, nodeVar3616.y, nodeVar3616.x ) * vec3( 0.1031 ) ) );
												nodeVar3618 = ( nodeVar3618 + vec3( dot( nodeVar3618, ( nodeVar3618.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3619 = ( nodeVar3616 + vec2( 1.0, 0.0 ) );
												nodeVar3620 = fract( ( vec3( nodeVar3619.x, nodeVar3619.y, nodeVar3619.x ) * vec3( 0.1031 ) ) );
												nodeVar3620 = ( nodeVar3620 + vec3( dot( nodeVar3620, ( nodeVar3620.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3621 = ( nodeVar3616 + vec2( 0.0, 1.0 ) );
												nodeVar3622 = fract( ( vec3( nodeVar3621.x, nodeVar3621.y, nodeVar3621.x ) * vec3( 0.1031 ) ) );
												nodeVar3622 = ( nodeVar3622 + vec3( dot( nodeVar3622, ( nodeVar3622.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3623 = ( nodeVar3616 + vec2( 1.0, 1.0 ) );
												nodeVar3624 = fract( ( vec3( nodeVar3623.x, nodeVar3623.y, nodeVar3623.x ) * vec3( 0.1031 ) ) );
												nodeVar3624 = ( nodeVar3624 + vec3( dot( nodeVar3624, ( nodeVar3624.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3605 = ( nodeVar3605 + ( nodeVar3606 * mix( mix( fract( ( ( nodeVar3618.x + nodeVar3618.y ) * nodeVar3618.z ) ), fract( ( ( nodeVar3620.x + nodeVar3620.y ) * nodeVar3620.z ) ), nodeVar3617.x ), mix( fract( ( ( nodeVar3622.x + nodeVar3622.y ) * nodeVar3622.z ) ), fract( ( ( nodeVar3624.x + nodeVar3624.y ) * nodeVar3624.z ) ), nodeVar3617.x ), nodeVar3617.y ) ) );
												nodeVar3604 = ( nodeVar3604 * vec2( 2.03 ) );
												nodeVar3606 = ( nodeVar3606 * 0.52 );
												nodeVar3625 = floor( nodeVar3604 );
												nodeVar3626 = fract( nodeVar3604 );
												nodeVar3626 = ( ( nodeVar3626 * nodeVar3626 ) * ( vec2( 3.0 ) - ( nodeVar3626 * vec2( 2.0 ) ) ) );
												nodeVar3627 = fract( ( vec3( nodeVar3625.x, nodeVar3625.y, nodeVar3625.x ) * vec3( 0.1031 ) ) );
												nodeVar3627 = ( nodeVar3627 + vec3( dot( nodeVar3627, ( nodeVar3627.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3628 = ( nodeVar3625 + vec2( 1.0, 0.0 ) );
												nodeVar3629 = fract( ( vec3( nodeVar3628.x, nodeVar3628.y, nodeVar3628.x ) * vec3( 0.1031 ) ) );
												nodeVar3629 = ( nodeVar3629 + vec3( dot( nodeVar3629, ( nodeVar3629.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3630 = ( nodeVar3625 + vec2( 0.0, 1.0 ) );
												nodeVar3631 = fract( ( vec3( nodeVar3630.x, nodeVar3630.y, nodeVar3630.x ) * vec3( 0.1031 ) ) );
												nodeVar3631 = ( nodeVar3631 + vec3( dot( nodeVar3631, ( nodeVar3631.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3632 = ( nodeVar3625 + vec2( 1.0, 1.0 ) );
												nodeVar3633 = fract( ( vec3( nodeVar3632.x, nodeVar3632.y, nodeVar3632.x ) * vec3( 0.1031 ) ) );
												nodeVar3633 = ( nodeVar3633 + vec3( dot( nodeVar3633, ( nodeVar3633.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3605 = ( nodeVar3605 + ( nodeVar3606 * mix( mix( fract( ( ( nodeVar3627.x + nodeVar3627.y ) * nodeVar3627.z ) ), fract( ( ( nodeVar3629.x + nodeVar3629.y ) * nodeVar3629.z ) ), nodeVar3626.x ), mix( fract( ( ( nodeVar3631.x + nodeVar3631.y ) * nodeVar3631.z ) ), fract( ( ( nodeVar3633.x + nodeVar3633.y ) * nodeVar3633.z ) ), nodeVar3626.x ), nodeVar3626.y ) ) );
												nodeVar3604 = ( nodeVar3604 * vec2( 2.03 ) );
												nodeVar3606 = ( nodeVar3606 * 0.52 );
												nodeVar3634 = floor( nodeVar3604 );
												nodeVar3635 = fract( nodeVar3604 );
												nodeVar3635 = ( ( nodeVar3635 * nodeVar3635 ) * ( vec2( 3.0 ) - ( nodeVar3635 * vec2( 2.0 ) ) ) );
												nodeVar3636 = fract( ( vec3( nodeVar3634.x, nodeVar3634.y, nodeVar3634.x ) * vec3( 0.1031 ) ) );
												nodeVar3636 = ( nodeVar3636 + vec3( dot( nodeVar3636, ( nodeVar3636.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3637 = ( nodeVar3634 + vec2( 1.0, 0.0 ) );
												nodeVar3638 = fract( ( vec3( nodeVar3637.x, nodeVar3637.y, nodeVar3637.x ) * vec3( 0.1031 ) ) );
												nodeVar3638 = ( nodeVar3638 + vec3( dot( nodeVar3638, ( nodeVar3638.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3639 = ( nodeVar3634 + vec2( 0.0, 1.0 ) );
												nodeVar3640 = fract( ( vec3( nodeVar3639.x, nodeVar3639.y, nodeVar3639.x ) * vec3( 0.1031 ) ) );
												nodeVar3640 = ( nodeVar3640 + vec3( dot( nodeVar3640, ( nodeVar3640.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3641 = ( nodeVar3634 + vec2( 1.0, 1.0 ) );
												nodeVar3642 = fract( ( vec3( nodeVar3641.x, nodeVar3641.y, nodeVar3641.x ) * vec3( 0.1031 ) ) );
												nodeVar3642 = ( nodeVar3642 + vec3( dot( nodeVar3642, ( nodeVar3642.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar3605 = ( nodeVar3605 + ( nodeVar3606 * mix( mix( fract( ( ( nodeVar3636.x + nodeVar3636.y ) * nodeVar3636.z ) ), fract( ( ( nodeVar3638.x + nodeVar3638.y ) * nodeVar3638.z ) ), nodeVar3635.x ), mix( fract( ( ( nodeVar3640.x + nodeVar3640.y ) * nodeVar3640.z ) ), fract( ( ( nodeVar3642.x + nodeVar3642.y ) * nodeVar3642.z ) ), nodeVar3635.x ), nodeVar3635.y ) ) );
												nodeVar3604 = ( nodeVar3604 * vec2( 2.03 ) );
												nodeVar3606 = ( nodeVar3606 * 0.52 );
												nodeVar3643 = nodeVar3605;
												nodeVar2741 = vec3( nodeVar3643, 1.0, nodeVar3643 );
												

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

	nodeVar3644 = nodeVar2741;
	nodeVar3645 = nodeVarying8;
	nodeVar3646 = ( nodeVar3645 * vec4( mix( 0.62, 1.0, nodeVar3644.y ) ) );
	DiffuseColor = ( ( nodeVar3646 * vec4( mix( 0.9, 1.1, nodeVar3644.z ) ) ) * nodeVarying8 );
	nodeVar3647 = nodeVar6;
	DiffuseColor.w = ( DiffuseColor.w * nodeUniform6 );
	DiffuseColor.w = 1.0;
	Metalness = nodeUniform7;
	nodeVar3648 = v_positionWorld;
	nodeVar3649 = normalWorld;
	nodeVar3650 = abs( nodeVar3649 );
	nodeVar3651 = vec2( 0.0, 0.0 );

	if ( ( nodeVar3650.y > max( nodeVar3650.x, nodeVar3650.z ) ) ) {

		nodeVar3651 = nodeVar3648.xz;
		

	} else {


		if ( ( nodeVar3650.x > nodeVar3650.z ) ) {

			nodeVar3651 = vec2( nodeVar3648.z, nodeVar3648.y );
			

		} else {

			nodeVar3651 = vec2( nodeVar3648.x, nodeVar3648.y );
			

		}

		

	}

	nodeVar3652 = nodeVar3651;
	nodeVar3653 = floor( nodeVarying7 );
	nodeVar3654 = vec3( 0.0, 1.0, 0.5 );

	if ( ( nodeVar3653 < 0.5 ) ) {

		nodeVar3655 = floor( ( nodeVar3652.y / 0.225 ) );
		nodeVar3656 = fract( ( ( nodeVar3655 * 7.13 ) * 0.1031 ) );
		nodeVar3656 = ( nodeVar3656 * ( nodeVar3656 + 33.33 ) );
		nodeVar3656 = ( nodeVar3656 * ( nodeVar3656 + nodeVar3656 ) );
		nodeVar3657 = ( fract( nodeVar3656 ) * 0.9 );
		nodeVar3658 = fract( ( ( ( nodeVar3655 * 3.7 ) + 11.0 ) * 0.1031 ) );
		nodeVar3658 = ( nodeVar3658 * ( nodeVar3658 + 33.33 ) );
		nodeVar3658 = ( nodeVar3658 * ( nodeVar3658 + nodeVar3658 ) );
		nodeVar3659 = ( 0.42 + ( fract( nodeVar3658 ) * 0.42 ) );
		nodeVar3660 = fract( ( ( nodeVar3652.x + nodeVar3657 ) / nodeVar3659 ) );
		nodeVar3661 = fract( ( nodeVar3652.y / 0.225 ) );
		nodeVar3662 = min( ( min( nodeVar3660, ( 1.0 - nodeVar3660 ) ) * nodeVar3659 ), ( min( nodeVar3661, ( 1.0 - nodeVar3661 ) ) * 0.225 ) );
		nodeVar3663 = smoothstep( 0.0, 0.016, nodeVar3662 );
		nodeVar3664 = ( vec2( floor( ( ( nodeVar3652.x + nodeVar3657 ) / nodeVar3659 ) ), nodeVar3655 ) * vec2( 1.37 ) );
		nodeVar3665 = fract( ( vec3( nodeVar3664.x, nodeVar3664.y, nodeVar3664.x ) * vec3( 0.1031 ) ) );
		nodeVar3665 = ( nodeVar3665 + vec3( dot( nodeVar3665, ( nodeVar3665.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3666 = fract( ( ( nodeVar3665.x + nodeVar3665.y ) * nodeVar3665.z ) );
		nodeVar3667 = ( ( nodeVar3652 * vec2( 22.0 ) ) + vec2( ( nodeVar3666 * 30.0 ) ) );
		nodeVar3668 = 0.0;
		nodeVar3669 = 0.5;
		nodeVar3670 = floor( nodeVar3667 );
		nodeVar3671 = fract( nodeVar3667 );
		nodeVar3671 = ( ( nodeVar3671 * nodeVar3671 ) * ( vec2( 3.0 ) - ( nodeVar3671 * vec2( 2.0 ) ) ) );
		nodeVar3672 = fract( ( vec3( nodeVar3670.x, nodeVar3670.y, nodeVar3670.x ) * vec3( 0.1031 ) ) );
		nodeVar3672 = ( nodeVar3672 + vec3( dot( nodeVar3672, ( nodeVar3672.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3673 = ( nodeVar3670 + vec2( 1.0, 0.0 ) );
		nodeVar3674 = fract( ( vec3( nodeVar3673.x, nodeVar3673.y, nodeVar3673.x ) * vec3( 0.1031 ) ) );
		nodeVar3674 = ( nodeVar3674 + vec3( dot( nodeVar3674, ( nodeVar3674.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3675 = ( nodeVar3670 + vec2( 0.0, 1.0 ) );
		nodeVar3676 = fract( ( vec3( nodeVar3675.x, nodeVar3675.y, nodeVar3675.x ) * vec3( 0.1031 ) ) );
		nodeVar3676 = ( nodeVar3676 + vec3( dot( nodeVar3676, ( nodeVar3676.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3677 = ( nodeVar3670 + vec2( 1.0, 1.0 ) );
		nodeVar3678 = fract( ( vec3( nodeVar3677.x, nodeVar3677.y, nodeVar3677.x ) * vec3( 0.1031 ) ) );
		nodeVar3678 = ( nodeVar3678 + vec3( dot( nodeVar3678, ( nodeVar3678.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3668 = ( nodeVar3668 + ( nodeVar3669 * mix( mix( fract( ( ( nodeVar3672.x + nodeVar3672.y ) * nodeVar3672.z ) ), fract( ( ( nodeVar3674.x + nodeVar3674.y ) * nodeVar3674.z ) ), nodeVar3671.x ), mix( fract( ( ( nodeVar3676.x + nodeVar3676.y ) * nodeVar3676.z ) ), fract( ( ( nodeVar3678.x + nodeVar3678.y ) * nodeVar3678.z ) ), nodeVar3671.x ), nodeVar3671.y ) ) );
		nodeVar3667 = ( nodeVar3667 * vec2( 2.03 ) );
		nodeVar3669 = ( nodeVar3669 * 0.52 );
		nodeVar3679 = floor( nodeVar3667 );
		nodeVar3680 = fract( nodeVar3667 );
		nodeVar3680 = ( ( nodeVar3680 * nodeVar3680 ) * ( vec2( 3.0 ) - ( nodeVar3680 * vec2( 2.0 ) ) ) );
		nodeVar3681 = fract( ( vec3( nodeVar3679.x, nodeVar3679.y, nodeVar3679.x ) * vec3( 0.1031 ) ) );
		nodeVar3681 = ( nodeVar3681 + vec3( dot( nodeVar3681, ( nodeVar3681.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3682 = ( nodeVar3679 + vec2( 1.0, 0.0 ) );
		nodeVar3683 = fract( ( vec3( nodeVar3682.x, nodeVar3682.y, nodeVar3682.x ) * vec3( 0.1031 ) ) );
		nodeVar3683 = ( nodeVar3683 + vec3( dot( nodeVar3683, ( nodeVar3683.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3684 = ( nodeVar3679 + vec2( 0.0, 1.0 ) );
		nodeVar3685 = fract( ( vec3( nodeVar3684.x, nodeVar3684.y, nodeVar3684.x ) * vec3( 0.1031 ) ) );
		nodeVar3685 = ( nodeVar3685 + vec3( dot( nodeVar3685, ( nodeVar3685.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3686 = ( nodeVar3679 + vec2( 1.0, 1.0 ) );
		nodeVar3687 = fract( ( vec3( nodeVar3686.x, nodeVar3686.y, nodeVar3686.x ) * vec3( 0.1031 ) ) );
		nodeVar3687 = ( nodeVar3687 + vec3( dot( nodeVar3687, ( nodeVar3687.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3668 = ( nodeVar3668 + ( nodeVar3669 * mix( mix( fract( ( ( nodeVar3681.x + nodeVar3681.y ) * nodeVar3681.z ) ), fract( ( ( nodeVar3683.x + nodeVar3683.y ) * nodeVar3683.z ) ), nodeVar3680.x ), mix( fract( ( ( nodeVar3685.x + nodeVar3685.y ) * nodeVar3685.z ) ), fract( ( ( nodeVar3687.x + nodeVar3687.y ) * nodeVar3687.z ) ), nodeVar3680.x ), nodeVar3680.y ) ) );
		nodeVar3667 = ( nodeVar3667 * vec2( 2.03 ) );
		nodeVar3669 = ( nodeVar3669 * 0.52 );
		nodeVar3688 = floor( nodeVar3667 );
		nodeVar3689 = fract( nodeVar3667 );
		nodeVar3689 = ( ( nodeVar3689 * nodeVar3689 ) * ( vec2( 3.0 ) - ( nodeVar3689 * vec2( 2.0 ) ) ) );
		nodeVar3690 = fract( ( vec3( nodeVar3688.x, nodeVar3688.y, nodeVar3688.x ) * vec3( 0.1031 ) ) );
		nodeVar3690 = ( nodeVar3690 + vec3( dot( nodeVar3690, ( nodeVar3690.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3691 = ( nodeVar3688 + vec2( 1.0, 0.0 ) );
		nodeVar3692 = fract( ( vec3( nodeVar3691.x, nodeVar3691.y, nodeVar3691.x ) * vec3( 0.1031 ) ) );
		nodeVar3692 = ( nodeVar3692 + vec3( dot( nodeVar3692, ( nodeVar3692.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3693 = ( nodeVar3688 + vec2( 0.0, 1.0 ) );
		nodeVar3694 = fract( ( vec3( nodeVar3693.x, nodeVar3693.y, nodeVar3693.x ) * vec3( 0.1031 ) ) );
		nodeVar3694 = ( nodeVar3694 + vec3( dot( nodeVar3694, ( nodeVar3694.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3695 = ( nodeVar3688 + vec2( 1.0, 1.0 ) );
		nodeVar3696 = fract( ( vec3( nodeVar3695.x, nodeVar3695.y, nodeVar3695.x ) * vec3( 0.1031 ) ) );
		nodeVar3696 = ( nodeVar3696 + vec3( dot( nodeVar3696, ( nodeVar3696.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3668 = ( nodeVar3668 + ( nodeVar3669 * mix( mix( fract( ( ( nodeVar3690.x + nodeVar3690.y ) * nodeVar3690.z ) ), fract( ( ( nodeVar3692.x + nodeVar3692.y ) * nodeVar3692.z ) ), nodeVar3689.x ), mix( fract( ( ( nodeVar3694.x + nodeVar3694.y ) * nodeVar3694.z ) ), fract( ( ( nodeVar3696.x + nodeVar3696.y ) * nodeVar3696.z ) ), nodeVar3689.x ), nodeVar3689.y ) ) );
		nodeVar3667 = ( nodeVar3667 * vec2( 2.03 ) );
		nodeVar3669 = ( nodeVar3669 * 0.52 );
		nodeVar3697 = floor( nodeVar3667 );
		nodeVar3698 = fract( nodeVar3667 );
		nodeVar3698 = ( ( nodeVar3698 * nodeVar3698 ) * ( vec2( 3.0 ) - ( nodeVar3698 * vec2( 2.0 ) ) ) );
		nodeVar3699 = fract( ( vec3( nodeVar3697.x, nodeVar3697.y, nodeVar3697.x ) * vec3( 0.1031 ) ) );
		nodeVar3699 = ( nodeVar3699 + vec3( dot( nodeVar3699, ( nodeVar3699.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3700 = ( nodeVar3697 + vec2( 1.0, 0.0 ) );
		nodeVar3701 = fract( ( vec3( nodeVar3700.x, nodeVar3700.y, nodeVar3700.x ) * vec3( 0.1031 ) ) );
		nodeVar3701 = ( nodeVar3701 + vec3( dot( nodeVar3701, ( nodeVar3701.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3702 = ( nodeVar3697 + vec2( 0.0, 1.0 ) );
		nodeVar3703 = fract( ( vec3( nodeVar3702.x, nodeVar3702.y, nodeVar3702.x ) * vec3( 0.1031 ) ) );
		nodeVar3703 = ( nodeVar3703 + vec3( dot( nodeVar3703, ( nodeVar3703.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3704 = ( nodeVar3697 + vec2( 1.0, 1.0 ) );
		nodeVar3705 = fract( ( vec3( nodeVar3704.x, nodeVar3704.y, nodeVar3704.x ) * vec3( 0.1031 ) ) );
		nodeVar3705 = ( nodeVar3705 + vec3( dot( nodeVar3705, ( nodeVar3705.yzx + vec3( 33.33 ) ) ) ) );
		nodeVar3668 = ( nodeVar3668 + ( nodeVar3669 * mix( mix( fract( ( ( nodeVar3699.x + nodeVar3699.y ) * nodeVar3699.z ) ), fract( ( ( nodeVar3701.x + nodeVar3701.y ) * nodeVar3701.z ) ), nodeVar3698.x ), mix( fract( ( ( nodeVar3703.x + nodeVar3703.y ) * nodeVar3703.z ) ), fract( ( ( nodeVar3705.x + nodeVar3705.y ) * nodeVar3705.z ) ), nodeVar3698.x ), nodeVar3698.y ) ) );
		nodeVar3667 = ( nodeVar3667 * vec2( 2.03 ) );
		nodeVar3669 = ( nodeVar3669 * 0.52 );
		nodeVar3654 = vec3( ( ( ( nodeVar3663 * ( 0.55 + ( nodeVar3666 * 0.45 ) ) ) * 0.55 ) + ( ( ( 0.55 + ( nodeVar3668 * 0.45 ) ) * 0.3 ) * nodeVar3663 ) ), nodeVar3663, nodeVar3666 );
		

	} else {


		if ( ( nodeVar3653 < 1.5 ) ) {

			nodeVar3706 = ( nodeVar3652 * vec2( 3.2 ) );
			nodeVar3707 = 0.0;
			nodeVar3708 = 0.5;
			nodeVar3709 = floor( nodeVar3706 );
			nodeVar3710 = fract( nodeVar3706 );
			nodeVar3710 = ( ( nodeVar3710 * nodeVar3710 ) * ( vec2( 3.0 ) - ( nodeVar3710 * vec2( 2.0 ) ) ) );
			nodeVar3711 = fract( ( vec3( nodeVar3709.x, nodeVar3709.y, nodeVar3709.x ) * vec3( 0.1031 ) ) );
			nodeVar3711 = ( nodeVar3711 + vec3( dot( nodeVar3711, ( nodeVar3711.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3712 = ( nodeVar3709 + vec2( 1.0, 0.0 ) );
			nodeVar3713 = fract( ( vec3( nodeVar3712.x, nodeVar3712.y, nodeVar3712.x ) * vec3( 0.1031 ) ) );
			nodeVar3713 = ( nodeVar3713 + vec3( dot( nodeVar3713, ( nodeVar3713.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3714 = ( nodeVar3709 + vec2( 0.0, 1.0 ) );
			nodeVar3715 = fract( ( vec3( nodeVar3714.x, nodeVar3714.y, nodeVar3714.x ) * vec3( 0.1031 ) ) );
			nodeVar3715 = ( nodeVar3715 + vec3( dot( nodeVar3715, ( nodeVar3715.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3716 = ( nodeVar3709 + vec2( 1.0, 1.0 ) );
			nodeVar3717 = fract( ( vec3( nodeVar3716.x, nodeVar3716.y, nodeVar3716.x ) * vec3( 0.1031 ) ) );
			nodeVar3717 = ( nodeVar3717 + vec3( dot( nodeVar3717, ( nodeVar3717.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3707 = ( nodeVar3707 + ( nodeVar3708 * mix( mix( fract( ( ( nodeVar3711.x + nodeVar3711.y ) * nodeVar3711.z ) ), fract( ( ( nodeVar3713.x + nodeVar3713.y ) * nodeVar3713.z ) ), nodeVar3710.x ), mix( fract( ( ( nodeVar3715.x + nodeVar3715.y ) * nodeVar3715.z ) ), fract( ( ( nodeVar3717.x + nodeVar3717.y ) * nodeVar3717.z ) ), nodeVar3710.x ), nodeVar3710.y ) ) );
			nodeVar3706 = ( nodeVar3706 * vec2( 2.03 ) );
			nodeVar3708 = ( nodeVar3708 * 0.52 );
			nodeVar3718 = floor( nodeVar3706 );
			nodeVar3719 = fract( nodeVar3706 );
			nodeVar3719 = ( ( nodeVar3719 * nodeVar3719 ) * ( vec2( 3.0 ) - ( nodeVar3719 * vec2( 2.0 ) ) ) );
			nodeVar3720 = fract( ( vec3( nodeVar3718.x, nodeVar3718.y, nodeVar3718.x ) * vec3( 0.1031 ) ) );
			nodeVar3720 = ( nodeVar3720 + vec3( dot( nodeVar3720, ( nodeVar3720.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3721 = ( nodeVar3718 + vec2( 1.0, 0.0 ) );
			nodeVar3722 = fract( ( vec3( nodeVar3721.x, nodeVar3721.y, nodeVar3721.x ) * vec3( 0.1031 ) ) );
			nodeVar3722 = ( nodeVar3722 + vec3( dot( nodeVar3722, ( nodeVar3722.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3723 = ( nodeVar3718 + vec2( 0.0, 1.0 ) );
			nodeVar3724 = fract( ( vec3( nodeVar3723.x, nodeVar3723.y, nodeVar3723.x ) * vec3( 0.1031 ) ) );
			nodeVar3724 = ( nodeVar3724 + vec3( dot( nodeVar3724, ( nodeVar3724.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3725 = ( nodeVar3718 + vec2( 1.0, 1.0 ) );
			nodeVar3726 = fract( ( vec3( nodeVar3725.x, nodeVar3725.y, nodeVar3725.x ) * vec3( 0.1031 ) ) );
			nodeVar3726 = ( nodeVar3726 + vec3( dot( nodeVar3726, ( nodeVar3726.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3707 = ( nodeVar3707 + ( nodeVar3708 * mix( mix( fract( ( ( nodeVar3720.x + nodeVar3720.y ) * nodeVar3720.z ) ), fract( ( ( nodeVar3722.x + nodeVar3722.y ) * nodeVar3722.z ) ), nodeVar3719.x ), mix( fract( ( ( nodeVar3724.x + nodeVar3724.y ) * nodeVar3724.z ) ), fract( ( ( nodeVar3726.x + nodeVar3726.y ) * nodeVar3726.z ) ), nodeVar3719.x ), nodeVar3719.y ) ) );
			nodeVar3706 = ( nodeVar3706 * vec2( 2.03 ) );
			nodeVar3708 = ( nodeVar3708 * 0.52 );
			nodeVar3727 = floor( nodeVar3706 );
			nodeVar3728 = fract( nodeVar3706 );
			nodeVar3728 = ( ( nodeVar3728 * nodeVar3728 ) * ( vec2( 3.0 ) - ( nodeVar3728 * vec2( 2.0 ) ) ) );
			nodeVar3729 = fract( ( vec3( nodeVar3727.x, nodeVar3727.y, nodeVar3727.x ) * vec3( 0.1031 ) ) );
			nodeVar3729 = ( nodeVar3729 + vec3( dot( nodeVar3729, ( nodeVar3729.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3730 = ( nodeVar3727 + vec2( 1.0, 0.0 ) );
			nodeVar3731 = fract( ( vec3( nodeVar3730.x, nodeVar3730.y, nodeVar3730.x ) * vec3( 0.1031 ) ) );
			nodeVar3731 = ( nodeVar3731 + vec3( dot( nodeVar3731, ( nodeVar3731.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3732 = ( nodeVar3727 + vec2( 0.0, 1.0 ) );
			nodeVar3733 = fract( ( vec3( nodeVar3732.x, nodeVar3732.y, nodeVar3732.x ) * vec3( 0.1031 ) ) );
			nodeVar3733 = ( nodeVar3733 + vec3( dot( nodeVar3733, ( nodeVar3733.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3734 = ( nodeVar3727 + vec2( 1.0, 1.0 ) );
			nodeVar3735 = fract( ( vec3( nodeVar3734.x, nodeVar3734.y, nodeVar3734.x ) * vec3( 0.1031 ) ) );
			nodeVar3735 = ( nodeVar3735 + vec3( dot( nodeVar3735, ( nodeVar3735.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3707 = ( nodeVar3707 + ( nodeVar3708 * mix( mix( fract( ( ( nodeVar3729.x + nodeVar3729.y ) * nodeVar3729.z ) ), fract( ( ( nodeVar3731.x + nodeVar3731.y ) * nodeVar3731.z ) ), nodeVar3728.x ), mix( fract( ( ( nodeVar3733.x + nodeVar3733.y ) * nodeVar3733.z ) ), fract( ( ( nodeVar3735.x + nodeVar3735.y ) * nodeVar3735.z ) ), nodeVar3728.x ), nodeVar3728.y ) ) );
			nodeVar3706 = ( nodeVar3706 * vec2( 2.03 ) );
			nodeVar3708 = ( nodeVar3708 * 0.52 );
			nodeVar3736 = floor( nodeVar3706 );
			nodeVar3737 = fract( nodeVar3706 );
			nodeVar3737 = ( ( nodeVar3737 * nodeVar3737 ) * ( vec2( 3.0 ) - ( nodeVar3737 * vec2( 2.0 ) ) ) );
			nodeVar3738 = fract( ( vec3( nodeVar3736.x, nodeVar3736.y, nodeVar3736.x ) * vec3( 0.1031 ) ) );
			nodeVar3738 = ( nodeVar3738 + vec3( dot( nodeVar3738, ( nodeVar3738.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3739 = ( nodeVar3736 + vec2( 1.0, 0.0 ) );
			nodeVar3740 = fract( ( vec3( nodeVar3739.x, nodeVar3739.y, nodeVar3739.x ) * vec3( 0.1031 ) ) );
			nodeVar3740 = ( nodeVar3740 + vec3( dot( nodeVar3740, ( nodeVar3740.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3741 = ( nodeVar3736 + vec2( 0.0, 1.0 ) );
			nodeVar3742 = fract( ( vec3( nodeVar3741.x, nodeVar3741.y, nodeVar3741.x ) * vec3( 0.1031 ) ) );
			nodeVar3742 = ( nodeVar3742 + vec3( dot( nodeVar3742, ( nodeVar3742.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3743 = ( nodeVar3736 + vec2( 1.0, 1.0 ) );
			nodeVar3744 = fract( ( vec3( nodeVar3743.x, nodeVar3743.y, nodeVar3743.x ) * vec3( 0.1031 ) ) );
			nodeVar3744 = ( nodeVar3744 + vec3( dot( nodeVar3744, ( nodeVar3744.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3707 = ( nodeVar3707 + ( nodeVar3708 * mix( mix( fract( ( ( nodeVar3738.x + nodeVar3738.y ) * nodeVar3738.z ) ), fract( ( ( nodeVar3740.x + nodeVar3740.y ) * nodeVar3740.z ) ), nodeVar3737.x ), mix( fract( ( ( nodeVar3742.x + nodeVar3742.y ) * nodeVar3742.z ) ), fract( ( ( nodeVar3744.x + nodeVar3744.y ) * nodeVar3744.z ) ), nodeVar3737.x ), nodeVar3737.y ) ) );
			nodeVar3706 = ( nodeVar3706 * vec2( 2.03 ) );
			nodeVar3708 = ( nodeVar3708 * 0.52 );
			nodeVar3745 = ( nodeVar3652 * vec2( 14.0 ) );
			nodeVar3746 = 0.0;
			nodeVar3747 = 0.5;
			nodeVar3748 = floor( nodeVar3745 );
			nodeVar3749 = fract( nodeVar3745 );
			nodeVar3749 = ( ( nodeVar3749 * nodeVar3749 ) * ( vec2( 3.0 ) - ( nodeVar3749 * vec2( 2.0 ) ) ) );
			nodeVar3750 = fract( ( vec3( nodeVar3748.x, nodeVar3748.y, nodeVar3748.x ) * vec3( 0.1031 ) ) );
			nodeVar3750 = ( nodeVar3750 + vec3( dot( nodeVar3750, ( nodeVar3750.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3751 = ( nodeVar3748 + vec2( 1.0, 0.0 ) );
			nodeVar3752 = fract( ( vec3( nodeVar3751.x, nodeVar3751.y, nodeVar3751.x ) * vec3( 0.1031 ) ) );
			nodeVar3752 = ( nodeVar3752 + vec3( dot( nodeVar3752, ( nodeVar3752.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3753 = ( nodeVar3748 + vec2( 0.0, 1.0 ) );
			nodeVar3754 = fract( ( vec3( nodeVar3753.x, nodeVar3753.y, nodeVar3753.x ) * vec3( 0.1031 ) ) );
			nodeVar3754 = ( nodeVar3754 + vec3( dot( nodeVar3754, ( nodeVar3754.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3755 = ( nodeVar3748 + vec2( 1.0, 1.0 ) );
			nodeVar3756 = fract( ( vec3( nodeVar3755.x, nodeVar3755.y, nodeVar3755.x ) * vec3( 0.1031 ) ) );
			nodeVar3756 = ( nodeVar3756 + vec3( dot( nodeVar3756, ( nodeVar3756.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3746 = ( nodeVar3746 + ( nodeVar3747 * mix( mix( fract( ( ( nodeVar3750.x + nodeVar3750.y ) * nodeVar3750.z ) ), fract( ( ( nodeVar3752.x + nodeVar3752.y ) * nodeVar3752.z ) ), nodeVar3749.x ), mix( fract( ( ( nodeVar3754.x + nodeVar3754.y ) * nodeVar3754.z ) ), fract( ( ( nodeVar3756.x + nodeVar3756.y ) * nodeVar3756.z ) ), nodeVar3749.x ), nodeVar3749.y ) ) );
			nodeVar3745 = ( nodeVar3745 * vec2( 2.03 ) );
			nodeVar3747 = ( nodeVar3747 * 0.52 );
			nodeVar3757 = floor( nodeVar3745 );
			nodeVar3758 = fract( nodeVar3745 );
			nodeVar3758 = ( ( nodeVar3758 * nodeVar3758 ) * ( vec2( 3.0 ) - ( nodeVar3758 * vec2( 2.0 ) ) ) );
			nodeVar3759 = fract( ( vec3( nodeVar3757.x, nodeVar3757.y, nodeVar3757.x ) * vec3( 0.1031 ) ) );
			nodeVar3759 = ( nodeVar3759 + vec3( dot( nodeVar3759, ( nodeVar3759.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3760 = ( nodeVar3757 + vec2( 1.0, 0.0 ) );
			nodeVar3761 = fract( ( vec3( nodeVar3760.x, nodeVar3760.y, nodeVar3760.x ) * vec3( 0.1031 ) ) );
			nodeVar3761 = ( nodeVar3761 + vec3( dot( nodeVar3761, ( nodeVar3761.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3762 = ( nodeVar3757 + vec2( 0.0, 1.0 ) );
			nodeVar3763 = fract( ( vec3( nodeVar3762.x, nodeVar3762.y, nodeVar3762.x ) * vec3( 0.1031 ) ) );
			nodeVar3763 = ( nodeVar3763 + vec3( dot( nodeVar3763, ( nodeVar3763.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3764 = ( nodeVar3757 + vec2( 1.0, 1.0 ) );
			nodeVar3765 = fract( ( vec3( nodeVar3764.x, nodeVar3764.y, nodeVar3764.x ) * vec3( 0.1031 ) ) );
			nodeVar3765 = ( nodeVar3765 + vec3( dot( nodeVar3765, ( nodeVar3765.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3746 = ( nodeVar3746 + ( nodeVar3747 * mix( mix( fract( ( ( nodeVar3759.x + nodeVar3759.y ) * nodeVar3759.z ) ), fract( ( ( nodeVar3761.x + nodeVar3761.y ) * nodeVar3761.z ) ), nodeVar3758.x ), mix( fract( ( ( nodeVar3763.x + nodeVar3763.y ) * nodeVar3763.z ) ), fract( ( ( nodeVar3765.x + nodeVar3765.y ) * nodeVar3765.z ) ), nodeVar3758.x ), nodeVar3758.y ) ) );
			nodeVar3745 = ( nodeVar3745 * vec2( 2.03 ) );
			nodeVar3747 = ( nodeVar3747 * 0.52 );
			nodeVar3766 = floor( nodeVar3745 );
			nodeVar3767 = fract( nodeVar3745 );
			nodeVar3767 = ( ( nodeVar3767 * nodeVar3767 ) * ( vec2( 3.0 ) - ( nodeVar3767 * vec2( 2.0 ) ) ) );
			nodeVar3768 = fract( ( vec3( nodeVar3766.x, nodeVar3766.y, nodeVar3766.x ) * vec3( 0.1031 ) ) );
			nodeVar3768 = ( nodeVar3768 + vec3( dot( nodeVar3768, ( nodeVar3768.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3769 = ( nodeVar3766 + vec2( 1.0, 0.0 ) );
			nodeVar3770 = fract( ( vec3( nodeVar3769.x, nodeVar3769.y, nodeVar3769.x ) * vec3( 0.1031 ) ) );
			nodeVar3770 = ( nodeVar3770 + vec3( dot( nodeVar3770, ( nodeVar3770.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3771 = ( nodeVar3766 + vec2( 0.0, 1.0 ) );
			nodeVar3772 = fract( ( vec3( nodeVar3771.x, nodeVar3771.y, nodeVar3771.x ) * vec3( 0.1031 ) ) );
			nodeVar3772 = ( nodeVar3772 + vec3( dot( nodeVar3772, ( nodeVar3772.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3773 = ( nodeVar3766 + vec2( 1.0, 1.0 ) );
			nodeVar3774 = fract( ( vec3( nodeVar3773.x, nodeVar3773.y, nodeVar3773.x ) * vec3( 0.1031 ) ) );
			nodeVar3774 = ( nodeVar3774 + vec3( dot( nodeVar3774, ( nodeVar3774.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3746 = ( nodeVar3746 + ( nodeVar3747 * mix( mix( fract( ( ( nodeVar3768.x + nodeVar3768.y ) * nodeVar3768.z ) ), fract( ( ( nodeVar3770.x + nodeVar3770.y ) * nodeVar3770.z ) ), nodeVar3767.x ), mix( fract( ( ( nodeVar3772.x + nodeVar3772.y ) * nodeVar3772.z ) ), fract( ( ( nodeVar3774.x + nodeVar3774.y ) * nodeVar3774.z ) ), nodeVar3767.x ), nodeVar3767.y ) ) );
			nodeVar3745 = ( nodeVar3745 * vec2( 2.03 ) );
			nodeVar3747 = ( nodeVar3747 * 0.52 );
			nodeVar3775 = floor( nodeVar3745 );
			nodeVar3776 = fract( nodeVar3745 );
			nodeVar3776 = ( ( nodeVar3776 * nodeVar3776 ) * ( vec2( 3.0 ) - ( nodeVar3776 * vec2( 2.0 ) ) ) );
			nodeVar3777 = fract( ( vec3( nodeVar3775.x, nodeVar3775.y, nodeVar3775.x ) * vec3( 0.1031 ) ) );
			nodeVar3777 = ( nodeVar3777 + vec3( dot( nodeVar3777, ( nodeVar3777.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3778 = ( nodeVar3775 + vec2( 1.0, 0.0 ) );
			nodeVar3779 = fract( ( vec3( nodeVar3778.x, nodeVar3778.y, nodeVar3778.x ) * vec3( 0.1031 ) ) );
			nodeVar3779 = ( nodeVar3779 + vec3( dot( nodeVar3779, ( nodeVar3779.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3780 = ( nodeVar3775 + vec2( 0.0, 1.0 ) );
			nodeVar3781 = fract( ( vec3( nodeVar3780.x, nodeVar3780.y, nodeVar3780.x ) * vec3( 0.1031 ) ) );
			nodeVar3781 = ( nodeVar3781 + vec3( dot( nodeVar3781, ( nodeVar3781.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3782 = ( nodeVar3775 + vec2( 1.0, 1.0 ) );
			nodeVar3783 = fract( ( vec3( nodeVar3782.x, nodeVar3782.y, nodeVar3782.x ) * vec3( 0.1031 ) ) );
			nodeVar3783 = ( nodeVar3783 + vec3( dot( nodeVar3783, ( nodeVar3783.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3746 = ( nodeVar3746 + ( nodeVar3747 * mix( mix( fract( ( ( nodeVar3777.x + nodeVar3777.y ) * nodeVar3777.z ) ), fract( ( ( nodeVar3779.x + nodeVar3779.y ) * nodeVar3779.z ) ), nodeVar3776.x ), mix( fract( ( ( nodeVar3781.x + nodeVar3781.y ) * nodeVar3781.z ) ), fract( ( ( nodeVar3783.x + nodeVar3783.y ) * nodeVar3783.z ) ), nodeVar3776.x ), nodeVar3776.y ) ) );
			nodeVar3745 = ( nodeVar3745 * vec2( 2.03 ) );
			nodeVar3747 = ( nodeVar3747 * 0.52 );
			nodeVar3784 = ( nodeVar3652 * vec2( 46.0 ) );
			nodeVar3785 = 0.0;
			nodeVar3786 = 0.5;
			nodeVar3787 = floor( nodeVar3784 );
			nodeVar3788 = fract( nodeVar3784 );
			nodeVar3788 = ( ( nodeVar3788 * nodeVar3788 ) * ( vec2( 3.0 ) - ( nodeVar3788 * vec2( 2.0 ) ) ) );
			nodeVar3789 = fract( ( vec3( nodeVar3787.x, nodeVar3787.y, nodeVar3787.x ) * vec3( 0.1031 ) ) );
			nodeVar3789 = ( nodeVar3789 + vec3( dot( nodeVar3789, ( nodeVar3789.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3790 = ( nodeVar3787 + vec2( 1.0, 0.0 ) );
			nodeVar3791 = fract( ( vec3( nodeVar3790.x, nodeVar3790.y, nodeVar3790.x ) * vec3( 0.1031 ) ) );
			nodeVar3791 = ( nodeVar3791 + vec3( dot( nodeVar3791, ( nodeVar3791.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3792 = ( nodeVar3787 + vec2( 0.0, 1.0 ) );
			nodeVar3793 = fract( ( vec3( nodeVar3792.x, nodeVar3792.y, nodeVar3792.x ) * vec3( 0.1031 ) ) );
			nodeVar3793 = ( nodeVar3793 + vec3( dot( nodeVar3793, ( nodeVar3793.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3794 = ( nodeVar3787 + vec2( 1.0, 1.0 ) );
			nodeVar3795 = fract( ( vec3( nodeVar3794.x, nodeVar3794.y, nodeVar3794.x ) * vec3( 0.1031 ) ) );
			nodeVar3795 = ( nodeVar3795 + vec3( dot( nodeVar3795, ( nodeVar3795.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3785 = ( nodeVar3785 + ( nodeVar3786 * mix( mix( fract( ( ( nodeVar3789.x + nodeVar3789.y ) * nodeVar3789.z ) ), fract( ( ( nodeVar3791.x + nodeVar3791.y ) * nodeVar3791.z ) ), nodeVar3788.x ), mix( fract( ( ( nodeVar3793.x + nodeVar3793.y ) * nodeVar3793.z ) ), fract( ( ( nodeVar3795.x + nodeVar3795.y ) * nodeVar3795.z ) ), nodeVar3788.x ), nodeVar3788.y ) ) );
			nodeVar3784 = ( nodeVar3784 * vec2( 2.03 ) );
			nodeVar3786 = ( nodeVar3786 * 0.52 );
			nodeVar3796 = floor( nodeVar3784 );
			nodeVar3797 = fract( nodeVar3784 );
			nodeVar3797 = ( ( nodeVar3797 * nodeVar3797 ) * ( vec2( 3.0 ) - ( nodeVar3797 * vec2( 2.0 ) ) ) );
			nodeVar3798 = fract( ( vec3( nodeVar3796.x, nodeVar3796.y, nodeVar3796.x ) * vec3( 0.1031 ) ) );
			nodeVar3798 = ( nodeVar3798 + vec3( dot( nodeVar3798, ( nodeVar3798.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3799 = ( nodeVar3796 + vec2( 1.0, 0.0 ) );
			nodeVar3800 = fract( ( vec3( nodeVar3799.x, nodeVar3799.y, nodeVar3799.x ) * vec3( 0.1031 ) ) );
			nodeVar3800 = ( nodeVar3800 + vec3( dot( nodeVar3800, ( nodeVar3800.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3801 = ( nodeVar3796 + vec2( 0.0, 1.0 ) );
			nodeVar3802 = fract( ( vec3( nodeVar3801.x, nodeVar3801.y, nodeVar3801.x ) * vec3( 0.1031 ) ) );
			nodeVar3802 = ( nodeVar3802 + vec3( dot( nodeVar3802, ( nodeVar3802.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3803 = ( nodeVar3796 + vec2( 1.0, 1.0 ) );
			nodeVar3804 = fract( ( vec3( nodeVar3803.x, nodeVar3803.y, nodeVar3803.x ) * vec3( 0.1031 ) ) );
			nodeVar3804 = ( nodeVar3804 + vec3( dot( nodeVar3804, ( nodeVar3804.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3785 = ( nodeVar3785 + ( nodeVar3786 * mix( mix( fract( ( ( nodeVar3798.x + nodeVar3798.y ) * nodeVar3798.z ) ), fract( ( ( nodeVar3800.x + nodeVar3800.y ) * nodeVar3800.z ) ), nodeVar3797.x ), mix( fract( ( ( nodeVar3802.x + nodeVar3802.y ) * nodeVar3802.z ) ), fract( ( ( nodeVar3804.x + nodeVar3804.y ) * nodeVar3804.z ) ), nodeVar3797.x ), nodeVar3797.y ) ) );
			nodeVar3784 = ( nodeVar3784 * vec2( 2.03 ) );
			nodeVar3786 = ( nodeVar3786 * 0.52 );
			nodeVar3805 = floor( nodeVar3784 );
			nodeVar3806 = fract( nodeVar3784 );
			nodeVar3806 = ( ( nodeVar3806 * nodeVar3806 ) * ( vec2( 3.0 ) - ( nodeVar3806 * vec2( 2.0 ) ) ) );
			nodeVar3807 = fract( ( vec3( nodeVar3805.x, nodeVar3805.y, nodeVar3805.x ) * vec3( 0.1031 ) ) );
			nodeVar3807 = ( nodeVar3807 + vec3( dot( nodeVar3807, ( nodeVar3807.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3808 = ( nodeVar3805 + vec2( 1.0, 0.0 ) );
			nodeVar3809 = fract( ( vec3( nodeVar3808.x, nodeVar3808.y, nodeVar3808.x ) * vec3( 0.1031 ) ) );
			nodeVar3809 = ( nodeVar3809 + vec3( dot( nodeVar3809, ( nodeVar3809.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3810 = ( nodeVar3805 + vec2( 0.0, 1.0 ) );
			nodeVar3811 = fract( ( vec3( nodeVar3810.x, nodeVar3810.y, nodeVar3810.x ) * vec3( 0.1031 ) ) );
			nodeVar3811 = ( nodeVar3811 + vec3( dot( nodeVar3811, ( nodeVar3811.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3812 = ( nodeVar3805 + vec2( 1.0, 1.0 ) );
			nodeVar3813 = fract( ( vec3( nodeVar3812.x, nodeVar3812.y, nodeVar3812.x ) * vec3( 0.1031 ) ) );
			nodeVar3813 = ( nodeVar3813 + vec3( dot( nodeVar3813, ( nodeVar3813.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3785 = ( nodeVar3785 + ( nodeVar3786 * mix( mix( fract( ( ( nodeVar3807.x + nodeVar3807.y ) * nodeVar3807.z ) ), fract( ( ( nodeVar3809.x + nodeVar3809.y ) * nodeVar3809.z ) ), nodeVar3806.x ), mix( fract( ( ( nodeVar3811.x + nodeVar3811.y ) * nodeVar3811.z ) ), fract( ( ( nodeVar3813.x + nodeVar3813.y ) * nodeVar3813.z ) ), nodeVar3806.x ), nodeVar3806.y ) ) );
			nodeVar3784 = ( nodeVar3784 * vec2( 2.03 ) );
			nodeVar3786 = ( nodeVar3786 * 0.52 );
			nodeVar3814 = floor( nodeVar3784 );
			nodeVar3815 = fract( nodeVar3784 );
			nodeVar3815 = ( ( nodeVar3815 * nodeVar3815 ) * ( vec2( 3.0 ) - ( nodeVar3815 * vec2( 2.0 ) ) ) );
			nodeVar3816 = fract( ( vec3( nodeVar3814.x, nodeVar3814.y, nodeVar3814.x ) * vec3( 0.1031 ) ) );
			nodeVar3816 = ( nodeVar3816 + vec3( dot( nodeVar3816, ( nodeVar3816.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3817 = ( nodeVar3814 + vec2( 1.0, 0.0 ) );
			nodeVar3818 = fract( ( vec3( nodeVar3817.x, nodeVar3817.y, nodeVar3817.x ) * vec3( 0.1031 ) ) );
			nodeVar3818 = ( nodeVar3818 + vec3( dot( nodeVar3818, ( nodeVar3818.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3819 = ( nodeVar3814 + vec2( 0.0, 1.0 ) );
			nodeVar3820 = fract( ( vec3( nodeVar3819.x, nodeVar3819.y, nodeVar3819.x ) * vec3( 0.1031 ) ) );
			nodeVar3820 = ( nodeVar3820 + vec3( dot( nodeVar3820, ( nodeVar3820.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3821 = ( nodeVar3814 + vec2( 1.0, 1.0 ) );
			nodeVar3822 = fract( ( vec3( nodeVar3821.x, nodeVar3821.y, nodeVar3821.x ) * vec3( 0.1031 ) ) );
			nodeVar3822 = ( nodeVar3822 + vec3( dot( nodeVar3822, ( nodeVar3822.yzx + vec3( 33.33 ) ) ) ) );
			nodeVar3785 = ( nodeVar3785 + ( nodeVar3786 * mix( mix( fract( ( ( nodeVar3816.x + nodeVar3816.y ) * nodeVar3816.z ) ), fract( ( ( nodeVar3818.x + nodeVar3818.y ) * nodeVar3818.z ) ), nodeVar3815.x ), mix( fract( ( ( nodeVar3820.x + nodeVar3820.y ) * nodeVar3820.z ) ), fract( ( ( nodeVar3822.x + nodeVar3822.y ) * nodeVar3822.z ) ), nodeVar3815.x ), nodeVar3815.y ) ) );
			nodeVar3784 = ( nodeVar3784 * vec2( 2.03 ) );
			nodeVar3786 = ( nodeVar3786 * 0.52 );
			nodeVar3823 = ( ( ( nodeVar3707 * 0.55 ) + ( nodeVar3746 * 0.3 ) ) + ( nodeVar3785 * 0.15 ) );
			nodeVar3654 = vec3( nodeVar3823, ( 0.55 + ( nodeVar3823 * 0.45 ) ), nodeVar3823 );
			

		} else {


			if ( ( nodeVar3653 < 2.5 ) ) {

				nodeVar3824 = floor( ( nodeVar3652.y / 0.082 ) );
				nodeVar3825 = ( ( mod( nodeVar3824, 2.0 ) * 0.5 ) * 0.235 );
				nodeVar3826 = fract( ( ( nodeVar3652.x + nodeVar3825 ) / 0.235 ) );
				nodeVar3827 = fract( ( nodeVar3652.y / 0.082 ) );
				nodeVar3828 = min( ( min( nodeVar3826, ( 1.0 - nodeVar3826 ) ) * 0.235 ), ( min( nodeVar3827, ( 1.0 - nodeVar3827 ) ) * 0.082 ) );
				nodeVar3829 = smoothstep( 0.0, 0.011, nodeVar3828 );
				nodeVar3830 = ( vec2( floor( ( ( nodeVar3652.x + nodeVar3825 ) / 0.235 ) ), nodeVar3824 ) * vec2( 1.91 ) );
				nodeVar3831 = fract( ( vec3( nodeVar3830.x, nodeVar3830.y, nodeVar3830.x ) * vec3( 0.1031 ) ) );
				nodeVar3831 = ( nodeVar3831 + vec3( dot( nodeVar3831, ( nodeVar3831.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3832 = fract( ( ( nodeVar3831.x + nodeVar3831.y ) * nodeVar3831.z ) );
				nodeVar3833 = ( nodeVar3652 * vec2( 40.0 ) );
				nodeVar3834 = 0.0;
				nodeVar3835 = 0.5;
				nodeVar3836 = floor( nodeVar3833 );
				nodeVar3837 = fract( nodeVar3833 );
				nodeVar3837 = ( ( nodeVar3837 * nodeVar3837 ) * ( vec2( 3.0 ) - ( nodeVar3837 * vec2( 2.0 ) ) ) );
				nodeVar3838 = fract( ( vec3( nodeVar3836.x, nodeVar3836.y, nodeVar3836.x ) * vec3( 0.1031 ) ) );
				nodeVar3838 = ( nodeVar3838 + vec3( dot( nodeVar3838, ( nodeVar3838.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3839 = ( nodeVar3836 + vec2( 1.0, 0.0 ) );
				nodeVar3840 = fract( ( vec3( nodeVar3839.x, nodeVar3839.y, nodeVar3839.x ) * vec3( 0.1031 ) ) );
				nodeVar3840 = ( nodeVar3840 + vec3( dot( nodeVar3840, ( nodeVar3840.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3841 = ( nodeVar3836 + vec2( 0.0, 1.0 ) );
				nodeVar3842 = fract( ( vec3( nodeVar3841.x, nodeVar3841.y, nodeVar3841.x ) * vec3( 0.1031 ) ) );
				nodeVar3842 = ( nodeVar3842 + vec3( dot( nodeVar3842, ( nodeVar3842.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3843 = ( nodeVar3836 + vec2( 1.0, 1.0 ) );
				nodeVar3844 = fract( ( vec3( nodeVar3843.x, nodeVar3843.y, nodeVar3843.x ) * vec3( 0.1031 ) ) );
				nodeVar3844 = ( nodeVar3844 + vec3( dot( nodeVar3844, ( nodeVar3844.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3834 = ( nodeVar3834 + ( nodeVar3835 * mix( mix( fract( ( ( nodeVar3838.x + nodeVar3838.y ) * nodeVar3838.z ) ), fract( ( ( nodeVar3840.x + nodeVar3840.y ) * nodeVar3840.z ) ), nodeVar3837.x ), mix( fract( ( ( nodeVar3842.x + nodeVar3842.y ) * nodeVar3842.z ) ), fract( ( ( nodeVar3844.x + nodeVar3844.y ) * nodeVar3844.z ) ), nodeVar3837.x ), nodeVar3837.y ) ) );
				nodeVar3833 = ( nodeVar3833 * vec2( 2.03 ) );
				nodeVar3835 = ( nodeVar3835 * 0.52 );
				nodeVar3845 = floor( nodeVar3833 );
				nodeVar3846 = fract( nodeVar3833 );
				nodeVar3846 = ( ( nodeVar3846 * nodeVar3846 ) * ( vec2( 3.0 ) - ( nodeVar3846 * vec2( 2.0 ) ) ) );
				nodeVar3847 = fract( ( vec3( nodeVar3845.x, nodeVar3845.y, nodeVar3845.x ) * vec3( 0.1031 ) ) );
				nodeVar3847 = ( nodeVar3847 + vec3( dot( nodeVar3847, ( nodeVar3847.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3848 = ( nodeVar3845 + vec2( 1.0, 0.0 ) );
				nodeVar3849 = fract( ( vec3( nodeVar3848.x, nodeVar3848.y, nodeVar3848.x ) * vec3( 0.1031 ) ) );
				nodeVar3849 = ( nodeVar3849 + vec3( dot( nodeVar3849, ( nodeVar3849.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3850 = ( nodeVar3845 + vec2( 0.0, 1.0 ) );
				nodeVar3851 = fract( ( vec3( nodeVar3850.x, nodeVar3850.y, nodeVar3850.x ) * vec3( 0.1031 ) ) );
				nodeVar3851 = ( nodeVar3851 + vec3( dot( nodeVar3851, ( nodeVar3851.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3852 = ( nodeVar3845 + vec2( 1.0, 1.0 ) );
				nodeVar3853 = fract( ( vec3( nodeVar3852.x, nodeVar3852.y, nodeVar3852.x ) * vec3( 0.1031 ) ) );
				nodeVar3853 = ( nodeVar3853 + vec3( dot( nodeVar3853, ( nodeVar3853.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3834 = ( nodeVar3834 + ( nodeVar3835 * mix( mix( fract( ( ( nodeVar3847.x + nodeVar3847.y ) * nodeVar3847.z ) ), fract( ( ( nodeVar3849.x + nodeVar3849.y ) * nodeVar3849.z ) ), nodeVar3846.x ), mix( fract( ( ( nodeVar3851.x + nodeVar3851.y ) * nodeVar3851.z ) ), fract( ( ( nodeVar3853.x + nodeVar3853.y ) * nodeVar3853.z ) ), nodeVar3846.x ), nodeVar3846.y ) ) );
				nodeVar3833 = ( nodeVar3833 * vec2( 2.03 ) );
				nodeVar3835 = ( nodeVar3835 * 0.52 );
				nodeVar3854 = floor( nodeVar3833 );
				nodeVar3855 = fract( nodeVar3833 );
				nodeVar3855 = ( ( nodeVar3855 * nodeVar3855 ) * ( vec2( 3.0 ) - ( nodeVar3855 * vec2( 2.0 ) ) ) );
				nodeVar3856 = fract( ( vec3( nodeVar3854.x, nodeVar3854.y, nodeVar3854.x ) * vec3( 0.1031 ) ) );
				nodeVar3856 = ( nodeVar3856 + vec3( dot( nodeVar3856, ( nodeVar3856.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3857 = ( nodeVar3854 + vec2( 1.0, 0.0 ) );
				nodeVar3858 = fract( ( vec3( nodeVar3857.x, nodeVar3857.y, nodeVar3857.x ) * vec3( 0.1031 ) ) );
				nodeVar3858 = ( nodeVar3858 + vec3( dot( nodeVar3858, ( nodeVar3858.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3859 = ( nodeVar3854 + vec2( 0.0, 1.0 ) );
				nodeVar3860 = fract( ( vec3( nodeVar3859.x, nodeVar3859.y, nodeVar3859.x ) * vec3( 0.1031 ) ) );
				nodeVar3860 = ( nodeVar3860 + vec3( dot( nodeVar3860, ( nodeVar3860.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3861 = ( nodeVar3854 + vec2( 1.0, 1.0 ) );
				nodeVar3862 = fract( ( vec3( nodeVar3861.x, nodeVar3861.y, nodeVar3861.x ) * vec3( 0.1031 ) ) );
				nodeVar3862 = ( nodeVar3862 + vec3( dot( nodeVar3862, ( nodeVar3862.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3834 = ( nodeVar3834 + ( nodeVar3835 * mix( mix( fract( ( ( nodeVar3856.x + nodeVar3856.y ) * nodeVar3856.z ) ), fract( ( ( nodeVar3858.x + nodeVar3858.y ) * nodeVar3858.z ) ), nodeVar3855.x ), mix( fract( ( ( nodeVar3860.x + nodeVar3860.y ) * nodeVar3860.z ) ), fract( ( ( nodeVar3862.x + nodeVar3862.y ) * nodeVar3862.z ) ), nodeVar3855.x ), nodeVar3855.y ) ) );
				nodeVar3833 = ( nodeVar3833 * vec2( 2.03 ) );
				nodeVar3835 = ( nodeVar3835 * 0.52 );
				nodeVar3863 = floor( nodeVar3833 );
				nodeVar3864 = fract( nodeVar3833 );
				nodeVar3864 = ( ( nodeVar3864 * nodeVar3864 ) * ( vec2( 3.0 ) - ( nodeVar3864 * vec2( 2.0 ) ) ) );
				nodeVar3865 = fract( ( vec3( nodeVar3863.x, nodeVar3863.y, nodeVar3863.x ) * vec3( 0.1031 ) ) );
				nodeVar3865 = ( nodeVar3865 + vec3( dot( nodeVar3865, ( nodeVar3865.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3866 = ( nodeVar3863 + vec2( 1.0, 0.0 ) );
				nodeVar3867 = fract( ( vec3( nodeVar3866.x, nodeVar3866.y, nodeVar3866.x ) * vec3( 0.1031 ) ) );
				nodeVar3867 = ( nodeVar3867 + vec3( dot( nodeVar3867, ( nodeVar3867.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3868 = ( nodeVar3863 + vec2( 0.0, 1.0 ) );
				nodeVar3869 = fract( ( vec3( nodeVar3868.x, nodeVar3868.y, nodeVar3868.x ) * vec3( 0.1031 ) ) );
				nodeVar3869 = ( nodeVar3869 + vec3( dot( nodeVar3869, ( nodeVar3869.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3870 = ( nodeVar3863 + vec2( 1.0, 1.0 ) );
				nodeVar3871 = fract( ( vec3( nodeVar3870.x, nodeVar3870.y, nodeVar3870.x ) * vec3( 0.1031 ) ) );
				nodeVar3871 = ( nodeVar3871 + vec3( dot( nodeVar3871, ( nodeVar3871.yzx + vec3( 33.33 ) ) ) ) );
				nodeVar3834 = ( nodeVar3834 + ( nodeVar3835 * mix( mix( fract( ( ( nodeVar3865.x + nodeVar3865.y ) * nodeVar3865.z ) ), fract( ( ( nodeVar3867.x + nodeVar3867.y ) * nodeVar3867.z ) ), nodeVar3864.x ), mix( fract( ( ( nodeVar3869.x + nodeVar3869.y ) * nodeVar3869.z ) ), fract( ( ( nodeVar3871.x + nodeVar3871.y ) * nodeVar3871.z ) ), nodeVar3864.x ), nodeVar3864.y ) ) );
				nodeVar3833 = ( nodeVar3833 * vec2( 2.03 ) );
				nodeVar3835 = ( nodeVar3835 * 0.52 );
				nodeVar3654 = vec3( ( ( ( nodeVar3829 * ( 0.62 + ( nodeVar3832 * 0.38 ) ) ) * 0.72 ) + ( ( nodeVar3834 * 0.16 ) * nodeVar3829 ) ), nodeVar3829, nodeVar3832 );
				

			} else {


				if ( ( nodeVar3653 < 3.5 ) ) {

					nodeVar3872 = floor( ( nodeVar3652.y * 5.2 ) );
					nodeVar3873 = fract( ( nodeVar3652.y * 5.2 ) );
					nodeVar3874 = smoothstep( 0.0, 0.06, min( nodeVar3873, ( 1.0 - nodeVar3873 ) ) );
					nodeVar3875 = vec2( ( nodeVar3652.x * 2.2 ), ( nodeVar3652.y * 60.0 ) );
					nodeVar3876 = 0.0;
					nodeVar3877 = 0.5;
					nodeVar3878 = floor( nodeVar3875 );
					nodeVar3879 = fract( nodeVar3875 );
					nodeVar3879 = ( ( nodeVar3879 * nodeVar3879 ) * ( vec2( 3.0 ) - ( nodeVar3879 * vec2( 2.0 ) ) ) );
					nodeVar3880 = fract( ( vec3( nodeVar3878.x, nodeVar3878.y, nodeVar3878.x ) * vec3( 0.1031 ) ) );
					nodeVar3880 = ( nodeVar3880 + vec3( dot( nodeVar3880, ( nodeVar3880.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3881 = ( nodeVar3878 + vec2( 1.0, 0.0 ) );
					nodeVar3882 = fract( ( vec3( nodeVar3881.x, nodeVar3881.y, nodeVar3881.x ) * vec3( 0.1031 ) ) );
					nodeVar3882 = ( nodeVar3882 + vec3( dot( nodeVar3882, ( nodeVar3882.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3883 = ( nodeVar3878 + vec2( 0.0, 1.0 ) );
					nodeVar3884 = fract( ( vec3( nodeVar3883.x, nodeVar3883.y, nodeVar3883.x ) * vec3( 0.1031 ) ) );
					nodeVar3884 = ( nodeVar3884 + vec3( dot( nodeVar3884, ( nodeVar3884.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3885 = ( nodeVar3878 + vec2( 1.0, 1.0 ) );
					nodeVar3886 = fract( ( vec3( nodeVar3885.x, nodeVar3885.y, nodeVar3885.x ) * vec3( 0.1031 ) ) );
					nodeVar3886 = ( nodeVar3886 + vec3( dot( nodeVar3886, ( nodeVar3886.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3876 = ( nodeVar3876 + ( nodeVar3877 * mix( mix( fract( ( ( nodeVar3880.x + nodeVar3880.y ) * nodeVar3880.z ) ), fract( ( ( nodeVar3882.x + nodeVar3882.y ) * nodeVar3882.z ) ), nodeVar3879.x ), mix( fract( ( ( nodeVar3884.x + nodeVar3884.y ) * nodeVar3884.z ) ), fract( ( ( nodeVar3886.x + nodeVar3886.y ) * nodeVar3886.z ) ), nodeVar3879.x ), nodeVar3879.y ) ) );
					nodeVar3875 = ( nodeVar3875 * vec2( 2.03 ) );
					nodeVar3877 = ( nodeVar3877 * 0.52 );
					nodeVar3887 = floor( nodeVar3875 );
					nodeVar3888 = fract( nodeVar3875 );
					nodeVar3888 = ( ( nodeVar3888 * nodeVar3888 ) * ( vec2( 3.0 ) - ( nodeVar3888 * vec2( 2.0 ) ) ) );
					nodeVar3889 = fract( ( vec3( nodeVar3887.x, nodeVar3887.y, nodeVar3887.x ) * vec3( 0.1031 ) ) );
					nodeVar3889 = ( nodeVar3889 + vec3( dot( nodeVar3889, ( nodeVar3889.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3890 = ( nodeVar3887 + vec2( 1.0, 0.0 ) );
					nodeVar3891 = fract( ( vec3( nodeVar3890.x, nodeVar3890.y, nodeVar3890.x ) * vec3( 0.1031 ) ) );
					nodeVar3891 = ( nodeVar3891 + vec3( dot( nodeVar3891, ( nodeVar3891.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3892 = ( nodeVar3887 + vec2( 0.0, 1.0 ) );
					nodeVar3893 = fract( ( vec3( nodeVar3892.x, nodeVar3892.y, nodeVar3892.x ) * vec3( 0.1031 ) ) );
					nodeVar3893 = ( nodeVar3893 + vec3( dot( nodeVar3893, ( nodeVar3893.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3894 = ( nodeVar3887 + vec2( 1.0, 1.0 ) );
					nodeVar3895 = fract( ( vec3( nodeVar3894.x, nodeVar3894.y, nodeVar3894.x ) * vec3( 0.1031 ) ) );
					nodeVar3895 = ( nodeVar3895 + vec3( dot( nodeVar3895, ( nodeVar3895.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3876 = ( nodeVar3876 + ( nodeVar3877 * mix( mix( fract( ( ( nodeVar3889.x + nodeVar3889.y ) * nodeVar3889.z ) ), fract( ( ( nodeVar3891.x + nodeVar3891.y ) * nodeVar3891.z ) ), nodeVar3888.x ), mix( fract( ( ( nodeVar3893.x + nodeVar3893.y ) * nodeVar3893.z ) ), fract( ( ( nodeVar3895.x + nodeVar3895.y ) * nodeVar3895.z ) ), nodeVar3888.x ), nodeVar3888.y ) ) );
					nodeVar3875 = ( nodeVar3875 * vec2( 2.03 ) );
					nodeVar3877 = ( nodeVar3877 * 0.52 );
					nodeVar3896 = floor( nodeVar3875 );
					nodeVar3897 = fract( nodeVar3875 );
					nodeVar3897 = ( ( nodeVar3897 * nodeVar3897 ) * ( vec2( 3.0 ) - ( nodeVar3897 * vec2( 2.0 ) ) ) );
					nodeVar3898 = fract( ( vec3( nodeVar3896.x, nodeVar3896.y, nodeVar3896.x ) * vec3( 0.1031 ) ) );
					nodeVar3898 = ( nodeVar3898 + vec3( dot( nodeVar3898, ( nodeVar3898.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3899 = ( nodeVar3896 + vec2( 1.0, 0.0 ) );
					nodeVar3900 = fract( ( vec3( nodeVar3899.x, nodeVar3899.y, nodeVar3899.x ) * vec3( 0.1031 ) ) );
					nodeVar3900 = ( nodeVar3900 + vec3( dot( nodeVar3900, ( nodeVar3900.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3901 = ( nodeVar3896 + vec2( 0.0, 1.0 ) );
					nodeVar3902 = fract( ( vec3( nodeVar3901.x, nodeVar3901.y, nodeVar3901.x ) * vec3( 0.1031 ) ) );
					nodeVar3902 = ( nodeVar3902 + vec3( dot( nodeVar3902, ( nodeVar3902.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3903 = ( nodeVar3896 + vec2( 1.0, 1.0 ) );
					nodeVar3904 = fract( ( vec3( nodeVar3903.x, nodeVar3903.y, nodeVar3903.x ) * vec3( 0.1031 ) ) );
					nodeVar3904 = ( nodeVar3904 + vec3( dot( nodeVar3904, ( nodeVar3904.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3876 = ( nodeVar3876 + ( nodeVar3877 * mix( mix( fract( ( ( nodeVar3898.x + nodeVar3898.y ) * nodeVar3898.z ) ), fract( ( ( nodeVar3900.x + nodeVar3900.y ) * nodeVar3900.z ) ), nodeVar3897.x ), mix( fract( ( ( nodeVar3902.x + nodeVar3902.y ) * nodeVar3902.z ) ), fract( ( ( nodeVar3904.x + nodeVar3904.y ) * nodeVar3904.z ) ), nodeVar3897.x ), nodeVar3897.y ) ) );
					nodeVar3875 = ( nodeVar3875 * vec2( 2.03 ) );
					nodeVar3877 = ( nodeVar3877 * 0.52 );
					nodeVar3905 = floor( nodeVar3875 );
					nodeVar3906 = fract( nodeVar3875 );
					nodeVar3906 = ( ( nodeVar3906 * nodeVar3906 ) * ( vec2( 3.0 ) - ( nodeVar3906 * vec2( 2.0 ) ) ) );
					nodeVar3907 = fract( ( vec3( nodeVar3905.x, nodeVar3905.y, nodeVar3905.x ) * vec3( 0.1031 ) ) );
					nodeVar3907 = ( nodeVar3907 + vec3( dot( nodeVar3907, ( nodeVar3907.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3908 = ( nodeVar3905 + vec2( 1.0, 0.0 ) );
					nodeVar3909 = fract( ( vec3( nodeVar3908.x, nodeVar3908.y, nodeVar3908.x ) * vec3( 0.1031 ) ) );
					nodeVar3909 = ( nodeVar3909 + vec3( dot( nodeVar3909, ( nodeVar3909.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3910 = ( nodeVar3905 + vec2( 0.0, 1.0 ) );
					nodeVar3911 = fract( ( vec3( nodeVar3910.x, nodeVar3910.y, nodeVar3910.x ) * vec3( 0.1031 ) ) );
					nodeVar3911 = ( nodeVar3911 + vec3( dot( nodeVar3911, ( nodeVar3911.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3912 = ( nodeVar3905 + vec2( 1.0, 1.0 ) );
					nodeVar3913 = fract( ( vec3( nodeVar3912.x, nodeVar3912.y, nodeVar3912.x ) * vec3( 0.1031 ) ) );
					nodeVar3913 = ( nodeVar3913 + vec3( dot( nodeVar3913, ( nodeVar3913.yzx + vec3( 33.33 ) ) ) ) );
					nodeVar3876 = ( nodeVar3876 + ( nodeVar3877 * mix( mix( fract( ( ( nodeVar3907.x + nodeVar3907.y ) * nodeVar3907.z ) ), fract( ( ( nodeVar3909.x + nodeVar3909.y ) * nodeVar3909.z ) ), nodeVar3906.x ), mix( fract( ( ( nodeVar3911.x + nodeVar3911.y ) * nodeVar3911.z ) ), fract( ( ( nodeVar3913.x + nodeVar3913.y ) * nodeVar3913.z ) ), nodeVar3906.x ), nodeVar3906.y ) ) );
					nodeVar3875 = ( nodeVar3875 * vec2( 2.03 ) );
					nodeVar3877 = ( nodeVar3877 * 0.52 );
					nodeVar3914 = nodeVar3876;
					nodeVar3915 = fract( ( ( nodeVar3872 * 5.1 ) * 0.1031 ) );
					nodeVar3915 = ( nodeVar3915 * ( nodeVar3915 + 33.33 ) );
					nodeVar3915 = ( nodeVar3915 * ( nodeVar3915 + nodeVar3915 ) );
					nodeVar3654 = vec3( ( ( ( nodeVar3874 * ( 0.6 + ( nodeVar3914 * 0.4 ) ) ) * 0.5 ) + ( ( fract( nodeVar3915 ) * 0.12 ) * nodeVar3874 ) ), nodeVar3874, nodeVar3914 );
					

				} else {


					if ( ( nodeVar3653 < 4.5 ) ) {

						nodeVar3916 = floor( ( nodeVar3652.y / 0.45 ) );
						nodeVar3917 = fract( ( ( nodeVar3916 * 4.7 ) * 0.1031 ) );
						nodeVar3917 = ( nodeVar3917 * ( nodeVar3917 + 33.33 ) );
						nodeVar3917 = ( nodeVar3917 * ( nodeVar3917 + nodeVar3917 ) );
						nodeVar3918 = ( ( ( mod( nodeVar3916, 2.0 ) * 0.5 ) * 0.9 ) + ( fract( nodeVar3917 ) * 0.18 ) );
						nodeVar3919 = fract( ( ( nodeVar3652.x + nodeVar3918 ) / 0.9 ) );
						nodeVar3920 = fract( ( nodeVar3652.y / 0.45 ) );
						nodeVar3921 = min( ( min( nodeVar3919, ( 1.0 - nodeVar3919 ) ) * 0.9 ), ( min( nodeVar3920, ( 1.0 - nodeVar3920 ) ) * 0.45 ) );
						nodeVar3922 = smoothstep( 0.0, 0.006, nodeVar3921 );
						nodeVar3923 = vec2( ( nodeVar3652.x * 2.2 ), ( nodeVar3652.y * 16.0 ) );
						nodeVar3924 = 0.0;
						nodeVar3925 = 0.5;
						nodeVar3926 = floor( nodeVar3923 );
						nodeVar3927 = fract( nodeVar3923 );
						nodeVar3927 = ( ( nodeVar3927 * nodeVar3927 ) * ( vec2( 3.0 ) - ( nodeVar3927 * vec2( 2.0 ) ) ) );
						nodeVar3928 = fract( ( vec3( nodeVar3926.x, nodeVar3926.y, nodeVar3926.x ) * vec3( 0.1031 ) ) );
						nodeVar3928 = ( nodeVar3928 + vec3( dot( nodeVar3928, ( nodeVar3928.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3929 = ( nodeVar3926 + vec2( 1.0, 0.0 ) );
						nodeVar3930 = fract( ( vec3( nodeVar3929.x, nodeVar3929.y, nodeVar3929.x ) * vec3( 0.1031 ) ) );
						nodeVar3930 = ( nodeVar3930 + vec3( dot( nodeVar3930, ( nodeVar3930.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3931 = ( nodeVar3926 + vec2( 0.0, 1.0 ) );
						nodeVar3932 = fract( ( vec3( nodeVar3931.x, nodeVar3931.y, nodeVar3931.x ) * vec3( 0.1031 ) ) );
						nodeVar3932 = ( nodeVar3932 + vec3( dot( nodeVar3932, ( nodeVar3932.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3933 = ( nodeVar3926 + vec2( 1.0, 1.0 ) );
						nodeVar3934 = fract( ( vec3( nodeVar3933.x, nodeVar3933.y, nodeVar3933.x ) * vec3( 0.1031 ) ) );
						nodeVar3934 = ( nodeVar3934 + vec3( dot( nodeVar3934, ( nodeVar3934.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3924 = ( nodeVar3924 + ( nodeVar3925 * mix( mix( fract( ( ( nodeVar3928.x + nodeVar3928.y ) * nodeVar3928.z ) ), fract( ( ( nodeVar3930.x + nodeVar3930.y ) * nodeVar3930.z ) ), nodeVar3927.x ), mix( fract( ( ( nodeVar3932.x + nodeVar3932.y ) * nodeVar3932.z ) ), fract( ( ( nodeVar3934.x + nodeVar3934.y ) * nodeVar3934.z ) ), nodeVar3927.x ), nodeVar3927.y ) ) );
						nodeVar3923 = ( nodeVar3923 * vec2( 2.03 ) );
						nodeVar3925 = ( nodeVar3925 * 0.52 );
						nodeVar3935 = floor( nodeVar3923 );
						nodeVar3936 = fract( nodeVar3923 );
						nodeVar3936 = ( ( nodeVar3936 * nodeVar3936 ) * ( vec2( 3.0 ) - ( nodeVar3936 * vec2( 2.0 ) ) ) );
						nodeVar3937 = fract( ( vec3( nodeVar3935.x, nodeVar3935.y, nodeVar3935.x ) * vec3( 0.1031 ) ) );
						nodeVar3937 = ( nodeVar3937 + vec3( dot( nodeVar3937, ( nodeVar3937.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3938 = ( nodeVar3935 + vec2( 1.0, 0.0 ) );
						nodeVar3939 = fract( ( vec3( nodeVar3938.x, nodeVar3938.y, nodeVar3938.x ) * vec3( 0.1031 ) ) );
						nodeVar3939 = ( nodeVar3939 + vec3( dot( nodeVar3939, ( nodeVar3939.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3940 = ( nodeVar3935 + vec2( 0.0, 1.0 ) );
						nodeVar3941 = fract( ( vec3( nodeVar3940.x, nodeVar3940.y, nodeVar3940.x ) * vec3( 0.1031 ) ) );
						nodeVar3941 = ( nodeVar3941 + vec3( dot( nodeVar3941, ( nodeVar3941.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3942 = ( nodeVar3935 + vec2( 1.0, 1.0 ) );
						nodeVar3943 = fract( ( vec3( nodeVar3942.x, nodeVar3942.y, nodeVar3942.x ) * vec3( 0.1031 ) ) );
						nodeVar3943 = ( nodeVar3943 + vec3( dot( nodeVar3943, ( nodeVar3943.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3924 = ( nodeVar3924 + ( nodeVar3925 * mix( mix( fract( ( ( nodeVar3937.x + nodeVar3937.y ) * nodeVar3937.z ) ), fract( ( ( nodeVar3939.x + nodeVar3939.y ) * nodeVar3939.z ) ), nodeVar3936.x ), mix( fract( ( ( nodeVar3941.x + nodeVar3941.y ) * nodeVar3941.z ) ), fract( ( ( nodeVar3943.x + nodeVar3943.y ) * nodeVar3943.z ) ), nodeVar3936.x ), nodeVar3936.y ) ) );
						nodeVar3923 = ( nodeVar3923 * vec2( 2.03 ) );
						nodeVar3925 = ( nodeVar3925 * 0.52 );
						nodeVar3944 = floor( nodeVar3923 );
						nodeVar3945 = fract( nodeVar3923 );
						nodeVar3945 = ( ( nodeVar3945 * nodeVar3945 ) * ( vec2( 3.0 ) - ( nodeVar3945 * vec2( 2.0 ) ) ) );
						nodeVar3946 = fract( ( vec3( nodeVar3944.x, nodeVar3944.y, nodeVar3944.x ) * vec3( 0.1031 ) ) );
						nodeVar3946 = ( nodeVar3946 + vec3( dot( nodeVar3946, ( nodeVar3946.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3947 = ( nodeVar3944 + vec2( 1.0, 0.0 ) );
						nodeVar3948 = fract( ( vec3( nodeVar3947.x, nodeVar3947.y, nodeVar3947.x ) * vec3( 0.1031 ) ) );
						nodeVar3948 = ( nodeVar3948 + vec3( dot( nodeVar3948, ( nodeVar3948.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3949 = ( nodeVar3944 + vec2( 0.0, 1.0 ) );
						nodeVar3950 = fract( ( vec3( nodeVar3949.x, nodeVar3949.y, nodeVar3949.x ) * vec3( 0.1031 ) ) );
						nodeVar3950 = ( nodeVar3950 + vec3( dot( nodeVar3950, ( nodeVar3950.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3951 = ( nodeVar3944 + vec2( 1.0, 1.0 ) );
						nodeVar3952 = fract( ( vec3( nodeVar3951.x, nodeVar3951.y, nodeVar3951.x ) * vec3( 0.1031 ) ) );
						nodeVar3952 = ( nodeVar3952 + vec3( dot( nodeVar3952, ( nodeVar3952.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3924 = ( nodeVar3924 + ( nodeVar3925 * mix( mix( fract( ( ( nodeVar3946.x + nodeVar3946.y ) * nodeVar3946.z ) ), fract( ( ( nodeVar3948.x + nodeVar3948.y ) * nodeVar3948.z ) ), nodeVar3945.x ), mix( fract( ( ( nodeVar3950.x + nodeVar3950.y ) * nodeVar3950.z ) ), fract( ( ( nodeVar3952.x + nodeVar3952.y ) * nodeVar3952.z ) ), nodeVar3945.x ), nodeVar3945.y ) ) );
						nodeVar3923 = ( nodeVar3923 * vec2( 2.03 ) );
						nodeVar3925 = ( nodeVar3925 * 0.52 );
						nodeVar3953 = floor( nodeVar3923 );
						nodeVar3954 = fract( nodeVar3923 );
						nodeVar3954 = ( ( nodeVar3954 * nodeVar3954 ) * ( vec2( 3.0 ) - ( nodeVar3954 * vec2( 2.0 ) ) ) );
						nodeVar3955 = fract( ( vec3( nodeVar3953.x, nodeVar3953.y, nodeVar3953.x ) * vec3( 0.1031 ) ) );
						nodeVar3955 = ( nodeVar3955 + vec3( dot( nodeVar3955, ( nodeVar3955.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3956 = ( nodeVar3953 + vec2( 1.0, 0.0 ) );
						nodeVar3957 = fract( ( vec3( nodeVar3956.x, nodeVar3956.y, nodeVar3956.x ) * vec3( 0.1031 ) ) );
						nodeVar3957 = ( nodeVar3957 + vec3( dot( nodeVar3957, ( nodeVar3957.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3958 = ( nodeVar3953 + vec2( 0.0, 1.0 ) );
						nodeVar3959 = fract( ( vec3( nodeVar3958.x, nodeVar3958.y, nodeVar3958.x ) * vec3( 0.1031 ) ) );
						nodeVar3959 = ( nodeVar3959 + vec3( dot( nodeVar3959, ( nodeVar3959.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3960 = ( nodeVar3953 + vec2( 1.0, 1.0 ) );
						nodeVar3961 = fract( ( vec3( nodeVar3960.x, nodeVar3960.y, nodeVar3960.x ) * vec3( 0.1031 ) ) );
						nodeVar3961 = ( nodeVar3961 + vec3( dot( nodeVar3961, ( nodeVar3961.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3924 = ( nodeVar3924 + ( nodeVar3925 * mix( mix( fract( ( ( nodeVar3955.x + nodeVar3955.y ) * nodeVar3955.z ) ), fract( ( ( nodeVar3957.x + nodeVar3957.y ) * nodeVar3957.z ) ), nodeVar3954.x ), mix( fract( ( ( nodeVar3959.x + nodeVar3959.y ) * nodeVar3959.z ) ), fract( ( ( nodeVar3961.x + nodeVar3961.y ) * nodeVar3961.z ) ), nodeVar3954.x ), nodeVar3954.y ) ) );
						nodeVar3923 = ( nodeVar3923 * vec2( 2.03 ) );
						nodeVar3925 = ( nodeVar3925 * 0.52 );
						nodeVar3962 = nodeVar3924;
						nodeVar3963 = ( vec2( floor( ( ( nodeVar3652.x + nodeVar3918 ) / 0.9 ) ), nodeVar3916 ) * vec2( 1.61 ) );
						nodeVar3964 = fract( ( vec3( nodeVar3963.x, nodeVar3963.y, nodeVar3963.x ) * vec3( 0.1031 ) ) );
						nodeVar3964 = ( nodeVar3964 + vec3( dot( nodeVar3964, ( nodeVar3964.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3965 = fract( ( ( nodeVar3964.x + nodeVar3964.y ) * nodeVar3964.z ) );
						nodeVar3966 = ( nodeVar3652 * vec2( 26.0 ) );
						nodeVar3967 = 0.0;
						nodeVar3968 = 0.5;
						nodeVar3969 = floor( nodeVar3966 );
						nodeVar3970 = fract( nodeVar3966 );
						nodeVar3970 = ( ( nodeVar3970 * nodeVar3970 ) * ( vec2( 3.0 ) - ( nodeVar3970 * vec2( 2.0 ) ) ) );
						nodeVar3971 = fract( ( vec3( nodeVar3969.x, nodeVar3969.y, nodeVar3969.x ) * vec3( 0.1031 ) ) );
						nodeVar3971 = ( nodeVar3971 + vec3( dot( nodeVar3971, ( nodeVar3971.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3972 = ( nodeVar3969 + vec2( 1.0, 0.0 ) );
						nodeVar3973 = fract( ( vec3( nodeVar3972.x, nodeVar3972.y, nodeVar3972.x ) * vec3( 0.1031 ) ) );
						nodeVar3973 = ( nodeVar3973 + vec3( dot( nodeVar3973, ( nodeVar3973.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3974 = ( nodeVar3969 + vec2( 0.0, 1.0 ) );
						nodeVar3975 = fract( ( vec3( nodeVar3974.x, nodeVar3974.y, nodeVar3974.x ) * vec3( 0.1031 ) ) );
						nodeVar3975 = ( nodeVar3975 + vec3( dot( nodeVar3975, ( nodeVar3975.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3976 = ( nodeVar3969 + vec2( 1.0, 1.0 ) );
						nodeVar3977 = fract( ( vec3( nodeVar3976.x, nodeVar3976.y, nodeVar3976.x ) * vec3( 0.1031 ) ) );
						nodeVar3977 = ( nodeVar3977 + vec3( dot( nodeVar3977, ( nodeVar3977.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3967 = ( nodeVar3967 + ( nodeVar3968 * mix( mix( fract( ( ( nodeVar3971.x + nodeVar3971.y ) * nodeVar3971.z ) ), fract( ( ( nodeVar3973.x + nodeVar3973.y ) * nodeVar3973.z ) ), nodeVar3970.x ), mix( fract( ( ( nodeVar3975.x + nodeVar3975.y ) * nodeVar3975.z ) ), fract( ( ( nodeVar3977.x + nodeVar3977.y ) * nodeVar3977.z ) ), nodeVar3970.x ), nodeVar3970.y ) ) );
						nodeVar3966 = ( nodeVar3966 * vec2( 2.03 ) );
						nodeVar3968 = ( nodeVar3968 * 0.52 );
						nodeVar3978 = floor( nodeVar3966 );
						nodeVar3979 = fract( nodeVar3966 );
						nodeVar3979 = ( ( nodeVar3979 * nodeVar3979 ) * ( vec2( 3.0 ) - ( nodeVar3979 * vec2( 2.0 ) ) ) );
						nodeVar3980 = fract( ( vec3( nodeVar3978.x, nodeVar3978.y, nodeVar3978.x ) * vec3( 0.1031 ) ) );
						nodeVar3980 = ( nodeVar3980 + vec3( dot( nodeVar3980, ( nodeVar3980.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3981 = ( nodeVar3978 + vec2( 1.0, 0.0 ) );
						nodeVar3982 = fract( ( vec3( nodeVar3981.x, nodeVar3981.y, nodeVar3981.x ) * vec3( 0.1031 ) ) );
						nodeVar3982 = ( nodeVar3982 + vec3( dot( nodeVar3982, ( nodeVar3982.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3983 = ( nodeVar3978 + vec2( 0.0, 1.0 ) );
						nodeVar3984 = fract( ( vec3( nodeVar3983.x, nodeVar3983.y, nodeVar3983.x ) * vec3( 0.1031 ) ) );
						nodeVar3984 = ( nodeVar3984 + vec3( dot( nodeVar3984, ( nodeVar3984.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3985 = ( nodeVar3978 + vec2( 1.0, 1.0 ) );
						nodeVar3986 = fract( ( vec3( nodeVar3985.x, nodeVar3985.y, nodeVar3985.x ) * vec3( 0.1031 ) ) );
						nodeVar3986 = ( nodeVar3986 + vec3( dot( nodeVar3986, ( nodeVar3986.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3967 = ( nodeVar3967 + ( nodeVar3968 * mix( mix( fract( ( ( nodeVar3980.x + nodeVar3980.y ) * nodeVar3980.z ) ), fract( ( ( nodeVar3982.x + nodeVar3982.y ) * nodeVar3982.z ) ), nodeVar3979.x ), mix( fract( ( ( nodeVar3984.x + nodeVar3984.y ) * nodeVar3984.z ) ), fract( ( ( nodeVar3986.x + nodeVar3986.y ) * nodeVar3986.z ) ), nodeVar3979.x ), nodeVar3979.y ) ) );
						nodeVar3966 = ( nodeVar3966 * vec2( 2.03 ) );
						nodeVar3968 = ( nodeVar3968 * 0.52 );
						nodeVar3987 = floor( nodeVar3966 );
						nodeVar3988 = fract( nodeVar3966 );
						nodeVar3988 = ( ( nodeVar3988 * nodeVar3988 ) * ( vec2( 3.0 ) - ( nodeVar3988 * vec2( 2.0 ) ) ) );
						nodeVar3989 = fract( ( vec3( nodeVar3987.x, nodeVar3987.y, nodeVar3987.x ) * vec3( 0.1031 ) ) );
						nodeVar3989 = ( nodeVar3989 + vec3( dot( nodeVar3989, ( nodeVar3989.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3990 = ( nodeVar3987 + vec2( 1.0, 0.0 ) );
						nodeVar3991 = fract( ( vec3( nodeVar3990.x, nodeVar3990.y, nodeVar3990.x ) * vec3( 0.1031 ) ) );
						nodeVar3991 = ( nodeVar3991 + vec3( dot( nodeVar3991, ( nodeVar3991.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3992 = ( nodeVar3987 + vec2( 0.0, 1.0 ) );
						nodeVar3993 = fract( ( vec3( nodeVar3992.x, nodeVar3992.y, nodeVar3992.x ) * vec3( 0.1031 ) ) );
						nodeVar3993 = ( nodeVar3993 + vec3( dot( nodeVar3993, ( nodeVar3993.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3994 = ( nodeVar3987 + vec2( 1.0, 1.0 ) );
						nodeVar3995 = fract( ( vec3( nodeVar3994.x, nodeVar3994.y, nodeVar3994.x ) * vec3( 0.1031 ) ) );
						nodeVar3995 = ( nodeVar3995 + vec3( dot( nodeVar3995, ( nodeVar3995.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3967 = ( nodeVar3967 + ( nodeVar3968 * mix( mix( fract( ( ( nodeVar3989.x + nodeVar3989.y ) * nodeVar3989.z ) ), fract( ( ( nodeVar3991.x + nodeVar3991.y ) * nodeVar3991.z ) ), nodeVar3988.x ), mix( fract( ( ( nodeVar3993.x + nodeVar3993.y ) * nodeVar3993.z ) ), fract( ( ( nodeVar3995.x + nodeVar3995.y ) * nodeVar3995.z ) ), nodeVar3988.x ), nodeVar3988.y ) ) );
						nodeVar3966 = ( nodeVar3966 * vec2( 2.03 ) );
						nodeVar3968 = ( nodeVar3968 * 0.52 );
						nodeVar3996 = floor( nodeVar3966 );
						nodeVar3997 = fract( nodeVar3966 );
						nodeVar3997 = ( ( nodeVar3997 * nodeVar3997 ) * ( vec2( 3.0 ) - ( nodeVar3997 * vec2( 2.0 ) ) ) );
						nodeVar3998 = fract( ( vec3( nodeVar3996.x, nodeVar3996.y, nodeVar3996.x ) * vec3( 0.1031 ) ) );
						nodeVar3998 = ( nodeVar3998 + vec3( dot( nodeVar3998, ( nodeVar3998.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3999 = ( nodeVar3996 + vec2( 1.0, 0.0 ) );
						nodeVar4000 = fract( ( vec3( nodeVar3999.x, nodeVar3999.y, nodeVar3999.x ) * vec3( 0.1031 ) ) );
						nodeVar4000 = ( nodeVar4000 + vec3( dot( nodeVar4000, ( nodeVar4000.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar4001 = ( nodeVar3996 + vec2( 0.0, 1.0 ) );
						nodeVar4002 = fract( ( vec3( nodeVar4001.x, nodeVar4001.y, nodeVar4001.x ) * vec3( 0.1031 ) ) );
						nodeVar4002 = ( nodeVar4002 + vec3( dot( nodeVar4002, ( nodeVar4002.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar4003 = ( nodeVar3996 + vec2( 1.0, 1.0 ) );
						nodeVar4004 = fract( ( vec3( nodeVar4003.x, nodeVar4003.y, nodeVar4003.x ) * vec3( 0.1031 ) ) );
						nodeVar4004 = ( nodeVar4004 + vec3( dot( nodeVar4004, ( nodeVar4004.yzx + vec3( 33.33 ) ) ) ) );
						nodeVar3967 = ( nodeVar3967 + ( nodeVar3968 * mix( mix( fract( ( ( nodeVar3998.x + nodeVar3998.y ) * nodeVar3998.z ) ), fract( ( ( nodeVar4000.x + nodeVar4000.y ) * nodeVar4000.z ) ), nodeVar3997.x ), mix( fract( ( ( nodeVar4002.x + nodeVar4002.y ) * nodeVar4002.z ) ), fract( ( ( nodeVar4004.x + nodeVar4004.y ) * nodeVar4004.z ) ), nodeVar3997.x ), nodeVar3997.y ) ) );
						nodeVar3966 = ( nodeVar3966 * vec2( 2.03 ) );
						nodeVar3968 = ( nodeVar3968 * 0.52 );
						nodeVar4005 = smoothstep( 0.62, 0.92, nodeVar3967 );
						nodeVar3654 = vec3( ( ( ( nodeVar3922 * ( 0.62 + ( nodeVar3965 * 0.38 ) ) ) * 0.4 ) - ( nodeVar4005 * 0.22 ) ), ( nodeVar3922 * ( 1.0 - ( nodeVar4005 * 0.7 ) ) ), ( ( nodeVar3962 * 0.35 ) + ( nodeVar3965 * 0.65 ) ) );
						

					} else {


						if ( ( nodeVar3653 < 5.5 ) ) {

							nodeVar4006 = ( nodeVar3652 * vec2( 4.2 ) );
							nodeVar4007 = 0.0;
							nodeVar4008 = 0.5;
							nodeVar4009 = floor( nodeVar4006 );
							nodeVar4010 = fract( nodeVar4006 );
							nodeVar4010 = ( ( nodeVar4010 * nodeVar4010 ) * ( vec2( 3.0 ) - ( nodeVar4010 * vec2( 2.0 ) ) ) );
							nodeVar4011 = fract( ( vec3( nodeVar4009.x, nodeVar4009.y, nodeVar4009.x ) * vec3( 0.1031 ) ) );
							nodeVar4011 = ( nodeVar4011 + vec3( dot( nodeVar4011, ( nodeVar4011.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4012 = ( nodeVar4009 + vec2( 1.0, 0.0 ) );
							nodeVar4013 = fract( ( vec3( nodeVar4012.x, nodeVar4012.y, nodeVar4012.x ) * vec3( 0.1031 ) ) );
							nodeVar4013 = ( nodeVar4013 + vec3( dot( nodeVar4013, ( nodeVar4013.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4014 = ( nodeVar4009 + vec2( 0.0, 1.0 ) );
							nodeVar4015 = fract( ( vec3( nodeVar4014.x, nodeVar4014.y, nodeVar4014.x ) * vec3( 0.1031 ) ) );
							nodeVar4015 = ( nodeVar4015 + vec3( dot( nodeVar4015, ( nodeVar4015.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4016 = ( nodeVar4009 + vec2( 1.0, 1.0 ) );
							nodeVar4017 = fract( ( vec3( nodeVar4016.x, nodeVar4016.y, nodeVar4016.x ) * vec3( 0.1031 ) ) );
							nodeVar4017 = ( nodeVar4017 + vec3( dot( nodeVar4017, ( nodeVar4017.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4007 = ( nodeVar4007 + ( nodeVar4008 * mix( mix( fract( ( ( nodeVar4011.x + nodeVar4011.y ) * nodeVar4011.z ) ), fract( ( ( nodeVar4013.x + nodeVar4013.y ) * nodeVar4013.z ) ), nodeVar4010.x ), mix( fract( ( ( nodeVar4015.x + nodeVar4015.y ) * nodeVar4015.z ) ), fract( ( ( nodeVar4017.x + nodeVar4017.y ) * nodeVar4017.z ) ), nodeVar4010.x ), nodeVar4010.y ) ) );
							nodeVar4006 = ( nodeVar4006 * vec2( 2.03 ) );
							nodeVar4008 = ( nodeVar4008 * 0.52 );
							nodeVar4018 = floor( nodeVar4006 );
							nodeVar4019 = fract( nodeVar4006 );
							nodeVar4019 = ( ( nodeVar4019 * nodeVar4019 ) * ( vec2( 3.0 ) - ( nodeVar4019 * vec2( 2.0 ) ) ) );
							nodeVar4020 = fract( ( vec3( nodeVar4018.x, nodeVar4018.y, nodeVar4018.x ) * vec3( 0.1031 ) ) );
							nodeVar4020 = ( nodeVar4020 + vec3( dot( nodeVar4020, ( nodeVar4020.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4021 = ( nodeVar4018 + vec2( 1.0, 0.0 ) );
							nodeVar4022 = fract( ( vec3( nodeVar4021.x, nodeVar4021.y, nodeVar4021.x ) * vec3( 0.1031 ) ) );
							nodeVar4022 = ( nodeVar4022 + vec3( dot( nodeVar4022, ( nodeVar4022.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4023 = ( nodeVar4018 + vec2( 0.0, 1.0 ) );
							nodeVar4024 = fract( ( vec3( nodeVar4023.x, nodeVar4023.y, nodeVar4023.x ) * vec3( 0.1031 ) ) );
							nodeVar4024 = ( nodeVar4024 + vec3( dot( nodeVar4024, ( nodeVar4024.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4025 = ( nodeVar4018 + vec2( 1.0, 1.0 ) );
							nodeVar4026 = fract( ( vec3( nodeVar4025.x, nodeVar4025.y, nodeVar4025.x ) * vec3( 0.1031 ) ) );
							nodeVar4026 = ( nodeVar4026 + vec3( dot( nodeVar4026, ( nodeVar4026.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4007 = ( nodeVar4007 + ( nodeVar4008 * mix( mix( fract( ( ( nodeVar4020.x + nodeVar4020.y ) * nodeVar4020.z ) ), fract( ( ( nodeVar4022.x + nodeVar4022.y ) * nodeVar4022.z ) ), nodeVar4019.x ), mix( fract( ( ( nodeVar4024.x + nodeVar4024.y ) * nodeVar4024.z ) ), fract( ( ( nodeVar4026.x + nodeVar4026.y ) * nodeVar4026.z ) ), nodeVar4019.x ), nodeVar4019.y ) ) );
							nodeVar4006 = ( nodeVar4006 * vec2( 2.03 ) );
							nodeVar4008 = ( nodeVar4008 * 0.52 );
							nodeVar4027 = floor( nodeVar4006 );
							nodeVar4028 = fract( nodeVar4006 );
							nodeVar4028 = ( ( nodeVar4028 * nodeVar4028 ) * ( vec2( 3.0 ) - ( nodeVar4028 * vec2( 2.0 ) ) ) );
							nodeVar4029 = fract( ( vec3( nodeVar4027.x, nodeVar4027.y, nodeVar4027.x ) * vec3( 0.1031 ) ) );
							nodeVar4029 = ( nodeVar4029 + vec3( dot( nodeVar4029, ( nodeVar4029.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4030 = ( nodeVar4027 + vec2( 1.0, 0.0 ) );
							nodeVar4031 = fract( ( vec3( nodeVar4030.x, nodeVar4030.y, nodeVar4030.x ) * vec3( 0.1031 ) ) );
							nodeVar4031 = ( nodeVar4031 + vec3( dot( nodeVar4031, ( nodeVar4031.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4032 = ( nodeVar4027 + vec2( 0.0, 1.0 ) );
							nodeVar4033 = fract( ( vec3( nodeVar4032.x, nodeVar4032.y, nodeVar4032.x ) * vec3( 0.1031 ) ) );
							nodeVar4033 = ( nodeVar4033 + vec3( dot( nodeVar4033, ( nodeVar4033.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4034 = ( nodeVar4027 + vec2( 1.0, 1.0 ) );
							nodeVar4035 = fract( ( vec3( nodeVar4034.x, nodeVar4034.y, nodeVar4034.x ) * vec3( 0.1031 ) ) );
							nodeVar4035 = ( nodeVar4035 + vec3( dot( nodeVar4035, ( nodeVar4035.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4007 = ( nodeVar4007 + ( nodeVar4008 * mix( mix( fract( ( ( nodeVar4029.x + nodeVar4029.y ) * nodeVar4029.z ) ), fract( ( ( nodeVar4031.x + nodeVar4031.y ) * nodeVar4031.z ) ), nodeVar4028.x ), mix( fract( ( ( nodeVar4033.x + nodeVar4033.y ) * nodeVar4033.z ) ), fract( ( ( nodeVar4035.x + nodeVar4035.y ) * nodeVar4035.z ) ), nodeVar4028.x ), nodeVar4028.y ) ) );
							nodeVar4006 = ( nodeVar4006 * vec2( 2.03 ) );
							nodeVar4008 = ( nodeVar4008 * 0.52 );
							nodeVar4036 = floor( nodeVar4006 );
							nodeVar4037 = fract( nodeVar4006 );
							nodeVar4037 = ( ( nodeVar4037 * nodeVar4037 ) * ( vec2( 3.0 ) - ( nodeVar4037 * vec2( 2.0 ) ) ) );
							nodeVar4038 = fract( ( vec3( nodeVar4036.x, nodeVar4036.y, nodeVar4036.x ) * vec3( 0.1031 ) ) );
							nodeVar4038 = ( nodeVar4038 + vec3( dot( nodeVar4038, ( nodeVar4038.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4039 = ( nodeVar4036 + vec2( 1.0, 0.0 ) );
							nodeVar4040 = fract( ( vec3( nodeVar4039.x, nodeVar4039.y, nodeVar4039.x ) * vec3( 0.1031 ) ) );
							nodeVar4040 = ( nodeVar4040 + vec3( dot( nodeVar4040, ( nodeVar4040.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4041 = ( nodeVar4036 + vec2( 0.0, 1.0 ) );
							nodeVar4042 = fract( ( vec3( nodeVar4041.x, nodeVar4041.y, nodeVar4041.x ) * vec3( 0.1031 ) ) );
							nodeVar4042 = ( nodeVar4042 + vec3( dot( nodeVar4042, ( nodeVar4042.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4043 = ( nodeVar4036 + vec2( 1.0, 1.0 ) );
							nodeVar4044 = fract( ( vec3( nodeVar4043.x, nodeVar4043.y, nodeVar4043.x ) * vec3( 0.1031 ) ) );
							nodeVar4044 = ( nodeVar4044 + vec3( dot( nodeVar4044, ( nodeVar4044.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4007 = ( nodeVar4007 + ( nodeVar4008 * mix( mix( fract( ( ( nodeVar4038.x + nodeVar4038.y ) * nodeVar4038.z ) ), fract( ( ( nodeVar4040.x + nodeVar4040.y ) * nodeVar4040.z ) ), nodeVar4037.x ), mix( fract( ( ( nodeVar4042.x + nodeVar4042.y ) * nodeVar4042.z ) ), fract( ( ( nodeVar4044.x + nodeVar4044.y ) * nodeVar4044.z ) ), nodeVar4037.x ), nodeVar4037.y ) ) );
							nodeVar4006 = ( nodeVar4006 * vec2( 2.03 ) );
							nodeVar4008 = ( nodeVar4008 * 0.52 );
							nodeVar4045 = ( nodeVar3652 * vec2( 19.0 ) );
							nodeVar4046 = 0.0;
							nodeVar4047 = 0.5;
							nodeVar4048 = floor( nodeVar4045 );
							nodeVar4049 = fract( nodeVar4045 );
							nodeVar4049 = ( ( nodeVar4049 * nodeVar4049 ) * ( vec2( 3.0 ) - ( nodeVar4049 * vec2( 2.0 ) ) ) );
							nodeVar4050 = fract( ( vec3( nodeVar4048.x, nodeVar4048.y, nodeVar4048.x ) * vec3( 0.1031 ) ) );
							nodeVar4050 = ( nodeVar4050 + vec3( dot( nodeVar4050, ( nodeVar4050.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4051 = ( nodeVar4048 + vec2( 1.0, 0.0 ) );
							nodeVar4052 = fract( ( vec3( nodeVar4051.x, nodeVar4051.y, nodeVar4051.x ) * vec3( 0.1031 ) ) );
							nodeVar4052 = ( nodeVar4052 + vec3( dot( nodeVar4052, ( nodeVar4052.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4053 = ( nodeVar4048 + vec2( 0.0, 1.0 ) );
							nodeVar4054 = fract( ( vec3( nodeVar4053.x, nodeVar4053.y, nodeVar4053.x ) * vec3( 0.1031 ) ) );
							nodeVar4054 = ( nodeVar4054 + vec3( dot( nodeVar4054, ( nodeVar4054.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4055 = ( nodeVar4048 + vec2( 1.0, 1.0 ) );
							nodeVar4056 = fract( ( vec3( nodeVar4055.x, nodeVar4055.y, nodeVar4055.x ) * vec3( 0.1031 ) ) );
							nodeVar4056 = ( nodeVar4056 + vec3( dot( nodeVar4056, ( nodeVar4056.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4046 = ( nodeVar4046 + ( nodeVar4047 * mix( mix( fract( ( ( nodeVar4050.x + nodeVar4050.y ) * nodeVar4050.z ) ), fract( ( ( nodeVar4052.x + nodeVar4052.y ) * nodeVar4052.z ) ), nodeVar4049.x ), mix( fract( ( ( nodeVar4054.x + nodeVar4054.y ) * nodeVar4054.z ) ), fract( ( ( nodeVar4056.x + nodeVar4056.y ) * nodeVar4056.z ) ), nodeVar4049.x ), nodeVar4049.y ) ) );
							nodeVar4045 = ( nodeVar4045 * vec2( 2.03 ) );
							nodeVar4047 = ( nodeVar4047 * 0.52 );
							nodeVar4057 = floor( nodeVar4045 );
							nodeVar4058 = fract( nodeVar4045 );
							nodeVar4058 = ( ( nodeVar4058 * nodeVar4058 ) * ( vec2( 3.0 ) - ( nodeVar4058 * vec2( 2.0 ) ) ) );
							nodeVar4059 = fract( ( vec3( nodeVar4057.x, nodeVar4057.y, nodeVar4057.x ) * vec3( 0.1031 ) ) );
							nodeVar4059 = ( nodeVar4059 + vec3( dot( nodeVar4059, ( nodeVar4059.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4060 = ( nodeVar4057 + vec2( 1.0, 0.0 ) );
							nodeVar4061 = fract( ( vec3( nodeVar4060.x, nodeVar4060.y, nodeVar4060.x ) * vec3( 0.1031 ) ) );
							nodeVar4061 = ( nodeVar4061 + vec3( dot( nodeVar4061, ( nodeVar4061.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4062 = ( nodeVar4057 + vec2( 0.0, 1.0 ) );
							nodeVar4063 = fract( ( vec3( nodeVar4062.x, nodeVar4062.y, nodeVar4062.x ) * vec3( 0.1031 ) ) );
							nodeVar4063 = ( nodeVar4063 + vec3( dot( nodeVar4063, ( nodeVar4063.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4064 = ( nodeVar4057 + vec2( 1.0, 1.0 ) );
							nodeVar4065 = fract( ( vec3( nodeVar4064.x, nodeVar4064.y, nodeVar4064.x ) * vec3( 0.1031 ) ) );
							nodeVar4065 = ( nodeVar4065 + vec3( dot( nodeVar4065, ( nodeVar4065.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4046 = ( nodeVar4046 + ( nodeVar4047 * mix( mix( fract( ( ( nodeVar4059.x + nodeVar4059.y ) * nodeVar4059.z ) ), fract( ( ( nodeVar4061.x + nodeVar4061.y ) * nodeVar4061.z ) ), nodeVar4058.x ), mix( fract( ( ( nodeVar4063.x + nodeVar4063.y ) * nodeVar4063.z ) ), fract( ( ( nodeVar4065.x + nodeVar4065.y ) * nodeVar4065.z ) ), nodeVar4058.x ), nodeVar4058.y ) ) );
							nodeVar4045 = ( nodeVar4045 * vec2( 2.03 ) );
							nodeVar4047 = ( nodeVar4047 * 0.52 );
							nodeVar4066 = floor( nodeVar4045 );
							nodeVar4067 = fract( nodeVar4045 );
							nodeVar4067 = ( ( nodeVar4067 * nodeVar4067 ) * ( vec2( 3.0 ) - ( nodeVar4067 * vec2( 2.0 ) ) ) );
							nodeVar4068 = fract( ( vec3( nodeVar4066.x, nodeVar4066.y, nodeVar4066.x ) * vec3( 0.1031 ) ) );
							nodeVar4068 = ( nodeVar4068 + vec3( dot( nodeVar4068, ( nodeVar4068.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4069 = ( nodeVar4066 + vec2( 1.0, 0.0 ) );
							nodeVar4070 = fract( ( vec3( nodeVar4069.x, nodeVar4069.y, nodeVar4069.x ) * vec3( 0.1031 ) ) );
							nodeVar4070 = ( nodeVar4070 + vec3( dot( nodeVar4070, ( nodeVar4070.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4071 = ( nodeVar4066 + vec2( 0.0, 1.0 ) );
							nodeVar4072 = fract( ( vec3( nodeVar4071.x, nodeVar4071.y, nodeVar4071.x ) * vec3( 0.1031 ) ) );
							nodeVar4072 = ( nodeVar4072 + vec3( dot( nodeVar4072, ( nodeVar4072.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4073 = ( nodeVar4066 + vec2( 1.0, 1.0 ) );
							nodeVar4074 = fract( ( vec3( nodeVar4073.x, nodeVar4073.y, nodeVar4073.x ) * vec3( 0.1031 ) ) );
							nodeVar4074 = ( nodeVar4074 + vec3( dot( nodeVar4074, ( nodeVar4074.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4046 = ( nodeVar4046 + ( nodeVar4047 * mix( mix( fract( ( ( nodeVar4068.x + nodeVar4068.y ) * nodeVar4068.z ) ), fract( ( ( nodeVar4070.x + nodeVar4070.y ) * nodeVar4070.z ) ), nodeVar4067.x ), mix( fract( ( ( nodeVar4072.x + nodeVar4072.y ) * nodeVar4072.z ) ), fract( ( ( nodeVar4074.x + nodeVar4074.y ) * nodeVar4074.z ) ), nodeVar4067.x ), nodeVar4067.y ) ) );
							nodeVar4045 = ( nodeVar4045 * vec2( 2.03 ) );
							nodeVar4047 = ( nodeVar4047 * 0.52 );
							nodeVar4075 = floor( nodeVar4045 );
							nodeVar4076 = fract( nodeVar4045 );
							nodeVar4076 = ( ( nodeVar4076 * nodeVar4076 ) * ( vec2( 3.0 ) - ( nodeVar4076 * vec2( 2.0 ) ) ) );
							nodeVar4077 = fract( ( vec3( nodeVar4075.x, nodeVar4075.y, nodeVar4075.x ) * vec3( 0.1031 ) ) );
							nodeVar4077 = ( nodeVar4077 + vec3( dot( nodeVar4077, ( nodeVar4077.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4078 = ( nodeVar4075 + vec2( 1.0, 0.0 ) );
							nodeVar4079 = fract( ( vec3( nodeVar4078.x, nodeVar4078.y, nodeVar4078.x ) * vec3( 0.1031 ) ) );
							nodeVar4079 = ( nodeVar4079 + vec3( dot( nodeVar4079, ( nodeVar4079.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4080 = ( nodeVar4075 + vec2( 0.0, 1.0 ) );
							nodeVar4081 = fract( ( vec3( nodeVar4080.x, nodeVar4080.y, nodeVar4080.x ) * vec3( 0.1031 ) ) );
							nodeVar4081 = ( nodeVar4081 + vec3( dot( nodeVar4081, ( nodeVar4081.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4082 = ( nodeVar4075 + vec2( 1.0, 1.0 ) );
							nodeVar4083 = fract( ( vec3( nodeVar4082.x, nodeVar4082.y, nodeVar4082.x ) * vec3( 0.1031 ) ) );
							nodeVar4083 = ( nodeVar4083 + vec3( dot( nodeVar4083, ( nodeVar4083.yzx + vec3( 33.33 ) ) ) ) );
							nodeVar4046 = ( nodeVar4046 + ( nodeVar4047 * mix( mix( fract( ( ( nodeVar4077.x + nodeVar4077.y ) * nodeVar4077.z ) ), fract( ( ( nodeVar4079.x + nodeVar4079.y ) * nodeVar4079.z ) ), nodeVar4076.x ), mix( fract( ( ( nodeVar4081.x + nodeVar4081.y ) * nodeVar4081.z ) ), fract( ( ( nodeVar4083.x + nodeVar4083.y ) * nodeVar4083.z ) ), nodeVar4076.x ), nodeVar4076.y ) ) );
							nodeVar4045 = ( nodeVar4045 * vec2( 2.03 ) );
							nodeVar4047 = ( nodeVar4047 * 0.52 );
							nodeVar4084 = ( ( nodeVar4007 * 0.6 ) + ( nodeVar4046 * 0.4 ) );
							nodeVar3654 = vec3( ( nodeVar4084 * 0.6 ), ( 0.7 + ( nodeVar4084 * 0.3 ) ), nodeVar4084 );
							

						} else {


							if ( ( nodeVar3653 < 6.5 ) ) {

								nodeVar4085 = vec2( ( nodeVar3652.x * 90.0 ), ( nodeVar3652.y * 4.0 ) );
								nodeVar4086 = 0.0;
								nodeVar4087 = 0.5;
								nodeVar4088 = floor( nodeVar4085 );
								nodeVar4089 = fract( nodeVar4085 );
								nodeVar4089 = ( ( nodeVar4089 * nodeVar4089 ) * ( vec2( 3.0 ) - ( nodeVar4089 * vec2( 2.0 ) ) ) );
								nodeVar4090 = fract( ( vec3( nodeVar4088.x, nodeVar4088.y, nodeVar4088.x ) * vec3( 0.1031 ) ) );
								nodeVar4090 = ( nodeVar4090 + vec3( dot( nodeVar4090, ( nodeVar4090.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4091 = ( nodeVar4088 + vec2( 1.0, 0.0 ) );
								nodeVar4092 = fract( ( vec3( nodeVar4091.x, nodeVar4091.y, nodeVar4091.x ) * vec3( 0.1031 ) ) );
								nodeVar4092 = ( nodeVar4092 + vec3( dot( nodeVar4092, ( nodeVar4092.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4093 = ( nodeVar4088 + vec2( 0.0, 1.0 ) );
								nodeVar4094 = fract( ( vec3( nodeVar4093.x, nodeVar4093.y, nodeVar4093.x ) * vec3( 0.1031 ) ) );
								nodeVar4094 = ( nodeVar4094 + vec3( dot( nodeVar4094, ( nodeVar4094.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4095 = ( nodeVar4088 + vec2( 1.0, 1.0 ) );
								nodeVar4096 = fract( ( vec3( nodeVar4095.x, nodeVar4095.y, nodeVar4095.x ) * vec3( 0.1031 ) ) );
								nodeVar4096 = ( nodeVar4096 + vec3( dot( nodeVar4096, ( nodeVar4096.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4086 = ( nodeVar4086 + ( nodeVar4087 * mix( mix( fract( ( ( nodeVar4090.x + nodeVar4090.y ) * nodeVar4090.z ) ), fract( ( ( nodeVar4092.x + nodeVar4092.y ) * nodeVar4092.z ) ), nodeVar4089.x ), mix( fract( ( ( nodeVar4094.x + nodeVar4094.y ) * nodeVar4094.z ) ), fract( ( ( nodeVar4096.x + nodeVar4096.y ) * nodeVar4096.z ) ), nodeVar4089.x ), nodeVar4089.y ) ) );
								nodeVar4085 = ( nodeVar4085 * vec2( 2.03 ) );
								nodeVar4087 = ( nodeVar4087 * 0.52 );
								nodeVar4097 = floor( nodeVar4085 );
								nodeVar4098 = fract( nodeVar4085 );
								nodeVar4098 = ( ( nodeVar4098 * nodeVar4098 ) * ( vec2( 3.0 ) - ( nodeVar4098 * vec2( 2.0 ) ) ) );
								nodeVar4099 = fract( ( vec3( nodeVar4097.x, nodeVar4097.y, nodeVar4097.x ) * vec3( 0.1031 ) ) );
								nodeVar4099 = ( nodeVar4099 + vec3( dot( nodeVar4099, ( nodeVar4099.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4100 = ( nodeVar4097 + vec2( 1.0, 0.0 ) );
								nodeVar4101 = fract( ( vec3( nodeVar4100.x, nodeVar4100.y, nodeVar4100.x ) * vec3( 0.1031 ) ) );
								nodeVar4101 = ( nodeVar4101 + vec3( dot( nodeVar4101, ( nodeVar4101.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4102 = ( nodeVar4097 + vec2( 0.0, 1.0 ) );
								nodeVar4103 = fract( ( vec3( nodeVar4102.x, nodeVar4102.y, nodeVar4102.x ) * vec3( 0.1031 ) ) );
								nodeVar4103 = ( nodeVar4103 + vec3( dot( nodeVar4103, ( nodeVar4103.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4104 = ( nodeVar4097 + vec2( 1.0, 1.0 ) );
								nodeVar4105 = fract( ( vec3( nodeVar4104.x, nodeVar4104.y, nodeVar4104.x ) * vec3( 0.1031 ) ) );
								nodeVar4105 = ( nodeVar4105 + vec3( dot( nodeVar4105, ( nodeVar4105.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4086 = ( nodeVar4086 + ( nodeVar4087 * mix( mix( fract( ( ( nodeVar4099.x + nodeVar4099.y ) * nodeVar4099.z ) ), fract( ( ( nodeVar4101.x + nodeVar4101.y ) * nodeVar4101.z ) ), nodeVar4098.x ), mix( fract( ( ( nodeVar4103.x + nodeVar4103.y ) * nodeVar4103.z ) ), fract( ( ( nodeVar4105.x + nodeVar4105.y ) * nodeVar4105.z ) ), nodeVar4098.x ), nodeVar4098.y ) ) );
								nodeVar4085 = ( nodeVar4085 * vec2( 2.03 ) );
								nodeVar4087 = ( nodeVar4087 * 0.52 );
								nodeVar4106 = floor( nodeVar4085 );
								nodeVar4107 = fract( nodeVar4085 );
								nodeVar4107 = ( ( nodeVar4107 * nodeVar4107 ) * ( vec2( 3.0 ) - ( nodeVar4107 * vec2( 2.0 ) ) ) );
								nodeVar4108 = fract( ( vec3( nodeVar4106.x, nodeVar4106.y, nodeVar4106.x ) * vec3( 0.1031 ) ) );
								nodeVar4108 = ( nodeVar4108 + vec3( dot( nodeVar4108, ( nodeVar4108.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4109 = ( nodeVar4106 + vec2( 1.0, 0.0 ) );
								nodeVar4110 = fract( ( vec3( nodeVar4109.x, nodeVar4109.y, nodeVar4109.x ) * vec3( 0.1031 ) ) );
								nodeVar4110 = ( nodeVar4110 + vec3( dot( nodeVar4110, ( nodeVar4110.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4111 = ( nodeVar4106 + vec2( 0.0, 1.0 ) );
								nodeVar4112 = fract( ( vec3( nodeVar4111.x, nodeVar4111.y, nodeVar4111.x ) * vec3( 0.1031 ) ) );
								nodeVar4112 = ( nodeVar4112 + vec3( dot( nodeVar4112, ( nodeVar4112.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4113 = ( nodeVar4106 + vec2( 1.0, 1.0 ) );
								nodeVar4114 = fract( ( vec3( nodeVar4113.x, nodeVar4113.y, nodeVar4113.x ) * vec3( 0.1031 ) ) );
								nodeVar4114 = ( nodeVar4114 + vec3( dot( nodeVar4114, ( nodeVar4114.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4086 = ( nodeVar4086 + ( nodeVar4087 * mix( mix( fract( ( ( nodeVar4108.x + nodeVar4108.y ) * nodeVar4108.z ) ), fract( ( ( nodeVar4110.x + nodeVar4110.y ) * nodeVar4110.z ) ), nodeVar4107.x ), mix( fract( ( ( nodeVar4112.x + nodeVar4112.y ) * nodeVar4112.z ) ), fract( ( ( nodeVar4114.x + nodeVar4114.y ) * nodeVar4114.z ) ), nodeVar4107.x ), nodeVar4107.y ) ) );
								nodeVar4085 = ( nodeVar4085 * vec2( 2.03 ) );
								nodeVar4087 = ( nodeVar4087 * 0.52 );
								nodeVar4115 = floor( nodeVar4085 );
								nodeVar4116 = fract( nodeVar4085 );
								nodeVar4116 = ( ( nodeVar4116 * nodeVar4116 ) * ( vec2( 3.0 ) - ( nodeVar4116 * vec2( 2.0 ) ) ) );
								nodeVar4117 = fract( ( vec3( nodeVar4115.x, nodeVar4115.y, nodeVar4115.x ) * vec3( 0.1031 ) ) );
								nodeVar4117 = ( nodeVar4117 + vec3( dot( nodeVar4117, ( nodeVar4117.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4118 = ( nodeVar4115 + vec2( 1.0, 0.0 ) );
								nodeVar4119 = fract( ( vec3( nodeVar4118.x, nodeVar4118.y, nodeVar4118.x ) * vec3( 0.1031 ) ) );
								nodeVar4119 = ( nodeVar4119 + vec3( dot( nodeVar4119, ( nodeVar4119.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4120 = ( nodeVar4115 + vec2( 0.0, 1.0 ) );
								nodeVar4121 = fract( ( vec3( nodeVar4120.x, nodeVar4120.y, nodeVar4120.x ) * vec3( 0.1031 ) ) );
								nodeVar4121 = ( nodeVar4121 + vec3( dot( nodeVar4121, ( nodeVar4121.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4122 = ( nodeVar4115 + vec2( 1.0, 1.0 ) );
								nodeVar4123 = fract( ( vec3( nodeVar4122.x, nodeVar4122.y, nodeVar4122.x ) * vec3( 0.1031 ) ) );
								nodeVar4123 = ( nodeVar4123 + vec3( dot( nodeVar4123, ( nodeVar4123.yzx + vec3( 33.33 ) ) ) ) );
								nodeVar4086 = ( nodeVar4086 + ( nodeVar4087 * mix( mix( fract( ( ( nodeVar4117.x + nodeVar4117.y ) * nodeVar4117.z ) ), fract( ( ( nodeVar4119.x + nodeVar4119.y ) * nodeVar4119.z ) ), nodeVar4116.x ), mix( fract( ( ( nodeVar4121.x + nodeVar4121.y ) * nodeVar4121.z ) ), fract( ( ( nodeVar4123.x + nodeVar4123.y ) * nodeVar4123.z ) ), nodeVar4116.x ), nodeVar4116.y ) ) );
								nodeVar4085 = ( nodeVar4085 * vec2( 2.03 ) );
								nodeVar4087 = ( nodeVar4087 * 0.52 );
								nodeVar4124 = nodeVar4086;
								nodeVar3654 = vec3( ( nodeVar4124 * 0.25 ), 1.0, nodeVar4124 );
								

							} else {


								if ( ( nodeVar3653 < 7.5 ) ) {

									nodeVar4125 = ( nodeVar3652 * vec2( 0.28 ) );
									nodeVar4126 = 0.0;
									nodeVar4127 = 0.5;
									nodeVar4128 = floor( nodeVar4125 );
									nodeVar4129 = fract( nodeVar4125 );
									nodeVar4129 = ( ( nodeVar4129 * nodeVar4129 ) * ( vec2( 3.0 ) - ( nodeVar4129 * vec2( 2.0 ) ) ) );
									nodeVar4130 = fract( ( vec3( nodeVar4128.x, nodeVar4128.y, nodeVar4128.x ) * vec3( 0.1031 ) ) );
									nodeVar4130 = ( nodeVar4130 + vec3( dot( nodeVar4130, ( nodeVar4130.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4131 = ( nodeVar4128 + vec2( 1.0, 0.0 ) );
									nodeVar4132 = fract( ( vec3( nodeVar4131.x, nodeVar4131.y, nodeVar4131.x ) * vec3( 0.1031 ) ) );
									nodeVar4132 = ( nodeVar4132 + vec3( dot( nodeVar4132, ( nodeVar4132.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4133 = ( nodeVar4128 + vec2( 0.0, 1.0 ) );
									nodeVar4134 = fract( ( vec3( nodeVar4133.x, nodeVar4133.y, nodeVar4133.x ) * vec3( 0.1031 ) ) );
									nodeVar4134 = ( nodeVar4134 + vec3( dot( nodeVar4134, ( nodeVar4134.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4135 = ( nodeVar4128 + vec2( 1.0, 1.0 ) );
									nodeVar4136 = fract( ( vec3( nodeVar4135.x, nodeVar4135.y, nodeVar4135.x ) * vec3( 0.1031 ) ) );
									nodeVar4136 = ( nodeVar4136 + vec3( dot( nodeVar4136, ( nodeVar4136.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4126 = ( nodeVar4126 + ( nodeVar4127 * mix( mix( fract( ( ( nodeVar4130.x + nodeVar4130.y ) * nodeVar4130.z ) ), fract( ( ( nodeVar4132.x + nodeVar4132.y ) * nodeVar4132.z ) ), nodeVar4129.x ), mix( fract( ( ( nodeVar4134.x + nodeVar4134.y ) * nodeVar4134.z ) ), fract( ( ( nodeVar4136.x + nodeVar4136.y ) * nodeVar4136.z ) ), nodeVar4129.x ), nodeVar4129.y ) ) );
									nodeVar4125 = ( nodeVar4125 * vec2( 2.11 ) );
									nodeVar4127 = ( nodeVar4127 * 0.5 );
									nodeVar4137 = floor( nodeVar4125 );
									nodeVar4138 = fract( nodeVar4125 );
									nodeVar4138 = ( ( nodeVar4138 * nodeVar4138 ) * ( vec2( 3.0 ) - ( nodeVar4138 * vec2( 2.0 ) ) ) );
									nodeVar4139 = fract( ( vec3( nodeVar4137.x, nodeVar4137.y, nodeVar4137.x ) * vec3( 0.1031 ) ) );
									nodeVar4139 = ( nodeVar4139 + vec3( dot( nodeVar4139, ( nodeVar4139.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4140 = ( nodeVar4137 + vec2( 1.0, 0.0 ) );
									nodeVar4141 = fract( ( vec3( nodeVar4140.x, nodeVar4140.y, nodeVar4140.x ) * vec3( 0.1031 ) ) );
									nodeVar4141 = ( nodeVar4141 + vec3( dot( nodeVar4141, ( nodeVar4141.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4142 = ( nodeVar4137 + vec2( 0.0, 1.0 ) );
									nodeVar4143 = fract( ( vec3( nodeVar4142.x, nodeVar4142.y, nodeVar4142.x ) * vec3( 0.1031 ) ) );
									nodeVar4143 = ( nodeVar4143 + vec3( dot( nodeVar4143, ( nodeVar4143.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4144 = ( nodeVar4137 + vec2( 1.0, 1.0 ) );
									nodeVar4145 = fract( ( vec3( nodeVar4144.x, nodeVar4144.y, nodeVar4144.x ) * vec3( 0.1031 ) ) );
									nodeVar4145 = ( nodeVar4145 + vec3( dot( nodeVar4145, ( nodeVar4145.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4126 = ( nodeVar4126 + ( nodeVar4127 * mix( mix( fract( ( ( nodeVar4139.x + nodeVar4139.y ) * nodeVar4139.z ) ), fract( ( ( nodeVar4141.x + nodeVar4141.y ) * nodeVar4141.z ) ), nodeVar4138.x ), mix( fract( ( ( nodeVar4143.x + nodeVar4143.y ) * nodeVar4143.z ) ), fract( ( ( nodeVar4145.x + nodeVar4145.y ) * nodeVar4145.z ) ), nodeVar4138.x ), nodeVar4138.y ) ) );
									nodeVar4125 = ( nodeVar4125 * vec2( 2.11 ) );
									nodeVar4127 = ( nodeVar4127 * 0.5 );
									nodeVar4146 = floor( nodeVar4125 );
									nodeVar4147 = fract( nodeVar4125 );
									nodeVar4147 = ( ( nodeVar4147 * nodeVar4147 ) * ( vec2( 3.0 ) - ( nodeVar4147 * vec2( 2.0 ) ) ) );
									nodeVar4148 = fract( ( vec3( nodeVar4146.x, nodeVar4146.y, nodeVar4146.x ) * vec3( 0.1031 ) ) );
									nodeVar4148 = ( nodeVar4148 + vec3( dot( nodeVar4148, ( nodeVar4148.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4149 = ( nodeVar4146 + vec2( 1.0, 0.0 ) );
									nodeVar4150 = fract( ( vec3( nodeVar4149.x, nodeVar4149.y, nodeVar4149.x ) * vec3( 0.1031 ) ) );
									nodeVar4150 = ( nodeVar4150 + vec3( dot( nodeVar4150, ( nodeVar4150.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4151 = ( nodeVar4146 + vec2( 0.0, 1.0 ) );
									nodeVar4152 = fract( ( vec3( nodeVar4151.x, nodeVar4151.y, nodeVar4151.x ) * vec3( 0.1031 ) ) );
									nodeVar4152 = ( nodeVar4152 + vec3( dot( nodeVar4152, ( nodeVar4152.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4153 = ( nodeVar4146 + vec2( 1.0, 1.0 ) );
									nodeVar4154 = fract( ( vec3( nodeVar4153.x, nodeVar4153.y, nodeVar4153.x ) * vec3( 0.1031 ) ) );
									nodeVar4154 = ( nodeVar4154 + vec3( dot( nodeVar4154, ( nodeVar4154.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4126 = ( nodeVar4126 + ( nodeVar4127 * mix( mix( fract( ( ( nodeVar4148.x + nodeVar4148.y ) * nodeVar4148.z ) ), fract( ( ( nodeVar4150.x + nodeVar4150.y ) * nodeVar4150.z ) ), nodeVar4147.x ), mix( fract( ( ( nodeVar4152.x + nodeVar4152.y ) * nodeVar4152.z ) ), fract( ( ( nodeVar4154.x + nodeVar4154.y ) * nodeVar4154.z ) ), nodeVar4147.x ), nodeVar4147.y ) ) );
									nodeVar4125 = ( nodeVar4125 * vec2( 2.11 ) );
									nodeVar4127 = ( nodeVar4127 * 0.5 );
									nodeVar4155 = ( ( nodeVar3652 * vec2( 0.28 ) ) + vec2( 19.0 ) );
									nodeVar4156 = 0.0;
									nodeVar4157 = 0.5;
									nodeVar4158 = floor( nodeVar4155 );
									nodeVar4159 = fract( nodeVar4155 );
									nodeVar4159 = ( ( nodeVar4159 * nodeVar4159 ) * ( vec2( 3.0 ) - ( nodeVar4159 * vec2( 2.0 ) ) ) );
									nodeVar4160 = fract( ( vec3( nodeVar4158.x, nodeVar4158.y, nodeVar4158.x ) * vec3( 0.1031 ) ) );
									nodeVar4160 = ( nodeVar4160 + vec3( dot( nodeVar4160, ( nodeVar4160.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4161 = ( nodeVar4158 + vec2( 1.0, 0.0 ) );
									nodeVar4162 = fract( ( vec3( nodeVar4161.x, nodeVar4161.y, nodeVar4161.x ) * vec3( 0.1031 ) ) );
									nodeVar4162 = ( nodeVar4162 + vec3( dot( nodeVar4162, ( nodeVar4162.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4163 = ( nodeVar4158 + vec2( 0.0, 1.0 ) );
									nodeVar4164 = fract( ( vec3( nodeVar4163.x, nodeVar4163.y, nodeVar4163.x ) * vec3( 0.1031 ) ) );
									nodeVar4164 = ( nodeVar4164 + vec3( dot( nodeVar4164, ( nodeVar4164.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4165 = ( nodeVar4158 + vec2( 1.0, 1.0 ) );
									nodeVar4166 = fract( ( vec3( nodeVar4165.x, nodeVar4165.y, nodeVar4165.x ) * vec3( 0.1031 ) ) );
									nodeVar4166 = ( nodeVar4166 + vec3( dot( nodeVar4166, ( nodeVar4166.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4156 = ( nodeVar4156 + ( nodeVar4157 * mix( mix( fract( ( ( nodeVar4160.x + nodeVar4160.y ) * nodeVar4160.z ) ), fract( ( ( nodeVar4162.x + nodeVar4162.y ) * nodeVar4162.z ) ), nodeVar4159.x ), mix( fract( ( ( nodeVar4164.x + nodeVar4164.y ) * nodeVar4164.z ) ), fract( ( ( nodeVar4166.x + nodeVar4166.y ) * nodeVar4166.z ) ), nodeVar4159.x ), nodeVar4159.y ) ) );
									nodeVar4155 = ( nodeVar4155 * vec2( 2.11 ) );
									nodeVar4157 = ( nodeVar4157 * 0.5 );
									nodeVar4167 = floor( nodeVar4155 );
									nodeVar4168 = fract( nodeVar4155 );
									nodeVar4168 = ( ( nodeVar4168 * nodeVar4168 ) * ( vec2( 3.0 ) - ( nodeVar4168 * vec2( 2.0 ) ) ) );
									nodeVar4169 = fract( ( vec3( nodeVar4167.x, nodeVar4167.y, nodeVar4167.x ) * vec3( 0.1031 ) ) );
									nodeVar4169 = ( nodeVar4169 + vec3( dot( nodeVar4169, ( nodeVar4169.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4170 = ( nodeVar4167 + vec2( 1.0, 0.0 ) );
									nodeVar4171 = fract( ( vec3( nodeVar4170.x, nodeVar4170.y, nodeVar4170.x ) * vec3( 0.1031 ) ) );
									nodeVar4171 = ( nodeVar4171 + vec3( dot( nodeVar4171, ( nodeVar4171.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4172 = ( nodeVar4167 + vec2( 0.0, 1.0 ) );
									nodeVar4173 = fract( ( vec3( nodeVar4172.x, nodeVar4172.y, nodeVar4172.x ) * vec3( 0.1031 ) ) );
									nodeVar4173 = ( nodeVar4173 + vec3( dot( nodeVar4173, ( nodeVar4173.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4174 = ( nodeVar4167 + vec2( 1.0, 1.0 ) );
									nodeVar4175 = fract( ( vec3( nodeVar4174.x, nodeVar4174.y, nodeVar4174.x ) * vec3( 0.1031 ) ) );
									nodeVar4175 = ( nodeVar4175 + vec3( dot( nodeVar4175, ( nodeVar4175.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4156 = ( nodeVar4156 + ( nodeVar4157 * mix( mix( fract( ( ( nodeVar4169.x + nodeVar4169.y ) * nodeVar4169.z ) ), fract( ( ( nodeVar4171.x + nodeVar4171.y ) * nodeVar4171.z ) ), nodeVar4168.x ), mix( fract( ( ( nodeVar4173.x + nodeVar4173.y ) * nodeVar4173.z ) ), fract( ( ( nodeVar4175.x + nodeVar4175.y ) * nodeVar4175.z ) ), nodeVar4168.x ), nodeVar4168.y ) ) );
									nodeVar4155 = ( nodeVar4155 * vec2( 2.11 ) );
									nodeVar4157 = ( nodeVar4157 * 0.5 );
									nodeVar4176 = floor( nodeVar4155 );
									nodeVar4177 = fract( nodeVar4155 );
									nodeVar4177 = ( ( nodeVar4177 * nodeVar4177 ) * ( vec2( 3.0 ) - ( nodeVar4177 * vec2( 2.0 ) ) ) );
									nodeVar4178 = fract( ( vec3( nodeVar4176.x, nodeVar4176.y, nodeVar4176.x ) * vec3( 0.1031 ) ) );
									nodeVar4178 = ( nodeVar4178 + vec3( dot( nodeVar4178, ( nodeVar4178.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4179 = ( nodeVar4176 + vec2( 1.0, 0.0 ) );
									nodeVar4180 = fract( ( vec3( nodeVar4179.x, nodeVar4179.y, nodeVar4179.x ) * vec3( 0.1031 ) ) );
									nodeVar4180 = ( nodeVar4180 + vec3( dot( nodeVar4180, ( nodeVar4180.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4181 = ( nodeVar4176 + vec2( 0.0, 1.0 ) );
									nodeVar4182 = fract( ( vec3( nodeVar4181.x, nodeVar4181.y, nodeVar4181.x ) * vec3( 0.1031 ) ) );
									nodeVar4182 = ( nodeVar4182 + vec3( dot( nodeVar4182, ( nodeVar4182.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4183 = ( nodeVar4176 + vec2( 1.0, 1.0 ) );
									nodeVar4184 = fract( ( vec3( nodeVar4183.x, nodeVar4183.y, nodeVar4183.x ) * vec3( 0.1031 ) ) );
									nodeVar4184 = ( nodeVar4184 + vec3( dot( nodeVar4184, ( nodeVar4184.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4156 = ( nodeVar4156 + ( nodeVar4157 * mix( mix( fract( ( ( nodeVar4178.x + nodeVar4178.y ) * nodeVar4178.z ) ), fract( ( ( nodeVar4180.x + nodeVar4180.y ) * nodeVar4180.z ) ), nodeVar4177.x ), mix( fract( ( ( nodeVar4182.x + nodeVar4182.y ) * nodeVar4182.z ) ), fract( ( ( nodeVar4184.x + nodeVar4184.y ) * nodeVar4184.z ) ), nodeVar4177.x ), nodeVar4177.y ) ) );
									nodeVar4155 = ( nodeVar4155 * vec2( 2.11 ) );
									nodeVar4157 = ( nodeVar4157 * 0.5 );
									nodeVar4185 = ( vec2( nodeVar4126, nodeVar4156 ) - vec2( 0.5 ) );
									nodeVar4186 = ( ( nodeVar3652 * vec2( 4.05 ) ) + ( nodeVar4185 * vec2( 0.85 ) ) );
									nodeVar4187 = floor( nodeVar4186 );
									nodeVar4188 = fract( nodeVar4186 );
									nodeVar4189 = 9.0;
									nodeVar4190 = 9.0;
									nodeVar4191 = vec2( 0.0, 0.0 );
									nodeVar4192 = ( nodeVar4187 + vec2( -1.0, -1.0 ) );
									nodeVar4193 = fract( ( vec3( nodeVar4192.x, nodeVar4192.y, nodeVar4192.x ) * vec3( 0.1031 ) ) );
									nodeVar4193 = ( nodeVar4193 + vec3( dot( nodeVar4193, ( nodeVar4193.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4194 = ( ( nodeVar4187 + vec2( -1.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar4195 = fract( ( vec3( nodeVar4194.x, nodeVar4194.y, nodeVar4194.x ) * vec3( 0.1031 ) ) );
									nodeVar4195 = ( nodeVar4195 + vec3( dot( nodeVar4195, ( nodeVar4195.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4196 = length( ( ( vec2( -1.0, -1.0 ) + vec2( fract( ( ( nodeVar4193.x + nodeVar4193.y ) * nodeVar4193.z ) ), fract( ( ( nodeVar4195.x + nodeVar4195.y ) * nodeVar4195.z ) ) ) ) - nodeVar4188 ) );

									if ( ( nodeVar4196 < nodeVar4189 ) ) {

										nodeVar4190 = nodeVar4189;
										nodeVar4189 = nodeVar4196;
										nodeVar4191 = ( nodeVar4187 + vec2( -1.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar4196 < nodeVar4190 ) ) {

											nodeVar4190 = nodeVar4196;
											

										}

										

									}

									nodeVar4197 = ( nodeVar4187 + vec2( 0.0, -1.0 ) );
									nodeVar4198 = fract( ( vec3( nodeVar4197.x, nodeVar4197.y, nodeVar4197.x ) * vec3( 0.1031 ) ) );
									nodeVar4198 = ( nodeVar4198 + vec3( dot( nodeVar4198, ( nodeVar4198.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4199 = ( ( nodeVar4187 + vec2( 0.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar4200 = fract( ( vec3( nodeVar4199.x, nodeVar4199.y, nodeVar4199.x ) * vec3( 0.1031 ) ) );
									nodeVar4200 = ( nodeVar4200 + vec3( dot( nodeVar4200, ( nodeVar4200.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4201 = length( ( ( vec2( 0.0, -1.0 ) + vec2( fract( ( ( nodeVar4198.x + nodeVar4198.y ) * nodeVar4198.z ) ), fract( ( ( nodeVar4200.x + nodeVar4200.y ) * nodeVar4200.z ) ) ) ) - nodeVar4188 ) );

									if ( ( nodeVar4201 < nodeVar4189 ) ) {

										nodeVar4190 = nodeVar4189;
										nodeVar4189 = nodeVar4201;
										nodeVar4191 = ( nodeVar4187 + vec2( 0.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar4201 < nodeVar4190 ) ) {

											nodeVar4190 = nodeVar4201;
											

										}

										

									}

									nodeVar4202 = ( nodeVar4187 + vec2( 1.0, -1.0 ) );
									nodeVar4203 = fract( ( vec3( nodeVar4202.x, nodeVar4202.y, nodeVar4202.x ) * vec3( 0.1031 ) ) );
									nodeVar4203 = ( nodeVar4203 + vec3( dot( nodeVar4203, ( nodeVar4203.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4204 = ( ( nodeVar4187 + vec2( 1.0, -1.0 ) ) + vec2( 41.7 ) );
									nodeVar4205 = fract( ( vec3( nodeVar4204.x, nodeVar4204.y, nodeVar4204.x ) * vec3( 0.1031 ) ) );
									nodeVar4205 = ( nodeVar4205 + vec3( dot( nodeVar4205, ( nodeVar4205.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4206 = length( ( ( vec2( 1.0, -1.0 ) + vec2( fract( ( ( nodeVar4203.x + nodeVar4203.y ) * nodeVar4203.z ) ), fract( ( ( nodeVar4205.x + nodeVar4205.y ) * nodeVar4205.z ) ) ) ) - nodeVar4188 ) );

									if ( ( nodeVar4206 < nodeVar4189 ) ) {

										nodeVar4190 = nodeVar4189;
										nodeVar4189 = nodeVar4206;
										nodeVar4191 = ( nodeVar4187 + vec2( 1.0, -1.0 ) );
										

									} else {


										if ( ( nodeVar4206 < nodeVar4190 ) ) {

											nodeVar4190 = nodeVar4206;
											

										}

										

									}

									nodeVar4207 = ( nodeVar4187 + vec2( -1.0, 0.0 ) );
									nodeVar4208 = fract( ( vec3( nodeVar4207.x, nodeVar4207.y, nodeVar4207.x ) * vec3( 0.1031 ) ) );
									nodeVar4208 = ( nodeVar4208 + vec3( dot( nodeVar4208, ( nodeVar4208.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4209 = ( ( nodeVar4187 + vec2( -1.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar4210 = fract( ( vec3( nodeVar4209.x, nodeVar4209.y, nodeVar4209.x ) * vec3( 0.1031 ) ) );
									nodeVar4210 = ( nodeVar4210 + vec3( dot( nodeVar4210, ( nodeVar4210.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4211 = length( ( ( vec2( -1.0, 0.0 ) + vec2( fract( ( ( nodeVar4208.x + nodeVar4208.y ) * nodeVar4208.z ) ), fract( ( ( nodeVar4210.x + nodeVar4210.y ) * nodeVar4210.z ) ) ) ) - nodeVar4188 ) );

									if ( ( nodeVar4211 < nodeVar4189 ) ) {

										nodeVar4190 = nodeVar4189;
										nodeVar4189 = nodeVar4211;
										nodeVar4191 = ( nodeVar4187 + vec2( -1.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar4211 < nodeVar4190 ) ) {

											nodeVar4190 = nodeVar4211;
											

										}

										

									}

									nodeVar4212 = ( nodeVar4187 + vec2( 0.0, 0.0 ) );
									nodeVar4213 = fract( ( vec3( nodeVar4212.x, nodeVar4212.y, nodeVar4212.x ) * vec3( 0.1031 ) ) );
									nodeVar4213 = ( nodeVar4213 + vec3( dot( nodeVar4213, ( nodeVar4213.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4214 = ( ( nodeVar4187 + vec2( 0.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar4215 = fract( ( vec3( nodeVar4214.x, nodeVar4214.y, nodeVar4214.x ) * vec3( 0.1031 ) ) );
									nodeVar4215 = ( nodeVar4215 + vec3( dot( nodeVar4215, ( nodeVar4215.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4216 = length( ( ( vec2( 0.0, 0.0 ) + vec2( fract( ( ( nodeVar4213.x + nodeVar4213.y ) * nodeVar4213.z ) ), fract( ( ( nodeVar4215.x + nodeVar4215.y ) * nodeVar4215.z ) ) ) ) - nodeVar4188 ) );

									if ( ( nodeVar4216 < nodeVar4189 ) ) {

										nodeVar4190 = nodeVar4189;
										nodeVar4189 = nodeVar4216;
										nodeVar4191 = ( nodeVar4187 + vec2( 0.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar4216 < nodeVar4190 ) ) {

											nodeVar4190 = nodeVar4216;
											

										}

										

									}

									nodeVar4217 = ( nodeVar4187 + vec2( 1.0, 0.0 ) );
									nodeVar4218 = fract( ( vec3( nodeVar4217.x, nodeVar4217.y, nodeVar4217.x ) * vec3( 0.1031 ) ) );
									nodeVar4218 = ( nodeVar4218 + vec3( dot( nodeVar4218, ( nodeVar4218.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4219 = ( ( nodeVar4187 + vec2( 1.0, 0.0 ) ) + vec2( 41.7 ) );
									nodeVar4220 = fract( ( vec3( nodeVar4219.x, nodeVar4219.y, nodeVar4219.x ) * vec3( 0.1031 ) ) );
									nodeVar4220 = ( nodeVar4220 + vec3( dot( nodeVar4220, ( nodeVar4220.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4221 = length( ( ( vec2( 1.0, 0.0 ) + vec2( fract( ( ( nodeVar4218.x + nodeVar4218.y ) * nodeVar4218.z ) ), fract( ( ( nodeVar4220.x + nodeVar4220.y ) * nodeVar4220.z ) ) ) ) - nodeVar4188 ) );

									if ( ( nodeVar4221 < nodeVar4189 ) ) {

										nodeVar4190 = nodeVar4189;
										nodeVar4189 = nodeVar4221;
										nodeVar4191 = ( nodeVar4187 + vec2( 1.0, 0.0 ) );
										

									} else {


										if ( ( nodeVar4221 < nodeVar4190 ) ) {

											nodeVar4190 = nodeVar4221;
											

										}

										

									}

									nodeVar4222 = ( nodeVar4187 + vec2( -1.0, 1.0 ) );
									nodeVar4223 = fract( ( vec3( nodeVar4222.x, nodeVar4222.y, nodeVar4222.x ) * vec3( 0.1031 ) ) );
									nodeVar4223 = ( nodeVar4223 + vec3( dot( nodeVar4223, ( nodeVar4223.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4224 = ( ( nodeVar4187 + vec2( -1.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar4225 = fract( ( vec3( nodeVar4224.x, nodeVar4224.y, nodeVar4224.x ) * vec3( 0.1031 ) ) );
									nodeVar4225 = ( nodeVar4225 + vec3( dot( nodeVar4225, ( nodeVar4225.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4226 = length( ( ( vec2( -1.0, 1.0 ) + vec2( fract( ( ( nodeVar4223.x + nodeVar4223.y ) * nodeVar4223.z ) ), fract( ( ( nodeVar4225.x + nodeVar4225.y ) * nodeVar4225.z ) ) ) ) - nodeVar4188 ) );

									if ( ( nodeVar4226 < nodeVar4189 ) ) {

										nodeVar4190 = nodeVar4189;
										nodeVar4189 = nodeVar4226;
										nodeVar4191 = ( nodeVar4187 + vec2( -1.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar4226 < nodeVar4190 ) ) {

											nodeVar4190 = nodeVar4226;
											

										}

										

									}

									nodeVar4227 = ( nodeVar4187 + vec2( 0.0, 1.0 ) );
									nodeVar4228 = fract( ( vec3( nodeVar4227.x, nodeVar4227.y, nodeVar4227.x ) * vec3( 0.1031 ) ) );
									nodeVar4228 = ( nodeVar4228 + vec3( dot( nodeVar4228, ( nodeVar4228.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4229 = ( ( nodeVar4187 + vec2( 0.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar4230 = fract( ( vec3( nodeVar4229.x, nodeVar4229.y, nodeVar4229.x ) * vec3( 0.1031 ) ) );
									nodeVar4230 = ( nodeVar4230 + vec3( dot( nodeVar4230, ( nodeVar4230.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4231 = length( ( ( vec2( 0.0, 1.0 ) + vec2( fract( ( ( nodeVar4228.x + nodeVar4228.y ) * nodeVar4228.z ) ), fract( ( ( nodeVar4230.x + nodeVar4230.y ) * nodeVar4230.z ) ) ) ) - nodeVar4188 ) );

									if ( ( nodeVar4231 < nodeVar4189 ) ) {

										nodeVar4190 = nodeVar4189;
										nodeVar4189 = nodeVar4231;
										nodeVar4191 = ( nodeVar4187 + vec2( 0.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar4231 < nodeVar4190 ) ) {

											nodeVar4190 = nodeVar4231;
											

										}

										

									}

									nodeVar4232 = ( nodeVar4187 + vec2( 1.0, 1.0 ) );
									nodeVar4233 = fract( ( vec3( nodeVar4232.x, nodeVar4232.y, nodeVar4232.x ) * vec3( 0.1031 ) ) );
									nodeVar4233 = ( nodeVar4233 + vec3( dot( nodeVar4233, ( nodeVar4233.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4234 = ( ( nodeVar4187 + vec2( 1.0, 1.0 ) ) + vec2( 41.7 ) );
									nodeVar4235 = fract( ( vec3( nodeVar4234.x, nodeVar4234.y, nodeVar4234.x ) * vec3( 0.1031 ) ) );
									nodeVar4235 = ( nodeVar4235 + vec3( dot( nodeVar4235, ( nodeVar4235.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4236 = length( ( ( vec2( 1.0, 1.0 ) + vec2( fract( ( ( nodeVar4233.x + nodeVar4233.y ) * nodeVar4233.z ) ), fract( ( ( nodeVar4235.x + nodeVar4235.y ) * nodeVar4235.z ) ) ) ) - nodeVar4188 ) );

									if ( ( nodeVar4236 < nodeVar4189 ) ) {

										nodeVar4190 = nodeVar4189;
										nodeVar4189 = nodeVar4236;
										nodeVar4191 = ( nodeVar4187 + vec2( 1.0, 1.0 ) );
										

									} else {


										if ( ( nodeVar4236 < nodeVar4190 ) ) {

											nodeVar4190 = nodeVar4236;
											

										}

										

									}

									nodeVar4237 = smoothstep( 0.0, 0.038, ( nodeVar4190 - nodeVar4189 ) );
									nodeVar4238 = ( nodeVar4191 * vec2( 1.13 ) );
									nodeVar4239 = fract( ( vec3( nodeVar4238.x, nodeVar4238.y, nodeVar4238.x ) * vec3( 0.1031 ) ) );
									nodeVar4239 = ( nodeVar4239 + vec3( dot( nodeVar4239, ( nodeVar4239.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4240 = fract( ( ( nodeVar4239.x + nodeVar4239.y ) * nodeVar4239.z ) );
									nodeVar4241 = ( nodeVar3652 * vec2( 9.0 ) );
									nodeVar4242 = 0.0;
									nodeVar4243 = 0.5;
									nodeVar4244 = floor( nodeVar4241 );
									nodeVar4245 = fract( nodeVar4241 );
									nodeVar4245 = ( ( nodeVar4245 * nodeVar4245 ) * ( vec2( 3.0 ) - ( nodeVar4245 * vec2( 2.0 ) ) ) );
									nodeVar4246 = fract( ( vec3( nodeVar4244.x, nodeVar4244.y, nodeVar4244.x ) * vec3( 0.1031 ) ) );
									nodeVar4246 = ( nodeVar4246 + vec3( dot( nodeVar4246, ( nodeVar4246.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4247 = ( nodeVar4244 + vec2( 1.0, 0.0 ) );
									nodeVar4248 = fract( ( vec3( nodeVar4247.x, nodeVar4247.y, nodeVar4247.x ) * vec3( 0.1031 ) ) );
									nodeVar4248 = ( nodeVar4248 + vec3( dot( nodeVar4248, ( nodeVar4248.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4249 = ( nodeVar4244 + vec2( 0.0, 1.0 ) );
									nodeVar4250 = fract( ( vec3( nodeVar4249.x, nodeVar4249.y, nodeVar4249.x ) * vec3( 0.1031 ) ) );
									nodeVar4250 = ( nodeVar4250 + vec3( dot( nodeVar4250, ( nodeVar4250.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4251 = ( nodeVar4244 + vec2( 1.0, 1.0 ) );
									nodeVar4252 = fract( ( vec3( nodeVar4251.x, nodeVar4251.y, nodeVar4251.x ) * vec3( 0.1031 ) ) );
									nodeVar4252 = ( nodeVar4252 + vec3( dot( nodeVar4252, ( nodeVar4252.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4242 = ( nodeVar4242 + ( nodeVar4243 * mix( mix( fract( ( ( nodeVar4246.x + nodeVar4246.y ) * nodeVar4246.z ) ), fract( ( ( nodeVar4248.x + nodeVar4248.y ) * nodeVar4248.z ) ), nodeVar4245.x ), mix( fract( ( ( nodeVar4250.x + nodeVar4250.y ) * nodeVar4250.z ) ), fract( ( ( nodeVar4252.x + nodeVar4252.y ) * nodeVar4252.z ) ), nodeVar4245.x ), nodeVar4245.y ) ) );
									nodeVar4241 = ( nodeVar4241 * vec2( 2.03 ) );
									nodeVar4243 = ( nodeVar4243 * 0.52 );
									nodeVar4253 = floor( nodeVar4241 );
									nodeVar4254 = fract( nodeVar4241 );
									nodeVar4254 = ( ( nodeVar4254 * nodeVar4254 ) * ( vec2( 3.0 ) - ( nodeVar4254 * vec2( 2.0 ) ) ) );
									nodeVar4255 = fract( ( vec3( nodeVar4253.x, nodeVar4253.y, nodeVar4253.x ) * vec3( 0.1031 ) ) );
									nodeVar4255 = ( nodeVar4255 + vec3( dot( nodeVar4255, ( nodeVar4255.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4256 = ( nodeVar4253 + vec2( 1.0, 0.0 ) );
									nodeVar4257 = fract( ( vec3( nodeVar4256.x, nodeVar4256.y, nodeVar4256.x ) * vec3( 0.1031 ) ) );
									nodeVar4257 = ( nodeVar4257 + vec3( dot( nodeVar4257, ( nodeVar4257.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4258 = ( nodeVar4253 + vec2( 0.0, 1.0 ) );
									nodeVar4259 = fract( ( vec3( nodeVar4258.x, nodeVar4258.y, nodeVar4258.x ) * vec3( 0.1031 ) ) );
									nodeVar4259 = ( nodeVar4259 + vec3( dot( nodeVar4259, ( nodeVar4259.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4260 = ( nodeVar4253 + vec2( 1.0, 1.0 ) );
									nodeVar4261 = fract( ( vec3( nodeVar4260.x, nodeVar4260.y, nodeVar4260.x ) * vec3( 0.1031 ) ) );
									nodeVar4261 = ( nodeVar4261 + vec3( dot( nodeVar4261, ( nodeVar4261.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4242 = ( nodeVar4242 + ( nodeVar4243 * mix( mix( fract( ( ( nodeVar4255.x + nodeVar4255.y ) * nodeVar4255.z ) ), fract( ( ( nodeVar4257.x + nodeVar4257.y ) * nodeVar4257.z ) ), nodeVar4254.x ), mix( fract( ( ( nodeVar4259.x + nodeVar4259.y ) * nodeVar4259.z ) ), fract( ( ( nodeVar4261.x + nodeVar4261.y ) * nodeVar4261.z ) ), nodeVar4254.x ), nodeVar4254.y ) ) );
									nodeVar4241 = ( nodeVar4241 * vec2( 2.03 ) );
									nodeVar4243 = ( nodeVar4243 * 0.52 );
									nodeVar4262 = floor( nodeVar4241 );
									nodeVar4263 = fract( nodeVar4241 );
									nodeVar4263 = ( ( nodeVar4263 * nodeVar4263 ) * ( vec2( 3.0 ) - ( nodeVar4263 * vec2( 2.0 ) ) ) );
									nodeVar4264 = fract( ( vec3( nodeVar4262.x, nodeVar4262.y, nodeVar4262.x ) * vec3( 0.1031 ) ) );
									nodeVar4264 = ( nodeVar4264 + vec3( dot( nodeVar4264, ( nodeVar4264.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4265 = ( nodeVar4262 + vec2( 1.0, 0.0 ) );
									nodeVar4266 = fract( ( vec3( nodeVar4265.x, nodeVar4265.y, nodeVar4265.x ) * vec3( 0.1031 ) ) );
									nodeVar4266 = ( nodeVar4266 + vec3( dot( nodeVar4266, ( nodeVar4266.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4267 = ( nodeVar4262 + vec2( 0.0, 1.0 ) );
									nodeVar4268 = fract( ( vec3( nodeVar4267.x, nodeVar4267.y, nodeVar4267.x ) * vec3( 0.1031 ) ) );
									nodeVar4268 = ( nodeVar4268 + vec3( dot( nodeVar4268, ( nodeVar4268.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4269 = ( nodeVar4262 + vec2( 1.0, 1.0 ) );
									nodeVar4270 = fract( ( vec3( nodeVar4269.x, nodeVar4269.y, nodeVar4269.x ) * vec3( 0.1031 ) ) );
									nodeVar4270 = ( nodeVar4270 + vec3( dot( nodeVar4270, ( nodeVar4270.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4242 = ( nodeVar4242 + ( nodeVar4243 * mix( mix( fract( ( ( nodeVar4264.x + nodeVar4264.y ) * nodeVar4264.z ) ), fract( ( ( nodeVar4266.x + nodeVar4266.y ) * nodeVar4266.z ) ), nodeVar4263.x ), mix( fract( ( ( nodeVar4268.x + nodeVar4268.y ) * nodeVar4268.z ) ), fract( ( ( nodeVar4270.x + nodeVar4270.y ) * nodeVar4270.z ) ), nodeVar4263.x ), nodeVar4263.y ) ) );
									nodeVar4241 = ( nodeVar4241 * vec2( 2.03 ) );
									nodeVar4243 = ( nodeVar4243 * 0.52 );
									nodeVar4271 = floor( nodeVar4241 );
									nodeVar4272 = fract( nodeVar4241 );
									nodeVar4272 = ( ( nodeVar4272 * nodeVar4272 ) * ( vec2( 3.0 ) - ( nodeVar4272 * vec2( 2.0 ) ) ) );
									nodeVar4273 = fract( ( vec3( nodeVar4271.x, nodeVar4271.y, nodeVar4271.x ) * vec3( 0.1031 ) ) );
									nodeVar4273 = ( nodeVar4273 + vec3( dot( nodeVar4273, ( nodeVar4273.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4274 = ( nodeVar4271 + vec2( 1.0, 0.0 ) );
									nodeVar4275 = fract( ( vec3( nodeVar4274.x, nodeVar4274.y, nodeVar4274.x ) * vec3( 0.1031 ) ) );
									nodeVar4275 = ( nodeVar4275 + vec3( dot( nodeVar4275, ( nodeVar4275.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4276 = ( nodeVar4271 + vec2( 0.0, 1.0 ) );
									nodeVar4277 = fract( ( vec3( nodeVar4276.x, nodeVar4276.y, nodeVar4276.x ) * vec3( 0.1031 ) ) );
									nodeVar4277 = ( nodeVar4277 + vec3( dot( nodeVar4277, ( nodeVar4277.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4278 = ( nodeVar4271 + vec2( 1.0, 1.0 ) );
									nodeVar4279 = fract( ( vec3( nodeVar4278.x, nodeVar4278.y, nodeVar4278.x ) * vec3( 0.1031 ) ) );
									nodeVar4279 = ( nodeVar4279 + vec3( dot( nodeVar4279, ( nodeVar4279.yzx + vec3( 33.33 ) ) ) ) );
									nodeVar4242 = ( nodeVar4242 + ( nodeVar4243 * mix( mix( fract( ( ( nodeVar4273.x + nodeVar4273.y ) * nodeVar4273.z ) ), fract( ( ( nodeVar4275.x + nodeVar4275.y ) * nodeVar4275.z ) ), nodeVar4272.x ), mix( fract( ( ( nodeVar4277.x + nodeVar4277.y ) * nodeVar4277.z ) ), fract( ( ( nodeVar4279.x + nodeVar4279.y ) * nodeVar4279.z ) ), nodeVar4272.x ), nodeVar4272.y ) ) );
									nodeVar4241 = ( nodeVar4241 * vec2( 2.03 ) );
									nodeVar4243 = ( nodeVar4243 * 0.52 );
									nodeVar3654 = vec3( ( ( ( nodeVar4237 * ( 0.5 + ( nodeVar4240 * 0.5 ) ) ) * 0.5 ) + ( ( nodeVar4237 * 0.22 ) * nodeVar4242 ) ), nodeVar4237, nodeVar4240 );
									

								} else {


									if ( ( nodeVar3653 < 8.5 ) ) {

										nodeVar4280 = ( nodeVar3652 * vec2( 0.9 ) );
										nodeVar4281 = 0.0;
										nodeVar4282 = 0.5;
										nodeVar4283 = floor( nodeVar4280 );
										nodeVar4284 = fract( nodeVar4280 );
										nodeVar4284 = ( ( nodeVar4284 * nodeVar4284 ) * ( vec2( 3.0 ) - ( nodeVar4284 * vec2( 2.0 ) ) ) );
										nodeVar4285 = fract( ( vec3( nodeVar4283.x, nodeVar4283.y, nodeVar4283.x ) * vec3( 0.1031 ) ) );
										nodeVar4285 = ( nodeVar4285 + vec3( dot( nodeVar4285, ( nodeVar4285.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4286 = ( nodeVar4283 + vec2( 1.0, 0.0 ) );
										nodeVar4287 = fract( ( vec3( nodeVar4286.x, nodeVar4286.y, nodeVar4286.x ) * vec3( 0.1031 ) ) );
										nodeVar4287 = ( nodeVar4287 + vec3( dot( nodeVar4287, ( nodeVar4287.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4288 = ( nodeVar4283 + vec2( 0.0, 1.0 ) );
										nodeVar4289 = fract( ( vec3( nodeVar4288.x, nodeVar4288.y, nodeVar4288.x ) * vec3( 0.1031 ) ) );
										nodeVar4289 = ( nodeVar4289 + vec3( dot( nodeVar4289, ( nodeVar4289.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4290 = ( nodeVar4283 + vec2( 1.0, 1.0 ) );
										nodeVar4291 = fract( ( vec3( nodeVar4290.x, nodeVar4290.y, nodeVar4290.x ) * vec3( 0.1031 ) ) );
										nodeVar4291 = ( nodeVar4291 + vec3( dot( nodeVar4291, ( nodeVar4291.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4281 = ( nodeVar4281 + ( nodeVar4282 * mix( mix( fract( ( ( nodeVar4285.x + nodeVar4285.y ) * nodeVar4285.z ) ), fract( ( ( nodeVar4287.x + nodeVar4287.y ) * nodeVar4287.z ) ), nodeVar4284.x ), mix( fract( ( ( nodeVar4289.x + nodeVar4289.y ) * nodeVar4289.z ) ), fract( ( ( nodeVar4291.x + nodeVar4291.y ) * nodeVar4291.z ) ), nodeVar4284.x ), nodeVar4284.y ) ) );
										nodeVar4280 = ( nodeVar4280 * vec2( 2.03 ) );
										nodeVar4282 = ( nodeVar4282 * 0.52 );
										nodeVar4292 = floor( nodeVar4280 );
										nodeVar4293 = fract( nodeVar4280 );
										nodeVar4293 = ( ( nodeVar4293 * nodeVar4293 ) * ( vec2( 3.0 ) - ( nodeVar4293 * vec2( 2.0 ) ) ) );
										nodeVar4294 = fract( ( vec3( nodeVar4292.x, nodeVar4292.y, nodeVar4292.x ) * vec3( 0.1031 ) ) );
										nodeVar4294 = ( nodeVar4294 + vec3( dot( nodeVar4294, ( nodeVar4294.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4295 = ( nodeVar4292 + vec2( 1.0, 0.0 ) );
										nodeVar4296 = fract( ( vec3( nodeVar4295.x, nodeVar4295.y, nodeVar4295.x ) * vec3( 0.1031 ) ) );
										nodeVar4296 = ( nodeVar4296 + vec3( dot( nodeVar4296, ( nodeVar4296.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4297 = ( nodeVar4292 + vec2( 0.0, 1.0 ) );
										nodeVar4298 = fract( ( vec3( nodeVar4297.x, nodeVar4297.y, nodeVar4297.x ) * vec3( 0.1031 ) ) );
										nodeVar4298 = ( nodeVar4298 + vec3( dot( nodeVar4298, ( nodeVar4298.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4299 = ( nodeVar4292 + vec2( 1.0, 1.0 ) );
										nodeVar4300 = fract( ( vec3( nodeVar4299.x, nodeVar4299.y, nodeVar4299.x ) * vec3( 0.1031 ) ) );
										nodeVar4300 = ( nodeVar4300 + vec3( dot( nodeVar4300, ( nodeVar4300.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4281 = ( nodeVar4281 + ( nodeVar4282 * mix( mix( fract( ( ( nodeVar4294.x + nodeVar4294.y ) * nodeVar4294.z ) ), fract( ( ( nodeVar4296.x + nodeVar4296.y ) * nodeVar4296.z ) ), nodeVar4293.x ), mix( fract( ( ( nodeVar4298.x + nodeVar4298.y ) * nodeVar4298.z ) ), fract( ( ( nodeVar4300.x + nodeVar4300.y ) * nodeVar4300.z ) ), nodeVar4293.x ), nodeVar4293.y ) ) );
										nodeVar4280 = ( nodeVar4280 * vec2( 2.03 ) );
										nodeVar4282 = ( nodeVar4282 * 0.52 );
										nodeVar4301 = floor( nodeVar4280 );
										nodeVar4302 = fract( nodeVar4280 );
										nodeVar4302 = ( ( nodeVar4302 * nodeVar4302 ) * ( vec2( 3.0 ) - ( nodeVar4302 * vec2( 2.0 ) ) ) );
										nodeVar4303 = fract( ( vec3( nodeVar4301.x, nodeVar4301.y, nodeVar4301.x ) * vec3( 0.1031 ) ) );
										nodeVar4303 = ( nodeVar4303 + vec3( dot( nodeVar4303, ( nodeVar4303.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4304 = ( nodeVar4301 + vec2( 1.0, 0.0 ) );
										nodeVar4305 = fract( ( vec3( nodeVar4304.x, nodeVar4304.y, nodeVar4304.x ) * vec3( 0.1031 ) ) );
										nodeVar4305 = ( nodeVar4305 + vec3( dot( nodeVar4305, ( nodeVar4305.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4306 = ( nodeVar4301 + vec2( 0.0, 1.0 ) );
										nodeVar4307 = fract( ( vec3( nodeVar4306.x, nodeVar4306.y, nodeVar4306.x ) * vec3( 0.1031 ) ) );
										nodeVar4307 = ( nodeVar4307 + vec3( dot( nodeVar4307, ( nodeVar4307.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4308 = ( nodeVar4301 + vec2( 1.0, 1.0 ) );
										nodeVar4309 = fract( ( vec3( nodeVar4308.x, nodeVar4308.y, nodeVar4308.x ) * vec3( 0.1031 ) ) );
										nodeVar4309 = ( nodeVar4309 + vec3( dot( nodeVar4309, ( nodeVar4309.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4281 = ( nodeVar4281 + ( nodeVar4282 * mix( mix( fract( ( ( nodeVar4303.x + nodeVar4303.y ) * nodeVar4303.z ) ), fract( ( ( nodeVar4305.x + nodeVar4305.y ) * nodeVar4305.z ) ), nodeVar4302.x ), mix( fract( ( ( nodeVar4307.x + nodeVar4307.y ) * nodeVar4307.z ) ), fract( ( ( nodeVar4309.x + nodeVar4309.y ) * nodeVar4309.z ) ), nodeVar4302.x ), nodeVar4302.y ) ) );
										nodeVar4280 = ( nodeVar4280 * vec2( 2.03 ) );
										nodeVar4282 = ( nodeVar4282 * 0.52 );
										nodeVar4310 = floor( nodeVar4280 );
										nodeVar4311 = fract( nodeVar4280 );
										nodeVar4311 = ( ( nodeVar4311 * nodeVar4311 ) * ( vec2( 3.0 ) - ( nodeVar4311 * vec2( 2.0 ) ) ) );
										nodeVar4312 = fract( ( vec3( nodeVar4310.x, nodeVar4310.y, nodeVar4310.x ) * vec3( 0.1031 ) ) );
										nodeVar4312 = ( nodeVar4312 + vec3( dot( nodeVar4312, ( nodeVar4312.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4313 = ( nodeVar4310 + vec2( 1.0, 0.0 ) );
										nodeVar4314 = fract( ( vec3( nodeVar4313.x, nodeVar4313.y, nodeVar4313.x ) * vec3( 0.1031 ) ) );
										nodeVar4314 = ( nodeVar4314 + vec3( dot( nodeVar4314, ( nodeVar4314.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4315 = ( nodeVar4310 + vec2( 0.0, 1.0 ) );
										nodeVar4316 = fract( ( vec3( nodeVar4315.x, nodeVar4315.y, nodeVar4315.x ) * vec3( 0.1031 ) ) );
										nodeVar4316 = ( nodeVar4316 + vec3( dot( nodeVar4316, ( nodeVar4316.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4317 = ( nodeVar4310 + vec2( 1.0, 1.0 ) );
										nodeVar4318 = fract( ( vec3( nodeVar4317.x, nodeVar4317.y, nodeVar4317.x ) * vec3( 0.1031 ) ) );
										nodeVar4318 = ( nodeVar4318 + vec3( dot( nodeVar4318, ( nodeVar4318.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4281 = ( nodeVar4281 + ( nodeVar4282 * mix( mix( fract( ( ( nodeVar4312.x + nodeVar4312.y ) * nodeVar4312.z ) ), fract( ( ( nodeVar4314.x + nodeVar4314.y ) * nodeVar4314.z ) ), nodeVar4311.x ), mix( fract( ( ( nodeVar4316.x + nodeVar4316.y ) * nodeVar4316.z ) ), fract( ( ( nodeVar4318.x + nodeVar4318.y ) * nodeVar4318.z ) ), nodeVar4311.x ), nodeVar4311.y ) ) );
										nodeVar4280 = ( nodeVar4280 * vec2( 2.03 ) );
										nodeVar4282 = ( nodeVar4282 * 0.52 );
										nodeVar4319 = ( nodeVar3652 * vec2( 6.0 ) );
										nodeVar4320 = 0.0;
										nodeVar4321 = 0.5;
										nodeVar4322 = floor( nodeVar4319 );
										nodeVar4323 = fract( nodeVar4319 );
										nodeVar4323 = ( ( nodeVar4323 * nodeVar4323 ) * ( vec2( 3.0 ) - ( nodeVar4323 * vec2( 2.0 ) ) ) );
										nodeVar4324 = fract( ( vec3( nodeVar4322.x, nodeVar4322.y, nodeVar4322.x ) * vec3( 0.1031 ) ) );
										nodeVar4324 = ( nodeVar4324 + vec3( dot( nodeVar4324, ( nodeVar4324.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4325 = ( nodeVar4322 + vec2( 1.0, 0.0 ) );
										nodeVar4326 = fract( ( vec3( nodeVar4325.x, nodeVar4325.y, nodeVar4325.x ) * vec3( 0.1031 ) ) );
										nodeVar4326 = ( nodeVar4326 + vec3( dot( nodeVar4326, ( nodeVar4326.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4327 = ( nodeVar4322 + vec2( 0.0, 1.0 ) );
										nodeVar4328 = fract( ( vec3( nodeVar4327.x, nodeVar4327.y, nodeVar4327.x ) * vec3( 0.1031 ) ) );
										nodeVar4328 = ( nodeVar4328 + vec3( dot( nodeVar4328, ( nodeVar4328.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4329 = ( nodeVar4322 + vec2( 1.0, 1.0 ) );
										nodeVar4330 = fract( ( vec3( nodeVar4329.x, nodeVar4329.y, nodeVar4329.x ) * vec3( 0.1031 ) ) );
										nodeVar4330 = ( nodeVar4330 + vec3( dot( nodeVar4330, ( nodeVar4330.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4320 = ( nodeVar4320 + ( nodeVar4321 * mix( mix( fract( ( ( nodeVar4324.x + nodeVar4324.y ) * nodeVar4324.z ) ), fract( ( ( nodeVar4326.x + nodeVar4326.y ) * nodeVar4326.z ) ), nodeVar4323.x ), mix( fract( ( ( nodeVar4328.x + nodeVar4328.y ) * nodeVar4328.z ) ), fract( ( ( nodeVar4330.x + nodeVar4330.y ) * nodeVar4330.z ) ), nodeVar4323.x ), nodeVar4323.y ) ) );
										nodeVar4319 = ( nodeVar4319 * vec2( 2.03 ) );
										nodeVar4321 = ( nodeVar4321 * 0.52 );
										nodeVar4331 = floor( nodeVar4319 );
										nodeVar4332 = fract( nodeVar4319 );
										nodeVar4332 = ( ( nodeVar4332 * nodeVar4332 ) * ( vec2( 3.0 ) - ( nodeVar4332 * vec2( 2.0 ) ) ) );
										nodeVar4333 = fract( ( vec3( nodeVar4331.x, nodeVar4331.y, nodeVar4331.x ) * vec3( 0.1031 ) ) );
										nodeVar4333 = ( nodeVar4333 + vec3( dot( nodeVar4333, ( nodeVar4333.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4334 = ( nodeVar4331 + vec2( 1.0, 0.0 ) );
										nodeVar4335 = fract( ( vec3( nodeVar4334.x, nodeVar4334.y, nodeVar4334.x ) * vec3( 0.1031 ) ) );
										nodeVar4335 = ( nodeVar4335 + vec3( dot( nodeVar4335, ( nodeVar4335.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4336 = ( nodeVar4331 + vec2( 0.0, 1.0 ) );
										nodeVar4337 = fract( ( vec3( nodeVar4336.x, nodeVar4336.y, nodeVar4336.x ) * vec3( 0.1031 ) ) );
										nodeVar4337 = ( nodeVar4337 + vec3( dot( nodeVar4337, ( nodeVar4337.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4338 = ( nodeVar4331 + vec2( 1.0, 1.0 ) );
										nodeVar4339 = fract( ( vec3( nodeVar4338.x, nodeVar4338.y, nodeVar4338.x ) * vec3( 0.1031 ) ) );
										nodeVar4339 = ( nodeVar4339 + vec3( dot( nodeVar4339, ( nodeVar4339.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4320 = ( nodeVar4320 + ( nodeVar4321 * mix( mix( fract( ( ( nodeVar4333.x + nodeVar4333.y ) * nodeVar4333.z ) ), fract( ( ( nodeVar4335.x + nodeVar4335.y ) * nodeVar4335.z ) ), nodeVar4332.x ), mix( fract( ( ( nodeVar4337.x + nodeVar4337.y ) * nodeVar4337.z ) ), fract( ( ( nodeVar4339.x + nodeVar4339.y ) * nodeVar4339.z ) ), nodeVar4332.x ), nodeVar4332.y ) ) );
										nodeVar4319 = ( nodeVar4319 * vec2( 2.03 ) );
										nodeVar4321 = ( nodeVar4321 * 0.52 );
										nodeVar4340 = floor( nodeVar4319 );
										nodeVar4341 = fract( nodeVar4319 );
										nodeVar4341 = ( ( nodeVar4341 * nodeVar4341 ) * ( vec2( 3.0 ) - ( nodeVar4341 * vec2( 2.0 ) ) ) );
										nodeVar4342 = fract( ( vec3( nodeVar4340.x, nodeVar4340.y, nodeVar4340.x ) * vec3( 0.1031 ) ) );
										nodeVar4342 = ( nodeVar4342 + vec3( dot( nodeVar4342, ( nodeVar4342.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4343 = ( nodeVar4340 + vec2( 1.0, 0.0 ) );
										nodeVar4344 = fract( ( vec3( nodeVar4343.x, nodeVar4343.y, nodeVar4343.x ) * vec3( 0.1031 ) ) );
										nodeVar4344 = ( nodeVar4344 + vec3( dot( nodeVar4344, ( nodeVar4344.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4345 = ( nodeVar4340 + vec2( 0.0, 1.0 ) );
										nodeVar4346 = fract( ( vec3( nodeVar4345.x, nodeVar4345.y, nodeVar4345.x ) * vec3( 0.1031 ) ) );
										nodeVar4346 = ( nodeVar4346 + vec3( dot( nodeVar4346, ( nodeVar4346.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4347 = ( nodeVar4340 + vec2( 1.0, 1.0 ) );
										nodeVar4348 = fract( ( vec3( nodeVar4347.x, nodeVar4347.y, nodeVar4347.x ) * vec3( 0.1031 ) ) );
										nodeVar4348 = ( nodeVar4348 + vec3( dot( nodeVar4348, ( nodeVar4348.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4320 = ( nodeVar4320 + ( nodeVar4321 * mix( mix( fract( ( ( nodeVar4342.x + nodeVar4342.y ) * nodeVar4342.z ) ), fract( ( ( nodeVar4344.x + nodeVar4344.y ) * nodeVar4344.z ) ), nodeVar4341.x ), mix( fract( ( ( nodeVar4346.x + nodeVar4346.y ) * nodeVar4346.z ) ), fract( ( ( nodeVar4348.x + nodeVar4348.y ) * nodeVar4348.z ) ), nodeVar4341.x ), nodeVar4341.y ) ) );
										nodeVar4319 = ( nodeVar4319 * vec2( 2.03 ) );
										nodeVar4321 = ( nodeVar4321 * 0.52 );
										nodeVar4349 = floor( nodeVar4319 );
										nodeVar4350 = fract( nodeVar4319 );
										nodeVar4350 = ( ( nodeVar4350 * nodeVar4350 ) * ( vec2( 3.0 ) - ( nodeVar4350 * vec2( 2.0 ) ) ) );
										nodeVar4351 = fract( ( vec3( nodeVar4349.x, nodeVar4349.y, nodeVar4349.x ) * vec3( 0.1031 ) ) );
										nodeVar4351 = ( nodeVar4351 + vec3( dot( nodeVar4351, ( nodeVar4351.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4352 = ( nodeVar4349 + vec2( 1.0, 0.0 ) );
										nodeVar4353 = fract( ( vec3( nodeVar4352.x, nodeVar4352.y, nodeVar4352.x ) * vec3( 0.1031 ) ) );
										nodeVar4353 = ( nodeVar4353 + vec3( dot( nodeVar4353, ( nodeVar4353.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4354 = ( nodeVar4349 + vec2( 0.0, 1.0 ) );
										nodeVar4355 = fract( ( vec3( nodeVar4354.x, nodeVar4354.y, nodeVar4354.x ) * vec3( 0.1031 ) ) );
										nodeVar4355 = ( nodeVar4355 + vec3( dot( nodeVar4355, ( nodeVar4355.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4356 = ( nodeVar4349 + vec2( 1.0, 1.0 ) );
										nodeVar4357 = fract( ( vec3( nodeVar4356.x, nodeVar4356.y, nodeVar4356.x ) * vec3( 0.1031 ) ) );
										nodeVar4357 = ( nodeVar4357 + vec3( dot( nodeVar4357, ( nodeVar4357.yzx + vec3( 33.33 ) ) ) ) );
										nodeVar4320 = ( nodeVar4320 + ( nodeVar4321 * mix( mix( fract( ( ( nodeVar4351.x + nodeVar4351.y ) * nodeVar4351.z ) ), fract( ( ( nodeVar4353.x + nodeVar4353.y ) * nodeVar4353.z ) ), nodeVar4350.x ), mix( fract( ( ( nodeVar4355.x + nodeVar4355.y ) * nodeVar4355.z ) ), fract( ( ( nodeVar4357.x + nodeVar4357.y ) * nodeVar4357.z ) ), nodeVar4350.x ), nodeVar4350.y ) ) );
										nodeVar4319 = ( nodeVar4319 * vec2( 2.03 ) );
										nodeVar4321 = ( nodeVar4321 * 0.52 );
										nodeVar4358 = ( ( nodeVar4281 * 0.6 ) + ( nodeVar4320 * 0.4 ) );
										nodeVar3654 = vec3( nodeVar4358, 1.0, nodeVar4358 );
										

									} else {


										if ( ( nodeVar3653 < 9.5 ) ) {

											nodeVar4359 = ( nodeVar3652 * vec2( 26.0 ) );
											nodeVar4360 = 0.0;
											nodeVar4361 = 0.5;
											nodeVar4362 = floor( nodeVar4359 );
											nodeVar4363 = fract( nodeVar4359 );
											nodeVar4363 = ( ( nodeVar4363 * nodeVar4363 ) * ( vec2( 3.0 ) - ( nodeVar4363 * vec2( 2.0 ) ) ) );
											nodeVar4364 = fract( ( vec3( nodeVar4362.x, nodeVar4362.y, nodeVar4362.x ) * vec3( 0.1031 ) ) );
											nodeVar4364 = ( nodeVar4364 + vec3( dot( nodeVar4364, ( nodeVar4364.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4365 = ( nodeVar4362 + vec2( 1.0, 0.0 ) );
											nodeVar4366 = fract( ( vec3( nodeVar4365.x, nodeVar4365.y, nodeVar4365.x ) * vec3( 0.1031 ) ) );
											nodeVar4366 = ( nodeVar4366 + vec3( dot( nodeVar4366, ( nodeVar4366.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4367 = ( nodeVar4362 + vec2( 0.0, 1.0 ) );
											nodeVar4368 = fract( ( vec3( nodeVar4367.x, nodeVar4367.y, nodeVar4367.x ) * vec3( 0.1031 ) ) );
											nodeVar4368 = ( nodeVar4368 + vec3( dot( nodeVar4368, ( nodeVar4368.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4369 = ( nodeVar4362 + vec2( 1.0, 1.0 ) );
											nodeVar4370 = fract( ( vec3( nodeVar4369.x, nodeVar4369.y, nodeVar4369.x ) * vec3( 0.1031 ) ) );
											nodeVar4370 = ( nodeVar4370 + vec3( dot( nodeVar4370, ( nodeVar4370.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4360 = ( nodeVar4360 + ( nodeVar4361 * mix( mix( fract( ( ( nodeVar4364.x + nodeVar4364.y ) * nodeVar4364.z ) ), fract( ( ( nodeVar4366.x + nodeVar4366.y ) * nodeVar4366.z ) ), nodeVar4363.x ), mix( fract( ( ( nodeVar4368.x + nodeVar4368.y ) * nodeVar4368.z ) ), fract( ( ( nodeVar4370.x + nodeVar4370.y ) * nodeVar4370.z ) ), nodeVar4363.x ), nodeVar4363.y ) ) );
											nodeVar4359 = ( nodeVar4359 * vec2( 2.03 ) );
											nodeVar4361 = ( nodeVar4361 * 0.52 );
											nodeVar4371 = floor( nodeVar4359 );
											nodeVar4372 = fract( nodeVar4359 );
											nodeVar4372 = ( ( nodeVar4372 * nodeVar4372 ) * ( vec2( 3.0 ) - ( nodeVar4372 * vec2( 2.0 ) ) ) );
											nodeVar4373 = fract( ( vec3( nodeVar4371.x, nodeVar4371.y, nodeVar4371.x ) * vec3( 0.1031 ) ) );
											nodeVar4373 = ( nodeVar4373 + vec3( dot( nodeVar4373, ( nodeVar4373.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4374 = ( nodeVar4371 + vec2( 1.0, 0.0 ) );
											nodeVar4375 = fract( ( vec3( nodeVar4374.x, nodeVar4374.y, nodeVar4374.x ) * vec3( 0.1031 ) ) );
											nodeVar4375 = ( nodeVar4375 + vec3( dot( nodeVar4375, ( nodeVar4375.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4376 = ( nodeVar4371 + vec2( 0.0, 1.0 ) );
											nodeVar4377 = fract( ( vec3( nodeVar4376.x, nodeVar4376.y, nodeVar4376.x ) * vec3( 0.1031 ) ) );
											nodeVar4377 = ( nodeVar4377 + vec3( dot( nodeVar4377, ( nodeVar4377.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4378 = ( nodeVar4371 + vec2( 1.0, 1.0 ) );
											nodeVar4379 = fract( ( vec3( nodeVar4378.x, nodeVar4378.y, nodeVar4378.x ) * vec3( 0.1031 ) ) );
											nodeVar4379 = ( nodeVar4379 + vec3( dot( nodeVar4379, ( nodeVar4379.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4360 = ( nodeVar4360 + ( nodeVar4361 * mix( mix( fract( ( ( nodeVar4373.x + nodeVar4373.y ) * nodeVar4373.z ) ), fract( ( ( nodeVar4375.x + nodeVar4375.y ) * nodeVar4375.z ) ), nodeVar4372.x ), mix( fract( ( ( nodeVar4377.x + nodeVar4377.y ) * nodeVar4377.z ) ), fract( ( ( nodeVar4379.x + nodeVar4379.y ) * nodeVar4379.z ) ), nodeVar4372.x ), nodeVar4372.y ) ) );
											nodeVar4359 = ( nodeVar4359 * vec2( 2.03 ) );
											nodeVar4361 = ( nodeVar4361 * 0.52 );
											nodeVar4380 = floor( nodeVar4359 );
											nodeVar4381 = fract( nodeVar4359 );
											nodeVar4381 = ( ( nodeVar4381 * nodeVar4381 ) * ( vec2( 3.0 ) - ( nodeVar4381 * vec2( 2.0 ) ) ) );
											nodeVar4382 = fract( ( vec3( nodeVar4380.x, nodeVar4380.y, nodeVar4380.x ) * vec3( 0.1031 ) ) );
											nodeVar4382 = ( nodeVar4382 + vec3( dot( nodeVar4382, ( nodeVar4382.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4383 = ( nodeVar4380 + vec2( 1.0, 0.0 ) );
											nodeVar4384 = fract( ( vec3( nodeVar4383.x, nodeVar4383.y, nodeVar4383.x ) * vec3( 0.1031 ) ) );
											nodeVar4384 = ( nodeVar4384 + vec3( dot( nodeVar4384, ( nodeVar4384.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4385 = ( nodeVar4380 + vec2( 0.0, 1.0 ) );
											nodeVar4386 = fract( ( vec3( nodeVar4385.x, nodeVar4385.y, nodeVar4385.x ) * vec3( 0.1031 ) ) );
											nodeVar4386 = ( nodeVar4386 + vec3( dot( nodeVar4386, ( nodeVar4386.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4387 = ( nodeVar4380 + vec2( 1.0, 1.0 ) );
											nodeVar4388 = fract( ( vec3( nodeVar4387.x, nodeVar4387.y, nodeVar4387.x ) * vec3( 0.1031 ) ) );
											nodeVar4388 = ( nodeVar4388 + vec3( dot( nodeVar4388, ( nodeVar4388.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4360 = ( nodeVar4360 + ( nodeVar4361 * mix( mix( fract( ( ( nodeVar4382.x + nodeVar4382.y ) * nodeVar4382.z ) ), fract( ( ( nodeVar4384.x + nodeVar4384.y ) * nodeVar4384.z ) ), nodeVar4381.x ), mix( fract( ( ( nodeVar4386.x + nodeVar4386.y ) * nodeVar4386.z ) ), fract( ( ( nodeVar4388.x + nodeVar4388.y ) * nodeVar4388.z ) ), nodeVar4381.x ), nodeVar4381.y ) ) );
											nodeVar4359 = ( nodeVar4359 * vec2( 2.03 ) );
											nodeVar4361 = ( nodeVar4361 * 0.52 );
											nodeVar4389 = floor( nodeVar4359 );
											nodeVar4390 = fract( nodeVar4359 );
											nodeVar4390 = ( ( nodeVar4390 * nodeVar4390 ) * ( vec2( 3.0 ) - ( nodeVar4390 * vec2( 2.0 ) ) ) );
											nodeVar4391 = fract( ( vec3( nodeVar4389.x, nodeVar4389.y, nodeVar4389.x ) * vec3( 0.1031 ) ) );
											nodeVar4391 = ( nodeVar4391 + vec3( dot( nodeVar4391, ( nodeVar4391.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4392 = ( nodeVar4389 + vec2( 1.0, 0.0 ) );
											nodeVar4393 = fract( ( vec3( nodeVar4392.x, nodeVar4392.y, nodeVar4392.x ) * vec3( 0.1031 ) ) );
											nodeVar4393 = ( nodeVar4393 + vec3( dot( nodeVar4393, ( nodeVar4393.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4394 = ( nodeVar4389 + vec2( 0.0, 1.0 ) );
											nodeVar4395 = fract( ( vec3( nodeVar4394.x, nodeVar4394.y, nodeVar4394.x ) * vec3( 0.1031 ) ) );
											nodeVar4395 = ( nodeVar4395 + vec3( dot( nodeVar4395, ( nodeVar4395.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4396 = ( nodeVar4389 + vec2( 1.0, 1.0 ) );
											nodeVar4397 = fract( ( vec3( nodeVar4396.x, nodeVar4396.y, nodeVar4396.x ) * vec3( 0.1031 ) ) );
											nodeVar4397 = ( nodeVar4397 + vec3( dot( nodeVar4397, ( nodeVar4397.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4360 = ( nodeVar4360 + ( nodeVar4361 * mix( mix( fract( ( ( nodeVar4391.x + nodeVar4391.y ) * nodeVar4391.z ) ), fract( ( ( nodeVar4393.x + nodeVar4393.y ) * nodeVar4393.z ) ), nodeVar4390.x ), mix( fract( ( ( nodeVar4395.x + nodeVar4395.y ) * nodeVar4395.z ) ), fract( ( ( nodeVar4397.x + nodeVar4397.y ) * nodeVar4397.z ) ), nodeVar4390.x ), nodeVar4390.y ) ) );
											nodeVar4359 = ( nodeVar4359 * vec2( 2.03 ) );
											nodeVar4361 = ( nodeVar4361 * 0.52 );
											nodeVar4398 = ( nodeVar3652 * vec2( 90.0 ) );
											nodeVar4399 = 0.0;
											nodeVar4400 = 0.5;
											nodeVar4401 = floor( nodeVar4398 );
											nodeVar4402 = fract( nodeVar4398 );
											nodeVar4402 = ( ( nodeVar4402 * nodeVar4402 ) * ( vec2( 3.0 ) - ( nodeVar4402 * vec2( 2.0 ) ) ) );
											nodeVar4403 = fract( ( vec3( nodeVar4401.x, nodeVar4401.y, nodeVar4401.x ) * vec3( 0.1031 ) ) );
											nodeVar4403 = ( nodeVar4403 + vec3( dot( nodeVar4403, ( nodeVar4403.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4404 = ( nodeVar4401 + vec2( 1.0, 0.0 ) );
											nodeVar4405 = fract( ( vec3( nodeVar4404.x, nodeVar4404.y, nodeVar4404.x ) * vec3( 0.1031 ) ) );
											nodeVar4405 = ( nodeVar4405 + vec3( dot( nodeVar4405, ( nodeVar4405.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4406 = ( nodeVar4401 + vec2( 0.0, 1.0 ) );
											nodeVar4407 = fract( ( vec3( nodeVar4406.x, nodeVar4406.y, nodeVar4406.x ) * vec3( 0.1031 ) ) );
											nodeVar4407 = ( nodeVar4407 + vec3( dot( nodeVar4407, ( nodeVar4407.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4408 = ( nodeVar4401 + vec2( 1.0, 1.0 ) );
											nodeVar4409 = fract( ( vec3( nodeVar4408.x, nodeVar4408.y, nodeVar4408.x ) * vec3( 0.1031 ) ) );
											nodeVar4409 = ( nodeVar4409 + vec3( dot( nodeVar4409, ( nodeVar4409.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4399 = ( nodeVar4399 + ( nodeVar4400 * mix( mix( fract( ( ( nodeVar4403.x + nodeVar4403.y ) * nodeVar4403.z ) ), fract( ( ( nodeVar4405.x + nodeVar4405.y ) * nodeVar4405.z ) ), nodeVar4402.x ), mix( fract( ( ( nodeVar4407.x + nodeVar4407.y ) * nodeVar4407.z ) ), fract( ( ( nodeVar4409.x + nodeVar4409.y ) * nodeVar4409.z ) ), nodeVar4402.x ), nodeVar4402.y ) ) );
											nodeVar4398 = ( nodeVar4398 * vec2( 2.03 ) );
											nodeVar4400 = ( nodeVar4400 * 0.52 );
											nodeVar4410 = floor( nodeVar4398 );
											nodeVar4411 = fract( nodeVar4398 );
											nodeVar4411 = ( ( nodeVar4411 * nodeVar4411 ) * ( vec2( 3.0 ) - ( nodeVar4411 * vec2( 2.0 ) ) ) );
											nodeVar4412 = fract( ( vec3( nodeVar4410.x, nodeVar4410.y, nodeVar4410.x ) * vec3( 0.1031 ) ) );
											nodeVar4412 = ( nodeVar4412 + vec3( dot( nodeVar4412, ( nodeVar4412.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4413 = ( nodeVar4410 + vec2( 1.0, 0.0 ) );
											nodeVar4414 = fract( ( vec3( nodeVar4413.x, nodeVar4413.y, nodeVar4413.x ) * vec3( 0.1031 ) ) );
											nodeVar4414 = ( nodeVar4414 + vec3( dot( nodeVar4414, ( nodeVar4414.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4415 = ( nodeVar4410 + vec2( 0.0, 1.0 ) );
											nodeVar4416 = fract( ( vec3( nodeVar4415.x, nodeVar4415.y, nodeVar4415.x ) * vec3( 0.1031 ) ) );
											nodeVar4416 = ( nodeVar4416 + vec3( dot( nodeVar4416, ( nodeVar4416.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4417 = ( nodeVar4410 + vec2( 1.0, 1.0 ) );
											nodeVar4418 = fract( ( vec3( nodeVar4417.x, nodeVar4417.y, nodeVar4417.x ) * vec3( 0.1031 ) ) );
											nodeVar4418 = ( nodeVar4418 + vec3( dot( nodeVar4418, ( nodeVar4418.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4399 = ( nodeVar4399 + ( nodeVar4400 * mix( mix( fract( ( ( nodeVar4412.x + nodeVar4412.y ) * nodeVar4412.z ) ), fract( ( ( nodeVar4414.x + nodeVar4414.y ) * nodeVar4414.z ) ), nodeVar4411.x ), mix( fract( ( ( nodeVar4416.x + nodeVar4416.y ) * nodeVar4416.z ) ), fract( ( ( nodeVar4418.x + nodeVar4418.y ) * nodeVar4418.z ) ), nodeVar4411.x ), nodeVar4411.y ) ) );
											nodeVar4398 = ( nodeVar4398 * vec2( 2.03 ) );
											nodeVar4400 = ( nodeVar4400 * 0.52 );
											nodeVar4419 = floor( nodeVar4398 );
											nodeVar4420 = fract( nodeVar4398 );
											nodeVar4420 = ( ( nodeVar4420 * nodeVar4420 ) * ( vec2( 3.0 ) - ( nodeVar4420 * vec2( 2.0 ) ) ) );
											nodeVar4421 = fract( ( vec3( nodeVar4419.x, nodeVar4419.y, nodeVar4419.x ) * vec3( 0.1031 ) ) );
											nodeVar4421 = ( nodeVar4421 + vec3( dot( nodeVar4421, ( nodeVar4421.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4422 = ( nodeVar4419 + vec2( 1.0, 0.0 ) );
											nodeVar4423 = fract( ( vec3( nodeVar4422.x, nodeVar4422.y, nodeVar4422.x ) * vec3( 0.1031 ) ) );
											nodeVar4423 = ( nodeVar4423 + vec3( dot( nodeVar4423, ( nodeVar4423.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4424 = ( nodeVar4419 + vec2( 0.0, 1.0 ) );
											nodeVar4425 = fract( ( vec3( nodeVar4424.x, nodeVar4424.y, nodeVar4424.x ) * vec3( 0.1031 ) ) );
											nodeVar4425 = ( nodeVar4425 + vec3( dot( nodeVar4425, ( nodeVar4425.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4426 = ( nodeVar4419 + vec2( 1.0, 1.0 ) );
											nodeVar4427 = fract( ( vec3( nodeVar4426.x, nodeVar4426.y, nodeVar4426.x ) * vec3( 0.1031 ) ) );
											nodeVar4427 = ( nodeVar4427 + vec3( dot( nodeVar4427, ( nodeVar4427.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4399 = ( nodeVar4399 + ( nodeVar4400 * mix( mix( fract( ( ( nodeVar4421.x + nodeVar4421.y ) * nodeVar4421.z ) ), fract( ( ( nodeVar4423.x + nodeVar4423.y ) * nodeVar4423.z ) ), nodeVar4420.x ), mix( fract( ( ( nodeVar4425.x + nodeVar4425.y ) * nodeVar4425.z ) ), fract( ( ( nodeVar4427.x + nodeVar4427.y ) * nodeVar4427.z ) ), nodeVar4420.x ), nodeVar4420.y ) ) );
											nodeVar4398 = ( nodeVar4398 * vec2( 2.03 ) );
											nodeVar4400 = ( nodeVar4400 * 0.52 );
											nodeVar4428 = floor( nodeVar4398 );
											nodeVar4429 = fract( nodeVar4398 );
											nodeVar4429 = ( ( nodeVar4429 * nodeVar4429 ) * ( vec2( 3.0 ) - ( nodeVar4429 * vec2( 2.0 ) ) ) );
											nodeVar4430 = fract( ( vec3( nodeVar4428.x, nodeVar4428.y, nodeVar4428.x ) * vec3( 0.1031 ) ) );
											nodeVar4430 = ( nodeVar4430 + vec3( dot( nodeVar4430, ( nodeVar4430.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4431 = ( nodeVar4428 + vec2( 1.0, 0.0 ) );
											nodeVar4432 = fract( ( vec3( nodeVar4431.x, nodeVar4431.y, nodeVar4431.x ) * vec3( 0.1031 ) ) );
											nodeVar4432 = ( nodeVar4432 + vec3( dot( nodeVar4432, ( nodeVar4432.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4433 = ( nodeVar4428 + vec2( 0.0, 1.0 ) );
											nodeVar4434 = fract( ( vec3( nodeVar4433.x, nodeVar4433.y, nodeVar4433.x ) * vec3( 0.1031 ) ) );
											nodeVar4434 = ( nodeVar4434 + vec3( dot( nodeVar4434, ( nodeVar4434.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4435 = ( nodeVar4428 + vec2( 1.0, 1.0 ) );
											nodeVar4436 = fract( ( vec3( nodeVar4435.x, nodeVar4435.y, nodeVar4435.x ) * vec3( 0.1031 ) ) );
											nodeVar4436 = ( nodeVar4436 + vec3( dot( nodeVar4436, ( nodeVar4436.yzx + vec3( 33.33 ) ) ) ) );
											nodeVar4399 = ( nodeVar4399 + ( nodeVar4400 * mix( mix( fract( ( ( nodeVar4430.x + nodeVar4430.y ) * nodeVar4430.z ) ), fract( ( ( nodeVar4432.x + nodeVar4432.y ) * nodeVar4432.z ) ), nodeVar4429.x ), mix( fract( ( ( nodeVar4434.x + nodeVar4434.y ) * nodeVar4434.z ) ), fract( ( ( nodeVar4436.x + nodeVar4436.y ) * nodeVar4436.z ) ), nodeVar4429.x ), nodeVar4429.y ) ) );
											nodeVar4398 = ( nodeVar4398 * vec2( 2.03 ) );
											nodeVar4400 = ( nodeVar4400 * 0.52 );
											nodeVar4437 = ( ( nodeVar4360 * 0.6 ) + ( nodeVar4399 * 0.4 ) );
											nodeVar3654 = vec3( ( nodeVar4437 * 0.5 ), ( 0.8 + ( nodeVar4437 * 0.2 ) ), nodeVar4437 );
											

										} else {


											if ( ( nodeVar3653 < 10.5 ) ) {

												nodeVar4438 = ( nodeVar3652 * vec2( 5.5 ) );
												nodeVar4439 = 0.0;
												nodeVar4440 = 0.5;
												nodeVar4441 = floor( nodeVar4438 );
												nodeVar4442 = fract( nodeVar4438 );
												nodeVar4442 = ( ( nodeVar4442 * nodeVar4442 ) * ( vec2( 3.0 ) - ( nodeVar4442 * vec2( 2.0 ) ) ) );
												nodeVar4443 = fract( ( vec3( nodeVar4441.x, nodeVar4441.y, nodeVar4441.x ) * vec3( 0.1031 ) ) );
												nodeVar4443 = ( nodeVar4443 + vec3( dot( nodeVar4443, ( nodeVar4443.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4444 = ( nodeVar4441 + vec2( 1.0, 0.0 ) );
												nodeVar4445 = fract( ( vec3( nodeVar4444.x, nodeVar4444.y, nodeVar4444.x ) * vec3( 0.1031 ) ) );
												nodeVar4445 = ( nodeVar4445 + vec3( dot( nodeVar4445, ( nodeVar4445.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4446 = ( nodeVar4441 + vec2( 0.0, 1.0 ) );
												nodeVar4447 = fract( ( vec3( nodeVar4446.x, nodeVar4446.y, nodeVar4446.x ) * vec3( 0.1031 ) ) );
												nodeVar4447 = ( nodeVar4447 + vec3( dot( nodeVar4447, ( nodeVar4447.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4448 = ( nodeVar4441 + vec2( 1.0, 1.0 ) );
												nodeVar4449 = fract( ( vec3( nodeVar4448.x, nodeVar4448.y, nodeVar4448.x ) * vec3( 0.1031 ) ) );
												nodeVar4449 = ( nodeVar4449 + vec3( dot( nodeVar4449, ( nodeVar4449.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4439 = ( nodeVar4439 + ( nodeVar4440 * mix( mix( fract( ( ( nodeVar4443.x + nodeVar4443.y ) * nodeVar4443.z ) ), fract( ( ( nodeVar4445.x + nodeVar4445.y ) * nodeVar4445.z ) ), nodeVar4442.x ), mix( fract( ( ( nodeVar4447.x + nodeVar4447.y ) * nodeVar4447.z ) ), fract( ( ( nodeVar4449.x + nodeVar4449.y ) * nodeVar4449.z ) ), nodeVar4442.x ), nodeVar4442.y ) ) );
												nodeVar4438 = ( nodeVar4438 * vec2( 2.03 ) );
												nodeVar4440 = ( nodeVar4440 * 0.52 );
												nodeVar4450 = floor( nodeVar4438 );
												nodeVar4451 = fract( nodeVar4438 );
												nodeVar4451 = ( ( nodeVar4451 * nodeVar4451 ) * ( vec2( 3.0 ) - ( nodeVar4451 * vec2( 2.0 ) ) ) );
												nodeVar4452 = fract( ( vec3( nodeVar4450.x, nodeVar4450.y, nodeVar4450.x ) * vec3( 0.1031 ) ) );
												nodeVar4452 = ( nodeVar4452 + vec3( dot( nodeVar4452, ( nodeVar4452.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4453 = ( nodeVar4450 + vec2( 1.0, 0.0 ) );
												nodeVar4454 = fract( ( vec3( nodeVar4453.x, nodeVar4453.y, nodeVar4453.x ) * vec3( 0.1031 ) ) );
												nodeVar4454 = ( nodeVar4454 + vec3( dot( nodeVar4454, ( nodeVar4454.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4455 = ( nodeVar4450 + vec2( 0.0, 1.0 ) );
												nodeVar4456 = fract( ( vec3( nodeVar4455.x, nodeVar4455.y, nodeVar4455.x ) * vec3( 0.1031 ) ) );
												nodeVar4456 = ( nodeVar4456 + vec3( dot( nodeVar4456, ( nodeVar4456.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4457 = ( nodeVar4450 + vec2( 1.0, 1.0 ) );
												nodeVar4458 = fract( ( vec3( nodeVar4457.x, nodeVar4457.y, nodeVar4457.x ) * vec3( 0.1031 ) ) );
												nodeVar4458 = ( nodeVar4458 + vec3( dot( nodeVar4458, ( nodeVar4458.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4439 = ( nodeVar4439 + ( nodeVar4440 * mix( mix( fract( ( ( nodeVar4452.x + nodeVar4452.y ) * nodeVar4452.z ) ), fract( ( ( nodeVar4454.x + nodeVar4454.y ) * nodeVar4454.z ) ), nodeVar4451.x ), mix( fract( ( ( nodeVar4456.x + nodeVar4456.y ) * nodeVar4456.z ) ), fract( ( ( nodeVar4458.x + nodeVar4458.y ) * nodeVar4458.z ) ), nodeVar4451.x ), nodeVar4451.y ) ) );
												nodeVar4438 = ( nodeVar4438 * vec2( 2.03 ) );
												nodeVar4440 = ( nodeVar4440 * 0.52 );
												nodeVar4459 = floor( nodeVar4438 );
												nodeVar4460 = fract( nodeVar4438 );
												nodeVar4460 = ( ( nodeVar4460 * nodeVar4460 ) * ( vec2( 3.0 ) - ( nodeVar4460 * vec2( 2.0 ) ) ) );
												nodeVar4461 = fract( ( vec3( nodeVar4459.x, nodeVar4459.y, nodeVar4459.x ) * vec3( 0.1031 ) ) );
												nodeVar4461 = ( nodeVar4461 + vec3( dot( nodeVar4461, ( nodeVar4461.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4462 = ( nodeVar4459 + vec2( 1.0, 0.0 ) );
												nodeVar4463 = fract( ( vec3( nodeVar4462.x, nodeVar4462.y, nodeVar4462.x ) * vec3( 0.1031 ) ) );
												nodeVar4463 = ( nodeVar4463 + vec3( dot( nodeVar4463, ( nodeVar4463.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4464 = ( nodeVar4459 + vec2( 0.0, 1.0 ) );
												nodeVar4465 = fract( ( vec3( nodeVar4464.x, nodeVar4464.y, nodeVar4464.x ) * vec3( 0.1031 ) ) );
												nodeVar4465 = ( nodeVar4465 + vec3( dot( nodeVar4465, ( nodeVar4465.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4466 = ( nodeVar4459 + vec2( 1.0, 1.0 ) );
												nodeVar4467 = fract( ( vec3( nodeVar4466.x, nodeVar4466.y, nodeVar4466.x ) * vec3( 0.1031 ) ) );
												nodeVar4467 = ( nodeVar4467 + vec3( dot( nodeVar4467, ( nodeVar4467.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4439 = ( nodeVar4439 + ( nodeVar4440 * mix( mix( fract( ( ( nodeVar4461.x + nodeVar4461.y ) * nodeVar4461.z ) ), fract( ( ( nodeVar4463.x + nodeVar4463.y ) * nodeVar4463.z ) ), nodeVar4460.x ), mix( fract( ( ( nodeVar4465.x + nodeVar4465.y ) * nodeVar4465.z ) ), fract( ( ( nodeVar4467.x + nodeVar4467.y ) * nodeVar4467.z ) ), nodeVar4460.x ), nodeVar4460.y ) ) );
												nodeVar4438 = ( nodeVar4438 * vec2( 2.03 ) );
												nodeVar4440 = ( nodeVar4440 * 0.52 );
												nodeVar4468 = floor( nodeVar4438 );
												nodeVar4469 = fract( nodeVar4438 );
												nodeVar4469 = ( ( nodeVar4469 * nodeVar4469 ) * ( vec2( 3.0 ) - ( nodeVar4469 * vec2( 2.0 ) ) ) );
												nodeVar4470 = fract( ( vec3( nodeVar4468.x, nodeVar4468.y, nodeVar4468.x ) * vec3( 0.1031 ) ) );
												nodeVar4470 = ( nodeVar4470 + vec3( dot( nodeVar4470, ( nodeVar4470.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4471 = ( nodeVar4468 + vec2( 1.0, 0.0 ) );
												nodeVar4472 = fract( ( vec3( nodeVar4471.x, nodeVar4471.y, nodeVar4471.x ) * vec3( 0.1031 ) ) );
												nodeVar4472 = ( nodeVar4472 + vec3( dot( nodeVar4472, ( nodeVar4472.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4473 = ( nodeVar4468 + vec2( 0.0, 1.0 ) );
												nodeVar4474 = fract( ( vec3( nodeVar4473.x, nodeVar4473.y, nodeVar4473.x ) * vec3( 0.1031 ) ) );
												nodeVar4474 = ( nodeVar4474 + vec3( dot( nodeVar4474, ( nodeVar4474.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4475 = ( nodeVar4468 + vec2( 1.0, 1.0 ) );
												nodeVar4476 = fract( ( vec3( nodeVar4475.x, nodeVar4475.y, nodeVar4475.x ) * vec3( 0.1031 ) ) );
												nodeVar4476 = ( nodeVar4476 + vec3( dot( nodeVar4476, ( nodeVar4476.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4439 = ( nodeVar4439 + ( nodeVar4440 * mix( mix( fract( ( ( nodeVar4470.x + nodeVar4470.y ) * nodeVar4470.z ) ), fract( ( ( nodeVar4472.x + nodeVar4472.y ) * nodeVar4472.z ) ), nodeVar4469.x ), mix( fract( ( ( nodeVar4474.x + nodeVar4474.y ) * nodeVar4474.z ) ), fract( ( ( nodeVar4476.x + nodeVar4476.y ) * nodeVar4476.z ) ), nodeVar4469.x ), nodeVar4469.y ) ) );
												nodeVar4438 = ( nodeVar4438 * vec2( 2.03 ) );
												nodeVar4440 = ( nodeVar4440 * 0.52 );
												nodeVar4477 = ( nodeVar3652 * vec2( 17.0 ) );
												nodeVar4478 = 0.0;
												nodeVar4479 = 0.5;
												nodeVar4480 = floor( nodeVar4477 );
												nodeVar4481 = fract( nodeVar4477 );
												nodeVar4481 = ( ( nodeVar4481 * nodeVar4481 ) * ( vec2( 3.0 ) - ( nodeVar4481 * vec2( 2.0 ) ) ) );
												nodeVar4482 = fract( ( vec3( nodeVar4480.x, nodeVar4480.y, nodeVar4480.x ) * vec3( 0.1031 ) ) );
												nodeVar4482 = ( nodeVar4482 + vec3( dot( nodeVar4482, ( nodeVar4482.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4483 = ( nodeVar4480 + vec2( 1.0, 0.0 ) );
												nodeVar4484 = fract( ( vec3( nodeVar4483.x, nodeVar4483.y, nodeVar4483.x ) * vec3( 0.1031 ) ) );
												nodeVar4484 = ( nodeVar4484 + vec3( dot( nodeVar4484, ( nodeVar4484.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4485 = ( nodeVar4480 + vec2( 0.0, 1.0 ) );
												nodeVar4486 = fract( ( vec3( nodeVar4485.x, nodeVar4485.y, nodeVar4485.x ) * vec3( 0.1031 ) ) );
												nodeVar4486 = ( nodeVar4486 + vec3( dot( nodeVar4486, ( nodeVar4486.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4487 = ( nodeVar4480 + vec2( 1.0, 1.0 ) );
												nodeVar4488 = fract( ( vec3( nodeVar4487.x, nodeVar4487.y, nodeVar4487.x ) * vec3( 0.1031 ) ) );
												nodeVar4488 = ( nodeVar4488 + vec3( dot( nodeVar4488, ( nodeVar4488.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4478 = ( nodeVar4478 + ( nodeVar4479 * mix( mix( fract( ( ( nodeVar4482.x + nodeVar4482.y ) * nodeVar4482.z ) ), fract( ( ( nodeVar4484.x + nodeVar4484.y ) * nodeVar4484.z ) ), nodeVar4481.x ), mix( fract( ( ( nodeVar4486.x + nodeVar4486.y ) * nodeVar4486.z ) ), fract( ( ( nodeVar4488.x + nodeVar4488.y ) * nodeVar4488.z ) ), nodeVar4481.x ), nodeVar4481.y ) ) );
												nodeVar4477 = ( nodeVar4477 * vec2( 2.03 ) );
												nodeVar4479 = ( nodeVar4479 * 0.52 );
												nodeVar4489 = floor( nodeVar4477 );
												nodeVar4490 = fract( nodeVar4477 );
												nodeVar4490 = ( ( nodeVar4490 * nodeVar4490 ) * ( vec2( 3.0 ) - ( nodeVar4490 * vec2( 2.0 ) ) ) );
												nodeVar4491 = fract( ( vec3( nodeVar4489.x, nodeVar4489.y, nodeVar4489.x ) * vec3( 0.1031 ) ) );
												nodeVar4491 = ( nodeVar4491 + vec3( dot( nodeVar4491, ( nodeVar4491.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4492 = ( nodeVar4489 + vec2( 1.0, 0.0 ) );
												nodeVar4493 = fract( ( vec3( nodeVar4492.x, nodeVar4492.y, nodeVar4492.x ) * vec3( 0.1031 ) ) );
												nodeVar4493 = ( nodeVar4493 + vec3( dot( nodeVar4493, ( nodeVar4493.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4494 = ( nodeVar4489 + vec2( 0.0, 1.0 ) );
												nodeVar4495 = fract( ( vec3( nodeVar4494.x, nodeVar4494.y, nodeVar4494.x ) * vec3( 0.1031 ) ) );
												nodeVar4495 = ( nodeVar4495 + vec3( dot( nodeVar4495, ( nodeVar4495.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4496 = ( nodeVar4489 + vec2( 1.0, 1.0 ) );
												nodeVar4497 = fract( ( vec3( nodeVar4496.x, nodeVar4496.y, nodeVar4496.x ) * vec3( 0.1031 ) ) );
												nodeVar4497 = ( nodeVar4497 + vec3( dot( nodeVar4497, ( nodeVar4497.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4478 = ( nodeVar4478 + ( nodeVar4479 * mix( mix( fract( ( ( nodeVar4491.x + nodeVar4491.y ) * nodeVar4491.z ) ), fract( ( ( nodeVar4493.x + nodeVar4493.y ) * nodeVar4493.z ) ), nodeVar4490.x ), mix( fract( ( ( nodeVar4495.x + nodeVar4495.y ) * nodeVar4495.z ) ), fract( ( ( nodeVar4497.x + nodeVar4497.y ) * nodeVar4497.z ) ), nodeVar4490.x ), nodeVar4490.y ) ) );
												nodeVar4477 = ( nodeVar4477 * vec2( 2.03 ) );
												nodeVar4479 = ( nodeVar4479 * 0.52 );
												nodeVar4498 = floor( nodeVar4477 );
												nodeVar4499 = fract( nodeVar4477 );
												nodeVar4499 = ( ( nodeVar4499 * nodeVar4499 ) * ( vec2( 3.0 ) - ( nodeVar4499 * vec2( 2.0 ) ) ) );
												nodeVar4500 = fract( ( vec3( nodeVar4498.x, nodeVar4498.y, nodeVar4498.x ) * vec3( 0.1031 ) ) );
												nodeVar4500 = ( nodeVar4500 + vec3( dot( nodeVar4500, ( nodeVar4500.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4501 = ( nodeVar4498 + vec2( 1.0, 0.0 ) );
												nodeVar4502 = fract( ( vec3( nodeVar4501.x, nodeVar4501.y, nodeVar4501.x ) * vec3( 0.1031 ) ) );
												nodeVar4502 = ( nodeVar4502 + vec3( dot( nodeVar4502, ( nodeVar4502.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4503 = ( nodeVar4498 + vec2( 0.0, 1.0 ) );
												nodeVar4504 = fract( ( vec3( nodeVar4503.x, nodeVar4503.y, nodeVar4503.x ) * vec3( 0.1031 ) ) );
												nodeVar4504 = ( nodeVar4504 + vec3( dot( nodeVar4504, ( nodeVar4504.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4505 = ( nodeVar4498 + vec2( 1.0, 1.0 ) );
												nodeVar4506 = fract( ( vec3( nodeVar4505.x, nodeVar4505.y, nodeVar4505.x ) * vec3( 0.1031 ) ) );
												nodeVar4506 = ( nodeVar4506 + vec3( dot( nodeVar4506, ( nodeVar4506.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4478 = ( nodeVar4478 + ( nodeVar4479 * mix( mix( fract( ( ( nodeVar4500.x + nodeVar4500.y ) * nodeVar4500.z ) ), fract( ( ( nodeVar4502.x + nodeVar4502.y ) * nodeVar4502.z ) ), nodeVar4499.x ), mix( fract( ( ( nodeVar4504.x + nodeVar4504.y ) * nodeVar4504.z ) ), fract( ( ( nodeVar4506.x + nodeVar4506.y ) * nodeVar4506.z ) ), nodeVar4499.x ), nodeVar4499.y ) ) );
												nodeVar4477 = ( nodeVar4477 * vec2( 2.03 ) );
												nodeVar4479 = ( nodeVar4479 * 0.52 );
												nodeVar4507 = floor( nodeVar4477 );
												nodeVar4508 = fract( nodeVar4477 );
												nodeVar4508 = ( ( nodeVar4508 * nodeVar4508 ) * ( vec2( 3.0 ) - ( nodeVar4508 * vec2( 2.0 ) ) ) );
												nodeVar4509 = fract( ( vec3( nodeVar4507.x, nodeVar4507.y, nodeVar4507.x ) * vec3( 0.1031 ) ) );
												nodeVar4509 = ( nodeVar4509 + vec3( dot( nodeVar4509, ( nodeVar4509.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4510 = ( nodeVar4507 + vec2( 1.0, 0.0 ) );
												nodeVar4511 = fract( ( vec3( nodeVar4510.x, nodeVar4510.y, nodeVar4510.x ) * vec3( 0.1031 ) ) );
												nodeVar4511 = ( nodeVar4511 + vec3( dot( nodeVar4511, ( nodeVar4511.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4512 = ( nodeVar4507 + vec2( 0.0, 1.0 ) );
												nodeVar4513 = fract( ( vec3( nodeVar4512.x, nodeVar4512.y, nodeVar4512.x ) * vec3( 0.1031 ) ) );
												nodeVar4513 = ( nodeVar4513 + vec3( dot( nodeVar4513, ( nodeVar4513.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4514 = ( nodeVar4507 + vec2( 1.0, 1.0 ) );
												nodeVar4515 = fract( ( vec3( nodeVar4514.x, nodeVar4514.y, nodeVar4514.x ) * vec3( 0.1031 ) ) );
												nodeVar4515 = ( nodeVar4515 + vec3( dot( nodeVar4515, ( nodeVar4515.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4478 = ( nodeVar4478 + ( nodeVar4479 * mix( mix( fract( ( ( nodeVar4509.x + nodeVar4509.y ) * nodeVar4509.z ) ), fract( ( ( nodeVar4511.x + nodeVar4511.y ) * nodeVar4511.z ) ), nodeVar4508.x ), mix( fract( ( ( nodeVar4513.x + nodeVar4513.y ) * nodeVar4513.z ) ), fract( ( ( nodeVar4515.x + nodeVar4515.y ) * nodeVar4515.z ) ), nodeVar4508.x ), nodeVar4508.y ) ) );
												nodeVar4477 = ( nodeVar4477 * vec2( 2.03 ) );
												nodeVar4479 = ( nodeVar4479 * 0.52 );
												nodeVar4516 = ( ( nodeVar4439 * 0.62 ) + ( nodeVar4478 * 0.38 ) );
												nodeVar3654 = vec3( ( ( nodeVar4516 * 0.52 ) + ( ( 0.5 + ( ( sin( ( nodeVar3652.x * 1300.0 ) ) * sin( ( nodeVar3652.y * 1300.0 ) ) ) * 0.5 ) ) * 0.055 ) ), 1.0, ( 0.34 + ( nodeVar4516 * 0.66 ) ) );
												

											} else {

												nodeVar4517 = ( nodeVar3652 * vec2( 4.0 ) );
												nodeVar4518 = 0.0;
												nodeVar4519 = 0.5;
												nodeVar4520 = floor( nodeVar4517 );
												nodeVar4521 = fract( nodeVar4517 );
												nodeVar4521 = ( ( nodeVar4521 * nodeVar4521 ) * ( vec2( 3.0 ) - ( nodeVar4521 * vec2( 2.0 ) ) ) );
												nodeVar4522 = fract( ( vec3( nodeVar4520.x, nodeVar4520.y, nodeVar4520.x ) * vec3( 0.1031 ) ) );
												nodeVar4522 = ( nodeVar4522 + vec3( dot( nodeVar4522, ( nodeVar4522.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4523 = ( nodeVar4520 + vec2( 1.0, 0.0 ) );
												nodeVar4524 = fract( ( vec3( nodeVar4523.x, nodeVar4523.y, nodeVar4523.x ) * vec3( 0.1031 ) ) );
												nodeVar4524 = ( nodeVar4524 + vec3( dot( nodeVar4524, ( nodeVar4524.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4525 = ( nodeVar4520 + vec2( 0.0, 1.0 ) );
												nodeVar4526 = fract( ( vec3( nodeVar4525.x, nodeVar4525.y, nodeVar4525.x ) * vec3( 0.1031 ) ) );
												nodeVar4526 = ( nodeVar4526 + vec3( dot( nodeVar4526, ( nodeVar4526.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4527 = ( nodeVar4520 + vec2( 1.0, 1.0 ) );
												nodeVar4528 = fract( ( vec3( nodeVar4527.x, nodeVar4527.y, nodeVar4527.x ) * vec3( 0.1031 ) ) );
												nodeVar4528 = ( nodeVar4528 + vec3( dot( nodeVar4528, ( nodeVar4528.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4518 = ( nodeVar4518 + ( nodeVar4519 * mix( mix( fract( ( ( nodeVar4522.x + nodeVar4522.y ) * nodeVar4522.z ) ), fract( ( ( nodeVar4524.x + nodeVar4524.y ) * nodeVar4524.z ) ), nodeVar4521.x ), mix( fract( ( ( nodeVar4526.x + nodeVar4526.y ) * nodeVar4526.z ) ), fract( ( ( nodeVar4528.x + nodeVar4528.y ) * nodeVar4528.z ) ), nodeVar4521.x ), nodeVar4521.y ) ) );
												nodeVar4517 = ( nodeVar4517 * vec2( 2.03 ) );
												nodeVar4519 = ( nodeVar4519 * 0.52 );
												nodeVar4529 = floor( nodeVar4517 );
												nodeVar4530 = fract( nodeVar4517 );
												nodeVar4530 = ( ( nodeVar4530 * nodeVar4530 ) * ( vec2( 3.0 ) - ( nodeVar4530 * vec2( 2.0 ) ) ) );
												nodeVar4531 = fract( ( vec3( nodeVar4529.x, nodeVar4529.y, nodeVar4529.x ) * vec3( 0.1031 ) ) );
												nodeVar4531 = ( nodeVar4531 + vec3( dot( nodeVar4531, ( nodeVar4531.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4532 = ( nodeVar4529 + vec2( 1.0, 0.0 ) );
												nodeVar4533 = fract( ( vec3( nodeVar4532.x, nodeVar4532.y, nodeVar4532.x ) * vec3( 0.1031 ) ) );
												nodeVar4533 = ( nodeVar4533 + vec3( dot( nodeVar4533, ( nodeVar4533.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4534 = ( nodeVar4529 + vec2( 0.0, 1.0 ) );
												nodeVar4535 = fract( ( vec3( nodeVar4534.x, nodeVar4534.y, nodeVar4534.x ) * vec3( 0.1031 ) ) );
												nodeVar4535 = ( nodeVar4535 + vec3( dot( nodeVar4535, ( nodeVar4535.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4536 = ( nodeVar4529 + vec2( 1.0, 1.0 ) );
												nodeVar4537 = fract( ( vec3( nodeVar4536.x, nodeVar4536.y, nodeVar4536.x ) * vec3( 0.1031 ) ) );
												nodeVar4537 = ( nodeVar4537 + vec3( dot( nodeVar4537, ( nodeVar4537.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4518 = ( nodeVar4518 + ( nodeVar4519 * mix( mix( fract( ( ( nodeVar4531.x + nodeVar4531.y ) * nodeVar4531.z ) ), fract( ( ( nodeVar4533.x + nodeVar4533.y ) * nodeVar4533.z ) ), nodeVar4530.x ), mix( fract( ( ( nodeVar4535.x + nodeVar4535.y ) * nodeVar4535.z ) ), fract( ( ( nodeVar4537.x + nodeVar4537.y ) * nodeVar4537.z ) ), nodeVar4530.x ), nodeVar4530.y ) ) );
												nodeVar4517 = ( nodeVar4517 * vec2( 2.03 ) );
												nodeVar4519 = ( nodeVar4519 * 0.52 );
												nodeVar4538 = floor( nodeVar4517 );
												nodeVar4539 = fract( nodeVar4517 );
												nodeVar4539 = ( ( nodeVar4539 * nodeVar4539 ) * ( vec2( 3.0 ) - ( nodeVar4539 * vec2( 2.0 ) ) ) );
												nodeVar4540 = fract( ( vec3( nodeVar4538.x, nodeVar4538.y, nodeVar4538.x ) * vec3( 0.1031 ) ) );
												nodeVar4540 = ( nodeVar4540 + vec3( dot( nodeVar4540, ( nodeVar4540.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4541 = ( nodeVar4538 + vec2( 1.0, 0.0 ) );
												nodeVar4542 = fract( ( vec3( nodeVar4541.x, nodeVar4541.y, nodeVar4541.x ) * vec3( 0.1031 ) ) );
												nodeVar4542 = ( nodeVar4542 + vec3( dot( nodeVar4542, ( nodeVar4542.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4543 = ( nodeVar4538 + vec2( 0.0, 1.0 ) );
												nodeVar4544 = fract( ( vec3( nodeVar4543.x, nodeVar4543.y, nodeVar4543.x ) * vec3( 0.1031 ) ) );
												nodeVar4544 = ( nodeVar4544 + vec3( dot( nodeVar4544, ( nodeVar4544.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4545 = ( nodeVar4538 + vec2( 1.0, 1.0 ) );
												nodeVar4546 = fract( ( vec3( nodeVar4545.x, nodeVar4545.y, nodeVar4545.x ) * vec3( 0.1031 ) ) );
												nodeVar4546 = ( nodeVar4546 + vec3( dot( nodeVar4546, ( nodeVar4546.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4518 = ( nodeVar4518 + ( nodeVar4519 * mix( mix( fract( ( ( nodeVar4540.x + nodeVar4540.y ) * nodeVar4540.z ) ), fract( ( ( nodeVar4542.x + nodeVar4542.y ) * nodeVar4542.z ) ), nodeVar4539.x ), mix( fract( ( ( nodeVar4544.x + nodeVar4544.y ) * nodeVar4544.z ) ), fract( ( ( nodeVar4546.x + nodeVar4546.y ) * nodeVar4546.z ) ), nodeVar4539.x ), nodeVar4539.y ) ) );
												nodeVar4517 = ( nodeVar4517 * vec2( 2.03 ) );
												nodeVar4519 = ( nodeVar4519 * 0.52 );
												nodeVar4547 = floor( nodeVar4517 );
												nodeVar4548 = fract( nodeVar4517 );
												nodeVar4548 = ( ( nodeVar4548 * nodeVar4548 ) * ( vec2( 3.0 ) - ( nodeVar4548 * vec2( 2.0 ) ) ) );
												nodeVar4549 = fract( ( vec3( nodeVar4547.x, nodeVar4547.y, nodeVar4547.x ) * vec3( 0.1031 ) ) );
												nodeVar4549 = ( nodeVar4549 + vec3( dot( nodeVar4549, ( nodeVar4549.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4550 = ( nodeVar4547 + vec2( 1.0, 0.0 ) );
												nodeVar4551 = fract( ( vec3( nodeVar4550.x, nodeVar4550.y, nodeVar4550.x ) * vec3( 0.1031 ) ) );
												nodeVar4551 = ( nodeVar4551 + vec3( dot( nodeVar4551, ( nodeVar4551.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4552 = ( nodeVar4547 + vec2( 0.0, 1.0 ) );
												nodeVar4553 = fract( ( vec3( nodeVar4552.x, nodeVar4552.y, nodeVar4552.x ) * vec3( 0.1031 ) ) );
												nodeVar4553 = ( nodeVar4553 + vec3( dot( nodeVar4553, ( nodeVar4553.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4554 = ( nodeVar4547 + vec2( 1.0, 1.0 ) );
												nodeVar4555 = fract( ( vec3( nodeVar4554.x, nodeVar4554.y, nodeVar4554.x ) * vec3( 0.1031 ) ) );
												nodeVar4555 = ( nodeVar4555 + vec3( dot( nodeVar4555, ( nodeVar4555.yzx + vec3( 33.33 ) ) ) ) );
												nodeVar4518 = ( nodeVar4518 + ( nodeVar4519 * mix( mix( fract( ( ( nodeVar4549.x + nodeVar4549.y ) * nodeVar4549.z ) ), fract( ( ( nodeVar4551.x + nodeVar4551.y ) * nodeVar4551.z ) ), nodeVar4548.x ), mix( fract( ( ( nodeVar4553.x + nodeVar4553.y ) * nodeVar4553.z ) ), fract( ( ( nodeVar4555.x + nodeVar4555.y ) * nodeVar4555.z ) ), nodeVar4548.x ), nodeVar4548.y ) ) );
												nodeVar4517 = ( nodeVar4517 * vec2( 2.03 ) );
												nodeVar4519 = ( nodeVar4519 * 0.52 );
												nodeVar4556 = nodeVar4518;
												nodeVar3654 = vec3( nodeVar4556, 1.0, nodeVar4556 );
												

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

	nodeVar4557 = nodeVar3654;
	nodeVar4558 = max( abs( dFdx( normalViewGeometry ) ), abs( dFdy( normalViewGeometry ) ) );
	Roughness = min( ( max( clamp( ( ( 0.86 + ( ( 1.0 - nodeVar4557.y ) * 0.12 ) ) - ( nodeVar4557.z * 0.06 ) ), 0.25, 1.0 ), 0.0525 ) + max( max( nodeVar4558.x, nodeVar4558.y ), nodeVar4558.z ) ), 1.0 );
	SpecularColor = vec3( 0.04, 0.04, 0.04 );
	SpecularColorBlended = mix( vec3( 0.04, 0.04, 0.04 ), DiffuseColor.xyz, Metalness );
	SpecularF90 = 1.0;
	DiffuseContribution = ( DiffuseColor.xyz * vec3( ( 1.0 - nodeUniform7 ) ) );
	EmissiveColor = ( nodeUniform8 * vec3( nodeUniform9 ) );
	nodeVar4559 = ( nodeUniform10 - nodeUniform11 );
	nodeVar4560 = vec4( nodeVar4559, 0.0 );
	nodeVar4561 = ( cameraViewMatrix * nodeVar4560 );
	nodeVar4562 = normalize( nodeVar4561.xyz );
	nodeVar4563 = nodeVar4562;
	nodeVar4564 = dot( normalView, nodeVar4563 );
	nodeVar4565 = ( vec3( clamp( nodeVar4564, 0.0, 1.0 ) ) * nodeUniform12 );
	nodeVar4566 = nodeVar4565;
	directDiffuse = vec3( 0.0, 0.0, 0.0 );
	nodeVar4567 = ( DiffuseContribution * vec3( 0.3183098861837907 ) );
	nodeVar4568 = ( nodeVar4566 * nodeVar4567 );
	nodeVar4569 = ( directDiffuse + nodeVar4568 );
	directDiffuse = nodeVar4569;
	directSpecular = vec3( 0.0, 0.0, 0.0 );
	positionViewDirection = normalize( v_positionViewDirection );
	nodeVar4570 = normalize( ( nodeVar4563 + positionViewDirection ) );
	nodeVar4571 = clamp( dot( positionViewDirection, nodeVar4570 ), 0.0, 1.0 );
	nodeVar4572 = exp2( ( ( ( nodeVar4571 * -5.55473 ) - 6.98316 ) * nodeVar4571 ) );
	nodeVar4573 = ( Roughness * Roughness );
	nodeVar4574 = vec2( Roughness, clamp( dot( normalView, positionViewDirection ), 0.0, 1.0 ) );
	nodeVar4576 = bool( nodeUniform14 );

	if ( nodeVar4576 ) {

		nodeVar4577 = nodeVar4574;
		nodeVar4575 = vec2( nodeVar4577.x, 1.0 - nodeVar4577.y );

	} else {

		nodeVar4575 = nodeVar4574;

	}

	nodeVar4578 = texture( nodeUniform13, nodeVar4575 );
	nodeVar4579 = vec2( Roughness, clamp( dot( normalView, nodeVar4563 ), 0.0, 1.0 ) );
	nodeVar4581 = bool( nodeUniform15 );

	if ( nodeVar4581 ) {

		nodeVar4582 = nodeVar4579;
		nodeVar4580 = vec2( nodeVar4582.x, 1.0 - nodeVar4582.y );

	} else {

		nodeVar4580 = nodeVar4579;

	}

	nodeVar4583 = texture( nodeUniform13, nodeVar4580 );
	nodeVar4584 = ( SpecularColorBlended + ( ( vec3( 1.0 ) - SpecularColorBlended ) * vec3( 0.047619 ) ) );
	nodeVar4585 = ( 1.0 - ( nodeVar4578.xy.x + nodeVar4578.xy.y ) );
	nodeVar4586 = ( 1.0 - ( nodeVar4583.xy.x + nodeVar4583.xy.y ) );
	nodeVar4587 = ( ( ( ( ( SpecularColorBlended * vec3( ( 1.0 - nodeVar4572 ) ) ) + vec3( ( 1.0 * nodeVar4572 ) ) ) * vec3( V_GGX_SmithCorrelated( nodeVar4573, clamp( dot( normalView, nodeVar4563 ), 0.0, 1.0 ), clamp( dot( normalView, positionViewDirection ), 0.0, 1.0 ) ) ) ) * vec3( D_GGX( nodeVar4573, clamp( dot( normalView, nodeVar4570 ), 0.0, 1.0 ) ) ) ) + ( ( ( ( ( ( SpecularColorBlended * vec3( nodeVar4578.xy.x ) ) + vec3( ( 1.0 * nodeVar4578.xy.y ) ) ) * ( ( SpecularColorBlended * vec3( nodeVar4583.xy.x ) ) + vec3( ( 1.0 * nodeVar4583.xy.y ) ) ) ) * nodeVar4584 ) / ( ( vec3( 1.0 ) - ( ( vec3( ( nodeVar4585 * nodeVar4586 ) ) * nodeVar4584 ) * nodeVar4584 ) ) + vec3( 0.000001 ) ) ) * vec3( ( nodeVar4585 * nodeVar4586 ) ) ) );
	nodeVar4588 = ( nodeVar4566 * nodeVar4587 );
	nodeVar4589 = ( directSpecular + nodeVar4588 );
	directSpecular = nodeVar4589;
	irradiance = vec3( 0.0, 0.0, 0.0 );
	nodeVar4590 = dot( normalWorld, normalize( nodeUniform18 ) );
	nodeVar4591 = ( nodeVar4590 * 0.5 );
	nodeVar4592 = ( nodeVar4591 + 0.5 );
	nodeVar4593 = mix( nodeUniform16, nodeUniform17, nodeVar4592 );
	nodeVar4594 = ( irradiance + nodeVar4593 );
	irradiance = nodeVar4594;
	nodeVar4595 = ( DiffuseContribution * vec3( 0.3183098861837907 ) );
	nodeVar4596 = ( irradiance * nodeVar4595 );
	nodeVar4597 = nodeVar4596;
	indirectDiffuse = vec3( 0.0, 0.0, 0.0 );
	nodeVar4598 = ( indirectDiffuse + nodeVar4597 );
	indirectDiffuse = nodeVar4598;
	singleScatteringDielectric = vec3( 0.0, 0.0, 0.0 );
	multiScatteringDielectric = vec3( 0.0, 0.0, 0.0 );
	singleScatteringMetallic = vec3( 0.0, 0.0, 0.0 );
	multiScatteringMetallic = vec3( 0.0, 0.0, 0.0 );
	nodeVar4599 = dot( normalView, positionViewDirection );
	nodeVar4600 = vec2( Roughness, clamp( nodeVar4599, 0.0, 1.0 ) );
	nodeVar4602 = bool( nodeUniform19 );

	if ( nodeVar4602 ) {

		nodeVar4603 = nodeVar4600;
		nodeVar4601 = vec2( nodeVar4603.x, 1.0 - nodeVar4603.y );

	} else {

		nodeVar4601 = nodeVar4600;

	}

	nodeVar4604 = texture( nodeUniform13, nodeVar4601 );
	nodeVar4605 = ( SpecularColor * vec3( nodeVar4604.xy.x ) );
	nodeVar4606 = ( SpecularF90 * nodeVar4604.xy.y );
	nodeVar4607 = ( nodeVar4605 + vec3( nodeVar4606 ) );
	nodeVar4608 = ( singleScatteringDielectric + nodeVar4607 );
	singleScatteringDielectric = nodeVar4608;
	nodeVar4609 = ( vec3( 1.0 ) - SpecularColor );
	nodeVar4610 = nodeVar4609;
	nodeVar4611 = ( nodeVar4610 * vec3( 0.047619 ) );
	nodeVar4612 = ( SpecularColor + nodeVar4611 );
	nodeVar4613 = ( nodeVar4607 * nodeVar4612 );
	nodeVar4614 = ( nodeVar4604.xy.x + nodeVar4604.xy.y );
	nodeVar4615 = ( 1.0 - nodeVar4614 );
	nodeVar4616 = nodeVar4615;
	nodeVar4617 = ( vec3( nodeVar4616 ) * nodeVar4612 );
	nodeVar4618 = ( vec3( 1.0 ) - nodeVar4617 );
	nodeVar4619 = nodeVar4618;
	nodeVar4620 = ( nodeVar4613 / nodeVar4619 );
	nodeVar4621 = ( nodeVar4620 * vec3( nodeVar4616 ) );
	nodeVar4622 = ( multiScatteringDielectric + nodeVar4621 );
	multiScatteringDielectric = nodeVar4622;
	nodeVar4623 = dot( normalView, positionViewDirection );
	nodeVar4624 = vec2( Roughness, clamp( nodeVar4623, 0.0, 1.0 ) );
	nodeVar4626 = bool( nodeUniform20 );

	if ( nodeVar4626 ) {

		nodeVar4627 = nodeVar4624;
		nodeVar4625 = vec2( nodeVar4627.x, 1.0 - nodeVar4627.y );

	} else {

		nodeVar4625 = nodeVar4624;

	}

	nodeVar4628 = texture( nodeUniform13, nodeVar4625 );
	nodeVar4629 = ( DiffuseColor.xyz * vec3( nodeVar4628.xy.x ) );
	nodeVar4630 = ( SpecularF90 * nodeVar4628.xy.y );
	nodeVar4631 = ( nodeVar4629 + vec3( nodeVar4630 ) );
	nodeVar4632 = ( singleScatteringMetallic + nodeVar4631 );
	singleScatteringMetallic = nodeVar4632;
	nodeVar4633 = ( vec3( 1.0 ) - DiffuseColor.xyz );
	nodeVar4634 = nodeVar4633;
	nodeVar4635 = ( nodeVar4634 * vec3( 0.047619 ) );
	nodeVar4636 = ( DiffuseColor.xyz + nodeVar4635 );
	nodeVar4637 = ( nodeVar4631 * nodeVar4636 );
	nodeVar4638 = ( nodeVar4628.xy.x + nodeVar4628.xy.y );
	nodeVar4639 = ( 1.0 - nodeVar4638 );
	nodeVar4640 = nodeVar4639;
	nodeVar4641 = ( vec3( nodeVar4640 ) * nodeVar4636 );
	nodeVar4642 = ( vec3( 1.0 ) - nodeVar4641 );
	nodeVar4643 = nodeVar4642;
	nodeVar4644 = ( nodeVar4637 / nodeVar4643 );
	nodeVar4645 = ( nodeVar4644 * vec3( nodeVar4640 ) );
	nodeVar4646 = ( multiScatteringMetallic + nodeVar4645 );
	multiScatteringMetallic = nodeVar4646;
	radiance = vec3( 0.0, 0.0, 0.0 );
	nodeVar4647 = mix( singleScatteringDielectric, singleScatteringMetallic, Metalness );
	nodeVar4648 = ( radiance * nodeVar4647 );
	nodeVar4649 = mix( multiScatteringDielectric, multiScatteringMetallic, Metalness );
	iblIrradiance = vec3( 0.0, 0.0, 0.0 );
	nodeVar4650 = ( iblIrradiance * vec3( 0.3183098861837907 ) );
	nodeVar4651 = ( nodeVar4649 * nodeVar4650 );
	nodeVar4652 = ( nodeVar4648 + nodeVar4651 );
	nodeVar4653 = nodeVar4652;
	nodeVar4654 = ( singleScatteringDielectric + multiScatteringDielectric );
	nodeVar4655 = ( vec3( 1.0 ) - nodeVar4654 );
	nodeVar4656 = nodeVar4655;
	nodeVar4657 = ( DiffuseContribution * nodeVar4656 );
	nodeVar4658 = ( nodeVar4657 * nodeVar4650 );
	nodeVar4659 = nodeVar4658;
	indirectSpecular = vec3( 0.0, 0.0, 0.0 );
	nodeVar4660 = ( indirectSpecular + nodeVar4653 );
	indirectSpecular = nodeVar4660;
	nodeVar4661 = ( indirectDiffuse + nodeVar4659 );
	indirectDiffuse = nodeVar4661;
	ambientOcclusion = 1.0;
	nodeVar4662 = ( indirectDiffuse * vec3( ambientOcclusion ) );
	indirectDiffuse = nodeVar4662;
	nodeVar4663 = dot( normalView, positionViewDirection );
	nodeVar4664 = ( clamp( nodeVar4663, 0.0, 1.0 ) + ambientOcclusion );
	nodeVar4665 = ( Roughness * -16.0 );
	nodeVar4666 = ( 1.0 - nodeVar4665 );
	nodeVar4667 = nodeVar4666;
	nodeVar4668 = ( - nodeVar4667 );
	nodeVar4669 = exp2( nodeVar4668 );
	nodeVar4670 = pow( nodeVar4664, nodeVar4669 );
	nodeVar4671 = ( 1.0 - nodeVar4670 );
	nodeVar4672 = nodeVar4671;
	nodeVar4673 = ( ambientOcclusion - nodeVar4672 );
	nodeVar4674 = ( indirectSpecular * vec3( clamp( nodeVar4673, 0.0, 1.0 ) ) );
	indirectSpecular = nodeVar4674;
	nodeVar4675 = ( directDiffuse + indirectDiffuse );
	totalDiffuse = nodeVar4675;
	nodeVar4676 = ( directSpecular + indirectSpecular );
	totalSpecular = nodeVar4676;
	nodeVar4677 = ( totalDiffuse + totalSpecular );
	outgoingLight = nodeVar4677;
	nodeVar4678 = max( vec4( ( outgoingLight + EmissiveColor ), DiffuseColor.w ), 0.0 );
	Output = nodeVar4678;

	// result
	fragColor = nodeVar4678;

}
