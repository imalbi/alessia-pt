import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
} from '@react-email/components';
import type { ContactInput } from '@/lib/validation/contact';

interface Props {
  data: ContactInput;
}

export default function ContactEmail({ data }: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', background: '#f4ece0', color: '#1f1b17', padding: 24 }}>
        <Container style={{ maxWidth: 600, background: '#fff', padding: 24, borderRadius: 4 }}>
          <Heading as="h1" style={{ fontSize: 22, marginTop: 0 }}>
            Nuovo contatto dal sito
          </Heading>
          <Section>
            <Text>
              <strong>Nome:</strong> {data.name}
            </Text>
            <Text>
              <strong>Email:</strong> {data.email}
            </Text>
            {data.phone && (
              <Text>
                <strong>Telefono:</strong> {data.phone}
              </Text>
            )}
            {data.goal && (
              <Text>
                <strong>Obiettivo:</strong> {data.goal}
              </Text>
            )}
          </Section>
          <Hr />
          <Section>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{data.message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
