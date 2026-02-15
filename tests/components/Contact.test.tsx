import { describe, expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { Contact } from '../../src/components/Contact';

describe('Contact', () => {
  test('renders contact section with title', () => {
    render(<Contact />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('renders section number', () => {
    render(<Contact />);
    expect(screen.getByText('05.')).toBeInTheDocument();
  });

  test('renders contact form fields', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  test('renders download CV button', () => {
    render(<Contact />);
    expect(screen.getByText('Download CV')).toBeInTheDocument();
  });

  test('renders send message button', () => {
    render(<Contact />);
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  test('form fields can be filled', () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(
      /message/i,
    ) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello!' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(messageInput.value).toBe('Hello!');
  });

  test('shows error when EmailJS is not configured', async () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Email service is not configured yet.');
  });
});
