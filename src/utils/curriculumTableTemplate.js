/**
 * Shared HTML table column definitions and header builders for printable curriculum PDFs.
 * Explicit <colgroup> widths prevent CSS `table-layout: fixed` from collapsing columns
 * when the first row is a full-width category banner (e.g. LANGUAGE ELECTIVE - I).
 */

export const CURRICULUM_11_COLGROUP = `
    <colgroup>
        <col style="width: 12%;" />
        <col style="width: 32%;" />
        <col style="width: 9%;" />
        <col style="width: 4%;" />
        <col style="width: 4%;" />
        <col style="width: 4%;" />
        <col style="width: 9%;" />
        <col style="width: 7%;" />
        <col style="width: 6%;" />
        <col style="width: 6%;" />
        <col style="width: 7%;" />
    </colgroup>
`;

export const CURRICULUM_10_COLGROUP = `
    <colgroup>
        <col style="width: 12%;" />
        <col style="width: 36%;" />
        <col style="width: 4%;" />
        <col style="width: 4%;" />
        <col style="width: 4%;" />
        <col style="width: 10%;" />
        <col style="width: 8%;" />
        <col style="width: 7%;" />
        <col style="width: 7%;" />
        <col style="width: 8%;" />
    </colgroup>
`;

/** Builds the two-row header for 11-column (with Category) or 10-column (Elective) tables. */
export const buildCurriculumTableHeadRows = ({ includeCategory = true, titleLabel = 'Course' } = {}) => `
    <tr>
        <th rowSpan="2" style="font-size: 8.5pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle; white-space: nowrap;">Course Code</th>
        <th rowSpan="2" style="font-size: 8.5pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">${titleLabel}</th>
        ${includeCategory ? '<th rowSpan="2" style="font-size: 8.5pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle; white-space: nowrap;">Category</th>' : ''}
        <th colSpan="3" style="font-size: 8pt; font-family: Arial, sans-serif; padding: 2px; text-align: center; vertical-align: middle; white-space: nowrap;">Periods / Week</th>
        <th rowSpan="2" style="font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle; line-height: 1.15;">Total Contact Periods</th>
        <th rowSpan="2" style="font-size: 8.5pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle; white-space: nowrap;">Credit</th>
        <th colSpan="3" style="font-size: 8pt; font-family: Arial, sans-serif; padding: 2px; text-align: center; vertical-align: middle; white-space: nowrap;">Marks</th>
    </tr>
    <tr>
        <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px 1px; text-align: center; white-space: nowrap;">L</th>
        <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px 1px; text-align: center; white-space: nowrap;">T</th>
        <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px 1px; text-align: center; white-space: nowrap;">P</th>
        <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px 1px; text-align: center; white-space: nowrap;">CIA</th>
        <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px 1px; text-align: center; white-space: nowrap;">ESE</th>
        <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px 1px; text-align: center; white-space: nowrap;">Total</th>
    </tr>
`;

/** Builds a Language Elective table block with consistent colgroup column alignment. */
export const buildLanguageElectiveBlockHTML = (heading, rowsHtml) => `
    <div class="lang-elective-block" style="margin-top: 6px; page-break-inside: avoid;">
        <table class="curriculum-table" style="margin-top: 0; margin-bottom: 4px;">
            ${CURRICULUM_11_COLGROUP}
            <thead>
                <tr class="category-row">
                    <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: #f2f2f2; text-align: left; padding: 3px 6px; text-transform: uppercase;">
                        ${heading}
                    </td>
                </tr>
                ${buildCurriculumTableHeadRows({ includeCategory: true, titleLabel: 'Course' })}
            </thead>
            <tbody>
                ${rowsHtml}
            </tbody>
        </table>
    </div>
`;
