const layers = [
  { name: 'Applications', level: 'L1', status: 'Stable' },
  { name: 'Software Systems', level: 'L2', status: 'Developing' },
  { name: 'Compute', level: 'L3', status: 'Research' },
  { name: 'Networks', level: 'L4', status: 'Research' },
  { name: 'Optical Systems', level: 'L5', status: 'Research' },
  { name: 'Physical Infrastructure', level: 'L6', status: 'Research' },
];

const layerColors: Record<string, string> = {
  Stable: 'var(--brand)',
  Developing: 'var(--brand)',
  Research: 'var(--muted-foreground)',
};

export function TechnologyStackDiagram() {
  const blockHeight = 52;
  const gap = 8;
  const width = 600;
  const padding = 40;
  const totalHeight = layers.length * (blockHeight + gap) - gap + padding * 2;
  const blockWidth = width - padding * 2;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${totalHeight}`}
        className="w-full"
        role="img"
        aria-label="TIV technology stack diagram showing six layers from applications at the top to physical infrastructure at the bottom"
      >
        {layers.map((layer, i) => {
          const y = padding + i * (blockHeight + gap);
          const color = layerColors[layer.status] || 'var(--muted-foreground)';
          return (
            <g key={layer.name}>
              <rect
                x={padding}
                y={y}
                width={blockWidth}
                height={blockHeight}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <rect
                x={padding}
                y={y}
                width="4"
                height={blockHeight}
                fill={color}
              />
              <text
                x={padding + 16}
                y={y + blockHeight / 2 + 1}
                fill="var(--foreground)"
                fontSize="14"
                fontFamily="var(--font-display)"
                fontWeight="600"
                dominantBaseline="middle"
              >
                {layer.name}
              </text>
              <text
                x={padding + blockWidth - 8}
                y={y + blockHeight / 2 + 1}
                fill="var(--muted-foreground)"
                fontSize="11"
                fontFamily="var(--font-jetbrains)"
                dominantBaseline="middle"
                textAnchor="end"
              >
                {layer.level} · {layer.status}
              </text>
            </g>
          );
        })}

        {/* Arrow indicating dependency direction */}
        <g>
          <line
            x1={width / 2}
            y1={padding - 12}
            x2={width / 2}
            y2={padding - 4}
            stroke="var(--muted-foreground)"
            strokeWidth="1"
          />
          <polygon
            points={`${width / 2 - 4},${padding - 4} ${width / 2 + 4},${padding - 4} ${width / 2},${padding}`}
            fill="var(--muted-foreground)"
          />
          <text
            x={width / 2}
            y={padding - 18}
            fill="var(--muted-foreground)"
            fontSize="10"
            fontFamily="var(--font-jetbrains)"
            textAnchor="middle"
          >
            depends on ↓
          </text>
        </g>
      </svg>
    </div>
  );
}
