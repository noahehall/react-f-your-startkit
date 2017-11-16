import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// TODO: split this out to multiple files
export default function modules(options) {
  const moduleConfig = { module: {rules: [] } };

  const includePaths = options.cssIncludeGrommet
    ? ['./node_modules', './node_modules/grommet/node_modules']
    : [];

  const cssRules = {
    test:  /\.s?(a|c)ss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            ...options.cssLoaderConfig,
          }
        },
        // see https://github.com/postcss/postcss-loader
        {loader: 'postcss-loader', options: {
          ident: 'postcss',
          sourceMap: options.sourceMap,
          plugins: [
            require('postcss-import')(),
            require('postcss-cssnext')(),
          ]
        }},
        {loader: 'resolve-url-loader', options: {
          ...options.resolveUrlLoaderConfig,
        }},
        {loader: 'sass-loader?sourceMap', options: {
          includePaths,
        }},
      ]
    })
  };

  if (options.env === 'development') {
    cssRules.use = ['css-hot-loader'].concat(cssRules.use);
  }

  const javascriptRules = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [{
      loader: 'babel-loader',
      options: {
        ...options.babelLoaderConfig,
      }
    }]
  };

  const htmlRules = {
    test: /\.html$/,
    loader: 'html-loader'
  };

  const imageRules = {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
      {
        // TODO: review image-webpack-loader
        loader: 'url-loader',
        options: {
          ...options.urlLoaderConfig,
          outputPath: 'images/'
        }
      }
    ]
  }

  const fontRules = {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
      {
        // TODO: review the limit setting
        loader: 'url-loader',
        options: {
          ...options.urlLoaderConfig,
          outputPath: 'fonts/'
        }
      }
    ]
  }

  const excelRules = {
    test: /\.(csv|tsv)$/,
    use: [
      'csv-loader'
    ]
  };

  const xmlRules = {
    test: /\.xml$/,
    use: [
      'xml-loader'
    ]
  };

  moduleConfig.module.rules.push(cssRules);
  moduleConfig.module.rules.push(javascriptRules);
  moduleConfig.module.rules.push(htmlRules);
  moduleConfig.module.rules.push(imageRules);
  moduleConfig.module.rules.push(fontRules);
  moduleConfig.module.rules.push(excelRules)
  moduleConfig.module.rules.push(xmlRules);

  return moduleConfig;
};
