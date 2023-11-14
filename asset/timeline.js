isHidden = function (e) {
    if (!(e instanceof HTMLElement)) return false;
    if (getComputedStyle(e).display == "none") return true;
    else if (e.parentNode && isHidden(e.parentNode)) return true;
    return false;
  };
  
  loadAsyncSrcForTag = function (tag) {
    var elements = document.getElementsByTagName(tag);
    var toLoad = [];
    for (var i = 0; i < elements.length; i++) {
      var e = elements[i];
      var src = e.getAttribute("src");
      var loaded = (src != undefined && src.length > 0 && src != 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
      if (loaded) continue;
      var asyncSrc = e.getAttribute("anima-src");
      if (asyncSrc == undefined || asyncSrc.length == 0) continue;
      if (isHidden(e)) continue;
      toLoad.push(e);
    }
    // Top first
    toLoad.sort(function (a, b) { return getTop(a) - getTop(b) });
    for (var i = 0; i < toLoad.length; i++) {
      var e = toLoad[i];
      var asyncSrc = e.getAttribute("anima-src");
      e.setAttribute("src", asyncSrc);
    }
  };
  
  pauseHiddenVideos = function (tag) {
    var elements = document.getElementsByTagName("video");
    for (var i = 0; i < elements.length; i++) {
      var e = elements[i];
      var isPlaying = !!(e.currentTime > 0 && !e.paused && !e.ended && e.readyState > 2);
      var isHiddenStatus = isHidden(e);
      if (!isPlaying && !isHiddenStatus && e.getAttribute("autoplay") == "autoplay") {
        e.play();
      }
      else if (isPlaying && isHiddenStatus) {
        e.pause();
      }
    }
  };
  
  loadAsyncSrc = function (tag) {
    loadAsyncSrcForTag("img");
    loadAsyncSrcForTag("iframe");
    loadAsyncSrcForTag("video");
    pauseHiddenVideos();
  };
  
  var getTop = function (e) {
    var top = 0;
    do {
      top += e.offsetTop || 0;
      e = e.offsetParent;
    } while (e);
    return top;
  };
  
  // On load
  loadAsyncSrc();
  
  // On resize
  old_onResize = window.onresize;
  new_onResize = undefined;
  
  updateOnResize = function () {
    if (new_onResize == undefined ||
      window.onresize != new_onResize) {
      new_onResize = function (x) {
        if (old_onResize != undefined) old_onResize(x);
        loadAsyncSrc();
      }
      window.onresize = new_onResize;
      // Make sure not overriden
      setTimeout(function () {
        updateOnResize();
      }, 3000);
    }
  };
  updateOnResize();
  
  // IE
  setTimeout(function () {
    loadAsyncSrc();
  }, 200);
  
  
  "use strict";
  
  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
  
  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  
  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }
  
  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
  
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
  
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() { }; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  
  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
  
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  
  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
  
  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
  
  (function () {
    var sides_opposites = {
      left: 'right',
      right: 'left',
      top: 'bottom',
      bottom: 'top'
    };
    var sides_containers = {
      left: 'width',
      right: 'width',
      top: 'height',
      bottom: 'height'
    };
    var containers = ['height', 'width'];
    var autoanimated_properties = ["left", "right", "top", "bottom", "width", "height", "background-color", "color", "font-size", "line-height", "letter-spacing", "border", "border-size", "border-color", "margin", "margin-right", "margin-left", "margin-top", "margin-bottom", "opacity", "font-family", "transform", "rotate"];
    var autoanimated_properties_from_zero = ["opacity", "rotate"];
    var last_set_hash = '';
  
    function normalize_to_percent_and_offset(value) {
      var percent = 0.0;
      var pixel_offset = 0;
      var calc_match = value.match(/calc\(\s*([0-9.]*)%\s*([-+])\s*([0-9]*)px/);
  
      if (calc_match) {
        percent = parseFloat(calc_match[1]);
        pixel_offset = parseInt(calc_match[3]);
  
        if (calc_match[2] === "-") {
          pixel_offset = -pixel_offset;
        }
      } else if (String(value).includes('%')) {
        percent = parseFloat(value.replace('%', ''));
      } else {
        pixel_offset = parseInt(value, 10);
      }
  
      return {
        percent: percent,
        pixel_offset: pixel_offset
      };
    }
  
    function to_relative_percent(element, property, value) {
      var offsetParent = element.offsetParent;
  
      if (!offsetParent) {
        return 0;
      }
  
      var target_style_property = property;
  
      if (sides_containers.hasOwnProperty(property)) {
        target_style_property = sides_containers[property];
      }
  
      var parent_size = Math.max(1, parseInt(getComputedStyle(offsetParent)[target_style_property], 10));
      return parseFloat(100 * value / parent_size);
    }
  
    function convert_to_matching_positioning(element, new_props) {
      var computed_element_style = getComputedStyle(element);
      Object.entries(new_props).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          property = _ref2[0],
          value = _ref2[1];
  
        if (sides_opposites.hasOwnProperty(property)) {
          var to_percent = String(value).includes('%');
          var new_prop_value = parseInt(computed_element_style[property], 10) + parseInt(computed_element_style['margin-' + property], 10);
  
          if (to_percent) {
            new_prop_value = to_relative_percent(element, property, new_prop_value).toFixed(4) + '%';
          } else {
            new_prop_value += 'px';
          }
  
          element.style[property] = new_prop_value;
          element.style['margin-' + property] = 0;
          element.style['margin-' + sides_opposites[property]] = 0;
  
          if (element.style[sides_opposites[property]]) {
            element.style[sides_opposites[property]] = 'auto';
          }
        } else if (containers.includes(property)) {
          var _to_percent = String(value).includes('%');
  
          var _new_prop_value = parseInt(computed_element_style[property]);
  
          if (_to_percent) {
            _new_prop_value = to_relative_percent(element, property, _new_prop_value).toFixed(4) + '%';
          } else {
            _new_prop_value += 'px';
          }
  
          element.style[property] = _new_prop_value;
        }
      });
    }
  
    function setup_listener(root_element, listener_specs, event_handler) {
      var cleaner = null;
  
      if (listener_specs.listener_type === "timer") {
        var timeout = setTimeout(event_handler, listener_specs.delay);
  
        cleaner = function cleaner() {
          return clearTimeout(timeout);
        };
      } else if (['click', 'mouseenter', 'mouseleave'].includes(listener_specs.listener_type)) {
        var target_element = listener_specs.target_selector === "" ? root_element : root_element.querySelector(listener_specs.target_selector);
  
        if (!target_element) {
          return function () { };
        }
  
        var event_handler_fixed = function event_handler_fixed(event) {
          if (event.type === 'click' || event.target === target_element) {
            event.stopPropagation();
            event_handler();
          }
        };
  
        target_element.classList.add('listeners-active');
  
        if (listener_specs.listener_type === "click") {
          target_element.classList.add('listeners-active-click');
        }
  
        target_element.addEventListener(listener_specs.listener_type, event_handler_fixed, true);
  
        cleaner = function cleaner() {
          target_element.removeEventListener(listener_specs.listener_type, event_handler_fixed, true);
          target_element.classList.remove('listeners-active');
          target_element.classList.remove('listeners-active-click');
        };
      }
  
      return cleaner;
    }
  
    function animate_elements(root_element, selector_to_properties_map, transition_props, on_done) {
      var from_current_position = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var hide_low_opacity = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var entries = selector_to_properties_map.entries ? selector_to_properties_map.entries() : Object.entries(selector_to_properties_map);
  
      var _iterator = _createForOfIteratorHelper(entries),
        _step;
  
      try {
        var _loop = function _loop() {
          var _step$value = _slicedToArray(_step.value, 2),
            selector_or_element = _step$value[0],
            prop_values_map = _step$value[1];
  
          var element = root_element;
  
          if (typeof selector_or_element === 'string') {
            if (selector_or_element !== '') {
              element = root_element.querySelector(selector_or_element);
            }
          } else {
            element = selector_or_element;
          }
  
          if (element) {
            var update_element_visibility = function update_element_visibility(visible) {
              if (visible) {
                element.classList.toggle("hidden", false);
              } else {
                element.classList.toggle("hidden", true);
              }
            };
  
            if (hide_low_opacity) {
              update_element_visibility(prop_values_map['opacity'] > 0 || getComputedStyle(element).opacity > 0.001);
            }
  
            anime.remove(element);
  
            var full_params = _objectSpread(_objectSpread(_objectSpread({}, transition_props), prop_values_map), {}, {
              targets: [element],
              complete: function complete() {
                if (hide_low_opacity) {
                  update_element_visibility(getComputedStyle(element).opacity > 0.001);
                }
  
                if (on_done) {
                  on_done(element);
                }
              }
            });
  
            if (prop_values_map.hasOwnProperty("transform")) {
              var transform_val = full_params.transform;
              delete full_params.transform;
  
              if (!Array.isArray(transform_val)) {
                transform_val.match(/\S*\([^)]*/g).map(function (x) {
                  return x.split('(');
                }).forEach(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                    key = _ref4[0],
                    val = _ref4[1];
  
                  full_params[key] = val;
                });
              }
            }
  
            if (full_params.hasOwnProperty("easing")) {
              var mapping = {
                '': 'linear',
                'none': 'linear',
                'bounce': 'easeOutBounce',
                'wind-up': 'cubicBezier(0.4, -0.25, 0.8, 0.8)',
                'snap': 'cubicBezier(0.8, 0.85, 0.7, 1.15)',
                "ease-in-out": "cubicBezier(0.42, 0, 0.58, 1)",
                "ease-in": "cubicBezier(0.42, 0, 1, 1)",
                "ease-out": "cubicBezier(0, 0, 0.58, 1)"
              };
              var easing = full_params["easing"].trim().toLowerCase();
  
              if (mapping.hasOwnProperty(easing)) {
                easing = mapping[easing];
              } else if (easing.startsWith('cubic-bezier')) {
                easing = easing.replace('cubic-bezier', 'cubicBezier');
              }
  
              full_params["easing"] = easing;
            }
  
            if (from_current_position) {
              convert_to_matching_positioning(element, full_params);
              Object.keys(sides_opposites).forEach(function (side) {
                if (full_params.hasOwnProperty(side)) {
                  var value = full_params[side];
  
                  var _normalize_to_percent = normalize_to_percent_and_offset(value),
                    percent = _normalize_to_percent.percent,
                    pixel_offset = _normalize_to_percent.pixel_offset;
  
                  if (Math.abs(percent) < 0.001) {
                    full_params[side] = pixel_offset + 'px';
                  } else {
                    full_params[side] = percent + '%';
                    full_params['margin-' + side] = pixel_offset + 'px';
                  }
  
                  element.style[sides_opposites[side]] = 'auto';
                }
              });
              containers.forEach(function (container) {
                if (full_params.hasOwnProperty(container)) {
                  var value = full_params[container];
  
                  var _normalize_to_percent2 = normalize_to_percent_and_offset(value),
                    percent = _normalize_to_percent2.percent,
                    pixel_offset = _normalize_to_percent2.pixel_offset;
  
                  if (Math.abs(percent) < 0.001) {
                    full_params[container] = pixel_offset + 'px';
                  } else {
                    if (Math.abs(pixel_offset) > 0) {
                      percent += to_relative_percent(element, container, pixel_offset);
                      percent = Math.max(0, percent);
                    }
  
                    full_params[container] = percent + '%';
                  }
                }
              });
            }
  
            anime(full_params);
          }
        };
  
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  
    function timeline_get_changed_properties_between_states(initial_element_state, from_state_element_state, to_state_element_state) {
      var selector_to_props = {};
      Object.entries(from_state_element_state).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          selector = _ref6[0],
          properties = _ref6[1];
  
        selector_to_props[selector] = selector_to_props[selector] || {};
        Object.entries(properties).forEach(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
            property = _ref8[0],
            value = _ref8[1];
  
          selector_to_props[selector][property] = initial_element_state[selector][property];
        });
      });
      Object.entries(to_state_element_state).forEach(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
          selector = _ref10[0],
          properties = _ref10[1];
  
        selector_to_props[selector] = selector_to_props[selector] || {};
        Object.entries(properties).forEach(function (_ref11) {
          var _ref12 = _slicedToArray(_ref11, 2),
            property = _ref12[0],
            value = _ref12[1];
  
          selector_to_props[selector][property] = value;
        });
      });
      return selector_to_props;
    }
  
    function timeline_transitioning_to_state(root_element, initial_properties, states_flow, now_state_name, transition_animation_time) {
      var new_state_flow = states_flow[now_state_name];
      var listener_cleanup_callbacks = [];
  
      var _iterator2 = _createForOfIteratorHelper(new_state_flow.listeners),
        _step2;
  
      try {
        var _loop2 = function _loop2() {
          var listener_specs = _step2.value;
  
          function on_listener_run() {
            listener_cleanup_callbacks.forEach(function (callback) {
              return callback();
            });
            listener_cleanup_callbacks = [];
            var next_state_name = listener_specs.change_to_state;
            var this_state_element_state = states_flow[now_state_name].overrides;
            var next_state_element_state = states_flow[next_state_name].overrides;
            var element_selector_to_changed_properties = timeline_get_changed_properties_between_states(initial_properties, this_state_element_state, next_state_element_state);
            var longest_animation_time_ms = 0;
            Object.entries(listener_specs.animations).forEach(function (_ref13) {
              var _ref14 = _slicedToArray(_ref13, 2),
                selector = _ref14[0],
                animation_specs = _ref14[1];
  
              var filtered_props = {};
  
              if (element_selector_to_changed_properties.hasOwnProperty(selector)) {
                filtered_props[selector] = element_selector_to_changed_properties[selector];
                longest_animation_time_ms = Math.max(longest_animation_time_ms, animation_specs.delay + animation_specs.duration);
                animate_elements(root_element, filtered_props, animation_specs);
              }
            });
            timeline_transitioning_to_state(root_element, initial_properties, states_flow, next_state_name, longest_animation_time_ms);
          }
  
          var final_listener_specs = _objectSpread({}, listener_specs);
  
          if (listener_specs.listener_type === 'timer') {
            final_listener_specs.delay += transition_animation_time;
          }
  
          var cleanup_callback = setup_listener(root_element, final_listener_specs, on_listener_run);
          listener_cleanup_callbacks.push(cleanup_callback);
          // console.log("SRTTINGS CLEANER TO WINDOW",listener_cleanup_callbacks)
          window.listener_cleanup_callbacks = listener_cleanup_callbacks.slice()
        };
  
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  
    function run_when_doc_ready(fn) {
      if (!document.getElementById('anime-js-script')) {
        var animejs_element = document.createElement('script');
        animejs_element.id = "anime-js-script";
        animejs_element.setAttribute('src', 'https://cdn.jsdelivr.net/npm/animejs@3.1.0/lib/anime.min.js');
        animejs_element.setAttribute('integrity', 'sha256-98Q574VkbV+PkxXCKSgL6jVq9mrVbS7uCdA+vt0sLS8=');
        animejs_element.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(animejs_element);
      }
  
      if (!document.getElementById('imgloaded-js-script')) {
        var imgloaded_element = document.createElement('script');
        imgloaded_element.id = "imgloaded-js-script";
        imgloaded_element.setAttribute('src', 'https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js');
        document.head.appendChild(imgloaded_element);
      }
  
      if (window.anime === undefined || window.imagesLoaded === undefined) {
        setTimeout(function () {
          return run_when_doc_ready(fn);
        }, 50);
        return;
      }
  
      if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
      } else {
        document.addEventListener("DOMContentLoaded", fn);
      }
    }
  
    function timeline_load_initial_values(components) {
      components.forEach(function (component) {
        var root_element = document.querySelector(component.root_element);
        var states_flow = component.states_flow;
        var initial_state_name = component.initial_state_name;
        var initial_properties = {};
        Object.values(component.states_flow).forEach(function (state_spec) {
          Object.entries(state_spec.overrides).forEach(function (_ref15) {
            var _ref16 = _slicedToArray(_ref15, 2),
              selector = _ref16[0],
              properties = _ref16[1];
  
            initial_properties[selector] = initial_properties[selector] || {};
            var element = selector === "" ? root_element : root_element.querySelector(selector);
            Object.keys(properties).forEach(function (property) {
              initial_properties[selector][property] = element.style[property] || property === 'transform' && 'rotate(0deg)' || window.getComputedStyle(element)[property];
            });
          });
        });
        Object.entries(component.states_flow[initial_state_name].overrides).forEach(function (_ref17) {
          var _ref18 = _slicedToArray(_ref17, 2),
            selector = _ref18[0],
            properties = _ref18[1];
  
          var element = selector === "" ? root_element : root_element.querySelector(selector);
          animate_elements(element, {
            "": properties
          }, {
            duration: 0
          });
        });
        timeline_transitioning_to_state(root_element, initial_properties, states_flow, initial_state_name, 0);
      });
      document.querySelectorAll('.not-ready').forEach(function (x) {
        return x.classList.remove('not-ready');
      });
    }
  
    function autoanim_get_current_view() {
      var hash = window.location.hash && window.location.hash.slice(1);
      var screen_element = document.querySelector('.screen');
      var screens_slugs = screen_element.getAttribute('data-screens').split(',');
      var page = screen_element.getAttribute('data-page');
  
      if (screens_slugs.indexOf(hash) !== -1) {
        return [page, hash];
      }
  
      var _iterator3 = _createForOfIteratorHelper(screens_slugs),
        _step3;
  
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var slug = _step3.value;
  
          if (screen_element.classList.contains(slug)) {
            return [page, slug];
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
  
      return [page, page];
    }
  
    function autoanim_redirect(specs, event) {
      var actions = specs.split(';');
  
      var _autoanim_get_current = autoanim_get_current_view(),
        _autoanim_get_current2 = _slicedToArray(_autoanim_get_current, 2),
        page = _autoanim_get_current2[0],
        current_screen = _autoanim_get_current2[1];
  
      var _iterator4 = _createForOfIteratorHelper(actions),
        _step4;
  
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var action = _step4.value;
  
          var _action$split = action.split(','),
            _action$split2 = _slicedToArray(_action$split, 5),
            from_screen = _action$split2[0],
            target_url = _action$split2[1],
            link_target_attribute = _action$split2[2],
            easing = _action$split2[3],
            duration = _action$split2[4];
  
          from_screen = decodeURIComponent(from_screen);
          target_url = decodeURIComponent(target_url);
          duration = parseInt(duration, 10);
  
          if (from_screen === '*' || from_screen === current_screen || 'x'+from_screen === current_screen) {
            var js_run = target_url.match(/\s*javascript\:(.*)/);
  
            if (js_run) {
              eval(js_run[1]);
              event.stopPropagation();
              return false;
            } else if (target_url.indexOf(page + '#') === 0) {
              autoanim_change_to_screen(current_screen, target_url.split('#')[1], easing, duration);
              event.stopPropagation();
              return false;
            } else {
              if (link_target_attribute == '') link_target_attribute = "_self";
              window.open(target_url, link_target_attribute);
              event.stopPropagation();
              return false;
            }
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
  
      return false;
    }
  
    function autoanim_reorder_by_z_indexes() {
      var parents_contained_z_values = new Map();
      var children_z = new Map();
  
      var _iterator5 = _createForOfIteratorHelper(document.querySelectorAll('.screen[data-screens] *')),
        _step5;
  
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var element = _step5.value;
          var computed_style = getComputedStyle(element);
  
          if (['br', '#text', '#comment', 'svg'].includes(element.nodeName && element.nodeName.toLowerCase())) {
            continue;
          }
  
          var z = parseInt(computed_style.getPropertyValue('--z-index'));
  
          if (z !== -1) {
            if (!parents_contained_z_values.has(element.parentNode)) {
              parents_contained_z_values.set(element.parentNode, {});
            }
  
            var parent_z_values = parents_contained_z_values.get(element.parentNode);
            parent_z_values[z] = true;
            children_z.set(element, z);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
  
      var _iterator6 = _createForOfIteratorHelper(parents_contained_z_values.entries()),
        _step6;
  
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var comparator = function comparator(a, b) {
            var a_z = children_z.has(a) ? parseInt(children_z.get(a)) : -1;
            var b_z = children_z.has(b) ? parseInt(children_z.get(b)) : -1;
  
            if (a_z > b_z) {
              return 1;
            } else if (a_z < b_z) {
              return -1;
            }
  
            return 0;
          };
  
          var _step6$value = _slicedToArray(_step6.value, 2),
            parent = _step6$value[0],
            z_values = _step6$value[1];
  
          if (Object.keys(z_values).length <= 1) {
            continue;
          }
  
          var children_sorted = _toConsumableArray(parent.children);
  
          children_sorted.sort(comparator);
  
          var _iterator7 = _createForOfIteratorHelper(children_sorted),
            _step7;
  
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var child = _step7.value;
              parent.appendChild(child);
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  
    function autoanim_change_to_screen(current_slug, target_slug, easing, duration) {
      var push_history = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var screen_node = document.querySelector('.screen[data-screens]');
  
      if (screen_node.current_timed_transition) {
        window.clearTimeout(screen_node.current_timed_transition);
        screen_node.current_timed_transition = null;
      }
  
      var autoanim_data = screen_node.autoanim;
  
      if (autoanim_data == undefined) {
        init_auto_animate();
      }
  
      var new_styles = autoanim_data[target_slug];
      var old_styles = autoanim_data[current_slug];
  
      if (duration) {
        var per_element_animated_props = new Map();
        var all_elements = new Set([].concat(_toConsumableArray(new_styles.keys()), _toConsumableArray(old_styles.keys())));
  
        var _iterator8 = _createForOfIteratorHelper(all_elements.values()),
          _step8;
  
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var element = _step8.value;
            var new_element_style = new_styles.get(element);
            var old_element_style = old_styles.get(element);
  
            if (!new_element_style && !old_element_style) {
              continue;
            }
  
            var this_element_animated_props = {};
  
            var _iterator9 = _createForOfIteratorHelper(autoanimated_properties),
              _step9;
  
            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                var prop = _step9.value;
                var new_value = new_element_style === null || new_element_style === void 0 ? void 0 : new_element_style[prop];
                var old_value = old_element_style === null || old_element_style === void 0 ? void 0 : old_element_style[prop];
  
                if (new_value == null && old_value == null) {
                  continue;
                }
  
                if (autoanimated_properties_from_zero.includes(prop)) {
                  new_value = new_value || 0;
                  old_value = old_value || 0;
                } else {
                  new_value = new_value !== undefined ? new_value : old_value;
                  old_value = old_value !== undefined ? old_value : new_value;
                }
  
                this_element_animated_props[prop] = [old_value, new_value];
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }
  
            if (Object.keys(this_element_animated_props).length !== 0) {
              per_element_animated_props.set(element, this_element_animated_props);
            }
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
  
        var has_reordered = false;
        var root_element = document.querySelector('.screen');
        animate_elements(root_element, per_element_animated_props, {
          duration: duration,
          easing: easing
        }, function (element) {
          element.removeAttribute('style');
  
          if (!has_reordered) {
            autoanim_reorder_by_z_indexes();
            has_reordered = true;
          }
        }, false, false);
      } else {
        setTimeout(autoanim_reorder_by_z_indexes);
      }
  
      var screen_element = document.querySelector('.screen');
      var screens_slugs = screen_element.getAttribute('data-screens').split(',');
  
      var _iterator10 = _createForOfIteratorHelper(screens_slugs),
        _step10;
  
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var slug = _step10.value;
          screen_element.classList.toggle(slug, slug === target_slug);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
  
      last_set_hash = '#' + target_slug;
  
      if (history.pushState && current_slug && push_history) {
        history.pushState(null, null, last_set_hash);
      } else if (push_history) {
        location.hash = last_set_hash;
      } else {
        window.location.replace(('' + window.location).split('#')[0] + last_set_hash);
      }
  
      var timed_transitions = screen_node.getAttribute('data-transitions');
  
      if (timed_transitions) {
        var _iterator11 = _createForOfIteratorHelper(timed_transitions.split(';')),
          _step11;
  
        try {
          var _loop3 = function _loop3() {
            var transition = _step11.value;
  
            var _transition$split = transition.split(','),
              _transition$split2 = _slicedToArray(_transition$split, 5),
              transition_from_screen = _transition$split2[0],
              transition_to_screen = _transition$split2[1],
              delay = _transition$split2[2],
              easing = _transition$split2[3],
              duration_next = _transition$split2[4];
  
            delay = parseInt(delay, 10);
            easing = decodeURIComponent(easing);
  
            if (target_slug === transition_from_screen) {
              if (duration) {
                delay += duration;
              }
  
              var delayed_exec_cb = function delayed_exec_cb() {
                screen_node.current_timed_transition = setTimeout(function () {
                  autoanim_change_to_screen(transition_from_screen, transition_to_screen, easing, parseInt(duration_next, 10), false);
                }, Math.max(delay, 1));
                window.Lib.imagesLoadedFinished = true;
              };
  
              if (window.Lib.imagesLoadedFinished) {
                delayed_exec_cb();
              } else {
                imagesLoaded('.screen *', {
                  background: true
                }, delayed_exec_cb);
              }
  
              return "break";
            }
          };
  
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var _ret = _loop3();
  
            if (_ret === "break") break;
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }
      }
    }
  
    function transform_matrix_to_rotation(matrix_str) {
      if (!matrix_str) {
        return 0;
      }
  
      var split = matrix_str.split(/,|\(/);
  
      if (!split || split.length !== 7) {
        return 0;
      }
  
      var a = parseFloat(split[1]);
      var b = parseFloat(split[2]);
      return Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }
  
    function autoanim_collect_styles(root_element) {
      var css_by_screen = {};
      var screens_slugs = root_element.getAttribute('data-screens').split(',');
  
      var _iterator12 = _createForOfIteratorHelper(screens_slugs),
        _step12;
  
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var target_slug = _step12.value;
  
          var _iterator13 = _createForOfIteratorHelper(screens_slugs),
            _step13;
  
          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var slug = _step13.value;
              root_element.classList.toggle(slug, slug === target_slug);
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
  
          css_by_screen[target_slug] = new Map();
  
          var _iterator14 = _createForOfIteratorHelper(root_element.querySelectorAll('*')),
            _step14;
  
          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var animated_obj = _step14.value;
              var computed_style = getComputedStyle(animated_obj);
  
              if (computed_style.backgroundImage !== 'none') {
                var pic = new Image();
                if (computed_style.backgroundImage.startsWith('url(')) {
                  pic.src = computed_style.backgroundImage.replace('url("', '').replace('")', '');
                } else {
                  pic.src = computed_style.backgroundImage;
                }
              }
  
              var zindex = parseInt(computed_style.getPropertyValue('--z-index'));
  
              if (zindex === -1) {
                continue;
              }
  
              var autoanim_props = {};
  
              var _iterator15 = _createForOfIteratorHelper(autoanimated_properties),
                _step15;
  
              try {
                for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                  var prop = _step15.value;
                  var val = computed_style.getPropertyValue(prop);
  
                  if (prop === 'transform') {
                    var rotation = transform_matrix_to_rotation(val);
  
                    if (rotation) {
                      autoanim_props['rotate'] = rotation;
                    }
                  } else if (val && val !== 'none') {
                    autoanim_props[prop] = computed_style.getPropertyValue(prop);
                  }
                }
              } catch (err) {
                _iterator15.e(err);
              } finally {
                _iterator15.f();
              }
  
              autoanim_props['--z-index'] = zindex;
              css_by_screen[target_slug].set(animated_obj, autoanim_props);
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
  
      root_element.autoanim = css_by_screen;
    }
  
    function init_timeline_components() {
      run_when_doc_ready(function () {
        var _iterator16 = _createForOfIteratorHelper(document.querySelectorAll('.component-wrapper')),
          _step16;
  
        try {
          for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
            var element = _step16.value;
  
            if (element.timeline_data) {
              timeline_load_initial_values(element.timeline_data);
            }
          }
        } catch (err) {
          _iterator16.e(err);
        } finally {
          _iterator16.f();
        }
      });
    }
  
    function init_auto_animate() {
      var screen_element = document.querySelector('.screen[data-screens]');
  
      if (!screen_element) {
        return;
      }
  
      screen_element.style.opacity = 0;
      run_when_doc_ready(function () {
        var _iterator17 = _createForOfIteratorHelper(document.querySelectorAll('.hidden')),
          _step17;
  
        try {
          for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
            var element = _step17.value;
            element.classList.remove('hidden');
          }
        } catch (err) {
          _iterator17.e(err);
        } finally {
          _iterator17.f();
        }
  
        var screen_element = document.querySelector('.screen[data-screens]');
        screen_element.style.opacity = 1;
  
        if (screen_element) {
          var initial_screen = autoanim_get_current_view()[1];
          autoanim_collect_styles(screen_element);
          autoanim_change_to_screen(null, initial_screen);
  
          window.onhashchange = function () {
            if (last_set_hash !== location.hash) {
              autoanim_change_to_screen(null, autoanim_get_current_view()[1]);
            }
          };
        }
      });
    }
  
    window.Lib = {
      autoanim_redirect: autoanim_redirect
    };
    setTimeout(init_timeline_components, 0);
    setTimeout(init_auto_animate, 20);
  })();