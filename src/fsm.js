class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    if (!config) throw Error("no config");
    this.state = config.initial;
    this.config = config;
    this.history = [];
    this.undoHistory = [];
  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this.state;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {
    if (this.config.states[state]) {
      this.history.push(this.state);
      this.state = state;
      this.undoHistory = [];
    } else {
      throw Error("no such state");
    }
    return this.state;
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    this.changeState(this.config.states[this.state].transitions[event]);
    this.undoHistory = [];
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.state = this.config.initial;
    this.undoHistory = [];
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    let resultState = [];
    if (!event) {
      return Object.keys(this.config.states);
    } else {
      Object.keys(this.config.states).forEach(element => {
        if (this.config.states[element].transitions[event]) {
          resultState.push(element);
        }
      });
    }
    return resultState;
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
    if (this.history.length === 0) {
      return false;
    }
    this.undoHistory.push(this.state);
    this.state = this.history.pop();
    return true;
  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    if (this.undoHistory.length === 0) {
      return false;
    }
    this.state = this.undoHistory.pop();
    return true;
  }

  /**
   * Clears transition history
   */
  clearHistory() {
    this.history = [];
    this.undoHistory = [];
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
