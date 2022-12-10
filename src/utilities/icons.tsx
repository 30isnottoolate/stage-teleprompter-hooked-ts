const icons = {
    up: <path d="m 7.9572825,3.5161751 a 0.09752512,0.09752512 0 0 1 0.048012,-0.012003 0.09752512,0.09752512 0 0 1 0.047262,0.012003 0.10952821,0.10952821 0 0 1 0.04051,0.042761 l 5.1440765,8.7525049 c 0.02701,0.04501 0.02626,0.09302 0.0015,0.137285 a 0.12228149,0.12228149 0 0 1 -0.04051,0.04501 0.08702241,0.08702241 0 0 1 -0.04951,0.01275 H 2.8619703 a 0.08627222,0.08627222 0 0 1 -0.049513,-0.01275 0.12228149,0.12228149 0 0 1 -0.04051,-0.04501 0.132034,0.132034 0 0 1 0.0015,-0.137285 L 7.916772,3.5589361 a 0.1102784,0.1102784 0 0 1 0.04051,-0.042761 z M 8.7404843,3.1785882 a 0.84771831,0.84771831 0 0 0 -1.4703788,0 L 2.1260308,11.931093 c -0.3428383,0.58365 0.068268,1.325591 0.7351893,1.325591 H 13.14862 c 0.666922,0 1.078778,-0.742691 0.735189,-1.325591 z"/>,
    down: <path d="m 8.0528732,12.493425 a 0.09752512,0.09752512 0 0 1 -0.048012,0.012 0.09752512,0.09752512 0 0 1 -0.047262,-0.012 0.10952821,0.10952821 0 0 1 -0.04051,-0.04276 L 2.7730129,3.6981587 c -0.02701,-0.04501 -0.02626,-0.09302 -0.0015,-0.137285 a 0.12228149,0.12228149 0 0 1 0.04051,-0.04501 0.08702241,0.08702241 0 0 1 0.04951,-0.01275 H 13.148185 a 0.08627222,0.08627222 0 0 1 0.04951,0.01275 0.12228149,0.12228149 0 0 1 0.04051,0.04501 0.132034,0.132034 0 0 1 -0.0015,0.137285 L 8.0933837,12.450664 a 0.1102784,0.1102784 0 0 1 -0.04051,0.04276 z m -0.7832018,0.337587 a 0.84771831,0.84771831 0 0 0 1.4703788,0 L 13.884125,4.0785067 c 0.342838,-0.58365 -0.06827,-1.325591 -0.735189,-1.325591 H 2.8615359 c -0.666922,0 -1.078778,0.742691 -0.735189,1.325591 z"/>,
    left: <path d="m 3.5164528,8.0525953 a 0.09752512,0.09752512 0 0 1 -0.012,-0.048012 0.09752512,0.09752512 0 0 1 0.012,-0.047262 0.10952821,0.10952821 0 0 1 0.04276,-0.04051 L 12.311719,2.772735 c 0.04501,-0.02701 0.09302,-0.02626 0.137285,-0.0015 a 0.12228149,0.12228149 0 0 1 0.04501,0.04051 0.08702241,0.08702241 0 0 1 0.01275,0.04951 v 10.286652 a 0.08627222,0.08627222 0 0 1 -0.01275,0.04951 0.12228149,0.12228149 0 0 1 -0.04501,0.04051 0.132034,0.132034 0 0 1 -0.137285,-0.0015 L 3.5592138,8.0931058 a 0.1102784,0.1102784 0 0 1 -0.04276,-0.04051 z M 3.1788658,7.2693935 a 0.84771831,0.84771831 0 0 0 0,1.4703788 l 8.7525052,5.1440747 c 0.58365,0.342838 1.325591,-0.06827 1.325591,-0.735189 v -10.2874 c 0,-0.666922 -0.742691,-1.078778 -1.325591,-0.735189 z"/>,
    right: <path d="m 12.493703,7.9570047 a 0.09752512,0.09752512 0 0 1 0.012,0.048012 0.09752512,0.09752512 0 0 1 -0.012,0.047262 0.10952821,0.10952821 0 0 1 -0.04276,0.04051 L 3.6984368,13.236865 c -0.04501,0.02701 -0.09302,0.02626 -0.137285,0.0015 a 0.12228149,0.12228149 0 0 1 -0.04501,-0.04051 0.08702241,0.08702241 0 0 1 -0.01275,-0.04951 V 2.8616925 a 0.08627222,0.08627222 0 0 1 0.01275,-0.049513 0.12228149,0.12228149 0 0 1 0.04501,-0.04051 0.132034,0.132034 0 0 1 0.137285,0.0015 l 8.7525052,5.1433247 a 0.1102784,0.1102784 0 0 1 0.04276,0.04051 z m 0.337587,0.7832018 a 0.84771831,0.84771831 0 0 0 0,-1.4703788 L 4.0787848,2.125753 C 3.4951348,1.7829147 2.7531938,2.194021 2.7531938,2.8609423 V 13.148342 c 0,0.666922 0.742691,1.078778 1.325591,0.735189 z"/>,
    play: <><path d="m 8.0026499,13.250034 a 5.2496019,5.2497612 0 1 1 0,-10.4995223 5.2496019,5.2497612 0 0 1 0,10.4995223 z m 0,0.749966 a 5.999545,5.9997271 0 1 0 0,-11.9994542 5.999545,5.9997271 0 0 0 0,11.9994542 z"/><path d="m 6.705998,5.7916233 a 0.37497155,0.37498294 0 0 1 0.3899704,0.028499 L 9.7207695,7.695037 a 0.37497155,0.37498294 0 0 1 0,0.6104724 L 7.0959684,10.180424 A 0.37497155,0.37498294 0 0 1 6.5027635,9.8751877 V 6.1253581 A 0.37497155,0.37498294 0 0 1 6.705998,5.7916233 Z"/></>,
    pause: <><path d="m 8.0014064,13.251095 a 5.2504229,5.2494823 0 1 1 0,-10.4989646 5.2504229,5.2494823 0 0 1 0,10.4989646 z m 0,0.749926 a 6.0004833,5.9994085 0 1 0 0,-11.9988167 6.0004833,5.9994085 0 0 0 0,11.9988167 z"/><path  d="m 5.7512251,6.6892422 a 0.93757555,0.9374076 0 1 1 1.8751511,0 v 2.6247409 a 0.93757555,0.9374076 0 1 1 -1.8751511,0 z m 2.6252115,0 a 0.93757572,0.93740777 0 1 1 1.8751514,0 v 2.6247409 a 0.93757572,0.93740777 0 1 1 -1.8751514,0 z"/></>,
    next: <><path d="m 8.0012395,13.250201 a 5.250313,5.2485956 0 1 1 0,-10.4971912 5.250313,5.2485956 0 0 1 0,10.4971912 z m 0,0.749799 a 6.0003577,5.9983947 0 1 0 0,-11.9967895 6.0003576,5.9983948 0 0 0 0,11.9967895 z"/><path d="m 5.2043232,5.7934461 a 0.37502234,0.37489966 0 0 1 0.3900232,0.028492 L 8.0012395,7.5412283 V 6.1271068 A 0.37502234,0.37489966 0 0 1 8.5937748,5.8219384 l 2.6251562,1.8744983 a 0.37502234,0.37489966 0 0 1 0,0.6103371 L 8.5937748,10.181272 A 0.37502234,0.37489966 0 0 1 8.0012395,9.8761037 V 8.4619822 L 5.5935964,10.181272 A 0.37502234,0.37489966 0 0 1 5.0010611,9.8761037 V 6.1271068 A 0.37502234,0.37489966 0 0 1 5.2043232,5.7934461 Z"/></>,
    list: <><path d="m 12.495824,2.7520886 a 0.74953558,0.74953558 0 0 1 0.749536,0.7495356 v 8.9944268 a 0.74953558,0.74953558 0 0 1 -0.749536,0.749536 H 3.501397 A 0.74953558,0.74953558 0 0 1 2.751861,12.496051 V 3.5016242 A 0.74953558,0.74953558 0 0 1 3.501397,2.7520886 Z M 3.501397,2.002553 A 1.4990712,1.4990712 0 0 0 2.002326,3.5016242 v 8.9944268 a 1.4990712,1.4990712 0 0 0 1.499071,1.499071 h 8.994427 a 1.4990712,1.4990712 0 0 0 1.499071,-1.499071 V 3.5016242 A 1.4990712,1.4990712 0 0 0 12.495824,2.002553 Z"/><path d="m 3.936876,8.0000877 c 0,-0.2761424 0.223858,-0.5 0.5,-0.5 h 7 c 0.666666,0 0.666666,1.0000001 0,1.0000001 h -7 c -0.276142,0 -0.5,-0.2238576 -0.5,-0.5000001 z m 0,-2.5 c 0,-0.2761424 0.223858,-0.5 0.5,-0.5 h 7 c 0.666666,0 0.666666,1 0,1 h -7 c -0.276142,0 -0.5,-0.2238575 -0.5,-0.5 z m 0,5.0000013 c 0,-0.276142 0.223858,-0.500001 0.5,-0.500001 h 7 c 0.666666,0 0.666666,1.000001 0,1.000001 h -7 c -0.276142,0 -0.5,-0.223858 -0.5,-0.5 z"/></>,
    settings: <path d="m 10.798871,2.8082458 a 1.1991911,1.1991911 0 1 0 0,2.3983821 1.1991911,1.1991911 0 0 0 0,-2.3983821 z M 8.8401922,3.6077065 a 1.9986517,1.9986517 0 0 1 3.9173578,0 h 1.638894 V 4.4071672 H 12.75755 a 1.9986517,1.9986517 0 0 1 -3.9173578,0 H 1.6050732 V 3.6077065 Z m -3.637546,3.1978428 a 1.199191,1.199191 0 1 0 0,2.3983819 1.199191,1.199191 0 0 0 0,-2.3983819 z M 3.2439672,7.60501 a 1.9986517,1.9986517 0 0 1 3.917358,0 H 14.396444 V 8.4044705 H 7.1613252 a 1.9986517,1.9986517 0 0 1 -3.917358,0 H 1.6050732 V 7.60501 Z m 7.5549038,3.197843 a 1.199191,1.199191 0 1 0 0,2.398382 1.199191,1.199191 0 0 0 0,-2.398382 z m -1.9586788,0.799461 a 1.9986517,1.9986517 0 0 1 3.9173578,0 h 1.638894 v 0.799461 H 12.75755 a 1.9986517,1.9986517 0 0 1 -3.9173578,0 h -7.235119 v -0.799461 z"/>,
    selectSettings: <><path d="m 11.995206,2.7573476 a 0.74953558,0.74953558 0 0 1 0.749536,0.7495356 V 12.50131 a 0.74953558,0.74953558 0 0 1 -0.749536,0.749536 H 3.000779 A 0.74953558,0.74953558 0 0 1 2.2512434,12.50131 V 3.5068832 A 0.74953558,0.74953558 0 0 1 3.000779,2.7573476 Z M 3.000779,2.007812 A 1.4990712,1.4990712 0 0 0 1.5017078,3.5068832 V 12.50131 a 1.4990712,1.4990712 0 0 0 1.4990712,1.499071 h 8.994427 A 1.4990712,1.4990712 0 0 0 13.494277,12.50131 V 3.5068832 A 1.4990712,1.4990712 0 0 0 11.995206,2.007812 Z" /><path d="M 9.7241132,5.7330038 A 0.56215168,0.56215168 0 0 1 10.526866,6.5200162 L 7.5347196,10.260199 a 0.56215168,0.56215168 0 0 1 -0.8094984,0.01499 L 4.7426996,8.2919183 A 0.56215168,0.56215168 0 1 1 5.5372073,7.4974106 L 7.1067348,9.0661885 9.709872,5.7494936 a 0.17614086,0.17614086 0 0 1 0.014991,-0.01649 z" /><path d="M 17,14 V 2.007812 h 1 V 14 Z" /><path d="m 30.693798,2.8090389 a 1.199191,1.199191 0 1 0 0,2.3983821 1.199191,1.199191 0 0 0 0,-2.3983821 z m -1.958679,0.7994607 a 1.9986517,1.9986517 0 0 1 3.917358,0 h 1.638894 v 0.7994607 h -1.638894 a 1.9986517,1.9986517 0 0 1 -3.917358,0 H 21.5 V 3.6084996 Z m -3.637546,3.1978428 a 1.199191,1.199191 0 1 0 0,2.3983819 1.199191,1.199191 0 0 0 0,-2.3983819 z m -1.958679,0.7994607 a 1.9986517,1.9986517 0 0 1 3.917358,0 h 7.235119 v 0.7994605 h -7.235119 a 1.9986517,1.9986517 0 0 1 -3.917358,0 H 21.5 V 7.6058031 Z m 7.554904,3.1978429 a 1.199191,1.199191 0 1 0 0,2.398382 1.199191,1.199191 0 0 0 0,-2.398382 z m -1.958679,0.799461 a 1.9986517,1.9986517 0 0 1 3.917358,0 h 1.638894 v 0.799461 h -1.638894 a 1.9986517,1.9986517 0 0 1 -3.917358,0 H 21.5 v -0.799461 z"/></>,
    selectList: <><path d="m 11.995206,2.7573476 a 0.74953558,0.74953558 0 0 1 0.749536,0.7495356 V 12.50131 a 0.74953558,0.74953558 0 0 1 -0.749536,0.749536 H 3.000779 A 0.74953558,0.74953558 0 0 1 2.2512434,12.50131 V 3.5068832 A 0.74953558,0.74953558 0 0 1 3.000779,2.7573476 Z M 3.000779,2.007812 A 1.4990712,1.4990712 0 0 0 1.5017078,3.5068832 V 12.50131 a 1.4990712,1.4990712 0 0 0 1.4990712,1.499071 h 8.994427 A 1.4990712,1.4990712 0 0 0 13.494277,12.50131 V 3.5068832 A 1.4990712,1.4990712 0 0 0 11.995206,2.007812 Z"/><path d="m 32.003556,2.7564087 a 0.74953558,0.74953558 0 0 1 0.749536,0.7495356 v 8.9944267 a 0.74953558,0.74953558 0 0 1 -0.749536,0.749536 H 23.009129 A 0.74953558,0.74953558 0 0 1 22.259593,12.500371 V 3.5059443 A 0.74953558,0.74953558 0 0 1 23.009129,2.7564087 Z M 23.009129,2.0068731 a 1.4990712,1.4990712 0 0 0 -1.499071,1.4990712 v 8.9944267 a 1.4990712,1.4990712 0 0 0 1.499071,1.499071 h 8.994427 a 1.4990712,1.4990712 0 0 0 1.499071,-1.499071 V 3.5059443 A 1.4990712,1.4990712 0 0 0 32.003556,2.0068731 Z"/><path d="M 9.7241132,5.7330038 A 0.56215168,0.56215168 0 0 1 10.526866,6.5200162 L 7.5347196,10.260199 a 0.56215168,0.56215168 0 0 1 -0.8094984,0.01499 L 4.7426996,8.2919183 A 0.56215168,0.56215168 0 1 1 5.5372073,7.4974106 L 7.1067348,9.0661885 9.709872,5.7494936 a 0.17614086,0.17614086 0 0 1 0.014991,-0.01649 z"/><path d="M 17,14 V 2.007812 h 1 V 14 Z"/><path d="m 23.500808,8.0044078 c 0,-0.2761424 0.223858,-0.5 0.5,-0.5 h 7 c 0.666666,0 0.666666,1.0000001 0,1.0000001 h -7 c -0.276142,0 -0.5,-0.2238576 -0.5,-0.5000001 z m 0,-2.5 c 0,-0.2761424 0.223858,-0.5 0.5,-0.5 h 7 c 0.666666,0 0.666666,1 0,1 h -7 c -0.276142,0 -0.5,-0.2238575 -0.5,-0.5 z m 0,5.0000012 c 0,-0.276142 0.223858,-0.500001 0.5,-0.500001 h 7 c 0.666666,0 0.666666,1.000001 0,1.000001 h -7 c -0.276142,0 -0.5,-0.223858 -0.5,-0.5 z"/></>,
    refresh: <><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></>
}

export default icons;