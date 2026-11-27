import React from 'react';
import { computeMbaCreditDistribution } from '../utils/curriculumTableTemplate';

const MbaCreditSummary = ({ subjects, deptName = 'Master of Business Administration' }) => {
    if (!subjects || subjects.length === 0) return null;

    const {
        categories,
        distribution,
        rowTotals,
        semTotals,
        grandTotal,
        slices
    } = computeMbaCreditDistribution(subjects);

    const formattedDeptUpper = String(deptName || 'Master of Business Administration').toUpperCase();

    return (
        <div style={{ marginTop: '3rem', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem', background: 'var(--bg-section)' }}>
            <h4 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '0.5rem', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                CURRICULUM CREDIT SUMMARY
            </h4>
            <div style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                MBA - {formattedDeptUpper}
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', border: '1px solid var(--glass-border)', background: 'var(--bg-section)' }}>
                    <thead style={{ background: 'transparent' }}>
                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.7rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '10%' }}>Sl. No</th>
                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.7rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '24%' }}>Subject Area</th>
                            <th colSpan="4" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem', color: 'var(--text-main)', textAlign: 'center' }}>Credits per Semester</th>
                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.7rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '20%' }}>Total Credits</th>
                        </tr>
                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                            {['I', 'II', 'III', 'IV'].map((num, i) => (
                                <th key={i} style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center', width: '11.5%' }}>{num}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat, idx) => {
                            const isMC = cat === 'MC';
                            const total = rowTotals[cat];
                            return (
                                <tr key={cat} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{idx + 1}</td>
                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: '600' }}>{cat}</td>
                                    {distribution[cat].map((val, semIdx) => (
                                        <td key={semIdx} style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: val > 0 ? 'var(--text-main)' : 'var(--text-muted)' }}>
                                            {val}
                                        </td>
                                    ))}
                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>
                                        {isMC ? 'No Credits' : total}
                                    </td>
                                </tr>
                            );
                        })}
                        <tr style={{ background: 'rgba(255,255,255,0.02)', fontWeight: 'bold' }}>
                            <td colSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--primary)' }}>Total</td>
                            {semTotals.map((total, semIdx) => (
                                <td key={semIdx} style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--primary)' }}>
                                    {total}
                                </td>
                            ))}
                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--primary)' }}>{grandTotal}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {grandTotal > 0 && (
                <div style={{ marginTop: '2.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h5 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-main)', margin: 0, textTransform: 'uppercase' }}>
                            MBA &ndash; {formattedDeptUpper}
                        </h5>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                            Distribution by Subject Area (Total Credits = {grandTotal})
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
                        <svg width="220" height="220" viewBox="0 0 100 100">
                            {slices.map((slice, i) => (
                                <path
                                    key={i}
                                    d={slice.d}
                                    fill={slice.color}
                                    stroke="#ffffff"
                                    strokeWidth="0.6"
                                    style={{ transition: 'all 0.3s ease' }}
                                >
                                    <title>{`${slice.cat}: ${slice.percentage}% (${slice.value} Credits)`}</title>
                                </path>
                            ))}
                            {slices.map((slice, i) => (slice.percentage >= 3 ? (
                                <text
                                    key={`lbl-${i}`}
                                    x={slice.labelX}
                                    y={slice.labelY}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fill="#ffffff"
                                    fontSize="6"
                                    fontWeight="bold"
                                    fontFamily="Arial, sans-serif"
                                    style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.45)', strokeWidth: '0.8px' }}
                                >
                                    {slice.percentage}%
                                </text>
                            ) : null))}
                        </svg>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            {slices.map((slice, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                                    <span style={{ width: '12px', height: '12px', background: slice.color, borderRadius: '2px', border: '1px solid rgba(255,255,255,0.25)', display: 'inline-block', flexShrink: 0 }}></span>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{slice.cat} ({slice.value} Credits)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MbaCreditSummary;
