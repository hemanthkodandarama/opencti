import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { compose, map, take } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Slide from '@material-ui/core/Slide';
import inject18n from '../../../../components/i18n';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
Transition.displayName = 'TransitionSlide';

const styles = () => ({
  tags: {
    margin: 0,
    padding: 0,
  },
  tag: {
    height: 25,
    fontSize: 12,
    margin: '0 7px 7px 0',
  },
  tagInList: {
    fontSize: 12,
    height: 20,
    float: 'left',
    marginRight: 7,
  },
  tagInSearch: {
    height: 25,
    fontSize: 12,
    margin: '0 7px 0 0',
  },
  tagInput: {
    margin: '4px 0 0 10px',
    float: 'right',
  },
});

class StixObjectTags extends Component {
  render() {
    const {
      classes, tags, t, onClick, variant,
    } = this.props;
    let style = classes.tag;
    if (variant === 'inList') {
      style = classes.tagInList;
    }
    if (variant === 'inSearch') {
      style = classes.tagInSearch;
    }
    return (
      <div className={classes.tags}>
        {tags.edges.length > 0 ? (
          map(
            (tagEdge) => (
              <Chip
                key={tagEdge.node.id}
                classes={{ root: style }}
                label={tagEdge.node.value}
                style={{ backgroundColor: tagEdge.node.color }}
                onClick={
                  typeof onClick === 'function'
                    ? onClick.bind(
                      this,
                      'tags',
                      tagEdge.node.id,
                      tagEdge.node.value,
                    )
                    : ''
                }
              />
            ),
            take(3, tags.edges),
          )
        ) : (
          <Chip
            classes={{ root: style }}
            label={t('No tag')}
            style={{ backgroundColor: '#ffffff', color: '#000000' }}
            onClick={
              typeof onClick === 'function'
                ? onClick.bind(this, 'tags', null, null)
                : ''
            }
          />
        )}
      </div>
    );
  }
}

StixObjectTags.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  tags: PropTypes.object,
};

export default compose(
  inject18n,
  withStyles(styles),
)(StixObjectTags);
