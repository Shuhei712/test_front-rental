<template>
  <div class="guide__footnote">
    <div :class="noteList.type === 'number-note' || noteList.type === 'bold-note' || noteList.type === 'attention-note' ? 'font-weight-bold' : ''">
      <template v-if="noteList.type === 'number-note'">
        <dl
          v-for="(note, index) in noteList.items"
          :key="index"
          :class="['d-flex', noteList.items.length - 1 !== index ? 'mb-5' : '']">
          <dt>※{{ index + 1 }}</dt>
          <!-- eslint-disable vue/no-v-html -->
          <dd v-html="note"></dd>
        </dl>
      </template>
      <template v-else>
        <ul :class="[
          'footnote-list',
          noteList.type === 'bold-note' ? 'type--note is-accent' :
          noteList.type === 'attention-note' ? 'type--note is-accent is-attention' :
          noteList.type === 'note' ? 'type--note' : 'type--list']">
          <li
            v-for="(note, index) in noteList.items"
            :key="index"
            :class="[
              'pl-6',
              noteList.type === 'bold-note' && noteList.items.length - 1 !== index ? 'mb-5' :
              noteList.type === 'list' && noteList.items.length - 1 !== index ? 'mb-2' : '' ]"
            v-html="note"></li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noteList: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

ul {
  list-style: none;
}

.guide__footnote {
  color: $headingText;

  dt {
    color: $accent;
    width: 5%;
    max-width: 40px;

    @include mq(md) {
      min-width: 35px;
    }
  }

  li {
    position: relative;

    &::before {
      left: 0;
      position: absolute;
    }
  }

  .type--list {
    li::before {
      content: '\25aa';
      font-size: 1.2em;
    }
  }

  .type--note {
    li::before {
      content: '\203B';
    }

    &.is-attention {
      color: $accent;
    }

    &.is-accent {
      li::before {
        color: $accent;
      }
    }
  }
}

</style>
