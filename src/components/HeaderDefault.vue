<template>
  <b-jumbotron>
    <div class="c-header-default">
      <h1 class="display-4">Greetings, Commander!</h1>
      <p class="lead">This is a visualization tool for data extracted from <a href="http://openra.net/">OpenRA</a> replay files.</p>
      <hr />
      <p>
         To extract data from replays, use <a href="https://github.com/AMHOL/openra-ruby">openra-ruby</a> with the <code>--format</code> option set to <code>json</code> or <code>pretty-json</code>. Here is an example command:
      </p>
      <p>
        <code>
          openra replay-data /path/to/replay.orarep --format pretty-json
        </code>
      </p>
      <p>
        Paste the generated JSON in the text area below and hit the "Submit" button.
      </p>
    </div>
  </b-jumbotron>
</template>

<style lang="scss">
.c-header-default {
  max-width: 900px;
}
</style>
