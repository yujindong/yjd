NPM := npm
NPX := npx
build:
	$(MAKE) build-ems
	$(MAKE) build-commonjs
	$(MAKE) build-cjs
# 构建cjs
build-cjs:
	echo "build-bundle"
	${NPX} gulp
# 构建ems
build-ems:
	echo "build-bundle"

# 构建commonjs版本
build-commonjs:
	echo "build-bundle"