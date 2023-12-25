
import OverlaysContainer, { overlaysContainerClassName, overlaysContainerContentClassName } from '../OverlaysContainer';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

const queryOverlaysContainer = (container: HTMLElement) => container.querySelector(`[role='overlays-container']`);
const queryOverlaysContainerContent = (container: HTMLElement) => container.querySelector(`[role='overlays-container-content']`);

describe('OverlaysContainer', () => {
  const mockChildText = 'Mock Child';
  const mockChildTestId = 'mock-child-id';
  const mockChild = <div data-testid={mockChildTestId}>{ mockChildText }</div>;

  it('renders children', () => {
    const { getByTestId } = render(
      <OverlaysContainer show={true}>
        {mockChild}
      </OverlaysContainer>
    );

    expect(getByTestId(mockChildTestId)).toBeInTheDocument();
  });

  it('toggles visibility based on show prop', () => {
    const { rerender, container } = render(
      <OverlaysContainer show={false}>
        {mockChild}
      </OverlaysContainer>

    );

    let overlaysContainer = queryOverlaysContainer(container);
    expect(overlaysContainer).toHaveStyle('display: none');

    rerender(
      <OverlaysContainer show={true}>
        {mockChild}
      </OverlaysContainer>
    );

    expect(overlaysContainer).toHaveStyle('display: block');
  });

  it('unmounts content when hidden and unmountContentWhenHidden prop is true', () => {
    const { rerender, container } = render(
      <OverlaysContainer show={true} unmountContentWhenHidden={true}>
        {mockChild}
      </OverlaysContainer>
    );

    let overlaysContainerContent = queryOverlaysContainerContent(container);
    expect(overlaysContainerContent).toBeInTheDocument();

    rerender(
      <OverlaysContainer show={false} unmountContentWhenHidden={true}>
        {mockChild}
      </OverlaysContainer>
    );

    expect(overlaysContainerContent).not.toBeInTheDocument();
  });

  it('overlays container and the content divs has correct class name', () => {
    const { container } = render(
      <OverlaysContainer show={true}>
        {mockChild}
      </OverlaysContainer>
    );

    let overlaysContainer = queryOverlaysContainer(container);
    let overlaysContainerContent = queryOverlaysContainerContent(container);

    expect(overlaysContainer).toHaveClass(overlaysContainerClassName);
    expect(overlaysContainerContent).toHaveClass(overlaysContainerContentClassName);
  });
});
