class SyntheticEventClass {
  constructor(value, evt) {
    const target = {
      value
    };
    this.target = target;
    this.currentTarget = target;
    this.source = evt;
  }

  preventDefault() {
    if (this.source) {
      this.source.preventDefault();
    }
  }

  stopPropagation() {
    if (this.source) {
      this.source.stopPropagation();
    }
  }
}

function SyntheticEvent(value, evt) {
  return new SyntheticEventClass(value, evt);
}

SyntheticEvent.constructor = SyntheticEventClass;

export default SyntheticEvent;
