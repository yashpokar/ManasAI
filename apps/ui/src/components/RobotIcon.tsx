import clsx from 'clsx'

interface RobotIconProps {
  className?: string
}

const RobotIcon: React.FC<RobotIconProps> = ({ className }) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="500.000000pt"
    height="500.000000pt"
    viewBox="0 0 500.000000 500.000000"
    preserveAspectRatio="xMidYMid meet"
    className={clsx('fill-current', className)}
  >
    <g
      transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
      stroke="none"
    >
      <path
        d="M2405 4776 c-121 -29 -221 -111 -278 -225 -30 -62 -32 -72 -32 -176
0 -104 2 -114 32 -176 41 -84 121 -160 208 -200 l65 -29 0 -215 0 -215 -647 0
c-518 0 -661 -3 -714 -14 -174 -37 -319 -164 -381 -333 -19 -50 -23 -86 -28
-273 l-5 -215 -205 -5 c-204 -5 -205 -5 -258 -35 -64 -35 -96 -71 -131 -145
l-26 -55 0 -540 c0 -530 0 -541 21 -586 30 -64 88 -125 148 -157 49 -26 58
-27 251 -32 l200 -5 6 -215 c5 -190 8 -222 28 -271 63 -162 184 -276 346 -326
57 -17 131 -18 1495 -18 l1435 0 70 22 c76 24 171 82 222 135 42 44 100 141
120 203 12 37 18 107 22 260 l6 210 200 5 c188 5 203 7 248 30 59 30 121 96
150 158 22 46 22 55 22 587 l0 540 -26 55 c-35 74 -67 110 -131 145 -53 30
-54 30 -258 35 l-205 5 -5 215 c-5 187 -9 223 -28 273 -62 169 -207 296 -381
333 -53 11 -196 14 -713 14 l-648 0 0 215 0 215 65 29 c87 40 167 116 208 200
30 62 32 72 32 176 0 105 -2 114 -33 178 -87 176 -280 269 -467 223z m195
-220 c26 -13 57 -40 75 -65 27 -38 30 -51 30 -116 0 -65 -3 -78 -30 -116 -114
-162 -369 -95 -383 100 -8 106 53 190 156 217 56 14 92 10 152 -20z m1363
-1240 c66 -25 149 -104 178 -168 l24 -53 0 -1170 0 -1170 -28 -57 c-32 -65
-89 -121 -156 -152 l-46 -21 -1435 0 -1435 0 -46 21 c-67 31 -124 87 -156 152
l-28 57 0 1170 0 1170 24 52 c26 60 103 137 159 160 20 8 57 19 82 23 25 4
668 7 1430 6 1323 -1 1387 -2 1433 -20z m-3335 -1388 l-3 -573 -177 0 -178 0
-32 33 -33 32 -3 480 c-2 325 1 493 8 520 19 72 45 80 248 80 l172 0 -2 -572z
m4119 552 c22 -13 35 -31 43 -60 7 -27 10 -195 8 -520 l-3 -480 -33 -32 -32
-33 -178 0 -177 0 -3 573 -2 572 172 0 c154 0 177 -2 205 -20z"
      />
      <path
        d="M1763 2684 c-53 -19 -138 -95 -164 -146 -65 -127 -35 -278 74 -375
80 -69 205 -93 310 -57 167 57 250 271 168 431 -26 52 -85 108 -140 135 -59
29 -185 35 -248 12z m183 -218 c26 -26 34 -42 34 -71 0 -52 -53 -105 -105
-105 -29 0 -45 8 -71 34 -47 47 -47 95 0 142 26 26 42 34 71 34 29 0 45 -8 71
-34z"
      />
      <path
        d="M3013 2683 c-53 -18 -138 -93 -164 -145 -46 -89 -43 -209 7 -295 32
-56 105 -118 161 -137 59 -20 157 -20 216 0 56 19 129 81 161 137 48 83 52
205 10 289 -28 57 -104 127 -162 148 -63 24 -167 25 -229 3z m167 -200 c60
-35 67 -108 16 -159 -26 -26 -42 -34 -71 -34 -29 0 -45 8 -71 34 -89 89 18
223 126 159z"
      />
      <path
        d="M1953 1473 c-35 -7 -73 -59 -73 -100 0 -71 99 -128 330 -191 86 -23
114 -26 285 -26 174 -1 199 1 295 26 141 36 273 92 305 130 34 41 33 88 -3
129 -37 41 -77 41 -170 0 -258 -114 -547 -116 -829 -5 -62 24 -114 43 -115 43
-2 -1 -13 -4 -25 -6z"
      />
    </g>
  </svg>
)

export default RobotIcon
