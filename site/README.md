# Publication site

The website is a generated presentation layer over the authoritative files in
`standards/v1/`. The generator does not modify or duplicate the normative
publication source.

Build and verify from the repository root:

```sh
python3 -m pip install -r site/requirements.txt
python3 site/build.py
python3 site/verify.py
```

The default build uses the GitHub project-site base path
`/web-editing-standards` and writes static files to `_site/`. For a local
root-path preview, pass `--base-url /` to both commands.
