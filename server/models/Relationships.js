import User from './User.js';
import Element from './Element.js';
import Snippet from './Snippet.js';
import Category from './Category.js';
import ElementGroup from './ElementGroup.js';
import Log from './Log.js';

Element.belongsToMany(Category, { through: 'ElementCategory' });
Category.belongsToMany(Element, { through: 'ElementCategory' });

User.hasMany(ElementGroup, { foreignKey: 'userId', onDelete: 'CASCADE' });
ElementGroup.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Element, { foreignKey: 'userId', onDelete: 'CASCADE' });
Element.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Snippet, { foreignKey: 'userId', onDelete: 'CASCADE' });
Snippet.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Category, { foreignKey: 'userId', onDelete: 'CASCADE' });
Category.belongsTo(User, { foreignKey: 'userId' });

Element.belongsToMany(ElementGroup, { through: 'ElementGroupElement', onDelete: 'CASCADE' });
ElementGroup.belongsToMany(Element, { through: 'ElementGroupElement', onDelete: 'CASCADE' });

Element.hasMany(Snippet, { foreignKey: 'elementId', onDelete: 'CASCADE' });
Snippet.belongsTo(Element, { foreignKey: 'elementId' });

User.hasMany(Log, { foreignKey: 'userId', onDelete: 'CASCADE' });
Log.belongsTo(User, { foreignKey: 'userId' });
