import React from 'react';
import { ButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import Container from '@layouts/Container';
import Header from '@components/Header';
import BackLink from '@components/common/BackLink';
import EmptyState from '@components/common/EmptyState';
import LinkButton from '@components/common/LinkButton';

// Any URL no other route matches, instead of React Router's developer error screen
const NotFoundPage: React.FC = () => (
  <>
    <Header />
    <Container className="pb-16 pt-4 sm:pt-6">
      <BackLink to="/">All books</BackLink>
      <main className="mt-4">
        <EmptyState
          icon={IconNames.SEARCH}
          title="We couldn't find that page"
          text="The link may be wrong, or the page may have moved."
          actions={(
            <LinkButton to="/" variant={ButtonVariants.SECONDARY} icon={IconNames.BACK}>
              Back to all books
            </LinkButton>
          )}
        />
      </main>
    </Container>
  </>
);

export default NotFoundPage;
