import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts';

// Sample data shaped like the KQL query output:
//   summarize Dur_p95 = round(percentile(duration, 95)), Reqs = count()
//       by Day = startofday(EventInfo_Time), family
// Each object represents one day; properties are bundle family names → p95 duration (ms).
const chartData = [
	{ day: 'Mar 23', 'application.initial': 2140, 'vendor.fluentui.react': 980, 'vendor.initial': 1760, 'vendor.iana': 320, 'vendor.office.fabric': 610, main: 420, 'vendor.async': 870, 'application.async': 1050 },
	{ day: 'Mar 24', 'application.initial': 2090, 'vendor.fluentui.react': 960, 'vendor.initial': 1720, 'vendor.iana': 310, 'vendor.office.fabric': 590, main: 410, 'vendor.async': 850, 'application.async': 1030 },
	{ day: 'Mar 25', 'application.initial': 2210, 'vendor.fluentui.react': 1010, 'vendor.initial': 1800, 'vendor.iana': 330, 'vendor.office.fabric': 630, main: 440, 'vendor.async': 890, 'application.async': 1070 },
	{ day: 'Mar 26', 'application.initial': 2160, 'vendor.fluentui.react': 990, 'vendor.initial': 1780, 'vendor.iana': 325, 'vendor.office.fabric': 615, main: 430, 'vendor.async': 875, 'application.async': 1060 },
	{ day: 'Mar 27', 'application.initial': 2080, 'vendor.fluentui.react': 950, 'vendor.initial': 1700, 'vendor.iana': 305, 'vendor.office.fabric': 585, main: 405, 'vendor.async': 840, 'application.async': 1020 },
	{ day: 'Mar 30', 'application.initial': 2120, 'vendor.fluentui.react': 970, 'vendor.initial': 1740, 'vendor.iana': 315, 'vendor.office.fabric': 600, main: 415, 'vendor.async': 860, 'application.async': 1040 },
	{ day: 'Mar 31', 'application.initial': 2050, 'vendor.fluentui.react': 940, 'vendor.initial': 1690, 'vendor.iana': 300, 'vendor.office.fabric': 575, main: 400, 'vendor.async': 830, 'application.async': 1010 },
	{ day: 'Apr 01', 'application.initial': 2180, 'vendor.fluentui.react': 1000, 'vendor.initial': 1770, 'vendor.iana': 328, 'vendor.office.fabric': 620, main: 435, 'vendor.async': 880, 'application.async': 1065 },
	{ day: 'Apr 02', 'application.initial': 2100, 'vendor.fluentui.react': 965, 'vendor.initial': 1730, 'vendor.iana': 312, 'vendor.office.fabric': 595, main: 412, 'vendor.async': 855, 'application.async': 1035 },
	{ day: 'Apr 03', 'application.initial': 2070, 'vendor.fluentui.react': 945, 'vendor.initial': 1710, 'vendor.iana': 308, 'vendor.office.fabric': 580, main: 408, 'vendor.async': 845, 'application.async': 1025 },
	{ day: 'Apr 06', 'application.initial': 2130, 'vendor.fluentui.react': 975, 'vendor.initial': 1750, 'vendor.iana': 318, 'vendor.office.fabric': 605, main: 418, 'vendor.async': 862, 'application.async': 1045 },
	{ day: 'Apr 07', 'application.initial': 2060, 'vendor.fluentui.react': 942, 'vendor.initial': 1695, 'vendor.iana': 302, 'vendor.office.fabric': 577, main: 402, 'vendor.async': 832, 'application.async': 1015 },
	{ day: 'Apr 08', 'application.initial': 2195, 'vendor.fluentui.react': 1005, 'vendor.initial': 1790, 'vendor.iana': 332, 'vendor.office.fabric': 625, main: 442, 'vendor.async': 885, 'application.async': 1068 },
	{ day: 'Apr 09', 'application.initial': 2145, 'vendor.fluentui.react': 985, 'vendor.initial': 1765, 'vendor.iana': 322, 'vendor.office.fabric': 612, main: 422, 'vendor.async': 872, 'application.async': 1053 },
	{ day: 'Apr 10', 'application.initial': 2085, 'vendor.fluentui.react': 955, 'vendor.initial': 1715, 'vendor.iana': 307, 'vendor.office.fabric': 588, main: 407, 'vendor.async': 848, 'application.async': 1028 },
	{ day: 'Apr 13', 'application.initial': 2110, 'vendor.fluentui.react': 968, 'vendor.initial': 1735, 'vendor.iana': 314, 'vendor.office.fabric': 597, main: 414, 'vendor.async': 858, 'application.async': 1038 },
	{ day: 'Apr 14', 'application.initial': 2155, 'vendor.fluentui.react': 993, 'vendor.initial': 1775, 'vendor.iana': 326, 'vendor.office.fabric': 618, main: 432, 'vendor.async': 878, 'application.async': 1062 },
	{ day: 'Apr 15', 'application.initial': 2040, 'vendor.fluentui.react': 935, 'vendor.initial': 1680, 'vendor.iana': 298, 'vendor.office.fabric': 570, main: 398, 'vendor.async': 825, 'application.async': 1005 },
	{ day: 'Apr 16', 'application.initial': 2170, 'vendor.fluentui.react': 997, 'vendor.initial': 1785, 'vendor.iana': 330, 'vendor.office.fabric': 622, main: 438, 'vendor.async': 883, 'application.async': 1066 },
	{ day: 'Apr 17', 'application.initial': 2095, 'vendor.fluentui.react': 962, 'vendor.initial': 1725, 'vendor.iana': 311, 'vendor.office.fabric': 592, main: 411, 'vendor.async': 852, 'application.async': 1032 },
	{ day: 'Apr 20', 'application.initial': 2125, 'vendor.fluentui.react': 972, 'vendor.initial': 1745, 'vendor.iana': 317, 'vendor.office.fabric': 603, main: 417, 'vendor.async': 863, 'application.async': 1047 },
	{ day: 'Apr 21', 'application.initial': 2075, 'vendor.fluentui.react': 948, 'vendor.initial': 1705, 'vendor.iana': 306, 'vendor.office.fabric': 583, main: 406, 'vendor.async': 843, 'application.async': 1022 },
	{ day: 'Apr 22', 'application.initial': 2185, 'vendor.fluentui.react': 1003, 'vendor.initial': 1793, 'vendor.iana': 333, 'vendor.office.fabric': 627, main: 443, 'vendor.async': 887, 'application.async': 1069 },
	{ day: 'Apr 23', 'application.initial': 2135, 'vendor.fluentui.react': 978, 'vendor.initial': 1755, 'vendor.iana': 319, 'vendor.office.fabric': 608, main: 419, 'vendor.async': 868, 'application.async': 1048 },
	{ day: 'Apr 24', 'application.initial': 2065, 'vendor.fluentui.react': 943, 'vendor.initial': 1698, 'vendor.iana': 303, 'vendor.office.fabric': 578, main: 403, 'vendor.async': 835, 'application.async': 1018 },
	{ day: 'Apr 27', 'application.initial': 2115, 'vendor.fluentui.react': 969, 'vendor.initial': 1738, 'vendor.iana': 315, 'vendor.office.fabric': 599, main: 415, 'vendor.async': 860, 'application.async': 1042 },
	{ day: 'Apr 28', 'application.initial': 2160, 'vendor.fluentui.react': 991, 'vendor.initial': 1778, 'vendor.iana': 327, 'vendor.office.fabric': 619, main: 433, 'vendor.async': 879, 'application.async': 1063 },
	{ day: 'Apr 29', 'application.initial': 2045, 'vendor.fluentui.react': 937, 'vendor.initial': 1683, 'vendor.iana': 299, 'vendor.office.fabric': 572, main: 399, 'vendor.async': 827, 'application.async': 1007 },
	{ day: 'Apr 30', 'application.initial': 2175, 'vendor.fluentui.react': 998, 'vendor.initial': 1787, 'vendor.iana': 331, 'vendor.office.fabric': 623, main: 439, 'vendor.async': 884, 'application.async': 1067 },
	{ day: 'May 01', 'application.initial': 2100, 'vendor.fluentui.react': 963, 'vendor.initial': 1727, 'vendor.iana': 312, 'vendor.office.fabric': 593, main: 412, 'vendor.async': 853, 'application.async': 1033 },
	{ day: 'May 04', 'application.initial': 2128, 'vendor.fluentui.react': 974, 'vendor.initial': 1748, 'vendor.iana': 316, 'vendor.office.fabric': 604, main: 416, 'vendor.async': 864, 'application.async': 1046 },
	{ day: 'May 05', 'application.initial': 2073, 'vendor.fluentui.react': 947, 'vendor.initial': 1703, 'vendor.iana': 305, 'vendor.office.fabric': 582, main: 405, 'vendor.async': 842, 'application.async': 1021 },
	{ day: 'May 06', 'application.initial': 2188, 'vendor.fluentui.react': 1004, 'vendor.initial': 1795, 'vendor.iana': 334, 'vendor.office.fabric': 628, main: 444, 'vendor.async': 888, 'application.async': 1070 },
	{ day: 'May 07', 'application.initial': 2138, 'vendor.fluentui.react': 979, 'vendor.initial': 1757, 'vendor.iana': 320, 'vendor.office.fabric': 609, main: 420, 'vendor.async': 869, 'application.async': 1049 },
	{ day: 'May 08', 'application.initial': 2068, 'vendor.fluentui.react': 944, 'vendor.initial': 1700, 'vendor.iana': 304, 'vendor.office.fabric': 579, main: 404, 'vendor.async': 836, 'application.async': 1019 }
];

const FAMILIES = [
	{ key: 'application.initial',    color: '#1192e8' },
	{ key: 'vendor.fluentui.react',  color: '#fa4d56' },
	{ key: 'vendor.initial',         color: '#6fdc8c' },
	{ key: 'vendor.iana',            color: '#d2a106' },
	{ key: 'vendor.office.fabric',   color: '#8a3ffc' },
	{ key: 'main',                   color: '#007d79' },
	{ key: 'vendor.async',           color: '#ff832b' },
	{ key: 'application.async',      color: '#ee5396' }
];

function BundleTimingChart(): JSX.Element {
	return (
		<div style={{ padding: '2rem 0' }}>
			<h2>Bundle Load Time — P95 Duration (ms)</h2>
			<p style={{ color: '#525252', marginBottom: '1.5rem' }}>
				Chrome &amp; Edge · US · <code>/campaign/vnext/overview</code> · Mar 23 – May 8, 2026 (weekdays)
			</p>
			<ResponsiveContainer width="100%" height={480}>
				<LineChart data={chartData} margin={{ top: 8, right: 24, left: 16, bottom: 8 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
					<XAxis
						dataKey="day"
						tick={{ fontSize: 11 }}
						interval={4}
						label={{ value: 'Day', position: 'insideBottomRight', offset: -8, fontSize: 12 }}
					/>
					<YAxis
						tickFormatter={(v: number) => `${v} ms`}
						tick={{ fontSize: 11 }}
						label={{ value: 'Dur_p95 (ms)', angle: -90, position: 'insideLeft', offset: 8, fontSize: 12 }}
					/>
					<Tooltip formatter={(value: number, name: string) => [`${value} ms`, name]} />
					<Legend wrapperStyle={{ fontSize: 12, paddingTop: '1rem' }} />
					{FAMILIES.map(({ key, color }) => (
						<Line
							key={key}
							type="monotone"
							dataKey={key}
							stroke={color}
							dot={false}
							strokeWidth={2}
						/>
					))}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default BundleTimingChart;
