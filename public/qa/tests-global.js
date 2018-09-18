suite('Global Tests', function() {
  //valid title
  test('page has a valid title', function() {
    assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'TODO');
  });
});
