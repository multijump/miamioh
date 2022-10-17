# MIAM-161-69w

Miami University is nationally ranked as a top public university and located in Oxford, Ohio.

## Website : https://www.miamioh.edu

> A 160over90 project

Note: All components are being loaded by `yaml` files. The value of the `name:` attrubute in the `yaml` object is the name of the `twig` component. The name of the `yaml` file is `url`.

## Dev Environment Setup

##### install JavaScript dependencies

`yarn install`

##### install php dependencies

`composer install`

##### build for production with minification.

`yarn run build`

- _You should run this at least once prior to running dev to render image files._
- _Command must be ran after the addition of any image assets in the static folder_

##### serve with hot reload

`yarn serve`

After running these commands, you should be able work properly with these files with your text editor of choice.

This was built on MAC OS using [**Laravel Valet**](https://laravel.com/docs/5.6/valet) as the local server. The server driver can be found in `LocalValetDriver.php` in your project root.
