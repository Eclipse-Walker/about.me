import { describe, expect, test } from '@rstest/core';
import { resumeData } from '../../src/data/resume';

describe('resumeData', () => {
  test('has correct name', () => {
    expect(resumeData.name).toBe('Phisanurat W.');
  });

  test('has correct title', () => {
    expect(resumeData.title).toBe('Software Engineer');
  });

  test('has linkedin link', () => {
    expect(resumeData.links.linkedin).toContain('linkedin.com');
  });

  test('has github link', () => {
    expect(resumeData.links.github).toContain('github.com');
  });

  test('has at least 3 experiences', () => {
    expect(resumeData.experiences.length).toBeGreaterThanOrEqual(3);
  });

  test('LSEG is the first experience', () => {
    expect(resumeData.experiences[0].company).toContain('LSEG');
  });

  test('has skills categories', () => {
    expect(resumeData.skills.length).toBeGreaterThan(0);
  });

  test('has programming languages skill category', () => {
    const programmingSkills = resumeData.skills.find((s) =>
      s.name.toLowerCase().includes('programming'),
    );
    expect(programmingSkills).toBeDefined();
    expect(programmingSkills?.skills).toContain('JavaScript');
    expect(programmingSkills?.skills).toContain('TypeScript');
  });

  test('has education information', () => {
    expect(resumeData.education.institution).toBe('Mahasarakham University');
    expect(resumeData.education.field).toBe('Computer Science');
  });

  test('has language proficiencies', () => {
    expect(resumeData.languages.length).toBe(2);
    expect(resumeData.languages[0].name).toBe('Thai');
    expect(resumeData.languages[1].name).toBe('English');
  });
});
