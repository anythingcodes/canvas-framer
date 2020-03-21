//import I18n from "I18n";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import classNames from "classnames";
import SyntheticEvent from "./core/SyntheticEvent";
import Controllable from "./decorators/Controllable";
import lazyEval from "./utils/lazyEval";
import createLazyPropType from "./utils/propTypes/createLazyPropType";
import * as CustomRenderer from "./utils/propTypes/customRenderer";
import passthroughProps from "./utils/propTypes/passthroughProps";
import WizardHeader from "./WizardHeader";
import WizardFooter from "./WizardFooter";
import Button from "../Button";
import Tooltip from "../Tooltip";

class UIWizard extends PureComponent {
  componentDidUpdate(prevProps) {
    // On step change, scroll to top if we have a non-sticky header
    if (prevProps.stepIndex !== this.props.stepIndex) {
      if (!this.props.stickyHeader) {
        this.scrollToTop();
      }
    }
  }

  /**
   * Resets the scroll position of the content area.
   *
   * @instance
   * @public
   */
  scrollToTop = () => {
    if (this._wrapper) {
      this._wrapper.scrollTop = 0;
    }
  };

  getStep() {
    const { children, stepIndex } = this.props;
    const steps = React.Children.toArray(children);
    return steps[stepIndex];
  }

  isFirstStep() {
    const { stepIndex } = this.props;
    const step = this.getStep();
    return !!(stepIndex === 0 || step.props.isFirstStep);
  }

  isLastStep() {
    const { children, stepIndex } = this.props;
    const steps = React.Children.toArray(children);
    const step = this.getStep();
    return !!(stepIndex === steps.length - 1 || step.props.isLastStep);
  }

  handleClickBack = () => {
    const { stepIndex } = this.props;
    this.props.onStepIndexChange(SyntheticEvent(stepIndex - 1));
  };

  handleClickNext = () => {
    const { stepIndex } = this.props;
    this.props.onStepIndexChange(SyntheticEvent(stepIndex + 1));
  };

  renderHeader() {
    const { headerComponent } = this.props;
    if (headerComponent == null) {
      return null;
    }
    const step = this.getStep();
    const Header = headerComponent; // JSX needs a capitalized var name!
    return <Header stepProps={step.props} wizardProps={this.props} />;
  }

  renderBody() {
    return this.getStep();
  }

  renderFooter() {
    const {
      defaultBackButton,
      defaultBackLabel,
      defaultCancelButton,
      defaultCancelLabel,
      defaultDoneButton,
      defaultDoneLabel,
      defaultNextButton,
      defaultNextLabel,
      footerComponent,
      onConfirm,
      onReject,
      stepIndex
    } = this.props;
    const stepProps = this.getStep().props;
    const isFirstStep = this.isFirstStep();
    const isLastStep = this.isLastStep();
    const Footer = footerComponent; // JSX needs a capitalized var name!
    return (
      <Footer
        backButton={stepProps.backButton || defaultBackButton}
        backLabel={stepProps.backLabel || lazyEval(defaultBackLabel)}
        cancelButton={stepProps.cancelButton || defaultCancelButton}
        cancelLabel={stepProps.cancelLabel || lazyEval(defaultCancelLabel)}
        doneButton={stepProps.doneButton || defaultDoneButton}
        doneLabel={stepProps.doneLabel || lazyEval(defaultDoneLabel)}
        hidePrimaryControls={stepProps.hidePrimaryControls}
        hideSecondaryControls={stepProps.hideSecondaryControls}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        nextButton={stepProps.nextButton || defaultNextButton}
        nextLabel={stepProps.nextLabel || lazyEval(defaultNextLabel)}
        onClickBack={this.handleClickBack}
        onClickCancel={onReject}
        onClickDone={onConfirm}
        onClickNext={this.handleClickNext}
        stepIndex={stepIndex}
        stepProps={stepProps}
        wizardProps={this.props}
      />
    );
  }

  render() {
    const { stickyHeader } = this.props;
    const className = classNames(
      "uiWizard",
      "private-wizard",
      "private-modal__content-wrapper",
      this.props.className
    );
    if (stickyHeader) {
      return (
        <div className={className}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </div>
      );
    }
    return (
      <div className={className}>
        <div
          className="private-wizard__content-wrapper"
          ref={ref => {
            this._wrapper = ref;
          }}
        >
          {this.renderHeader()}
          {this.renderBody()}
        </div>
        {this.renderFooter()}
      </div>
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
UIWizard.propTypes = {
  backable: PropTypes.bool.isRequired,
  cancellable: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  defaultBackButton: CustomRenderer.propType,
  defaultBackLabel: createLazyPropType(PropTypes.node).isRequired,
  defaultCancelButton: CustomRenderer.propType,
  defaultCancelLabel: createLazyPropType(PropTypes.node).isRequired,
  defaultDoneButton: CustomRenderer.propType,
  defaultDoneLabel: createLazyPropType(PropTypes.node).isRequired,
  defaultHeading: PropTypes.node,
  defaultNextButton: CustomRenderer.propType,
  defaultNextLabel: createLazyPropType(PropTypes.node).isRequired,
  disablePrimaryButton: PropTypes.bool.isRequired,
  footerComponent: PropTypes.elementType.isRequired,
  headerComponent: PropTypes.elementType,
  onConfirm: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onStepIndexChange: PropTypes.func,
  primaryButtonTooltip: PropTypes.node,
  primaryButtonTooltipProps: passthroughProps(UITooltip),
  stepIndex: PropTypes.number,
  stickyHeader: PropTypes.bool
};
/* eslint-enable react/no-unused-prop-types */

UIWizard.defaultProps = {
  backable: true,
  cancellable: false,
  defaultBackButton: UIButton,
  defaultBackLabel: () => I18n.text("salesUI.UIWizard.back"),
  defaultCancelButton: UIButton,
  defaultCancelLabel: () => I18n.text("salesUI.UIWizard.cancel"),
  defaultDoneButton: UIButton,
  defaultDoneLabel: () => I18n.text("salesUI.UIWizard.done"),
  defaultNextButton: UIButton,
  defaultNextLabel: () => I18n.text("salesUI.UIWizard.next"),
  disablePrimaryButton: false,
  footerComponent: UIWizardFooter,
  headerComponent: UIWizardHeader,
  stepIndex: 0,
  stickyHeader: true
};

UIWizard.displayName = "UIWizard";

export default Controllable(UIWizard, ["stepIndex"]);
