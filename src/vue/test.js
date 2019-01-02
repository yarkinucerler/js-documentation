
/**
 * Hello "Vue"
 * @module Test
 * @returns {string} Hello + Vue
 */
export default {
	template: `<div>Hello world!</div>`,
    name: 'Test',
    props: {
        initialCounter: {
            type: Number,
            required: true,
        },
        step: {
            type: Number,
            default: 1,
        },
    },
    data () {
        return {
            counter: 0,
        }
    },
    computed: {
        message() {
            return `Current value is ${this.counter}`;
        }
    }
}
